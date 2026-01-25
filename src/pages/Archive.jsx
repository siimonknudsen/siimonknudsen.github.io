import { allProjects } from '../components/projects/ProjectGrid'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import ProjectCard from '../components/projects/ProjectCard'

// Additional archive projects
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

