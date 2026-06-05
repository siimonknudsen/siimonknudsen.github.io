/**
 * Heading — thin wrapper over the semantic type roles (see index.css / DESIGN_SYSTEM.md).
 * size: xl → type-display · lg → type-heading · md → type-heading-sm · sm → type-title
 */
function Heading({ level = 1, children, className = '', size = 'xl' }) {
  const roleClasses = {
    xl: 'type-display',
    lg: 'type-heading',
    md: 'type-heading-sm',
    sm: 'type-title',
  }

  const Tag = `h${level}`

  return (
    <Tag className={`${roleClasses[size] || roleClasses.xl} text-color-primary ${className}`}>
      {children}
    </Tag>
  )
}

export default Heading
