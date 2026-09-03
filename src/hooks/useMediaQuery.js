import { useEffect, useState } from 'react'

/**
 * useMediaQuery — subscribe to a CSS media query from JS.
 *
 * For layouts where CSS alone won't do: rendering BOTH a mobile and a desktop
 * variant and hiding one with `display: none` would duplicate the content in
 * the DOM (and so in the accessibility tree and for search engines). This lets
 * a component render exactly one of them.
 *
 * Prefer plain CSS media queries whenever the two variants are the same markup
 * — this is for when they genuinely aren't.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.(query).matches
  )

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange() // resync in case the query changed between render and effect
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}
