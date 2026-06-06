import { Reveal } from '../motion'
import { LenusLogo, BeefitLogo, ZliideLogo, AdtractionLogo } from './WorkedAtLogos'
import styles from './WorkedAt.module.css'

/**
 * WorkedAt — a quiet "Worked at" trust row beneath the hero. Each company shows
 * an inline logo (theme-aware via currentColor); hovering / focusing a logo
 * reveals a small card with role, industry, team size (and period when set).
 *
 * NOTE: `period` is supplied by Simon (real dates). `industry`/`size` are
 * best-effort and easy to correct; we don't invent employment data.
 * Order = most recent first.
 *
 * LOGO BALANCE RULE (always apply): every logo MUST read at the same *optical*
 * size in the row, not the same pixel height. Logos differ in proportion
 * (wordmark x-height, ascenders, icon density), so each gets a `logoScale`
 * multiplier on the shared base height to even them out. When adding/replacing
 * a logo, tune its `logoScale` against the others in-browser until the visual
 * weight matches — don't leave it at 1. Current: Lenus 1 · Beefit 1.12 ·
 * Zliide 0.7 · Adtraction 0.9.
 */
const COMPANIES = [
  {
    name: 'Lenus',
    Logo: LenusLogo,
    industry: 'Health & fitness software',
    size: '300+',
    website: 'lenus.io',
    logoScale: 1, // per-logo optical balance (these logos differ in proportion)
    period: '2025 — Present',
  },
  {
    name: 'Beefit',
    Logo: BeefitLogo,
    industry: 'Health & fitness software',
    size: '10+',
    website: 'beefit.io',
    logoScale: 1.12, // optical balance — see logoScale rule in the COMPANIES note
    period: '2024 — 2025',
  },
  {
    name: 'Zliide',
    Logo: ZliideLogo,
    industry: 'Fashion technology',
    size: '10+',
    website: '', // Zliide no longer exists
    logoScale: 0.7,
    period: '2023 — 2024',
  },
  {
    name: 'Adtraction',
    Logo: AdtractionLogo,
    industry: 'Affiliate marketing',
    size: '30+',
    website: 'adtraction.com',
    logoScale: 0.9,
    period: '2021 — 2023',
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
              <div
                key={company.name}
                className={styles.companyChip}
                style={{ '--logo-scale': company.logoScale ?? 1 }}
              >
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
                  {company.Logo ? (
                    <span className={styles.ttLogo} aria-hidden="true">
                      <company.Logo />
                    </span>
                  ) : (
                    <p className={styles.ttName}>{company.name}</p>
                  )}
                  <dl className={styles.ttList}>
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
                        <dt>Company size</dt>
                        <dd>{company.size}</dd>
                      </div>
                    )}
                    {company.website && (
                      <div className={styles.ttRow}>
                        <dt>Website</dt>
                        <dd>
                          <a
                            className={styles.ttLink}
                            href={`https://${company.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {company.website}
                          </a>
                        </dd>
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
