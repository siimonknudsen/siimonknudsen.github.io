import useReveal from '../motion/useReveal'
import useSpotlight from '../../hooks/useSpotlight'
import useCountUp from '../../hooks/useCountUp'
import Sparkline from './Sparkline'
import styles from './StatCard.module.css'

/**
 * StatCard — a single KPI on a frosted-glass surface.
 * Anatomy (research-backed): label → big value (tabular figures, calm count-up)
 * → delta (arrow + sign, never colour-alone) → optional sparkline. Depth comes
 * from the glass surface + cursor-spotlight glow + whitespace — never a border.
 * Reserve the warm accent for ONE thing per view (pass `accent` on the hero, or
 * let the sparkline carry it).
 *
 *  - label       metric name (kept short)
 *  - value       number (animates) or string (rendered as-is)
 *  - prefix/suffix   wrap the value, e.g. "$" / "%"
 *  - decimals    fixed places for a numeric value (default 0)
 *  - delta       signed % change as a number (e.g. 12.4 or -3.1)
 *  - deltaLabel  context for the delta, e.g. "vs last month"
 *  - data        number[] for an optional sparkline
 *  - accent      render the value in the warm accent (use sparingly — hero only)
 *  - delay       stagger offset (ms) when in a grid
 */
function StatCard({
  label,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  delta,
  deltaLabel,
  data,
  accent = false,
  delay,
}) {
  const { ref, isVisible } = useReveal()
  const onMouseMove = useSpotlight()
  const isNumeric = typeof value === 'number'
  const counted = useCountUp(isNumeric ? value : 0, isVisible)

  const display = isNumeric
    ? `${prefix}${counted.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`
    : value

  const hasDelta = typeof delta === 'number'
  const dir = hasDelta ? (delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat') : null
  const arrow = dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→'
  const deltaText = hasDelta ? `${arrow} ${delta > 0 ? '+' : ''}${delta}%` : null

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`glass group fx-reveal fx-fade-up ${isVisible ? 'is-visible' : ''} ${styles.card}`}
      style={delay != null ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <span className="fx-spotlight" aria-hidden="true" />
      <div className={styles.head}>
        {label && (
          <span className={`type-overline text-color-tertiary ${styles.label}`}>{label}</span>
        )}
        {deltaText && (
          <span
            className={`type-label ${styles.delta}`}
            data-dir={dir}
            title={deltaLabel}
          >
            {deltaText}
          </span>
        )}
      </div>

      <span
        className={`type-display-sm ${accent ? 'text-accent' : 'text-color-primary'} ${styles.value}`}
      >
        {display}
      </span>

      {deltaLabel && (
        <span className={`type-caption text-color-tertiary ${styles.deltaLabel}`}>{deltaLabel}</span>
      )}

      {Array.isArray(data) && data.length > 1 && (
        <div className={styles.spark}>
          <Sparkline data={data} active={isVisible} />
        </div>
      )}
    </div>
  )
}

export default StatCard
