import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectTag from './ProjectTag'
import ScrollAnimation from '../animations/ScrollAnimation'

// Supported image formats to try (in order of preference)
const IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp']

function ProjectCard({ id, title, description, tags = [] }) {
  const [formatIndex, setFormatIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [allFailed, setAllFailed] = useState(false)

  // Construct hero image path from project ID
  const heroBasePath = `/projects/${id}/images/hero`
  const currentSrc = `${heroBasePath}${IMAGE_FORMATS[formatIndex]}`

  const handleImageError = () => {
    if (formatIndex < IMAGE_FORMATS.length - 1) {
      setFormatIndex(formatIndex + 1)
    } else {
      setAllFailed(true)
    }
  }

  return (
    <ScrollAnimation>
      <Link to={`/project/${id}`} className="group flex flex-col cursor-pointer">
      {/* Image Container with Glowing Border */}
      <div className="relative w-full aspect-video mb-4 project-card-image-wrapper overflow-hidden rounded">
        {/* Image - 16:9 aspect ratio */}
        <div className="w-full h-full bg-neutral-700 rounded">
          {!allFailed && (
            <img 
              src={currentSrc}
              alt={title}
              className={`w-full h-full object-cover rounded transition-all duration-200 ease-out group-hover:brightness-[0.8] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
            />
          )}
        </div>
      </div>

      {/* Text Content - Header and body together with 4px gap */}
      <div className="flex flex-col gap-1 mb-4">
        <h3 className="text-[18px] font-medium text-color-primary leading-none">
          {title}
        </h3>
        <p className="text-[16px] text-color-secondary font-normal leading-[1.2]">
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

