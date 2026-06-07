// ── Reveal motion config — the SINGLE source of truth for scroll-reveal feel ──
// Framer Motion (the library now called `motion`) spring, tuned to Simon's
// "Calm" preset: soft, no overshoot, glides in and settles. Change it here and
// every <Reveal>/<Stagger> across the site updates. See DESIGN_KNOWLEDGE §4 for
// the appearance-motion best practices this encodes.

// Well-damped spring (no bounce — bounce reads "attention-grabbing", against the
// calm DNA). stiffness↔damping balance is what makes it feel calm.
// Drives OPACITY — the slow, perceived duration of the reveal.
export const REVEAL_SPRING = { type: 'spring', stiffness: 55, damping: 18, mass: 1 }

// The positional glide (y / scale) settles QUICKLY on this tween — decoupled from
// the slow opacity spring above. Why: a non-zero transform suppresses
// `backdrop-filter` (an animating element becomes its own backdrop-root), so if
// the glide rode the slow spring the FROST on glass cards would be dead for ~1s
// and only "pop in" once it settled. Landing the transform fast — while the card
// is still mostly faded-out — keeps the frost present for the visible part of the
// reveal, while opacity keeps the calm slow fade. Eased so it still glides softly.
export const REVEAL_SHIFT = { type: 'tween', duration: 0.5, ease: [0.16, 1, 0.3, 1] }

// How far a fade-up element glides while fading in (px). Paired with opacity.
export const REVEAL_TRAVEL = 28

// Gap between staggered siblings (ms). Calm cascade; capped for long lists.
export const REVEAL_STAGGER_MS = 90

// Variant sets per preset. `hidden` → `shown`, driven by the IntersectionObserver
// (useReveal). Only transform + opacity animate (GPU-cheap, 60fps).
export const REVEAL_VARIANTS = {
  'fade-up': { hidden: { opacity: 0, y: REVEAL_TRAVEL }, shown: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, shown: { opacity: 1 } },
  'scale-in': { hidden: { opacity: 0, scale: 0.96 }, shown: { opacity: 1, scale: 1 } },
}
