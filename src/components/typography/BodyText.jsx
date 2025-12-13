/**
 * Reusable BodyText component with consistent typography
 */
function BodyText({ 
  children, 
  className = "",
  size = "base", // base (16px), sm (14px), xs (13px)
  color = "secondary" // primary, secondary, tertiary
}) {
  const sizeClasses = {
    base: "text-[16px]",
    sm: "text-[14px]",
    xs: "text-[13px]"
  }

  const colorClasses = {
    primary: "text-text-primary",
    secondary: "text-text-secondary",
    tertiary: "text-text-tertiary"
  }

  return (
    <p className={`${sizeClasses[size]} ${colorClasses[color]} font-normal leading-[1.2] ${className}`}>
      {children}
    </p>
  )
}

export default BodyText

