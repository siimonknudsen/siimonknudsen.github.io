# Design Log

A categorized log of design **decisions** and **changes** — grouped by page → section → component so it's easy to find why something looks the way it does. Newest decisions win. For the deeper "why it works" taste analysis and Simon's references/anti-patterns, see `DESIGN_KNOWLEDGE.md §6`. For token architecture see `DESIGN_SYSTEM.md`.

> Format per entry: **what** — *why*.

---

## 0. Global / Design system (`src/index.css`)
- **No Tailwind; CSS Modules + tokens** — owned, portable styling; primitives → semantics (two-tier).
- **Responsive page gutter** `--page-gutter`: 24px (mobile) → 40px (≥640) → **80px (≥1024)** — *a flat large gutter overflowed phones; scales with viewport. Bumped 64→80 on desktop (Simon keeps wanting more breathing room).*
- **`--header-height: 88px`** — used to slide the hero shader up behind the sticky nav.
- **Type scale 10–48** with semantic roles (`.type-display`…`.type-overline`); **added `.type-micro` (10px)** — *badges/footnotes/dense meta.*
- **Graduated negative tracking — deliberately tight** (Simon's preference, "all between −2% and −4%, maybe more"): display **−5%**, headings **−4%**, titles/body **−3%**, small **−2.5%**; overline stays **+8%** (caps need positive). Hardcoded hero + About headlines also set to −5%. *Intentionally overrides the usual "body ≈ 0 / small text slightly positive" best practice — Simon wants the dense, tightly-set look across the whole ramp. Do NOT loosen it back.*
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
- **Balanced gaps**: margin-top −64px / margin-bottom 128px tuned so the gap *above* "Worked at" (from the hero content) ≈ the gap *below* (to projects) — ~128px each at desktop. (Top gap floats slightly with viewport height since the hero centres its content.)
- **Hover/focus tooltip on each company** (`.companyChip` + glass-panel `.tooltip`): shows Role · Industry · (Period) · Team size; fades + rises in, keyboard-accessible (`tabindex`/`aria-describedby`/`focus-within`), reduced-motion safe. Sizes confirmed (Lenus 300+ / Zliide 10+ / Adtraction 30+); **industry/role are best-effort and `period` is left blank pending Simon's real dates** (we don't invent employment dates).

