import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectTag from './ProjectTag'
import Reveal from '../motion/Reveal'
import Media from '../Media'
import styles from './ProjectCard.module.css'

// Cursor-tracking spotlight: write pointer position into CSS vars on the card.
function trackPointer(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

// Tag row that collapses overflow onto a single line with a "+N" chip.
//
// Measure-based and robust: every chip is always rendered in the DOM so we can
// read true geometry. We compare each chip's offsetTop to the first chip's; any
// chip that wraps to a later line is hidden and folded into a trailing "+N"
// chip. The +N chip itself must sit on the first line, so we account for its
// width by walking back one extra chip whenever it would wrap. The +N chip
// reveals the hidden tags through a native `title` tooltip (accessible, no deps).
function TagRow({ tags }) {
  const containerRef = useRef(null)
  const chipRefs = useRef([])
  const plusRef = useRef(null)
  // Drives the +N chip's label and tooltip. hiddenTags is empty when all fit.
  const [hiddenTags, setHiddenTags] = useState([])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const measure = () => {
      const chips = chipRefs.current.filter(Boolean)
      const plus = plusRef.current
      if (chips.length === 0) return

      // Force full layout (all chips + the +N chip visible) so every node has
      // true geometry, regardless of the previous measurement's hidden classes.
      chips.forEach((el) => el.classList.remove(styles.hiddenChip))
      if (plus) plus.classList.remove(styles.hiddenChip)

      const firstTop = chips[0].offsetTop

      // How many chips naturally sit on the first line.
      let onFirstLine = chips.length
      for (let i = 0; i < chips.length; i++) {
        if (chips[i].offsetTop > firstTop) {
          onFirstLine = i
          break
        }
      }

      let count
      if (onFirstLine === chips.length) {
        // Everything fits — show all chips, no +N chip.
        count = chips.length
      } else {
        // Overflow: the +N chip must share the first line. It's laid out right
        // after the full set, so if it spilled to line two, hide one more chip.
        count = onFirstLine
        if (plus && plus.offsetTop > firstTop && count > 0) count -= 1
      }

      // Apply the computed visibility imperatively (no re-render needed for the
      // chips themselves; only the +N label/tooltip is React state).
      chips.forEach((el, i) => {
        const isHidden = i >= count
        el.classList.toggle(styles.hiddenChip, isHidden)
        if (isHidden) el.setAttribute('aria-hidden', 'true')
        else el.removeAttribute('aria-hidden')
      })

      const nextHidden = tags.slice(count)
      if (plus) plus.classList.toggle(styles.hiddenChip, nextHidden.length === 0)
      setHiddenTags((prev) =>
        prev.length === nextHidden.length &&
        prev.every((t, i) => t === nextHidden[i])
          ? prev
          : nextHidden
      )
    }

    const raf = requestAnimationFrame(measure)
    const ro = new ResizeObserver(() => requestAnimationFrame(measure))
    ro.observe(container)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [tags])

  const hiddenCount = hiddenTags.length

  return (
    <div className={styles.tags} ref={containerRef}>
      {tags.map((tag, index) => (
        <span
          key={index}
          ref={(el) => (chipRefs.current[index] = el)}
          className={styles.tagSlot}
        >
          <ProjectTag>{tag}</ProjectTag>
        </span>
      ))}
      <span
        ref={plusRef}
        className={`${styles.plusTag} ${hiddenCount === 0 ? styles.hiddenChip : ''}`}
        aria-hidden={hiddenCount === 0 ? 'true' : undefined}
        title={hiddenTags.join(', ')}
      >
        <ProjectTag>{`+${Math.max(hiddenCount, 1)}`}</ProjectTag>
      </span>
    </div>
  )
}

function ProjectCard({ id, title, description, tags = [], impact, featured = false }) {
  return (
    <Reveal preset="fade-up" className={styles.revealWrap}>
      <Link
        to={`/project/${id}`}
        onMouseMove={trackPointer}
        className={`group glass-panel ${styles.card} ${featured ? styles.featured : ''}`}
      >
        {/* Cursor spotlight (specular sheen) */}
        <span aria-hidden="true" className={styles.spotlight} />

        {/* Image frame — clips the inner zoom on hover */}
        <div className={styles.frame}>
          <div className={styles.zoom}>
            <Media src={`/projects/${id}/images/hero`} alt={title} aspect="aspect-video" rounded="rounded-xl" />
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {impact && (
            <span className={`bg-accent-soft border-accent ${styles.impact}`}>
              <strong className="text-accent">{impact.value}</strong>
              <span className="text-color-secondary">{impact.label}</span>
            </span>
          )}
          <div className={styles.text}>
            <h3 className="type-subtitle text-color-primary">{title}</h3>
            {description && <p className="type-body text-color-secondary">{description}</p>}
          </div>
          {tags.length > 0 && <TagRow tags={tags} />}
        </div>
      </Link>
    </Reveal>
  )
}

export default ProjectCard
