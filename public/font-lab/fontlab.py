"""Font Lab engine: tune BDO Grotesk (SIL OFL 1.1) into our own variable font.

Runs in the browser (Pyodide) and from the command line:

    python public/font-lab/fontlab.py --prepare            # once: base/ snapshots
    python public/font-lab/fontlab.py settings.json out.woff2

Every change is applied to the three weight masters of BDO Grotesk
(300 / 400 / 900), and the masters are rebuilt into a new variable font,
so the result interpolates exactly like the original.

Settings (all optional):
    family        new family name (the OFL lets us rename and ship it)
    width         horizontal scale in percent (100 = unchanged)
    tracking      extra space per glyph, font units (1000 per em)
    xheight       lowercase height in percent (100 = unchanged); ascenders
                  and descenders keep their height
    alternates    list of OpenType stylistic features to make default,
                  e.g. ["ss01", "ss04"]
"""

import io
import json
import sys

from fontTools.designspaceLib import AxisDescriptor, DesignSpaceDocument, InstanceDescriptor, SourceDescriptor
from fontTools.otlLib.builder import buildStatTable
from fontTools.ttLib import TTFont
from fontTools.varLib import build as build_vf
from fontTools.varLib.instancer import instantiateVariableFont

MASTERS = [300, 400, 900]
DEFAULT_WEIGHT = 400
# BDO Grotesk's avar curve, written as a user -> design map.
AXIS_MAP = [(300, 300), (400, 400), (500, 480), (600, 600), (700, 700), (800, 800), (900, 900)]
INSTANCES = [(300, "Light"), (400, "Regular"), (500, "Medium"), (600, "DemiBold"),
             (700, "Bold"), (800, "ExtraBold"), (900, "Black")]
CLOSURE_FEATURES = {"ccmp", "locl", "liga", "dlig", "salt", "ss01", "ss02", "ss03",
                    "ss04", "ss05", "ss06", "ss07"}

DEFAULTS = {"family": "Tuned Grotesk", "width": 100, "tracking": 0, "xheight": 100, "alternates": []}


# ---------------------------------------------------------------- helpers

def _subtables(lookup):
    for st in lookup.SubTable:
        yield st.ExtSubTable if lookup.LookupType in (7, 9) else st


def _single_subst_maps(font, features):
    """{glyph: replacement} for every single substitution under `features`."""
    gsub = font["GSUB"].table
    lookups = set()
    for fr in gsub.FeatureList.FeatureRecord:
        if fr.FeatureTag in features:
            lookups.update(fr.Feature.LookupListIndex)
    out = {}
    for i in sorted(lookups):
        for st in _subtables(gsub.LookupList.Lookup[i]):
            if hasattr(st, "mapping"):
                out.update(st.mapping)
    return out


def _gsub_outputs(font, features):
    """Every glyph a substitution under `features` can produce, keyed by input."""
    gsub = font["GSUB"].table
    lookups = set()
    for fr in gsub.FeatureList.FeatureRecord:
        if fr.FeatureTag in features:
            lookups.update(fr.Feature.LookupListIndex)
    edges = []
    for i in sorted(lookups):
        for st in _subtables(gsub.LookupList.Lookup[i]):
            if hasattr(st, "mapping"):                       # single
                edges += [((a,), b) for a, b in st.mapping.items()]
            if hasattr(st, "alternates"):                    # alternate
                edges += [((a,), b) for a, bs in st.alternates.items() for b in bs]
            if hasattr(st, "ligatures"):                     # ligature
                for first, ligs in st.ligatures.items():
                    edges += [((first, *l.Component), l.LigGlyph) for l in ligs]
            if hasattr(st, "multiple"):                      # multiple (ccmp i -> idotless dot)
                edges += [((a,), b) for a, bs in st.multiple.items() for b in bs]
    return edges


def lowercase_set(font, extra_subs=None):
    """Glyphs that should follow the lowercase (x-height) transform."""
    cmap = font.getBestCmap()
    lc = {g for cp, g in cmap.items() if chr(cp).islower()}
    edges = _gsub_outputs(font, CLOSURE_FEATURES) + [((a,), b) for a, b in (extra_subs or {}).items()]
    changed = True
    while changed:
        changed = False
        for inputs, out in edges:
            if out not in lc and inputs[0] in lc and all(g in lc for g in inputs):
                lc.add(out)
                changed = True
    # Accents and the dot are drawn separately and positioned on top.
    marks = _mark_glyphs(font)
    return {g for g in lc if g not in marks and g not in ("dotaccent", "dotaccentcomb")}


