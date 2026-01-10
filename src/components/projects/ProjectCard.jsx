import { Link } from 'react-router-dom'
import ProjectTag from './ProjectTag'
import ScrollAnimation from '../animations/ScrollAnimation'

function ProjectCard({ id, title, description, tags = [] }) {
  return (
    <ScrollAnimation>
      <Link to={`/project/${id}`} className="flex flex-col cursor-pointer">
      {/* Image Container with Glowing Border */}
      <div className="relative w-full aspect-video mb-4 rounded-lg project-card-image-wrapper">
        {/* Image - 16:9 aspect ratio - Grey background */}
        <div className="w-full h-full rounded-lg bg-neutral-700"></div>
      </div>

      {/* Text Content - Header and body together with 4px gap */}
      <div className="flex flex-col gap-1 mb-4">
        <h3 className="text-[18px] font-medium text-text-primary leading-none">
          {title}
        </h3>
        <p className="text-[16px] text-text-secondary font-normal leading-[1.2]">
          {description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <ProjectTag key={index}>
            {tag}
          </ProjectTag>
        ))}
      </div>
      </Link>
    </ScrollAnimation>
  )
}

export default ProjectCard

