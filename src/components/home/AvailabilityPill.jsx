import styles from './AvailabilityPill.module.css'

/**
 * AvailabilityPill — a small frosted-glass pill with a pulsing green dot that
 * signals current availability. Sits at the top of the hero light-stage card.
 */
function AvailabilityPill({ label = 'Available for work' }) {
  return (
    <span className={`glass type-label text-color-secondary ${styles.pill}`}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  )
}

export default AvailabilityPill
