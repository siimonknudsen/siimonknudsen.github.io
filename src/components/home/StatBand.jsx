import { Reveal, Stagger } from '../motion'
import styles from './StatBand.module.css'

/**
 * StatBand — a row of frosted-glass stat tiles between the hero and the project
 * grid. Each tile pairs a big number with a small label. Tiles cascade in via
 * the owned motion layer; wraps to a 2x2 grid on small screens.
 *
 * Pass `stats` to override; the defaults are believable PLACEHOLDERS the owner
 * should confirm/replace.
 */
const DEFAULT_STATS = [
  { value: '8+', label: 'Years of experience' },
  { value: '20+', label: 'Products shipped' },
  { value: '3', label: 'Design systems built' },
  { value: '100%', label: 'User-test win rate (Zliide)' },
]

function StatBand({ stats = DEFAULT_STATS }) {
  return (
    <Stagger className={styles.band}>
      {stats.map((stat) => (
        <Reveal
          key={stat.label}
          preset="fade-up"
          className={`glass ${styles.tile}`}
        >
          <span className={`type-display-sm text-color-primary ${styles.value}`}>
            {stat.value}
          </span>
          <span className={`type-caption text-color-secondary ${styles.label}`}>
            {stat.label}
          </span>
        </Reveal>
      ))}
    </Stagger>
  )
}

export default StatBand
