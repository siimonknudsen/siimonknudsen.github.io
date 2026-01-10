import ScrollAnimation from '../animations/ScrollAnimation'

function TestimonialCard({ logo, recommender, title, company, text }) {
  return (
    <ScrollAnimation>
      <div className="bg-surface-color-secondary rounded-lg p-6 flex flex-col h-full">
      {/* Logo and Recommender Info */}
      <div className="flex items-start gap-4 mb-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-white rounded flex items-center justify-center">
            {logo ? (
              <img src={logo} alt={company} className="w-full h-full object-contain p-2" />
            ) : (
              <div className="w-full h-full bg-neutral-200 rounded"></div>
            )}
          </div>
        </div>

        {/* Recommender Info - Vertical Column */}
        <div className="flex flex-col gap-1">
          <p className="text-color-primary font-medium leading-none text-[18px]">{recommender}</p>
          <p className="text-color-secondary text-[16px] leading-none">{title}</p>
          <p className="text-color-secondary text-[16px] leading-none">{company}</p>
        </div>
      </div>

      {/* Testimonial Text */}
      <p className="text-color-secondary text-[16px] font-normal leading-[1.6] flex-1">
        {text}
      </p>
      </div>
    </ScrollAnimation>
  )
}

export default TestimonialCard

