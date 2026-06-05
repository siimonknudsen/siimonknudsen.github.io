import { Link } from 'react-router-dom'
import ProjectTag from './ProjectTag'
import ScrollAnimation from '../animations/ScrollAnimation'
import Media from '../Media'

function ProjectCard({ id, title, description, tags = [] }) {
  return (
    <ScrollAnimation>
      <Link
        to={`/project/${id}`}
        className="group glass-panel rounded-2xl p-3 flex flex-col transition-transform duration-fast ease-standard hover:-translate-y-1"
      >
        {/* Image frame — clips the inner zoom on hover */}
        <div className="overflow-hidden rounded-xl">
          <div className="transition-transform duration-slow ease-standard group-hover:scale-[1.04]">
            <Media src={`/projects/${id}/images/hero`} alt={title} aspect="aspect-video" rounded="rounded-xl" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1 px-1 pt-4">
          <h3 className="type-subtitle text-color-primary">{title}</h3>
          {description && <p className="type-body text-color-secondary">{description}</p>}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 px-1 pt-4">
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
