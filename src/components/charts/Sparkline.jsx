import { useId } from 'react'
import styles from './Sparkline.module.css'

/**
 * Sparkline — a minimal inline trend chart (no axes, no labels, no chart junk).
 * Hand-rolled SVG, zero dependencies. The area fills with an accent gradient
 * fading to transparent ("depth from light", and lets the glass frost show
 * through). Responsive: fills its container width, constant-weight stroke via
 * `vector-effect: non-scaling-stroke`. Draws itself in when `active`.
 *
 *  - data        number[] — the series (≥2 points)
 *  - active      trigger the draw-in (wire to a reveal's isVisible)
 *  - area        gradient fill under the line (default true)
 *  - height      px height (width is fluid; default 36)
 *  - color       stroke/fill colour (default the warm accent)
 *  - strokeWidth px (default 1.5)
 */
function Sparkline({
  data = [],
  active = true,
  area = true,
  height = 36,
  color = 'var(--accent)',
  strokeWidth = 1.5,
}) {
  const gradId = useId()
  if (!Array.isArray(data) || data.length < 2) return null

  // Map the series into a 100×100 viewBox (preserveAspectRatio none stretches
  // it to the container; non-scaling-stroke keeps the line crisp at any width).
  const W = 100
  const H = 100
  const pad = strokeWidth // keep the stroke off the top/bottom edges
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const stepX = W / (data.length - 1)
  const points = data.map((d, i) => {
    const x = i * stepX
    const y = pad + (H - pad * 2) * (1 - (d - min) / span)
    return [x, y]
  })

  const linePath = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ')
  const areaPath = `${linePath} L${W} ${H} L0 ${H} Z`

  return (
    <svg
      className={styles.spark}
      style={{ height }}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden="true"
    >
      {area && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {area && <path d={areaPath} fill={`url(#${gradId})`} stroke="none" className={styles.area} data-active={active || undefined} />}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength="1"
        className={styles.line}
        data-active={active || undefined}
      />
    </svg>
  )
}

export default Sparkline
