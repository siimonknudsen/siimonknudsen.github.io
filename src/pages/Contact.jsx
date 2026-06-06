import { Reveal } from '../components/motion'
import Location from '../components/Location'
import styles from './Contact.module.css'

const EMAIL = 'simonoverlund@hotmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/simon-knudsen/'

/**
 * Contact — a deliberately simple, editorial contact page (the proven pattern
 * for portfolios: one confident headline, one direct email, a couple of links).
 * Sits over the global shader; the email block is a frosted-glass card.
 */
function Contact() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal preset="fade-up">
          <h1 className={`type-display text-color-primary ${styles.headline}`}>
            Let's make something worth using.
          </h1>
        </Reveal>

        <Reveal preset="fade-up" delay={80}>
          <p className={`type-body-lg text-color-secondary ${styles.lede}`}>
            I'm open to product design roles and a little freelance on the side.
            The quickest way to reach me is email — I usually reply within a day.
          </p>
        </Reveal>

        <Reveal preset="fade-up" delay={160}>
          <div className={`glass-panel ${styles.card}`}>
            <span className={`type-overline text-color-tertiary ${styles.cardLabel}`}>
              Email me
            </span>
            <a href={`mailto:${EMAIL}`} className={styles.email}>
              {EMAIL}
            </a>
            <div className={styles.links}>
              <a href={`mailto:${EMAIL}`} className={styles.link}>
                Email <span aria-hidden="true">→</span>
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                LinkedIn <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal preset="fade-up" delay={240}>
          <div className={styles.meta}>
            <Location />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
