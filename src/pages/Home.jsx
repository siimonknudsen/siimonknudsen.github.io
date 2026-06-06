import ProjectGrid from '../components/projects/ProjectGrid'
import { PrimaryButton, SecondaryButton } from '../components/buttons/Button'
import TestimonialCard from '../components/cards/TestimonialCard'
import HeroBackground from '../components/HeroBackground'
import AvailabilityPill from '../components/home/AvailabilityPill'
import StatBand from '../components/home/StatBand'
import WordReveal from '../components/home/WordReveal'
import FeaturedQuote from '../components/home/FeaturedQuote'
import LogoWall from '../components/home/LogoWall'
import { Reveal, useReducedMotion } from '../components/motion'
import styles from './Home.module.css'

// Featured pull-quote — the single strongest recommendation, set large.
const FEATURED = {
  quote:
    'Simon is characterized by his positive energy and willingness to learn. He quickly found his place on an experienced tech team and contributed to the overall product. He has my full recommendation.',
  recommender: 'Morten Møgelmose',
  role: 'CEO · Zliide',
}

// Compact secondary row — short pull-quotes reusing the existing TestimonialCard.
const SECONDARY = [
  {
    recommender: 'Frej Korsgaard',
    title: 'Head of Tech',
    company: 'Adservice',
    text: 'He delivered satisfying designs and assisted in frontend implementation, showing skill, diversity and good results. Proactive, quality-aware and a great guy — an asset to any team.',
  },
  {
    recommender: 'Maria Louise Bendixen',
    title: 'Lecturer',
    company: 'Business Academy Aarhus',
    text: 'A very ambitious, curious and change-oriented student who looks at problem spaces and solutions from multiple angles to find the right match between issues and solutions.',
  },
]

function Home() {
  const reduced = useReducedMotion()

  const scrollToContact = () => {
    const footer = document.querySelector('footer')
    if (!footer) return
    footer.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <>
      {/* Hero Section — shader behind → frosted light-stage card → content */}
      <section className={styles.hero}>
        <HeroBackground />

        <div className={styles.heroContent}>
          <div className={`glass-panel ${styles.heroCard}`}>
            {/* Availability pill */}
            <AvailabilityPill label="Available for work" />

            {/* Large Avatar */}
            <div className={`bg-surface-color-tertiary ${styles.avatar}`}>
              <img
                src={`${import.meta.env.BASE_URL}simon-virtual.png`}
                alt="Simon Knudsen"
                className={styles.avatarImg}
              />
            </div>

            {/* Eyebrow */}
            <p className={`type-overline text-color-tertiary ${styles.eyebrow}`}>
              Product Designer · Aarhus · Available
            </p>

            {/* Name */}
            <h1 className={`type-heading-sm text-color-primary ${styles.name}`}>
              Simon Knudsen
            </h1>

            {/* Description — word-by-word reveal */}
            <WordReveal
              as="p"
              text="Product designer turning complex problems into clear, human experiences"
              className={`type-display text-color-primary ${styles.description}`}
            />

            {/* Call-to-Action Buttons */}
            <div className={styles.ctaRow}>
              <PrimaryButton className={styles.cta} as="a" href="#projects">
                View projects
              </PrimaryButton>
              <SecondaryButton className={styles.cta} onClick={scrollToContact}>
                Contact
              </SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className={styles.statsSection}>
        <StatBand />
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.projectsSection}>
        <ProjectGrid />
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <Reveal as="header" className={styles.testimonialsHeader}>
            <p className={`type-overline font-mono text-color-tertiary ${styles.testimonialsOverline}`}>
              Testimonials
            </p>
            <h2 className={`type-display text-color-primary ${styles.testimonialsHeading}`}>
              What people say
            </h2>
          </Reveal>

          {/* Featured pulled quote — the strongest recommendation, set large */}
          <FeaturedQuote
            quote={FEATURED.quote}
            recommender={FEATURED.recommender}
            role={FEATURED.role}
          />

          {/* Logo wall — social proof from companies worked with */}
          <div className={styles.logoWallWrap}>
            <LogoWall />
          </div>

          {/* Compact secondary row of short quotes (each self-reveals) */}
          <div className={styles.secondaryGrid}>
            {SECONDARY.map((t) => (
              <TestimonialCard
                key={t.recommender}
                logo={null}
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
