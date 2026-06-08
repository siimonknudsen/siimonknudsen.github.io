import Reveal from '../motion/Reveal'
import useSpotlight from '../../hooks/useSpotlight'
import styles from './SkillCard.module.css'

/**
 * Reusable SkillCard component for displaying skills with descriptions.
 * The glass card IS the reveal element (animates its own opacity/transform) so
 * its backdrop-filter frost stays present through the reveal — a wrapper would
 * isolate the backdrop and make the blur "pop in" late.
 */
function SkillCard({ title, description }) {
  const onSpotlight = useSpotlight()

  return (
    <Reveal className={`group glass-panel ${styles.card}`} onMouseMove={onSpotlight}>
      <span aria-hidden="true" className="fx-spotlight" />
      <h3 className={`type-subtitle text-color-primary ${styles.title}`}>
        {title}
      </h3>
      <p className="type-body text-color-secondary">
        {description}
      </p>
    </Reveal>
  )
}

export default SkillCard

