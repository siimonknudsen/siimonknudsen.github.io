import useReveal from '../motion/useReveal'

/**
 * <ScrollAnimation> — legacy wrapper, kept for its existing call sites
 * (About, Archive, SkillCard, TestimonialCard, LogoGrid, ExperienceTimeline…).
 * It is now a thin alias over the SINGLE central reveal system: the same
 * `useReveal` hook + global `.fx-reveal`/`.fx-fade-up` classes that <Reveal>
 * uses. This guarantees every page's scroll-reveal is identical — same slow
 * even-fade + gentle glide, same trigger position — so the two systems can
 * never drift apart again. Prefer <Reveal> directly for new work.
 */
function ScrollAnimation({ children, className = '' }) {
  const { ref, isVisible } = useReveal()
  return (
    <div
      ref={ref}
      className={`fx-reveal fx-fade-up ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

export default ScrollAnimation
