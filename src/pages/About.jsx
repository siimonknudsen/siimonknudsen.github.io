import ScrollAnimation from '../components/animations/ScrollAnimation'
import { Reveal } from '../components/motion'
import LogoGrid from '../components/grids/LogoGrid'
import ImageGrid from '../components/grids/ImageGrid'
import SkillCard from '../components/cards/SkillCard'
import { AVATAR_SRC, onAvatarError } from '../lib/avatar'
import skill1 from '../assets/skills/skill-1.webp'
import skill2 from '../assets/skills/skill-2.webp'
import skill3 from '../assets/skills/skill-3.webp'
import skill4 from '../assets/skills/skill-4.webp'
import styles from './About.module.css'

// Simon's own roles and dates, newest first. Industry comes from the same
// source as the companies row. "Now", not "Present" — the read.cv/editorial
// convention ("Present" is LinkedIn vocabulary).
const EXPERIENCE = [
  {
    time: 'Mar 2025 — Now',
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
    time: 'Jan 2024 — Jul 2024',
    company: 'Freelance',
    role: 'Product Designer',
    industry: 'Freelance',
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

// Deliberately employer-agnostic: an About page outlives any one job, and a bio
// that leads with the current role reads as a LinkedIn summary and dates itself
// the moment he moves. Positioning, then range, then how he works — the current
// role is on the Experience table right below, where it belongs.
const BIO = [
  "I'm a product designer with five years of experience across health tech, fashion retail and affiliate marketing.",
  "I work end to end with product design — user research and journey mapping, UI, prototyping and user testing, then developer handoff and QA — on consumer apps, the internal tools teams run on, and the platforms behind both.",
  "I build and maintain the design systems that work sits on, and I write production-ready front-end code — this site included. That's why I care as much about what ships as what's in the file.",
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

  // Set revised against the LinkedIn record (2026-09-04). Three changes:
  //  - UX Research and User Testing were the same competency split in two —
  //    testing is a research method, not a peer discipline — which read as
  //    padding five skills out to eight. Merged.
  //  - UX Writing is gone: nothing in the role history evidences it, and the
  //    standard is that every skill listed resurfaces in a case study.
  //  - AI Product Design and Data-Heavy Interfaces added. The first is in
  //    Simon's own LinkedIn headline and is the Lena AI work; the second is a
  //    thread running through three employers (Zliide's brand dashboard and
  //    internal dashboard, the Lenus food diary, Adservice's self-service
  //    interface) that the old set never named.
  // Copy still names methods and tools rather than asserting outcomes.
  const skills = [
    {
      title: 'UX Design',
      description: 'User flows, information architecture and journey mapping — the structure before anything is drawn.'
    },
    {
      title: 'UI Design',
      description: 'Layout, type, colour and interaction states, built in Figma as components, not one-off screens.'
    },
    {
      title: 'Design Systems',
      description: 'Tokens, components and usage rules, kept in sync with the code that actually implements them.'
    },
    {
      title: 'Prototyping',
      description: 'Clickable and coded prototypes for testing flows and interaction detail before engineering commits.'
    },
    {
      title: 'User Research & Testing',
      description: 'Interviews, usability sessions and behavioural data behind each decision.'
    },
    {
      title: 'AI Product Design',
      description: 'Designing assistants and AI features into an existing product, where the output is probabilistic.'
    },
    {
      title: 'Data-Heavy Interfaces',
      description: 'Dashboards and reporting tools that make dense operational data quick to read and act on.'
    },
    {
      title: 'Frontend Development',
      description: 'React, CSS and design tokens. I implement my own work, so the detail survives to production.'
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
