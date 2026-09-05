import ProjectCard from '../components/projects/ProjectCard'
import TestimonialCard from '../components/cards/TestimonialCard'
import TestimonialCarousel from '../components/home/TestimonialCarousel'
import { allProjects } from '../data/projects'
import { TESTIMONIALS } from '../data/testimonials'
import useMediaQuery from '../hooks/useMediaQuery'
import Hero from '../components/home/hero/Hero'
import HeroExplorer from '../components/home/hero/HeroExplorer'
import styles from './Home.module.css'

function Home() {
  // Phones get a swipeable carousel instead of the stacked column — three long
  // quotes end to end is a lot of scrolling for one section. Rendered as an
  // either/or (not CSS-hidden) so the quotes appear once in the DOM.
  const isPhone = useMediaQuery('(max-width: 767px)')

  return (
    <>
      {/* Production ships the hero as-is (halo light-field). In dev the
          explorer wraps it so we can keep iterating on the parked backdrops —
          the sky simulator especially. `import.meta.env.DEV` is a compile-time
          constant, so the explorer and its shader never reach the bundle. */}
      {import.meta.env.DEV ? <HeroExplorer /> : <Hero />}

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
          {isPhone ? (
            <TestimonialCarousel items={TESTIMONIALS} />
          ) : (
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
          )}
        </div>
      </section>
    </>
  )
}

export default Home
