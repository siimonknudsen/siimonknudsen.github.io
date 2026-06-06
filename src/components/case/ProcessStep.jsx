import Media from '../Media'
import styles from './ProcessStep.module.css'

/**
 * ProcessStep — a numbered step in the Process narrative: a mono index, an
 * optional step title, body copy, and an optional <Media> illustration.
 *
 * Props:
 *  - index  zero-based position (rendered 1-based, mono, zero-padded)
 *  - step   optional short step title
 *  - body   the step description
 *  - image  optional image src (already resolved to an absolute path)
 */
function ProcessStep({ index = 0, step, body, image }) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <div className={styles.step}>
      <div className={styles.head}>
        <span className={`font-mono text-accent ${styles.index}`} aria-hidden="true">
          {num}
        </span>
        <div className={styles.copy}>
          {step && <h3 className={`type-title text-color-primary ${styles.title}`}>{step}</h3>}
          {body && <p className={`type-body text-color-secondary ${styles.body}`}>{body}</p>}
        </div>
      </div>
      {image && (
        <Media
          src={image}
          alt={step || `Process step ${num}`}
          aspect="auto"
          rounded="rounded-2xl"
          className={styles.media}
        />
      )}
    </div>
  )
}

export default ProcessStep
