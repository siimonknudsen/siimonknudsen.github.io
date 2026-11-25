# Font Lab

Tune **BDO Grotesk** (SIL OFL 1.1) into our own variable font, and compare it
live against BDO and a reference font (e.g. PP Neue Montreal). The reference
is only shown and measured: it is never copied into the output.

## Run it

Live (unlisted, not indexed): https://siimonknudsen.github.io/font-lab/

Locally:

```bash
npm run font-lab
```

Open http://localhost:5180. The first load takes ~5 s (it loads a Python font
engine, Pyodide + fontTools, from the jsDelivr CDN).

## What you can change

| Control | What it does |
|---|---|
| Width | Scales every glyph, its spacing and the kerning horizontally |
| Letter spacing | Adds space to every glyph (font units, 1000 = 1 em) |
| Lowercase height | Taller/shorter lowercase; ascenders, descenders and accents follow |
| Alternate letters | Makes a BDO stylistic set (ss01–ss07) the default shapes |

Everything is applied to BDO's three weight masters (300 / 400 / 900) and
rebuilt into a new variable font, so all weights stay smooth. An unchanged
rebuild renders pixel-identical to the original.

## Reference fonts

Drop font files on the page: they're kept in that browser only (IndexedDB).
Or put them in `public/font-lab/reference/` with a `manifest.json` listing the
file names. That folder is git-ignored: reference fonts are licensed to you,
not to the repo.

## Export

"Download variable font" gives `<Name>-VF.ttf`, `<Name>-VF.woff2` and the
settings JSON. The same build from the command line:

```bash
python3 public/font-lab/fontlab.py settings.json out.woff2
```

(needs `pip install fonttools brotli`; `--prepare` regenerates `base/`.)

## License

The output is a modified BDO Grotesk, so it stays under the SIL OFL 1.1: free
to use on the site and to rename, not to sell on its own, and the copyright
notice is kept (the engine adds "Based on BDO Grotesk" to it).
