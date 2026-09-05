import { HERO_VARIANTS } from './heroVariantList'
import styles from './HeroSwitcher.module.css'

/**
 * HeroSwitcher — a small floating glass pill (bottom-right) for flipping
 * between the hero explorations live. Exploration chrome only, meant for
 * review on this branch — remove (or gate) before this ever ships to main.
 * Text-only triggers per the nav convention; glass because it's floating
 * chrome. When the Sky 24h variant is active, a second pill exposes the
 * hour scrubber (onSkyHour set = show it): drag through the whole day,
 * "Now" snaps back to the clock.
 */

function HeroSwitcher({ active, onChange, skyHour, onSkyHour }) {
  const now = new Date()
  const clockHour = now.getHours() + now.getMinutes() / 60
  const hourValue = skyHour ?? clockHour
  const hh = String(Math.floor(hourValue)).padStart(2, '0')
  const mm = String(Math.floor((hourValue % 1) * 60)).padStart(2, '0')

  return (
    <div className={styles.stack}>
      {onSkyHour ? (
        <div className={`glass-panel ${styles.switcher}`} role="group" aria-label="Sky time of day">
          <span className={styles.label}>{hh}:{mm}</span>
          <input
            type="range"
            min="0"
            max="24"
            step="0.1"
            value={hourValue}
            onChange={(e) => onSkyHour(Number(e.target.value))}
            className={styles.scrubber}
            aria-label="Hour of day"
          />
          <button
            type="button"
            className={skyHour == null ? styles.optionActive : styles.option}
            onClick={() => onSkyHour(null)}
          >
            Now
          </button>
        </div>
      ) : null}

      <div className={`glass-panel ${styles.switcher}`} role="group" aria-label="Hero variant">
        <span className={styles.label}>Hero</span>
        {HERO_VARIANTS.map((variant) => (
          <button
            key={variant.id}
            type="button"
            className={active === variant.id ? styles.optionActive : styles.option}
            aria-pressed={active === variant.id}
            onClick={() => onChange(variant.id)}
          >
            {variant.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default HeroSwitcher
