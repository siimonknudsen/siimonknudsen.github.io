/**
 * Button — the design-system action. 8px radius (rounded-lg), tokenised.
 *
 * variant: primary | secondary | accent | outline | glass | ghost  (default primary)
 *   primary  → solid contrast surface (high-emphasis)
 *   secondary→ solid tertiary surface (neutral)
 *   accent   → solid warm-orange brand fill
 *   outline  → transparent fill + translucent glass hairline (theme-aware light edge)
 *   glass    → frosted .glass .glass-item surface
 *   ghost    → quiet text-only
 * size:    sm | md | lg                                    (default md)
 *   Heights: sm 32 · md 40 · lg 48 (tokenised, never hardcoded).
 * Extras:  iconLeft, iconRight, iconOnly (square — pass an aria-label), loading,
 *          fullWidth, and `as` (polymorphic — e.g. as={Link} to="/..." or as="a").
 *
 * Hover is a COLOUR shift only — no lift/translate, no scale, no glow sweep
 * (calm-motion DNA). Solid variants additionally darken one step on :active.
 * Keeps the signature text-roll hover on the label and the accent focus ring.
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
  outline: `text-color-primary ${styles.outline}`,
  glass: `glass glass-item text-color-primary ${styles.glass}`,
  ghost: `glass-item text-color-secondary ${styles.ghost}`,
}

const base = `${styles.base} type-label`

function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  // Comp is rendered as <Comp> below; ESLint can't see JSX usage without
  // react/jsx-uses-vars, so this destructured rename reads as unused.
  // eslint-disable-next-line no-unused-vars
  as: Comp = 'button',
  iconLeft,
  iconRight,
  // Square icon button — width locks to height, the label is dropped, and an
  // aria-label is required for an accessible name (warned in dev if missing).
  iconOnly,
  loading = false,
  fullWidth = false,
  ...props
}) {
  if (import.meta.env?.DEV && iconOnly && !props['aria-label'] && !props['aria-labelledby']) {
    console.warn('Button: an `iconOnly` button needs an `aria-label` for an accessible name.')
  }

  return (
    <Comp
      className={`${base} ${sizeClasses[size] || sizeClasses.md} ${
        variantClasses[variant] || variantClasses.primary
      } ${iconOnly ? styles.iconOnly : ''} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner />}
      {iconOnly ? (
        // Square button: render only the icon (no text-roll), spinner replaces it
        // while loading.
        !loading && iconOnly
      ) : (
        <>
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
        </>
      )}
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
