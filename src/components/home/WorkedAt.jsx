import { Reveal } from '../motion'
import { COMPANIES } from './companies'
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

function WorkedAt({ companies = COMPANIES, revealDelay = 0 }) {
  if (!companies.length) return null

  return (
    <section className={styles.section} aria-label="Companies I've worked at">
      {/* `immediate` plays on MOUNT, not on scroll — the row sits just below the
          scroll-observer's trigger line on the first screen, so the old scroll
          trigger left it stuck invisible at load. `revealDelay` lets Home tail it
          onto the hero cascade (after the CTAs). */}
      <Reveal preset="fade-up" immediate delay={revealDelay} className={styles.inner}>
        {/* On phones the row becomes a continuous marquee: the set is rendered
            twice so the track can loop seamlessly (the copy is decorative).
            On desktop the copy is display:none and the row just centres. */}
        <div className={styles.marquee}>
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
                    {company.model && (
                      <div className={styles.ttRow}>
                        <dt>Business model</dt>
                        <dd>{company.model}</dd>
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
          <div className={styles.duplicate} aria-hidden="true">
            {companies.map((company) => (
              <span
                key={company.name}
                className={styles.logoWrap}
                style={{ '--logo-scale': company.logoScale ?? 1 }}
              >
                {company.Logo ? (
                  <company.Logo className={styles.logoSvg} />
                ) : (
                  <span className={styles.wordmark}>{company.name}</span>
                )}
              </span>
            ))}
          </div>
        </div>
        </div>
      </Reveal>
    </section>
  )
}

export default WorkedAt
