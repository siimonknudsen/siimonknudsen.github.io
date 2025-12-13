/**
 * Reusable Section component with consistent padding and max-width
 */
function Section({ children, className = "" }) {
  return (
    <section className={`w-full p-6 mb-20 ${className}`}>
      <div className="max-w-[1920px] mx-auto">
        {children}
      </div>
    </section>
  )
}

export default Section

