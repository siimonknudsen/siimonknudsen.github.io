import Reveal from '../motion/Reveal'
import styles from './TestimonialCard.module.css'

/**
 * TestimonialCard — a flat quote block for the 3-up testimonials row.
 * `text` is an array of paragraphs (or a single string) so a long quote reads in
 * a natural rhythm instead of one wall of type. Logo slot accepts an inline
 * component (`logoNode`) or an image URL (`logo`); omit both for no logo.
 */
function TestimonialCard({ logo, logoNode, recommender, title, company, text, delay }) {
  const hasLogo = logoNode || logo
  const paragraphs = Array.isArray(text) ? text : [text]

  return (
    <Reveal as="figure" delay={delay} className={styles.card}>
      {hasLogo && (
        <div className={styles.logoRow}>
          {logoNode || <img src={logo} alt={company} className={styles.logoImg} />}
        </div>
      )}

      <blockquote className={styles.quote}>
        {paragraphs.map((p, i) => (
          <p key={i} className={styles.para}>
            {p}
          </p>
        ))}
      </blockquote>

      <figcaption className={styles.foot}>
        <span className={styles.name}>{recommender}</span>
        <span className={styles.role}>
          {title}
          {title && company ? ' · ' : ''}
          {company}
        </span>
      </figcaption>
    </Reveal>
  )
}

export default TestimonialCard
