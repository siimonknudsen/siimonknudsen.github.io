/**
 * Button — the design-system action. 8px radius (rounded-lg), tokenised.
 *
 * variant: primary | secondary | accent | glass | ghost   (default primary)
 * size:    sm | md | lg                                    (default md)
 * Extras:  iconLeft, iconRight, loading, fullWidth, and `as` (polymorphic —
 *          e.g. as={Link} to="/..." or as="a" href="...").
 */

import styles from './Button.module.css'

function Spinner() {
  return (
    <svg className={`animate-spin ${styles.spinner}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className={styles.spinnerTrack} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className={styles.spinnerHead} d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const sizeClasses = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

const variantClasses = {
  primary: `bg-surface-color-contrast-primary text-color-contrast-primary ${styles.primary}`,
  secondary: `bg-surface-color-tertiary text-color-primary ${styles.secondary}`,
  accent: `bg-accent ${styles.accent}`,
  glass: `glass glass-item text-color-primary ${styles.glass}`,
  ghost: `glass-item text-color-secondary ${styles.ghost}`,
}

const base = `${styles.base} type-label`

function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Comp = 'button',
  iconLeft,
  iconRight,
  loading = false,
  fullWidth = false,
  ...props
}) {
  return (
    <Comp
      className={`${base} ${sizeClasses[size] || sizeClasses.md} ${
        variantClasses[variant] || variantClasses.primary
      } ${fullWidth ? styles.fullWidth : ''} ${className}`}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner />}
      {!loading && iconLeft}
      {/* Text-roll on hover: the label slides up and out while a duplicate
          rises from below into place. */}
      <span className={styles.roll}>
        <span className={styles.rollText}>{children}</span>
        <span className={styles.rollText} aria-hidden="true">
          {children}
        </span>
      </span>
      {!loading && iconRight}
    </Comp>
  )
}

// Backwards-compatible named exports
export const PrimaryButton = ({ children, ...props }) => (
  <Button variant="primary" {...props}>
    {children}
  </Button>
)

export const SecondaryButton = ({ children, ...props }) => (
  <Button variant="secondary" {...props}>
    {children}
  </Button>
)

export default Button
