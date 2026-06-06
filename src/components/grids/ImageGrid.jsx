import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Media from '../Media'
import styles from './ImageGrid.module.css'

/**
 * ImageGrid — responsive image gallery using <Media> (lazy + reveal) with a
 * click-to-open lightbox (Esc / click-away to close).
 */
function ImageGrid({ images = [], columns = 4, gap = '1', aspectRatio = '9/16' }) {
  const [openSrc, setOpenSrc] = useState(null)
  const [closing, setClosing] = useState(false)

  // Animate the close before unmounting (matches the CSS exit duration).
  const closeLightbox = () => {
    setClosing(true)
    window.setTimeout(() => {
      setOpenSrc(null)
      setClosing(false)
    }, 260)
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
    if (!openSrc) return
    const onKey = (e) => e.key === 'Escape' && closeLightbox()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openSrc])

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
              onClick={() => setOpenSrc(image)}
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
            <img src={openSrc} alt="" className={styles.lightboxImg} />
          </div>,
          document.body
        )}
    </>
  )
}

export default ImageGrid
