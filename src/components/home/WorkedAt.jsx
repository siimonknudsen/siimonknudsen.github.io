import { Reveal } from '../motion'
import styles from './WorkedAt.module.css'

/**
 * WorkedAt — a quiet "Worked at" trust row beneath the hero (inspired by
 * bevel.health's "Works with"). Each company renders a real logo when one is
 * provided, otherwise a styled text wordmark placeholder that adapts to the
 * theme. Drop logo files in and set `logo` to swap them in.
 */
const COMPANIES = [
  { name: 'Lenus', logo: null },
  { name: 'Zliide', logo: null },
  { name: 'Adtraction', logo: null },
]

function WorkedAt({ companies = COMPANIES }) {
  if (!companies.length) return null

  return (
    <section className={styles.section} aria-label="Companies I've worked at">
      <Reveal preset="fade-up" className={styles.inner}>
        <p className={`type-overline font-mono text-color-tertiary ${styles.label}`}>
          Worked at
        </p>
        <div className={styles.logos}>
          {companies.map((company) =>
            company.logo ? (
              <img
                key={company.name}
                src={company.logo}
                alt={company.name}
                loading="lazy"
                className={styles.logoImg}
              />
            ) : (
              <span key={company.name} className={styles.wordmark}>
                {company.name}
              </span>
            )
          )}
        </div>
      </Reveal>
    </section>
  )
}

export default WorkedAt
