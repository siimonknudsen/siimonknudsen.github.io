# Design Log

A categorized log of design **decisions** and **changes** — grouped by page → section → component so it's easy to find why something looks the way it does. Newest decisions win. For the deeper "why it works" taste analysis and Simon's references/anti-patterns, see `DESIGN_KNOWLEDGE.md §6`. For token architecture see `DESIGN_SYSTEM.md`.

> Format per entry: **what** — *why*.

---

## 0. Global / Design system (`src/index.css`)
- **No Tailwind; CSS Modules + tokens** — owned, portable styling; primitives → semantics (two-tier).
- **Responsive page gutter** `--page-gutter`: 24px (mobile) → 40px (≥640) → 64px (≥1024) — *a flat 64px overflowed phones; gutter should scale with viewport.*
- **`--header-height: 88px`** — used to slide the hero shader up behind the sticky nav.
- **Type scale 10–48** with semantic roles (`.type-display`…`.type-overline`); **added `.type-micro` (10px)** — *badges/footnotes/dense meta.*
- **Graduated negative tracking** (tightened): display −4.5%, headings −3.5%, titles/body −2.5%, small −1.5% — *tight tracking flatters large type but hurts small-text legibility.*
- **Status primitive ramps** green/amber/red/blue (50–950) + brand orange + transparent light/dark — shown in the style guide.
- **Image corner radius standardized to 8px** (`--radius-md`) across all content imagery (via `Media`) — *one consistent rounding.*
- **`scroll-behavior: smooth`** on `html` (reduced-motion → auto) — for in-page anchors like "View projects".
- **`--z-intro: 2000`** — intro loader above all chrome incl. grain.
- **Page-transition + content-reveal keyframes** live here (`pageWipe`, `page-enter-nav`).

## 1. Header / Nav (`src/components/Header.*`, `Location.*`, `ThemeToggle.*`)
- **Brand (avatar + name) links to home** with a subtle hover bg — *expected affordance.*
- **Location dot is success-green** + soft pulse (was orange brand) — reads as "available".
- **Sliding "magic pill"** travels smoothly between Projects/Archive/About/Contact and rests on the active route; **per-button hover background removed** so only the pill animates — *one effect, not two.*
- **Dropdown menus**: **flexible width** (`max-content`, capped `min(92vw,560px)`) so they fit content and adapt; **single-column** content; **whole menu staggers** header → items → footer (one-by-one reveal); **close is scheduled on leaving the whole nav region** (not each button) so moving across gaps keeps it open and the active trigger highlighted.
- **Contact dropdown**: title "Contact me" only (removed "Let's work together / Open to new projects and roles"); footer shows green dot + **"Aarhus, Denmark · <live time>"** (removed "Available").

## 2. Home — Hero (`src/pages/Home.*`, `HeroBackground.*`, `WordReveal.*`)
- **No card** — left-aligned statement headline set directly over the shader; faded **"Simon Knudsen"** kicker above; **removed** the avatar + "Available for work" pill — *if the type is confident it doesn't need a container.*
- **Headline** custom large scale; `max-width: min(Nch, 100%)` — *never overflows on mobile.*
- **Shader rises behind the nav** (negative top margin + `--header-height`) with a subtle **grid overlay** (masked) — atmospheric depth.
- **Height** iterated to taste: 100vh → 76vh → **`calc(64vh + 200px)`**; content vertically centered; `margin-bottom: 0`.

## 3. Home — Worked at (`src/components/home/WorkedAt.*`, `WorkedAtLogos.jsx`)
- **New trust row** (bevel-style "Works with"): **Lenus · Zliide · Adtraction** as inline `currentColor` SVGs (theme-aware, muted → brighten on hover).
- **Zliide centered** under the "Worked at" label via a `1fr auto 1fr` grid.
- **Removed** the old 4-box stat band.
- **Pulled up** closer to the hero (negative top margin) with a **larger gap (128px) before the projects**.

