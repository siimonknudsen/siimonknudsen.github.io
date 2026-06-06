import { useReducedMotion } from '../motion'
import styles from './WordReveal.module.css'

/**
 * WordReveal — splits text into words and staggers each word's entrance
 * (translateY + opacity) using the motion tokens. Honors reduced-motion by
 * rendering instantly. Polymorphic via `as` so it can be an <h1>, <p>, etc.
 *
 * stepMs — per-word delay (defaults to ~50ms).
 */
function WordReveal({ as: Comp = 'span', text, className = '', stepMs = 50, ...props }) {
  const reduced = useReducedMotion()
  const words = String(text).split(' ')

  return (
    <Comp className={className} {...props}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className={styles.word}>
          <span
            className={reduced ? styles.wordInnerStatic : styles.wordInner}
            style={reduced ? undefined : { animationDelay: `${i * stepMs}ms` }}
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
