import ScrollAnimation from '../animations/ScrollAnimation'
import useSpotlight from '../../hooks/useSpotlight'
import styles from './TestimonialCard.module.css'

/**
 * TestimonialCard — vertical quote card for the 3-up testimonials grid.
 * `text` is an array of paragraphs (or a single string) so a long quote reads in
 * a natural rhythm instead of one wall of type; the first paragraph is treated
 * as a brighter "lead line". A single low-opacity accent quotation glyph adds an
 * editorial touch. Logo slot accepts an inline component (`logoNode`) or an
 * image URL (`logo`); omit both for no logo.
 */
function TestimonialCard({ logo, logoNode, recommender, title, company, text }) {
  const hasLogo = logoNode || logo
  const paragraphs = Array.isArray(text) ? text : [text]
  const onSpotlight = useSpotlight()

  return (
    <ScrollAnimation>
      <figure
        className={`group glass-panel ${styles.card}`}
        onMouseMove={onSpotlight}
      >
        <span aria-hidden="true" className="fx-spotlight" />
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
            <p
              key={i}
              className={`type-body ${
                i === 0 ? styles.lead : 'text-color-secondary'
              } ${styles.para}`}
            >
              {p}
            </p>
          ))}
        </blockquote>

        <figcaption className={styles.foot}>
          <span className={`type-subtitle text-color-primary ${styles.name}`}>
            {recommender}
          </span>
          <span className={`type-body-sm text-color-tertiary ${styles.meta}`}>
            {title}
            {title && company ? ' · ' : ''}
            {company}
          </span>
        </figcaption>
      </figure>
    </ScrollAnimation>
  )
}

export default TestimonialCard
