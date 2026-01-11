import { useState } from 'react'
import ScrollAnimation from '../animations/ScrollAnimation'

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
      },
      {
        title: 'Product Design Intern',
        type: 'Internship',
        startDate: 'Aug 2023',
        endDate: 'Oct 2023',
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
      },
      {
        title: 'Product Design Intern',
        type: 'Internship',
        startDate: 'Jan 2022',
        endDate: 'Mar 2022',
        current: false
      }
    ],
    description: 'Led end-to-end design tasks from user research to design, user testing, developer hand-off, and quality assurance. Designed and implemented Adservice.com, significantly enhancing SEO, engagement, and conversion rates. Designed a self-service interface for affiliate advertisers and gamification contest sites for telecom campaigns.',
    totalDuration: '1 year 10 months',
    badge: 'Acquired by Adtraction'
  }
]

function ExperienceCard({ experience, index }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLast = index === experiences.length - 1

  // Get the overall date range for the company
  const allDates = experience.roles.flatMap(r => [r.startDate, r.endDate])
  const companyStartDate = experience.roles[experience.roles.length - 1].startDate
  const companyEndDate = experience.roles[0].endDate

  return (
    <div className="relative flex gap-6 md:gap-10">
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
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
        
        {/* Connecting line - solid opacity */}
        {!isLast && (
          <div className="w-[1px] flex-grow bg-[var(--border-color-secondary)] mt-3 mb-0" />
        )}
      </div>

      {/* Content card */}
      <div className="flex-grow pb-8">
        <ScrollAnimation>
          <div 
            className={`
              group relative overflow-hidden
              bg-surface-color-secondary rounded-xl p-6
              border border-transparent
              transition-all duration-500 ease-out
              hover:bg-surface-color-tertiary
              hover:border-color-secondary
              cursor-pointer
            `}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            

            {/* Header Row: Logo, Company info column, Expand Button */}
            <div className="flex items-center gap-4 mb-5">
              {/* Logo */}
              <div className={`
                w-11 h-11 rounded-xl flex-shrink-0 overflow-hidden
                flex items-center justify-center
                ${experience.logo 
                  ? 'bg-white' 
                  : `bg-gradient-to-br ${companyColors[experience.colorKey] || 'from-neutral-600 to-neutral-800'}`
                }
                transition-transform duration-300 group-hover:scale-105
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
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-full">
                  {experience.badge}
                  </span>
                </div>
            )}
                </div>
                
                <div className="flex items-center gap-2 text-[13px] text-color-secondary mt-0.5">
                  <span>{companyStartDate} – {companyEndDate}</span>
                  <span className="text-color-secondary/40">·</span>
                  <span>{experience.totalDuration}</span>
                </div>
              </div>

              {/* Expand indicator */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                bg-surface-color-tertiary/50
                transition-all duration-300
                group-hover:bg-surface-color-tertiary
                ${isExpanded ? 'rotate-180' : ''}
              `}>
                <svg 
                  className="w-4 h-4 text-color-secondary transition-colors group-hover:text-color-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
                    <span>{role.type}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Expandable description */}
            <div className={`
              overflow-hidden transition-all duration-500 ease-out
              ${isExpanded ? 'max-h-96 opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'}
            `}>
              <div className="pt-4 border-t border-color-secondary/20">
                <p className="text-[14px] text-color-secondary leading-[1.6]">
                  {experience.description}
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}

function ExperienceTimeline() {
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
        {experiences.map((experience, index) => (
          <ExperienceCard 
            key={experience.id} 
            experience={experience} 
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default ExperienceTimeline

