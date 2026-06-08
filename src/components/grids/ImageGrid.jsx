import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
// `m` is used only as the JSX element <m.div>/<m.img>; ESLint's no-unused-vars
// doesn't count JSX member usage (same workaround as Reveal.jsx).
// eslint-disable-next-line no-unused-vars
import { m, AnimatePresence, useReducedMotion } from 'motion/react'
import Media from '../Media'
import Reveal from '../motion/Reveal'
import styles from './ImageGrid.module.css'

/**
 * ImageGrid — responsive image gallery using <Media> (lazy + reveal) with a
 * click-to-open lightbox (Esc / click-away to close).
 */
function ImageGrid({ images = [], columns = 4, gap = '1', aspectRatio = '9/16' }) {
  const [openIndex, setOpenIndex] = useState(null)
  const reduce = useReducedMotion()

  // Indices of the "real" (truthy) images, used for navigation + counting.
  const realIndices = images
    .map((img, i) => (img ? i : null))
    .filter((i) => i !== null)

  const openSrc = openIndex !== null ? images[openIndex] : null

  // Just clear the open index — AnimatePresence plays the exit before unmount
  // (replaces the old manual `closing` + setTimeout choreography).
  const closeLightbox = () => setOpenIndex(null)

  // Move to the prev/next real image, wrapping around (skips falsy entries).
  const goRelative = (delta) => {
    if (openIndex === null || realIndices.length === 0) return
    const pos = realIndices.indexOf(openIndex)
    const nextPos = (pos + delta + realIndices.length) % realIndices.length
    setOpenIndex(realIndices[nextPos])
  }

  const goPrev = (e) => {
    e?.stopPropagation()
    goRelative(-1)
  }
  const goNext = (e) => {
    e?.stopPropagation()
    goRelative(1)
  }

  const gridCols = {
    2: styles.cols2,
    3: styles.cols3,
    4: styles.cols4,
  }
  const gapClasses = { 1: styles.gap1, 2: styles.gap2, 4: styles.gap4 }
  const aspectClasses = {
    '9/16': 'aspect-[9/16]',
    '16/9': 'aspect-video',
    '1/1': 'aspect-square',
  }
  const placeholderAspect = {
    '9/16': styles.aspect916,
    '16/9': styles.aspect169,
    '1/1': styles.aspect11,
  }

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openIndex])

  const aspect = aspectClasses[aspectRatio] || aspectClasses['9/16']
  const phAspect = placeholderAspect[aspectRatio] || placeholderAspect['9/16']

  return (
    <>
      <div className={`${styles.grid} ${gridCols[columns] || gridCols[4]} ${gapClasses[gap] || gapClasses[1]}`}>
        {images.map((image, index) =>
          image ? (
            <Reveal
              as="button"
              preset="fade-up"
              key={index}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open image ${index + 1}`}
              className={styles.tile}
            >
              {/* Each tile IS the reveal (fade-up, in-view) so the gallery visibly
                  animates in on scroll. No <Stagger> — across this many images the
                  per-child delay would compound into seconds; independent in-view
                  reveals cascade naturally as you scroll. The tile has no
                  backdrop-filter, so this adds no blur cost. */}
              <div className={styles.zoom}>
                <Media src={image} alt={`Image ${index + 1}`} aspect={aspect} rounded="rounded-xl" />
              </div>
            </Reveal>
          ) : (
            <div key={index} className={`${styles.placeholder} ${phAspect} bg-surface-color-tertiary`} />
          )
        )}
      </div>

      {createPortal(
        <AnimatePresence>
          {openSrc && (
            <m.div
              key="lightbox"
              className={styles.lightbox}
              style={{
                backgroundColor: 'var(--overlay-scrim)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => {
                // Only a click on the backdrop ITSELF closes — never one that
                // bubbled up from the image or a control. Hardens against the
                // mobile fast-tap bug where a tap could fall through and close.
                if (e.target === e.currentTarget) closeLightbox()
              }}
              role="dialog"
              aria-modal="true"
            >
            {/* Close */}
            <button
              type="button"
              className={`${styles.ctrl} ${styles.close}`}
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Prev / Next — pinned to the viewport edges (position: fixed), so
                they stay put regardless of the current image's size or load
                state. (They used to be in-flow flex items hugging the image, so a
                not-yet-loaded image collapsed the row, slid the arrows inward, and
                a fast second tap fell through to the backdrop and closed the
                lightbox — the mobile bug.) Each stops propagation too. */}
            {realIndices.length > 1 && (
              <button
                type="button"
                className={`${styles.ctrl} ${styles.nav} ${styles.navPrev}`}
                onClick={goPrev}
                aria-label="Previous image"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Stage holds the image + counter (stopPropagation is a backstop to
                the backdrop's own target check above). */}
            <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
              <div className={styles.row}>
                <m.img
                  key={openIndex}
                  src={openSrc}
                  alt=""
                  className={styles.lightboxImg}
                  initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <p className={`${styles.counter} type-caption`}>
                {realIndices.indexOf(openIndex) + 1} of {realIndices.length}
              </p>
            </div>

            {realIndices.length > 1 && (
              <button
                type="button"
                className={`${styles.ctrl} ${styles.nav} ${styles.navNext}`}
                onClick={goNext}
                aria-label="Next image"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            </m.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default ImageGrid