def _mark_glyphs(font):
    cd = font["GDEF"].table.GlyphClassDef.classDefs
    return {g for g, c in cd.items() if c == 3}


# ---------------------------------------------------------------- transform one static master

def transform_master(font, s, lc, xh, asc):
    sx = s["width"] / 100.0
    sy = s["xheight"] / 100.0
    t = s["tracking"]
    glyf, hmtx = font["glyf"], font["hmtx"]
    marks = _mark_glyphs(font)
    order = font.getGlyphOrder()

    def shift(name):  # how far a glyph's outline moves right for tracking
        return 0 if name in marks or hmtx[name][0] == 0 else t / 2.0

    def fy(y):  # lowercase vertical map: scale 0..xh, ease xh..asc, keep the rest
        if 0 <= y <= xh:
            return y * sy
        if xh < y < asc:
            return xh * sy + (y - xh) * (asc - xh * sy) / (asc - xh)
        return y

    lift = xh * (sy - 1)  # how far marks above a lowercase letter move up

    for name in order:
        g = glyf[name]
        if g.isComposite():
            in_lc = name in lc
            for c in g.components:
                c.x = round(c.x * sx + shift(name) - shift(c.glyphName))
                if in_lc and c.glyphName not in lc:
                    cg = glyf[c.glyphName]
                    if getattr(cg, "yMin", 0) + c.y > xh * 0.5:
                        c.y = round(c.y + lift)
        elif g.numberOfContours > 0:
            coords = g.coordinates
            dx = shift(name)
            is_lc = name in lc
            for i, (x, y) in enumerate(coords):
                coords[i] = (round(x * sx + dx), round(fy(y)) if is_lc else y)

    for name in order:
        g = glyf[name]
        g.recalcBounds(glyf)
        adv, _ = hmtx[name]
        if adv:
            adv = round(adv * sx) + (0 if name in marks else t)
        hmtx[name] = (max(adv, 0), getattr(g, "xMin", 0))

    # GPOS: kerning scales with width; anchors follow their glyph.
    gpos = font["GPOS"].table
    for lookup in gpos.LookupList.Lookup:
        for st in _subtables(lookup):
            kind = type(st).__name__
            if kind == "PairPos":
                for vr in _pair_values(st):
                    for attr in ("XAdvance", "XPlacement"):
                        if hasattr(vr, attr):
                            setattr(vr, attr, round(getattr(vr, attr) * sx))
            elif kind == "MarkBasePos":
                bases = st.BaseCoverage.glyphs
                for gname, rec in zip(bases, st.BaseArray.BaseRecord):
                    for a in rec.BaseAnchor:
                        if a is None:
                            continue
                        a.XCoordinate = round(a.XCoordinate * sx + shift(gname))
                        if gname in lc and a.YCoordinate > xh * 0.5:
                            a.YCoordinate = round(a.YCoordinate + lift)
                for gname, rec in zip(st.MarkCoverage.glyphs, st.MarkArray.MarkRecord):
                    rec.MarkAnchor.XCoordinate = round(rec.MarkAnchor.XCoordinate * sx + shift(gname))

    os2 = font["OS/2"]
    os2.sxHeight = round(os2.sxHeight * sy)
    widths = [hmtx[n][0] for n in order if hmtx[n][0] > 0]
    os2.xAvgCharWidth = round(sum(widths) / len(widths))

    if s["alternates"]:
        swap = _single_subst_maps(font, set(s["alternates"]))
        for table in font["cmap"].tables:
            for cp, g in list(table.cmap.items()):
                if g in swap:
                    table.cmap[cp] = swap[g]


def _pair_values(st):
    if st.Format == 1:
        for ps in st.PairSet:
            for rec in ps.PairValueRecord:
                for vr in (rec.Value1, rec.Value2):
                    if vr is not None:
                        yield vr
    else:
        for c1 in st.Class1Record:
            for c2 in c1.Class2Record:
                for vr in (c2.Value1, c2.Value2):
                    if vr is not None:
                        yield vr


