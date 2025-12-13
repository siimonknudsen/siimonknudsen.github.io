import { useParams } from 'react-router-dom'
import ProjectGrid, { allProjects } from '../components/projects/ProjectGrid'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import { projectContent, defaultProjectContent } from '../data/projectContent'

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
  
  // Get project-specific content or use default
  const content = projectContent[id] || defaultProjectContent

  if (!project) {
    return (
      <div className="min-h-screen bg-surface-primary text-text-primary">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
          <p className="text-text-secondary">Project not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-primary text-text-primary">
      <Header />

      {/* Top Section */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          {/* Project Header */}
          <div className="mb-12">
            <ScrollAnimation>
              <h1 className="text-5xl font-medium text-text-primary mb-4">{project.title}</h1>
            </ScrollAnimation>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <ScrollAnimation key={index}>
                  <span 
                    className="text-[13px] py-2 px-2 bg-surface-tertiary text-text-secondary rounded-md font-normal"
                  >
                    {tag}
                  </span>
                </ScrollAnimation>
              ))}
            </div>
            <ScrollAnimation>
              <p className="text-[16px] text-text-secondary font-normal leading-[1.2] max-w-3xl">
                {project.description}
              </p>
            </ScrollAnimation>
          </div>

          {/* Hero Image */}
          <ScrollAnimation>
            <div className="w-full aspect-video overflow-hidden rounded-lg bg-neutral-700">
              {content.images && content.images[0] ? (
                <img 
                  src={content.images[0]} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-full h-full flex items-center justify-center text-text-secondary text-lg ${
                  content.images && content.images[0] ? 'hidden' : ''
                }`}
              >
                Project Hero Image Placeholder
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Second Section - Filler Content */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <ScrollAnimation>
                <h2 className="text-[18px] font-medium text-text-primary mb-4">Overview</h2>
              </ScrollAnimation>
              {content.overview.map((paragraph, index) => (
                <ScrollAnimation key={index}>
                  <p className={`text-[16px] text-text-secondary font-normal leading-[1.2] ${index < content.overview.length - 1 ? 'mb-6' : ''}`}>
                    {paragraph}
                  </p>
                </ScrollAnimation>
              ))}
            </div>
            <div>
              <ScrollAnimation>
                <h2 className="text-[18px] font-medium text-text-primary mb-4">Key Features</h2>
              </ScrollAnimation>
              <ul className="space-y-3">
                {content.keyFeatures.map((feature, index) => (
                  <ScrollAnimation key={index}>
                    <li className="text-[16px] text-text-secondary font-normal leading-[1.2]">
                      • {feature}
                    </li>
                  </ScrollAnimation>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional Images */}
          {content.images && content.images.length > 1 && (
            <div className="space-y-6 mb-12">
              {content.images.slice(1).map((image, index) => (
                <ScrollAnimation key={index}>
                  <div className="w-full aspect-video overflow-hidden rounded-lg bg-neutral-700">
                    <img 
                      src={image} 
                      alt={`${project.title} - Image ${index + 2}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const placeholder = e.target.nextElementSibling;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center text-text-secondary text-lg">
                      Project Image {index + 2} Placeholder
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          )}

          {/* Process Section */}
          <div>
            <ScrollAnimation>
              <h2 className="text-[18px] font-medium text-text-primary mb-6">Design Process</h2>
            </ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.designProcess.map((step, index) => (
                <ScrollAnimation key={index}>
                  <div>
                    <h3 className="text-[16px] font-medium text-text-primary mb-3">{step.title}</h3>
                    <p className="text-[16px] text-text-secondary font-normal leading-[1.2]">
                      {step.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          <ScrollAnimation>
            <h2 className="text-5xl text-text-primary mb-12">More Projects</h2>
          </ScrollAnimation>
          <ProjectGrid excludeProjectId={id} />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ProjectPage

