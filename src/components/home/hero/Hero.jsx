import { Link } from 'react-router-dom'
import Button from '../../buttons/Button'
import WordReveal from '../WordReveal'
import WorkedAt from '../WorkedAt'
import Atmosphere from './Atmosphere'
import { Reveal } from '../../motion'
import styles from './Hero.module.css'

/**
 * Hero — the front page's opening. Statement type, a short lead and the two
 * CTAs, left-aligned in the page's content column, over the halo light-field.
 *
 * The type sizes are the design system's (32/36 headline · 14/20 lead · 14
 * button labels); the craft is in the relationships:
 *
 *  - Tonal emphasis INSIDE the headline: the connective phrase drops to the
 *    secondary ink so "Product designer" and the industries read first —
 *    hierarchy without a single extra element.
 *  - Spacing by grouping (Gestalt proximity): headline→lead is 20px (one line
 *    of the lead's own leading — same thought), lead→CTAs is 32px (a clear
 *    group boundary between message and action, without the drift 40 had).
 *  - Two measures, not one: the headline keeps its 513/1256 statement box,
 *    the lead caps at a true reading measure (~62ch).
 *
 * `backdrop` overrides the light-field — used ONLY by the dev-time
 * HeroExplorer to preview other atmospheres (pass `null` for a flat ground).
 * Production always gets the halo.
 */
function Hero({ backdrop }) {
  return (
    <section className={styles.hero}>
      {backdrop === undefined ? <Atmosphere preset="halo" /> : backdrop}

      <div className={styles.container}>
        <div className={styles.heroInner}>
          {/* Headline — word-by-word reveal: slower per-word rise (durationMs)
              and a wider cadence (stepMs) so each word settles calmly. The
              segments carry the tonal dim while staying one cascade. */}
          <WordReveal
            as="h1"
            segments={[
              { text: 'Product designer' },
              { text: 'with five years of experience across', className: styles.dim },
              { text: 'health tech, retail and adtech.' },
            ]}
            delayMs={300}
            stepMs={90}
            durationMs={900}
            className={styles.headline}
          />

          <Reveal as="p" preset="fade-up" immediate delay={900} className={styles.lead}>
            I take products from user research through UI, prototyping and testing to
            shipped front-end code — and build the design systems that keep them
            consistent, so ideas reach users faster and arrive intact.
          </Reveal>

          {/* `immediate` plays on MOUNT (a timed entrance) instead of on scroll —
              the CTAs sit below the scroll-observer's trigger line, so a scroll
              trigger would leave them stuck invisible. */}
          <Reveal preset="fade-up" immediate delay={1200} className={styles.ctaRow}>
            <Button variant="primary" size="sm" as="a" href="#projects">
              View projects
            </Button>
            <Button variant="secondary" size="sm" as={Link} to="/contact">
              Contact
            </Button>
          </Reveal>
        </div>
      </div>

      {/* Worked at — the tail of the hero cascade, and part of the hero
          opening so it sits the same distance from the copy above it as the
          projects sit from it. */}
      <WorkedAt revealDelay={1500} />
    </section>
  )
}

export default Hero
