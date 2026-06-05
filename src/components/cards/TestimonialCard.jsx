import ScrollAnimation from '../animations/ScrollAnimation'

function TestimonialCard({ logo, recommender, title, company, text }) {
  return (
    <ScrollAnimation>
      <div className="glass-panel rounded-2xl p-6 flex flex-col h-full transition-transform duration-fast ease-standard hover:-translate-y-1">
      {/* Logo and Recommender Info */}
      <div className="flex items-start gap-4 mb-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-white rounded flex items-center justify-center">
            {logo ? (
              <img src={logo} alt={company} className="w-full h-full object-contain p-2" />
            ) : (
              <div className="w-full h-full bg-surface-color-tertiary rounded"></div>
            )}
          </div>
        </div>

        {/* Recommender Info - Vertical Column */}
        <div className="flex flex-col gap-1">
          <p className="type-subtitle text-color-primary leading-none">{recommender}</p>
          <p className="type-body text-color-secondary leading-none">{title}</p>
          <p className="type-body text-color-secondary leading-none">{company}</p>
        </div>
      </div>

      {/* Testimonial Text */}
      <p className="type-body text-color-secondary flex-1">
        {text}
      </p>
      </div>
    </ScrollAnimation>
  )
}

export default TestimonialCard

