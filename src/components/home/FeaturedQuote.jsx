import { Reveal } from '../motion'
import styles from './FeaturedQuote.module.css'

/**
 * FeaturedQuote — a single pulled quote set large in a frosted glass panel,
 * used as the lead of the Home testimonials section. The recommender's name
 * and role/company sit below in mono. Entrance via the owned motion layer.
 */
function FeaturedQuote({ quote, recommender, role }) {
  return (
    <Reveal preset="fade-up" as="figure" className={`glass-panel ${styles.panel}`}>
      <span aria-hidden="true" className={`text-accent ${styles.mark}`}>
        &ldquo;
      </span>
      <blockquote className={styles.quoteWrap}>
        <p className={`type-heading-sm text-color-primary ${styles.quote}`}>
          {quote}
        </p>
      </blockquote>
      <figcaption className={styles.caption}>
        <span className={`type-label font-mono text-color-primary ${styles.name}`}>
          {recommender}
        </span>
        <span className={`type-caption font-mono text-color-tertiary ${styles.role}`}>
          {role}
        </span>
      </figcaption>
    </Reveal>
  )
}

export default FeaturedQuote
