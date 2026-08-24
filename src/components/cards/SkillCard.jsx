import Reveal from '../motion/Reveal'
import styles from './SkillCard.module.css'

/**
 * Reusable SkillCard component for displaying skills with descriptions.
 * The glass card IS the reveal element (animates its own opacity/transform) so
 * its backdrop-filter frost stays present through the reveal — a wrapper would
 * isolate the backdrop and make the blur "pop in" late.
 */
function SkillCard({ title, description }) {
  return (
    // Flat solid card — tonal secondary surface, no glass/border/shadow.
    <Reveal className={styles.card}>
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

