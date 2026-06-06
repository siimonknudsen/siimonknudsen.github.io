import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Media from '../Media'
import styles from './ImageGrid.module.css'

/**
 * ImageGrid — responsive image gallery using <Media> (lazy + reveal) with a
 * click-to-open lightbox (Esc / click-away to close).
 */
function ImageGrid({ images = [], columns = 4, gap = '1', aspectRatio = '9/16' }) {
  const [openIndex, setOpenIndex] = useState(null)
  const [closing, setClosing] = useState(false)

  // Indices of the "real" (truthy) images, used for navigation + counting.
  const realIndices = images
    .map((img, i) => (img ? i : null))
    .filter((i) => i !== null)

  const openSrc = openIndex !== null ? images[openIndex] : null

  // Animate the close before unmounting (matches the CSS exit duration).
  const closeLightbox = () => {
    setClosing(true)
    window.setTimeout(() => {
      setOpenIndex(null)
      setClosing(false)
    }, 260)
  }

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
            <button
              key={index}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open image ${index + 1}`}
              className={styles.tile}
            >
              <div className={styles.zoom}>
                <Media src={image} alt={`Image ${index + 1}`} aspect={aspect} rounded="rounded-xl" />
              </div>
            </button>
          ) : (
            <div key={index} className={`${styles.placeholder} ${phAspect} bg-surface-color-tertiary`} />
          )
        )}
      </div>

      {openSrc &&
        createPortal(
          <div
            className={`${styles.lightbox} ${closing ? styles.lightboxClosing : ''}`}
            style={{
              backgroundColor: 'var(--overlay-scrim)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={closeLightbox}
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

            {/* Prev / Next + image + counter — stopPropagation so clicks don't close */}
            <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
              {realIndices.length > 1 && (
                <button
                  type="button"
                  className={`${styles.ctrl} ${styles.nav} ${styles.prev}`}
                  onClick={goPrev}
                  aria-label="Previous image"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}

              <img key={openIndex} src={openSrc} alt="" className={styles.lightboxImg} />

              {realIndices.length > 1 && (
                <button
                  type="button"
                  className={`${styles.ctrl} ${styles.nav} ${styles.next}`}
                  onClick={goNext}
                  aria-label="Next image"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}

              <p className={`${styles.counter} type-caption`}>
                {realIndices.indexOf(openIndex) + 1} of {realIndices.length}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default ImageGrid
