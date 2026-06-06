import ScrollAnimation from '../animations/ScrollAnimation'
import styles from './TestimonialCard.module.css'

function TestimonialCard({ logo, recommender, title, company, text }) {
  return (
    <ScrollAnimation>
      <div className={`glass-panel ${styles.card}`}>
      {/* Logo and Recommender Info */}
      <div className={styles.header}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <div className={styles.logo}>
            {logo ? (
              <img src={logo} alt={company} className={styles.logoImg} />
            ) : (
              <div className={`bg-surface-color-tertiary ${styles.logoPlaceholder}`}></div>
            )}
          </div>
        </div>

        {/* Recommender Info - Vertical Column */}
        <div className={styles.info}>
          <p className={`type-subtitle text-color-primary ${styles.name}`}>{recommender}</p>
          <p className={`type-body text-color-secondary ${styles.meta}`}>{title}</p>
          <p className={`type-body text-color-secondary ${styles.meta}`}>{company}</p>
        </div>
      </div>

      {/* Testimonial Text */}
      <p className={`type-body text-color-secondary ${styles.text}`}>
        {text}
      </p>
      </div>
    </ScrollAnimation>
  )
}

export default TestimonialCard

