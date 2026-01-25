import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProjectGrid, { allProjects } from '../components/projects/ProjectGrid'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import { loadProjectContent, getDefaultProjectContent } from '../data/projectContentLoader'

// Supported image formats to try (in order of preference)
const IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp']

// Component that tries multiple image formats and hides if none exist
function ContentImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [formatIndex, setFormatIndex] = useState(0)
  const [allFailed, setAllFailed] = useState(false)

  // Remove any existing extension and try formats in order
  const baseSrc = src.replace(/\.(jpg|jpeg|png|webp)$/i, '')
  const currentSrc = `${baseSrc}${IMAGE_FORMATS[formatIndex]}`

  const handleError = () => {
    if (formatIndex < IMAGE_FORMATS.length - 1) {
      setFormatIndex(formatIndex + 1)
    } else {
      setAllFailed(true)
    }
  }

  if (allFailed) return null

  return (
    <ScrollAnimation>
      <div className={`w-full overflow-hidden ${!loaded ? 'hidden' : ''}`}>
        <img 
          src={currentSrc} 
          alt={alt}
          className="w-full h-full object-cover rounded"
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      </div>
    </ScrollAnimation>
  )
}

// Hero image component with format fallback
function HeroImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [formatIndex, setFormatIndex] = useState(0)
  const [allFailed, setAllFailed] = useState(false)

  const baseSrc = src.replace(/\.(jpg|jpeg|png|webp)$/i, '')
  const currentSrc = `${baseSrc}${IMAGE_FORMATS[formatIndex]}`

  const handleError = () => {
    if (formatIndex < IMAGE_FORMATS.length - 1) {
      setFormatIndex(formatIndex + 1)
    } else {
      setAllFailed(true)
    }
  }

  return (
    <div className="w-full overflow-hidden mb-20">
      {!allFailed && (
        <img 
          src={currentSrc} 
          alt={alt}
          className={`w-full h-full object-cover rounded ${!loaded ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      )}
      {allFailed && (
        <div className="w-full h-full flex items-center justify-center text-color-secondary text-lg">
          Project Hero Image Placeholder
        </div>
      )}
    </div>
  )
}

// App screen image component with format fallback
function AppScreenImage({ src, alt, onLoadSuccess }) {
  const [loaded, setLoaded] = useState(false)
  const [formatIndex, setFormatIndex] = useState(0)
  const [allFailed, setAllFailed] = useState(false)

  const baseSrc = src.replace(/\.(jpg|jpeg|png|webp)$/i, '')
  const currentSrc = `${baseSrc}${IMAGE_FORMATS[formatIndex]}`

  const handleError = () => {
    if (formatIndex < IMAGE_FORMATS.length - 1) {
      setFormatIndex(formatIndex + 1)
    } else {
      setAllFailed(true)
    }
  }

  const handleLoad = () => {
    setLoaded(true)
    if (onLoadSuccess) onLoadSuccess()
  }

  if (allFailed) return null

  return (
    <div className={`flex justify-center ${!loaded ? 'hidden' : ''}`}>
      <img 
        src={currentSrc} 
        alt={alt}
        className="max-w-[492px] w-full h-auto rounded"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}

// App Screens Section - displays a grid of app screen images
function AppScreensSection({ appScreens, projectTitle }) {
  const [hasAnyScreens, setHasAnyScreens] = useState(false)

  if (!appScreens || appScreens.length === 0) return null

  return (
    <div className={`mt-20 ${!hasAnyScreens ? 'hidden' : ''}`}>
      <ScrollAnimation>
        <h2 className="text-[18px] font-medium text-color-primary mb-8">App Screens</h2>
      </ScrollAnimation>
      <ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {appScreens.map((screen, index) => (
            <AppScreenImage 
              key={index}
              src={screen.src} 
              alt={`${projectTitle} - App Screen ${index + 1}`}
              onLoadSuccess={() => setHasAnyScreens(true)}
            />
          ))}
        </div>
      </ScrollAnimation>
    </div>
  )
}

// Archive projects (same as in Archive.jsx)
const archiveProjects = [
  {
    id: 'adservice-dashboard',
    title: "Adservice Dashboard",
    description: "Designed interfaces for affiliate advertisers, publishers and staff at the Affiliate Network Adservice",
    tags: ["UX Design", "UI Design", "Design System"]
  },
  {
    id: 'ekstrabladet-comparison',
    title: "Ekstra Bladet Comparison Website",
    description: "Designed the comparison website and campaign material for Ekstra Bladet at Adservice.",
    tags: ["UX Design", "UI Design", "Design System", "Marketing Design", "Frontend Development"]
  },
  {
    id: 'telia-campaign',
    title: "Telia Campaign",
    description: "Designed the campaign website and campaign material for Telia's affiliate campaign at Adservice.",
    tags: ["UX Design", "UI Design", "Design System", "Marketing Design"]
  },
  {
    id: 'talkmore-campaign',
    title: "Talkmore Campaign",
    description: "Designed the campaign website and campaign material for Talkmore's affiliate campaign at Adservice.",
    tags: ["UX Design", "UI Design", "Design System", "Marketing Design"]
  },
  {
    id: 'jyllandsposten-comparison',
    title: "Jyllands-Posten Comparison Website",
    description: "Designed the comparison website and campaign material for Jyllands-Posten at Adservice.",
    tags: ["UX Design", "UI Design", "Design System", "Marketing Design"]
  },
  {
    id: 'benergy-campaign',
    title: "b.energy Campaign",
    description: "Designed the campaign website and campaign material for b.energy's affiliate campaign at Adservice.",
    tags: ["UX Design", "UI Design", "Design System", "Marketing Design"]
  },
  {
    id: 'aarstiderne-campaign',
    title: "Aarstiderne Campaign",
    description: "Designed the campaign website and campaign material for Aarstiderne affiliate campaign at Adservice.",
    tags: ["UX Design", "UI Design", "Design System", "Marketing Design"]
  },
]

const allArchiveProjects = [...allProjects, ...archiveProjects]

function ProjectPage() {
  const { id } = useParams()
  const project = allArchiveProjects.find(p => p.id === id)
  const [content, setContent] = useState(getDefaultProjectContent(id))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      const loadedContent = await loadProjectContent(id)
      setContent(loadedContent)
      setLoading(false)
    }
    loadContent()
  }, [id])

  if (!project) {
    return (
      <div className="min-h-screen bg-surface-color-primary text-color-primary">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
          <p className="text-color-secondary">Project not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-color-primary text-color-primary">
      <Header />

      {/* Top Section */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          {/* Row 1: Title + Description */}
          <div className="mb-8">
            <ScrollAnimation>
              <h1 className="text-[48px] font-medium text-color-primary mt-10 mb-2">{content.title || project.title}</h1>
            </ScrollAnimation>
            <ScrollAnimation>
              <p className="text-[18px] text-color-secondary font-normal max-w-3xl">
                {content.description || project.description}
              </p>
            </ScrollAnimation>
          </div>

          {/* Row 2: Client, When, Details */}
          <div className="flex flex-col md:flex-row gap-10 mb-8">
          <ScrollAnimation>
            {content.client && (
              <div>
                  <p className="text-[18px] text-color-primary mb-2">Client</p>
                  <p className="text-[16px] text-color-secondary font-medium">{content.client}</p>
                </div>
              )}
            </ScrollAnimation>
            <ScrollAnimation>
            {content.when && (
              <div>
                <p className="text-[18px] text-color-primary mb-2">When</p>
                <p className="text-[16px] text-color-secondary font-medium">{content.when}</p>
              </div>
            )}
            </ScrollAnimation>
            <ScrollAnimation>
            {content.details && (
              <div>
                <p className="text-[18px] text-color-primary mb-2">Details</p>
                <p className="text-[16px] text-color-secondary font-medium">{content.details}</p>
              </div>
            )}
            </ScrollAnimation>
          </div>

          {/* Row 3: Responsibilities */}
          <ScrollAnimation>
          {content.responsibilities && content.responsibilities.length > 0 && (
            <div className="mb-12">
              <p className="text-[18px] text-color-primary mb-2">Responsibilities</p>
              <p className="text-[16px] text-color-secondary font-medium">
                {content.responsibilities.join(', ')}
              </p>
            </div>
          )}
          </ScrollAnimation>

          {/* Large project image */}
          <ScrollAnimation>
            {content.heroImage ? (
              <HeroImage 
                src={content.heroImage} 
                alt={content.title || project.title}
              />
            ) : (
              <div className="w-full overflow-hidden mb-20 flex items-center justify-center text-color-secondary text-lg">
                Project Hero Image Placeholder
              </div>
            )}
          </ScrollAnimation>
        </div>
      </section>

      {/* Second Section - Challenge, Solution, and Content */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          {/* The challenge row */}
          {content.challenge && (
            <div className="mb-12 grid grid-cols-2">
              <ScrollAnimation>
                <h2 className="text-[18px] font-medium text-color-primary mb-4">The Challenge</h2>
              </ScrollAnimation>
              <ScrollAnimation>
                <p className="text-[16px] text-color-secondary font-normal leading-[1.2] max-w-3xl">
                  {content.challenge}
                </p>
              </ScrollAnimation>
            </div>
          )}

          {/* The solution row */}
          {content.solution && (
            <div className="mb-12 grid grid-cols-2">
              <ScrollAnimation>
                <h2 className="text-[18px] font-medium text-color-primary mb-4">The Solution</h2>
              </ScrollAnimation>
              <ScrollAnimation>
                <p className="text-[16px] text-color-secondary font-normal leading-[1.2] max-w-3xl">
                  {content.solution}
                </p>
              </ScrollAnimation>
            </div>
          )}

          {/* Content (Images + text) - ordered blocks */}
          {content.content && content.content.length > 0 && (
            <div className="space-y-6">
              {content.content.map((block, index) => {
                if (block.type === 'image') {
                  return (
                    <ContentImage 
                      key={index}
                      src={block.src} 
                      alt={`${content.title || project.title} - Image ${index + 1}`}
                    />
                  )
                } else if (block.type === 'text') {
                  return (
                    <ScrollAnimation key={index}>
                      <div className="max-w-3xl">
                        <p className="text-[16px] text-color-secondary font-normal leading-[1.2]">
                          {block.content}
                        </p>
                      </div>
                    </ScrollAnimation>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* App Screens Section - for app projects */}
          <AppScreensSection 
            appScreens={content.appScreens} 
            projectTitle={content.title || project.title}
          />
        </div>
      </section>

      {/* Related Projects Section */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          <ScrollAnimation>
            <h2 className="text-5xl text-color-primary mb-12">More Projects</h2>
          </ScrollAnimation>
          <ProjectGrid excludeProjectId={id} />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ProjectPage