## 4. Home — Projects (stacking) (`src/components/projects/ProjectGrid.*`)
- **Full-width cards that stack on scroll** (sticky), each a full-bleed image with **content overlaid bottom-left** over a scrim; **removed the "View project" CTA** (whole card is the link).
- **Card height** `clamp(440px, 78vh, 860px)` — *fits the window instead of towering;* image `aspect="fill"` (cover).
- **`.stackLink` fills the card** — *fixed a bug where the bottom-left info anchored mid-card and the image collapsed (the "missing content" on Apple Home / Zliide Dashboard).*
- **Gap 600px** between cards; small per-card peek offset (`--i`).
- **Dim + scale depth cue**: scroll-driven `--dim` darkens AND `--scale` shrinks a card as the next covers it (`scale(1 → 0.9)`, `transform-origin: top center`) so covered cards **recede into the stack** — front card reads largest/closest, cards below get smaller. Both set per frame (rAF), **no CSS transition** (would add jank); disabled under reduced-motion.
- **Shadow removed** — the `--shadow-lg` drop shadow haloed harshly over the photos when cards piled up; depth now comes from scale + dim, not a shadow.
- **Frosted text zone via a blurred IMAGE copy (not `backdrop-filter`).** First tried a live `backdrop-filter: blur()` scrim — but blurring 6 full-bleed cards *every scroll frame while they scale* made the stack janky (the "don't animate backdrop-filter" trap). Fix: `.stackBlur` is a **duplicate of the card image with a static `filter: blur(20px)`**, masked to the lower text zone and over-scaled 1.08 so the soft edges stay clipped. A static filter rasterises **once** and is then just composited/scaled by the GPU → no per-frame re-blur → smooth, and the premium frosted look is kept alongside the `scale` depth. Chips/tags use plain translucent bg (no blur). Hidden under `prefers-reduced-transparency`. Plus a dark gradient `.stackScrim` over it for AA legibility.
- **Stack depth scale** reduced to **5%** (1 → 0.95) · flow **gap 160px** (iterated 600 → 300 → 240 → 160, tighter cadence) · stacked **peek 10px** per card (was 12).
- **Blur as a 0→8px gradient**: `.stackBlur` is `blur(8px)` (toned down from 20) with a linear mask `to top, #000 0%, transparent 58%` so the blur ramps from full at the bottom to sharp by ~58% up — a "blur gradient" from one cached layer (no costly stacked-blur passes).
- **All cards start full available width** (tried a progressive per-card base scale, but reverted — Simon wants every card full-width to begin; the only size change is the scroll recede as a card gets covered).
- **Card header enlarged** to `type-display-sm` (~40px desktop, was `type-heading-sm` 24px) for more presence on the big cards.
- **Section header "Selected projects"** added above the stack (`type-display`, matches the testimonials header pattern).
- **Company logo on each card** (`PROJECT_COMPANY` map → logo, white, above the impact chip): Zliide projects → Zliide; Adservice-era + campaigns → Adtraction; Apple Home (concept) → none. *Best-effort mapping — confirm.*
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
- **Button**: removed the magnetic-pull effect (*no novelty motion*). Hover = background-colour change (no lift/shadow/sweep) **plus a text-roll**: on hover the label slides up and out while a duplicate rises from below into place (`.roll` overflow-clip + two `.rollText` copies, the 2nd absolutely positioned one line below, both `translateY(-100%)` on hover). Timing matched to the popular GSAP/Framer rolling-text components: **0.55s `cubic-bezier(0.76,0,0.24,1)`** (easeInOutQuart / `power4.inOut`) for a smooth glide. Reduced-motion disables the roll. (Focus-visible ring kept for a11y.)
- **Media**: added **`fill`** aspect mode (cover a flexible parent); **removed the grey placeholder background**; 8px radius; positive preload margin (no dark gaps).
- **ProjectCard**: tag-overflow `+N`; image frame 8px.
- **TestimonialCard**: vertical layout with a logo slot (image or inline component).
- **WordReveal**: `whenInView` prop for scroll-triggered word reveal.
- **ImageGrid**: gallery lightbox with full controls (see About §7).
- **CookieConsent** (`CookieConsent.*` + `lib/consent.js`): on-brand consent card, bottom-left glass-panel, "I use 🍪 cookies" + pill Accept / outline Decline (Neko-friendly style adapted to dark editorial) — *gates Microsoft Clarity (free session recordings + heatmaps + stats); nothing loads until Accept, Decline loads nothing.* Choice persisted in `localStorage`; resumes on return visits; grows from its own corner (`transform-origin: bottom left`); reduced-motion safe; z below the intro loader, above all chrome. *Clarity Project ID `mcb5n1jwt7` is now live in `src/lib/consent.js`* — tracking activates for anyone who accepts. *Why Clarity:* only genuinely-free tool with unlimited visual recordings + stats, and it doesn't sell data (honest with the banner copy).

## 13. Taste & process (`DESIGN_KNOWLEDGE.md`)
- §6 holds the **references**, the **"why it works"** analysis, and the **anti-pattern log** ("what Simon doesn't like").
- **Rule:** when Simon asks to change/redo something, treat it as a signal the original was wrong for his taste — log it as an anti-pattern.
- **§7 "Craft & mastery — the beauty layer" added** (research swarm, 6 expert agents) — the advanced craft layer beyond the §1–4 principles: typography (optical sizing, OpenType, `text-wrap`, font-loading without CLS, variable-font grade), spacing (relational/optical, geometric scale, density tiers), layout (Swiss grids, asymmetric tension, modern CSS — subgrid/container queries/`:has()`/intrinsic grids), motion (spring physics + bounce, interruptibility/velocity, origin-aware, scroll-driven + View Transitions), UX (form mechanics, perceived-perf, microcopy, state design, **portfolio case-study craft**), and UI polish (OKLCH ramps, gradients-as-light, tinted layered shadows, 4-layer glass, squircles, the 1% micro-details, grain). Includes a **§7.7 "invisibles" pre-ship checklist**. *Why:* give the project an expert craft brain, not just correctness — matches Simon's stated premium/editorial taste (§6.7).
- **§6.9 priority hierarchy added** (Simon's own weighting): **typography + spacing/whitespace ≈ 80%** of the beauty → **beautiful imagery/video** → **motion as the calm, supporting ~20%** (relaxing, non-disturbing, felt-not-noticed). Use it to allocate effort and arbitrate trade-offs (higher tier wins; never sacrifice whitespace/type to fit more in).
- **§4.11 motion tooling decision added** (researched 2026, build-vs-buy): **keep the owned CSS+WAAPI+View Transitions layer (~0kb), stay library-free** until a specific gap proves it; if needed, reach for **Motion** (`motion/react`, lazy ~15kb) — *not* GSAP. Notes the 2026 facts: **GSAP now 100% free** (Webflow), **Framer Motion renamed → `motion`**, Motion+ €299 optional. Hybrid rule = add Motion only for exit/unmount choreography, interruptible springs, real drag, or automatic FLIP.
