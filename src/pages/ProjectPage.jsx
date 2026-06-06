import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProjectGrid, { allArchiveProjects } from '../components/projects/ProjectGrid'
import Media from '../components/Media'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import usePageTitle from '../hooks/usePageTitle'
import { loadProjectContent, getDefaultProjectContent } from '../data/projectContentLoader'

function ProjectPage() {
  const { id } = useParams()
  const project = allArchiveProjects.find((p) => p.id === id)
  const [content, setContent] = useState(getDefaultProjectContent(id))
  usePageTitle(project ? content.title || project.title : 'Project not found')

  useEffect(() => {
    async function loadContent() {
      const loadedContent = await loadProjectContent(id)
      setContent(loadedContent)
    }
    loadContent()
  }, [id])

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <p className="type-body text-color-secondary">Project not found</p>
      </div>
    )
  }

  const title = content.title || project.title

  return (
    <>
      {/* Top Section */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-page mx-auto">
          {/* Row 1: Title + Description */}
          <div className="mb-8">
            <ScrollAnimation>
              <h1 className="type-display text-color-primary mt-10 mb-2">{title}</h1>
            </ScrollAnimation>
            <ScrollAnimation>
              <p className="type-body-lg text-color-secondary max-w-3xl">
                {content.description || project.description}
              </p>
            </ScrollAnimation>
          </div>

          {/* Row 2: Client, When, Details */}
          <div className="flex flex-col md:flex-row gap-10 mb-8">
            <ScrollAnimation>
              {content.client && (
                <div>
                  <p className="type-body-lg text-color-primary mb-2">Client</p>
                  <p className="type-body font-medium text-color-secondary">{content.client}</p>
                </div>
              )}
            </ScrollAnimation>
            <ScrollAnimation>
              {content.when && (
                <div>
                  <p className="type-body-lg text-color-primary mb-2">When</p>
                  <p className="type-body font-medium text-color-secondary">{content.when}</p>
                </div>
              )}
            </ScrollAnimation>
            <ScrollAnimation>
              {content.details && (
                <div>
                  <p className="type-body-lg text-color-primary mb-2">Details</p>
                  <p className="type-body font-medium text-color-secondary">{content.details}</p>
                </div>
              )}
            </ScrollAnimation>
          </div>

          {/* Row 3: Responsibilities */}
          <ScrollAnimation>
            {content.responsibilities && content.responsibilities.length > 0 && (
              <div className="mb-12">
                <p className="type-body-lg text-color-primary mb-2">Responsibilities</p>
                <p className="type-body font-medium text-color-secondary">
                  {content.responsibilities.join(', ')}
                </p>
              </div>
            )}
          </ScrollAnimation>

          {/* Hero image */}
          {content.heroImage ? (
            <Media src={content.heroImage} alt={title} aspect="auto" rounded="rounded-2xl" priority className="mb-20" />
          ) : (
            <div className="w-full aspect-video rounded-2xl mb-20 bg-surface-color-tertiary flex items-center justify-center type-body text-color-secondary">
              Project hero image
            </div>
          )}
        </div>
      </section>

      {/* Second Section - Challenge, Solution, and Content */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-page mx-auto">
          {content.challenge && (
            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
              <ScrollAnimation>
                <h2 className="type-subtitle text-color-primary mb-4">The Challenge</h2>
              </ScrollAnimation>
              <ScrollAnimation>
                <p className="type-body text-color-secondary max-w-3xl">{content.challenge}</p>
              </ScrollAnimation>
            </div>
          )}

          {content.solution && (
            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
              <ScrollAnimation>
                <h2 className="type-subtitle text-color-primary mb-4">The Solution</h2>
              </ScrollAnimation>
              <ScrollAnimation>
                <p className="type-body text-color-secondary max-w-3xl">{content.solution}</p>
              </ScrollAnimation>
            </div>
          )}

          {/* Ordered content blocks (image / text) */}
          {content.content && content.content.length > 0 && (
            <div className="space-y-6">
              {content.content.map((block, index) => {
                if (block.type === 'image') {
                  return (
                    <Media
                      key={index}
                      src={block.src}
                      alt={`${title} — image ${index + 1}`}
                      aspect="auto"
                      rounded="rounded-2xl"
                    />
                  )
                }
                if (block.type === 'text') {
                  return (
                    <ScrollAnimation key={index}>
                      <div className="max-w-3xl">
                        <p className="type-body text-color-secondary">{block.content}</p>
                      </div>
                    </ScrollAnimation>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* App screens */}
          {content.appScreens && content.appScreens.length > 0 && (
            <div className="mt-20">
              <ScrollAnimation>
                <h2 className="type-subtitle text-color-primary mb-8">App Screens</h2>
              </ScrollAnimation>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {content.appScreens.map((screen, index) => (
                  <Media
                    key={index}
                    src={screen.src}
                    alt={`${title} — app screen ${index + 1}`}
                    aspect="auto"
                    rounded="rounded-2xl"
                    className="max-w-[492px] w-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Projects */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-page mx-auto">
          <ScrollAnimation>
            <h2 className="type-display font-normal text-color-primary mb-12">More Projects</h2>
          </ScrollAnimation>
          <ProjectGrid excludeProjectId={id} />
        </div>
      </section>
    </>
  )
}

export default ProjectPage
