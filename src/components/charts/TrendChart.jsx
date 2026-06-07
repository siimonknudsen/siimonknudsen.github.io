import { useId, useRef, useState } from 'react'
import styles from './TrendChart.module.css'

/**
 * TrendChart — a minimal editorial line/area chart for a single series.
 * No gridlines, no boxed plot, no legend: just the trend shape, one faint
 * baseline hairline, and a direct end-label (FT/NYT style). The area fades to
 * transparent so a glass surface frosts through. Hand-rolled SVG, zero deps.
 *
 * Interactive: hover / touch (or focus + arrow keys) moves a vertical guide and
 * a highlighted point, with a value tooltip; the active value is announced via
 * an aria-live region. Calm, fast tooltip transitions; reduced-motion safe.
 *
 *  - data        number[] — the series
 *  - active      trigger the draw-in (wire to a reveal's isVisible)
 *  - area        gradient fill under the line (default true)
 *  - baseline    faint hairline along the bottom (default true)
 *  - endLabel    short text at the line's end (the resting-state direct label)
 *  - labels      optional per-point labels (e.g. months) for the tooltip / a11y
 *  - format      (value) => string for the tooltip (default toLocaleString)
 *  - color       line / fill colour (default the warm accent)
 *  - ariaLabel   one-line takeaway for screen readers
 */
function TrendChart({
  data = [],
  active = true,
  area = true,
  baseline = true,
  endLabel,
  labels,
  format = (v) => v.toLocaleString('en-US'),
  color = 'var(--accent)',
  ariaLabel,
}) {
  const gradId = useId()
  const wrapRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)

  if (!Array.isArray(data) || data.length < 2) return null

  const W = 640
  const H = 240
  const padX = 16
  const padTop = 24
  const padBottom = 28
  const labelRoom = endLabel ? 96 : padX

  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const innerW = W - padX - labelRoom
  const innerH = H - padTop - padBottom
  const stepX = innerW / (data.length - 1)
  const baseY = padTop + innerH

  const points = data.map((d, i) => [
    padX + i * stepX,
    padTop + innerH * (1 - (d - min) / span),
  ])
  const last = points[points.length - 1]

  const linePath = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ')
  const areaPath = `${linePath} L${last[0].toFixed(2)} ${baseY} L${padX} ${baseY} Z`

  // Map a client x-coordinate to the nearest data index (the "bisector").
  const indexFromClientX = (clientX) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return null
    const svgX = ((clientX - rect.left) / rect.width) * W
    const i = Math.round((svgX - padX) / stepX)
    return Math.max(0, Math.min(data.length - 1, i))
  }

  const onPointerMove = (e) => setActiveIndex(indexFromClientX(e.clientX))
  const onPointerLeave = () => setActiveIndex(null)

  const onKeyDown = (e) => {
    const cur = activeIndex ?? data.length - 1
    let next = null
    if (e.key === 'ArrowRight') next = Math.min(data.length - 1, cur + 1)
    else if (e.key === 'ArrowLeft') next = Math.max(0, cur - 1)
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = data.length - 1
    else if (e.key === 'Escape') {
      setActiveIndex(null)
      return
    } else return
    e.preventDefault()
    setActiveIndex(next)
  }

  const ai = activeIndex
  const activePoint = ai != null ? points[ai] : null
  const tipLeft = activePoint ? Math.max(8, Math.min(92, (activePoint[0] / W) * 100)) : 0
  const tipText =
    ai != null ? `${labels?.[ai] ? `${labels[ai]} · ` : ''}${format(data[ai])}` : ''

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      tabIndex={0}
      role="img"
      aria-label={ariaLabel || 'Trend chart'}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
      onBlur={onPointerLeave}
    >
      <svg
        className={styles.chart}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {area && (
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.20" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
        )}

        {baseline && (
          <line
            x1={padX}
            y1={baseY}
            x2={padX + innerW}
            y2={baseY}
            className={styles.baseline}
            vectorEffect="non-scaling-stroke"
          />
        )}

        {area && (
          <path d={areaPath} fill={`url(#${gradId})`} className={styles.area} data-active={active || undefined} />
        )}

        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          pathLength="1"
          className={styles.line}
          data-active={active || undefined}
        />

        {/* Resting-state end dot + direct label (hidden while interacting). */}
        {ai == null && (
          <>
            <circle cx={last[0]} cy={last[1]} r="3.5" fill={color} className={styles.dot} data-active={active || undefined} />
            {endLabel && (
              <text
                x={last[0] + 12}
                y={last[1]}
                dominantBaseline="middle"
                className={styles.endLabel}
                data-active={active || undefined}
                fill={color}
              >
                {endLabel}
              </text>
            )}
          </>
        )}

        {/* Interactive guide + highlighted point. */}
        {activePoint && (
          <>
            <line
              x1={activePoint[0]}
              y1={padTop - 6}
              x2={activePoint[0]}
              y2={baseY}
              className={styles.guide}
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={activePoint[0]} cy={activePoint[1]} r="4.5" fill={color} className={styles.activeDot} />
          </>
        )}
      </svg>

      {activePoint && (
        <div className={styles.tooltip} style={{ left: `${tipLeft}%` }} aria-hidden="true">
          {tipText}
        </div>
      )}

      <span className={styles.srOnly} aria-live="polite">
        {tipText}
      </span>
    </div>
  )
}

export default TrendChart
