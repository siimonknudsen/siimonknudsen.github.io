import ProjectCard from './ProjectCard'
import ScrollAnimation from '../animations/ScrollAnimation'

export const allProjects = [
  {
    id: 'zliide-app',
    title: "Zliide In-Store Ordering App",
    description: "Redesigned an in-store ordering app increasing physical fashion stores monthly store revenue.",
    tags: ["UX Design", "UI Design", "Design System"]
  },
  {
    id: 'apple-home-app',
    title: "Apple Home App",
    description: "Solved several user frictions and added consumption tracking to add awareness of electricty, water and heat consumption.",
    tags: ["UX Design", "UI Design", "Design System"]
  },
  {
    id: 'zliide-website',
    title: "Zliide Website",
    description: "Redesigned the company website, enhancing the user experience and improving engagement and conversion rate.",
    tags: ["UX Design", "UI Design", "Design System", "Frontend Development"]
  },
  {
    id: 'adservice-website',
    title: "Adservice Website",
    description: "Redesigned the company website, enhancing the user experience and improving engagement and conversion rate.",
    tags: ["UX Design", "UI Design", "Design System", "Frontend Development"]
  },
  {
    id: 'leadplatform-website',
    title: "LeadPlatform Website",
    description: "Designed a marketing website for a gamification lead generating concept increasing conversion rate.",
    tags: ["UX Design", "UI Design", "Frontend Development"]
  },
  {
    id: 'zliide-dashboard',
    title: "Zliide Dashboard",
    description: "Designed a dashboard interface providing fashion brand stakeholders with important data statistics.",
    tags: ["UX Design", "UI Design", "Design System"]
  },
]

function ProjectGrid({ excludeProjectId = null }) {
  const projects = excludeProjectId 
    ? allProjects.filter(project => project.id !== excludeProjectId)
    : allProjects

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-12">
      {projects.map((project) => (
        <ScrollAnimation key={project.id}>
          <ProjectCard
            id={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
          />
        </ScrollAnimation>
      ))}
    </div>
  )
}

export default ProjectGrid

