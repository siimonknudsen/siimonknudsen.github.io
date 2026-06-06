import { Link } from 'react-router-dom'
import TagRow from './TagRow'
import Reveal from '../motion/Reveal'
import Media from '../Media'
import useSpotlight from '../../hooks/useSpotlight'
import styles from './ProjectCard.module.css'

function ProjectCard({ id, title, description, tags = [], impact, featured = false }) {
  const onSpotlight = useSpotlight()
  return (
    <Reveal preset="fade-up" className={styles.revealWrap}>
      <Link
        to={`/project/${id}`}
        onMouseMove={onSpotlight}
        className={`group glass-panel ${styles.card} ${featured ? styles.featured : ''}`}
      >
        {/* Cursor spotlight (specular sheen) — shared global utility */}
        <span aria-hidden="true" className="fx-spotlight" />

        {/* Image frame — clips the inner zoom on hover */}
        <div className={styles.frame}>
          <div className={styles.zoom}>
            <Media src={`/projects/${id}/images/hero`} alt={title} aspect="aspect-video" rounded="rounded-xl" />
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
      </Link>
    </Reveal>
  )
}

export default ProjectCard
