/**
 * Button — the design-system action. 8px radius (rounded-lg), tokenised.
 *
 * variant: primary | secondary | accent | glass | ghost   (default primary)
 * size:    sm | md | lg                                    (default md)
 * Extras:  iconLeft, iconRight, loading, fullWidth, and `as` (polymorphic —
 *          e.g. as={Link} to="/..." or as="a" href="...").
 */

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const sizeClasses = {
  sm: 'h-8 px-3.5',
  md: 'h-10 px-5',
  lg: 'h-12 px-6',
}

const variantClasses = {
  primary:
    'bg-surface-color-contrast-primary text-color-contrast-primary shadow-sm hover:shadow-md hover:-translate-y-px',
  secondary:
    'bg-surface-color-tertiary text-color-primary shadow-xs hover:bg-surface-color-secondary hover:-translate-y-px',
  accent:
    'bg-accent text-[color:var(--accent-contrast)] shadow-sm hover:shadow-md hover:-translate-y-px',
  glass: 'glass glass-item text-color-primary hover:-translate-y-px',
  ghost: 'glass-item text-color-secondary hover:text-color-primary',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg type-label whitespace-nowrap select-none ' +
  'transition-[background-color,color,transform,opacity,box-shadow] duration-fast ease-standard ' +
  'active:scale-[0.98] active:translate-y-0 ' +
  'disabled:opacity-50 disabled:pointer-events-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-color-primary)]'

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
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      aria-busy={loading || undefined}
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
