import ScrollAnimation from '../animations/ScrollAnimation'
import styles from './TestimonialCard.module.css'

/**
 * TestimonialCard — vertical quote card for the 3-up testimonials grid.
 * Logo slot accepts either an inline component (`logoNode`, e.g. a currentColor
 * SVG) or an image URL (`logo`). Omit both for no logo.
 */
function TestimonialCard({ logo, logoNode, recommender, title, company, text }) {
  const hasLogo = logoNode || logo
  return (
    <ScrollAnimation>
      <figure className={`glass-panel ${styles.card}`}>
        {hasLogo && (
          <div className={styles.logoRow}>
            {logoNode || (
              <img src={logo} alt={company} className={styles.logoImg} />
            )}
          </div>
        )}

        <blockquote className={`type-body text-color-secondary ${styles.text}`}>
          {text}
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
