import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * useReducedMotion — true when the user requests reduced motion.
 * Use to short-circuit JS-driven animation paths (CSS paths are already
 * handled by the global @media (prefers-reduced-motion) reset in index.css).
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.(QUERY).matches
  )
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia(QUERY)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}
