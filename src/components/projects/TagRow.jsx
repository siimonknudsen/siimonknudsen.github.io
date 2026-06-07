import { useLayoutEffect, useRef, useState } from 'react'
import ProjectTag from './ProjectTag'
import Tooltip from '../Tooltip'
import styles from './ProjectCard.module.css'

// Tag row that collapses overflow onto a single line with a "+N" chip.
//
// Measure-based and robust: every chip is always rendered in the DOM so we can
// read true geometry. We compare each chip's offsetTop to the first chip's; any
// chip that wraps to a later line is hidden and folded into a trailing "+N"
// chip. The +N chip itself must sit on the first line, so we account for its
// width by walking back one extra chip whenever it would wrap. The +N chip
// reveals the hidden tags through a hover/focus Tooltip (accessible, no native
// title).
//
// Styled two ways via `variant`:
//   - "card" (default) → renders <ProjectTag> chips (used by ProjectCard /
//     Archive).
//   - "stack"          → renders white-on-image pills using class names passed
//     in from the caller (ProjectGrid's CSS module).
//
// On phones (≤640px) the collapse is switched OFF: a "+N" counter whose tags are
// only reachable via a hover tooltip reads poorly on touch, so every tag is shown
// and the row simply wraps onto multiple lines (containers already flex-wrap).
//
// The slot/+N hiding always uses ProjectCard.module.css's compound selectors
// (`.tagSlot.hiddenChip` / `.plusTag.hiddenChip { display: none }`), regardless
// of variant — so the recently-fixed phantom "+1" bug stays fixed.
function TagRow({
  tags,
  variant = 'card',
  containerClassName,
  chipClassName,
}) {
  const containerRef = useRef(null)
  const chipRefs = useRef([])
  const plusRef = useRef(null)
  // Single source of truth: how many tags are visible. Both the chips AND the
  // "+N" chip derive from this, so React renders and the measurement can never
  // disagree (the old split — chips hidden imperatively, +N driven by state —
  // produced a phantom "+1" because a re-render wiped the imperative classes).
  const [count, setCount] = useState(tags.length)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Phones: show every tag and let the row wrap — no "+N" collapse.
    const mobileQuery = window.matchMedia('(max-width: 640px)')

    const measure = () => {
      const chips = chipRefs.current.filter(Boolean)
      const plus = plusRef.current
      if (chips.length === 0) return

      // Measure with everything laid out (override the current hidden state) so
      // every node reports true geometry.
      chips.forEach((el) => el.classList.remove(styles.hiddenChip))
      if (plus) plus.classList.remove(styles.hiddenChip)

      // On phones, skip the overflow math entirely: keep all chips shown, hide
      // the "+N" chip, and let flex-wrap stack them onto further lines.
      if (mobileQuery.matches) {
        chips.forEach((el) => el.removeAttribute('aria-hidden'))
        if (plus) plus.classList.add(styles.hiddenChip)
        setCount((prev) => (prev === chips.length ? prev : chips.length))
        return
      }

      const firstTop = chips[0].offsetTop
      let onFirstLine = chips.length
      for (let i = 0; i < chips.length; i++) {
        if (chips[i].offsetTop > firstTop) {
          onFirstLine = i
          break
        }
      }

      let next
      if (onFirstLine === chips.length) {
        next = chips.length // everything fits — no +N
      } else {
        // Overflow: the +N chip must share the first line. It's laid out right
        // after the full set, so if it spilled to line two, hide one more chip.
        next = onFirstLine
        if (plus && plus.offsetTop > firstTop && next > 0) next -= 1
      }

      // Apply imperatively now (correct even when count is unchanged → no
      // re-render) AND push to state so subsequent renders match exactly.
      chips.forEach((el, i) => {
        const hidden = i >= next
        el.classList.toggle(styles.hiddenChip, hidden)
        if (hidden) el.setAttribute('aria-hidden', 'true')
        else el.removeAttribute('aria-hidden')
      })
      if (plus) plus.classList.toggle(styles.hiddenChip, next >= chips.length)
      setCount((prev) => (prev === next ? prev : next))
    }

    const raf = requestAnimationFrame(measure)
    const ro = new ResizeObserver(() => requestAnimationFrame(measure))
    ro.observe(container)

    // Re-measure when crossing the phone breakpoint (toggles collapse on/off).
    const onMQ = () => requestAnimationFrame(measure)
    mobileQuery.addEventListener('change', onMQ)

    // Re-measure once web fonts load: before then chip widths use a fallback
    // font, so a tag can falsely "wrap". The container width doesn't change, so
    // the ResizeObserver alone wouldn't catch it.
    let cancelled = false
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) requestAnimationFrame(measure)
      })
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      mobileQuery.removeEventListener('change', onMQ)
    }
  }, [tags])

  const hiddenCount = Math.max(tags.length - count, 0)
  const hiddenTags = tags.slice(count)

  // Render a single tag's inner chip element per variant.
  const renderChip = (tag) =>
    variant === 'stack' ? (
      <span className={chipClassName}>{tag}</span>
    ) : (
      <ProjectTag>{tag}</ProjectTag>
    )

  // The "+N" chip itself reuses the same per-variant chip styling.
  const renderPlus = (label) =>
    variant === 'stack' ? (
      <span className={chipClassName}>{label}</span>
    ) : (
      <ProjectTag>{label}</ProjectTag>
    )

  return (
    <div
      className={`${styles.tags}${containerClassName ? ` ${containerClassName}` : ''}`}
      ref={containerRef}
    >
      {tags.map((tag, index) => (
        <span
          key={index}
          ref={(el) => (chipRefs.current[index] = el)}
          className={`${styles.tagSlot} ${index >= count ? styles.hiddenChip : ''}`}
          aria-hidden={index >= count ? 'true' : undefined}
        >
          {renderChip(tag)}
        </span>
      ))}
      <span
        ref={plusRef}
        className={`${styles.plusTag} ${hiddenCount === 0 ? styles.hiddenChip : ''}`}
        aria-hidden={hiddenCount === 0 ? 'true' : undefined}
      >
        <Tooltip
          placement="top"
          content={
            <span className={styles.plusList}>
              {hiddenTags.map((tag, i) => (
                <span key={i} className={styles.plusListItem}>
                  {tag}
                </span>
              ))}
            </span>
          }
        >
          {renderPlus(`+${Math.max(hiddenCount, 1)}`)}
        </Tooltip>
      </span>
    </div>
  )
}

export default TagRow
