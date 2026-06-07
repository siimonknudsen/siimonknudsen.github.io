import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProjectGrid, { allArchiveProjects } from '../components/projects/ProjectGrid'
import Media from '../components/Media'
import ScrollProgress from '../components/ScrollProgress'
import { Reveal, Stagger } from '../components/motion'
import OutcomeGrid from '../components/case/OutcomeGrid'
import ProcessStep from '../components/case/ProcessStep'
import usePageTitle from '../hooks/usePageTitle'
import { loadProjectContent, getDefaultProjectContent } from '../data/projectContentLoader'
import styles from './ProjectPage.module.css'

function ProjectPage() {
  const { id } = useParams()
  const project = allArchiveProjects.find((p) => p.id === id)
  const [content, setContent] = useState(getDefaultProjectContent())
  const [loadedId, setLoadedId] = useState(id)
  usePageTitle(project ? content.title || project.title : 'Project not found')

  // Reset to default the instant the id changes (render-phase state adjustment —
  // React's recommended way to reset state on a prop change). This avoids
  // flashing the previous project's body content before the new fetch resolves,
  // without the cascading render of a setState-in-effect.
  if (loadedId !== id) {
    setLoadedId(id)
    setContent(getDefaultProjectContent())
  }

  useEffect(() => {
    // Guard against a stale resolve: navigating A→B fires two loads; without
    // this flag the slower (A) response could overwrite B.
    let active = true
    loadProjectContent(id).then((loaded) => {
      if (active) setContent(loaded)
    })
    return () => {
      active = false
    }
  }, [id])

  if (!project) {
    return (
      <div className={styles.notFound}>
        <p className="type-body text-color-secondary">Project not found</p>
      </div>
    )
  }

  const title = content.title || project.title

  // Outcome meta (headlineOutcome) temporarily removed from the rail — see meta grid below.

  const hasProcess = content.process && content.process.length > 0
  const hasOutcomes = content.outcomes && content.outcomes.length > 0

  // Section anchors for the rail's little table of contents — only show the
  // sections that actually have content.
  const sections = [
    content.problem || content.challenge ? { id: 'problem', label: 'Problem' } : null,
    hasProcess || content.solution || (content.content && content.content.length > 0)
      ? { id: 'process', label: 'Process' }
      : null,
    hasOutcomes ? { id: 'impact', label: 'Impact' } : null,
    content.appScreens && content.appScreens.length > 0
      ? { id: 'screens', label: 'Screens' }
      : null,
  ].filter(Boolean)

  return (
    <>
      <ScrollProgress />

      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.titleRow}>
            <Reveal preset="fade-up">
              <h1 className={`type-display text-color-primary ${styles.title}`}>{title}</h1>
            </Reveal>
            <Reveal preset="fade-up" delay={60}>
              <p className={`type-body-lg text-color-secondary ${styles.description}`}>
                {content.description || project.description}
              </p>
            </Reveal>
          </div>

          {content.heroImage ? (
            <Reveal preset="scale-in">
              <Media
                src={content.heroImage}
                alt={title}
                aspect="auto"
                rounded="rounded-2xl"
                priority
                className={styles.hero}
              />
            </Reveal>
          ) : (
            <div
              className={`bg-surface-color-tertiary type-body text-color-secondary ${styles.heroPlaceholder}`}
            >
              Project hero image
            </div>
          )}
        </div>
      </section>

      {/* Body: sticky meta rail + scrolling content */}
      <section className={styles.bodySection}>
        <div className={styles.container}>
          <div className={styles.layout}>
            {/* Meta rail (sticky on lg) */}
            <aside className={styles.rail}>
              <div className={styles.railInner}>
                <Reveal preset="fade-up" as="div" className={styles.railMeta}>
                  <RailItem label="Role" value={content.role} />
                  <RailItem label="Client" value={content.client} />
                  <RailItem
                    label="Team"
                    value={content.team || (content.responsibilities && content.responsibilities.join(', '))}
                  />
                  <RailItem label="Timeline" value={content.timeline || content.when} />

                  {/* Outcome meta item temporarily removed — only Role / Client /
                      Team / Timeline render in the 4-column meta grid for now. */}

                  {sections.length > 0 && (
                    <nav className={styles.railNav} aria-label="Case study sections">
                      {sections.map((s) => (
                        <a key={s.id} href={`#${s.id}`} className={`type-body-sm ${styles.railLink}`}>
                          {s.label}
                        </a>
                      ))}
                    </nav>
                  )}
                </Reveal>
              </div>
            </aside>

            {/* Scrolling content */}
            <div className={styles.content}>
              {/* Problem */}
              {(content.problem || content.challenge) && (
                <div id="problem" className={styles.block}>
                  <Reveal preset="fade-up">
                    <p className={`type-overline text-accent ${styles.kicker}`}>Problem</p>
                  </Reveal>
                  <Reveal preset="fade-up" delay={60}>
                    <p className={`type-body-lg text-color-primary ${styles.lede} ${styles.problemLede}`}>
                      {content.problem || content.challenge}
                    </p>
                  </Reveal>
                  {/* If we have a dedicated problem, the legacy challenge can still
                      add supporting context below it. */}
                  {content.problem && content.challenge && (
                    <Reveal preset="fade-up" delay={120}>
                      <p className={`type-body text-color-secondary ${styles.prose}`}>
                        {content.challenge}
                      </p>
                    </Reveal>
                  )}
                </div>
              )}

              {/* Process */}
              {(hasProcess || content.solution || (content.content && content.content.length > 0)) && (
                <div id="process" className={styles.block}>
                  <Reveal preset="fade-up">
                    <p className={`type-overline text-accent ${styles.kicker}`}>Process</p>
                  </Reveal>

                  {content.solution && (
                    <Reveal preset="fade-up" delay={60}>
                      <p className={`type-body-lg text-color-primary ${styles.lede}`}>
                        {content.solution}
                      </p>
                    </Reveal>
                  )}

                  {hasProcess && (
                    <Stagger className={styles.steps}>
                      {content.process.map((step, i) => (
                        <Reveal key={i} preset="fade-up">
                          <ProcessStep index={i} step={step.step} body={step.body} image={step.image} />
                        </Reveal>
                      ))}
                    </Stagger>
                  )}

                  {/* Legacy ordered content blocks (image / text / bts) */}
                  {content.content && content.content.length > 0 && (
                    <div className={styles.contentBlocks}>
                      {content.content.map((block, index) => {
                        if (block.type === 'image') {
                          return (
                            <Reveal key={index} preset="scale-in" className={styles.breakout}>
                              <Media
                                src={block.src}
                                alt={`${title} — image ${index + 1}`}
                                aspect="auto"
                                rounded="rounded-2xl"
                                className={styles.breakoutMedia}
                              />
                            </Reveal>
                          )
                        }
                        if (block.type === 'text') {
                          return (
                            <Reveal key={index} preset="fade-up">
                              <div className={styles.textBlock}>
                                <p className="type-body text-color-secondary">{block.content}</p>
                              </div>
                            </Reveal>
                          )
                        }
                        if (block.type === 'bts') {
                          return (
                            <BehindTheScenes key={index} title={block.title} items={block.items} />
                          )
                        }
                        return null
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Impact */}
              {hasOutcomes && (
                <div id="impact" className={styles.block}>
                  <Reveal preset="fade-up">
                    <p className={`type-overline text-accent ${styles.kicker}`}>Impact</p>
                  </Reveal>
                  <OutcomeGrid outcomes={content.outcomes} />
                </div>
              )}

              {/* App screens */}
              {content.appScreens && content.appScreens.length > 0 && (
                <div id="screens" className={styles.block}>
                  <Reveal preset="fade-up">
                    <p className={`type-overline text-accent ${styles.kicker}`}>Screens</p>
                  </Reveal>
                  <Stagger className={styles.appScreensGrid}>
                    {content.appScreens.map((screen, index) => (
                      <Reveal key={index} preset="fade-up" className={styles.appScreenReveal}>
                        <Media
                          src={screen.src}
                          alt={`${title} — app screen ${index + 1}`}
                          aspect="auto"
                          rounded="rounded-2xl"
                          className={styles.appScreen}
                        />
                      </Reveal>
                    ))}
                  </Stagger>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className={styles.relatedSection}>
        <div className={styles.container}>
          <Reveal preset="fade-up">
            <h2 className={`type-display text-color-primary ${styles.moreHeading}`}>More Projects</h2>
          </Reveal>
          <ProjectGrid excludeProjectId={id} variant="grid" />
        </div>
      </section>
    </>
  )
}

/** A single label/value row in the meta rail. Renders nothing when empty. */
function RailItem({ label, value }) {
  if (!value) return null
  return (
    <div className={styles.railRow}>
      <p className={`type-overline text-color-tertiary ${styles.railKey}`}>{label}</p>
      <p className={`type-body-sm text-color-primary ${styles.railVal}`}>{value}</p>
    </div>
  )
}

/** Behind-the-scenes — a lighter, captioned gallery for sketches / iterations. */
function BehindTheScenes({ title, items }) {
  if (!items || items.length === 0) return null
  return (
    <div className={styles.bts}>
      <Reveal preset="fade-up">
        <p className={`type-label text-color-tertiary ${styles.btsHeading}`}>
          {title || 'Behind the scenes'}
        </p>
      </Reveal>
      <Stagger className={styles.btsGrid}>
        {items.map((item, i) => (
          <Reveal key={i} preset="fade-up" className={styles.btsItem}>
            <Media
              src={item.src}
              video={item.video}
              alt={item.caption || `Behind the scenes ${i + 1}`}
              aspect={item.aspect || 'aspect-square'}
              rounded="rounded-xl"
            />
            {item.caption && (
              <p className={`type-caption text-color-tertiary ${styles.btsCaption}`}>
                {item.caption}
              </p>
            )}
          </Reveal>
        ))}
      </Stagger>
    </div>
  )
}

export default ProjectPage
