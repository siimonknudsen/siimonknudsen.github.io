import { useReducedMotion, useReveal } from '../motion'
import styles from './WordReveal.module.css'

/**
 * WordReveal — splits text into words and staggers each word's entrance
 * (translateY + opacity) using the motion tokens. Honors reduced-motion by
 * rendering instantly. Polymorphic via `as` so it can be an <h1>, <p>, etc.
 *
 * stepMs — per-word delay (defaults to ~50ms).
 * whenInView — when true, the staggered animation waits until the element
 *   scrolls into the viewport (via IntersectionObserver) instead of playing
 *   on mount. Defaults to false, which preserves the original mount behavior.
 */
function WordReveal({ as: Comp = 'span', text, className = '', stepMs = 50, whenInView = false, ...props }) {
  const reduced = useReducedMotion()
  const { ref, isVisible } = useReveal()
  const words = String(text).split(' ')

  // Should the rising animation run yet? Without whenInView it runs on mount
  // (original behavior); with whenInView it waits until scrolled into view.
  const play = !whenInView || isVisible

  return (
    <Comp className={className} ref={whenInView ? ref : undefined} {...props}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className={styles.word}>
          <span
            className={
              reduced
                ? styles.wordInnerStatic
                : play
                  ? styles.wordInner
                  : styles.wordInnerWaiting
            }
            style={reduced || !play ? undefined : { animationDelay: `${i * stepMs}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Comp>
  )
}

export default WordReveal
