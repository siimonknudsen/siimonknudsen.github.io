import Reveal from '../motion/Reveal'
import styles from './SkillCard.module.css'

/**
 * SkillCard — one skill over its background image, copy sitting at the bottom
 * of the frame. A scrim under the copy keeps the on-media type legible whatever
 * the image does behind it.
 */
function SkillCard({ title, description, image }) {
  return (
    <Reveal className={styles.card}>
      {image && (
        <img src={image} alt="" aria-hidden="true" className={styles.bg} loading="lazy" />
      )}
      <span className={styles.scrim} aria-hidden="true" />
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {/* The inner span carries the clamp so the <p> itself can be a flex
            box that pushes the copy to the BOTTOM of its reserved height. */}
        <p className={styles.description}>
          <span className={styles.descriptionText}>{description}</span>
        </p>
      </div>
    </Reveal>
  )
}

export default SkillCard
