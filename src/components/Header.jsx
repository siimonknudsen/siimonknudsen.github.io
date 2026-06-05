import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Location from './Location'
import ThemeToggle from './ThemeToggle'
import { allProjects, allArchiveProjects } from './projects/ProjectGrid'

/* ── Content powering the dropdowns ─────────────────────────────── */

const IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp']

const featuredProjects = allProjects.slice(0, 4)

const aboutSections = [
  { label: 'About me', to: '/about#about-me' },
  { label: 'Companies', to: '/about#companies' },
  { label: 'Skills', to: '/about#skills' },
  { label: 'Testimonials', to: '/about#testimonials' },
  { label: 'Pictures', to: '/about#pictures' },
]

// Width (px) each dropdown opens to — used for layout and edge-clamping
const MENU_WIDTH = { projects: 620, archive: 560, about: 360, contact: 340 }

/* ── Small building blocks ──────────────────────────────────────── */

function ProjectThumb({ id, alt }) {
  const [formatIndex, setFormatIndex] = useState(0)
  const [failed, setFailed] = useState(false)
  return (
    <span className="w-[92px] h-[60px] rounded-xl overflow-hidden bg-surface-color-tertiary flex-shrink-0 block">
      {!failed && (
        <img
          src={`/projects/${id}/images/hero${IMAGE_FORMATS[formatIndex]}`}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={() =>
            formatIndex < IMAGE_FORMATS.length - 1
              ? setFormatIndex(formatIndex + 1)
              : setFailed(true)
          }
        />
      )}
    </span>
  )
}

function MenuLabel({ children }) {
  return (
    <div className="px-3 pt-1 pb-2.5 text-[11px] uppercase tracking-[0.14em] text-color-secondary">
      {children}
    </div>
  )
}

function WorkRow({ id, title, subtitle, onNavigate }) {
  return (
    <Link
      to={`/project/${id}`}
      onClick={onNavigate}
      className="glass-item rounded-2xl p-2 flex items-center gap-3"
    >
      <ProjectThumb id={id} alt={title} />
      <span className="flex flex-col gap-1 min-w-0">
        <span className="text-[14px] font-medium text-color-primary leading-snug line-clamp-2">
          {title}
        </span>
        <span className="text-[12px] text-color-secondary leading-snug">{subtitle}</span>
      </span>
    </Link>
  )
}

