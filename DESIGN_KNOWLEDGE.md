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
7. [Sources](#7-sources)

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
- **CSS transitions** first (state changes; cheap, interruptible, GPU). **`@keyframes`** for looping/multi-step.
- **View Transitions API** — same-document (SPA) Baseline since Oct 2025 (Chrome 111+/Safari 18+/Firefox 144+); cross-document partial (no Firefox yet) — always design a no-animation fallback.
- **JS libs**: **Framer Motion (Motion for React)** for springs, gestures, layout & **exit** animations (`AnimatePresence`) CSS can't do on unmount; **Motion One** (~3–5kb) for WAAPI-based spring/timeline without React. Use CSS for simple/perf-critical; reach for a lib when you need interruptible springs, drag, orchestrated exits, or shared-element beyond View Transitions.

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
- Reference sites: _e.g._ seed.com, meetcleo.com — _add more + what you like about each_
- Mood / adjectives: _(e.g. calm, premium, editorial, confident, warm…)_
- Anti-patterns to avoid: _(what you dislike)_

### 6.2 Per-section references
| Section | Reference (link) | What to borrow | Notes |
|---|---|---|---|
| Hero | | | |
| Nav / header | | | |
| Project card / grid | | | |
| Project case study | | | |
| About | | | |
| Footer / contact | | | |

### 6.3 Component-level examples
| Component | Reference | Detail to emulate |
|---|---|---|
| Buttons | | |
| Glass surfaces | | |
| Cards | | |
| Forms | | |

### 6.4 Motion & animation references
> Links to specific animations you love (with timestamps if video). Note the *feeling* (snappy, floaty, springy) and where it'd apply.

| What | Link | Feeling | Where it applies |
|---|---|---|---|
| | | | |

### 6.5 Type, color & imagery direction
- Typeface direction: _(current: Inter — alternatives you like?)_
- Color/mood: _(accent feeling, light vs dark emphasis)_
- Imagery/video style: _(grading, framing, motion)_

---

## 7. Sources
**UX foundations** — [Laws of UX](https://lawsofux.com/) · [NN/g 10 Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) · [Shneiderman's 8 Golden Rules (IxDF)](https://www.interaction-design.org/literature/article/shneiderman-s-eight-golden-rules-will-help-you-design-better-interfaces) · [Gestalt (IxDF)](https://www.interaction-design.org/literature/topics/gestalt-principles)

**UI / visual** — [Refactoring UI](https://www.refactoringui.com/) · [Material 3](https://m3.material.io/) ([type](https://m3.material.io/styles/typography/applying-type), [color roles](https://m3.material.io/styles/color/roles), [elevation](https://m3.material.io/styles/elevation/applying-elevation), [shape](https://m3.material.io/styles/shape/corner-radius-scale)) · [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) · [Polaris](https://polaris-react.shopify.com/) · NN/g ([visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/), [forms](https://www.nngroup.com/articles/web-form-design/), [skeletons](https://www.nngroup.com/articles/skeleton-screens/)) · [Fluid type (Smashing)](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/)

**Accessibility** — [WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [What's new in 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) · [Quickref](https://www.w3.org/WAI/WCAG22/quickref/) · [Contrast min](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) · [Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) · [Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · [Using ARIA](https://www.w3.org/TR/using-aria/) · [ARIA APG](https://www.w3.org/WAI/ARIA/apg/) · [The A11Y Project](https://www.a11yproject.com/) · [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

**Motion** — [Material 3 motion](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs) · [Apple HIG motion](https://developer.apple.com/design/human-interface-guidelines/motion) · [Carbon motion](https://carbondesignsystem.com/elements/motion/overview/) · [Val Head — animation speed](https://valhead.com/2016/05/05/how-fast-should-your-ui-animations-be/) · [Emil Kowalski — great animations](https://emilkowal.ski/ui/great-animations) · [rauno.me/craft](https://rauno.me/craft) · [Disney 12 for UI (IxDF)](https://www.interaction-design.org/literature/article/ui-animation-how-to-apply-disney-s-12-principles-of-animation-to-ui-design) · [View Transitions (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) · [Motion (Framer)](https://motion.dev/)
