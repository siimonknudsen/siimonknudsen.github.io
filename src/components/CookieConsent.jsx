import { useEffect, useState } from 'react'
import Button from './buttons/Button'
import { useReducedMotion } from './motion'
import { getConsent, setConsent, loadClarity } from '../lib/consent'
import styles from './CookieConsent.module.css'

const APPEAR_MS = 1400 // let the intro loader finish before sliding in
const EXIT_MS = 320 // keep in sync with .exit transition

/**
 * CookieConsent — a calm, on-brand consent card (bottom-left). Nothing is
 * tracked until the visitor taps Accept; Decline loads nothing. The choice is
 * remembered (localStorage), so the banner only ever shows to undecided
 * visitors. Honest, gated, reduced-motion safe.
 */
function CookieConsent() {
  const reduced = useReducedMotion()
  // 'hidden' → 'in' (visible) → 'out' (animating away) → unmounted
  const [phase, setPhase] = useState('hidden')

  // Only surface the banner to visitors who haven't decided yet.
  useEffect(() => {
    if (getConsent()) return // already accepted or declined — stay silent
    const t = setTimeout(() => setPhase('in'), reduced ? 0 : APPEAR_MS)
    return () => clearTimeout(t)
  }, [reduced])

  const dismiss = (choice) => {
    setConsent(choice)
    if (choice === 'accepted') loadClarity()
    if (reduced) {
      setPhase('done')
      return
    }
    setPhase('out')
    setTimeout(() => setPhase('done'), EXIT_MS)
  }

  if (phase === 'hidden' || phase === 'done') return null

  return (
    <section
      className={`glass-panel ${styles.card} ${phase === 'in' ? styles.in : ''} ${
        phase === 'out' ? styles.exit : ''
      }`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <h2 id="cookie-consent-title" className={`type-title ${styles.title}`}>
        I use <span aria-hidden="true">🍪</span> cookies
      </h2>
      <p id="cookie-consent-desc" className={`type-body-sm ${styles.body}`}>
        I use cookies to understand how you navigate this site and what topics
        interest you most. No ads, no data sold — ever.
      </p>
      <div className={styles.actions}>
        <Button
          variant="primary"
          className={styles.pill}
          onClick={() => dismiss('accepted')}
        >
          Accept
        </Button>
        <Button
          variant="ghost"
          className={`${styles.pill} ${styles.decline}`}
          onClick={() => dismiss('declined')}
        >
          Decline
        </Button>
      </div>
    </section>
  )
}

export default CookieConsent
