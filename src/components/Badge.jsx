import styles from './Badge.module.css'

/**
 * Badge — small frosted-glass status pill.
 *
 * Props:
 *  - variant: 'solid' (default) · 'outline' · 'active'
 *  - tone: 'neutral' (default) · 'accent'
 *  - className: optional extra classes
 */
function Badge({ children, variant = 'solid', tone = 'neutral', size = 'sm', className = '' }) {
  return (
    <span
      className={`${styles.badge} ${styles[size]} ${styles[variant]} ${styles[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
