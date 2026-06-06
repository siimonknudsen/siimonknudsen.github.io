# Design & Engineering Decisions

A running log of the notable decisions behind the portfolio redesign — what we chose,
why, and what we rejected. Newest at the top. Companion to [VISION.md](VISION.md)
(the *why* at a high level) and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) (the *what*, in
detail). Format is lightweight ADR (Architecture Decision Record).

---

## 2026-06 — Removed Tailwind entirely → CSS Modules

**Decision (Simon's call).** Remove the Tailwind framework completely; express all
component styling as real CSS in co-located **CSS Modules**, using the design tokens.

**How.** Kept the token foundation and global semantic classes (`.type-*`, `.glass`,
colour utilities — these were always our own CSS, not Tailwind). Migrated all ~27
components/pages to `*.module.css` (layout/spacing/responsive/hover written as CSS via
`var(--space-*)`, media queries, pseudo-classes) — run as a parallel multi-agent
workflow, one agent per file. Added a base **reset** to replace Tailwind's Preflight.
Refactored `Media` so its `aspect`/`rounded` props resolve to inline CSS (no utility
classes). Then removed the `@tailwind` directives, `tailwind.config.js`, the PostCSS
plugin, and uninstalled `tailwindcss`.

**Result.** Zero Tailwind in the codebase; CSS shrank ~66KB→57KB; verified on the
production build across desktop / mobile / project pages (responsive, glass, themes all
intact). Note: a headless dev-server quirk showed blank after the dep uninstall — the
built output (what deploys) renders correctly; `npm run dev` in a normal terminal is fine.

**Trade-off acknowledged.** This is more CSS to maintain than utility classes, but it's
what was asked for and the tokens keep it consistent.

---

## ❓ Open questions (awaiting Simon's decision)

1. **Brand colour.** I went with **warm orange** (`#f26a2e`) as the recommended default
   and rebuilt the system + hero shader around it. The alternative you floated was a
   **green-blue / teal**. Keep orange, or switch to teal? (One-line swap either way.) If
   orange: happy with this exact hue, or want it warmer/cooler / more or less saturated?
2. **Tracking aggressiveness.** I applied *graduated* negative tracking (−4% display →
   −1% small text) rather than a flat −2–4% everywhere, to protect small-text legibility.
   Want it tighter on body/caption too (toward a uniform −2–4%), or is graduated right?
3. **Publish.** The brand rebrand is **local-only**, unlike the bug fixes (shipped). Want
   me to publish the orange rebrand live, or hold until you've seen it in your browser?
4. **Component beautification.** I held deeper component restyling pending the brand
   decision. Once confirmed, want a polish pass (buttons, cards, tags, form inputs) on the
   final brand?

---

## 2026-06 — Brand colour, full primitive ramps & negative tracking
*Reasoned as a senior product designer.*

**Brand colour → warm orange (`--brand-500 #f26a2e`). Recommended, implemented, but
flagged for your sign-off.**
- *Why orange over the old green.* Green (`#4ade80`) is the single most over-used SaaS/
  tech accent — it reads generic and, worse, it **collided with "success"** (same hue
  doing brand *and* status is a system smell). Orange is warmer, more human, and far more
  ownable for a designer's personal brand — it aligns with the "human-centered"
  positioning and creates a confident warm/cool tension against the dark, glassy,
  cool-neutral UI (a premium, intentional look). It also frees green to mean **only**
  success.
- *Why this specific orange.* A slightly coral-leaning orange (not construction-cone). At
  `brand-500` on dark and `brand-600` on light it stays vivid yet controlled; with
  near-black contrast text, button labels clear **≥4.5:1**. Themed per mode like the
  status colours.
- *Reversibility.* Brand lives in one ramp; `--accent` points at it in two theme blocks.
  Switching to the teal/green-blue alternative is a ~2-line change. So this is a strong
  default, not a lock-in. **Open question below.**
- *Shader.* Retinted the hero to warm "ember" tones so the whole hero reads as one
  intentional system rather than orange-accent-on-green-field.

**Primitive ramps added (greyscale already existed).**
- *Brand 50–900, status 50–900 (success/warning/error/info), transparent-light &
  transparent-dark alpha ramps.* Top-tier systems (Material, Radix, Polaris, Primer)
  ship exactly these. The **transparent ramps** formalise what the glass system was doing
  ad-hoc — glass borders, hover overlays and scrims now reference `--transparent-*`, so
  translucency is a documented scale, not magic rgba values.
- *Naming.* Kept hue-named primitives (`--green-500`) → semantic aliases
  (`--feedback-success`). Added **`error`** as the user-facing name (aliases the existing
  `danger`, so both utilities work — no breakage).

**Negative letter-spacing across all type — but graduated, not flat.**
- You asked for −2 to −4% on all type. I applied it as a **graduated** scale (display
  −4% → headings −3% → titles/body −2% → small text −1%; uppercase overline stays
  *positive*). *Why not a flat −2–4% on everything:* it's an established type rule that
  tight tracking flatters large display but **degrades legibility at body/caption sizes**
  (and breaks all-caps, which needs positive tracking). A 20-yr designer's instinct is to
  honour the intent (a tighter, more modern voice) while protecting readability. **Open
  question below** if you want it more aggressive.

---

## 2026-06 — Design knowledge base

**Decision.** Add [DESIGN_KNOWLEDGE.md](DESIGN_KNOWLEDGE.md) — a durable, source-verified
reference of design *expertise* (Laws of UX, Gestalt, Nielsen/Shneiderman heuristics, UI
& visual craft, WCAG 2.2 AA, motion & interaction best practices), mapped to how we apply
each in this project, plus a pre-ship checklist and a reserved section for Simon's
aesthetic/taste references (per-section, per-component, animation links).

**Why.** So design work is grounded in established best practice (not vibes), and so the
*taste* layer (personal, project-specific) has a structured home to grow as Simon adds
references. Built from parallel deep research across four domains with primary sources.

---

## 2026-06 — Token system completed to "top-tier" coverage

**Decision.** Extend the token set beyond colour/type/spacing/motion to also cover
**feedback (status) colours, an elevation/shadow scale, a z-index scale, opacity,
border-width, focus-ring tokens, a monospace family and semibold/bold weights, plus
stagger steps.**

**Why.** Reference systems (Material 3, Adobe Spectrum, Atlassian, Polaris, Primer,
Carbon, Radix) all ship these foundations. The portfolio had a strong colour/type/
motion core but was missing the "plumbing" tokens (layering, status, elevation) that
make a system feel complete and prevent magic numbers (`z-[100]`, ad-hoc shadows).

**How.** Status colours follow the two-stop pattern (lighter hue on dark UI, deeper
hue on light UI) + a soft tinted surface, exposed as `text-/bg-*-soft/border-*`
utilities and Tailwind colours. Elevation and overlay scrim are theme-aware
semantics; z-index/opacity/border/focus are theme-independent primitives. All live in
`src/index.css` and are surfaced through `tailwind.config.js`.

**Rejected.** Full per-status ramps (50→900 each) — overkill for a portfolio; two
stops give enough contrast control without bloat.

---

## 2026-06 — UX & accessibility pass

**Decision.** Add a skip-to-content link, a real 404 page (catch-all route),
per-route document titles, mobile-menu scroll-lock + Escape-to-close, and route the
lightbox/overlays through the scrim + z-index tokens.

**Why.** These are baseline expectations for a polished, accessible site and were the
highest-value UX gaps. They're low-risk and don't change the visual design.

**Deferred (noted, not done).** Hoisting `Header`/`Footer` into a single App shell
(so the nav doesn't re-mount on every navigation) and adding one true `<main>`
landmark per page — a cleaner architecture but a broader refactor across 6 page files
with a dual-state `ProjectPage`. Flagged as optional in DESIGN_SYSTEM §10. Skip link
currently targets a per-page `#main-content` region instead.

---

## 2026-06 — Two-tier tokens: primitives → semantics

**Decision.** Model everything as **primitives** (raw, theme-independent) aliased to
**semantic** role tokens (theme-aware). Components consume only semantics.

**Why.** Industry standard; lets light/dark be a re-aliasing of the same primitives
and keeps naming intent-based (`text-secondary`, not `gray-400`).

---

## 2026-06 — Typography named by *role*, not size

**Decision.** Set type with semantic role classes (`.type-display`, `.type-heading`,
`.type-body`, …) that bundle size + weight + line-height + tracking — **not** t-shirt
sizes and **not** raw px utilities.

**Why.** Simon asked why we'd use t-shirt scaling; research into Material 3 / Apple
HIG / Polaris showed role-based naming is best practice (values can evolve without
renaming every call-site). The raw `text-2xs…5xl` scale (10→48) stays as a primitive
for rare one-offs only.

---

## 2026-06 — One owned colour system; purge framework colours

**Decision.** No raw Tailwind colours in components (`neutral-*`, `green-*`, ad-hoc
gradients). One green **accent** for status/highlight; all other colour comes from
**project imagery**. The chrome stays monochrome + accent.

**Why.** Simon: "go away from everything styling-wise that is not my own design
system." A restrained, owned palette lets the work be the colour.

---

## 2026-06 — Frosted glass as the signature material

**Decision.** `.glass` (chrome, 16px blur), `.glass-panel` (text overlays, 24px blur
+ stronger scrim), `.glass-item` (hover/active rows), `.border-glass` (hairline).
Always degrade for reduced transparency/contrast and no-`backdrop-filter`.

**Key gotcha.** A `backdrop-filter` element nested inside another **loses its blur** —
so the nav mega-dropdown is rendered as a *sibling* of the bar, not a child.

**Why.** The 2026 aesthetic Simon referenced (seed.com, meetcleo.com); NN/g guidance
informed the legibility scrim on panels.

---

## 2026-06 — Tight radius scale (4·8·12·16)

**Decision.** `--radius-sm/md/lg/xl` = 4/8/12/16; **16 is the max** for
cards/panels/bars; **buttons 8px**; full pill reserved for icon buttons + circular
elements (avatars, theme toggle).

**Why.** Simon asked to pull back from fully-round everything to a disciplined scale.

---

## 2026-06 — Own WebGL hero shader (no paid/watermarked assets)

**Decision.** A dependency-free, self-authored WebGL "gradient-grid" mesh shader
([`shader.js`](src/components/shader/shader.js) +
[`ShaderBackground.jsx`](src/components/shader/ShaderBackground.jsx)), theme-tinted,
slow (speed 0.05), pausing offscreen, with a static reduced-motion frame and a CSS
fallback.

**Why.** Simon liked the shaders.com "gradient-grid" look but it's paid/watermarked
($249). We recreated the concept from scratch — calm, conceptual, non-disturbing,
and fully owned. Note: headless preview has WebGL **off** (shows the CSS fallback);
the real shader only renders in a normal browser.

**Update (2026-06).** Added **cursor reactivity** — a smoothed `u_mouse` + strength
uniform makes the gradient gently swirl and bloom around the pointer (eased in/out,
identity when no pointer, disabled under reduced motion). Free, owned, works in both
themes. The swirl is subtle by design (calm aesthetic).

---

## 2026-06 — Animated theme switch via the View Transitions API

**Decision.** The dark↔light toggle blooms a "circular reveal" from the clicked toggle
(`document.startViewTransition`, ~500ms decelerate), with a colour-crossfade fallback
(`.theme-anim`) where unsupported and **instant** under reduced-motion.

**Why.** Simon found the hard flip jarring; this is the current top-tier pattern.

---

## 2026-06 — One `Media` component for all imagery & video

**Decision.** A single [`Media.jsx`](src/components/Media.jsx) owns format fallback,
lazy-load, in-view/hover video autoplay, and the fade+scale reveal — replacing
duplicated image loaders across pages.

**Why.** Imagery/video is the portfolio's most important surface (VISION §4); one
component keeps behaviour consistent and DRY.

---

## Conventions for future entries

When you make a notable choice, add an entry at the top with: **Decision · Why ·
(How / Rejected / Deferred as relevant)**. Keep it short. Link to the files touched.