# ---------------------------------------------------------------- names

def rename(font, family):
    ps = "".join(ch for ch in family if ch.isalnum())
    name = font["name"]
    for rec in list(name.names):
        if rec.nameID in (1, 3, 4, 6, 16, 17, 21, 22, 25):
            name.removeNames(nameID=rec.nameID)
    name.setName(family, 1, 3, 1, 0x409)
    name.setName("Regular", 2, 3, 1, 0x409)
    name.setName(f"{family} Regular", 4, 3, 1, 0x409)
    name.setName(f"{ps}-Regular", 6, 3, 1, 0x409)
    name.setName(f"1.000;{ps}", 3, 3, 1, 0x409)
    name.setName(ps, 25, 3, 1, 0x409)
    old = name.getDebugName(0) or ""
    if "Based on BDO Grotesk" not in old:
        name.removeNames(nameID=0)
        name.setName(old + " Based on BDO Grotesk by Lokal Container (SIL OFL 1.1).", 0, 3, 1, 0x409)


# ---------------------------------------------------------------- public API

def _extract_rule(vf):
    """BDO swaps a few glyphs (a, N, a-accents) from weight 600 up. Pull that
    rule out so every master has the same features, and re-add it on build."""
    gsub = vf["GSUB"].table
    fv = getattr(gsub, "FeatureVariations", None)
    rule = None
    if fv:
        rec = fv.FeatureVariationRecord[0]
        cond = rec.ConditionSet.ConditionTable[0]
        subs = {}
        for sr in rec.FeatureTableSubstitution.SubstitutionRecord:
            for i in sr.Feature.LookupListIndex:
                for st in _subtables(gsub.LookupList.Lookup[i]):
                    subs.update(st.mapping)
        # normalized 0.4 on the 400-900 side = weight 600
        rule = {"min": round(DEFAULT_WEIGHT + cond.FilterRangeMinValue * (900 - DEFAULT_WEIGHT)), "subs": subs}
        gsub.FeatureVariations = None
        gsub.Version = 0x00010000
    return rule


PREVIEW_WEIGHTS = [300, 400, 500, 600, 700, 800, 900]


def prepare(vf_path, out_dir):
    """One-time: write a static font per preview weight + the swap rule, so the
    browser tool starts instantly instead of slicing the variable font itself."""
    import os
    os.makedirs(out_dir, exist_ok=True)
    data = open(vf_path, "rb").read()
    rule = None
    for w in PREVIEW_WEIGHTS:
        vf = TTFont(io.BytesIO(data))
        rule = _extract_rule(vf)
        static = instantiateVariableFont(vf, {"wght": w}, inplace=False, updateFontNames=False)
        static.save(os.path.join(out_dir, f"wght-{w}.ttf"))
    json.dump(rule, open(os.path.join(out_dir, "rule.json"), "w"))


def load_prepared(out_dir):
    import os
    m = {w: open(os.path.join(out_dir, f"wght-{w}.ttf"), "rb").read() for w in PREVIEW_WEIGHTS}
    m["rule"] = json.load(open(os.path.join(out_dir, "rule.json")))
    return m


def load_masters(vf_bytes):
    """Split the variable font into its three static weight masters (bytes)
    plus the weight-dependent glyph-swap rule."""
    out = {"rule": None}
    for w in MASTERS:
        vf = TTFont(io.BytesIO(vf_bytes))
        out["rule"] = _extract_rule(vf)
        static = instantiateVariableFont(vf, {"wght": w}, inplace=False, updateFontNames=False)
        buf = io.BytesIO()
        static.save(buf)
        out[w] = buf.getvalue()
    return out


