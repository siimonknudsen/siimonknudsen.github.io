import styles from './Badge.module.css'

/**
 * Badge — small frosted-glass status pill.
 *
 * Props:
 *  - variant: 'solid' (default) · 'outline' · 'active'
 *  - tone: 'neutral' (default) · 'accent'
 *  - className: optional extra classes
 */
function Badge({ children, variant = 'solid', tone = 'neutral', className = '' }) {
  return (
    <span
      className={`type-caption ${styles.badge} ${styles[variant]} ${styles[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