## 4. Home — Projects (stacking) (`src/components/projects/ProjectGrid.*`)
- **Full-width cards that stack on scroll** (sticky), each a full-bleed image with **content overlaid bottom-left** over a scrim; **removed the "View project" CTA** (whole card is the link).
- **Card height** `clamp(440px, 78vh, 860px)` — *fits the window instead of towering;* image `aspect="fill"` (cover).
- **`.stackLink` fills the card** — *fixed a bug where the bottom-left info anchored mid-card and the image collapsed (the "missing content" on Apple Home / Zliide Dashboard).*
- **Gap 600px** between cards; small per-card peek offset (`--i`).
- **Dim-on-stack depth cue**: scroll-driven `--dim` darkens a card as the next covers it (front card stays lightest); **no CSS transition** on the dim — *it's set per frame, a transition only adds jank.*
- **Shadow** `--shadow-lg` (was `--glass-shadow-lg`, whose inset rim-lines looked harsh over photos in light mode).
- **`variant`**: `stack` (home), `grid` (3-col, used on case-study "More Projects"), `bento` (legacy).

## 5. Home — Testimonials (`src/pages/Home.jsx`, `TestimonialCard.*`)
- **3-column grid** of full recommendations; **logos where available** (Zliide inline SVG, Adservice image on a white chip, Business Academy none).
- **Removed** the big FeaturedQuote and the scrolling logo marquee.

## 6. Footer (`src/components/Footer.*`)
- **Hero shader reused (no grid)** as a living background.
- **Borders/dividers removed** — *separate with space/light, not hard lines.*
- **Link hover**: underline grows from the left + slight slide + brighten.

## 7. About (`src/pages/About.*`, `PrinciplesList.*`)
- **Top section** (marckuiper-style): big headline + portrait (memoji placeholder — *awaiting a real B&W photo*) + **floating skill chips** on desktop, **stacked below on mobile**; **grey bg removed**; portrait stage stacks on mobile (*fixed horizontal overflow*).
- **Mission line animates on scroll-into-view** (`WordReveal whenInView`) — *was firing on mount, before the user scrolled to it.*
- **Skills copy restored to Simon's original** (the AI-style rewrite was rejected).
- **Principles** rewritten plainer; **numbered `01 — Section` eyebrows removed** site-wide (read as templated/AI).
- **Awards/Recognition section removed** (not relevant).
- **Pictures lightbox**: portal-rendered, smooth open/close, **prev/next + close (top-right) + "X of Y" counter**, arrow-key nav.

## 8. Projects — Case study (`src/pages/ProjectPage.*`)
- **Single-column body** (was splitting into two columns); sticky meta rail kept.
- **Removed "Next project"** section.
- **"More Projects" → even 3-column grid** (`variant="grid"`), not the oversized bento.
- Breakout media 8px radius; grey image background removed.

## 9. Archive (`src/pages/Archive.*`)
- **2-column larger cards** (was 3); descriptions shown.
- **Tag overflow → "+N" chip + tooltip** (measure-based, one line); all wrappers share one box so the **+N aligns** with the other chips; 1-column on mobile.

## 10. Style guide (`src/pages/StyleGuide.*`)
- Added **status primitive ramps** (success/warning/error/info); **shadows shown on a contrasting stage** so they read; **Radius split into its own section**; **type-micro** added to the type specimen.

## 11. Motion (owned layer — no GSAP/Framer)
- **Page transition**: curtain wipe in the **page background colour** sweeps up to cover, holds, lifts; new page **fades + rises in after** the cover (`.page-enter-nav`, ~480ms delay) — *same-colour curtain = seamless, no contrasting flash.* Skips first load; reduced-motion safe.
- **Theme switch**: View Transitions circular clip-path reveal, slowed to **1200ms** with a gentle ease (relaxed).
- **Intro loader**: "Simon Knudsen" wordmark + a thin line that fills, once per session; reduced-motion skips it.
- **Reduced-motion** safety net throughout.

## 12. Components (cross-cutting)
- **Button**: removed the magnetic-pull effect (*no novelty motion*).
- **Media**: added **`fill`** aspect mode (cover a flexible parent); **removed the grey placeholder background**; 8px radius; positive preload margin (no dark gaps).
- **ProjectCard**: tag-overflow `+N`; image frame 8px.
- **TestimonialCard**: vertical layout with a logo slot (image or inline component).
- **WordReveal**: `whenInView` prop for scroll-triggered word reveal.
- **ImageGrid**: gallery lightbox with full controls (see About §7).

## 13. Taste & process (`DESIGN_KNOWLEDGE.md`)
- §6 holds the **references**, the **"why it works"** analysis, and the **anti-pattern log** ("what Simon doesn't like").
- **Rule:** when Simon asks to change/redo something, treat it as a signal the original was wrong for his taste — log it as an anti-pattern.
