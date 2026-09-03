import ScrollAnimation from '../components/animations/ScrollAnimation'
import { Reveal } from '../components/motion'
import LogoGrid from '../components/grids/LogoGrid'
import ImageGrid from '../components/grids/ImageGrid'
import SkillCard from '../components/cards/SkillCard'
import Button from '../components/buttons/Button'
import { AVATAR_SRC, onAvatarError } from '../lib/avatar'
import skill1 from '../assets/skills/skill-1.webp'
import skill2 from '../assets/skills/skill-2.webp'
import skill3 from '../assets/skills/skill-3.webp'
import skill4 from '../assets/skills/skill-4.webp'
import styles from './About.module.css'

// Inline download icon for the CV button — currentColor, no external deps.
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

// Simon's own roles and dates, newest first. Industry comes from the same
// source as the companies row.
const EXPERIENCE = [
  {
    time: 'Mar 2025 — Present',
    company: 'Lenus',
    role: 'Product Designer',
    industry: 'Health & fitness software',
  },
  {
    time: 'Aug 2024 — Jan 2025',
    company: 'Beefit',
    role: 'Product Designer',
    industry: 'Health & fitness software',
  },
  {
    time: 'May 2023 — Feb 2024',
    company: 'Zliide',
    role: 'Product Designer',
    industry: 'Fashion technology',
  },
  {
    time: 'Jan 2023 — Aug 2024',
    company: 'Freelance',
    role: 'Product Designer & Web Developer',
    industry: '',
  },
  {
    time: 'Jul 2021 — Apr 2023',
    company: 'Adservice',
    role: 'Product Designer',
    industry: 'Affiliate marketing',
  },
]

// The four card backgrounds, cycled across the eight skills the way the Figma
// grid alternates them.
const SKILL_BACKGROUNDS = [skill1, skill4, skill2, skill3, skill4, skill2, skill3, skill1]

const BIO = [
  "I'm a Product Designer who's passionate about human psychology within digital products.",
  "I'm experienced in crafting beautiful and user friendly designs that solves real business problems.",
  "I'm specialized within UX Design, UI Design & Design Systems.",
]

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
      description: 'Crafting intuitive and seamless user experiences through research, wireframing, and user journey mapping to enhance customer satisfaction, ensuring products meet user needs, ultimately leading to increased user retention and loyalty.'
    },
    {
      title: 'UI Design',
      description: 'Creating visually appealing interfaces that enhance user interaction and engagement, elevating brand perception and user engagement, driving conversion rates and customer satisfaction.'
    },
    {
      title: 'Design Systems',
      description: 'Establishing consistent design language and guidelines to ensure cohesive brand experiences, streamlining development processes, ensuring consistency and scalability across products, reducing time to market and development costs.'
    },
    {
      title: 'Prototyping',
      description: 'Building interactive prototypes to visualize and test design concepts before implementation, minimizing development risks by validating ideas early, saving time and resources while improving the quality of the final product.'
    },
    {
      title: 'UX Research',
      description: 'Conducting in-depth research to understand user needs, behaviors, and preferences, providing actionable insights into user behaviors and preferences, enabling companies to make informed decisions and prioritize features that matter most.'
    },
    {
      title: 'User Testing',
      description: 'Gathering feedback from real users to validate design decisions and improve usability, identifying usability issues and opportunities for improvement, resulting in higher conversion rates, lower churn, and increased customer satisfaction.'
    },
    {
      title: 'UX Writing',
      description: 'Crafting clear and concise content that guides users and enhances their experience, enhancing user comprehension and engagement, leading to clearer communication, improved task completion rates, and reduced support costs.'
    },
    {
      title: 'Frontend Development',
      description: 'Translating design concepts into functional web interfaces using HTML, CSS, and JavaScript, delivering seamless user experiences across devices, improving accessibility, and increasing customer satisfaction and retention.'
    }
  ]

  return (
    <>
      {/* Intro — label, portrait and bio placed on the 10-column grid */}
      <section id="about-me" className={styles.section}>
        <div className={`${styles.container} ${styles.intro}`}>
          <Reveal immediate className={styles.introLabel}>
            <h1 className={styles.label}>About</h1>
          </Reveal>

          <Reveal immediate delay={120} className={styles.portrait}>
            <img
              src={AVATAR_SRC}
              onError={onAvatarError}
              alt="Simon Knudsen"
              className={styles.portraitImg}
            />
          </Reveal>

          <Reveal immediate delay={240} className={styles.bio}>
            {BIO.map((paragraph) => (
              <p key={paragraph} className={styles.bioText}>
                {paragraph}
              </p>
            ))}
            <div className={styles.bioCta}>
              <Button
                as="a"
                href={`${import.meta.env.BASE_URL}simon-knudsen-cv.pdf`}
                download
                variant="secondary"
                size="sm"
                iconLeft={<DownloadIcon />}
              >
                Download CV (PDF)
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience — a quiet four-column table in the right half */}
      <section id="experience" className={styles.section}>
        <div className={`${styles.container} ${styles.experience}`}>
          <ScrollAnimation className={styles.experienceLabel}>
            <h2 className={styles.label}>Experience</h2>
          </ScrollAnimation>

          <ScrollAnimation className={styles.table}>
            <div className={styles.tableGrid}>
              <div className={styles.tableHead}>
                <span>Time</span>
                <span>Company</span>
                <span>Role</span>
                <span>Industry</span>
              </div>
              {EXPERIENCE.map((job) => (
                <div key={job.company + job.time} className={styles.tableRow}>
                  <span>{job.time}</span>
                  <span>{job.company}</span>
                  <span>{job.role}</span>
                  <span>{job.industry}</span>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Skills — 4-up cards on the inverted surface */}
      <section id="skills" className={styles.section}>
        <div className={styles.container}>
          <ScrollAnimation>
            <h2 className={styles.label}>Skills</h2>
          </ScrollAnimation>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                title={skill.title}
                description={skill.description}
                image={SKILL_BACKGROUNDS[index % SKILL_BACKGROUNDS.length]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Companies — the same quiet wordmark row as the front page */}
      <section id="companies" className={styles.section}>
        <div className={styles.container}>
          <ScrollAnimation>
            <h2 className={styles.label}>Companies I&apos;ve designed for</h2>
          </ScrollAnimation>
          <div className={styles.companies}>
            <LogoGrid logos={companies} columns={5} gap="4" />
          </div>
        </div>
      </section>

      {/* Pictures */}
      <section id="pictures" className={styles.section}>
        <div className={styles.container}>
          <ScrollAnimation>
            <h2 className={styles.label}>Pictures</h2>
          </ScrollAnimation>
          <div className={styles.pictures}>
            <ImageGrid images={aboutImages} columns={5} gap="2" aspectRatio="9/16" />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
