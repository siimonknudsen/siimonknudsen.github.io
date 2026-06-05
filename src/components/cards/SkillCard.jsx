import ScrollAnimation from '../animations/ScrollAnimation'

/**
 * Reusable SkillCard component for displaying skills with descriptions
 */
function SkillCard({ title, description }) {
  return (
    <ScrollAnimation>
      <div className="glass-panel rounded-2xl p-5 flex flex-col h-full transition-transform duration-fast ease-standard hover:-translate-y-1">
        <h3 className="type-subtitle text-color-primary mb-4">
          {title}
        </h3>
        <p className="type-body text-color-secondary">
          {description}
        </p>
      </div>
    </ScrollAnimation>
  )
}

export default SkillCard

