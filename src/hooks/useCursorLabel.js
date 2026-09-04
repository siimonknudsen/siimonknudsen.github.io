import { useRef } from 'react'

// How far the label sits from the pointer, and how fast it catches up (0 → 1
// per frame). 0.16 reads as a soft glide rather than a snap. The x offset
// clears the arrow's width; nothing intrudes above it, so y can sit tighter.
const LABEL_OFFSET_X = 10
const LABEL_OFFSET_Y = 8
const EASE = 0.16
// Keeps the label off the frame's edge when the pointer runs into a corner.
const EDGE = 12
// How far back past the flip threshold the pointer must travel before the label
// flips again. Without it the label chatters between sides while the pointer
// hovers exactly on the line.
const FLIP_HYSTERESIS = 24

/**
 * useCursorLabel — trails a label just off the pointer inside a frame.
 *
 * Returns a `frame` ref (the hover area, must be `position: relative`), a
 * `label` ref (the element to move, `position: absolute; top:0; left:0`), and
 * the three pointer handlers to spread onto the frame.
 *
 * Shared by the project cards ("View project") and the picture gallery ("View
 * details") so the two can't drift — the placement maths here is fiddly enough
 * that a second copy would rot.
 *
 * The system cursor stays visible on purpose: hiding it (the other common take
 * on this effect) costs more in orientation than it buys in polish.
 */
export default function useCursorLabel() {
  const frame = useRef(null)
  const label = useRef(null)
  // The pointer in VIEWPORT coordinates. Scrolling moves the frame under a
  // stationary cursor without firing a pointer event, so the label's position
  // has to be derived from this every frame — not cached per move.
  const pointer = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  // Which side of the pointer the label currently sits on. Held in refs (not
  // state) because they're read and written inside the rAF loop.
  const flipX = useRef(false)
  const flipY = useRef(false)
  // Set on enter so the first frame places the label outright instead of
  // gliding it in from wherever it was left last time.
  const seed = useRef(true)
  const hovering = useRef(false)
  const raf = useRef(0)
  const glides = useRef(true)

  const draw = () => {
    raf.current = 0
    const el = label.current
    const box = frame.current
    if (!el || !box || !hovering.current) return

    const rect = box.getBoundingClientRect()
    const px = pointer.current.x - rect.left
    const py = pointer.current.y - rect.top
    const w = el.offsetWidth
    const h = el.offsetHeight

    // Placement: above-right of the hotspot by default, because the arrow's
    // body extends down-right — a label there sits under the cursor graphic.
    // Flip to below / left when the pointer nears an edge (the same strategy a
    // positioning library uses). The flip is sticky within FLIP_HYSTERESIS so
    // it can't oscillate on the threshold.
    const wantsLeft = px + LABEL_OFFSET_X + w > rect.width - EDGE
    const clearsRight = px + LABEL_OFFSET_X + w < rect.width - EDGE - FLIP_HYSTERESIS
    flipX.current = flipX.current ? !clearsRight : wantsLeft

    const wantsDown = py - LABEL_OFFSET_Y - h < EDGE
    const clearsUp = py - LABEL_OFFSET_Y - h > EDGE + FLIP_HYSTERESIS
    flipY.current = flipY.current ? !clearsUp : wantsDown

    const rawX = flipX.current ? px - LABEL_OFFSET_X - w : px + LABEL_OFFSET_X
    const rawY = flipY.current ? py + LABEL_OFFSET_Y : py - LABEL_OFFSET_Y - h
    // Clamp as a final guard, then ease the LABEL's own position toward that
    // target. Easing the placement rather than the pointer is what makes a
    // corner flip glide across the cursor instead of teleporting: the target
    // jumps by the label's width, and the label travels there over a few frames
    // like any other move.
    const targetX = Math.min(Math.max(rawX, EDGE), Math.max(rect.width - w - EDGE, EDGE))
    const targetY = Math.min(Math.max(rawY, EDGE), Math.max(rect.height - h - EDGE, EDGE))

    const c = current.current
    if (glides.current && !seed.current) {
      c.x += (targetX - c.x) * EASE
      c.y += (targetY - c.y) * EASE
    } else {
      c.x = targetX
      c.y = targetY
      seed.current = false
    }
    el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`

    // Keep the loop alive for as long as the frame is hovered: the target moves
    // on scroll and resize too, not only on pointer moves.
    raf.current = requestAnimationFrame(draw)
  }

  const onPointerEnter = (e) => {
    glides.current = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    pointer.current = { x: e.clientX, y: e.clientY }
    // Let the first draw() place the label exactly, flips and all.
    seed.current = true
    hovering.current = true
    if (!raf.current) raf.current = requestAnimationFrame(draw)
  }

  const onPointerMove = (e) => {
    pointer.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerLeave = () => {
    hovering.current = false
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = 0
  }

  return { frame, label, handlers: { onPointerEnter, onPointerMove, onPointerLeave } }
}
