import TestimonialCard from '../components/cards/TestimonialCard'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import { Reveal } from '../components/motion'
import LogoGrid from '../components/grids/LogoGrid'
import ImageGrid from '../components/grids/ImageGrid'
import SkillCard from '../components/cards/SkillCard'
import PrinciplesList from '../components/about/PrinciplesList'
import RecognitionStrip from '../components/about/RecognitionStrip'
import Button from '../components/buttons/Button'
import styles from './About.module.css'

// Inline download icon for the intro CTA — currentColor, no external deps.
function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

function About() {
  // Automatically load all logos from src/assets/logos/ folder
  // Just add your logo files to that folder - no need to update this code!
  // Supports: .png, .jpg, .jpeg, .svg, .webp
  const logoModules = import.meta.glob('../assets/logos/*.{png,jpg,jpeg,svg,webp}', { 
    eager: true,
    import: 'default'
  })
  
  // Convert imported modules to an array of logo URLs, sorted by filename
  const companies = Object.entries(logoModules)
    .map(([path, url]) => ({
      path,
      url,
      filename: path.split('/').pop()
    }))
    .sort((a, b) => a.filename.localeCompare(b.filename))
    .map(item => item.url)

  // Automatically load all images from src/assets/about-images/ folder
  // Just add your images to that folder - no need to update this code!
  // Supports: .jpg, .jpeg, .png, .webp, .gif
  const imageModules = import.meta.glob('../assets/about-images/*.{jpg,jpeg,png,webp,gif}', { 
    eager: true,
    import: 'default'
  })
  
  // Convert imported modules to an array of image URLs, sorted by filename
  const aboutImages = Object.entries(imageModules)
    .map(([path, url]) => ({
      path,
      url,
      filename: path.split('/').pop()
    }))
    .sort((a, b) => a.filename.localeCompare(b.filename))
    .map(item => item.url)

  const skills = [
    {
      title: 'UX Design',
      description: 'I map the user journey, then shape flows and structure so people reach what they came for without friction.'
    },
    {
      title: 'UI Design',
      description: 'I design interfaces that are clean, considered and consistent — every state and edge case accounted for.'
    },
    {
      title: 'Design Systems',
      description: 'I build tokenised component libraries so teams ship faster and the product stays coherent as it grows.'
    },
    {
      title: 'Prototyping',
      description: 'I prototype interactions in Figma and code to test ideas with real behaviour before a line is built.'
    },
    {
      title: 'UX Research',
      description: 'I run interviews and analyse behaviour to ground design decisions in what users actually do.'
    },
    {
      title: 'User Testing',
      description: 'I put designs in front of real users, watch where they struggle, and iterate on the evidence.'
    },
    {
      title: 'UX Writing',
      description: 'I write the words in the interface — labels, empty states, errors — so the product speaks plainly.'
    },
    {
      title: 'Frontend Development',
      description: 'I build my designs in HTML, CSS and React, so handoff is clean and the result matches the intent.'
    }
  ]

  return (
    <>
      {/* First Section - Headshot and Introduction */}
      <section id="about-me" className={styles.heroSection}>
        <div className={styles.heroInner}>
          <Reveal>
            <p className={`type-overline font-mono text-color-tertiary ${styles.overline}`}>
              01 — About me
            </p>
          </Reveal>

          {/* Headshot */}
          <ScrollAnimation>
            <div className={`bg-surface-color-tertiary ${styles.headshot}`}>
              <img
                src={`${import.meta.env.BASE_URL}simon-virtual.png`}
                alt="Simon Knudsen"
                className={styles.headshotImg}
              />
            </div>
          </ScrollAnimation>

          {/* Introduction Text */}
          <ScrollAnimation>
            <p className={`type-body-lg text-color-secondary ${styles.intro}`}>
              I'm a Product Designer who's passionate about human psychology within digital products. I'm experienced in crafting beautiful and user friendly designs that solves real business problems. I'm specialized within UX Design, UI Design & Design Systems.
            </p>
          </ScrollAnimation>

          <Reveal>
            <div className={styles.introCta}>
              <Button
                as="a"
                href={`${import.meta.env.BASE_URL}simon-knudsen-cv.pdf`}
                download
                variant="secondary"
                iconLeft={<DownloadIcon />}
              >
                Download CV (PDF)
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Second Section - Mission Statement */}
      <section className={styles.fullSection}>
        <div className={`bg-surface-color-secondary ${styles.missionPanel}`}>
          <ScrollAnimation>
            <p className={`type-display text-color-primary ${styles.missionText}`}>
              Making the world of digital products more user friendly, one product at a time.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Section - How I work (Design principles) */}
      <section id="principles" className={styles.anchorSection}>
        <div className={styles.inner}>
          <Reveal>
            <p className={`type-overline font-mono text-color-tertiary ${styles.overline}`}>
              02 — How I work
            </p>
          </Reveal>
          <Reveal>
            <h2 className={`type-display text-color-primary ${styles.heading12}`}>Principles I design by</h2>
          </Reveal>
          <PrinciplesList />
        </div>
      </section>

      {/* Third Section - Companies */}
      <section id="companies" className={styles.anchorSection}>
        <div className={styles.inner}>
          {/* Companies Section */}
          <div>
            <Reveal>
              <p className={`type-overline font-mono text-color-tertiary ${styles.overline}`}>
                03 — Companies
              </p>
            </Reveal>
            <ScrollAnimation>
              <h2 className={`type-subtitle text-color-primary ${styles.heading8}`}>Companies i've done design for</h2>
            </ScrollAnimation>
            <LogoGrid logos={companies} columns={7} gap="1" />
          </div>
        </div>
      </section>

      {/* Fourth Section - Detailed Skills */}
      <section id="skills" className={styles.anchorSection}>
        <div className={styles.inner}>
          <Reveal>
            <p className={`type-overline font-mono text-color-tertiary ${styles.overline}`}>
              04 — Skills
            </p>
          </Reveal>
          <ScrollAnimation>
            <h2 className={`text-color-primary ${styles.skillsHeading}`}>Skills</h2>
          </ScrollAnimation>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                title={skill.title}
                description={skill.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fifth Section - Testimonials */}
      <section id="testimonials" className={styles.anchorSection}>
        <div className={styles.inner}>
          <Reveal>
            <p className={`type-overline font-mono text-color-tertiary ${styles.overline}`}>
              05 — Testimonials
            </p>
          </Reveal>
          <ScrollAnimation>
            <h2 className={`type-display text-color-primary ${styles.heading12}`}>Testimonials</h2>
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

      {/* Sixth Section - Recognition */}
      <section id="recognition" className={styles.anchorSection}>
        <div className={styles.inner}>
          <Reveal>
            <p className={`type-overline font-mono text-color-tertiary ${styles.overline}`}>
              06 — Recognition
            </p>
          </Reveal>
          <ScrollAnimation>
            <h2 className={`type-display text-color-primary ${styles.heading12}`}>Awards, features & speaking</h2>
          </ScrollAnimation>
          <RecognitionStrip />
        </div>
      </section>

      {/* Seventh Section - Pictures */}
      <section id="pictures" className={styles.anchorSection}>
        <div className={styles.inner}>
          <Reveal>
            <p className={`type-overline font-mono text-color-tertiary ${styles.overline}`}>
              07 — Pictures
            </p>
          </Reveal>
          <ScrollAnimation>
            <h2 className={`type-display text-color-primary ${styles.heading12}`}>A Picture Is Worth a Thousand Words</h2>
          </ScrollAnimation>
          <ImageGrid images={aboutImages} columns={4} gap="1" aspectRatio="9/16" />
        </div>
      </section>
    </>
  )
}

export default About

