import { m, useReducedMotion } from 'motion/react'
import useReveal from './useReveal'
import { REVEAL_SPRING, REVEAL_SHIFT, REVEAL_VARIANTS } from './revealMotion'

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
  className = '',
  style,
  children,
  ...props
}) {
  const reduce = useReducedMotion()
  const { ref, isVisible } = useReveal({ once })
  const MComp = m[as] || m.div
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
    <MComp
      ref={ref}
      // Reduced motion: render shown immediately so content never depends on
      // motion to be visible. Otherwise start hidden and spring in on reveal.
      initial={reduce ? 'shown' : 'hidden'}
      animate={isVisible ? 'shown' : 'hidden'}
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
