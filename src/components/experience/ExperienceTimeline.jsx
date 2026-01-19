import ScrollAnimation from '../animations/ScrollAnimation'

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

// Brand colors for company initials
const companyColors = {
  lenus: 'from-emerald-500 to-teal-600',
  beefit: 'from-orange-500 to-red-500',
  freelance: 'from-violet-500 to-purple-600',
  zliide: 'from-blue-500 to-indigo-600',
  adtraction: 'from-rose-500 to-pink-600'
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
    <div className="relative grid grid-cols-[minmax(40px,50px)_auto_1fr_1fr_1fr] md:grid-cols-[60px_auto_1fr_1fr_1fr] gap-x-0">
      {/* Column 1: Year label */}
      <div className="pt-2 pr-3 md:pr-4 text-right">
        {yearLabel && (
          <span className="text-[13px] font-medium text-color-secondary">
            {yearLabel}
          </span>
        )}
      </div>

      {/* Column 2: Timeline dot and line */}
      <div className="relative flex flex-col items-center px-2">
        {/* Dot with glow effect for current role */}
        <div className={`
          relative z-10 w-3 h-3 rounded-full mt-2 flex-shrink-0
          ${experience.roles[0].current 
            ? 'bg-green-400 pulse-glow' 
            : 'bg-surface-color-tertiary border-2 border-color-secondary'
          }
        `}>
          {experience.roles[0].current && (
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
          )}
        </div>
        
        {/* Connecting line */}
        {!isLast && (
          <div className="w-[1px] flex-grow bg-[var(--border-color-secondary)] mt-3 mb-0" />
        )}
      </div>

      {/* Columns 3-5: Content card (spans 3 columns) */}
      <div className="col-span-3 pb-8 pl-3 md:pl-5">
        <ScrollAnimation>
          <div 
            className="
              relative overflow-hidden
              bg-surface-color-secondary rounded-xl p-6
              border border-transparent
            "
          >
            {/* Header Row: Logo, Company info column */}
            <div className="flex items-center gap-4 mb-5">
              {/* Logo */}
              <div className={`
                w-11 h-11 rounded-xl flex-shrink-0 overflow-hidden
                flex items-center justify-center
                ${experience.logo 
                  ? 'bg-white' 
                  : `bg-gradient-to-br ${companyColors[experience.colorKey] || 'from-neutral-600 to-neutral-800'}`
                }
              `}>
                {experience.logo ? (
                  <img 
                    src={experience.logo} 
                    alt={experience.company}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-base font-semibold text-white drop-shadow-sm">
                    {experience.company.charAt(0)}
                  </span>
                )}
              </div>

              {/* Company info column */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[16px] font-semibold text-color-primary leading-tight">
                    {experience.company}
                  </h3>
                  {/* Badge */}
                  {experience.badge && (
                    <span className="text-[11px] font-medium text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-full">
                      {experience.badge}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-[13px] text-color-secondary mt-0.5">
                  <span>{companyStartDate} – {companyEndDate}</span>
                  <span className="text-color-secondary/40">·</span>
                  <span>{experience.totalDuration}</span>
                </div>
              </div>
            </div>

            {/* Roles */}
            <div className="space-y-4">
              {experience.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="flex flex-col gap-1">
                  {/* Role title */}
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-medium text-color-primary">
                      {role.title}
                    </span>
                    {role.current && (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Current
                      </span>
                    )}
                  </div>
                  {/* Role dates and duration */}
                  <div className="flex items-center gap-2 text-[13px] text-color-secondary">
                    <span>{role.startDate} – {role.endDate}</span>
                    <span className="text-color-secondary/40">·</span>
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
    <div className="relative">
      {/* Section header */}
      <ScrollAnimation>
        <h2 className="text-[18px] font-medium text-color-primary mb-10">
          Experience
        </h2>
      </ScrollAnimation>

      {/* Timeline */}
      <div className="relative pl-0">
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

