import { Reveal } from '../motion'
import { LenusLogo, ZliideLogo, AdtractionLogo } from './WorkedAtLogos'
import styles from './WorkedAt.module.css'

/**
 * WorkedAt — a quiet "Worked at" trust row beneath the hero. Each company shows
 * an inline logo (theme-aware via currentColor); hovering / focusing a logo
 * reveals a small card with role, industry, team size (and period when set).
 *
 * NOTE: `size` values are confirmed by Simon; `industry`/`role` are best-effort
 * (easy to correct) and `period` is intentionally left blank until he supplies
 * real start/end dates — we don't invent employment dates.
 */
const COMPANIES = [
  {
    name: 'Lenus',
    Logo: LenusLogo,
    industry: 'Health & fitness software',
    role: 'Product Designer',
    size: '300+',
    period: '', // e.g. '2023 — Present'
  },
  {
    name: 'Zliide',
    Logo: ZliideLogo,
    industry: 'Retail technology',
    role: 'Product Designer',
    size: '10+',
    period: '',
  },
  {
    name: 'Adtraction',
    Logo: AdtractionLogo,
    industry: 'Affiliate marketing',
    role: 'Designer',
    size: '30+',
    period: '',
  },
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
          {companies.map((company) => {
            const id = `worked-at-${company.name.toLowerCase()}`
            return (
              <div key={company.name} className={styles.companyChip}>
                <span
                  className={styles.logoWrap}
                  role="img"
                  aria-label={company.name}
                  tabIndex={0}
                  aria-describedby={id}
                >
                  {company.Logo ? (
                    <company.Logo className={styles.logoSvg} />
                  ) : (
                    <span className={styles.wordmark}>{company.name}</span>
                  )}
                </span>

                {/* Hover / focus card */}
                <div id={id} role="tooltip" className={`glass-panel ${styles.tooltip}`}>
                  <p className={styles.ttName}>{company.name}</p>
                  <dl className={styles.ttList}>
                    {company.role && (
                      <div className={styles.ttRow}>
                        <dt>Role</dt>
                        <dd>{company.role}</dd>
                      </div>
                    )}
                    {company.industry && (
                      <div className={styles.ttRow}>
                        <dt>Industry</dt>
                        <dd>{company.industry}</dd>
                      </div>
                    )}
                    {company.period && (
                      <div className={styles.ttRow}>
                        <dt>Period</dt>
                        <dd>{company.period}</dd>
                      </div>
                    )}
                    {company.size && (
                      <div className={styles.ttRow}>
                        <dt>Team size</dt>
                        <dd>{company.size}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

export default WorkedAt