function Chevron({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3 4.5 6 7.5 9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── Dropdown bodies ────────────────────────────────────────────── */

function ProjectsMenu({ onNavigate }) {
  return (
    <>
      <MenuLabel>Featured work</MenuLabel>
      <div className="grid grid-cols-2 gap-1.5">
        {featuredProjects.map((p) => (
          <WorkRow
            key={p.id}
            id={p.id}
            title={p.title}
            subtitle={p.tags.slice(0, 2).join(' · ')}
            onNavigate={onNavigate}
          />
        ))}
      </div>
      <div className="mt-2 pt-2.5 px-3 flex items-center justify-between border-t border-glass">
        <Link
          to="/"
          onClick={onNavigate}
          className="text-[13px] font-medium text-color-primary inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          View all projects <span aria-hidden="true">→</span>
        </Link>
        <Link
          to="/archive"
          onClick={onNavigate}
          className="text-[13px] text-color-secondary hover:text-color-primary transition-colors"
        >
          Archive
        </Link>
      </div>
    </>
  )
}

function ArchiveMenu({ onNavigate }) {
  return (
    <>
      <MenuLabel>From the archive</MenuLabel>
      <div className="grid grid-cols-2 gap-1.5">
        {allArchiveProjects.map((p) => (
          <WorkRow
            key={p.id}
            id={p.id}
            title={p.title}
            subtitle={p.tags.slice(0, 2).join(' · ')}
            onNavigate={onNavigate}
          />
        ))}
      </div>
      <div className="mt-2 pt-2.5 px-3 flex items-center justify-between border-t border-glass">
        <Link
          to="/archive"
          onClick={onNavigate}
          className="text-[13px] font-medium text-color-primary inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          View full archive <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  )
}

function AboutMenu({ onNavigate }) {
  return (
    <>
      <div className="flex items-center gap-3 px-2 pt-1 pb-3">
        <span className="w-11 h-11 rounded-full overflow-hidden bg-surface-color-tertiary flex-shrink-0 block">
          <img
            src={`${import.meta.env.BASE_URL}simon-virtual.png`}
            alt="Simon Knudsen"
            className="w-full h-full object-cover"
          />
        </span>
        <span className="flex flex-col">
          <span className="text-[14px] font-medium text-color-primary leading-tight">Simon Knudsen</span>
          <span className="text-[12px] text-color-secondary leading-tight">
            Product Designer · Aarhus
          </span>
        </span>
      </div>
      <div className="flex flex-col border-t border-glass pt-2">
        {aboutSections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            onClick={onNavigate}
            className="glass-item rounded-xl px-3 py-2 flex items-center justify-between text-[14px] text-color-secondary hover:text-color-primary"
          >
            {s.label}
            <Chevron className="w-3 h-3 -rotate-90 opacity-50" />
          </Link>
        ))}
      </div>
      <div className="mt-2 pt-2.5 px-3 border-t border-glass">
        <Link
          to="/about"
          onClick={onNavigate}
          className="text-[13px] font-medium text-color-primary inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          Read full story <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  )
}

function ContactMenu({ onNavigate }) {
  return (
    <>
      <div className="px-3 pt-1 pb-3">
        <div className="text-[15px] font-medium text-color-primary leading-snug">
          Let&apos;s work together
        </div>
        <div className="text-[13px] text-color-secondary leading-snug mt-1">
          Open to new projects and roles.
        </div>
      </div>
      <div className="flex flex-col border-t border-glass pt-2">
        <a
          href="mailto:simonoverlund@hotmail.com"
          onClick={onNavigate}
          className="glass-item rounded-xl px-3 py-2 flex items-center gap-3"
        >
          <span className="w-8 h-8 rounded-lg bg-surface-color-tertiary flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-color-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </span>
          <span className="flex flex-col min-w-0">
            <span className="text-[13px] font-medium text-color-primary leading-tight">Email me</span>
            <span className="text-[12px] text-color-secondary leading-tight truncate">
              simonoverlund@hotmail.com
            </span>
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/simon-knudsen/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="glass-item rounded-xl px-3 py-2 flex items-center gap-3"
        >
          <span className="w-8 h-8 rounded-lg bg-surface-color-tertiary flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-color-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
            </svg>
          </span>
          <span className="flex flex-col min-w-0">
            <span className="text-[13px] font-medium text-color-primary leading-tight">LinkedIn</span>
            <span className="text-[12px] text-color-secondary leading-tight truncate">
              in/simon-knudsen
            </span>
          </span>
        </a>
      </div>
      <div className="mt-2 pt-2.5 px-3 border-t border-glass flex items-center gap-2 text-[12px] text-color-secondary">
        <span className="w-2 h-2 rounded-full bg-accent pulse-glow" />
        Available · Aarhus, Denmark
      </div>
    </>
  )
}

const MENU_BODIES = {
  projects: ProjectsMenu,
  archive: ArchiveMenu,
  about: AboutMenu,
  contact: ContactMenu,
}

/* ── Header ─────────────────────────────────────────────────────── */

function Header() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuKey, setMenuKey] = useState(null)
  const [panelLeft, setPanelLeft] = useState(0)

  const wrapperRef = useRef(null)
  const triggerRefs = useRef({})
  const closeTimer = useRef(null)

  const isActive = (path) => location.pathname === path
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // Position the (shared) panel centred under its trigger, clamped on-screen
  const positionFor = (key) => {
    const wrap = wrapperRef.current
    const trig = triggerRefs.current[key]
    if (!wrap || !trig) return null
    const wb = wrap.getBoundingClientRect()
    const tb = trig.getBoundingClientRect()
    const center = tb.left - wb.left + tb.width / 2
    const w = MENU_WIDTH[key]
    const pad = 8
    const min = w / 2 + pad
    const max = wb.width - w / 2 - pad
    return Math.round(Math.max(Math.min(center, max), min))
  }

  const openMenu = (key) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    const left = positionFor(key)
    if (left != null) setPanelLeft(left)
    setMenuKey(key)
    setOpen(true)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 180)
  }
  const closeNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(false)
  }

  // Keep the panel anchored if the window resizes while open
  useEffect(() => {
    const onResize = () => {
      if (open && menuKey) {
        const left = positionFor(menuKey)
        if (left != null) setPanelLeft(left)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open, menuKey])

  useEffect(() => () => closeTimer.current && clearTimeout(closeTimer.current), [])

  // Mobile menu: lock body scroll while open and close on Escape.
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setIsMobileMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [isMobileMenuOpen])

  const handleContactClick = (e) => {
    if (e) e.preventDefault()
    closeMobileMenu()
    closeNow()
    if (location.pathname !== '/') {
      window.location.href = '/#contact'
    } else {
      const footer = document.querySelector('footer')
      if (footer) footer.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { key: 'projects', label: 'Projects', to: '/', active: isActive('/') },
    { key: 'archive', label: 'Archive', to: '/archive', active: isActive('/archive') },
    { key: 'about', label: 'About', to: '/about', active: isActive('/about') },
    { key: 'contact', label: 'Contact', to: '#contact', active: false, onClick: handleContactClick },
  ]

  const triggerClass = (active, isOpen) =>
    `glass-item text-sm font-normal px-4 py-2 rounded-lg whitespace-nowrap ${
      active || isOpen
        ? 'text-color-primary glass-item-active'
        : 'text-color-secondary hover:text-color-primary'
    }`

  const ActiveBody = menuKey ? MENU_BODIES[menuKey] : null

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 pb-2"
        onKeyDown={(e) => e.key === 'Escape' && closeNow()}
      >
        <div ref={wrapperRef} className="relative max-w-[1920px] mx-auto">
          {/* The single glass bar */}
          <div className="glass rounded-2xl flex items-center gap-2 p-2 relative">
            {/* Left — brand (non-interactive) */}
            <div className="rounded-full pl-1 pr-3 py-1 flex items-center gap-2.5 flex-shrink-0 select-none">
              <span className="w-9 h-9 rounded-full overflow-hidden bg-surface-color-tertiary flex-shrink-0 block">
                <img
                  src={`${import.meta.env.BASE_URL}simon-virtual.png`}
                  alt="Simon Knudsen"
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="hidden lg:flex flex-col">
                <span className="text-[14px] font-medium text-color-primary leading-[1.25] tracking-tight">
                  Simon Knudsen
                </span>
                <span className="text-[12px] text-color-secondary leading-[1.25] tracking-tight">
                  Product Designer
                </span>
              </span>
            </div>

            {/* Center — nav triggers (absolutely centred in the bar) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
              {navItems.map((item) => {
                const isOpenItem = open && menuKey === item.key
                const shared = {
                  ref: (el) => (triggerRefs.current[item.key] = el),
                  onMouseEnter: () => openMenu(item.key),
                  onMouseLeave: scheduleClose,
                  onFocus: () => openMenu(item.key),
                  onBlur: scheduleClose,
                  className: triggerClass(item.active, isOpenItem),
                  'aria-haspopup': 'true',
                  'aria-expanded': isOpenItem,
                }
                return item.onClick ? (
                  <a key={item.key} href={item.to} onClick={item.onClick} {...shared}>
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.key} to={item.to} {...shared}>
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Right — utilities */}
            <div className="flex items-center gap-3 ml-auto flex-shrink-0">
              <div className="hidden lg:flex items-center">
                <Location />
              </div>
              <span
                className="hidden lg:block h-5 w-px bg-[color:var(--glass-border)]"
                aria-hidden="true"
              />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden glass-item w-10 h-10 rounded-full flex items-center justify-center text-color-secondary hover:text-color-primary"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18 18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Shared dropdown panel — a sibling of the bar (NOT nested inside a
              blurred element) so its own backdrop-filter blurs the page behind it. */}
          <div
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            onFocus={cancelClose}
            onBlur={scheduleClose}
            style={{ left: `${panelLeft}px`, width: menuKey ? `${MENU_WIDTH[menuKey]}px` : undefined }}
            className={`hidden md:block absolute top-full -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)] transition-[opacity,transform] duration-200 ease-out ${
              open
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible -translate-y-1 pointer-events-none'
            }`}
          >
            <div className="pt-2.5">
              <div className="glass-panel rounded-2xl p-3">
                {ActiveBody && <ActiveBody onNavigate={closeNow} />}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={closeMobileMenu} />
          <div className="fixed top-[84px] left-4 right-4 z-40 md:hidden glass-panel rounded-2xl p-2">
            <nav className="flex flex-col">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`glass-item rounded-2xl px-4 py-3 text-base ${
                  isActive('/') ? 'text-color-primary glass-item-active' : 'text-color-secondary'
                }`}
              >
                Projects
              </Link>
              <Link
                to="/archive"
                onClick={closeMobileMenu}
                className={`glass-item rounded-2xl px-4 py-3 text-base ${
                  isActive('/archive') ? 'text-color-primary glass-item-active' : 'text-color-secondary'
                }`}
              >
                Archive
              </Link>
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className={`glass-item rounded-2xl px-4 py-3 text-base ${
                  isActive('/about') ? 'text-color-primary glass-item-active' : 'text-color-secondary'
                }`}
              >
                About
              </Link>
              <button
                onClick={handleContactClick}
                className="glass-item rounded-2xl px-4 py-3 text-base text-color-secondary text-left"
              >
                Contact
              </button>
              <div className="px-4 py-3 mt-1 border-t border-glass sm:hidden">
                <Location />
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}

export default Header
