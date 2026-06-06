import ScrollAnimation from '../animations/ScrollAnimation'
import styles from './SkillCard.module.css'

/**
 * Reusable SkillCard component for displaying skills with descriptions
 */
function SkillCard({ title, description }) {
  return (
    <ScrollAnimation>
      <div className={`glass-panel ${styles.card}`}>
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

