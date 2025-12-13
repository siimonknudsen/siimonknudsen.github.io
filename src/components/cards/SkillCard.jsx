import ScrollAnimation from '../animations/ScrollAnimation'

/**
 * Reusable SkillCard component for displaying skills with descriptions
 */
function SkillCard({ title, description }) {
  return (
    <ScrollAnimation>
      <div className="bg-surface-secondary rounded-lg p-6 flex flex-col">
        <h3 className="text-[18px] font-medium text-text-primary mb-4 leading-none">
          {title}
        </h3>
        <p className="text-[16px] text-text-secondary font-normal leading-[1.2]">
          {description}
        </p>
      </div>
    </ScrollAnimation>
  )
}

export default SkillCard

