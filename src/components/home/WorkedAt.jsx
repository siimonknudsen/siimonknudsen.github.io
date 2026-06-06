import { Reveal } from '../motion'
import { LenusLogo, ZliideLogo, AdtractionLogo } from './WorkedAtLogos'
import styles from './WorkedAt.module.css'

/**
 * WorkedAt — a quiet "Worked at" trust row beneath the hero (inspired by
 * bevel.health's "Works with"). Each company renders an inline logo component
 * (`Logo`, theme-aware via currentColor) when provided, otherwise a styled
 * text wordmark placeholder.
 */
const COMPANIES = [
  { name: 'Lenus', Logo: LenusLogo },
  { name: 'Zliide', Logo: ZliideLogo },
  { name: 'Adtraction', Logo: AdtractionLogo },
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
            company.Logo ? (
              <span
                key={company.name}
                className={styles.logoWrap}
                role="img"
                aria-label={company.name}
              >
                <company.Logo className={styles.logoSvg} />
              </span>
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
