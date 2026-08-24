import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import TagRow from './TagRow'
import Reveal from '../motion/Reveal'
import Media from '../Media'
import styles from './ProjectCard.module.css'

// Motion-wrapped <Link>, created ONCE at module scope (never during render) so
// the glass card link can BE the reveal element — keeps its backdrop-filter
// frost alive through the reveal instead of a wrapper killing it.
const MotionLink = m.create(Link)

function ProjectCard({ id, title, description, tags = [], impact, delay, noMedia = false }) {
  return (
    // Flat solid card — a tonal secondary surface (no glass/border/shadow),
    // matching the testimonial + skill cards. revealWrap (height:100%) folds
    // onto it for grid stretch.
    <Reveal
      as={MotionLink}
      to={`/project/${id}`}
      preset="fade-up"
      delay={delay}
      className={`${styles.card} ${styles.revealWrap}`}
    >
      {/* Image frame — clips the inner zoom on hover */}
      <div className={styles.frame}>
        <div className={styles.zoom}>
          {/* noMedia: same tokenised placeholder frame, zero image requests
              (a missing hero used to 404 through every format). */}
          <Media src={noMedia ? null : `/projects/${id}/images/hero`} alt={title} aspect="aspect-video" rounded="rounded-xl" />
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {impact && (
          <span className={`bg-accent-soft border-accent ${styles.impact}`}>
            <strong className="text-accent">{impact.value}</strong>
            <span className="text-color-secondary">{impact.label}</span>
          </span>
        )}
        <div className={styles.text}>
          <h3 className="type-subtitle text-color-primary">{title}</h3>
          {description && <p className="type-body text-color-secondary">{description}</p>}
        </div>
        {tags.length > 0 && <TagRow tags={tags} />}
      </div>
    </Reveal>
  )
}

export default ProjectCard
