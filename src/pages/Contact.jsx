import { useState } from 'react'
import { Reveal } from '../components/motion'
import Location from '../components/Location'
import Button from '../components/buttons/Button'
import styles from './Contact.module.css'

const EMAIL = 'simonoverlund@hotmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/simon-knudsen/'

/**
 * Contact — editorial + simple. A glass form that composes a prefilled email
 * (mailto) so it works on a static host with no backend, plus a direct-email
 * fallback and the live location/availability chip. Sits over the global shader.
 */
function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      name ? `Message from ${name}` : 'Hello from your portfolio'
    )
    const body = encodeURIComponent(
      `${message}\n\n— ${name || 'Someone'}${email ? `\n${email}` : ''}`
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

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
            Whether it's a project, a question, or just a hello — drop me a line
            below or email me directly. I usually reply within a day.
          </p>
        </Reveal>

        {/* Glass form — composes a prefilled email via mailto */}
        <Reveal preset="fade-up" delay={160}>
          <form className={`glass-panel ${styles.form}`} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="c-name" className={`type-label ${styles.label}`}>
                Name
              </label>
              <input
                id="c-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="c-email" className={`type-label ${styles.label}`}>
                Email
              </label>
              <input
                id="c-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="you@email.com"
                autoComplete="email"
                inputMode="email"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="c-message" className={`type-label ${styles.label}`}>
                Message
              </label>
              <textarea
                id="c-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="What's on your mind?"
                rows={5}
                required
              />
            </div>

            <Button type="submit" variant="primary" className={styles.submit}>
              Send message
            </Button>
            <p className={`type-caption text-color-tertiary ${styles.formNote}`}>
              Opens your email app with the message ready to send.
            </p>
          </form>
        </Reveal>

        {/* Direct email + links */}
        <Reveal preset="fade-up" delay={240}>
          <div className={styles.direct}>
            <span className={`type-overline text-color-tertiary ${styles.directLabel}`}>
              Or reach me directly
            </span>
            <div className={styles.links}>
              <a href={`mailto:${EMAIL}`} className={styles.link}>
                {EMAIL}
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
            <div className={styles.meta}>
              <Location />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
