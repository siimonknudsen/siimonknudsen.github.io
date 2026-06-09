# Design System

The single source of truth for the portfolio's design language. Vision lives in
[VISION.md](VISION.md); the decision log (what we chose & why) in
[DECISIONS.md](DECISIONS.md); the design-expertise reference (UX laws, heuristics,
UI/a11y/motion best practices + taste references) in
[DESIGN_KNOWLEDGE.md](DESIGN_KNOWLEDGE.md); frosted-glass specifics in
[GLASS_DESIGN_SYSTEM.md](GLASS_DESIGN_SYSTEM.md). Tokens are defined in
[`src/index.css`](src/index.css) and exposed to Tailwind in
[`tailwind.config.js`](tailwind.config.js). A live reference renders at
**`/design-system`**.

> **No Tailwind (2026-06).** Tailwind was removed entirely; components are styled with
> co-located **CSS Modules** (`*.module.css`) that consume the tokens below. The global
> semantic classes (`.type-*`, `.glass`, colour utilities) live in `src/index.css`.
> Token names/tables here are unchanged — only the delivery mechanism changed.
> (Some text below still says "Tailwind utility" — read that as "token/utility class".)

---

## 1. Token architecture — primitives → semantics

We use the industry-standard tiered model (Material 3, Adobe Spectrum, Atlassian,
Polaris, Primer, Carbon):

| Tier | What it is | Example | Rule |
|---|---|---|---|
| **Primitive** | Raw, context-free value | `--neutral-900: #1a1a1a` | Never used directly in components |
| **Semantic** | A *role*, mapped to a primitive, theme-aware | `--surface-color-primary` | What components consume |
| **Component** | A role scoped to one component (only when it must deviate) | (added as needed) | References semantics |

**Rules of thumb** (from the systems above):
1. Components consume **semantic** tokens, never primitives.
2. **Theme only the semantic layer** — primitives stay fixed; light/dark just
   re-points the aliases.
3. Name by **role/intent, not value** (`text-secondary`, not `gray-400`).
4. **Pair foreground with background** so contrast is guaranteed.
5. Keep primitives "dumb"; add component tokens only when a component truly deviates.

