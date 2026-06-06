import { useState, useEffect } from 'react'
import { useReducedMotion } from './motion'
import styles from './IntroLoader.module.css'

const SEEN_KEY = 'intro-seen'
const FILL_MS = 1300 // line-fill duration (keep in sync with CSS .fill animation)
const FADE_MS = 450 // overlay fade-out

/**
 * IntroLoader — a minimal first-load intro (inspired by nekohealth.com): the
 * wordmark "Simon Knudsen" on a plain surface with a thin line that fills, then
 * the overlay fades to reveal the site. Shows once per browser session, locks
 * scroll while visible, and is skipped entirely under reduced-motion.
 */
function IntroLoader() {
  const reduced = useReducedMotion()
  // 'loading' → 'done' (fade out) → 'gone' (unmounted)
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'gone'
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return 'gone'
    } catch {
      /* sessionStorage unavailable — show the intro */
    }
    return 'loading'
  })

  useEffect(() => {
    if (phase === 'gone') return
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignore */
    }

    // Reduced motion: skip the animation, reveal immediately.
    if (reduced) {
      setPhase('gone')
      return
    }

    const toFade = setTimeout(() => setPhase('done'), FILL_MS)
    const toGone = setTimeout(() => setPhase('gone'), FILL_MS + FADE_MS)

    return () => {
      clearTimeout(toFade)
      clearTimeout(toGone)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Lock scroll while the intro is visible; restore once it's done. The
  // component stays mounted (rendering null), so we key the restore on phase
  // rather than the unmount cleanup, which would never run here.
  useEffect(() => {
    document.body.style.overflow = phase === 'gone' ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  if (phase === 'gone') return null

  return (
    <div
      className={`${styles.overlay} ${phase === 'done' ? styles.fade : ''}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className={styles.inner}>
        <span className={`text-color-primary ${styles.word}`}>Simon Knudsen</span>
        <span className={styles.track}>
          <span className={styles.fill} />
        </span>
      </div>
    </div>
  )
}

export default IntroLoader
