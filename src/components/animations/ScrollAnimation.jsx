import Reveal from '../motion/Reveal'

/**
 * <ScrollAnimation> — legacy wrapper, kept for its existing call sites
 * (About, Archive, SkillCard, TestimonialCard, LogoGrid, ExperienceTimeline…).
 * Now just renders <Reveal>, so it shares the one site-wide Framer Motion spring
 * reveal — the two systems can never drift apart. Prefer <Reveal> for new work.
 */
function ScrollAnimation({ children, className = '', ...props }) {
  // Forward delay/preset/etc. through to Reveal (existing call sites pass none,
  // so they're unaffected; lets callers stagger via `delay`).
  return <Reveal className={className} {...props}>{children}</Reveal>
}

export default ScrollAnimation
