import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
// `m` is used only as the JSX element <m.div>/<m.img>; ESLint's no-unused-vars
// doesn't count JSX member usage (same workaround as Reveal.jsx).
// eslint-disable-next-line no-unused-vars
import { m, AnimatePresence, useReducedMotion } from 'motion/react'
import Media from '../Media'
import useCursorLabel from '../../hooks/useCursorLabel'
import Reveal from '../motion/Reveal'
import styles from './ImageGrid.module.css'

/**
 * ImageGrid — responsive image gallery using <Media> (lazy + reveal) with a
 * click-to-open lightbox (Esc / click-away to close).
 */
/**
 * GalleryTile — one clickable thumbnail. Split out of the map because each tile
 * needs its OWN useCursorLabel instance, and hooks can't be called in a loop.
 * Carries the same cursor-following label as the project cards, reading "View
 * details" instead of "View project".
 */
function GalleryTile({ image, index, columns, aspect, onOpen }) {
  const { frame, label, handlers } = useCursorLabel()

  return (
    <Reveal
      as="button"
      preset="fade-up"
      delay={(index % columns) * 80}
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open image ${index + 1}`}
      className={styles.tile}
    >
      {/* Each tile IS the reveal (fade-up, in-view) so the gallery visibly
          animates in on scroll. No <Stagger> — across this many images the
          per-child delay would compound into seconds; independent in-view
          reveals cascade naturally as you scroll. The tile has no
          backdrop-filter, so this adds no blur cost.

          The hotspot is a separate inner element for two reasons: <Reveal>
          spreads props LAST, so a `ref` passed to it would clobber its own
          IntersectionObserver ref and the tile would never reveal; and the
          label must sit outside `.zoom`, or it would scale with the image on
          hover. */}
      <div className={styles.hotspot} ref={frame} {...handlers}>
        <div className={styles.zoom}>
          <Media src={image} alt={`Image ${index + 1}`} aspect={aspect} rounded="rounded-xl" />
        </div>
        <span ref={label} className={styles.cursorLabel} aria-hidden="true">
          View details
        </span>
      </div>
    </Reveal>
  )
}

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

  // The keyboard handler owns its own stepping logic so the effect depends only
  // on primitives (the open index and a key for the image list) — no callback
  // identities to chase, and no re-subscribing on every render.
  const realKey = realIndices.join(',')
  useEffect(() => {
    if (openIndex === null) return
    const list = realKey ? realKey.split(',').map(Number) : []
    const step = (delta) => {
      if (list.length === 0) return
      const pos = list.indexOf(openIndex)
      setOpenIndex(list[(pos + delta + list.length) % list.length])
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIndex(null)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'ArrowRight') step(1)
    }
    document.addEventListener('keydown', onKey)
    // Lock the page behind the lightbox (same as the mobile menu) — on a phone
    // the gallery scrolls under the open image otherwise.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [openIndex, realKey])

  const aspect = aspectClasses[aspectRatio] || aspectClasses['9/16']
  const phAspect = placeholderAspect[aspectRatio] || placeholderAspect['9/16']

  return (
    <>
      <div className={`${styles.grid} ${gridCols[columns] || gridCols[4]} ${gapClasses[gap] || gapClasses[1]}`}>
        {images.map((image, index) =>
          image ? (
            <GalleryTile
              key={index}
              image={image}
              index={index}
              columns={columns}
              aspect={aspect}
              onOpen={setOpenIndex}
            />
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
              // Open invites (280ms); close gets out of the way (150ms =
              // --dur-fast). A dismissal that takes as long as the open reads
              // sluggish — the per-variant transition splits the two.
              exit={{ opacity: 0, transition: reduce ? { duration: 0 } : { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }}
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

            {/* Stage holds the image row + counter. Prev / Next now flank the
                image INSIDE the row, 16px from it each side (via .row's gap), so
                they sit beside the image instead of at the far viewport edges.
                The old "fast tap falls through and closes the lightbox" mobile bug
                is independently guarded now: the backdrop only closes on a click of
                ITSELF (e.target === e.currentTarget), the stage stops propagation,
                and each control stops propagation too. flex-shrink:0 keeps the
                arrows put; the image shrinks to fit between them. */}
            <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
              <div className={styles.row}>
                {realIndices.length > 1 && (
                  <button
                    type="button"
                    className={`${styles.ctrl} ${styles.nav}`}
                    onClick={goPrev}
                    aria-label="Previous image"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}

                <m.img
                  key={openIndex}
                  src={openSrc}
                  alt=""
                  className={styles.lightboxImg}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                />

                {realIndices.length > 1 && (
                  <button
                    type="button"
                    className={`${styles.ctrl} ${styles.nav}`}
                    onClick={goNext}
                    aria-label="Next image"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>

              <p className={`${styles.counter} type-caption`}>
                {realIndices.indexOf(openIndex) + 1} of {realIndices.length}
              </p>
            </div>
            </m.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default ImageGrid
