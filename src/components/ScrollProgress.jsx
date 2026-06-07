import { useEffect, useRef, useState } from 'react'
import styles from './ScrollProgress.module.css'

/**
 * A thin reading-progress bar fixed to the top of the viewport. Its fill scales
 * from 0→1 with the page's scroll position. Calm and low-key — accent fill on a
 * translucent track, no easing so it tracks the scroll exactly.
 *
 * Scroll tracking is rAF-throttled and writes the progress to a CSS var
 * (--progress) on the fill, so React doesn't re-render on every scroll event.
 */
function ScrollProgress() {
  const fillRef = useRef(null)
  const frameRef = useRef(0)
  // Whether there's actually anything to scroll. Defaults to true so the bar
  // mounts; flips to false (→ render null) if the page can't scroll.
  const [scrollable, setScrollable] = useState(true)

  useEffect(() => {
    const update = () => {
      frameRef.current = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      if (max <= 0) {
        setScrollable(false)
        return
      }
      setScrollable(true)
      const progress = Math.min(1, Math.max(0, doc.scrollTop / max))
      if (fillRef.current) {
        fillRef.current.style.setProperty('--progress', String(progress))
      }
    }

    const onScroll = () => {
      // Coalesce bursts of scroll events into one write per frame.
      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(update)
    }

    update() // initial position (e.g. restored scroll on navigation)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  if (!scrollable) return null

  return (
    <div className={styles.bar} role="presentation" aria-hidden="true">
      <div ref={fillRef} className={styles.fill} />
    </div>
  )
}

export default ScrollProgress
