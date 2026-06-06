import { Link } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import Media from '../Media'
import styles from './ProjectGrid.module.css'

// `impact` (optional): a one-line outcome shown as a chip on the card.
// Scaffolded — fill in real numbers per project as they're confirmed.
export const allProjects = [
  {
    id: 'zliide-app',
    title: "Zliide In-Store Ordering App",
    description: "Redesigned an in-store ordering app increasing physical fashion stores monthly store revenue.",
    tags: ["UX Design", "UI Design", "Design System"],
    impact: { value: "+6%", label: "monthly store revenue" }
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

// Additional archive-only projects (campaigns) — shown on the Archive page and
// in the nav's Archive dropdown.
export const archiveProjects = [
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

export const allArchiveProjects = [...allProjects, ...archiveProjects]

function ProjectGrid({ excludeProjectId = null, variant = 'bento' }) {
  const projects = excludeProjectId
    ? allProjects.filter((project) => project.id !== excludeProjectId)
    : allProjects

  // Full-width cards that stack on top of each other as you scroll (sticky),
  // each filling ~90vh. Used on the home page.
  if (variant === 'stack') {
    return (
      <div className={styles.stack}>
        {projects.map((project, index) => (
          <article
            key={project.id}
            className={styles.stackCard}
            style={{ '--i': index }}
          >
            <Link to={`/project/${project.id}`} className={styles.stackLink}>
              <div className={styles.stackMedia}>
                <Media
                  src={`/projects/${project.id}/images/hero`}
                  alt={project.title}
                  aspect="aspect-video"
                  rounded="none"
                />
              </div>
              <div className={styles.stackScrim} aria-hidden="true" />
              <div className={styles.stackInfo}>
                {project.impact && (
                  <span className={styles.stackImpact}>
                    <strong>{project.impact.value}</strong> {project.impact.label}
                  </span>
                )}
                <h3 className={`type-heading-sm ${styles.stackTitle}`}>
                  {project.title}
                </h3>
                <p className={`type-body-lg ${styles.stackDesc}`}>
                  {project.description}
                </p>
                {project.tags?.length > 0 && (
                  <div className={styles.stackTags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.stackTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className={styles.stackCta}>View project →</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    )
  }

  const [featured, ...rest] = projects

  return (
    <div className={styles.wrap}>
      {featured && (
        <ProjectCard
          featured
          id={featured.id}
          title={featured.title}
          description={featured.description}
          tags={featured.tags}
          impact={featured.impact}
        />
      )}
      {rest.length > 0 && (
        <div className={`fx-stagger ${styles.grid}`}>
          {rest.map((project, index) => (
            <div
              key={project.id}
              className={styles.cell}
              style={{ '--i': index }}
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                impact={project.impact}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectGrid

