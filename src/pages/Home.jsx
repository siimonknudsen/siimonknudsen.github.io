import ProjectGrid from '../components/projects/ProjectGrid'
import { PrimaryButton, SecondaryButton } from '../components/buttons/Button'
import TestimonialCard from '../components/cards/TestimonialCard'
import HeroBackground from '../components/HeroBackground'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import AvailabilityPill from '../components/home/AvailabilityPill'
import StatBand from '../components/home/StatBand'
import WordReveal from '../components/home/WordReveal'
import { useReducedMotion } from '../components/motion'
import styles from './Home.module.css'

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
          <ScrollAnimation>
            <h2 className={`type-display text-color-primary ${styles.testimonialsHeading}`}>Testimonials</h2>
          </ScrollAnimation>
          <div className={styles.testimonialsGrid}>
            <TestimonialCard
              logo={null}
              recommender="Morten Møgelmose"
              title="CEO"
              company="Zliide"
              text="Simon has in his work for Zliide been focusing on the UI and UX of the Zliide platform consisting of several elements with various user journeys. In his work, Simon has shown an eager to learn the aspects of the company's product and customer journeys in order to find ways to improve it. Simon has worked along an experienced tech team where he quickly found his place and contributed to the overall product. Simon is characterized by his positive energy and willingness to learn. Therefore, Simon has my full recommendation."
            />
            <TestimonialCard
              logo={null}
              recommender="Frej Korsgaard"
              title="Head of Tech"
              company="Adservice"
              text="It's my pleasure to recommend Simon Knudsen as a future employee of your company. I have been working with Simon for 1,5 years at Adservice where I'm managing the tech department. Simon was filling the position of Design Student Worker and also had an internship at Adservice. He delivered satisfying designs and also assisted in frontend implementation. Here he showed skill, diversity and overall delivered good results. He's proactive, quality aware and a great guy. I'm positive that Simon's skills and personal qualities will make him an asset at your company, as he was at Adservice. Simon has my recommendations, and I hope this letter can assist you in adding him to your team. Feel free to contact me if you have any questions regarding the recommendation."
            />
            <TestimonialCard
              logo={null}
              recommender="Maria Louise Bendixen"
              title="Lecturer"
              company="Business Academy Aarhus"
              text="Simon has proven to be a very ambitious, curious, change-oriented and positive student. Both when it comes to individual projects and in larger group projects. He willingly takes on the role of leader, but is also very good at working as an integrated part of the group. He shows great understanding of how best to combine theory and practice. Not least in the UX/UI field, where he has also specialised further along the way. He often wants to know more, do more and look at both problem spaces and solutions from multiple angles to really find the right match between issues and solutions. At the same time, he has also taken on the role of tutor for our upcoming international team. He would bring value, teamwork and skills and I hope this recommendation shows that."
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
