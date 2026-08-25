import Reveal from '../motion/Reveal'
import styles from './TestimonialCard.module.css'

/**
 * TestimonialCard — vertical quote card for the 3-up testimonials grid.
 * `text` is an array of paragraphs (or a single string) so a long quote reads in
 * a natural rhythm instead of one wall of type; the whole quote is set in the
 * secondary text colour. A single low-opacity accent quotation glyph adds an
 * editorial touch. Logo slot accepts an inline component (`logoNode`) or an
 * image URL (`logo`); omit both for no logo.
 */
function TestimonialCard({ logo, logoNode, recommender, title, company, text, delay }) {
  const hasLogo = logoNode || logo
  const paragraphs = Array.isArray(text) ? text : [text]
  // Placeholder avatar: initials from the recommender's name (no fabricated photo).
  const initials = (recommender || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    // Flat solid card — a tonal secondary surface (no glass, no border): reads as
    // a distinct panel against the page ground. Sizing/spacing mirrors Propane.
    <Reveal as="figure" delay={delay} className={styles.card}>
        {/* Single restrained accent touch — an oversized quotation glyph. */}
        <span aria-hidden="true" className={styles.quoteMark}>&ldquo;</span>

        {hasLogo && (
          <div className={styles.logoRow}>
            {logoNode || (
              <img src={logo} alt={company} className={styles.logoImg} />
            )}
          </div>
        )}

        <blockquote className={styles.quote}>
          {paragraphs.map((p, i) => (
            <p key={i} className={`type-body text-color-secondary ${styles.para}`}>
              {p}
            </p>
          ))}
        </blockquote>

        <figcaption className={styles.foot}>
          <span className={styles.avatar} aria-hidden="true">
            {initials}
          </span>
          <span className={styles.footMeta}>
            <span className="type-label text-color-primary">
              {recommender}
            </span>
            <span className="type-label text-color-secondary">
              {title}
              {title && company ? ' · ' : ''}
              {company}
            </span>
          </span>
        </figcaption>
    </Reveal>
  )
}

export default TestimonialCard
