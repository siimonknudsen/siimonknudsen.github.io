import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import TagRow from './TagRow'
import Reveal from '../motion/Reveal'
import Media from '../Media'
import useSpotlight from '../../hooks/useSpotlight'
import styles from './ProjectCard.module.css'

// Motion-wrapped <Link>, created ONCE at module scope (never during render) so
// the glass card link can BE the reveal element — keeps its backdrop-filter
// frost alive through the reveal instead of a wrapper killing it.
const MotionLink = m.create(Link)

function ProjectCard({ id, title, description, tags = [], impact, delay, noMedia = false }) {
  const onSpotlight = useSpotlight()
  return (
    // The glass <Link> IS the reveal (animates its own opacity/transform) so its
    // backdrop-filter frost stays alive through the reveal — a wrapper would
    // isolate & kill it. revealWrap (height:100%) folds onto it for grid stretch.
    <Reveal
      as={MotionLink}
      to={`/project/${id}`}
      onMouseMove={onSpotlight}
      preset="fade-up"
      delay={delay}
      className={`group glass-panel ${styles.card} ${styles.revealWrap}`}
    >
      {/* Cursor spotlight (specular sheen) — shared global utility */}
      <span aria-hidden="true" className="fx-spotlight" />

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
