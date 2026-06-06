import ScrollAnimation from '../animations/ScrollAnimation'
import styles from './ExperienceTimeline.module.css'

// Helper function to calculate duration between two dates
function calculateDuration(startDateStr, endDateStr) {
  const months = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  }
  
  const parseDate = (dateStr) => {
    if (dateStr === 'Present') {
      return new Date()
    }
    const [month, year] = dateStr.split(' ')
    return new Date(parseInt(year), months[month])
  }
  
  const start = parseDate(startDateStr)
  const end = parseDate(endDateStr)
  
  // Calculate total months difference
  let totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  // Add 1 to include both start and end months
  totalMonths += 1
  
  const years = Math.floor(totalMonths / 12)
  const remainingMonths = totalMonths % 12
  
  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
  }
}

// Company logos - using initials/colors as fallback for reliable display
// You can replace these with actual imported logos from your assets folder
const companyLogos = {
  lenus: null,      // Will use gradient with initial
  beefit: null,     // Will use gradient with initial
  freelance: null,  // Will use gradient with initial
  zliide: null,     // Will use gradient with initial
  adtraction: null  // Will use gradient with initial
}

const experiences = [
  {
    id: 1,
    company: 'Lenus',
    logo: companyLogos.lenus,
    colorKey: 'lenus',
    roles: [
      {
        title: 'Product Designer',
        type: 'Full-time',
        startDate: 'Mar 2025',
        endDate: 'Present',
        current: true
      },
      {
        title: 'Junior Product Designer',
        type: 'Full-time',
        startDate: 'Aug 2024',
        endDate: 'Feb 2025',
        current: false
      }
    ],
    description: 'Designing the world\'s leading online health coaching platform. Doing end-to-end design tasks from user research to design, user testing, developer hand-off, and quality assurance, driving a cohesive design vision for company solutions. Focusing on improving coach acquisition, coach productivity, coach lifetime & coach growth.',
    totalDuration: '1 year 6 months'
  },
  {
    id: 2,
    company: 'Beefit',
    logo: companyLogos.beefit,
    colorKey: 'beefit',
    roles: [
      {
        title: 'Product Designer',
        type: 'Full-time',
        startDate: 'Aug 2024',
        endDate: 'Jan 2025',
        current: false
      }
    ],
    description: 'Acquired by Lenus. Led end-to-end design tasks from user research to design, user testing, developer hand-off, and quality assurance, driving a cohesive design vision for company solutions. Designed custom app experiences and websites for some of the world\'s largest health and fitness influencers as well as small and medium sized coaches.',
    totalDuration: '6 months',
    badge: 'Acquired by Lenus'
  },
  {
    id: 3,
    company: 'Freelance',
    logo: companyLogos.freelance,
    colorKey: 'freelance',
    roles: [
      {
        title: 'Product Designer & Web Developer',
        type: 'Freelance',
        startDate: 'Jan 2023',
        endDate: 'Aug 2024',
        current: false
      }
    ],
    description: 'Independently managed and executed a diverse range of small and medium-sized projects within design and development for various companies and organizations.',
    totalDuration: '1 year 8 months'
  },
  {
    id: 4,
    company: 'Zliide',
    logo: companyLogos.zliide,
    colorKey: 'zliide',
    roles: [
      {
        title: 'Product Designer',
        type: 'Part-time',
        startDate: 'May 2023',
        endDate: 'Feb 2024',
        current: false
      }
    ],
    description: 'Led end-to-end design tasks from user research to design, user testing, developer hand-off, and quality assurance. Designed and implemented Zliide.com, significantly enhancing SEO, engagement, and conversion rates. Designed an in-store ordering app for mobile and tablet, increasing monthly store revenue by 6%.',
    totalDuration: '10 months'
  },
  {
    id: 5,
    company: 'Adservice',
    logo: companyLogos.adtraction,
    colorKey: 'adtraction',
    roles: [
      {
        title: 'Product Designer',
        type: 'Part-time',
        startDate: 'Jul 2021',
        endDate: 'Apr 2023',
        current: false
      }
    ],
    description: 'Led end-to-end design tasks from user research to design, user testing, developer hand-off, and quality assurance. Designed and implemented Adservice.com, significantly enhancing SEO, engagement, and conversion rates. Designed a self-service interface for affiliate advertisers and gamification contest sites for telecom campaigns.',
    totalDuration: '1 year 10 months',
    badge: 'Acquired by Adtraction'
  }
]

// Helper function to extract year from date string
function getYearFromDate(dateStr) {
  if (dateStr === 'Present') {
    return new Date().getFullYear()
  }
  const [, year] = dateStr.split(' ')
  return parseInt(year)
}

