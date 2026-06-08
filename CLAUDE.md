# CLAUDE.md — operating guide

Short, high-signal rules for working on this portfolio efficiently and correctly.
**Read this first, every session.** It's deliberately brief to save tokens.

Simon is a **product designer, non-technical re: code/git** — handle all git/terminal,
explain in plain language, never assume he'll edit code.

Stack: React 19 + Vite 7 + React Router 7 · CSS Modules (no Tailwind) · two-tier
design tokens in `src/index.css` · motion = CSS + WAAPI + View Transitions for the base
layer **plus Motion (Framer, the `motion` pkg) for spring/feel** — the library-free line
was crossed consciously for spring physics + AnimatePresence exits (see DESIGN_KNOWLEDGE
§4.11; lazy-loaded via `LazyMotion`) · deploys on push to `main` (GitHub Actions → Pages).

**Golden rules (the ones I keep relearning — obey first):** ① `pkill -f "vite preview"`
before any restart. ② Verify in-browser (`preview_eval`) before claiming anything works
or is broken — trust his eyes over my assumptions. ③ Do EVERY part of a multi-item
request. ④ Never commit/push unless asked (fresh "push" per batch). ⑤ Never fabricate his
real data — flag placeholders and ask.

**Conventions (don't undo):** tight radius — cards/panels/images **≤8px** (radius scale capped at 8 in `index.css`; pills excepted). Glass cards use the **cursor spotlight** (`useSpotlight` hook + global `.fx-spotlight`, theme-aware `--glass-glow`), **never a hover `translateY` lift**. Light-mode glass is intentionally translucent (0.66/0.46) so it frosts; keep glass surfaces on the `glass`/`glass-panel` classes (semantic tokens, never hardcoded), working in both themes.

**Repo map:** pages → `src/pages/` · components → `src/components/` (`home/`, `projects/`,
`buttons/`, `cards/`, `grids/`, `motion/`) · tokens + globals → `src/index.css` · shell +
routes → `src/App.jsx` · analytics/consent → `src/lib/consent.js`.

---

## 1. Which doc to read (don't re-derive, don't duplicate)
- **VISION.md** — the why / north star.
- **DESIGN_KNOWLEDGE.md** — the expert brain. §1–5 universal principles · **§6.7 Simon's
  north-star paragraph** · **§6.8 anti-pattern log (what he rejected)** · **§6.9 priority
  hierarchy** · **§7 craft layer** (typography/spacing/layout/motion/UI polish) · §4.11
  motion build-vs-buy.
- **DESIGN_SYSTEM.md** — tokens, type roles, components, motion presets.
- **GLASS_DESIGN_SYSTEM.md** — the frosted-glass subsystem: glass tokens +
  `.glass`/`.glass-panel`/`.glass-item` classes + legibility/perf/a11y rules.
  Read before any glass/transparent-surface work. (Linked from DESIGN_SYSTEM.md.)
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
   - **Browser cache:** after a rebuild the tab may keep the *old* CSS/JS — if `preview_eval`
     shows a computed value that contradicts the source you just built, hard-reload
     (`location.reload(true)`) before debugging deeper. (Chased a "stale" quote-glyph that was
     really just cached CSS.)
   - **MCP preview loses its serverId on in-app navigation/SPA reload** — `preview_list` goes empty
     and evals error "Server not found" even though the server is *still up* (`curl :4173` → 200).
     Just call `preview_start` again to re-register (it reuses the live server). Also `vite preview`
     procs **stack up** (saw 3 at once) → `pkill -f "vite preview"` kills all, then start one.
   - **Scroll for screenshots:** the page sets `scroll-behavior: smooth`, which makes programmatic
     `window.scrollTo` silently no-op (scrollY stays put). Set
     `document.documentElement.style.scrollBehavior='auto'` first, then `scrollTo({behavior:'instant'})`.
     And the home project cards are **sticky/stacking**, so `scrollIntoView` lands at the section top
     (shows the hero) — compute an explicit `offsetTop + N` offset to land on a pinned card.
2. **Verify in-browser, never assume.** When the user says something's broken, inspect it
   (`preview_eval` — DOM, computed styles, `elementFromPoint`) before responding. Trust his eyes
   over my assumptions. Don't claim "it's fine" without checking.
3. **Measuring layout:** `await document.fonts.ready` first; use `offsetTop` (layout, transform-
   independent) not `getBoundingClientRect` (shifts during reveal animations).
3b. **Preview can't *show* scroll-reveals or below-fold content.** The `preview_eval` realm reports
    `innerHeight: 0`, so IntersectionObserver never fires — anything gated by `useReveal` /
    `.fx-reveal` / `ScrollAnimation` stays at `opacity:0`, and `preview_screenshot` captures
    top-of-document (blank for below-fold). Count-ups, chart draw-ins and fade-up reveals therefore
    can't be *seen* in-preview. Verify structurally instead: DOM + `getComputedStyle`
    (`preview_inspect`), and simulate interaction with a FULL pointer sequence (`pointerenter` →
    `pointermove`, `composed:true`) to reach React's delegated handlers (a lone `pointermove` won't
    register). Force-reveal via DOM (`classList.add('is-visible')`) shows layout only, not
    React-state animation — so **have Simon eyeball the actual motion in his real browser.**
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
   **Backdrop-filter traps (full mental model in GLASS_DESIGN_SYSTEM.md §8):** any *ancestor* with a
   non-`none` `transform`/`filter`/`will-change`/`contain`/`opacity<1` (even `translateY(0)` /
   `fill-mode: forwards` leftovers) is a "backdrop-root" → kills descendant `backdrop-filter` (frost
   renders nothing). An element's *own* transform is fine — so **animate the glass element itself,
   never a wrapper**, OR decouple the reveal (quick tween on transform, slow on opacity — see
   `REVEAL_SHIFT`). And: **blur is invisible over a smooth backdrop** — "glassy" comes from
   translucency+tint+noise, so **panel opacity is the lever**, not more blur. **On-media chrome**
   (text/pills over project photos) uses the
   `--transparent-light-*` + `--text-on-media`/`--accent-on-media` tokens, NOT glass (it lives on
   transform-scaling cards) and NOT hardcoded rgba.
