import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { allArchiveProjects } from '../data/projects'
import ProjectCard from '../components/projects/ProjectCard'
import Media from '../components/Media'
import ScrollProgress from '../components/ScrollProgress'
import { Reveal, Stagger } from '../components/motion'
import usePageTitle from '../hooks/usePageTitle'
import { loadProjectContent, getDefaultProjectContent } from '../data/projectContentLoader'
import styles from './ProjectPage.module.css'

// How many images run before a process note is dropped in — the alternating
// rhythm of the case-study template.
const IMAGES_PER_NOTE = 2

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
  const details = [
    { label: 'Client', value: content.client },
    { label: 'Timeline', value: content.timeline || content.when },
    { label: 'Industry', value: content.industry },
    { label: 'Role', value: content.role },
  ].filter((d) => d.value)

  const images = (content.content || []).filter((block) => block.type === 'image')
  const notes = content.process || []
  const otherProjects = allArchiveProjects.filter((p) => p.id !== id)

  // Body: images run full width, with a process note landing after every pair.
  // Whichever list is longer keeps going once the other runs out.
  const body = []
  for (let i = 0; i * IMAGES_PER_NOTE < images.length || i < notes.length; i++) {
    images.slice(i * IMAGES_PER_NOTE, (i + 1) * IMAGES_PER_NOTE).forEach((image, j) => {
      body.push({ kind: 'image', src: image.src, key: `image-${i}-${j}` })
    })
    if (notes[i]) body.push({ kind: 'note', note: notes[i], key: `note-${i}` })
  }

  return (
    <>
      <ScrollProgress />

      <article className={styles.page}>
        <div className={styles.container}>
          {/* Title, hero and the project's facts read as one opening unit
              (64px apart), then the narrative blocks space out to 128. */}
          <div className={styles.opening}>
            <header className={styles.intro}>
              <Reveal preset="fade-up">
                <h1 className={styles.title}>{title}</h1>
              </Reveal>
              <Reveal preset="fade-up" delay={60}>
                <p className={styles.lead}>{content.description || project.description}</p>
              </Reveal>
            </header>

            <Reveal preset="fade-up" delay={120} className={styles.frame}>
              <Media
                src={content.heroImage || `/projects/${id}/images/hero`}
                alt={title}
                aspect="fill"
                rounded="none"
                priority
              />
            </Reveal>

            <div className={styles.meta}>
              {details.length > 0 && (
                <Reveal preset="fade-up">
                  <dl className={styles.details}>
                    {details.map((detail) => (
                      <div key={detail.label} className={styles.detail}>
                        <dt className={styles.detailLabel}>{detail.label}</dt>
                        <dd className={styles.detailValue}>{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              )}

              {(content.problem || content.challenge) && (
                <TextBlock label="Problem" body={content.problem || content.challenge} />
              )}

              {content.solution && <TextBlock label="Solution" body={content.solution} />}
            </div>
          </div>

          {body.map((item) =>
            item.kind === 'image' ? (
              <Reveal key={item.key} preset="fade-up" className={styles.plate}>
                <Media src={item.src} alt={title} aspect="auto" rounded="none" />
              </Reveal>
            ) : (
              <TextBlock key={item.key} label={item.note.step} body={item.note.body} />
            ),
          )}

          {content.appScreens && content.appScreens.length > 0 && (
            <Stagger className={styles.screens}>
              {content.appScreens.map((screen, index) => (
                <Reveal key={index} preset="fade-up">
                  <Media
                    src={screen.src}
                    alt={`${title} — app screen ${index + 1}`}
                    aspect="auto"
                    rounded="none"
                    className={styles.screen}
                  />
                </Reveal>
              ))}
            </Stagger>
          )}

          <div className={styles.rule} />

          <section className={styles.related}>
            <h2 className={styles.relatedHeading}>Projects</h2>
            <div className={styles.relatedGrid}>
              {otherProjects.map((other, index) => (
                <ProjectCard
                  key={other.id}
                  id={other.id}
                  title={other.title}
                  description={other.description}
                  tags={other.tags}
                  delay={(index % 2) * 80}
                  noMedia={other.noMedia}
                />
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  )
}

/**
 * A labelled block of prose — quiet label above, the copy itself in primary
 * text.
 */
function TextBlock({ label, body }) {
  if (!body) return null
  return (
    <Reveal preset="fade-up" className={styles.block}>
      <p className={styles.blockLabel}>{label}</p>
      <p className={styles.blockBody}>{body}</p>
    </Reveal>
  )
}

export default ProjectPage
