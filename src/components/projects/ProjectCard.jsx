import { Link } from 'react-router-dom'
import ProjectTag from './ProjectTag'
import ScrollAnimation from '../animations/ScrollAnimation'
import Media from '../Media'
import styles from './ProjectCard.module.css'

function ProjectCard({ id, title, description, tags = [] }) {
  return (
    <ScrollAnimation>
      <Link
        to={`/project/${id}`}
        className={`group glass-panel ${styles.card}`}
      >
        {/* Image frame — clips the inner zoom on hover */}
        <div className={styles.frame}>
          <div className={styles.zoom}>
            <Media src={`/projects/${id}/images/hero`} alt={title} aspect="aspect-video" rounded="rounded-xl" />
          </div>
        </div>

        {/* Text */}
        <div className={styles.text}>
          <h3 className="type-subtitle text-color-primary">{title}</h3>
          {description && <p className="type-body text-color-secondary">{description}</p>}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <ProjectTag key={index}>{tag}</ProjectTag>
            ))}
          </div>
        )}
      </Link>
    </ScrollAnimation>
  )
}

export default ProjectCard
