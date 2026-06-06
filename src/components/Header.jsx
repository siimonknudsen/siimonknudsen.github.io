import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Location from './Location'
import ThemeToggle from './ThemeToggle'
import { allProjects, allArchiveProjects } from './projects/ProjectGrid'
import styles from './Header.module.css'

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
    <span className={`bg-surface-color-tertiary ${styles.thumb}`}>
      {!failed && (
        <img
          src={`/projects/${id}/images/hero${IMAGE_FORMATS[formatIndex]}`}
          alt={alt}
          loading="lazy"
          className={styles.thumbImg}
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
    <div className={`text-color-secondary ${styles.menuLabel}`}>
      {children}
    </div>
  )
}

function WorkRow({ id, title, subtitle, onNavigate }) {
  return (
    <Link
      to={`/project/${id}`}
      onClick={onNavigate}
      className={`glass-item ${styles.workRow}`}
    >
      <ProjectThumb id={id} alt={title} />
      <span className={styles.workMeta}>
        <span className={`text-color-primary ${styles.workTitle}`}>
          {title}
        </span>
        <span className={`text-color-secondary ${styles.workSubtitle}`}>{subtitle}</span>
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
      <div className={styles.workGrid}>
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
      <div className={`border-t border-glass ${styles.menuFooter}`}>
        <Link
          to="/"
          onClick={onNavigate}
          className={`text-color-primary ${styles.footerLink}`}
        >
          View all projects <span aria-hidden="true">→</span>
        </Link>
        <Link
          to="/archive"
          onClick={onNavigate}
          className={`text-color-secondary hover:text-color-primary ${styles.footerLinkSecondary}`}
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
      <div className={styles.workGrid}>
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
      <div className={`border-t border-glass ${styles.menuFooter}`}>
        <Link
          to="/archive"
          onClick={onNavigate}
          className={`text-color-primary ${styles.footerLink}`}
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
      <div className={styles.aboutHeader}>
        <span className={`bg-surface-color-tertiary ${styles.aboutAvatar}`}>
          <img
            src={`${import.meta.env.BASE_URL}simon-virtual.png`}
            alt="Simon Knudsen"
            className={styles.avatarImg}
          />
        </span>
        <span className={styles.aboutName}>
          <span className={`text-color-primary ${styles.aboutNameTitle}`}>Simon Knudsen</span>
          <span className={`text-color-secondary ${styles.aboutNameSub}`}>
            Product Designer · Aarhus
          </span>
        </span>
      </div>
      <div className={`border-t border-glass ${styles.aboutList}`}>
        {aboutSections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            onClick={onNavigate}
            className={`glass-item text-color-secondary hover:text-color-primary ${styles.aboutItem}`}
          >
            {s.label}
            <Chevron className={styles.aboutChevron} />
          </Link>
        ))}
      </div>
      <div className={`border-t border-glass ${styles.menuFooterSingle}`}>
        <Link
          to="/about"
          onClick={onNavigate}
          className={`text-color-primary ${styles.footerLink}`}
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
      <div className={styles.contactHead}>
        <div className={`text-color-primary ${styles.contactTitle}`}>
          Contact me
        </div>
      </div>
      <div className={`border-t border-glass ${styles.contactList}`}>
        <a
          href="mailto:simonoverlund@hotmail.com"
          onClick={onNavigate}
          className={`glass-item ${styles.contactItem}`}
        >
          <span className={`bg-surface-color-tertiary ${styles.contactIcon}`}>
            <svg className={`text-color-primary ${styles.contactIconSvg}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </span>
          <span className={styles.contactMeta}>
            <span className={`text-color-primary ${styles.contactMetaTitle}`}>Email me</span>
            <span className={`text-color-secondary ${styles.contactMetaSub}`}>
              simonoverlund@hotmail.com
            </span>
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/simon-knudsen/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className={`glass-item ${styles.contactItem}`}
        >
          <span className={`bg-surface-color-tertiary ${styles.contactIcon}`}>
            <svg className={`text-color-primary ${styles.contactIconSvg}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
            </svg>
          </span>
          <span className={styles.contactMeta}>
            <span className={`text-color-primary ${styles.contactMetaTitle}`}>LinkedIn</span>
            <span className={`text-color-secondary ${styles.contactMetaSub}`}>
              in/simon-knudsen
            </span>
          </span>
        </a>
      </div>
      <div className={`border-t border-glass text-color-secondary ${styles.contactStatus}`}>
        <span className={styles.statusDot} />
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
    // Generous delay so moving the cursor across the gap between triggers
    // doesn't close the panel — it stays open and slides to the next menu.
    closeTimer.current = setTimeout(() => setOpen(false), 260)
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
    `glass-item ${styles.trigger} ${
      active || isOpen
        ? 'text-color-primary glass-item-active'
        : 'text-color-secondary hover:text-color-primary'
    }`

  const ActiveBody = menuKey ? MENU_BODIES[menuKey] : null

  return (
    <>
      <header
        className={styles.header}
        onKeyDown={(e) => e.key === 'Escape' && closeNow()}
      >
        <div ref={wrapperRef} className={styles.wrapper}>
          {/* The single glass bar */}
          <div className={`glass ${styles.bar}`}>
            {/* Left — brand (links home) */}
            <Link to="/" className={`focus-ring ${styles.brand}`} aria-label="Simon Knudsen — home">
              <span className={`bg-surface-color-tertiary ${styles.brandAvatar}`}>
                <img
                  src={`${import.meta.env.BASE_URL}simon-virtual.png`}
                  alt="Simon Knudsen"
                  className={styles.avatarImg}
                />
              </span>
              <span className={styles.brandText}>
                <span className={`text-color-primary ${styles.brandName}`}>
                  Simon Knudsen
                </span>
                <span className={`text-color-secondary ${styles.brandRole}`}>
                  Product Designer
                </span>
              </span>
            </Link>

            {/* Center — nav triggers (absolutely centred in the bar).
                Close is scheduled on leaving the whole nav region (not each
                button) so moving across the gaps keeps the menu open and the
                last-hovered trigger stays highlighted. */}
            <div
              className={styles.nav}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              {navItems.map((item) => {
                const isOpenItem = open && menuKey === item.key
                const shared = {
                  ref: (el) => (triggerRefs.current[item.key] = el),
                  onMouseEnter: () => openMenu(item.key),
                  onFocus: () => openMenu(item.key),
                  onBlur: scheduleClose,
                  className: triggerClass(item.active, isOpenItem),
                  'aria-haspopup': 'true',
                  'aria-expanded': isOpenItem,
                  'aria-current': item.active ? 'page' : undefined,
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
            <div className={styles.utils}>
              <div className={styles.locationDesktop}>
                <Location />
              </div>
              <span
                className={styles.divider}
                aria-hidden="true"
              />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`glass-item text-color-secondary hover:text-color-primary ${styles.menuButton}`}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className={styles.menuButtonSvg}
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
            className={`${styles.panel} ${open ? styles.panelOpen : styles.panelClosed}`}
          >
            <div className={styles.panelInner}>
              <div className={`glass-panel ${styles.panelCard}`}>
                {/* Keyed by menuKey so switching menus cross-fades + re-runs
                    the staggered item reveal. */}
                {ActiveBody && (
                  <div key={menuKey} className={styles.menuContent}>
                    <ActiveBody onNavigate={closeNow} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <>
          <div className={`bg-scrim ${styles.scrim}`} onClick={closeMobileMenu} />
          <div className={`glass-panel ${styles.mobileMenu}`}>
            <nav className={styles.mobileNav}>
              <Link
                to="/"
                onClick={closeMobileMenu}
                aria-current={isActive('/') ? 'page' : undefined}
                className={`glass-item ${styles.mobileItem} ${
                  isActive('/') ? 'text-color-primary glass-item-active' : 'text-color-secondary'
                }`}
              >
                Projects
              </Link>
              <Link
                to="/archive"
                onClick={closeMobileMenu}
                aria-current={isActive('/archive') ? 'page' : undefined}
                className={`glass-item ${styles.mobileItem} ${
                  isActive('/archive') ? 'text-color-primary glass-item-active' : 'text-color-secondary'
                }`}
              >
                Archive
              </Link>
              <Link
                to="/about"
                onClick={closeMobileMenu}
                aria-current={isActive('/about') ? 'page' : undefined}
                className={`glass-item ${styles.mobileItem} ${
                  isActive('/about') ? 'text-color-primary glass-item-active' : 'text-color-secondary'
                }`}
              >
                About
              </Link>
              <button
                onClick={handleContactClick}
                className={`glass-item text-color-secondary ${styles.mobileItem} ${styles.mobileItemButton}`}
              >
                Contact
              </button>
              <div className={`border-t border-glass ${styles.mobileLocation}`}>
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
