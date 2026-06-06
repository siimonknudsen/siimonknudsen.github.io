import { Link } from 'react-router-dom'
import ProjectTag from './ProjectTag'
import Reveal from '../motion/Reveal'
import Media from '../Media'
import styles from './ProjectCard.module.css'

// Cursor-tracking spotlight: write pointer position into CSS vars on the card.
function trackPointer(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function ProjectCard({ id, title, description, tags = [], impact, featured = false }) {
  return (
    <Reveal preset="fade-up" className={styles.revealWrap}>
      <Link
        to={`/project/${id}`}
        onMouseMove={trackPointer}
        className={`group glass-panel ${styles.card} ${featured ? styles.featured : ''}`}
      >
        {/* Cursor spotlight (specular sheen) */}
        <span aria-hidden="true" className={styles.spotlight} />

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
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag, index) => (
                <ProjectTag key={index}>{tag}</ProjectTag>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Reveal>
  )
}

export default ProjectCard
