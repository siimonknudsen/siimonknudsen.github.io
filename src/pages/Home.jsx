import { Link } from 'react-router-dom'
import ProjectCard from '../components/projects/ProjectCard'
import Button from '../components/buttons/Button'
import TestimonialCard from '../components/cards/TestimonialCard'
import WorkedAt from '../components/home/WorkedAt'
import WordReveal from '../components/home/WordReveal'
import { Reveal } from '../components/motion'
import { allProjects } from '../data/projects'
import { TESTIMONIALS } from '../data/testimonials'
import styles from './Home.module.css'

function Home() {
  return (
    <>
      {/* Hero — statement type, a short lead and the two CTAs, all left-aligned
          in the page's content column. */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroInner}>
            {/* Headline — word-by-word reveal: slower per-word rise (durationMs)
                and a wider cadence (stepMs) so each word settles calmly. */}
            <WordReveal
              as="h1"
              text="Product designer turning complex problems into clear, human experiences."
              delayMs={300}
              stepMs={90}
              durationMs={900}
              className={styles.headline}
            />

            <Reveal as="p" preset="fade-up" immediate delay={900} className={styles.lead}>
              I&apos;m a Product Designer who&apos;s passionate about human psychology within
              digital products. I&apos;m experienced in crafting beautiful and user friendly
              designs that solves real business problems. I&apos;m specialized within UX Design,
              UI Design &amp; Design Systems.
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
            opening so it sits the same 128px from the copy above it as the
            projects sit from it. */}
        <WorkedAt revealDelay={1500} />
      </section>

      <section id="projects" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>Projects</h2>
          <div className={styles.projects}>
            {allProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                noMedia={project.noMedia}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>Testimonials</h2>
          <div className={styles.testimonials}>
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
