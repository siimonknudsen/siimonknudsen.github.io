import ProjectGrid from '../components/projects/ProjectGrid'
import Button from '../components/buttons/Button'
import TestimonialCard from '../components/cards/TestimonialCard'
import HeroBackground from '../components/HeroBackground'
import WorkedAt from '../components/home/WorkedAt'
import WordReveal from '../components/home/WordReveal'
import { ZliideLogo } from '../components/home/WorkedAtLogos'
import adServiceLogo from '../assets/logos/ad-service.png'
import { Reveal, useReducedMotion } from '../components/motion'
import styles from './Home.module.css'

// Testimonials — three full, verbatim recommendations (sourced from About.jsx).
// Logos shown where available: Zliide (inline svg, theme-aware), Adservice
// (image on a white chip), Business Academy Aarhus has none.
const TESTIMONIALS = [
  {
    recommender: 'Morten Møgelmose',
    title: 'CEO',
    company: 'Zliide',
    logoNode: <ZliideLogo />,
    text:
      "Simon has in his work for Zliide been focusing on the UI and UX of the Zliide platform consisting of several elements with various user journeys. In his work, Simon has shown an eager to learn the aspects of the company's product and customer journeys in order to find ways to improve it. Simon has worked along an experienced tech team where he quickly found his place and contributed to the overall product. Simon is characterized by his positive energy and willingness to learn. Therefore, Simon has my full recommendation.",
  },
  {
    recommender: 'Frej Korsgaard',
    title: 'Head of Tech',
    company: 'Adservice',
    logo: adServiceLogo,
    text:
      "It's my pleasure to recommend Simon Knudsen as a future employee of your company. I have been working with Simon for 1,5 years at Adservice where I'm managing the tech department. Simon was filling the position of Design Student Worker and also had an internship at Adservice. He delivered satisfying designs and also assisted in frontend implementation. Here he showed skill, diversity and overall delivered good results. He's proactive, quality aware and a great guy. I'm positive that Simon's skills and personal qualities will make him an asset at your company, as he was at Adservice. Simon has my recommendations, and I hope this letter can assist you in adding him to your team. Feel free to contact me if you have any questions regarding the recommendation.",
  },
  {
    recommender: 'Maria Louise Bendixen',
    title: 'Lecturer',
    company: 'Business Academy Aarhus',
    text:
      'Simon has proven to be a very ambitious, curious, change-oriented and positive student. Both when it comes to individual projects and in larger group projects. He willingly takes on the role of leader, but is also very good at working as an integrated part of the group. He shows great understanding of how best to combine theory and practice. Not least in the UX/UI field, where he has also specialised further along the way. He often wants to know more, do more and look at both problem spaces and solutions from multiple angles to really find the right match between issues and solutions. At the same time, he has also taken on the role of tutor for our upcoming international team. He would bring value, teamwork and skills and I hope this recommendation shows that.',
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

        {/* Content sits directly over the shader — no card, left-aligned. */}
        <div className={styles.heroContent}>
          {/* Faded name kicker */}
          <p className={`type-body-lg text-color-tertiary ${styles.kicker}`}>
            Simon Knudsen
          </p>

          {/* Headline — word-by-word reveal, set large over the shader */}
          <WordReveal
            as="h1"
            text="Product designer turning complex problems into clear, human experiences"
            className={`text-color-primary ${styles.headline}`}
          />

          {/* Call-to-Action Buttons */}
          <div className={styles.ctaRow}>
            <Button variant="primary" className={styles.cta} as="a" href="#projects">
              View projects
            </Button>
            <Button variant="glass" className={styles.cta} onClick={scrollToContact}>
              Contact
            </Button>
          </div>
        </div>
      </section>

      {/* Worked at — trust row of past companies */}
      <WorkedAt />

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
              What people say
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
