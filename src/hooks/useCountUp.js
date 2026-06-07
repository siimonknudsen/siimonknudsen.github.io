import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../components/motion'

/**
 * useCountUp — eases a number from 0 → target once `active` turns true.
 * Calm easeOutCubic, no overshoot (matches the motion DNA). Honours reduced
 * motion by showing the target directly (information parity, no animation).
 * Returns the current numeric value; the caller formats it.
 *
 *  - target    final numeric value
 *  - active    start the count (wire to useReveal's isVisible)
 *  - duration  ms (default 1100 — slow, ease-out; the calm cadence)
 */
export default function useCountUp(target, active, { duration = 1100 } = {}) {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    if (!active || reduced || duration <= 0 || typeof target !== 'number') return
    const start = performance.now()
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setValue(target * easeOutCubic(t)) // inside rAF — not a synchronous effect setState
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, active, duration, reduced])

  // Reduced motion or a non-numeric target → show the final value directly.
  if (reduced || typeof target !== 'number') return target
  return value
}
