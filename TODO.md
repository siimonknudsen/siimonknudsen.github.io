# TODO — open items

Living list of known open tasks. Most are **waiting on Simon's input/assets** (rule:
never fabricate his real data). Check this at session start; prune when done.

## Waiting on Simon

- [ ] **CV PDF** — the About "Download CV" button links to `simon-knudsen-cv.pdf`,
  which doesn't exist in `public/` → live 404 for anyone clicking. Either drop the
  real PDF in `public/` (keep that exact filename) or remove the button.
  (`src/pages/About.jsx` ~line 159.)
- [ ] **Social-share image (og:image)** — currently `simon-virtual.png` at 225×226;
  link previews on LinkedIn/iMessage/Slack look low-quality. Needs a proper
  **1200×630** image (e.g. name + title on the site's dark surface, or a hero shot).
  Update the `og:image` / `twitter:image` meta in `index.html`.
- [ ] **Design-system Patterns demo metric** — the on-media chrome card on
  `/design-system` shows a placeholder **"+38% revenue"** chip. Swap for a real,
  approved metric or a neutral label. (`src/pages/StyleGuide.jsx`, Patterns section.)
- [ ] **Aarstiderne campaign imagery** — the archive project has no images
  (`noMedia: true` in `src/components/projects/ProjectGrid.jsx` skips all requests).
  When Simon provides a hero: drop it in
  `public/projects/aarstiderne-campaign/images/`, run
  `node scripts/optimize-images.mjs`, remove the `noMedia` flag.
- [ ] **Case-study outcome metrics** — project pages keep outcomes qualitative on
  purpose; exact numbers still need Simon's real data per project.

## Maintenance habits (no action needed now)

- New project images → run `node scripts/optimize-images.mjs` (WebP + menu thumb),
  reference `.webp` in `content.json`.
- Font metrics ever re-tuned → re-bake the binary AND rename the file
  (see DECISIONS.md 2026-06, "Font vertical metrics baked into the binary").
