import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProjectGrid, { allArchiveProjects } from '../components/projects/ProjectGrid'
import Media from '../components/Media'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import usePageTitle from '../hooks/usePageTitle'
import { loadProjectContent, getDefaultProjectContent } from '../data/projectContentLoader'
import styles from './ProjectPage.module.css'

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
      <div className={styles.notFound}>
        <p className="type-body text-color-secondary">Project not found</p>
      </div>
    )
  }

  const title = content.title || project.title

  return (
    <>
      {/* Top Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Row 1: Title + Description */}
          <div className={styles.titleRow}>
            <ScrollAnimation>
              <h1 className={`type-display text-color-primary ${styles.title}`}>{title}</h1>
            </ScrollAnimation>
            <ScrollAnimation>
              <p className={`type-body-lg text-color-secondary ${styles.description}`}>
                {content.description || project.description}
              </p>
            </ScrollAnimation>
          </div>

          {/* Row 2: Client, When, Details */}
          <div className={styles.metaRow}>
            <ScrollAnimation>
              {content.client && (
                <div>
                  <p className={`type-body-lg text-color-primary ${styles.metaLabel}`}>Client</p>
                  <p className={`type-body text-color-secondary ${styles.metaValue}`}>{content.client}</p>
                </div>
              )}
            </ScrollAnimation>
            <ScrollAnimation>
              {content.when && (
                <div>
                  <p className={`type-body-lg text-color-primary ${styles.metaLabel}`}>When</p>
                  <p className={`type-body text-color-secondary ${styles.metaValue}`}>{content.when}</p>
                </div>
              )}
            </ScrollAnimation>
            <ScrollAnimation>
              {content.details && (
                <div>
                  <p className={`type-body-lg text-color-primary ${styles.metaLabel}`}>Details</p>
                  <p className={`type-body text-color-secondary ${styles.metaValue}`}>{content.details}</p>
                </div>
              )}
            </ScrollAnimation>
          </div>

          {/* Row 3: Responsibilities */}
          <ScrollAnimation>
            {content.responsibilities && content.responsibilities.length > 0 && (
              <div className={styles.responsibilities}>
                <p className={`type-body-lg text-color-primary ${styles.metaLabel}`}>Responsibilities</p>
                <p className={`type-body text-color-secondary ${styles.metaValue}`}>
                  {content.responsibilities.join(', ')}
                </p>
              </div>
            )}
          </ScrollAnimation>

          {/* Hero image */}
          {content.heroImage ? (
            <Media src={content.heroImage} alt={title} aspect="auto" rounded="rounded-2xl" priority className={styles.hero} />
          ) : (
            <div className={`bg-surface-color-tertiary type-body text-color-secondary ${styles.heroPlaceholder}`}>
              Project hero image
            </div>
          )}
        </div>
      </section>

      {/* Second Section - Challenge, Solution, and Content */}
      <section className={styles.section}>
        <div className={styles.container}>
          {content.challenge && (
            <div className={styles.twoCol}>
              <ScrollAnimation>
                <h2 className={`type-subtitle text-color-primary ${styles.colHeading}`}>The Challenge</h2>
              </ScrollAnimation>
              <ScrollAnimation>
                <p className={`type-body text-color-secondary ${styles.prose}`}>{content.challenge}</p>
              </ScrollAnimation>
            </div>
          )}

          {content.solution && (
            <div className={styles.twoCol}>
              <ScrollAnimation>
                <h2 className={`type-subtitle text-color-primary ${styles.colHeading}`}>The Solution</h2>
              </ScrollAnimation>
              <ScrollAnimation>
                <p className={`type-body text-color-secondary ${styles.prose}`}>{content.solution}</p>
              </ScrollAnimation>
            </div>
          )}

          {/* Ordered content blocks (image / text) */}
          {content.content && content.content.length > 0 && (
            <div className={styles.contentBlocks}>
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
                      <div className={styles.textBlock}>
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
            <div className={styles.appScreens}>
              <ScrollAnimation>
                <h2 className={`type-subtitle text-color-primary ${styles.appScreensHeading}`}>App Screens</h2>
              </ScrollAnimation>
              <div className={styles.appScreensGrid}>
                {content.appScreens.map((screen, index) => (
                  <Media
                    key={index}
                    src={screen.src}
                    alt={`${title} — app screen ${index + 1}`}
                    aspect="auto"
                    rounded="rounded-2xl"
                    className={styles.appScreen}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Projects */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollAnimation>
            <h2 className={`type-display text-color-primary ${styles.moreHeading}`}>More Projects</h2>
          </ScrollAnimation>
          <ProjectGrid excludeProjectId={id} />
        </div>
      </section>
    </>
  )
}

export default ProjectPage
