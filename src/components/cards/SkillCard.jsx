import ScrollAnimation from '../animations/ScrollAnimation'

/**
 * Reusable SkillCard component for displaying skills with descriptions
 */
function SkillCard({ title, description }) {
  return (
    <ScrollAnimation>
      <div className="bg-surface-color-secondary rounded-md p-5 flex flex-col h-full">
        <h3 className="text-[18px] font-medium text-color-primary mb-4 leading-none">
          {title}
        </h3>
        <p className="text-[16px] text-color-secondary font-normal leading-[1.4]">
          {description}
        </p>
      </div>
    </ScrollAnimation>
  )
}

export default SkillCard

