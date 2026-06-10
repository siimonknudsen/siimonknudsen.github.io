import ProjectGrid from '../components/projects/ProjectGrid'
import Button from '../components/buttons/Button'
import TestimonialCard from '../components/cards/TestimonialCard'
import WorkedAt from '../components/home/WorkedAt'
import WordReveal from '../components/home/WordReveal'
import { Reveal } from '../components/motion'
import { Link } from 'react-router-dom'
import { TESTIMONIALS } from '../data/testimonials'
import styles from './Home.module.css'

function Home() {
  return (
    <>
      {/* Hero Section — content over the global fixed shader (in App shell). */}
      <section className={styles.hero}>
        {/* Content sits directly over the shader — no card, left-aligned. */}
        <div className={styles.heroContent}>
          {/* Cinematic first-load cascade: the hero elements enter one-by-one,
              slowly. Kicker first, then the headline flows in word-by-word
              (slower rise + wider cadence), then the CTAs. `immediate` plays each
              on MOUNT (a timed entrance) instead of on scroll — the CTAs sit below
              the scroll-observer's trigger line on a real laptop viewport, so the
              old scroll trigger left them stuck invisible (the user never scrolls
              the hero). Delays are tuned so each item begins as the previous lands. */}
          <Reveal as="p" preset="fade-up" immediate delay={150} className={`type-body-lg text-color-tertiary ${styles.kicker}`}>
            Simon Knudsen
          </Reveal>

          {/* Headline — word-by-word reveal: slower per-word rise (durationMs) and
              a wider cadence (stepMs) so each word settles calmly, one at a time. */}
          <WordReveal
            as="h1"
            text="Product designer turning complex problems into clear, human experiences"
            delayMs={500}
            stepMs={120}
            durationMs={900}
            className={`text-color-primary ${styles.headline}`}
          />

          {/* Call-to-Action Buttons — last in the cascade, on mount (immediate) */}
          <Reveal preset="fade-up" immediate delay={1700} className={styles.ctaRow}>
            <Button variant="primary" className={styles.cta} as="a" href="#projects">
              View projects
            </Button>
            <Button variant="glass" className={styles.cta} as={Link} to="/contact">
              Contact
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Worked at — trust row, tail of the hero cascade (after the CTAs at 1700) */}
      <WorkedAt revealDelay={2000} />

      {/* Projects Section — full-width cards that stack on scroll */}
      <section id="projects" className={styles.projectsSection}>
        <div className={styles.container}>
          <Reveal as="header" className={styles.projectsHeader}>
            <h2 className={`type-display text-color-primary ${styles.projectsHeading}`}>
              Selected projects
            </h2>
          </Reveal>
        </div>
        <ProjectGrid variant="stack" />
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <Reveal as="header" className={styles.testimonialsHeader}>
            <h2 className={`type-display text-color-primary ${styles.testimonialsHeading}`}>
              Testimonials
            </h2>
          </Reveal>

          {/* Three full recommendations, side by side */}
          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map((t) => (
              <TestimonialCard
                key={t.recommender}
                logo={t.logo}
                logoNode={t.logoNode}
                recommender={t.recommender}
                title={t.title}
                company={t.company}
                text={t.text}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
