import { m, useReducedMotion } from 'motion/react'
import useReveal from './useReveal'
import { REVEAL_SPRING, REVEAL_SHIFT, REVEAL_VARIANTS } from './revealMotion'

// Resolve `as` to a Motion component. A string → built-in `m.<tag>`. A custom
// element (e.g. react-router <Link>) must be passed as an ALREADY-motion
// component — created once at module scope by the caller via `m.create(...)`
// (creating it here would trip react-hooks/static-components, and reset state).
// Why support custom `as`: a glass card must BE the reveal (animate its OWN
// opacity/transform) so its backdrop-filter frost stays alive — a WRAPPER's
// opacity<1 / transform isolates the backdrop and the frost "pops in" late.
// See GLASS_DESIGN_SYSTEM §8.
function resolveMotion(as) {
  if (typeof as === 'string') return m[as] || m.div
  return as // already a motion component (m.create(...) at module scope)
}

/**
 * <Reveal> — declarative scroll-reveal. Framer Motion spring (the calm preset in
 * revealMotion.js) animated from `hidden`→`shown`, triggered by our tuned
 * IntersectionObserver (useReveal). Keeping the observer (not Motion's
 * whileInView) preserves the exact, already-dialled-in trigger position.
 * preset: 'fade-up' | 'fade' | 'scale-in'. Optional `delay` (ms) — also how
 * <Stagger> cascades its children. Polymorphic via `as` (renders m[as]).
 * Reduced motion: starts shown, no movement.
 */
export default function Reveal({
  as = 'div',
  preset = 'fade-up',
  delay,
  once = true,
  immediate = false,
  className = '',
  style,
  children,
  ...props
}) {
  const reduce = useReducedMotion()
  const { ref, isVisible } = useReveal({ once })
  // `immediate` = animate on MOUNT (a timed entrance), not on scroll-intersection.
  // Use it for above-the-fold first-load content — a hero cascade, the trust row
  // beneath it — that's already on screen at load. The scroll observer's tuned
  // rootMargin (-28%) is meant for content further down; for the first screen it
  // leaves anything below the ~72% line stuck at opacity 0 until the user scrolls
  // (which, on the hero, they never do). See DESIGN_LOG "Hero entrance: mount, not scroll".
  const shouldShow = immediate || isVisible
  const MComp = resolveMotion(as)
  const variants = REVEAL_VARIANTS[preset] || REVEAL_VARIANTS['fade-up']
  const d = delay != null ? delay / 1000 : 0
  // Opacity on the slow calm spring; the y/scale glide on a quick tween so the
  // transform settles fast and stops suppressing `backdrop-filter` (keeps glass
  // cards frosted for the visible part of the reveal — see REVEAL_SHIFT).
  const transition = reduce
    ? { duration: 0 }
    : {
        ...REVEAL_SPRING,
        delay: d,
        y: { ...REVEAL_SHIFT, delay: d },
        scale: { ...REVEAL_SHIFT, delay: d },
      }

  return (
    // MComp is a STABLE reference — m.<tag> or a module-scope m.create() component
    // (selected, not created, per render) — so this is a false positive.
    // eslint-disable-next-line react-hooks/static-components
    <MComp
      // No scroll observer needed when `immediate` — it plays on mount.
      ref={immediate ? undefined : ref}
      // Reduced motion: render shown immediately so content never depends on
      // motion to be visible. Otherwise start hidden and spring in on reveal
      // (on scroll-intersection, or on mount when `immediate`).
      initial={reduce ? 'shown' : 'hidden'}
      animate={reduce || shouldShow ? 'shown' : 'hidden'}
      variants={variants}
      transition={transition}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MComp>
  )
}