function ExperienceCard({ experience, index, yearLabel }) {
  const isLast = index === experiences.length - 1

  // Get the overall date range for the company
  const companyStartDate = experience.roles[experience.roles.length - 1].startDate
  const companyEndDate = experience.roles[0].endDate

  return (
    <div className={styles.row}>
      {/* Column 1: Year label */}
      <div className={styles.yearCol}>
        {yearLabel && (
          <span className={`text-color-secondary ${styles.yearLabel}`}>
            {yearLabel}
          </span>
        )}
      </div>

      {/* Column 2: Timeline dot and line */}
      <div className={styles.timelineCol}>
        {/* Dot with glow effect for current role */}
        <div className={`
          ${styles.dot}
          ${experience.roles[0].current
            ? `bg-accent pulse-glow ${styles.dotCurrent}`
            : `bg-surface-color-tertiary border-color-secondary ${styles.dotPast}`
          }
        `}>
          {experience.roles[0].current && (
            <div className={`bg-accent ${styles.ping}`} />
          )}
        </div>

        {/* Connecting line */}
        {!isLast && (
          <div className={styles.line} />
        )}
      </div>

      {/* Columns 3-5: Content card (spans 3 columns) */}
      <div className={styles.contentCol}>
        <ScrollAnimation>
          <div className={`bg-surface-color-secondary ${styles.card}`}>
            {/* Header Row: Logo, Company info column */}
            <div className={styles.header}>
              {/* Logo */}
              <div className={`
                ${styles.logo}
                ${experience.logo ? styles.logoBackplate : 'bg-surface-color-tertiary'}
              `}>
                {experience.logo ? (
                  <img
                    src={experience.logo}
                    alt={experience.company}
                    className={styles.logoImg}
                  />
                ) : (
                  <span className={`text-color-primary ${styles.logoInitial}`}>
                    {experience.company.charAt(0)}
                  </span>
                )}
              </div>

              {/* Company info column */}
              <div className={styles.companyInfo}>
                <div className={styles.companyNameRow}>
                  <h3 className={`text-color-primary ${styles.companyName}`}>
                    {experience.company}
                  </h3>
                  {/* Badge */}
                  {experience.badge && (
                    <span className={`type-caption text-accent bg-accent-soft ${styles.badge}`}>
                      {experience.badge}
                    </span>
                  )}
                </div>

                <div className={`text-color-secondary ${styles.companyMeta}`}>
                  <span>{companyStartDate} – {companyEndDate}</span>
                  <span className={`text-color-secondary ${styles.metaDivider}`}>·</span>
                  <span>{experience.totalDuration}</span>
                </div>
              </div>
            </div>

            {/* Roles */}
            <div className={styles.roles}>
              {experience.roles.map((role, roleIndex) => (
                <div key={roleIndex} className={styles.role}>
                  {/* Role title */}
                  <div className={styles.roleTitleRow}>
                    <span className={`text-color-primary ${styles.roleTitle}`}>
                      {role.title}
                    </span>
                    {role.current && (
                      <span className={`type-caption text-accent ${styles.currentBadge}`}>
                        <span className={`bg-accent ${styles.currentDot}`} />
                        Current
                      </span>
                    )}
                  </div>
                  {/* Role dates and duration */}
                  <div className={`text-color-secondary ${styles.roleMeta}`}>
                    <span>{role.startDate} – {role.endDate}</span>
                    <span className={`text-color-secondary ${styles.metaDivider}`}>·</span>
                    <span>{calculateDuration(role.startDate, role.endDate)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}

function ExperienceTimeline() {
  // Track which labels have been shown
  const shownLabels = new Set()
  
  // Calculate year label for each experience
  const experiencesWithYears = experiences.map((experience) => {
    // Check if this experience has a current role
    const isCurrent = experience.roles[0].current
    
    // Get the start year of the earliest role
    const startDate = experience.roles[experience.roles.length - 1].startDate
    const startYear = getYearFromDate(startDate)
    
    let yearLabel = null
    
    if (isCurrent && !shownLabels.has('Today')) {
      // Show "Today" for current roles
      yearLabel = 'Today'
      shownLabels.add('Today')
    } else {
      // For past experiences, show the year they started (minimum 2021)
      const displayYear = Math.max(startYear, 2021)
      if (!shownLabels.has(displayYear)) {
        yearLabel = displayYear.toString()
        shownLabels.add(displayYear)
      }
    }
    
    return { ...experience, yearLabel }
  })

  return (
    <div className={styles.section}>
      {/* Section header */}
      <ScrollAnimation>
        <h2 className={`text-color-primary ${styles.sectionTitle}`}>
          Experience
        </h2>
      </ScrollAnimation>

      {/* Timeline */}
      <div className={styles.timeline}>
        {experiencesWithYears.map((experience, index) => (
          <ExperienceCard 
            key={experience.id} 
            experience={experience} 
            index={index}
            yearLabel={experience.yearLabel}
          />
        ))}
      </div>
    </div>
  )
}

export default ExperienceTimeline

