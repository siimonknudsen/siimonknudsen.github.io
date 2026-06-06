import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import TagRow from './TagRow'
import Media from '../Media'
import { ZliideLogo, AdtractionLogo, LenusLogo } from '../home/WorkedAtLogos'
import styles from './ProjectGrid.module.css'

// Which company each project was done at → its logo. (Best-effort mapping —
// Zliide projects → Zliide; Adservice-era work + campaigns → Adtraction.
// apple-home-app is a concept piece, so it carries no company logo.)
const COMPANY_LOGO = { zliide: ZliideLogo, adtraction: AdtractionLogo, lenus: LenusLogo }
const COMPANY_NAME = { zliide: 'Zliide', adtraction: 'Adtraction', lenus: 'Lenus' }
// Optical scale so the differently-proportioned logos read at a balanced size
// (matches the Worked-at row / tooltips).
const COMPANY_SCALE = { zliide: 0.7, adtraction: 0.9, lenus: 1 }
const PROJECT_COMPANY = {
  'zliide-app': 'zliide',
  'zliide-website': 'zliide',
  'zliide-dashboard': 'zliide',
  'apple-home-app': null,
  'adservice-website': 'adtraction',
  'leadplatform-website': 'adtraction',
  'ekstrabladet-comparison': 'adtraction',
  'telia-campaign': 'adtraction',
  'talkmore-campaign': 'adtraction',
  'benergy-campaign': 'adtraction',
  'aarstiderne-campaign': 'adtraction',
}

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

  // Stacking depth cue: as each card is covered by the next, dim it so the
  // front card always reads as the lightest/foremost. Scroll-driven (rAF).
  const cardRefs = useRef([])
  useEffect(() => {
    if (variant !== 'stack') return
    const cards = cardRefs.current.filter(Boolean)
    if (!cards.length) return
    let raf = 0
    const update = () => {
      raf = 0
      // ── READ phase (no writes between reads → no layout thrash) ──
      // `top` comes from getBoundingClientRect (its top edge is FIXED under our
      // scale because transform-origin is top-center), but height comes from
      // offsetHeight — the LAYOUT height, which ignores the transform. Using the
      // scaled rect height here would feed the scale back into its own input and
      // make the animation jitter. offsetHeight breaks that loop.
      const tops = cards.map((c) => c.getBoundingClientRect().top)
      const heights = cards.map((c) => c.offsetHeight)
      const n = cards.length
      const MAX_RECEDE = 0.16 // how much the FIRST card shrinks when fully covered
      const vals = cards.map((_, i) => {
        if (i === n - 1) return [0, 1] // foremost card: full size, undimmed
        const h = heights[i] || 1
        // How far the next card has risen over this one (0 → 1).
        const prog = Math.max(0, Math.min(1, (tops[i] + h - tops[i + 1]) / h))
        // Graduated depth: every card STARTS full width, but the first card
        // recedes the most and each later card a little less — so when stacked
        // they read as progressively larger toward the front (true depth).
        const recede = MAX_RECEDE * (1 - i / (n - 1))
        return [prog * 0.6, 1 - prog * recede]
      })
      // ── WRITE phase ──
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.setProperty('--dim', vals[i][0].toFixed(3))
        cards[i].style.setProperty('--scale', vals[i][1].toFixed(4))
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [variant, projects.length])

  // Full-width cards that stack on top of each other as you scroll (sticky).
  if (variant === 'stack') {
    return (
      <div className={styles.stack}>
        {projects.map((project, index) => (
          <article
            key={project.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className={styles.stackCard}
            // Every card STARTS at full available width; the only size change is
            // the scroll-driven recede (it shrinks 5% as the next card covers it).
            style={{ '--i': index }}
          >
            <Link to={`/project/${project.id}`} className={styles.stackLink}>
              <div className={styles.stackMedia}>
                <Media
                  src={`/projects/${project.id}/images/hero`}
                  alt={project.title}
                  aspect="fill"
                  rounded="none"
                />
              </div>
              <div className={styles.stackScrim} aria-hidden="true" />
              <div className={styles.stackDim} aria-hidden="true" />
              {(() => {
                const key = PROJECT_COMPANY[project.id]
                const Logo = key && COMPANY_LOGO[key]
                return Logo ? (
                  <span
                    className={styles.stackLogo}
                    role="img"
                    aria-label={`${COMPANY_NAME[key]} project`}
                    style={{ '--logo-scale': COMPANY_SCALE[key] ?? 1 }}
                  >
                    <Logo />
                  </span>
                ) : null
              })()}
              <div className={styles.stackInfo}>
                {project.impact && (
                  <span className={styles.stackImpact}>
                    <strong>{project.impact.value}</strong> {project.impact.label}
                  </span>
                )}
                <h3 className={`type-display-sm ${styles.stackTitle}`}>
                  {project.title}
                </h3>
                <p className={`type-body-lg ${styles.stackDesc}`}>
                  {project.description}
                </p>
                {project.tags?.length > 0 && (
                  <TagRow
                    tags={project.tags}
                    variant="stack"
                    containerClassName={styles.stackTags}
                    chipClassName={styles.stackTag}
                  />
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    )
  }

  // Plain even 3-column grid — every project rendered as an equal ProjectCard
  // (no oversized featured split). Reuses the bento .grid/.cell + .fx-stagger.
  if (variant === 'grid') {
    return (
      <div className={`fx-stagger ${styles.grid}`}>
        {projects.map((project, index) => (
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

