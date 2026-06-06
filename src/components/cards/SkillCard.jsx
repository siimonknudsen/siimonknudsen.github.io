import ScrollAnimation from '../animations/ScrollAnimation'
import useSpotlight from '../../hooks/useSpotlight'
import styles from './SkillCard.module.css'

/**
 * Reusable SkillCard component for displaying skills with descriptions
 */
function SkillCard({ title, description }) {
  const onSpotlight = useSpotlight()

  return (
    <ScrollAnimation>
      <div
        className={`group glass-panel ${styles.card}`}
        onMouseMove={onSpotlight}
      >
        <span aria-hidden="true" className="fx-spotlight" />
        <h3 className={`type-subtitle text-color-primary ${styles.title}`}>
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

