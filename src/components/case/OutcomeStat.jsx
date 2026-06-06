import styles from './OutcomeStat.module.css'

/**
 * OutcomeStat — a single big metric (the result payload).
 * The number is rendered in text-accent (orange = outcome), the label in
 * secondary, with an optional supporting note.
 *
 * Props:
 *  - metric  the headline figure, e.g. "+6%", "100%"
 *  - label   what the figure measures, e.g. "monthly store revenue"
 *  - note    optional supporting context
 */
function OutcomeStat({ metric, label, note }) {
  if (!metric && !label) return null
  return (
    <div className={styles.stat}>
      {metric && <p className={`type-display text-accent ${styles.metric}`}>{metric}</p>}
      {label && <p className={`type-body text-color-secondary ${styles.label}`}>{label}</p>}
      {note && <p className={`type-body-sm text-color-tertiary ${styles.note}`}>{note}</p>}
    </div>
  )
}

export default OutcomeStat
