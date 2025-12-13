/**
 * Reusable Heading component with consistent typography
 */
function Heading({ 
  level = 1, 
  children, 
  className = "",
  size = "xl" // xl (5xl), lg (18px), md (16px)
}) {
  const sizeClasses = {
    xl: "text-5xl",
    lg: "text-[18px]",
    md: "text-[16px]"
  }

  const Tag = `h${level}`
  
  return (
    <Tag className={`${sizeClasses[size]} font-medium text-text-primary ${className}`}>
      {children}
    </Tag>
  )
}

export default Heading

