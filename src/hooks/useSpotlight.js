/**
 * useSpotlight — returns an onMouseMove handler that writes the pointer's
 * position (relative to the element) into `--mx`/`--my` CSS vars, driving the
 * global `.fx-spotlight` cursor-glow overlay. Pair with a `group` class +
 * `position: relative; overflow: hidden` on the card and a
 * `<span className="fx-spotlight" aria-hidden="true" />` child.
 */
export default function useSpotlight() {
  return (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
}
