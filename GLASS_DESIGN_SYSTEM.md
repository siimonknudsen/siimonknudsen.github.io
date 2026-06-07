# Glass Design System

The frosted-glass ("glassmorphism") system for the 2026 refresh. It's built as
**two tiers of design tokens** + **three reusable material classes**, so every
glass surface across the site stays consistent and theme-aware (light/dark).

All tokens live in [`src/index.css`](src/index.css). Components consume them via
the `.glass`, `.glass-panel`, and `.glass-item` classes — never hard-coded blur
or rgba values.

---

## 1. Principles (why it's built this way)

Distilled from [NN/g — Glassmorphism](https://www.nngroup.com/articles/glassmorphism/),
[Axess Lab — Glassmorphism & Accessibility](https://axesslab.com/glassmorphism-meets-accessibility-can-frosted-glass-be-inclusive/),
and [Material 3 design tokens](https://m3.material.io/foundations/design-tokens):

1. **Legibility beats prettiness.** Blur alone does *not* make text readable over
   busy backgrounds. Any glass that holds text gets a stronger semi-opaque fill
   (a "scrim"). That's why `.glass-panel` is more opaque than `.glass`.
2. **More blur over busy content, less over flat.** Bars use medium blur (16px);
   menus that float over images use large blur (24px). Avoid huge ultra-blur
   areas — `backdrop-filter` is GPU-expensive and hurts battery/scroll perf.
3. **Sell the glass with edges, not just transparency.** A 1px border + an inner
   top highlight + a soft drop shadow give the pane depth, especially over flat
   areas where there's nothing to blur.
4. **Never nest blurred surfaces.** A `backdrop-filter` element inside another
   `backdrop-filter` element loses its blur. Float overlays as siblings, not
   children, of bars/cards. (This was the dropdown bug — now fixed.)
5. **Always degrade gracefully.** Solid fallback when `backdrop-filter` isn't
   supported, and honor `prefers-reduced-transparency`, `prefers-contrast`, and
   `prefers-reduced-motion`.

---

## 2. Tier 1 — Effect primitives (theme-independent)

Raw building blocks. Don't apply directly; they're referenced by the material
classes.

| Token | Value | Use |
|---|---|---|
| `--glass-blur-sm` | `8px` | subtle chips |
| `--glass-blur-md` | `16px` | bars / chrome |
| `--glass-blur-lg` | `24px` | panels / overlays |
| `--glass-saturate` | `180%` | colour pop behind glass |
| `--glass-noise` | SVG fractal-noise tile | **frosted texture** baked into every glass surface (Apple "Liquid Glass") — applied as a `background-image` blended `soft-light` over the fill on `.glass`/`.glass-panel`; dropped in the solid/a11y fallbacks. NOT a pseudo-element (would collide with the tooltip hover-bridges). Pairs with the global `.grain` film. |
| `--radius-pill` | `9999px` | the nav bar, pills |
| `--radius-panel` | `20px` | dropdowns, modals |
| `--radius-item` | `14px` | rows inside a panel |

## 3. Tier 2 — Semantic colour tokens (per theme)

These swap automatically between light and dark.

| Token | Light | Dark | Meaning |
|---|---|---|---|
| `--glass-bg` | `rgba(255,255,255,.60)` | `rgba(38,38,40,.55)` | bar tint |
| `--glass-bg-strong` | `rgba(255,255,255,.85)` | `rgba(28,28,30,.80)` | panel scrim (text-safe) |
| `--glass-border` | `rgba(17,17,17,.08)` | `rgba(255,255,255,.10)` | edge stroke |
| `--glass-shadow` | soft, light | soft, dark | bar elevation |
| `--glass-shadow-lg` | deeper | deeper | panel elevation |
| `--glass-item-hover` | `rgba(17,17,17,.05)` | `rgba(255,255,255,.08)` | row hover |
| `--glass-item-active` | `rgba(17,17,17,.08)` | `rgba(255,255,255,.13)` | active/current |
| `--glass-solid` | `#f4f4f5` | `#1c1c1e` | accessibility fallback |

---

## 4. Material classes (what you actually use)

| Class | What it is | Where |
|---|---|---|
| `.glass` | Lighter tint, medium blur. Chrome that sits *on top* of the page. | nav bar |
| `.glass-panel` | Stronger scrim, large blur, deeper shadow. Surfaces that *hold text and float over content*. | dropdowns, mobile menu (future: modals, popovers) |
| `.glass-item` | Transparent row with a hover highlight. Add `.glass-item-active` for the current/selected state. | nav links, dropdown rows |

Example:

```jsx
<div className="glass rounded-full p-2">…bar…</div>

<div className="glass-panel rounded-[20px] p-3">…dropdown…</div>

<a className="glass-item rounded-2xl px-4 py-2">Projects</a>
```

---

## 5. Accessibility (built in)

Defined once in `index.css`, applies everywhere:

- **No `backdrop-filter` support** → surfaces fall back to `--glass-solid`.
- **`prefers-reduced-transparency: reduce`** → solid surfaces, blur off.
- **`prefers-contrast: more`** → solid surfaces, blur off.
- **`prefers-reduced-motion: reduce`** → item transitions off.
- Panels use the **strong scrim** so body text clears WCAG AA (4.5:1) even over
  imagery. When placing new text on glass, re-check contrast on the busiest
  background it can appear over.

---

## 6. Component status

**Done**
- Single floating glass **nav bar** (`Header.jsx`)
- **Mega-dropdowns** for Projects, Archive, About, Contact (hover + keyboard),
  positioned as siblings of the bar so their blur works
- Glass **mobile menu**
- Live **Design System page** (`StyleGuide.jsx`, at `/design-system`) — an
  aesthetic overview of typography, color, materials, spacing and components

**Candidates for the same treatment next**
- Buttons (primary/secondary) → glass secondary variant
- Project cards & their hover state
- Testimonial / skill cards
- Footer surface
- Image lightbox / modals → `.glass-panel`

---

## 7. Rules of thumb

- ✅ Use `.glass-panel` (not `.glass`) for anything with text over content.
- ✅ Keep overlays as **siblings** of blurred bars/cards, never nested inside.
- ✅ Drive radius from `--radius-*`, blur from `--glass-blur-*`.
- ❌ Don't hard-code `rgba()` fills or `blur()` in components.
- ❌ Don't stack two `.glass*` surfaces directly on top of each other.
- ❌ Don't put low-contrast text on `.glass` (the light tint) over photos.

---

## 8. Animating glass & the `backdrop-filter` traps (hard-won)

`backdrop-filter` is fragile in ways that aren't obvious. The whole mental model:

**The backdrop-root rule.** `backdrop-filter` samples the page rendered *behind* the
element — but only up to the nearest ancestor that is a **"backdrop root."** An
ancestor becomes a backdrop root if it has any of: a non-`none` **`transform`**,
**`filter`**, **`perspective`**, **`will-change: transform|filter`**,
**`contain: paint|layout|strict|content`**, **`opacity < 1`**, or a **`mask`**.
When that happens the descendant glass samples *nothing* → **the blur silently
renders nothing** (looks like a flat solid/translucent fill, no frost).

**Own transform is fine — only ANCESTORS break it.** An element's *own* `transform`
does **not** kill its *own* `backdrop-filter` (the blur just moves with it). So:
> To animate a glass surface, animate **the glass element itself**, never a wrapper
> around it. A transformed wrapper = dead frost on its glass children.

**Reveal/scroll animations are the classic killer.** Our `<Reveal>` wraps content in
a transformed element. While that wrapper animates (the `y`/`scale` glide), every
glass child's frost is suppressed, then "pops in" when the transform settles. Fixes
(either works): **(a)** make the glass element *be* the animated element; **(b)**
**decouple the transition** — quick tween on `transform` (y/scale) so it lands fast
while the element is still faded-out, slow spring/curve on `opacity`. We use (b) in
`revealMotion.js` (`REVEAL_SHIFT`) so it's global.

**`animation-fill-mode` trap.** A keyframe/transition that ends at `translateY(0)`
with `forwards`/`both` leaves a **permanent identity transform** → a permanent
backdrop-root → frost dead *even at rest*. Use `backwards`, or settle to
`transform: none`. (This was the `page-enter-nav` route-transition bug: it killed
the blur on **every** glass surface on **every** navigated page.) Likewise never
self-centre a glass wrapper with `transform: translateX(-50%)` — position it some
other way (e.g. JS left-edge). Framer Motion is well-behaved here: it resets the
transform to `none` once the spring settles, so at-rest frost is fine — only the
in-flight animation suppresses it.

**Blur is invisible over a smooth backdrop.** Blurring a smooth gradient looks
identical to not blurring it. Over our flow-gradient shader the "frosted" read comes
from **translucency + tint + the noise texture**, NOT the blur itself — so **panel
opacity is the real lever** for "reads glassy" (cards at 0.80 looked solid; 0.62 let
the shader frost through). The blur only visibly *pays off* where high-frequency
content sits behind the glass (nav over scrolling text, dropdowns/tooltips over
images). Don't chase "more blur" to fix a flat-looking card — lower its opacity.

**Diagnosing a dead blur.** Walk the element's ancestor chain and flag any with
`transform`/`filter`/`will-change`/`contain`/`opacity<1` ≠ none — that's your
backdrop-root. (`getComputedStyle` per ancestor; in a throttled preview, force
`element.getAnimations().forEach(a => a.finish())` first to read the settled state.)
