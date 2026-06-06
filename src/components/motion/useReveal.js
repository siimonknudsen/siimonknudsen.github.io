import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — IntersectionObserver hook for scroll-reveal.
 * Returns { ref, isVisible }; attach ref to the element and toggle the
 * `.is-visible` class (or drive any animation) off isVisible.
 * `once` (default true) reveals a single time and disconnects.
 */
export default function useReveal({
  threshold = 0.12,
  rootMargin = '0px 0px -10% 0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true) // no IO support → show immediately
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) io.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}
