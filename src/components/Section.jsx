import styles from './Section.module.css'

/**
 * Reusable Section component with consistent padding and max-width
 */
function Section({ children, className = "" }) {
  return (
    <section className={`${styles.section} ${className}`}>
      <div className={styles.inner}>
        {children}
      </div>
    </section>
  )
}

export default Section
