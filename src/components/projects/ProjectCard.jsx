import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import Reveal from '../motion/Reveal'
import Media from '../Media'
import useCursorLabel from '../../hooks/useCursorLabel'
import styles from './ProjectCard.module.css'

// Motion-wrapped <Link>, created ONCE at module scope (never during render) so
// the card link can BE the reveal element.
const MotionLink = m.create(Link)

/**
 * ProjectCard — a 1256/700 image carrying the discipline chips over its
 * top-left corner, with the title and description beneath it. There is no card
 * surface: the image is the card.
 *
 * Hovering the image trails a "View project" label just off the pointer — above
 * and to the right of it, flipping when it would run out of the frame. The
 * system cursor stays visible on purpose — hiding it (the other common take on
 * this effect) costs more in orientation than it buys in polish.
 */
function ProjectCard({ id, title, description, tags = [], delay, noMedia = false }) {
  // Shared with the picture gallery — see hooks/useCursorLabel.
  const { frame: frameRef, label: labelRef, handlers } = useCursorLabel()

  return (
    <Reveal
      as={MotionLink}
      to={`/project/${id}`}
      preset="fade-up"
      delay={delay}
      className={styles.card}
    >
      {/* Image frame — clips the image to the card's rounded corners */}
      <div
        ref={frameRef}
        className={styles.frame}
        {...handlers}
      >
        <div className={styles.media}>
          {/* noMedia: same tokenised placeholder frame, zero image requests
              (a missing hero used to 404 through every format). */}
          <Media
            src={noMedia ? null : `/projects/${id}/images/hero`}
            alt={title}
            aspect="fill"
            rounded="none"
          />
        </div>
        {/* On-media chrome needs media: an empty plate would leave the pills
            unreadable on the light tonal surface. */}
        {tags.length > 0 && !noMedia && (
          <div className={styles.chips}>
            {tags.map((tag) => (
              <span key={tag} className={styles.chip}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <span ref={labelRef} className={styles.cursorLabel} aria-hidden="true">
          View project
        </span>
      </div>

      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
    </Reveal>
  )
}

export default ProjectCard