def build(masters, settings, static_weight=None):
    """Apply `settings` and return font bytes.

    static_weight=None -> full variable font (300-900).
    static_weight=400  -> just that master as a static font (fast preview).
    """
    s = {**DEFAULTS, **(settings or {})}
    rule = masters.get("rule")
    weights = [static_weight] if static_weight else MASTERS
    fonts = {w: TTFont(io.BytesIO(masters[w])) for w in set(weights) | {DEFAULT_WEIGHT}}
    ref = fonts[DEFAULT_WEIGHT]
    lc = lowercase_set(ref, rule["subs"] if rule else {})
    xh = ref["OS/2"].sxHeight
    asc = max(getattr(ref["glyf"][g], "yMax", 0) for g in ("b", "d", "h", "k", "l") if g in ref["glyf"])

    for w in weights:
        transform_master(fonts[w], s, lc, xh, asc)
        rename(fonts[w], s["family"])

    if static_weight:
        if rule and static_weight >= rule["min"]:  # mimic the heavy-weight swap
            for table in fonts[static_weight]["cmap"].tables:
                for cp, g in list(table.cmap.items()):
                    if g in rule["subs"]:
                        table.cmap[cp] = rule["subs"][g]
        buf = io.BytesIO()
        fonts[static_weight].save(buf)
        return buf.getvalue()

    ds = DesignSpaceDocument()
    ax = AxisDescriptor()
    ax.tag, ax.name, ax.minimum, ax.default, ax.maximum = "wght", "Weight", 300, 400, 900
    ax.map = AXIS_MAP
    ds.addAxis(ax)
    for w in MASTERS:
        src = SourceDescriptor()
        src.font = fonts[w]
        src.location = {"Weight": dict(AXIS_MAP)[w]}
        src.name = f"master{w}"
        ds.addSource(src)
    if rule:
        from fontTools.designspaceLib import RuleDescriptor
        r = RuleDescriptor()
        r.name = "heavy-alternates"
        r.conditionSets = [[{"name": "Weight", "minimum": dict(AXIS_MAP)[rule["min"]], "maximum": 900}]]
        r.subs = list(rule["subs"].items())
        ds.addRule(r)
    for w, label in INSTANCES:
        inst = InstanceDescriptor()
        inst.familyName, inst.styleName = s["family"], label
        inst.designLocation = {"Weight": dict(AXIS_MAP)[w]}
        ds.addInstance(inst)
    vf, _, _ = build_vf(ds, optimize=False)
    buildStatTable(vf, [{"tag": "wght", "name": "Weight", "values": [
        {"value": w, "name": label, **({"flags": 0x2} if w == 400 else {})} for w, label in INSTANCES]}])
    buf = io.BytesIO()
    vf.save(buf)
    return buf.getvalue()


if __name__ == "__main__":
    import os
    here = os.path.dirname(os.path.abspath(__file__))
    base_dir = os.path.join(here, "base")
    if len(sys.argv) > 1 and sys.argv[1] == "--prepare":
        prepare(os.path.join(here, "BDOGrotesk-VF-balanced.ttf"), base_dir)
        print("prepared", base_dir)
        sys.exit()
    settings = json.load(open(sys.argv[1])) if len(sys.argv) > 1 else {}
    out = sys.argv[2] if len(sys.argv) > 2 else "tuned.ttf"
    data = build(load_prepared(base_dir), settings)
    if out.endswith(".woff2"):
        f = TTFont(io.BytesIO(data))
        f.flavor = "woff2"
        f.save(out)
    else:
        open(out, "wb").write(data)
    print("wrote", out)


def metrics(data):
    """Exact proportions of any font file, per 1000 units (1 em)."""
    from fontTools.pens.boundsPen import BoundsPen
    f = TTFont(io.BytesIO(bytes(data)))
    k = 1000.0 / f["head"].unitsPerEm
    gs, cmap, hmtx = f.getGlyphSet(), f.getBestCmap(), f["hmtx"]

    def bounds(ch):
        pen = BoundsPen(gs)
        gs[cmap[ord(ch)]].draw(pen)
        return pen.bounds or (0, 0, 0, 0)

    def avg(chars):
        ws = [hmtx[cmap[ord(c)]][0] for c in chars if ord(c) in cmap]
        return sum(ws) / len(ws) * k

    return {
        "Cap height (H)": bounds("H")[3] * k,
        "Lowercase height (x)": bounds("x")[3] * k,
        "Ascender (d)": bounds("d")[3] * k,
        "Descender (p)": -bounds("p")[1] * k,
        "Avg lowercase width": avg("abcdefghijklmnopqrstuvwxyz"),
        "Avg capital width": avg("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
        "Avg figure width": avg("0123456789"),
        "Word space": avg(" "),
    }
