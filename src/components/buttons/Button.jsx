/**
 * Button component with primary and secondary variants
 */
function Button({ children, variant = 'primary', className = "", ...props }) {
  const baseClasses = "px-3 py-2 rounded-lg font-medium text-sm transition-colors"
  
  const variantClasses = {
    primary: "bg-surface-contrast-primary text-text-contrast-primary hover:bg-surface-contrast-primary hover:text-text-contrast-primary",
    secondary: "bg-surface-tertiary text-text-primary hover:bg-surface-secondary"
  }

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Export named components for backward compatibility
export const PrimaryButton = ({ children, ...props }) => (
  <Button variant="primary" {...props}>{children}</Button>
)

export const SecondaryButton = ({ children, ...props }) => (
  <Button variant="secondary" {...props}>{children}</Button>
)

export default Button