7b. **CSS source-order trap:** two single-class rules with equal specificity → the *later* one
    wins. A `.hidden { display:none }` defined before `.chip { display:inline-flex }` never hides
    anything. Use a compound selector (`.chip.hidden`) to win regardless of order. (The phantom
    "+1" archive-tag bug.)
8. **Accuracy / no fabrication:** never invent Simon's real data (employment dates, metrics,
   company facts). Use clearly-flagged placeholders and ask. Over-claiming kills a portfolio.
9. **Git:** never commit/push unless he asks; each batch needs a *fresh* "push" (the auto-mode
   classifier enforces this). End commits with the Co-Authored-By trailer.
   **Before EVERY push — sync-check first (multiple sessions write to `main`):** `git fetch`,
   then if behind upstream, *stop* — run `git log HEAD..@{u} --oneline` to see what the other
   session/push did, integrate (`git pull --rebase origin main`), rebuild & re-verify in the
   browser, *then* push. A committed PreToolUse hook (`.claude/settings.json`) auto-blocks any
   `git push` while behind, but do this review consciously, don't just rely on the block.
   **Sessions share ONE checkout (no worktree isolation), so Simon's rule is: work ONE session
   at a time on this repo** — finish/close one before starting the next. That avoids collisions
   entirely. *Fallback for when sessions DO overlap* (you'll see other sessions' uncommitted edits
   + untracked files in the tree): when committing, **stage only the files YOU changed this
   session, by explicit path — never `git add -A`/`git add .`.** `git diff <file>` each first to
   confirm it's only your change (CSS/JSX get co-edited); **skip any file entangled with another
   session's work or that imports an untracked file** (committing it alone breaks the build — e.g.
   a page importing a not-yet-committed component). Hold those for a coordinated push and say so.
10. **Learn continuously, proactively (don't wait to be told).** Treat every message as a
    learning signal. When Simon states a preference, corrects me, rejects something, reveals a
    fact about himself, or sets a working style, **persist it immediately** to the right place:
    persona/process facts → project memory; taste/refs → `DESIGN_KNOWLEDGE §6` (rejections →
    §6.8); design decisions → `DESIGN_LOG`; working rules → here in `CLAUDE.md`. Keep it terse.
    Goal: never re-learn the same lesson or make him repeat himself.
11. **Fan out to agents/swarms proactively — but only for the right shape of work.** Don't wait to
    be asked. **Auto-fan-out** when work is *independent + parallel*: multi-topic research, broad
    audits (one agent per page/file), exploring several design directions to compare, or large
    repo-wide sweeps/migrations. For a big/expensive swarm, state the rough scope first. **Stay
    solo** (no agents) for the common case here: small sequential design tweaks, anything needing
    live in-browser verification (agents can't see the preview), or tightly-coupled back-and-forth
    — a swarm there is slower and burns far more tokens. Default = solo; reach for a swarm when the
    task genuinely splits into parallel chunks.
12. **Keep the Design System page + docs in sync with EVERY change (Simon's standing request).**
    Whenever you change a token, component, material, or visual treatment, in the SAME batch
    update **(a)** the live Design System page (`StyleGuide.jsx` → `/design-system`) so it *shows*
    the new look/values, and **(b)** the owning doc (`DESIGN_SYSTEM.md` / `GLASS_DESIGN_SYSTEM.md`,
    + `DESIGN_LOG.md` for the decision). The DS page is the public showcase — a stale page reads as
    broken. Don't wait to be asked; treat "done" as including the page + docs. (E.g. the spacing
    scale page was missing `164` for a whole session because this wasn't done.)

## 4. Build · verify · deploy
- `npm run build` → (`pkill -f "vite preview"`) → `npm run preview -- --port 4173`.
- Lint: `npm run lint` (ESLint). No test suite — verify visually in-browser (above).
- Verify with the Claude_Preview MCP: resize desktop (1440×900), `await document.fonts.ready`,
  inspect computed styles. Re-check responsive at mobile when layout-relevant.
- Deploy = commit + `git push origin main`; confirm with `gh run watch <id> --exit-status`.

## 5. Growing the vision / design system
- New references from Simon → analyse the *why it works* and add to **DESIGN_KNOWLEDGE §6**
  (references + per-reference breakdown), and log any new anti-pattern in §6.8.
- Design-system work → extend tokens/components in **DESIGN_SYSTEM.md** + the style guide page,
  keeping the two-tier (primitive → semantic) token model.
