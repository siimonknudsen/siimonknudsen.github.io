import { Reveal, Stagger } from '../motion'
import styles from './StatBand.module.css'

/**
 * StatBand — a row of frosted-glass stat tiles between the hero and the project
 * grid. Each tile pairs a big number with a small label, plus an optional small
 * sub-note. Tiles cascade in via the owned motion layer; wraps to a 2x2 grid on
 * small screens.
 *
 * Pass `stats` to override. The defaults are the real, current numbers.
 */
const DEFAULT_STATS = [
  { value: '5', label: 'Years experience' },
  { value: '3', label: 'Companies' },
  { value: '3', label: 'Industries', sub: 'Health · Fashion · AdTech' },
  { value: '12', label: 'Projects shipped' },
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
          {stat.sub && (
            <span className={`type-overline font-mono text-color-tertiary ${styles.sub}`}>
              {stat.sub}
            </span>
          )}
        </Reveal>
      ))}
    </Stagger>
  )
}

export default StatBand
