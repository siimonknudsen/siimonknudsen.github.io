# Design Log

A categorized log of design **decisions** and **changes** — grouped by page → section → component so it's easy to find why something looks the way it does. Newest decisions win. For the deeper "why it works" taste analysis and Simon's references/anti-patterns, see `DESIGN_KNOWLEDGE.md §6`. For token architecture see `DESIGN_SYSTEM.md`.

> Format per entry: **what** — *why*.

---

## 0. Global / Design system (`src/index.css`)
- **Tight radius (2026-06)** — capped the radius scale: `--radius-lg/xl/2xl/3xl` all = **8px** (sm 4, md 8, pill unchanged). Cards/panels/images now read tight (≤8px) site-wide from one token change instead of a per-file sweep. (Images already mapped to `--radius-md` via `Media`.)
- **Hover "lift" removed → cursor spotlight on ALL glass cards** — dropped the `translateY` lift (felt odd). New shared system: global **`.fx-spotlight`** glow overlay + **`useSpotlight`** hook (`src/hooks/useSpotlight.js`) writing `--mx`/`--my`; cards add `group` + `position:relative; overflow:hidden` + `<span class="fx-spotlight">`. Glow is theme-aware via **`--glass-glow`** (dark = white specular `--transparent-light-12`; light = soft warm `color-mix(accent 16%)` since a white glow is invisible on light cards). Applied to ProjectCard, TestimonialCard, SkillCard.
- **Light-mode glass now actually frosts** — light glass was too opaque (`--glass-bg-strong` 0.85 / `--glass-bg` 0.60) so it read as flat white. Lowered to **0.66 / 0.46** so the warm shader blurs through and reads as glass; dark text stays legible. Verified blur(24px) active + warm tint visible on cards in light mode.
- **Nav bar** — removed its border and set **max roundness** (`--radius-pill`) — a cleaner floating stadium bar. **Footer** — removed its top border. **Archive grid** — equal gaps (`gap: var(--space-24)`, was 24/64).
- **Hover bridge on tooltips (2026-06)** — both the Worked-at tooltip and the reusable `Tooltip` now render an invisible `::before`/`::after` strip spanning the gap between trigger and popup, so the pointer can travel into the tooltip without crossing a dead zone that drops `:hover` and dismisses it. Pattern name: *hover bridge / hit-area buffer* (a form of hover-intent; cf. Amazon's "safe triangle").
- **Testimonials levelled up (research-backed)** — quotes are now **arrays of paragraphs** (natural reading rhythm, no wall-of-text); first paragraph is a brighter **lead line** (`--text-color-primary`); one restrained **oversized accent quotation glyph** top-right per card (the section's single warm-orange touch, opacity 0.22); Frej Korsgaard testimonial switched to the **Adtraction** logo + company (was Adservice image). Kept the 3-up glass cards. Further option parked: a *featured + grid* asymmetric layout (one oversized pull-quote) — the biggest lever per the research, not yet done. Refs added to DESIGN_KNOWLEDGE §6.
- **Dropdown polish** — Archive dropdown list keeps an **always-visible scrollbar** (styled `::-webkit-scrollbar` + Firefox `scrollbar-color`, `overflow-y: scroll`) so the scroll affordance is obvious; dropdown **row hover-highlight radius tightened** `--radius-xl` → **6px**.
- **Responsive QA (mobile 390 / tablet 768)** — verified no horizontal overflow across Home/Archive/Project/Contact. Fixes: case-study **meta grid is mobile-first 2-col**, widening to 4-up only at **≥1024** (was a fixed 4-col that crushed values like "Lead Product Designer" into ~57px cells); the 50%-width Problem paragraph is **full-width below 768px**.
- **Reusable `Tooltip` component (2026-06)** — `src/components/Tooltip.{jsx,module.css}`. Pure-CSS hover/focus glass tooltip extracted from the Worked-at pattern: `.glass-panel` popup, `placement="top|bottom"`, fade+translate on `:hover`/`:focus-within` (`--dur-base`/`--ease-decelerate`), reduced-motion safe. Use it for any hover tooltip going forward.
- **Worked-at LOGO BALANCE rule** — every logo must read at the same *optical* size, not the same pixel height. Each company has a `logoScale` multiplier on the shared base height, tuned in-browser. Current: Lenus 1 · Beefit 1.12 · Zliide 0.7 · Adtraction 0.9. Rule documented in `WorkedAt.jsx`. Beefit also got its real lockup logo + `beefit.io` website; Zliide industry = Fashion technology.
- **Tag overflow "+N" now has a styled tooltip** — `TagRow` extracted to `src/components/projects/TagRow.jsx` (shared by Archive `ProjectCard` *and* front-page stack cards via a `variant="card|stack"`). The "+N" chip shows the hidden tag names in the new glass `Tooltip` on hover (replaced the native `title`). Stack-card tags now collapse/overflow identically.
- **Project case-study page** (`ProjectPage`) — meta row is now a **4-col grid** (Role · Client · Team · Timeline, 25% each); **Outcome temporarily removed**. Body text fills **100% width**; the opening Problem paragraph is capped at **50%** (`.problemLede`).
- **Contact page** — centered; headline → **"Get in touch with me"**; removed the lede + the "Or reach me directly" block (email/LinkedIn/Location).
- **Lightbox arrows** — now sit in a centered flex row with the image, **16px gap** each side (was viewport-pinned). **Nav "Aarhus"** removed from the profile dropdown subtitle (kept on the live location chip).
- **Glass audit (2026-06)** — swept all components/pages for hardcoded transparent backgrounds.
  Result: `backdrop-filter` already tokenised everywhere (Footer/ImageGrid/glass classes). The only
  offenders were the **project stack-card overlays** (logo/impact/tags/title) using hardcoded
  `rgba(255,255,255,*)` / `#fff` / `#ff9a6a`. Replaced with tokens: new **`--transparent-light-90`**,
  **`--text-on-media: #fff`**, **`--accent-on-media: #ff9a6a`** (theme-independent — these always sit
  over dark-scrimmed photos). *Deliberately NOT given `backdrop-filter`*: they live inside a card that
  scales on scroll (blur would jank and the transform breaks it anyway). Shader colour arrays,
  StyleGuide swatches, the image scrim gradient, and `var()` fallbacks are legit raw values, left as-is.
- **Testimonial cards now actually frost** — they always used `.glass-panel`, but their `ScrollAnimation`
  wrapper rested at `transform: translateY(0)`; any non-`none` transform creates a containing block that
  **kills `backdrop-filter` on descendants**. Changed `.visible` to `transform: none` → blur renders. (Fix
  applies to every glass surface revealed via ScrollAnimation.)
- **Project-card tag overflow now correct** (`ProjectCard.jsx` `TagRow`) — only shows the trailing
  **"+N"** chip when tags genuinely don't fit; collapses the exact overflowing tags otherwise. Two bugs
  fixed: (1) the real cause — `.hiddenChip { display:none }` sat *before* `.tagSlot/.plusTag { display:
  inline-flex }`, equal specificity so the later rule won and nothing ever hid (phantom "+1"); now a
  compound `.tagSlot.hiddenChip`/`.plusTag.hiddenChip` selector. (2) refactored TagRow to a single
  `count` state (chips + "+N" derive from it) so a re-render can't desync from imperative hiding;
  re-measures after `document.fonts.ready`.
- **No Tailwind; CSS Modules + tokens** — owned, portable styling; primitives → semantics (two-tier).
- **Responsive page gutter** `--page-gutter`: 24px (mobile) → 40px (≥640) → **80px (≥1024)** — *a flat large gutter overflowed phones; scales with viewport. Bumped 64→80 on desktop (Simon keeps wanting more breathing room).*
- **Standard section gap = 164px** (`margin-bottom: var(--space-164)`) across ALL pages (Home/Archive/About/Playground/case-study) — iterated 80 → 128 → 164 for a generous, consistent vertical rhythm.
- **Global shader background** — the flow-gradient shader is now a **single `position: fixed`, full-viewport layer behind ALL content on every page** (in the App shell, z-index 0; content at z-index 1+). It stays put while the page scrolls over it. Removed the per-hero and per-footer `HeroBackground`; the footer is now transparent. *Why: one consistent, living backdrop sitewide.*
- **Optical sizing on** — Inter is now requested with the `opsz` axis (`Inter:opsz,wght@14..32,100..900`) and `font-optical-sizing: auto` is set globally. *Auto (per-size) is the go-to — better than a fixed opsz on every token (display gets the finer cut, body the sturdier one).*
- **`.fx-reveal.is-visible` releases `will-change` (→ auto)** — keeping it left a containing block that broke `backdrop-filter` on descendants (the Worked-at tooltip had no blur); also a perf best-practice (promote then drop).
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
- **Dropdown project thumbnails**: border-radius → **4px** (`--radius-sm`).
- **Dropdown titles removed** (no more "Featured work" / "From the archive" labels); **Archive link removed** from the Projects dropdown footer.
- **Archive dropdown list scrolls internally** (max-height 46vh, **scrollbar always shown**) so the **"View full archive →"** footer stays pinned/visible.
- **Dropdown menus**: **flexible width** (`max-content`, capped `min(92vw,560px)`) so they fit content and adapt; **single-column** content; **whole menu staggers** header → items → footer (one-by-one reveal); **close is scheduled on leaving the whole nav region** (not each button) so moving across gaps keeps it open and the active trigger highlighted.
- **Bug fix — "Worked at" label was invisible**: the hero's absolutely-positioned bottom **fade overlay** painted over the (statically-positioned) label, hiding it while the logos below stayed visible. Fixed with `position: relative; z-index: 1` on the Worked-at section. *(Lesson: an absolutely-positioned overlay paints above later static siblings — give overlapping content its own stacking context.)*
- **Tooltip spacing**: 12px padding, 12px gap below the logo, 20px label→value gap.
- **Nav triggers (Projects/Archive/About/Contact) get the button text-roll** on hover — same effect + timing (0.55s easeInOutQuart) as the buttons, layered with the sliding pill.
- **Contact dropdown**: title "Contact me" only (removed "Let's work together / Open to new projects and roles"); footer shows green dot + **"Aarhus, Denmark · <live time>"** (removed "Available").

## 2. Home — Hero (`src/pages/Home.*`, `HeroBackground.*`, `WordReveal.*`)
- **No card** — left-aligned statement headline set directly over the shader; faded **"Simon Knudsen"** kicker above; **removed** the avatar + "Available for work" pill — *if the type is confident it doesn't need a container.*
- **Headline** custom large scale; `max-width: min(Nch, 100%)` — *never overflows on mobile.*
- **Hero CTAs** — iterated: black/grey → both glass → settled on **primary (solid) "View projects" + glass "Contact"** (primary action solid, secondary glass).
- **Shader rises behind the nav** (negative top margin + `--header-height`) with a subtle **grid overlay** (masked) — atmospheric depth.
- **Height** iterated to taste: 100vh → 76vh → **`calc(64vh + 200px)`**; content vertically centered; `margin-bottom: 0`.

## 3. Home — Worked at (`src/components/home/WorkedAt.*`, `WorkedAtLogos.jsx`)
- **New trust row** (bevel-style "Works with"): **Lenus · Beefit · Zliide · Adtraction** (most-recent first). all four are inline `currentColor` SVGs (theme-aware, muted → brighten on hover). **Beefit** uses the full mark+wordmark lockup (Simon supplied the SVG; recoloured from its near-white fill to currentColor) at `logoScale 1.35` since the lockup is denser/shorter x-height than the others — verified all four share the same vertical centre.
- **Layout: centred flex row** (was a `1fr auto 1fr` 3-col grid tuned to centre Zliide — broke with a 4th company). Now `display:flex; justify-content:center; flex-wrap:wrap` so any company count stays balanced under the label; row stays viewport-centred (verified 720 = 1440/2). Wraps to a centred column ≤600px.
- **Real periods supplied by Simon** (date blocker resolved): Lenus **2025 — Present**, Beefit **2024 — 2025** (acquired by Lenus), Zliide **2023 — 2024**, Adtraction **2021 — 2023** (this is *Adservice*, acquired by Adtraction — Simon chose to keep the surviving "Adtraction" brand + logo + `adtraction.com`). Beefit: Health & fitness, 10+.
- **Removed** the old 4-box stat band.
- **Padding-driven hero + equal gaps**: the hero uses a fixed **128px** padding above (below nav) and below its content (64px on phones) — NOT viewport height — so nothing drifts with screen size. Worked-at sits `margin-top: 0`, `margin-bottom: 128px`, so the gap above (hero's 128 bottom padding) **equals** the gap below (128px). Verified stable across window heights.
- **Hover/focus tooltip on each company** (`.companyChip` + glass-panel `.tooltip`): header is the **brand logo** (not text); shows **Industry · (Period) · Team size** (Role dropped as irrelevant); 8px padding, `radius-xl`, real **glass blur** (24px, now that the reveal `will-change` is released); shows **Industry · Company size · Website** (Website last, a link — Lenus `lenus.io`, Adtraction `adtraction.com`; Zliide none, defunct); 12px padding; **content staggers in** one-by-one (0.45s eased, relaxing); **positioned BELOW the logos** so it never covers the "Worked at" label; **per-logo optical scale** (`--logo-scale`: Lenus 1 / Zliide 0.7 / Adtraction 0.9) so the three read balanced in both the row and the tooltip; keyboard-accessible (`tabindex`/`aria-describedby`/`focus-within`), reduced-motion safe.
- **Tooltip rows → single vertical column** (2026-06): was a two-column `space-between` table (label left, value right). With varying value lengths the ragged gaps read busy; switched to **stacked spec rows** — muted uppercase label (`text-2xs`) above value (`text-sm`), all left-aligned to one axis. Calmer/editorial.
- **Confirmed industries/sizes** (Simon): Lenus *Health & fitness software* 300+ · Beefit *Health & fitness software* (same as Lenus) 10+ · Zliide *Fashion technology* 10+ · Adtraction *Affiliate marketing* 30+.

## 4. Home — Projects (stacking) (`src/components/projects/ProjectGrid.*`)
- **Full-width cards that stack on scroll** (sticky), each a full-bleed image with **content overlaid bottom-left** over a scrim; **removed the "View project" CTA** (whole card is the link).
- **Card height** `clamp(440px, 78vh, 860px)` — *fits the window instead of towering;* image `aspect="fill"` (cover).
- **`.stackLink` fills the card** — *fixed a bug where the bottom-left info anchored mid-card and the image collapsed (the "missing content" on Apple Home / Zliide Dashboard).*
- **Gap 600px** between cards; small per-card peek offset (`--i`).
- **Dim + scale depth cue**: scroll-driven `--dim` darkens AND `--scale` shrinks a card as the next covers it (`scale(1 → 0.9)`, `transform-origin: top center`) so covered cards **recede into the stack** — front card reads largest/closest, cards below get smaller. Both set per frame (rAF), **no CSS transition** (would add jank); disabled under reduced-motion.
- **Shadow removed** — the `--shadow-lg` drop shadow haloed harshly over the photos when cards piled up; depth now comes from scale + dim, not a shadow.
- **Card images are now sharp (no blur).** Removed the blurred-image-copy frost behind the text — only the dark gradient scrim remains for legibility. *(History below kept for reference.)*
- ~~**Frosted text zone via a blurred IMAGE copy (not `backdrop-filter`).**~~ First tried a live `backdrop-filter: blur()` scrim — but blurring 6 full-bleed cards *every scroll frame while they scale* made the stack janky (the "don't animate backdrop-filter" trap). Fix: `.stackBlur` is a **duplicate of the card image with a static `filter: blur(20px)`**, masked to the lower text zone and over-scaled 1.08 so the soft edges stay clipped. A static filter rasterises **once** and is then just composited/scaled by the GPU → no per-frame re-blur → smooth, and the premium frosted look is kept alongside the `scale` depth. Chips/tags use plain translucent bg (no blur). Hidden under `prefers-reduced-transparency`. Plus a dark gradient `.stackScrim` over it for AA legibility.
- **Stack depth scale** reduced to **5%** (1 → 0.95) · flow **gap 160px** (iterated 600 → 300 → 240 → 160, tighter cadence) · stacked **peek 4px** per card (iterated 12 → 10 → 4).
- **Blur as a 0→8px gradient**: `.stackBlur` is `blur(8px)` (toned down from 20) with a linear mask `to top, #000 0%, transparent 58%` so the blur ramps from full at the bottom to sharp by ~58% up — a "blur gradient" from one cached layer (no costly stacked-blur passes).
- **All cards start full available width** (no base scale); depth comes from a **graduated recede** instead: when covered, the first card shrinks most (~−16%) and each later card less (linear `MAX_RECEDE * (1 − i/(n−1))`), so a fully-stacked deck reads ~0.84 → 0.87 → … → 1.0 (front) — first smallest, each progressively larger, same starting size for all.
- **Card header enlarged** to `type-display-sm` (~40px desktop, was `type-heading-sm` 24px) for more presence on the big cards.
- **Section header "Selected projects"** added above the stack (`type-display`, matches the testimonials header pattern).
- *(Reverted)* hover chevron on project **cards** — it belonged on the **nav dropdown rows**, not the cards. Removed from ProjectGrid/ProjectCard; added a right-chevron that fades in on hover at the right edge of each **dropdown `WorkRow`** (`.workChevron`).
- **Card logos use the same optical scale** as the Worked-at row (`COMPANY_SCALE`: Lenus 1 / Zliide 0.7 / Adtraction 0.9) so they're visually balanced.
- **Company logo on each card** (`PROJECT_COMPANY` map → logo, white, **pinned top-left corner**, inset to match the card padding): Zliide projects → Zliide; Adservice-era + campaigns → Adtraction; Apple Home (concept) → none. *Best-effort mapping — confirm.*
- **`variant`**: `stack` (home), `grid` (3-col, used on case-study "More Projects"), `bento` (legacy).

## 5. Home — Testimonials (`src/pages/Home.jsx`, `TestimonialCard.*`)
- **3-column grid** of full recommendations; **logos where available** (Zliide inline SVG, Adservice image on a white chip, Business Academy none).
- **Removed** the big FeaturedQuote and the scrolling logo marquee.

## 6. Footer (`src/components/Footer.*`)
- **Frosted glassmorphism** — footer is transparent + `backdrop-filter: blur(lg) saturate()` + a 1px light-catching top border, so it frosts the **global shader** behind it (no longer its own shader). Solid fallback where backdrop-filter is unsupported.
- **Link hover**: underline grows from the left + slight slide + brighten.

## 6b. Contact page (`src/pages/Contact.*`)
- **New dedicated `/contact` page** (replaces the old footer-scroll). Minimal/editorial per the proven pattern: one confident headline ("Let's make something worth using."), a short human line, and a **frosted-glass card with the email as the big focal action** (`mailto:`, ~40px) + Email/LinkedIn links + the live location/availability chip. Sits over the global shader. Nav "Contact" (desktop + mobile) and the hero "Contact" button now route here; the hover dropdown stays as a quick preview.

## 7. About (`src/pages/About.*`, `PrinciplesList.*`)
- **Top section** (marckuiper-style): big headline + portrait (memoji placeholder — *awaiting a real B&W photo*) + **floating skill chips** on desktop, **stacked below on mobile**; **grey bg removed**; portrait stage stacks on mobile (*fixed horizontal overflow*).
- **Mission line animates on scroll-into-view** (`WordReveal whenInView`) — *was firing on mount, before the user scrolled to it.*
- **Skills copy restored to Simon's original** (the AI-style rewrite was rejected).
- **Principles** rewritten plainer; **numbered `01 — Section` eyebrows removed** site-wide (read as templated/AI).
- **Awards/Recognition section removed** (not relevant).
- **Pictures lightbox**: portal-rendered, smooth open/close, **prev/next + close (top-right) + "X of Y" counter**, arrow-key nav. Fixed: nav/close buttons now sit **above** the image (z-index — the prev arrow was rendering behind it) and the **prev/next arrows are pinned to the viewport sides (fully outside the image)**; image transition between pictures softened to a clean fade (opacity + subtle scale, no jumpy rise).
- **Principles section ("Principles I design by") removed from About — parked as an idea.** The `<PrinciplesList />` component + 6-principle content are kept in the codebase to re-add later (see Parked ideas below).

## 8. Projects — Case study (`src/pages/ProjectPage.*`)
- **Truly single column** — removed the separate left meta rail entirely (Simon asked repeatedly). The whole case study is one column: the **container fills 100% of the available width**, and readability comes from **capping the text blocks** (lede/prose/steps/textBlock at 60rem) while media/breakouts span full width. Meta (Role · Client · Team · Timeline · Outcome) is a **horizontal header row** above the content; the sticky TOC sidebar is hidden.
- **Removed "Next project"** section.
- **"More Projects" → 2-column grid** (`variant="grid"`, was 3) — bigger cards.
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

## 14. Parked ideas (removed for now, kept for later)
- **About "Principles I design by"** — a 6-card section (Let the work speak · Clear beats clever · The small stuff matters · Works for everyone · Build it to reuse · Results over screens). Removed from the About page per Simon, but the `<PrinciplesList />` component + content remain in `src/components/about/` to re-add later.
