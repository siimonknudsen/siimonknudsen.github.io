/**
 * Button component with primary and secondary variants
 */
function Button({ children, variant = 'primary', className = "", ...props }) {
  const baseClasses = "px-3 py-2 rounded-lg font-medium text-sm transition-colors"
  
  const variantClasses = {
    primary: "bg-surface-color-contrast-primary text-color-contrast-primary hover:bg-surface-color-contrast-primary hover:text-color-contrast-primary",
    secondary: "bg-surface-color-tertiary text-color-primary hover:bg-surface-color-secondary"
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