Sources: [M3 tokens](https://m3.material.io/foundations/design-tokens) ·
[Spectrum](https://spectrum.adobe.com/page/design-tokens/) ·
[Atlassian](https://atlassian.design/foundations/tokens/design-tokens/) ·
[Polaris](https://polaris-react.shopify.com/design/colors/color-tokens) ·
[Primer](https://primer.style/product/primitives/token-names/) ·
[Carbon](https://carbondesignsystem.com/elements/color/overview/) ·
[Radix Colors](https://www.radix-ui.com/colors/docs/overview/aliasing).

---

## 2. Colour

### Primitives — colour ramps
- **Greyscale** `--neutral-0 #fff · 50 · 100 · 200 · 300 · 400 · 500 · 600 · 700 ·
  800 · 850 · 900 · 1000 #000`.
- **Brand (orange)** `--brand-50 … 900` (base `--brand-500 #f26a2e`). The single
  owned brand colour — see [DECISIONS](DECISIONS.md) for why orange.
- **Status hue ramps** `--green/amber/red/blue-{50,100,300,400,500,600,700,900}`
  (success / warning / error / info).
- **Transparent ramps** `--transparent-light-{2…80}` (white α) and
  `--transparent-dark-{2…80}` (black α) — the formal basis for glass borders,
  hover overlays and scrims.

### Semantic roles (theme-aware)

| Role token | Light | Dark |
|---|---|---|
| `surface-color-primary` | neutral-0 | neutral-1000 |
| `surface-color-secondary` | neutral-100 | neutral-900 |
| `surface-color-tertiary` | neutral-200 | neutral-800 |
| `text-color-primary` | neutral-1000 | neutral-0 |
| `text-color-secondary` | neutral-600 | neutral-400 |
| `text-color-tertiary` | neutral-500 | neutral-300 |
| `border-color-on-primary` | neutral-200 | neutral-850 |
| `border-color-secondary` | neutral-300 | neutral-700 |

Plus a `*-contrast-*` set (opposite-mode surfaces/text) and the glass set (see §6).
Usage: `bg-surface-color-secondary`, `text-color-secondary`, `border-color-on-primary`.

**Tonal elevation ramp** (`--surface-1..4`, utilities `.surface-1..4`) — depth from a
lightening/deepening *tone*, **not** a shadow or border (Material 3 / Linear; see
DESIGN_KNOWLEDGE §6.10). Higher step = more lifted. Reserve shadow/glow/glass for the
*topmost* layer only — this is the primary "depth from light, no boxes" mechanism.

| Step | Light | Dark |
|---|---|---|
| `surface-1` | neutral-0 | neutral-950 |
| `surface-2` | neutral-50 | neutral-900 |
| `surface-3` | neutral-100 | neutral-850 |
| `surface-4` | neutral-200 | neutral-800 |

**Accent** — the single owned brand colour, **themed**: `--accent` = `brand-500`
(dark) / `brand-600` (light) for contrast, with `--accent-soft` (tint, **OKLCH-derived
from `--accent`** via `color-mix` so it tracks the themed accent) and
`--accent-contrast` (near-black text on the orange fill, keeping labels ≥4.5:1).
Use `bg-accent`, `text-accent`, `bg-accent-soft`, `border-accent`. **All colour beyond
this comes from project imagery** — the chrome stays monochrome + accent. (Switching
the brand to teal is a one-line change of the `--accent` stops.)

> **No raw framework colours in components.** No `neutral-*`, `brand-*`, `bg-white`*,
> or ad-hoc gradients — every colour is a token. (*logo backplates may use white as
> the `--neutral-0` primitive.) This keeps the palette 100% our own.

### Feedback / status colours (theme-aware)

A complete status set so alerts, badges, form validation and toasts have proper
semantics (not just the brand accent). Each picks a lighter hue on dark UI and a
deeper hue on light UI for contrast, plus a soft tinted surface.

| Role | Light | Dark | Utilities |
|---|---|---|---|
| `--feedback-success` | `#059669` | `#34d399` | `text-success`, `bg-success-soft`, `border-success` |
| `--feedback-warning` | `#d97706` | `#fbbf24` | `text-warning`, `bg-warning-soft`, `border-warning` |
| `--feedback-error` | `#dc2626` | `#f87171` | `text-error`, `bg-error-soft`, `border-error` |
| `--feedback-info` | `#2563eb` | `#60a5fa` | `text-info`, `bg-info-soft`, `border-info` |

`error` aliases `danger` (both utilities work). Backed by the full status hue ramps.
Also available as Tailwind `success`/`warning`/`danger`/`info` colours (`.DEFAULT` +
`.soft`). `--overlay-scrim` provides the modal/lightbox backdrop (theme-aware,
via the transparent-dark ramp).

---

## 3. Typography

**Set type with a semantic role class (`.type-*`) — not raw sizes.** Each role
bundles size + weight + line-height (+ tracking), the best-practice approach used
by Material 3, Apple HIG and Polaris (they name type by *role*, never by px, so the
value can evolve without renaming). Apply colour separately (`text-color-*`);
fine-tune with `leading-*` only when needed.

| Role class | Size · Weight | Use |
|---|---|---|
| `.type-display` | 48 · Medium | hero / page display |
| `.type-display-sm` | 40 · Medium | large display |
| `.type-heading` | 32 · Medium | page headings |
| `.type-heading-sm` | 24 · Medium | section headings |
| `.type-title` | 20 · Medium | card / block titles |
| `.type-subtitle` | 18 · Medium | sub-headings |
| `.type-body-lg` | 18 · Regular | lead paragraphs |
| `.type-body` | 16 · Regular | body |
| `.type-body-sm` | 14 · Regular | secondary body |
| `.type-label` | 14 · Medium | buttons, UI labels |
| `.type-caption` | 12 · Regular | meta, captions |
| `.type-overline` | 12 · Medium · uppercase | eyebrows / kickers |

**Vertical metrics are overridden on the `@font-face`** (the global "type looks centred" fix). BDO Grotesk ships a top-heavy box (native ascent 800 / descent 177 / cap 729 per 1000 em) so its letters sit ~5.5% high in any box — visible in every centred UI label and as uneven space above text. We rebalance at the source: **`ascent-override: 90.6%` / `descent-override: 17.7%` / `line-gap-override: 29.4%`**, chosen so `ascent − descent = cap-height` (caps centre in any line-box) while `line-height: normal` stays ~1.38 and descenders never clip. Consequence: the balanced content-box is **1.083em**, so **multi-line display type must not go below `line-height: 1.1`** (the display roles are floored there). See DESIGN_LOG → Global.

**The monospace accent was retired (2026-06-09)** — Simon wants one typeface, so **BDO Grotesk is now used everywhere on the public site**. The **`.font-mono` utility renders the sans** (it keeps only the small meta sizing/tracking, not a different family), converting all ~48 prior mono usages (overlines, stat labels, design-system metadata) to BDO. The **`--font-mono` token is reserved only for genuine code** (the internal Playground code block). See DESIGN_LOG → Global.

**Underlying primitives:** families BDO Grotesk (`--font-sans`, self-hosted variable, wght 300–900, SIL OFL 1.1) + a monospace stack
(`--font-mono`, **now reserved for genuine code only** — see above);
weights regular 400 / medium 500 / semibold 600 / bold 700 (`--weight-*`, Tailwind
`font-regular/medium/semibold/bold`); the size scale **10 → 48**
(`--text-2xs … --text-5xl`, also Tailwind `text-2xs … text-5xl` for rare one-offs);
line-heights `--leading-none/tight/snug/normal`.

**Letter-spacing (tracking)** is negative across the scale for a modern, tight feel —
**graduated** because tight tracking helps large display but hurts legibility at small
sizes: display `--tracking-tighter -4%` → headings `-3%` → titles/body `--tracking-snug
-2%` → small text `--tracking-base -1%`. The uppercase **overline keeps positive
tracking** (`--tracking-label +0.08em`) since all-caps needs it. (See DECISIONS for the
flat-vs-graduated rationale.)

> Components consume the role classes; the raw `text-*` scale remains as a primitive
> for exceptions. The `Heading` / `BodyText` React components are thin wrappers over
> these roles.

---

## 4. Spacing

4px base, curated scale (px) — exposed via Tailwind's default `p-*`/`gap-*`/`m-*`
and mirrored as `--space-*` primitives for custom CSS:

`0 · 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 36 · 40 · 48 · 56 · 64 · 80 · 128 · 164 · 200`

Tailwind mapping: `0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 32, 41, 50`.
Large end (128 · 164 · 200) is intentionally sparse — for page/section rhythm, not component spacing.
Conventions: card padding 24 (`p-6`), section rhythm 80 (`mb-20`), tight stacks 8–16.

---

## 5. Radius, elevation, layering & focus

- **Radius (tight 2026 cap):** `--radius-sm 4 · md 8`; **`lg/xl/2xl/3xl` are all clamped
  to 8px** — cards, panels, bars, images cap at **8px** (use sm/md for new work).
  `--radius-pill` (full) is for **circular elements** (avatars, theme toggle, hamburger,
  the floating nav bar) **and chips/tags** (see below).
- **Chips / tags** are **glass pills**: `--radius-pill`, translucent `--glass-bg` fill +
  `backdrop-filter` blur (`--glass-blur-sm`) + `--glass-border` hairline — theme-aware,
  same frosted material as the rest of the glass system (not a flat solid fill).
- **Cards** (project, testimonial, skill, archive) use the **`.glass-panel`** frosted
  surface + hover lift; project images zoom on hover.

### Elevation (shadow scale)
Theme-aware shadows for **solid** (non-glass) surfaces — tight & subtle in light,
deeper & softer in dark. Glass surfaces keep their own `shadow-glass` / `shadow-glass-lg`.

| Token | Tailwind | Use |
|---|---|---|
| `--shadow-xs` | `shadow-xs` | hairline lift (inputs, chips) |
| `--shadow-sm` | `shadow-sm` | resting cards |
| `--shadow-md` | `shadow-md` | hover / raised |
| `--shadow-lg` | `shadow-lg` | popovers, menus |
| `--shadow-xl` | `shadow-xl` | modals, dialogs |

### Z-index scale (`--z-*`, Tailwind `z-*`)
Named layers replace magic numbers: `hide -1 · base 0 · raised 10 · dropdown 1000 ·
sticky 1100 · header 1200 · overlay 1300 · modal 1400 · popover 1500 · toast 1600 ·
tooltip 1700`. (Lightbox uses `z-modal`; skip-link uses `z-tooltip`.)

### Opacity, border-width & focus
- **Opacity:** `--opacity-disabled .4 · muted .6 · hover .08 · faint .04` (Tailwind
  `opacity-disabled/muted`).
- **Border width:** `--border-width-thin 1 · base 1.5 · thick 2`.
- **Focus ring:** `--focus-ring-color` (accent) · `--focus-ring-width 2px` ·
  `--focus-ring-offset 2px`; helper class **`.focus-ring`** applies an accessible
  offset ring on `:focus-visible`. Never suppressed by reduced-motion.

## 6. Materials (frosted glass)

Summarised here; full spec in [GLASS_DESIGN_SYSTEM.md](GLASS_DESIGN_SYSTEM.md).
`.glass` (chrome, 12px blur) · `.glass-panel` (overlays w/ text, 16px blur, stronger
scrim) · `.glass-item` (hover/active rows) · `.border-glass` (translucent divider).
Blur tokens `--glass-blur-sm/md/lg` (8/12/16 — md/lg lowered for perf, 2026-06-09; see
GLASS §8). Always degrade for reduced transparency/contrast.

---

## 7. Motion & interaction

Engineered, calm, purposeful (Linear/Stripe/Apple feel). Tokens in `index.css`,
exposed as `duration-*` and `ease-*` Tailwind utilities.

### Duration scale
| Token | ms | Use |
|---|---|---|
| `duration-instant` | 100 | press/active, toggles |
| `duration-fast` | 150 | hovers, colour/icon, tooltips |
| `duration-quick` | 200 | small enter/exit (dropdowns) |
| `duration-base` | 300 | modals, drawers, medium |
| `duration-slow` | 450 | large overlays, complex morphs |
| `duration-slower` | 600 | hero choreography, large transitions |

> **Scroll-reveals are NOT duration-based anymore** — they use a **Framer Motion
> spring** (Motion / `motion/react`), tuned once in `src/components/motion/revealMotion.js`
> (Calm: stiffness 55 / damping 18 / mass 1, 28px travel, 90ms stagger). See
> DESIGN_KNOWLEDGE §4.11 for the library decision + §4.9 for the best-practices.

Rule: duration scales with travel/size; keep most UI ≤300ms; **exits ~20% faster
than entrances.**

### Easing curves
| Token | cubic-bezier | Use |
|---|---|---|
| `ease-standard` | 0.2, 0, 0, 1 | on-screen elements moving/morphing |
| `ease-decelerate` | 0.16, 1, 0.3, 1 | **entrances** (fly in & settle) — premium feel |
| `ease-accelerate` | 0.3, 0, 1, 1 | **exits** (leave screen) |
| `ease-emphasized` | 0.05, 0.7, 0.1, 1 | expressive hero transitions |
| `ease-spring` | 0.34, 1.56, 0.64, 1 | playful micro-emphasis (use sparingly) |

### Principles
Purpose · responsiveness (<100ms to input) · choreography (lead element first,
stagger siblings ~50–80ms) · spatial consistency (animate from a logical origin) ·
**restraint** (skip animation on very frequent actions).

Stagger steps are tokenised: `--stagger-1 90 · -2 180 · -3 270 · -4 360` (ms) — used
by the legacy `.fx-stagger` CSS utility. The Framer Motion `<Stagger>` cascades its
children with its own 90ms step (`REVEAL_STAGGER_MS` in `revealMotion.js`).

### Patterns
- **Hover** 150ms ease-out, transform/opacity/colour only; gate behind
  `@media (hover: hover) and (pointer: fine)`.
- **Press** ~100ms, slight `scale(0.97)`.
- **Focus-visible** instant ring — never suppressed by reduced-motion.
- **Dropdowns/overlays** 200ms; fade + small rise; origin near trigger.
- **Scroll-reveal** fade + 28px rise on a **Framer Motion spring** (Calm preset),
  trigger ~28% in view (`useReveal` IntersectionObserver), once; stagger siblings.
  Glass surfaces must BE the reveal element (never wrapped) so their frost survives —
  see GLASS §8. Components: `<Reveal>` / `<Stagger>` (`<ScrollAnimation>` aliases `<Reveal>`).
- **First-load entrance** (above-the-fold heroes / trust rows) — use `<Reveal immediate>`,
  which plays the entrance on **mount** (skips the observer). The hero is on screen at
  load, so its cascade must be **time-based** (sequenced `delay`s), not scroll-gated —
  scroll-triggering it leaves anything below the ~72% line stuck invisible (the user
  never scrolls the hero). Reserve `immediate` for the first screen; everything further
  down stays default scroll-reveal.
- **Word-by-word headline** (`<WordReveal>`) — per-word rise; `stepMs` = cadence between
  words, `delayMs` = start offset, `durationMs` = per-word rise duration (defaults to
  `--dur-slow`; the cinematic Home hero overrides to **900ms / 120ms step**), `whenInView`
  = wait for scroll vs. play on mount.
- **Media reveal** scale `1.03→1` + fade, ~600ms emphasized; hover lift/zoom on cards.
- **Route transitions** (roadmap) 300–450ms; outgoing accelerate, incoming decelerate.
- **Theme switch** — View Transitions API "circular reveal" blooming from the toggle
  (`ThemeToggle`), 500ms decelerate; colour-crossfade fallback where unsupported;
  instant under reduced-motion.

### Accessibility
`prefers-reduced-motion: reduce` collapses all durations to ~0 and disables
translate/scale/parallax/autoplay; opacity/colour/focus still resolve, just
instantly (global safety net in `index.css`).

Sources: [M3 motion](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs) ·
[Apple HIG motion](https://developer.apple.com/design/human-interface-guidelines/motion) ·
[Carbon motion](https://carbondesignsystem.com/elements/motion/overview/) ·
[rauno.me/craft](https://rauno.me/craft).

---

## 8. Media (images & video)

The most important surface (see VISION §4) is handled by one component:
[`src/components/Media.jsx`](src/components/Media.jsx). It owns image **format
fallback** (`.jpg/.jpeg/.png/.webp` when the `src` has no extension), **lazy-load**,
**video** (muted/loop/playsInline, in-view autoplay or `hoverPlay`, poster), a
**graceful reveal** (fade + subtle scale, reduced-motion-safe), and a tokenised
placeholder.

```jsx
<Media src="/projects/zliide-app/images/hero" aspect="aspect-video" />   {/* uniform thumb */}
<Media src={content.heroImage} aspect="auto" priority />                  {/* natural ratio */}
<Media video={{ mp4, webm }} poster={poster} hoverPlay />                 {/* video */}
```

`aspect="auto"` lets the image set its own height; any other value (`aspect-video`,
`aspect-square`, …) gives a fixed object-cover frame. Used in `ProjectCard` and
`ProjectPage` (hero, content blocks, app screens) — replacing the previously
duplicated loaders. Next: a lightbox and explicit width/height to fully eliminate CLS.

---

## 9. Component audit & roadmap

Status of current components and the highest-value upgrades toward the 2026 look.

| Component | Status | Recommended variants / optimisations |
|---|---|---|
| **Header / nav** | ✅ Glass, dropdowns, segmented theme | Done. Optional: active-route underline animation |
| **Button** | ✅ Variants (primary/secondary/accent/glass/ghost/**outline**), **`iconOnly`**, sm/md/lg (32/40/48px), icon slots, loading, `fullWidth`, polymorphic `as`, focus ring, colour-only `:active` press | Optional: link variant |
| **ProjectTag / chip** | ✅ Tokenised (`type-caption`) | Optional outline / active variants |
| **ProjectCard** | ✅ `Media` + hover **zoom + lift** | — |
| **TestimonialCard / SkillCard** | ✅ Rounded, bordered, hover lift | Optional glass surface |
| **Media (image/video)** | ✅ Built (`Media.jsx`); used in ProjectCard & ProjectPage | Lightbox; explicit dimensions to kill CLS |
| **ImageGrid / LogoGrid** | ✅ ImageGrid uses `Media` + click **lightbox**; logos lazy-load + hover | — |
| **Route transitions** | ✅ Gentle fade-in on navigation (`.page-enter`, keyed by path) | Optional: shared-element morphs |
| **ExperienceTimeline** | ⚪ Tokenised colours; currently unused | Migrate text → type roles if re-introduced |
| **Typography** | ✅ Semantic role classes; pages + components migrated | Header chrome keeps a few fine-tuned sizes |
| **Reveal / Stagger / ScrollAnimation** | ✅ Framer Motion spring (`revealMotion.js`); `<ScrollAnimation>` now aliases `<Reveal>` | — |
| **Modal / Lightbox** | ✅ Enter+exit via Motion `AnimatePresence` | Modal not yet wired into a page |
| **/motion-lab** | ⚪ Unlinked dev page — live spring A/B + sliders for tuning reveals | Remove or fold into style guide when done tuning |
| **Hero background** | ✅ Own WebGL shader (`ShaderBackground`) + CSS fallback; **cursor-reactive** (swirl + bloom follows pointer, reduced-motion-safe) | — |
| **ThemeToggle** | ✅ Segmented control + View-Transitions reveal | — |
| **Section** | ✅ Fine | Optional `size` (rhythm) prop |
| **Charts / KPI kit** (`components/charts/`) | ✅ `StatCard` · `StatGrid` · `Sparkline` · `TrendChart` — hand-rolled SVG, **zero deps**, token-driven, glass surfaces, calm draw-in | Optional: hover tooltip w/ bisector, bar chart, `<details>` data-table fallback |

**Shipped:** Media · Button variants · cards (glass + hover) · type migration · hero
shader (gradient-grid mesh) · animated theme switch · full colour tokenisation ·
4·8·12·16 radius scale · ImageGrid lightbox · route transitions · **feedback/status
colours · elevation scale · z-index scale · opacity/border-width/focus tokens · mono
+ semibold/bold weights · stagger tokens** · **charts/KPI kit**.

### 9.0 Button

`variant`: **primary · secondary · accent · glass · ghost · outline**. The **`outline`**
variant is a translucent **`--glass-border` hairline** (a soft edge that reads as glass) —
**never a hard 1px border** (Simon's anti-box rule). **`iconOnly`** renders a square button
(no label padding) and **requires an `aria-label`**. Sizes **sm / md / lg = 32 / 40 / 48px**
(sm padding tokenised to `--space-12`). **Hover and press are colour-only — no lift or scale:**
hover changes background (+ the rolling-text label), and `:active` is a pressed colour-darken
(see DESIGN_LOG §12 for the text-roll detail). Demoed on `/design-system`.

### 9.1 Charts & KPI kit (`src/components/charts/`)

Hand-rolled SVG, **zero dependencies** (no Recharts/d3/Tremor) — see DESIGN_KNOWLEDGE §6.10
for the research rationale. Editorial/minimal: no chart junk (no gridlines, boxed plots
or legends), accent gradients fading to transparent (depth from light; the glass frosts
through), direct end-labels over legends, calm draw-in motion that **snaps to final state
under reduced motion**, `tabular-nums` on every figure.

- **`StatCard`** — one KPI on a `.glass` surface (spotlight glow, no border). Anatomy: label
  → big value (calm count-up via `useCountUp`) → delta (arrow + sign, **never colour-alone**)
  → optional sparkline. `accent` prop reserves the warm accent for ONE hero metric per view.
- **`StatGrid`** — responsive `auto-fit` layout (wraps, never squishes), injects a stagger
  `delay` per card. Keep a row to 1–4 cards.
- **`Sparkline`** — minimal inline trend (no axes); accent area gradient → transparent;
  responsive via `vector-effect: non-scaling-stroke`; draws in via `pathLength="1"`.
- **`TrendChart`** — single-series line/area with a faint baseline hairline + end-of-line
  dot + direct label. **Interactive**: hover / touch (or focus + ←/→, Home/End, Esc) moves a
  vertical guide + highlighted point with a value tooltip (`labels` + `format` props); the
  active point is announced via `aria-live`. `role="img"` + `aria-label` takeaway. Tooltip is
  a solid surface (not glass) to avoid glass-on-glass over a panel.

`useCountUp(target, active)` (in `src/hooks/`) eases 0→target on reveal (easeOutCubic, no
overshoot); reduced motion shows the target directly. Demo lives on `/style-guide#data`.

---

## 10. UX & accessibility

Improvements made alongside the token work:

- **Skip-to-content link** (`.skip-link`, first focusable element) → jumps past the
  nav to `#main-content` on every page (keyboard / screen-reader users).
- **404 page** ([`NotFound.jsx`](src/pages/NotFound.jsx)) on a catch-all route, with
  full site chrome and clear ways back.
- **Per-route document titles** ([`usePageTitle`](src/hooks/usePageTitle.js) +
  a route→title map in `App.jsx`); project pages set their own title.
- **Mobile menu**: body scroll-lock while open + close on `Escape`.
- **Lightbox & overlays** use the `--overlay-scrim` token and `z-modal` layer.
- **Reduced motion / transparency / contrast** all degrade gracefully (global
  safety nets in `index.css`).
- Focus-visible rings via `.focus-ring`; interactive targets keep ≥40px hit areas.

**Remaining (optional):** migrate the (currently unused) ExperienceTimeline to type
roles if re-introduced; `Media`-backed LogoGrid; shared-element route morphs;
hoist Header/Footer into a single App shell (so the nav never re-mounts on
navigation) and add a true `<main>` landmark per page.
