import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import Reveal from '../motion/Reveal'
import Media from '../Media'
import styles from './ProjectCard.module.css'

// Motion-wrapped <Link>, created ONCE at module scope (never during render) so
// the card link can BE the reveal element.
const MotionLink = m.create(Link)

// How far the label sits from the pointer, and how fast it catches up (0 → 1
// per frame). 0.16 reads as a soft glide rather than a snap. The x offset
// clears the arrow's width; nothing intrudes above it, so y can sit tighter.
const LABEL_OFFSET_X = 10
const LABEL_OFFSET_Y = 8
const EASE = 0.16
// Keeps the label off the frame's edge when the pointer runs into a corner.
const EDGE = 12

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
  const frameRef = useRef(null)
  const labelRef = useRef(null)
  // The pointer in VIEWPORT coordinates. Scrolling moves the frame under a
  // stationary cursor without firing a pointer event, so the label's position
  // has to be derived from this every frame — not cached per move.
  const pointer = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)
  const raf = useRef(0)
  const glides = useRef(true)

  const draw = () => {
    raf.current = 0
    const label = labelRef.current
    const frame = frameRef.current
    if (!label || !frame || !hovering.current) return

    const box = frame.getBoundingClientRect()
    const tx = pointer.current.x - box.left
    const ty = pointer.current.y - box.top
    const c = current.current
    if (glides.current) {
      c.x += (tx - c.x) * EASE
      c.y += (ty - c.y) * EASE
    } else {
      c.x = tx
      c.y = ty
    }
    // Placement: above-right of the hotspot by default, because the arrow's
    // body extends down-right — a label there sits under the cursor graphic.
    // Flip to below / left when the pointer nears an edge (the same strategy a
    // positioning library uses), then clamp as a final guard.
    const w = label.offsetWidth
    const h = label.offsetHeight
    const flipsDown = c.y - LABEL_OFFSET_Y - h < EDGE
    const flipsLeft = c.x + LABEL_OFFSET_X + w > box.width - EDGE
    const rawX = flipsLeft ? c.x - LABEL_OFFSET_X - w : c.x + LABEL_OFFSET_X
    const rawY = flipsDown ? c.y + LABEL_OFFSET_Y : c.y - LABEL_OFFSET_Y - h
    const x = Math.min(Math.max(rawX, EDGE), Math.max(box.width - w - EDGE, EDGE))
    const y = Math.min(Math.max(rawY, EDGE), Math.max(box.height - h - EDGE, EDGE))
    label.style.transform = `translate3d(${x}px, ${y}px, 0)`

    // Keep the loop alive for as long as the card is hovered: the target moves
    // on scroll and resize too, not only on pointer moves.
    raf.current = requestAnimationFrame(draw)
  }

  const handleEnter = (e) => {
    glides.current = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    pointer.current = { x: e.clientX, y: e.clientY }
    const box = frameRef.current?.getBoundingClientRect()
    if (box) current.current = { x: e.clientX - box.left, y: e.clientY - box.top }
    hovering.current = true
    if (!raf.current) raf.current = requestAnimationFrame(draw)
  }

  const handleMove = (e) => {
    pointer.current = { x: e.clientX, y: e.clientY }
  }

  const handleLeave = () => {
    hovering.current = false
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = 0
  }

  return (
    <Reveal
      as={MotionLink}
      to={`/project/${id}`}
      preset="fade-up"
      delay={delay}
      className={styles.card}
    >
      {/* Image frame — clips the inner zoom on hover */}
      <div
        ref={frameRef}
        className={styles.frame}
        onPointerEnter={handleEnter}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <div className={styles.zoom}>
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
