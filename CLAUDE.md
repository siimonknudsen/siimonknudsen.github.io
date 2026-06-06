# CLAUDE.md — operating guide

Short, high-signal rules for working on this portfolio efficiently and correctly.
**Read this first, every session.** It's deliberately brief to save tokens.

Simon is a **product designer, non-technical re: code/git** — handle all git/terminal,
explain in plain language, never assume he'll edit code.

Stack: React 19 + Vite 7 + React Router 7 · CSS Modules (no Tailwind) · two-tier
design tokens in `src/index.css` · owned motion (CSS + WAAPI + View Transitions, no
GSAP/Framer) · deploys on push to `main` (GitHub Actions → GitHub Pages).

---

## 1. Which doc to read (don't re-derive, don't duplicate)
- **VISION.md** — the why / north star.
- **DESIGN_KNOWLEDGE.md** — the expert brain. §1–5 universal principles · **§6.7 Simon's
  north-star paragraph** · **§6.8 anti-pattern log (what he rejected)** · **§6.9 priority
  hierarchy** · **§7 craft layer** (typography/spacing/layout/motion/UI polish) · §4.11
  motion build-vs-buy.
- **DESIGN_SYSTEM.md** — tokens, type roles, components, motion presets.
- **DESIGN_LOG.md** — every design decision by page→section→component. **Check it before
  changing an existing thing** (it says why it's that way) and **update it after** design changes.
- **DECISIONS.md** — architecture decisions.

**Before any visual/motion change:** skim §6.7 (vision), §6.8 (anti-patterns), §6.9
(priorities), and the relevant §7 craft section. If an idea violates the §6 DNA, it's
probably wrong.

## 2. The design filter (Simon's vision)
Confident, minimal, **editorial** — atmospheric, not decorative. Big statement type is the
hero; one clear focal point; lots of negative space. **Depth from light** (shaders, glass,
glow, soft tinted shadows) — **never hard borders/boxes** (he actively dislikes them). Restrained
neutral + one warm-orange accent, few weights. **Motion is calm, slow, relaxing** — never
bouncy/attention-grabbing. Must never read **templated / AI-generated** (no numbered eyebrows,
no redundant labels, no clutter). **Priority of effort: typography + spacing ≈ 80% → imagery →
motion (last 20%).** He consistently wants **more breathing room** — when unsure, give whitespace
the benefit of the doubt.

## 3. Working rules (learned the hard way)
1. **Preview hygiene (important):** always `pkill -f "vite preview"` before restarting, or a
   stale server keeps serving an old build on :4173 — the cause of most "it's not updating"
   confusion this project. `npm run build` overwrites `dist/`; the running preview serves it.
   When something looks stale, hard-refresh / clean-restart first.
2. **Verify in-browser, never assume.** When the user says something's broken, inspect it
   (`preview_eval` — DOM, computed styles, `elementFromPoint`) before responding. Trust his eyes
   over my assumptions. Don't claim "it's fine" without checking.
3. **Measuring layout:** `await document.fonts.ready` first; use `offsetTop` (layout, transform-
   independent) not `getBoundingClientRect` (shifts during reveal animations).
4. **Do EVERY part of a request.** Parse multi-item / screenshot messages into a checklist and
   address each. With a screenshot, identify the *exact* element before editing (e.g. the chevron
   belonged on dropdown rows, not project cards).
5. **Token economy:** don't re-read files already in context · batch edits then build once ·
   prefer `grep` over full reads · prefer `preview_eval` measurements over screenshots (the
   screenshots here render tiny/low-res). Keep CLAUDE.md and edits terse.
6. **Layout determinism:** prefer padding-driven, fixed layouts over `vh`/`min-height`/centered
   heroes — the latter drift with viewport + font height and break gap balance. (The Worked-at
   gap saga; the hero is now padding-driven.)
7. **Glass/motion perf:** never animate `backdrop-filter` or put it on scroll-moving/scaling or
   large surfaces (jank). For frost over a fixed image, blur a *static image copy*. Reserve
   `backdrop-filter` for small, static glass (nav, tooltips, footer). Animate transform/opacity only.
8. **Accuracy / no fabrication:** never invent Simon's real data (employment dates, metrics,
   company facts). Use clearly-flagged placeholders and ask. Over-claiming kills a portfolio.
9. **Git:** never commit/push unless he asks; each batch needs a *fresh* "push" (the auto-mode
   classifier enforces this). End commits with the Co-Authored-By trailer.
10. **Learn continuously, proactively (don't wait to be told).** Treat every message as a
    learning signal. When Simon states a preference, corrects me, rejects something, reveals a
    fact about himself, or sets a working style, **persist it immediately** to the right place:
    persona/process facts → project memory; taste/refs → `DESIGN_KNOWLEDGE §6` (rejections →
    §6.8); design decisions → `DESIGN_LOG`; working rules → here in `CLAUDE.md`. Keep it terse.
    Goal: never re-learn the same lesson or make him repeat himself.

## 4. Build · verify · deploy
- `npm run build` → (`pkill -f "vite preview"`) → `npm run preview -- --port 4173`.
- Verify with the Claude_Preview MCP: resize desktop (1440×900), `await document.fonts.ready`,
  inspect computed styles. Re-check responsive at mobile when layout-relevant.
- Deploy = commit + `git push origin main`; confirm with `gh run watch <id> --exit-status`.

## 5. Growing the vision / design system
- New references from Simon → analyse the *why it works* and add to **DESIGN_KNOWLEDGE §6**
  (references + per-reference breakdown), and log any new anti-pattern in §6.8.
- Design-system work → extend tokens/components in **DESIGN_SYSTEM.md** + the style guide page,
  keeping the two-tier (primitive → semantic) token model.
