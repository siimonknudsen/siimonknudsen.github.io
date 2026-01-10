import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProjectGrid, { allProjects } from '../components/projects/ProjectGrid'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import { loadProjectContent, getDefaultProjectContent } from '../data/projectContentLoader'

// Archive projects (same as in Archive.jsx)
const archiveProjects = [
  {
    id: 'archive-project-1',
    title: "E-Commerce Platform Redesign",
    description: "Redesigned a comprehensive e-commerce platform focusing on improving conversion rates and user experience.",
    tags: ["UX Design", "UI Design", "Prototyping"]
  },
  {
    id: 'archive-project-2',
    title: "Mobile Banking App",
    description: "Created a secure and intuitive mobile banking application with advanced transaction tracking.",
    tags: ["UX Design", "UI Design", "Design System"]
  },
  {
    id: 'archive-project-3',
    title: "Social Media Dashboard",
    description: "Designed a comprehensive dashboard for managing social media campaigns and analytics.",
    tags: ["UX Design", "UI Design", "Data Visualization"]
  },
  {
    id: 'archive-project-4',
    title: "Fitness Tracking App",
    description: "Developed an all-in-one fitness companion app with workout tracking and progress monitoring.",
    tags: ["UX Design", "UI Design", "User Research"]
  },
  {
    id: 'archive-project-5',
    title: "Travel Booking Platform",
    description: "Designed an intuitive travel booking platform with personalized recommendations.",
    tags: ["UX Design", "UI Design", "Prototyping"]
  },
  {
    id: 'archive-project-6',
    title: "Food Delivery Service",
    description: "Created a comprehensive food delivery platform connecting users with local restaurants.",
    tags: ["UX Design", "UI Design", "Design System"]
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
            {content.client && (
              <div>
                <p className="text-[18px] text-color-primary mb-2">Client</p>
                <p className="text-[16px] text-color-secondary font-medium">{content.client}</p>
              </div>
            )}
            {content.when && (
              <div>
                <p className="text-[18px] text-color-primary mb-2">When</p>
                <p className="text-[16px] text-color-secondary font-medium">{content.when}</p>
              </div>
            )}
            {content.details && (
              <div>
                <p className="text-[18px] text-color-primary mb-2">Details</p>
                <p className="text-[16px] text-color-secondary font-medium">{content.details}</p>
              </div>
            )}
          </div>

          {/* Row 3: Responsibilities */}
          {content.responsibilities && content.responsibilities.length > 0 && (
            <div className="mb-12">
              <p className="text-[18px] text-color-primary mb-2">Responsibilities</p>
              <p className="text-[16px] text-color-secondary font-medium">
                {content.responsibilities.join(', ')}
              </p>
            </div>
          )}

          {/* Large project image */}
          <ScrollAnimation>
            <div className="w-full aspect-video overflow-hidden rounded-lg bg-neutral-700 mb-20">
              {content.heroImage ? (
                <img 
                  src={content.heroImage} 
                  alt={content.title || project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-full h-full flex items-center justify-center text-color-secondary text-lg ${
                  content.heroImage ? 'hidden' : ''
                }`}
              >
                Project Hero Image Placeholder
              </div>
            </div>
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
                    <ScrollAnimation key={index}>
                      <div className="w-full aspect-video overflow-hidden rounded-lg bg-neutral-700">
                        <img 
                          src={block.src} 
                          alt={`${content.title || project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const placeholder = e.target.nextElementSibling;
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full items-center justify-center text-color-secondary text-lg">
                          Project Image {index + 1} Placeholder
                        </div>
                      </div>
                    </ScrollAnimation>
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

