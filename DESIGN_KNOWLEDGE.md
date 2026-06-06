# Design Knowledge Base

A durable, project-specific reference of design **expertise** — the UX laws, heuristics,
UI craft, accessibility rules, and motion principles that should inform every decision on
this portfolio. Think of it as the "always-on expert brain" for the project.

- For *what our system is* (tokens, components) → [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).
- For *why we chose things* → [DECISIONS.md](DECISIONS.md).
- For *the vision* → [VISION.md](VISION.md).
- This file = *the principles we design by* + (at the end) **Simon's taste & visual references**.

All thresholds/numbers below are verified against primary sources (lawsofUX, NN/g, W3C
WCAG 2.2, Material 3, Apple HIG, Carbon, Refactoring UI). Treat numbers as **defaults, not
dogma** — but know the rule before you break it.

---

## Contents
1. [UX foundations](#1-ux-foundations) — laws, Gestalt, heuristics
2. [UI & visual design](#2-ui--visual-design)
3. [Accessibility (WCAG 2.2 AA)](#3-accessibility-wcag-22-aa)
4. [Motion & interaction design](#4-motion--interaction-design)
5. [How we apply this here](#5-how-we-apply-this-here)
6. [Taste & visual vision references](#6-taste--visual-vision-references) ← *Simon fills this*
7. [Craft & mastery — the beauty layer](#7-craft--mastery--the-beauty-layer) — *the 1% that separates correct from beautiful*
8. [Sources](#8-sources)

---

## 1. UX foundations

### 1.1 Laws of UX
Heuristics from psychology/economics/HCI — rules of thumb, not physics.

**Decision & effort**
- **Hick's Law** — decision time grows with the number/complexity of choices. → Keep nav to 4–6 items; one clear primary CTA, not five competing ones.
- **Fitts's Law** — time to hit a target depends on its distance and size. → Big tap targets, place actions near where attention already is, exploit screen edges (sticky nav).
- **Tesler's Law (Conservation of Complexity)** — irreducible complexity can only be moved, not removed. → Absorb it into the design (infer system light/dark) instead of asking the user.
- **Occam's Razor** — prefer the simplest solution that works. → Strip a case study to its essential narrative.
- **Pareto (80/20)** — ~80% of value comes from ~20% of things. → Polish the 2–3 best projects + the contact path disproportionately.
- **Parkinson's Law** — tasks expand to fill available time. → Minimize fields, autofill, smart defaults.
- **Doherty Threshold** — productivity holds when system response stays **< 400 ms**. → Lazy-load, skeletons, optimistic UI so it *feels* instant.

**Memory & attention**
- **Jakob's Law** — users expect your site to work like the others they know. → Honor conventions (logo top-left → home, hamburger on mobile); innovate on content/visuals, not on where the menu lives.
- **Miller's Law** — working memory holds ~7±2 items; the real lesson is **chunk**. → Group skills/stats into labeled clusters.
- **Peak-End Rule** — experiences are judged by their peak and their end. → Engineer a memorable hero moment and a satisfying finish (e.g. a delightful contact confirmation).
- **Serial Position Effect** — first & last items are best remembered. → Strongest project first *and* last; Home/Contact at the ends of the nav.
- **Von Restorff (Isolation) Effect** — the element that differs is remembered. → One accent CTA among neutral ones (never color *alone* — pair with shape/label).
- **Zeigarnik Effect** — unfinished tasks stick in memory. → Progress indicators; teaser content that invites scrolling.
- **Goal-Gradient Effect** — motivation rises near the finish. → "Step 2 of 3"; show the finish line is close.
- **Selective Attention / banner blindness** — users filter out ad-like noise. → Don't style a CTA like an ad; quiet competing motion around it.

**States & structure**
- **Aesthetic-Usability Effect** — pretty designs are *perceived* as more usable and forgiven minor flaws. Directly relevant for a designer's own site — polish = credibility. (Don't let it mask real flaws.)
- **Flow** — full immersion; match challenge to skill, remove friction. → Smooth scroll storytelling with no jarring interruptions.
- **Cognitive Load** — total mental effort; cut *extraneous* load. → Whitespace, clear hierarchy, consistent patterns, progressive disclosure.
- Also: **Choice Overload**, **Mental Model**, **Paradox of the Active User** (people don't read instructions — make it self-evident).

### 1.2 Gestalt principles (how the eye groups)
- **Proximity** — near = related. (Label beside its input; tight within a card, loose between cards.)
- **Similarity** — alike appearance = related. (All links one color; all primary buttons one style.)
- **Common Region** — shared boundary = a group. (A card binds image+title+tags.)
- **Closure** — the mind completes shapes. (A half-cut card implies "scroll for more.")
- **Continuity** — the eye follows the smoothest path/line. (Aligned grids read as a sequence.)
- **Figure/Ground** — object vs background. (Blurred/dimmed backdrop pushes a modal forward — our glass scrim.)
- **Prägnanz (simplicity)** — perceive the simplest stable interpretation. → Favor clean shapes.
- **Uniform Connectedness** — visually connected (lines/enclosures) = strongest grouping cue. (Stepper lines, fieldsets.)
- **Common Fate** — things moving together = a group. (A row of cards that reveal together on scroll.)

### 1.3 Nielsen's 10 Usability Heuristics
1. **Visibility of system status** — timely feedback (loaders, "Sent ✓", active nav).
2. **Match the real world** — users' language, familiar concepts ("Download résumé" not "Export asset").
3. **User control & freedom** — clear exits, undo, visible close/cancel.
4. **Consistency & standards** — same word/action = same meaning everywhere.
5. **Error prevention** — prevent before correcting (disable invalid submit, confirm destructive actions).
6. **Recognition over recall** — show options; don't make people remember (menus, breadcrumbs, autocomplete).
7. **Flexibility & efficiency** — accelerators for experts (shortcuts, skip link, saved prefs).
8. **Aesthetic & minimalist design** — every extra element competes with the essential.
9. **Help users recover from errors** — plain language: problem + fix ("Enter a valid email," not "Error 422").
10. **Help & documentation** — ideally unneeded; when needed, searchable & task-focused.

### 1.4 Shneiderman's 8 Golden Rules
Consistency · shortcuts for frequent users · informative feedback · design dialogs for closure · prevent errors · easy reversal · keep users in control · reduce short-term memory load.

### 1.5 Other high-value principles
Recognition > recall · progressive disclosure · affordances & signifiers (Norman) · feedback & feedforward · mapping · curate to avoid choice overload · **never encode meaning by color alone**.

---

## 2. UI & visual design

### 2.1 Visual hierarchy — six levers
**Size · weight · color · contrast · spacing · position.** Rules:
- **Emphasize by de-emphasizing** — quiet everything else rather than shouting the important thing.
- **3 text levels usually suffice** (primary dark / secondary grey / tertiary lighter); combine size+weight+color, not size alone.
- To de-emphasize on a colored background, use a **same-hue** lighter/darker variant — not grey.
- **De-emphasize, don't delete** — keep supporting info reachable but quiet.

### 2.2 Layout & grids
- **12-column** web standard (mobile 4 / tablet 8 / desktop 12); gutters/margins on the spacing scale.
- **8pt grid, 4pt fine increment** — every spacing/size value a multiple of 8 (4 for tight cases). Why: clean scaling across device densities, less decision fatigue, consistent rhythm. (Our scale: `0·2·4·6·8·12·16·20·24·28·32·36·40·48·64·80·128`.)
- **Alignment** — consistent edges; nudge for **optical** alignment (icons, arrows, type with descenders) over bounding-box math.
- **Whitespace** — start with too much, then tighten; space *between* groups must exceed space *within*.
- **Measure** — body text **45–75 characters/line** (~66 ideal); cap prose ~60–75ch.

### 2.3 Typography
- **Modular scale** from a 16px base × a ratio (1.25 Major Third = balanced UI; 1.333 Perfect Fourth = more drama). Expose a **constrained set** (~5–8 sizes). Our scale: 10·12·14·16·18·20·24·32·40·48.
- **Role-based naming over raw px** (display/heading/title/body/label) — decouples intent from value, eases theming. Each role bundles **font + size + line-height + weight (+ tracking)**. (This is exactly our `.type-*` system.)
- **Line-height**: body **1.4–1.6** (1.5 default); headings **1.1–1.25**. Inverse relationship: bigger type → tighter leading.
- **Weight vs size**: prefer weight when space is tight; size when you have room. Two weights usually enough.
- **Tracking**: tighten large display slightly; loosen all-caps/small labels; body at default.

### 2.4 Color
- **60-30-10** — ~60% dominant neutral surface, ~30% secondary structure, ~10% accent. Accent scarcity = it reads as "the action."
- **Primitive vs semantic tokens** — primitives = raw palette (private); semantics = roles (`surface`, `on-surface`, `text-secondary`) that components consume; theming swaps the semantic layer. Material's **"on-" pairing** guarantees foreground/background contrast.
- **Palette shape** (Refactoring UI): ~8–10 greys, primary with 5–10 shades, accent ramps for success/warning/error/info. **Don't use pure grey** (bake in a hue) or **pure black** for text.
- **Status mapping**: green=success, amber=warning, red=error, blue=info — **plus icon/text/shape**, never color alone.
- **Dark mode ≠ inversion** — avoid pure #000 for big surfaces (use ~#121212+), lean on tonal/elevated surfaces over heavy shadow, desaturate accents slightly.

### 2.5 Components & states
Design **every** interactive state: **default · hover · focus-visible · active/pressed · disabled · loading · error · selected.** Notes:
- **Hover is mouse-only** — never the sole affordance.
- **Focus-visible is required** (WCAG 2.4.7); ring ≥3:1 contrast, ≥2px; prefer `:focus-visible`.
- **Disabled** — reduced contrast, not focusable; don't hide if it explains a gated action.
- One component system, consistent padding/radius/transition everywhere.

### 2.6 Spacing, radius, elevation, icons
- **One spacing scale** for all margin/padding/gap → rhythm. Density is a deliberate choice (portfolio = loose).
- **Radius scale** 4/8/12/16(/24/full). **Nested-radius rule**: inner radius ≈ outer − padding (concentric). (Ours caps at 16; pill = icons/circles only.)
- **Elevation** — shadows express distance (small+sharp=close, large+soft=far). **Two-layer shadows**, **tinted toward background hue**, never pure black/grey. Define a scale (ours: xs→xl, theme-aware).
- **Icons** — one set, one stroke weight (≈2dp), one grid (24px base); optically align; size to adjacent type.

### 2.7 Responsive / mobile-first
- Design smallest-first; breakpoints based on **content** breaking (Tailwind: sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536).
- **Fluid type/space via `clamp()`** — but the preferred value must mix `rem`+`vw` (pure `vw` fails zoom → WCAG 1.4.4). Reserve fluid scaling for large headings.

### 2.8 Forms, empty states, feedback, microcopy
- **Forms**: labels **above** fields, **single column**, group related fields, **inline validation on blur**, errors adjacent + multi-cue (color+outline+icon+text), explicit required/optional, no placeholder-as-label.
- **Empty states**: say what goes here, why it's empty, and the next action; differentiate first-use vs no-results vs error.
- **Feedback by wait**: <1s nothing · 1–3s skeleton/spinner · 3–10s determinate bar · 10s+ bar with % + status. Skeletons when layout is known; optimistic UI where safe; feedback near the trigger.
- **Microcopy**: clear > clever; buttons name the action ("Save changes"); errors say what/why/how-to-fix, no blame, no codes-only; sentence case, front-load meaning.

### 2.9 Refactoring UI cheat-sheet
**Do**: start grayscale (color last) · define systems up front (spacing/type/shades/shadows) · start with too much whitespace · emphasize by de-emphasizing · two-layer tinted shadows · size+weight+color for text hierarchy · one clear primary action per view.
**Don't**: pure grey shadows/text/neutrals · grey text on color · borders to separate everything (prefer spacing/bg/shadow) · let elements compete · scale icons up to match large text.

### 2.10 Frosted glass (our signature — 2026)
- Ingredients: **transparency + `backdrop-filter: blur` + a ~1px light-catching border.**
- **Contrast is non-negotiable** — 4.5:1 body / 3:1 large & UI. Put a **semi-opaque film behind text** (our `.glass-panel` stronger scrim); higher blur = more legible.
- **Use selectively** — flat base, glass on a few high-impact surfaces (nav, modal, hero), not everywhere.
- Respect `prefers-reduced-transparency`; provide a solid fallback. **Test both themes.** Performance: limit blurred panels, don't animate blur.

---

## 3. Accessibility (WCAG 2.2 AA)
Target level **AA**. Principles = **POUR**: Perceivable · Operable · Understandable · Robust.

### 3.1 Color contrast
- **Body text ≥ 4.5:1**; **large text ≥ 3:1** (large = ≥24px regular / ≥18.66px bold).
- **Non-text ≥ 3:1** (1.4.11): UI component boundaries, icons conveying meaning, **focus rings**, chart parts.
- AAA (aspirational): 7:1 body / 4.5:1 large.

### 3.2 Target size (2.5.8, AA, new in 2.2)
- **≥ 24×24 CSS px** (exceptions: adequate spacing, equivalent control, inline, UA control, essential).
- Platform guidance is bigger — **Apple 44×44pt, Material 48×48dp**; design touch targets **~44–48px**, 24 is the floor. Enlarge hit area with padding.

### 3.3 Keyboard
- **Everything operable by keyboard** (2.1.1); **no traps** (2.1.2); **logical focus order** (2.4.3); **visible focus** (2.4.7).
- **Focus not obscured** (2.4.11, new in 2.2) — sticky headers/banners must not fully hide a focused element.
- **Skip link** as the first focusable element (Bypass Blocks 2.4.1). *(We ship this.)*

### 3.4 Focus-visible
- **Never `outline:none` without an equivalent.** Prefer `:focus-visible`. Ring high-contrast (≥3:1), ≥2px, use `outline-offset`. **Outlines** (not box-shadow) survive forced-colors mode.

### 3.5 Semantic HTML & landmarks
- `<header>`/`<nav>`/`<main>` (**exactly one**)/`<aside>`/`<footer>`. *(Our App shell now has one real `<main>`.)*
- Headings in **logical, non-skipping order**; one `<h1>`; style with CSS, don't pick levels for size.
- `<button>` acts, `<a href>` navigates — never `<div onclick>`.
- **Alt text** (1.1.1): informative = describe meaning; functional = describe action/destination; **decorative = `alt=""`** (never omit).
- Inputs need a programmatic label (`<label for>` / wrapping / `aria-label`); placeholder ≠ label.

### 3.6 ARIA
- **First rule of ARIA**: use native HTML if it does the job. **"No ARIA is better than bad ARIA"** (ARIA pages average *more* errors). Adding a role = you own its keyboard/state behavior.
- Common: `aria-expanded`, `aria-label`/`-labelledby`, `aria-describedby`, `aria-current="page"`, `role="dialog"`+`aria-modal` (+focus trap + return focus), `aria-hidden` (never on focusable).
- **Live regions**: `aria-live="polite"`/`role="status"` for status; `assertive`/`role="alert"` for urgent (4.1.3).

### 3.7 Motion
- **No flashing > 3×/sec** (2.3.1, seizure safety). **Pause/Stop/Hide** for auto-motion >5s (2.2.2). Disable interaction animation (2.3.3 AAA).
- **`prefers-reduced-motion: reduce`** — replace large spatial motion/parallax with a simple opacity fade (not a hard cut); never rely on motion alone. *(We have a global safety net.)*

### 3.8 Forms a11y
- Labels/instructions (3.3.2) · error identified in text (3.3.1, not color alone) · suggest the fix (3.3.3) · `autocomplete` tokens (1.3.5) · don't ask twice (3.3.7, new) · no cognitive-test logins / allow paste & password managers (3.3.8, new). Associate errors via `aria-describedby` + `aria-invalid`.

### 3.9 Zoom, reflow, contrast modes, screen readers
- **Resize text 200%** (1.4.4) — relative units, no fixed-px clipping. **Reflow** to one column at **320px / 400% zoom** (1.4.10). **Text spacing** override safe (1.4.12).
- `prefers-contrast` (more/less) and `forced-colors: active` (Windows HCM) — use system color keywords, keep `outline` for focus, don't encode meaning in vanishing background-images.
- Screen readers (VoiceOver/NVDA/JAWS/TalkBack) navigate by headings, landmarks, links, fields. Each control needs an accessible **name + role + value** (4.1.2). Use an `sr-only` utility for visually-hidden context.

### 3.10 New in WCAG 2.2
Added: Focus Not Obscured (2.4.11 AA / 2.4.12 AAA), Focus Appearance (2.4.13 AAA), Dragging Movements (2.5.7 AA), **Target Size 24px (2.5.8 AA)**, Consistent Help (3.2.6 A), Redundant Entry (3.3.7 A), Accessible Authentication (3.3.8 AA / 3.3.9 AAA). **Removed**: 4.1.1 Parsing (obsolete). Most relevant here: **2.5.8, 2.4.11, 2.5.7**.

---

## 4. Motion & interaction design

### 4.1 Purpose (motion is functional, not decoration)
Roles: **feedback · orientation/spatial continuity · hierarchy/focus · expressiveness · perceived performance.** Every animation needs a purpose tied to an outcome.
**Don't animate**: high-frequency repeated actions · anything that delays the goal · disorienting/physics-defying motion · when `prefers-reduced-motion` is set · decorative motion that competes with content.

### 4.2 Duration
Working range **200–500ms**; most polished UI **< 300ms**.

| Scope | Range |
|---|---|
| Micro (state flip, hover tint) | ~100ms (50–150) |
| Small (button, checkbox) | 150–200ms |
| Medium (cards, panels, in-page) | 250–300ms |
| Large (modals, drawers, routes) | 300–500ms |

Rules: **duration scales with distance/size** · **exits ~25% faster than entrances** · ~100ms = "instant" floor · keep under ~400ms (Doherty) · cap UI motion under ~1s. *(Our tokens: instant 100 / fast 150 / quick 200 / base 300 / slow 450 / slower 600.)*

### 4.3 Easing
Easing = how speed changes (timing=duration, spacing=easing). Getting it wrong is the #1 reason motion feels "off."
- **Decelerate / ease-out → entrances** (fast start = responsive). The workhorse; default to it.
- **Accelerate / ease-in → exits** (leaving screen).
- **Standard** — slight in+out for elements moving on-screen.
- **Emphasized** — expressive hero transitions. **Spring** — alive, interruption-friendly; best for draggable/gesture UI.
- **Avoid stock CSS `ease-in`/`ease-out`** (too weak) — use custom cubic-beziers; `linear` only for spinners/looping/opacity. *(Our curves: standard `0.2,0,0,1` · decelerate `0.16,1,0.3,1` · accelerate `0.3,0,1,1` · emphasized `0.05,0.7,0.1,1` · spring `0.34,1.56,0.64,1`.)*

### 4.4 Choreography
Lead element first · **stagger siblings ~50–80ms** · animate from the **logical origin** (`transform-origin` at the trigger; drawer from its edge) · shared-element transitions for objects that persist across states · orchestrate in reading order. *(Our `--stagger-1..4` = 60/120/180/240ms.)*

### 4.5 Micro-interactions
Saffer's model: **trigger → rules → feedback → loops/modes.** Patterns: hover lift/tint (~100–150ms) · **press scale ~0.97** · toggle thumb+color together · skeletons over spinners · brief legible success/error · adjacent tooltips switch at 0ms.

### 4.6 Disney principles that serve UI
**Timing** (most important) · **slow in/out** (= easing) · **anticipation** (hover signals clickability) · **follow-through/overlap** (= stagger) · **squash & stretch sparingly** (light overshoot only — heavy looks cheap on a refined glass aesthetic).

### 4.7 Performance
Target **60fps** (16.7ms/frame). **Animate only `transform` & `opacity`** (compositor/GPU). Avoid animating layout (width/height/top/left/margin) and paint-heavy props (box-shadow/background/filter) in loops. `will-change` sparingly (promote then remove). **Don't animate `backdrop-filter` blur** — animate the glass layer's opacity/transform instead; limit simultaneous blurred surfaces.

### 4.8 Accessibility (motion)
Respect `prefers-reduced-motion` — **reduce, don't always remove** (swap "fly across" for "fade in place"; a hard cut can also be jarring). Avoid large-area movement, parallax, looping autoplay, rapid flashing. Never convey info by motion alone.

### 4.9 Patterns
- **Route transitions** — short (300–400ms), crossfade or shared-element; don't over-animate every nav. *(We use a gentle `.page-enter` fade.)*
- **Modal** — backdrop opacity in + panel scale 0.95→1, ease-out ~200–300ms enter, faster exit; scale from near the trigger.
- **Drawer/sheet** — slide from its edge; spring supports drag-to-dismiss.
- **Dropdown/popover** — scale+fade from trigger origin, ~150–200ms, start at **scale 0.95 (not 0)**.
- **Skeletons vs spinners** — skeleton when layout known; nothing under ~300ms.
- **Scroll reveals** — small distance (8–24px), short, staggered, **once** (no re-animate); **no scrolljacking**.
- **Theme transition** — crossfade ~200–300ms or a View Transition; disable on initial load; reduced-motion = instant. *(We use the View Transitions circular reveal.)*

### 4.10 Web implementation
- **CSS transitions** first (state changes; cheap, interruptible, GPU). **`@keyframes`** for looping/multi-step. **WAAPI** (`element.animate()`) when you need JS control (play/pause/reverse, `finished` promise) without a library.
- **View Transitions API** — same-document (SPA) Baseline since Oct 2025 (Chrome 111+/Safari 18+/Firefox 144+); cross-document **not in Firefox yet** (it silently snaps) — always design a no-animation fallback. *(Confirm ours are same-document / router-driven.)*
- **CSS scroll-driven animations** (`animation-timeline: view()/scroll()`) run off the main thread — prefer over JS scroll listeners for reveals/parallax; Safari still catching up → progressive enhancement.

### 4.11 Tooling: build vs buy — our decision *(researched 2026)*
**Decision: keep the owned layer (CSS + WAAPI + IntersectionObserver + View Transitions, ~0kb). Stay library-free until a *specific* need proves CSS/WAAPI can't do it — and if that day comes, reach for Motion (lazy-loaded), not GSAP.** Rationale: Simon's motion is the final, calm ~20% (§6.9); slow eased reveals + smooth transitions + gentle stagger are exactly what the platform does best, natively, at zero cost. Libraries earn their weight on flashy/physics/gesture work he's explicitly ruled out.

Current landscape (verified against primary sources):
- **GSAP** — now **100% free incl. all plugins** (SplitText, MorphSVG, ScrollTrigger…) after Webflow's acquisition. Best-in-class timelines/ScrollTrigger/SVG-morph/text-split, but **imperative, ~23–27kb core (+18kb ScrollTrigger), and tonally wrong** for a calm editorial site. Only if scope pivots to heavy scroll-storytelling / SVG morphing.
- **Motion** (formerly **Framer Motion**; npm package renamed `framer-motion` → **`motion`**, imported `motion/react`) — most React-idiomatic; springs by default, gestures/drag, layout (FLIP), and **`AnimatePresence` for exit/unmount** (the owned layer's one real weak spot). Core is **MIT/free**; **Motion+** (€299 one-time) is optional extras you don't need. Bundle is tunable: **~4.6kb** with `LazyMotion` + `m`, **+15kb** `domAnimation` (reveals/exits, no drag/layout), **+25kb** `domMax` (adds drag + layout). **Motion One** (vanilla `animate()`, ~3.8kb) for imperative-only.
- The honest gaps in our owned layer: **React exit/unmount choreography**, interruptible **springs**, real **drag**, automatic **FLIP** layout. None are needed today.

**Hybrid rule — only add `motion/react` (via `LazyMotion` + `m`, `domAnimation` ≈ 15kb) when CSS/WAAPI genuinely can't do it cleanly:** orchestrated **exit** animations before unmount · **interruptible springs** (element reroutes mid-flight) · real **drag** with momentum (→ `domMax`) · automatic **FLIP** for a list/grid that reorders. Otherwise: build it. Keep the global `prefers-reduced-motion` net regardless.

---

## 5. How we apply this here
Quick map from principle → our implementation (keeps the knowledge actionable):

| Principle | In this project |
|---|---|
| Primitives → semantics tokens | `src/index.css` (`--neutral-*`, `--accent` → `--surface-color-*` etc.) |
| Role-based type | `.type-display … .type-overline` |
| 8pt spacing rhythm | `--space-*` 0–128 / Tailwind scale |
| Restrained accent / 60-30-10 | one `--accent`; all other colour from project imagery |
| Status mapping (not color-alone) | `--feedback-*` + soft surfaces |
| Elevation = tinted, layered, scaled | `--shadow-xs…xl` (theme-aware); glass shadows separate |
| Figure/ground, contrast on glass | `.glass-panel` scrim; reduced-transparency fallback |
| Focus-visible required | `.focus-ring` helper; never bare `outline:none` |
| One `<main>` + skip link | App shell + `.skip-link` |
| Motion: ease-out entrances, fast exits, scale-from-origin | `--ease-*`, `--dur-*`, Header dropdown, ThemeToggle reveal |
| Reduced motion / transparency / contrast | global safety nets in `index.css` |

**Pre-ship checklist** (run before publishing a change):
- [ ] Contrast ≥ 4.5:1 (body) / 3:1 (large & UI) in **both** themes.
- [ ] Keyboard-only pass: visible focus everywhere, logical order, no traps, skip link works.
- [ ] Targets ≥ 24px (aim 44–48 for touch).
- [ ] One `<h1>`, sensible heading order, landmarks intact.
- [ ] Motion honors reduced-motion; only transform/opacity animated; exits faster than entrances.
- [ ] States designed: hover / focus-visible / active / disabled / loading / error.
- [ ] Copy: buttons name the action; errors say what+why+fix.

---

## 6. Taste & visual vision references
> **Simon will fill this in.** This is the home for the *aesthetic* layer — the specific look,
> feel, references, and animation examples that define *this* portfolio's taste (the principles
> above are universal; this section is personal). Drop links, screenshots, and notes per row.
> The more concrete (with URLs/timestamps), the better I can match the intent.

### 6.1 Overall vibe & inspirations
- Reference sites:
  - **seed.com** — frosted glass + light, calm/premium (original north star)
  - **marckuiper.com** — full-bleed animated shader hero, large confident statement type set *directly on the background* (no card), minimal nav; dark and atmospheric
  - **nekohealth.com** — minimal **intro loading screen**: centered wordmark on a plain neutral background with a thin horizontal line that fills as the page loads, then reveals the site. Quiet, premium, branded. ✅ Adapted as a "Simon Knudsen" intro loader.
  - **ultrahuman.com/blood-vision** — premium **bento grids** + cards with **beautiful visuals as backgrounds** (gradient/photo), and a strong **imagery style**: a blue-lit silhouette with annotated callouts ([01] Metabolic, [02] Cardiovascular…), and crisp, moody **product photography** (red-light panel, ring on hand). Confident, science-meets-lifestyle.
  - **volander.studio/project/peaq** — gold standard for **case-study presentation**: a project's palette shown as a proportional, labelled colour-block bento; a whole brand captured in one angled 3D collage of guideline pages; animated type specimens; a quiet sticky section nav (Project · Challenge · Outcome · Credits). Editorial, art-directed, confident.
  - **laugon.com** (Laura Gonzalez) — **hero concept**: a full-bleed B&W portrait with the person's name set ENORMOUS over it (the photo shows through / sits behind the letters), role line bottom-right ("Senior UX Designer · Design Systems & AI"), minimal top nav. Bold, editorial, human. ⏳ Wants a real full-bleed B&W portrait photo to work (the memoji won't); attempt the layout with a placeholder.
  - **marimba.design** — referenced for its **smooth page-switch transition** (couldn't observe the exact motion — JS-driven; not visible to fetch). Treat as: a polished, relaxed cover→reveal where the incoming page settles in cleanly. Aim for that calm quality.
- Mood / adjectives: confident, atmospheric, premium, editorial — big type, lots of room, gradients used as light rather than decoration
- Anti-patterns to avoid: anything that reads as "AI-generated / templated" (e.g. numbered `01 — Section` eyebrows — removed), boxed-in hero cards when the content can stand on the background

### 6.2 Per-section references
| Section | Reference (link) | What to borrow | Notes |
|---|---|---|---|
| Hero | [marckuiper.com](https://www.marckuiper.com/) | Full-bleed shader, big centred headline + 2 buttons directly on the background, no card; "Currently working for [logo]" footnote | ✅ Implemented — card removed, headline ~80px over the shader. Open: add a "Currently working for…" footnote? |
| Nav / header | [marckuiper.com](https://www.marckuiper.com/) | Transparent nav over the hero background | ✅ Shader now rises behind our nav |
| Project card / grid | [ultrahuman.com/us/blood-vision/buy](https://www.ultrahuman.com/us/blood-vision/buy/) | (1) Cards that use **beautiful full-bleed visuals as the card background**. (2,3) **Bento grid** with rich imagery — mixed cell sizes, gradient + photo backgrounds | ⏳ Planned — explore for project cards / a "how I work" or "what's included" style section |
| Project case study | [volander.studio/project/peaq](https://volander.studio/project/peaq) | (1) **Colour presentation** as a bento of proportional colour blocks, each labelled (Neutral 900, Dark Purple 500, Beige 500…) — the palette *is* the layout. (2) **Brand-in-one-image**: an angled/3D perspective collage of guideline pages to show a whole identity in a single hero shot. (Video) **Type styling presented with animation**. (3) **Big type interleaved with a scattered photo grid** — headline words ("Crypto by people") woven *between* offset team portraits, type and image sharing one composition. (4) **Design-system spec sheets as artefacts** — Foundation pages (Typography / Iconography / Dimensions) shown as real framed spec sheets with live specimens + tables (font sizes, spacing scale bars, icon sets). Also: right-side sticky section nav (Project · Challenge · Outcome · Credits) | ⏳ Strong reference for the case-study template |
| About | [marckuiper.com/framer-designer-developer](https://www.marckuiper.com/framer-designer-developer) | **Top section**: huge centred headline ("Designer & no-code developer") with a B&W cut-out photo of himself below + small floating tool-icon chips. Personal, confident, editorial | ⏳ Inspiration for the About page top section |
| Footer / contact | [marckuiper.com/services](https://www.marckuiper.com/services) (footer) | Subtle gradient wash on the footer background | ⏳ Planned |
| Testimonials / "what people say" | [Linear](https://linear.app) · [Stripe customers](https://stripe.com/customers) · [Vercel](https://vercel.com) · [Notion wall of love](https://notion.com) · [Awwwards — testimonials](https://www.awwwards.com/inspiration/testimonials-figarc) · [Godly](https://godly.website) | **Quote as typography** (oversized lead-line statement, not small body text in a box); **featured + grid** (one big pull-quote as focal point, others smaller — breaks symmetric 3-up); **drop the boxes** → borderless surfaces separated by whitespace + soft glow (depth from light); **lead-line emphasis** (first clause bright, rest ~70%); attribution as one quiet lockup (name + muted "role · company" + monochrome logo; avatar only on featured); **one** warm-accent touch (a low-opacity oversized quotation glyph); calm slow fade-up stagger | ⏳ Partially applied: paragraph rhythm + lead line + accent quote glyph + Adtraction logo done. **Parked: the featured+grid asymmetric restructure (biggest lever).** Anti-patterns to avoid: equal bordered cards, star ratings/⭐/"5.0" badges, numbered eyebrows, loud orange, carousels/auto-advance, animated `backdrop-filter` |

### 6.3 Component-level examples
| Component | Reference | Detail to emulate |
|---|---|---|
| Buttons | | |
| Glass surfaces | | |
| Cards | [marckuiper.com/services](https://www.marckuiper.com/services) · [ultrahuman blood-vision](https://www.ultrahuman.com/us/blood-vision/buy/) | Dark cards with a soft directional **gradient glow** in a corner (blue → black) + pill tags (Marc); **full-bleed visual/photo backgrounds** & **bento grid** of mixed cell sizes (Ultrahuman) | ⏳ Planned for service/feature cards |
| Forms | | |

### 6.4 Motion & animation references
> Links to specific animations you love (with timestamps if video). Note the *feeling* (snappy, floaty, springy) and where it'd apply.

| What | Link | Feeling | Where it applies |
|---|---|---|---|
| Animated type-styling reveal | [volander.studio/project/peaq](https://volander.studio/project/peaq) (video) | Considered, editorial — type/specimens animating in to *present* a project's typography | Case-study typography section · style guide specimens |

### 6.5 Type, color & imagery direction
- Typeface direction: _(current: Inter — alternatives you like?)_
- Color/mood: _(accent feeling, light vs dark emphasis)_
- Imagery/video style:
  - **Concept imagery** like [ultrahuman blood-vision hero](https://www.ultrahuman.com/us/) — a blue-lit silhouette with annotated callout chips ([01] Metabolic, [02] Cardiovascular…). Loves the *visual style concept*.
  - **Product/lifestyle photography** like Ultrahuman's Photon panel & ring-on-hand — crisp, moody, high-contrast, premium grading.
  - **Editorial portrait + product** like Ultrahuman "Track Glucose with M1" — dramatic dark lighting, subject against near-black, text overlaid low. Cinematic.
  - **3D glass / translucent icons** floating on a soft blue gradient ("Explore PowerPlugs") — frosted-glass 3D objects, light and premium.
  - **Full-bleed lifestyle/product cards** like "UltrahumanX Membership" (metallic card on black) + "Women's Health" (warm portrait) — image fills the card, headline + button bottom-left.
  - B&W cut-out portrait treatment like [marckuiper about](https://www.marckuiper.com/framer-designer-developer) for the About page.

### 6.6 Why these work — taste analysis (the *why*, not just the *what*)
> The point of this section: so I apply the **underlying principles** to Simon's site, not copy surface details.
> If a new idea violates the shared DNA below, it's probably wrong; if it honours it, it'll likely fit.

#### The shared DNA (what every reference above has in common)
1. **One idea per view.** Each screen has a single, obvious focal point (a headline, a product shot, a wordmark). Everything else is demoted. The eye never has to choose where to look first. This is why they feel *calm* and *expensive* rather than busy.
2. **Type is the primary graphic.** Big, confident, tightly-tracked headlines carry the page — not decoration. Size + weight contrast (huge headline vs small quiet label) does the hierarchy work, so they need very few other elements.
3. **Generous negative space.** Lots of emptiness around the focal point. Space signals confidence ("this content is important enough to stand alone") and is the cheapest way to look premium. Cramped = cheap.
4. **Restraint / limited palette.** Mostly one neutral (near-black or off-white) + one accent, and 2 type weights. Constraints make everything feel intentional and systematic. Premium brands *subtract*.
5. **Depth through light, not borders.** Separation comes from frosted glass, gradient glows, soft shadows and layering — not hard 1px boxes everywhere. Light/shadow reads as physical and high-end; outlines read as utilitarian/templated.
6. **Color as light, not paint.** Gradients and accents behave like a light source (a glow blooming from a corner, a shader behind glass) rather than flat fills. That's what gives the 2024–26 "atmospheric" feel.
7. **Imagery does the emotional work; the UI stays quiet around it.** When a beautiful photo/3D render is present, the surrounding chrome goes minimal so the image is the hero. They never compete.
8. **Motion is subtle, eased, purposeful.** Slow reveals, parallax, a line that fills — decelerated easing, nothing bouncy or springy or attention-grabbing. Motion supports the content; it's never the point.

#### Per-reference breakdown
- **seed.com** — *Calm, light, frosted-glass premium.* Works because of soft contrast (off-white surfaces, gentle shadows), translucency that creates depth without harsh lines, and lots of air. Lesson: in light mode, depth comes from subtle layering + blur, not heavy borders.
- **marckuiper.com (hero)** — *Statement type on a living background.* Works because the giant headline + tiny nav is pure hierarchy: nothing competes with the message. The animated shader adds life/depth but stays low-contrast behind the text so legibility holds. No card needed because the type is strong enough to own the space. Lesson: if the type is big and confident, it doesn't need a container.
- **marckuiper.com/about** — *Personal, editorial.* Huge centred headline establishes voice; the B&W cut-out portrait (no background) keeps it graphic and on-brand, and floating tool-icon chips add personality + tell you *what he does* without a paragraph. Works because it's confident and human at once. Lesson: a portrait can be a design element if it's treated (cut-out / graded), not a snapshot.
- **marckuiper.com/services (cards)** — *Depth via gradient glow.* Dark cards with a directional blue→black glow read as lit objects, not boxes; pill tags chunk info scannably; tons of internal padding. Works because the glow gives hierarchy/depth with zero borders. Lesson: a corner gradient glow + big internal padding = premium card with almost no ornament.
- **nekohealth.com (intro loader)** — *Branded restraint.* A wordmark + a single filling line on a plain field. Works because it does exactly one thing, slowly and precisely; the emptiness + the one moving element feels deliberate and luxurious. Lesson: restraint *is* the design — one element, done precisely, beats a busy spinner.
- **ultrahuman.com/blood-vision (bento + data cards)** — *Rich grid with real substance.* The bento mixes cell sizes so the grid has rhythm (big hero cell + smaller supporting cells), each cell carries a beautiful visual or real data, and dark cards with subtle inner gradients give depth. The biomarker chips/data tables make it feel *credible*, not just pretty. Lesson: vary cell size for rhythm; let real content (data, product) be the texture.
- **volander.studio/project/peaq (case study)** — *The deliverable becomes the design.* Works because it doesn't *describe* the work, it *shows* it: the colour palette is presented as proportional labelled blocks (so the palette itself is the visual), and the whole identity is one art-directed 3D collage rather than a dull grid of flat screenshots. Animated type specimens make the typography feel alive. The sticky side-nav (Project/Challenge/Outcome/Credits) gives a long page a quiet spine. Lesson: present project artefacts *as* designed objects (proportional colour blocks, perspective collages, animated specimens, framed spec sheets) — don't just drop flat screenshots in a column. Two more devices worth stealing: **interleaving big headline type with a scattered photo grid** so type and image share one composition (works for an About/team or hero), and **showing a design system as its own foundation spec sheets** (type scale, icon set, spacing bars) — which fits Simon perfectly since the site already *has* a real token system to put on display.
- **ultrahuman.com (imagery)** — *Cinematic, premium, varied but coherent.* The blue-silhouette concept shot (annotated callouts) turns information into an image; the editorial M1 portrait uses dramatic dark lighting + low-placed text; the 3D frosted-glass icons feel tactile and modern; full-bleed lifestyle cards let the photo fill the frame with text bottom-left. They differ in subject but share **dark moody grading, high contrast, and a single subject per frame** — that consistency is what makes a varied gallery feel like one brand. Lesson: pick a grading/lighting signature and apply it across every image so variety still reads as one voice.

#### What makes design look cheap / "AI-generated" (the inverse — avoid)
- Many competing focal points; no clear first-read.
- Lots of small-to-medium text at similar sizes (weak hierarchy).
- Everything boxed in 1px borders; depth faked with flat grey fills.
- Default/elementary spacing — things touching edges, cramped padding.
- Decorative gradients/colors with no light logic; rainbow accents.
- Generic stock imagery with no consistent grade, dropped in without treatment.
- Templated tells: numbered `01 — Section` eyebrows, centered everything, bouncy/springy hover gimmicks.
- Motion that draws attention to itself instead of the content.

### 6.7 Simon's taste — in general words
A one-paragraph north star to sanity-check any new design against:

> **Confident, minimal, editorial — atmospheric, not decorative.** Big statement typography is the hero; everything else gets out of its way. Lots of negative space and one clear focal point per view. Depth comes from **light** — animated shaders, gradients-as-light, frosted glass, soft shadows — never from hard borders or boxes (he actively dislikes harsh dividers and boxed-in containers). A restrained palette: neutral + one warm orange accent, few weights. Motion is **slow, relaxed and considered** — staggered reveals, smooth morphing transitions, nothing bouncy or gimmicky. Imagery does the emotional work (full-bleed, text overlaid, consistent cinematic grading). Above all it must never read as **templated / AI-generated**: no numbered eyebrows, no redundant labels, no clutter. Let it breathe; let it feel premium and human.

### 6.8 What Simon DOESN'T like — anti-pattern log
> **Rule (also in project memory):** When Simon asks to change, remove, or redo something I designed, treat it as a signal that the original approach was *wrong for his taste* — not just a tweak. Capture the rejected approach here (what I did → what he wanted instead → the lesson) so the same mistake isn't repeated. Keep this list growing.

| I designed → | He wanted → | Lesson |
|---|---|---|
| Hero content inside a frosted **card** | Content directly on the shader, no card | Don't box the hero; confident type owns the space |
| Numbered `01 — Section` **eyebrows** | Removed entirely | Reads as templated/AI — avoid |
| **Magnetic** pull on buttons | Removed | No gimmicky/novelty motion |
| Fixed **90vh** stacking cards | Image-driven height, content overlaid bottom-left | Let the image set the size; overlay, don't split |
| Stacking gap 80 → 200px | 400px | He likes slow, spacious scroll pacing |
| **Stat boxes** (5 yrs / 3 companies…) under the logos | Removed | Cut filler metrics |
| **"View project"** CTA on each project card | Removed (whole card is the link) | Don't repeat the obvious affordance |
| Company **logo marquee** on home | Removed | Don't pad the page with logo walls |
| Harsh **borders/dividers** in the footer | Removed | Separate with space/light, not lines |
| 48px page gutter → 64px | **80px** (desktop) | He keeps wanting *more* room to breathe — when unsure, give whitespace the benefit of the doubt |
| Footer gradient blooming from the **bottom** | From the **top** edge | Light should feel like it enters from above |
| **Drop shadows** on the stacking project cards | Removed | Shadows haloed harshly over the photos when cards piled up — use scale + dim for depth, not a shadow |
| **Button hover** = lift (`translateY`) + bigger shadow + light sweep + press-scale | **Background-colour change only** | He dislikes hover *movement* and added shadows — keep hover flat & calm (a different bg colour); no placement change |
| Letter-spacing tuned toward "body ≈ 0" **best practice** | **Tighter everywhere** — all roles −2% to −5% (display −5%, body −3%, small −2.5%); overline stays positive | Simon explicitly wants a dense, tightly-set ramp across *all* sizes. This is a deliberate taste override of legibility convention — **do not loosen body/small text back toward 0** |
| **`backdrop-filter: blur()` frosted scrim** on the scroll-animated stack cards | Plain dark **gradient** wash | Blurring 6 full-bleed cards *every scroll frame while they scale* was the cause of the "clunky/buggy" stacking — never animate `backdrop-filter` or apply it to scroll-moving/scaling surfaces; reserve it for small, static glass (nav/panels). Depth = cheap transform+opacity only |

### 6.9 Priority hierarchy — where the beauty actually comes from (Simon's weighting)
> Simon's own ranking of what makes a design beautiful. Use it to **allocate effort and
> arbitrate trade-offs** — when two things compete, the higher tier wins. Get the top tier
> perfect before spending time on the bottom.

1. **Typography + spacing/whitespace ≈ 80% of the beauty.** These two, done with real craft, carry almost the whole impression. This is the tier to obsess over: optical type (size/leading/tracking per role), a confident scale, and generous, *relational* whitespace (§7.1, §7.2). If a screen feels "off," fix type and spacing first — not color, not motion. **Never sacrifice whitespace or typographic quality to fit more in.**
2. **Beautiful imagery & video (the next big lever).** Full-bleed, well-graded, consistent images/video do the emotional work; the UI stays quiet around them (§6.5, §6.6 DNA #7). Treat real visuals as a first-class material, not decoration — a great image beats any UI flourish.
3. **Motion — the final, supporting ~20%.** Relaxing, soothing, *non-disturbing*: slow eased reveals, smooth morphing transitions, gentle stagger. It supports the content and is **felt before it's noticed** — never the point, never attention-grabbing (§4, §7.4). If motion competes with the type/imagery, it's wrong. Calm motion needs *less* tooling, not more (see §4.11).

> Corollary: when reviewing or building, walk the tiers top-down. A page with perfect type + spacing + imagery and *zero* motion is already ~beautiful; the reverse (lots of motion, weak type) never is.

---

## 7. Craft & mastery — the beauty layer
> §1–4 are the **principles** (be correct). This section is the **craft** (be beautiful) — the
> advanced, specific techniques elite studios (Linear, Stripe, Vercel, Apple, Family, Rauno,
> Emil Kowalski) actually use. The throughline: **fit the eye, not the math** — optical over metric,
> relational over absolute, perceptual over numeric, physical over played. Treat every number as a
> default to tune by eye. Researched fresh (2024–26); sources in §8.

### 7.1 Typography craft
*Thesis: beautiful type fits the **letterforms** — not their metric boxes — into an optically even rhythm, then turns on the OpenType/variable machinery the typeface designer built for it.*

- **Optical sizing** — `font-optical-sizing: auto` globally for any variable font with an `opsz` axis (Inter, Fraunces, Newsreader, Roboto Flex). The browser redraws per size: display cuts get thinner hairlines + tighter spacing + more contrast (elegance); text cuts get thicker stems + open counters + shorter ascenders (legibility). It is a **redrawing, not a scale** — which is why blowing one weight up to 80px looks cheap (no optical correction). A named `…Display`/`…Text`/`…Deck` cut is the premium tell.
- **Tracking is size-dependent, set in `em`** — tighten large display **−0.01 to −0.03em** (never past ~−0.03 or letters collide); body 16–18px wants **0** (already spaced for that size); tiny text <13px wants **+0.005 to +0.01em**. All-caps & small-caps need **+0.05 to +0.12em** (set `0.1em`, reduce until the dark gaps vanish). Tracking scales **inversely** with weight+size. Token map: `display −0.02 / heading −0.01 / body 0 / caption +0.005 / overline-caps +0.08`. *(Don't double-correct: with `opsz` on, track lighter.)* CSS does tracking, not kerning — keep `font-kerning: normal` so the font's pair tables fire.
- **Measure / leading / size is one coupled system** — measure 45–75ch (66 ideal), set with `max-width: 66ch` (the `ch` unit tracks the font). Leading scales **inversely with size, directly with measure**: display 48–96px → `line-height` **1.0–1.2**; body **1.45–1.6**; wide long-form up to 1.75. Express unitless. **A single global line-height is an amateur tell** — bake a curve into the scale (caption 1.5 → h1 1.05).
- **Line-breaking** — `text-wrap: balance` on headings/blockquotes/short labels (evens line lengths; capped ~6 lines, short text only); `text-wrap: pretty` on body (kills orphans). Global rule: `h1,h2,h3,h4 { text-wrap: balance } p,li,blockquote { text-wrap: pretty }`. Groom hero rags by hand with `&nbsp;` (glue "12 px", "Mr Smith"), `<wbr>`, `<br>`. Hyphenate only with `hyphens: auto` + `lang` on `<html>`. **Never full-justify on the web** without hyphenation (rivers) — ragged-right is the editorial default.
- **OpenType / numerals (the fastest tell)** — `font-variant-numeric: tabular-nums` for anything that aligns or changes in place (tables, prices, timers, **animated counters** — stops digit jitter). `oldstyle-nums` for figures inside body prose (reads instantly more refined); lining for UI. `slashed-zero` for codes/IDs. **True** small caps via `font-variant-caps: small-caps` (faked = anemic) so acronyms (NASA, PDF) stop shouting. Keep `common-ligatures contextual` on; `discretionary` for display only; **off in code**. House style via `font-feature-settings: 'ss01','cv05'` (Inter's humanist `a`, alt `l`) — but it's all-or-nothing, list every feature in one declaration.
- **Variable-font moves** — **`GRAD` (grade)** changes apparent weight **without changing widths → zero reflow**: use for hover emphasis and **dark-mode optical compensation** (dark bg makes text bloom heavier → drop ~1 grade / ~25 wght + tighten tracking a hair; this is real dark-mode typography, not a color flip). Animate `font-variation-settings` only on small runs; respect reduced-motion. Subset to latin + only the axes you ship.
- **Font loading (kill layout shift)** — `font-display: optional` for body (best CLS) or `swap` for brand/above-fold; never default `block` (FOIT). `<link rel=preload as=font crossorigin>` only the 1–2 above-the-fold fonts (`crossorigin` mandatory or it's ignored). **Eliminate the swap reflow** with a metric-matched fallback `@font-face` (`size-adjust`, `ascent/descent/line-gap-override`) — generate it with **Fontaine / Capsize / `next/font`**, don't eyeball. Always WOFF2 + `unicode-range` subset; self-host.
- **Vertical rhythm & pairing** — `text-box: trim-both cap alphabetic` (`text-box-trim`, Chrome 133+/Safari 18.2+) crops the half-leading so a heading sits flush to its cap-height — the real fix for "the button label feels 1px high" and forever-nudging padding. **Strict baseline grids are impractical on the web** (images/components/variable content break them) — chase a consistent **spacing scale + leading**, not a rigid grid. **Single-superfamily discipline** (Söhne, ABC Diatype, Suisse, GT America, Aeonik — one family, optical sizes, many weights) reads more "designed" than two fonts fighting; if pairing, contrast a high-contrast serif display (Reckless, GT Sectra, Editorial New, Canela) over a neutral grotesque body.

### 7.2 Spacing & rhythm craft
*Thesis: elite spacing is **relational and optical**, not absolute and metric — tune space to the visual weight around it, enforce a clear within/between ratio, and break the grid by a pixel when the eye disagrees.*

- **The proximity ratio does the real work** — between-group space must **clearly exceed** within-group space; target a **~2× jump per grouping level** (within 8px → between 16–24px). Below ~1.5× the grouping reads as ambiguous. The fix for ambiguous grouping is almost always to **reduce within-group space** (tightening reads as intentional), not add between.
- **Scale space to the element** — a 13px caption wants ~8px around it; a 56px display wants 32–48px. Tie gaps to cap-height/leading so they grow with type. **But some relationships are absolute**: lock label→input at 4–8px regardless of context.
- **Container math** — card **internal padding ≥ the gap between cards** (≈1.25–1.5×) or separate cards visually fuse; and internal padding > the largest internal gap or content looks like it's leaking out.
- **Optical adjustments (break the grid on purpose)** — buttons/inputs want **horizontal padding ~2–2.5× vertical** (12v / 24–28h) because horizontal counter-space reads tighter; **shave 1–2px off the bottom** of pill/badge text (lowercase sits above baseline → looks bottom-heavy); nudge asymmetric glyphs (play ▶, search, send) **~1–2px / 5–8% toward visual mass** for true optical centering; a 1px border steals a perceived pixel of inner space — compensate.
- **The scale: geometric, not linear** — `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`. Widening gaps mirror **Weber's law** (perceived difference is logarithmic — equal *ratios* feel rhythmic, equal *steps* feel uneven). 4px base divides 16px cleanly. **Audit for off-scale magic numbers** (a stray 18/20px) — consistency of the *system* reads as craft more than any single value. *(Our `--space-*` already follows this.)*
- **Space as a named token** — adopt the inset / stack / inline / **squish** model (Nathan Curtis): a *squished* inset (more horizontal than vertical) is the correct token for buttons/cells; encoding the asymmetry as a token stops devs defaulting to symmetric padding.
- **Negative space is compositional material** — separate **macro** whitespace (between sections, around the comp — signals premium/editorial) from **micro** (line-height, gaps — signals legibility) and tune independently. Design **subtractively** (start too generous, remove). **Active** whitespace (a deliberate void beside a headline) points at content and carries weight. The **doubling heuristic** — take the gap that feels enough, double it — is the fastest route from competent to premium. Whitespace **dies first** under responsive pressure: cut content/columns before section padding.
- **Density is a deliberate tier** — comfortable / cozy / compact, changed via **padding & row-height, never font size**. An editorial portfolio commits firmly to **comfortable**. Never mix tiers in one region unless it maps to a real semantic boundary.
- **Long-page cadence** — **80–160px** between major sections on desktop (48–64 mobile) against **tight 8–12px** intra-component gaps; that extreme micro-vs-macro contrast is the Linear/Vercel signature. Convention: **more space above a heading than below** so it bonds to the content it introduces (margin-top-only "owl" stacking enforces this).

### 7.3 Layout & composition craft
*Thesis: beautiful layout is **engineered tension, not balance** — a few decisive scale jumps, optical alignment, a modular grid you break on purpose, in modern intrinsic CSS that lets content drive the composition.*

- **Pick the right grid (Swiss/Müller-Brockmann lineage)** — manuscript (single block) for long prose; columnar for flexible card/text; **modular** (columns × baseline rows) when you need horizontal *and* vertical registration; hierarchical/content-led for heroes. Design at the level of "spans 7 / spans 5" for **asymmetric splits (7/5, 8/4)** instead of the dead 6/6 centre-line. Treat the outer **margin as an active element** (Swiss books run 40–50% margin) — generous gutters signal premium.
- **Asymmetric balance & tension** — balance a large light element against a small dark/saturated one (**visual weight ≈ size × contrast × density**). Centred symmetry reads safe/corporate; an off-axis composition rebalanced reads confident. Use **empty space as a counterweight**; create one point of imbalance (image bleeding off-edge) and resolve it elsewhere (heavy caption block). **Concentrate then release** (dense cluster + large void) — never the amateur "even spread."
- **Reading patterns are descriptive, not prescriptive** — F-pattern only for text-heavy scannable content (front-load the meaningful word); Z-pattern only for sparse promo layouts; Gutenberg only for *evenly-weighted* layouts. **Strong hierarchy overrides all of them.** Engineer **one dominant focal point via contrast** (not position), then step secondary elements down (1 → 0.5 → 0.25) to guide the eye.
- **Proportion — the honest take** — the **golden ratio is largely myth in UI** (no perceptual evidence; "golden" logo overlays are fudged). Don't justify decisions with it. Reuse **the type scale's ratio** (1.2 / 1.25 / 1.333 / 1.5) for spacing and aspect-ratios so coherence comes from **repetition of one ratio**, not magic. Rule of thirds for image/headline focal placement; dynamic symmetry (√2 = ISO A-paper, reciprocal diagonals) for serious art-directed spreads.
- **Editorial devices** — drop caps via `initial-letter: 3` (correct sinkage, not a float hack); pull quotes 1.5–2× body in a contrasting weight, pulled into the margin; **full-bleed** break-out: `width:100vw; margin-inline: calc(50% - 50vw)` (or a named "full-bleed" grid track); keep body at 60–75ch **even on huge screens** (restraint, not filling the viewport); a **broken/overlapping grid** only reads as intentional against an otherwise rigorous grid; **interleave type with image** (`shape-outside`, headline overlapping a quiet zone) to fuse them into one composition.
- **Optical alignment (the invisible polish)** — punctuation, round letters (O, C, e) and triangular caps (A, V, W) must **overshoot** the metric edge to *look* aligned; hang quotes/bullets into the margin (`hanging-punctuation: first last`, Safari-only → negative `text-indent` fallback). Groom the rag gently convex; trim the line-box with `text-box-trim` so headings sit on-grid by their glyph.
- **Compositional contrast** — **make scale jumps decisive: hero 4–8× body**, not 1.5× (a 96px display over a 16px caption). Timid jumps (18→22) read as indecision. Contrast more than size: **weight** (300 vs 700, skip the middle), **case**, **measure** (one wide + one narrow column), **saturation** (neutral field, single orange ignition). **Reserve the warm-orange accent for the single most important word/action per view** — scarcity *is* its power.
- **Modern CSS toolbox** — **content-driven breakpoints** (add one where the layout actually breaks, found by dragging); **container queries** (`@container` + `container-type: inline-size`) so components respond to *their own* width, not the viewport; **subgrid** (`grid-template-rows: subgrid`) to align card title/body/footer across siblings of different lengths (fixes ragged card footers); **`:has()`** for compositional logic (`.card:has(img)`); intrinsic self-adjusting grids `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))` (the `min(100%,…)` guards overflow — zero breakpoints); `auto-fit` (collapses empty tracks, lone card stretches) vs `auto-fill` (keeps tracks, items stay intrinsic) deliberately; `aspect-ratio` + `object-fit/position` to reserve space and art-direct crops; named `grid-template-areas` for page scaffolds; **`clamp()` fluid scale via [Utopia](https://utopia.fyi)** reused for type, gaps and section rhythm; logical properties (`margin-inline`, `padding-block`) for RTL.

### 7.4 Motion craft
*Thesis: great motion is governed by **continuous physics, not played as fixed clips** — it preserves velocity, animates **from the thing that caused it**, and disappears the moment it stops earning its keep. (Builds on §4's durations/easing/patterns.)*

- **Spring intuition — think in duration + bounce** (Apple WWDC23), not raw stiffness/damping/mass. **Bounce 0 = critically damped** (no overshoot — the default for ~all UI); >0 overshoots; bounce ≈ `1 − dampingRatio`. **Keep bounce ≤ 0.15** for an editorial register — *settle, don't wobble* (0.3+ reads toy-like). Material's split is worth stealing: **spatial** springs may overshoot (things moving in space look alive); **effects** springs are bounce-0 (overshooting opacity/color/shadow looks *broken*).
- **Interruptibility & velocity preservation — the single biggest "good→great" lever.** A spring always has a continuous position **and velocity**, so it can be re-targeted mid-flight; a cubic-bezier tween can't represent velocity, so on interruption it **jerks to a halt and restarts** — the instant amateur tell. Make every reversible thing (dropdown, sheet, accordion) **grabbable mid-flight** (reverse from its current 60%-open position). **Hand gesture velocity (px/s) into the release spring** so a flicked sheet keeps flying. For cursor/scroll-reactive heroes, lerp/`useSpring` toward target — **never bind 1:1** (twitchy/cheap; the spring's lag *is* the premium feel).
- **Origin-aware motion is the whole illusion** — set `transform-origin` to the trigger and **scale FROM it** (dropdown from a top-bar button → `transform-origin: top right`). **Center-scaling a popover is the most common "animated but feels off" mistake.** The reveal trio: **scale 0.96–0.98** (never 0.8 — that's a zoom) + opacity 0→1 + a 4–8px translate toward rest. For navigation, treat the UI as **stacked physical layers** — forward pushes from the trailing edge, back pulls from the leading edge; **direction encodes hierarchy** (in = deeper).
- **The curve itself** — ease-out entrances, ease-in exits, ease-in-out only for on-screen moves, linear only for loops/opacity. Replace weak keyword easings with custom curves (signature out-curve ~`cubic-bezier(.16,1,.3,1)`). **Ship spring-shaped curves in pure CSS via `linear()`** (Easing L2, Baseline) — generate the point list from a spring, paste it, get interruptible-*feeling* CSS-only motion. **Exits ~0.7–0.8× the enter duration** (old content leaves quickly so it doesn't compete). No overshoot on anything users read or that conveys precision.
- **Craft details** — animate a single **`clip-path`** (e.g. `inset()`) instead of two layers racing (Emil's tab: one coherent object vs two unrelated things). A small **`blur(2–8px)→0` on enter** masks sub-pixel artifacts during fast scale/morph — the secret behind "liquid" icon/image reveals (budget it: `filter` isn't composite-only). Text reveals: **per-line** `overflow:hidden` clip masks (translateY 100%→0, 40–60ms stagger) for editorial; **per-character only on short statement headlines** (char-by-char on a paragraph is the canonical gimmick). **FLIP / View Transitions** for layout & shared-element morphs (GPU `transform`), never hand-animated width/height.
- **Perceived performance** — **optimistic motion** (animate success instantly, reconcile on return) decouples felt speed from latency. **Skeletons must occupy the exact final positions** so the swap is a crossfade-in-place, not a reflow (a mismatched skeleton is worse than a spinner). **Do NOT animate high-frequency keyboard/command actions** (Rauno + Emil) — there motion is literal lag and cognitive tax.
- **2026 native toolbox** — **CSS scroll-driven animations** (`animation-timeline: view()` / `scroll()`) run **off the main thread** (no scroll jank) — prefer over IntersectionObserver+JS for reveals/parallax; tighten with `animation-range: entry 0% cover 40%` (full-range reveals feel sluggish). Baseline = Chromium + Firefox shipped, **Safari catching up → feature-detect, progressive enhancement.** **View Transitions:** animate `::view-transition-group()` for position/size morph, the image-pair for crossfade; `view-transition-name` must be **unique per page**; SPA → wrap the DOM mutation in `document.startViewTransition` (React: `flushSync`); MPA → just `@view-transition { navigation: auto }` (same-origin, no JS). *(We already use the circular VT theme reveal + an owned scroll/WAAPI layer.)*
- **Tokenize motion** — a small named set, not magic numbers: durations **fast 120–160 / base 200–260 / slow 320–400ms**; 2–3 signature curves + 2–3 spring presets (snappy bounce-0, gentle 0.1, bouncy 0.2). **Cap almost everything <300ms** (Emil); reserve longer only for large, rare hero travel. **Cohesion over cleverness** — one easing/duration/spring vocabulary applied everywhere is what makes a product feel *designed*; five different easings reads unsystematic no matter how polished each is. Reduced-motion: replace big translate/scale/parallax with **opacity crossfades ≤100ms** — reduce, don't kill feedback.

### 7.5 UX & interaction craft
*Thesis: elite interaction removes the user's **labor and doubt** — front-load the answer, default the decision, validate at the right millisecond, make the wait feel occupied — so it feels effortless and trustworthy, not merely correct.*

- **Form mechanics** — **"reward early, punish late":** validate on **blur**, never per-keystroke from char 1; the moment a field becomes valid, switch to keystroke-level so the error clears instantly; flag empty-required only on submit. Drive the mobile keyboard with **`inputmode` + `type` together** (`inputmode="numeric"` for OTP/PIN, `type="email"`, `inputmode="decimal"` for currency — **never `type="number"` for codes/zips**, it strips leading zeros). **`autocomplete` tokens** (incl. `one-time-code` to surface the SMS code, section-scoped `"shipping postal-code"`). **Single column always** (multi-column doubles completion time). **Reduce fields ruthlessly** (kill confirm-email/password → show-password toggle; derive city/state from postal). Passwordless (magic link / passkey) as the modern default.
- **Psychology of waiting** — **≤100ms = instant, ≤1s = noticed-but-flowing, >10s = lost.** **Optimistic UI** (act → update view instantly → reconcile → quiet rollback toast on failure) is the single biggest perceived-perf lever. **Occupied time feels shorter** — fill waits with motion/skeletons/staged content; bars that **accelerate toward completion** feel faster (Harrison). Skeletons over spinners when layout is known (match shapes, slow ~1.5s shimmer). **Prefetch on intent** (`pointerdown`/hover) so the result is ready before the click resolves.
- **Microcopy & voice** — front-load the information-carrying word (users scan the first ~2 words); buttons = **verb + object naming the outcome** ("Create project", not "Submit/OK"); **sentence case everywhere** (Linear/Stripe/Apple house style); errors name **cause + fix** in plain language ("That email is already registered — sign in?" not "Error 409"), **never blame the user**; cut "please / oops / just / !". **Specificity is credibility** — "Cut checkout abandonment 23%" beats "improved the experience". Helper text shows the *shape*, never the label (placeholders disappear).
- **State design** — empty states are the **highest-leverage, most under-designed screen**: treat first-run as **onboarding** (value line + one CTA + optional sample data). Distinguish the three empties (first-use = teach; cleared = calm "all done"; no-results = offer to clear filters / the exact failed query) — never one generic illustration for all. Errors give a **recovery path** and **preserve entered data**. Success is **quiet & fast** (1.5–2s auto-toast, not a blocking modal). **Design the extremes** (0 / 1 / 10,000 items, longest string, broken image) — a layout that only looks right with demo content is the amateur tell.
- **Friction & decisions** — **good friction is rare and intentional:** confirm only **destructive/irreversible/high-cost** actions (type-to-confirm for the truly irreversible; default focus on the safe option; name the destructive button "Delete 3 files"); for reversible actions skip the dialog and offer **Undo** (respects the user, faster for everyone). **Progressive disclosure = smart defaults + escape hatch** (80% path pre-filled, advanced 20% behind "Show more"). **Reduce decisions by defaulting, not hiding** — a good default is the strongest UX lever. **Exactly one primary action per view** (two competing primaries = none).
- **Portfolio trust & case-study craft** (highest relevance here) — **lead with outcome, not activity:** headline = result + context ("Lifted activation 18% for a B2B onboarding"), then context → **your specific role** → problem → process → outcome → metrics. Make the **hero metric ~3× body size with the baseline shown** ("41% → 59%" — a number without a before reads inflated). **Show process, not just polished frames** (sketches, rejected directions, the tradeoff) — hiring managers buy **judgment**. **Separate your role from the team's** ("I owned X; the team delivered Y") — over-claiming is the fastest credibility-killer. **4–5 deep case studies beat 10 shallow** — quality-over-quantity is itself a senior signal; named quotes with role > anonymous praise.
- **Navigation & mobile** — active state via **≥2 channels** (color + weight/bar), never color alone, never a tint you hunt for. **Thumb zone** (~49% one-handed): primary actions/nav in the **bottom** natural zone, destructive in the hard top corners; touch targets **44–48px + ≥8px spacing** (hit area can exceed the visual via padding). **Gestures are shortcuts, never the only path** — every swipe-to-delete needs a visible button; hint hidden gestures with a peeking edge / grabber. Scroll cues: a **peeking next item** or soft gradient mask says "more this way." **Bottom sheets over center modals** on mobile (reachable, velocity-based swipe-dismiss). Don't hide desktop nav behind a hamburger.

### 7.6 UI visual polish — the 1% layer
*Thesis: 2026 beauty is the disciplined accumulation of **perceptually-correct invisibles** — color stepped in OKLCH, light modeled as one coherent source, hairlines built from transparency, grain dithering the gradients — so nothing reads as "off" and the **restraint itself** is the luxury signal.*

- **Perceptual color — author in OKLCH, not HSL/hex** — fix H & C, walk **L from ~0.97 (tint-50) to ~0.14 (shade-950)**; equal L deltas read as equal visual steps (HSL never delivers this). **Bend chroma down at the extremes** (low C near white *and* black, peak at L≈0.55–0.70 — a chroma "hill") or lights look dirty and darks go neon — this is why Radix/Linear ramps feel clean. Nudge the accent's **hue a few degrees as it lightens** to counter the Abney/Bezold-Brücke shift (oranges drift toward yellow when lightened). **Build hairlines & tints from transparency:** `color-mix(in oklch, var(--fg) 8%, transparent)` adapts over any surface and never looks pasted-on (the core Linear/Vercel surface trick); derive surface levels the same way (`--surface-2: color-mix(in oklch, var(--surface-1), white 4%)`). **Cap accent at the 10% slot** — neutrals do 90% of the work; the accent is a reward (one CTA, one focus ring, one selection).
- **Gradients as light** — **always name the interpolation space:** `linear-gradient(in oklch, …)` (or `in oklab` for the smoothest neutral/atmospheric blends) — default sRGB produces the **muddy gray dead-zone** at the midpoint. **Never fade `to transparent`** in sRGB (ramps through transparent-black → fade-to-grey bug) — fade `in oklab` or to the **same color at 0 alpha** (`oklch(…/0)`). Treat gradients as a **light model**: 2–3 stops, middle stop **off-center (~35–40%)** to mimic real light decay (even stops read synthetic); mesh/radial glows **low-chroma + large-radius**, anchored to one corner (Stripe/Vercel spotlights). **Dither with grain** (below) — 8-bit gradients band on wide low-contrast transitions, especially dark mode.
- **Depth & elevation** — **commit to one light direction** for the whole product (shadows down/away, highlights on the top edge) — inconsistent light is the #1 amateur tell. **Shadows = 2–3 stacked layers** (increasing blur, decreasing opacity) **tinted toward the background hue, never pure black** (pure #000 looks like a dirty smudge). Pair every shadow with a **1px top inner light** (`inset 0 1px 0 color-mix(in oklch, white 12%, transparent)`) — the highlight sells elevation as much as the shadow. **In dark mode express elevation with lighter surfaces, not bigger shadows** (+3–6% white per level — shadows are nearly invisible on dark). Avoid neumorphism on anything interactive.
- **Frost on scroll-animated surfaces — blur a static image copy, not `backdrop-filter`.** `backdrop-filter` re-samples + re-blurs the live backdrop **every frame** the element (or the page) moves — brutal on scroll/scale and across many elements. For a frosted zone over a *fixed* image (e.g. text over a photo card), instead overlay a **duplicate of that image with a static `filter: blur()`**, masked to the zone and slightly over-scaled so soft edges stay clipped: it rasterises **once**, then the GPU just composites/scales the cached texture — same look, a fraction of the cost. Reserve real `backdrop-filter` for small, *static* glass (nav, modals, chips).
- **Glass done right is FOUR layers** (not one blur): (1) translucent fill ~8–14% alpha, (2) `backdrop-filter: blur(16–24px) saturate(160–180%)` — **the `saturate` restores the color the blur drains and is what makes it read as glass, not frost**, (3) a ~1px light-catching inner border on the top/left edges, (4) a contrast scrim / text-shadow so content stays AA-legible. Ship `-webkit-`. Constrain to **small, mostly-static** panels (GPU-expensive); **never animate the blur radius — fade opacity.** *(This refines our §2.10 signature.)*
- **Shape craft** — **continuous-curvature "squircles"** (superellipse, ~60% corner smoothing, radius ≈ 22.37% width) for hero shapes/avatars/large cards: `border-radius` snaps straight→arc (G1) which the eye reads as faintly "tense"; squircles are continuous (G2). No native CSS yet → SVG path / `@property` mask / tiny lib, reserved for a few large elements. Honor the **nested-radius rule** exactly (inner = outer − padding) so concentric corners stay parallel; match icon corner feel to UI corner feel.
- **The micro-details elite teams obsess over** — style **`::selection`** to the accent at low alpha (default browser blue instantly breaks a custom palette); set **`caret-color`** + **`accent-color`** (native checkbox/radio/range inherit the brand — free consistency); craft **`:focus-visible`** rings (2px, `outline-offset: 2px`, keyboard-only) never `outline:none` bare; style **scrollbars** subtly (`scrollbar-width: thin` + `scrollbar-color`, overlay not layout-shifting); lock **icon optical consistency** (uniform stroke ~1.5px, pixel-aligned, optical-size not naive scale); `-webkit-font-smoothing: antialiased` on dark backgrounds to stop heavy text.
- **Texture — grain as the anti-flat finish** — overlay faint **film grain** (`feTurbulence type=fractalNoise`, baseFrequency ~0.6–0.9, desaturated, **3–8% opacity**) over gradients & large flat fills to **dither 8-bit banding** — the texture that reads "expensive" (Vercel/Stripe heroes). `mix-blend-mode: overlay/soft-light`, `pointer-events: none`, small tiled background. **Rasterize to a small WebP/AVIF tile for production** (`feTurbulence` is repaint-costly, brutal on mobile); static only / disable under reduced-motion; use it where banding shows (large low-contrast gradients, dark glows), not on text.
- **Restraint is the actual luxury signal** — one neutral ramp + one accent + status colors; **not adding a second accent** is most of what makes Linear/Stripe/Apple feel premium. Derive everything from tokens (radii, shadow layers, blur, grain opacity, color-mix ratios) so consistency is **structural, not manual** — a single off-system value breaks the spell. **2026 north star, explicitly:** spatial & soft, **light-driven depth** (glass + glow + tinted shadow over hard borders), high-chroma accents used sparingly on near-neutral canvases, generous whitespace, grain to keep it from feeling sterile — Apple "Liquid Glass," Linear's calm, Stripe's atmospheric gradients. *(This is exactly Simon's stated taste — see §6.7.)*

### 7.7 The "invisibles" pre-ship checklist
Craft-level pass to run **alongside** the §5 accessibility checklist — these catch ~90% of what separates *good* from *beautiful*:
- [ ] **Type:** `font-optical-sizing: auto`; leading tightens as size grows (no single global value); display tracked −0.01→−0.03em, caps/labels loosened; `text-wrap: balance` on headings + `pretty` on body; **tabular-nums** on any aligned/animated numbers; no faked small caps; no widows/orphans on hero copy.
- [ ] **Spacing:** between-group ≥ ~2× within-group; card padding ≥ inter-card gap; no off-scale magic numbers; horizontal button padding > vertical; section rhythm large vs tight component gaps.
- [ ] **Layout:** one dominant focal point; decisive scale jumps (not timid); body capped ~66ch; accent appears **once** per view; nothing centered-by-default that could be composed.
- [ ] **Motion:** scales/origins from the trigger (no center-scaled popovers); reversible things interruptible; one shared easing/duration vocabulary; nothing >300ms without reason; reduced-motion = opacity crossfade.
- [ ] **Color/light:** ramps & gradients in **OKLCH/OKLab** (no gray dead-zone, no fade-to-grey); one consistent light direction; tinted layered shadows (no pure-black); dark-mode elevation via lighter surfaces.
- [ ] **The 1%:** custom `::selection`, `caret-color`, `accent-color`, styled scrollbars, `:focus-visible` rings; nested radii parallel; grain on large gradients; glass = fill + blur + **saturate** + inner light + scrim.

---

## 8. Sources
**UX foundations** — [Laws of UX](https://lawsofux.com/) · [NN/g 10 Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) · [Shneiderman's 8 Golden Rules (IxDF)](https://www.interaction-design.org/literature/article/shneiderman-s-eight-golden-rules-will-help-you-design-better-interfaces) · [Gestalt (IxDF)](https://www.interaction-design.org/literature/topics/gestalt-principles)

**UI / visual** — [Refactoring UI](https://www.refactoringui.com/) · [Material 3](https://m3.material.io/) ([type](https://m3.material.io/styles/typography/applying-type), [color roles](https://m3.material.io/styles/color/roles), [elevation](https://m3.material.io/styles/elevation/applying-elevation), [shape](https://m3.material.io/styles/shape/corner-radius-scale)) · [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) · [Polaris](https://polaris-react.shopify.com/) · NN/g ([visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/), [forms](https://www.nngroup.com/articles/web-form-design/), [skeletons](https://www.nngroup.com/articles/skeleton-screens/)) · [Fluid type (Smashing)](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/)

**Accessibility** — [WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [What's new in 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) · [Quickref](https://www.w3.org/WAI/WCAG22/quickref/) · [Contrast min](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) · [Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) · [Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · [Using ARIA](https://www.w3.org/TR/using-aria/) · [ARIA APG](https://www.w3.org/WAI/ARIA/apg/) · [The A11Y Project](https://www.a11yproject.com/) · [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

**Motion** — [Material 3 motion](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs) · [Apple HIG motion](https://developer.apple.com/design/human-interface-guidelines/motion) · [Carbon motion](https://carbondesignsystem.com/elements/motion/overview/) · [Val Head — animation speed](https://valhead.com/2016/05/05/how-fast-should-your-ui-animations-be/) · [Emil Kowalski — great animations](https://emilkowal.ski/ui/great-animations) · [rauno.me/craft](https://rauno.me/craft) · [Disney 12 for UI (IxDF)](https://www.interaction-design.org/literature/article/ui-animation-how-to-apply-disney-s-12-principles-of-animation-to-ui-design) · [View Transitions (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) · [Motion (Framer)](https://motion.dev/)

### §7 Craft & mastery sources (2024–26 research swarm)
**Typography craft** — [Chrome: text-box-trim](https://developer.chrome.com/blog/css-text-box-trim) · [Chrome: text-wrap: pretty](https://developer.chrome.com/blog/css-text-wrap-pretty) · [Google Fonts — optical sizes](https://fonts.google.com/knowledge/choosing_type/choosing_typefaces_that_have_optical_sizes) · [web.dev: size-adjust / metric fallbacks](https://web.dev/articles/css-size-adjust) · [MDN: Variable fonts guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide) · [Pimp My Type — spacing all-caps](https://pimpmytype.com/spacing-all-caps/) · [Richard Rutter — OpenType (clagnut)](https://clagnut.com/blog/2424)

**Spacing & rhythm** — [Refactoring UI — layout & spacing](https://jacobshannon.com/blog/books/refactoring-ui/layout-and-spacing/) · [EightShapes — Space in Design Systems](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62) · [Carbon spacing](https://carbondesignsystem.com/elements/spacing/overview/) · [Material — density](https://m2.material.io/design/layout/applying-density.html) · [Cloudscape — content density](https://cloudscape.design/foundation/visual-foundation/content-density/) · [Optical adjustments (Pixel Darts: Stripe/Linear/Vercel)](https://www.pixeldarts.com/en/post/four-design-principles-behind-stripe-linear-and-vercel)

**Layout & composition** — [Josh Comeau — subgrid](https://www.joshwcomeau.com/css/subgrid/) · [Utopia (fluid clamp)](https://utopia.fyi/clamp/calculator/) · [Clearleft — Utopia](https://clearleft.com/thinking/utopia) · [Jen Simmons — intrinsic web design](https://talks.jensimmons.com/15TjNW) · [MDN: hanging-punctuation](https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation) · [MDN: subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid) · [Modern CSS — contextual spacing](https://moderncss.dev/contextual-spacing-for-intrinsic-web-design/)

**Motion craft** — [Emil Kowalski — great animations](https://emilkowal.ski/ui/great-animations) · [Emil — good vs great](https://emilkowal.ski/ui/good-vs-great-animations) · [Rauno — interaction design](https://rauno.me/craft/interaction-design) · [Apple WWDC23 — animate with springs](https://developer.apple.com/videos/play/wwdc2023/10158/) · [M3 motion tokens](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs) · [Smashing — View Transitions pt.2](https://www.smashingmagazine.com/2024/01/view-transitions-api-ui-animations-part2/) · [MDN: scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)

**UX & interaction craft** — [Emil Kowalski — design-eng skill](https://github.com/emilkowalski/skill/blob/main/skills/emil-design-eng/SKILL.md) · [Smart Interface Patterns — inline validation](https://smart-interface-design-patterns.com/articles/inline-validation-ux/) · [SIP — loading/progress UX](https://smart-interface-design-patterns.com/articles/designing-better-loading-progress-ux/) · [Harrison — progress bars](https://www.chrisharrison.net/projects/progressbars2/ProgressBarsHarrison.pdf) · [Maister — Psychology of Waiting Lines](https://www.columbia.edu/~ww2040/4615S13/Psychology_of_Waiting_Lines.pdf) · [Simon Hearne — optimistic UI](https://simonhearne.com/2021/optimistic-ui-patterns/) · [UX Playbook — senior portfolio 2026](https://uxplaybook.org/articles/senior-ux-designer-portfolio-get-hired-2026) · [Thumb zones 2025](https://diversewebsitedesign.com.au/designing-for-thumb-zones-mobile-ux-in-2025/)

**UI visual polish** — [Evil Martians — OKLCH](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) · [MDN: oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch) · [Josh Comeau — beautiful gradients](https://www.joshwcomeau.com/css/make-beautiful-gradients/) · [CSS-Tricks — grainy gradients](https://css-tricks.com/grainy-gradients/) · [Frontend Masters — grainy gradients](https://frontendmasters.com/blog/grainy-gradients/) · [M3 — elevation](https://m3.material.io/styles/elevation/applying-elevation) · [Material — dark theme](https://m2.material.io/design/color/dark-theme.html) · [Figma — squircles](https://www.figma.com/blog/desperately-seeking-squircles/) · [squircle.js — the math](https://squircle.js.org/blog/math-behind-squircles)
