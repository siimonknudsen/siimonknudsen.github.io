/**
 * Button — the design-system action. 8px radius (rounded-lg), tokenised.
 *
 * variant: primary | secondary | accent | glass | ghost   (default primary)
 * size:    sm | md | lg                                    (default md)
 * Extras:  iconLeft, iconRight, loading, fullWidth, and `as` (polymorphic —
 *          e.g. as={Link} to="/..." or as="a" href="...").
 */

import { useCallback, useRef } from 'react'
import { useReducedMotion } from '../motion'
import styles from './Button.module.css'

// Variants that get the magnetic pull — reserved for the CTAs.
const MAGNETIC_VARIANTS = new Set(['primary', 'accent'])
// Max travel toward the cursor, in px. Kept subtle.
const MAGNET_STRENGTH = 5

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
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const magnetic = MAGNETIC_VARIANTS.has(variant) && !reduced

  const handlePointerMove = useCallback(
    (e) => {
      // Only fine pointers (mouse/trackpad) — skip touch/coarse input.
      if (!magnetic || e.pointerType !== 'mouse') return
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // Offset from button center, normalised to [-0.5, 0.5].
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty('--mxn', `${(nx * 2 * MAGNET_STRENGTH).toFixed(2)}px`)
      el.style.setProperty('--myn', `${(ny * 2 * MAGNET_STRENGTH).toFixed(2)}px`)
    },
    [magnetic],
  )

  const handlePointerLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mxn', '0px')
    el.style.setProperty('--myn', '0px')
  }, [])

  return (
    <Comp
      ref={ref}
      className={`${base} ${sizeClasses[size] || sizeClasses.md} ${
        variantClasses[variant] || variantClasses.primary
      } ${magnetic ? styles.magnetic : ''} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      aria-busy={loading || undefined}
      onPointerMove={magnetic ? handlePointerMove : undefined}
      onPointerLeave={magnetic ? handlePointerLeave : undefined}
      {...props}
    >
      {loading && <Spinner />}
      {!loading && iconLeft}
      {children}
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
