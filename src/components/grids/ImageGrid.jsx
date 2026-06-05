import { useState, useEffect } from 'react'
import Media from '../Media'

/**
 * ImageGrid — responsive image gallery using <Media> (lazy + reveal) with a
 * click-to-open lightbox (Esc / click-away to close).
 */
function ImageGrid({ images = [], columns = 4, gap = '1', aspectRatio = '9/16' }) {
  const [openSrc, setOpenSrc] = useState(null)

  const gridCols = {
    2: 'grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-3 lg:grid-cols-4',
  }
  const gapClasses = { 1: 'gap-1', 2: 'gap-2', 4: 'gap-4' }
  const aspectClasses = {
    '9/16': 'aspect-[9/16]',
    '16/9': 'aspect-video',
    '1/1': 'aspect-square',
  }

  useEffect(() => {
    if (!openSrc) return
    const onKey = (e) => e.key === 'Escape' && setOpenSrc(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openSrc])

  const aspect = aspectClasses[aspectRatio] || aspectClasses['9/16']

  return (
    <>
      <div className={`grid ${gridCols[columns] || gridCols[4]} ${gapClasses[gap] || gapClasses[1]}`}>
        {images.map((image, index) =>
          image ? (
            <button
              key={index}
              type="button"
              onClick={() => setOpenSrc(image)}
              aria-label={`Open image ${index + 1}`}
              className="group block w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            >
              <div className="transition-transform duration-slow ease-standard group-hover:scale-[1.05]">
                <Media src={image} alt={`Image ${index + 1}`} aspect={aspect} rounded="rounded-xl" />
              </div>
            </button>
          ) : (
            <div key={index} className={`w-full ${aspect} bg-surface-color-tertiary rounded-xl`} />
          )
        )}
      </div>

      {openSrc && (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center p-6 sm:p-12"
          style={{
            backgroundColor: 'var(--overlay-scrim)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={() => setOpenSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={openSrc}
            alt=""
            className="max-w-full max-h-full rounded-2xl object-contain shadow-glass-lg"
          />
        </div>
      )}
    </>
  )
}

export default ImageGrid
