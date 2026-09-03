import { useEffect, useRef, useState } from 'react'
import TestimonialCard from '../cards/TestimonialCard'
import useReducedMotion from '../motion/useReducedMotion'
import styles from './TestimonialCarousel.module.css'

// How long a quote holds before the carousel advances itself. Long, because
// these are paragraphs to read, not images to skim — the progress fill is what
// makes the wait legible rather than the wait being short.
const DWELL_MS = 9000

/**
 * Centre slide `i` in the track. Uses the slide's measured position rather than
 * `i * clientWidth` — the track is padded and gapped, so those differ.
 */
function scrollToSlide(track, i, behavior) {
  const slide = track.children[i]
  if (!slide) return
  const trackRect = track.getBoundingClientRect()
  const slideRect = slide.getBoundingClientRect()
  const delta = slideRect.left + slideRect.width / 2 - (trackRect.left + track.clientWidth / 2)
  track.scrollTo({ left: track.scrollLeft + delta, behavior })
}

/**
 * TestimonialCarousel — the phone presentation of the testimonials row.
 *
 * Swiping is native scroll-snap rather than a JS drag: it inherits real
 * momentum, rubber-banding, trackpad and keyboard support for free, and it
 * can't desync from the indicator the way a hand-rolled drag can.
 *
 * The indicator is the "segmented pill" pattern (Apple, Vercel, Linear): the
 * inactive slides are plain dots, the active one widens into a pill whose
 * interior fills over DWELL_MS — so the dots carry both position AND timing,
 * without the story-bar look that would read as media rather than reading.
 *
 * Auto-advance stops PERMANENTLY on first interaction (WCAG 2.2.2 — auto-
 * updating content needs a way to stop it, and a user who has started reading
 * has told us they want to steer). It also idles while off-screen or while the
 * tab is hidden, and never runs at all under reduced motion.
 */
function TestimonialCarousel({ items }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  // Once true, the carousel never advances itself again this visit.
  const [taken, setTaken] = useState(false)
  const [active, setActive] = useState(false) // on-screen AND tab visible
  const reduce = useReducedMotion()

  const autoplay = !reduce && !taken && active && items.length > 1

  // ── Follow the scroll position so the dots track a swipe ────────────────
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        // Whichever slide's centre is nearest the track's centre is the one on
        // screen. Measured, not derived from a pitch — the track is padded and
        // the slides carry a gap, so scrollLeft/clientWidth doesn't hold.
        const mid = track.getBoundingClientRect().left + track.clientWidth / 2
        let best = 0
        let bestDist = Infinity
        for (let i = 0; i < track.children.length; i += 1) {
          const r = track.children[i].getBoundingClientRect()
          const dist = Math.abs(r.left + r.width / 2 - mid)
          if (dist < bestDist) {
            bestDist = dist
            best = i
          }
        }
        setIndex((prev) => (prev === best ? prev : best))
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items.length])

  // ── Idle while off-screen or backgrounded ───────────────────────────────
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const sync = (onScreen) => setActive(onScreen && document.visibilityState === 'visible')
    const io = new IntersectionObserver(([e]) => sync(e.isIntersecting), { threshold: 0.4 })
    io.observe(track)
    const onVisibility = () => setActive((prev) => prev && document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // ── Auto-advance ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!autoplay) return
    const id = setTimeout(() => {
      const track = trackRef.current
      if (!track) return
      scrollToSlide(track, (index + 1) % items.length, 'smooth')
    }, DWELL_MS)
    return () => clearTimeout(id)
  }, [autoplay, index, items.length])

  const goTo = (i) => {
    setTaken(true)
    if (trackRef.current) scrollToSlide(trackRef.current, i, reduce ? 'auto' : 'smooth')
  }

  return (
    <div className={styles.wrap}>
      <div
        ref={trackRef}
        className={styles.track}
        // A scrollable region needs to be focusable so it can be reached and
        // arrowed through without a pointer.
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        // Any direct input means the reader is steering now — hand it over.
        onPointerDown={() => setTaken(true)}
        onKeyDown={() => setTaken(true)}
        onWheel={() => setTaken(true)}
      >
        {items.map((t, i) => (
          <div
            key={t.recommender}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            <TestimonialCard
              logo={t.logo}
              logoNode={t.logoNode}
              recommender={t.recommender}
              title={t.title}
              company={t.company}
              text={t.text}
            />
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {items.map((t, i) => {
          const isActive = i === index
          return (
            <button
              key={t.recommender}
              type="button"
              className={`${styles.dot} ${isActive ? styles.dotActive : ''} focus-ring`}
              aria-label={`Testimonial ${i + 1} of ${items.length}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => goTo(i)}
            >
              <span className={styles.dotTrack}>
                {isActive && (
                  <span
                    // Keyed by index so the fill restarts cleanly on each
                    // advance instead of resuming mid-way.
                    key={index}
                    className={styles.dotFill}
                    style={{ animationDuration: `${DWELL_MS}ms` }}
                    data-running={autoplay ? 'true' : 'false'}
                  />
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TestimonialCarousel
