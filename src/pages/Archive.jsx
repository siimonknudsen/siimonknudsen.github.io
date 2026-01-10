import { allProjects } from '../components/projects/ProjectGrid'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import ProjectCard from '../components/projects/ProjectCard'

// Additional archive projects
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

function Archive() {
  return (
    <div className="min-h-screen bg-surface-color-primary text-color-primary">
      <Header />

      {/* Archive Section */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          <ScrollAnimation>
            <h1 className="text-5xl font-medium text-color-primary mb-12">Archive</h1>
          </ScrollAnimation>
          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {allArchiveProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description=""
                tags={[]}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Archive

