/**
 * BodyText — thin wrapper over the semantic body type roles (see index.css).
 * size: lg → type-body-lg · base → type-body · sm → type-body-sm · xs → type-caption
 */
function BodyText({ children, className = '', size = 'base', color = 'secondary' }) {
  const roleClasses = {
    lg: 'type-body-lg',
    base: 'type-body',
    sm: 'type-body-sm',
    xs: 'type-caption',
  }

  const colorClasses = {
    primary: 'text-color-primary',
    secondary: 'text-color-secondary',
    tertiary: 'text-color-tertiary',
  }

  return (
    <p className={`${roleClasses[size] || roleClasses.base} ${colorClasses[color] || colorClasses.secondary} ${className}`}>
      {children}
    </p>
  )
}

export default BodyText
