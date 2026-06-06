import { Reveal, Stagger } from '../motion'
import OutcomeStat from './OutcomeStat'
import styles from './OutcomeGrid.module.css'

/**
 * OutcomeGrid — the Impact band: a row of OutcomeStats inside a glass panel.
 * Each stat cascades in via <Stagger>/<Reveal>.
 *
 * Props:
 *  - outcomes  array of { metric, label, note? }
 */
function OutcomeGrid({ outcomes }) {
  if (!outcomes || outcomes.length === 0) return null
  return (
    <Stagger className={`glass-panel border-glass ${styles.grid}`}>
      {outcomes.map((o, i) => (
        <Reveal key={i} preset="fade-up" className={styles.cell}>
          <OutcomeStat metric={o.metric} label={o.label} note={o.note} />
        </Reveal>
      ))}
    </Stagger>
  )
}

export default OutcomeGrid
