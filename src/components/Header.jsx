import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Avatar from './Avatar'
import Location from './Location'
import ThemeToggle from './ThemeToggle'

function Header() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isActive = (path) => location.pathname === path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleContactClick = () => {
    closeMobileMenu()
    // Navigate to home page if not already there, then scroll to footer
    if (location.pathname !== '/') {
      window.location.href = '/#contact'
    } else {
      // Scroll to footer (contact section is in footer)
      const footer = document.querySelector('footer')
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <header className="sticky top-0 w-full px-6 py-2 bg-surface-color-primary z-50 border-b border-color-on-primary" style={{ backdropFilter: 'blur(18px)' }}>
        <nav className="flex items-center max-w-[1920px] mx-auto relative">
          {/* Left side - Avatar and name */}
          <Link to="/" className="flex-shrink-0" onClick={closeMobileMenu}>
            <Avatar name="Simon Knudsen" title="Product Designer" size="small" />
          </Link>

          {/* Center - Navigation links (hidden on mobile/tablet) */}
          <div className="hidden md:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
            <Link 
              to="/"
              className={`text-sm font-normal px-3 py-1.5 rounded transition-colors ${
                isActive('/') 
                  ? 'text-color-primary bg-surface-color-tertiary' 
                  : 'text-color-secondary hover:text-color-primary hover:bg-surface-color-tertiary'
              }`}
            >
              Projects
            </Link>
            <Link 
              to="/archive"
              className={`text-sm font-normal px-3 py-1.5 rounded transition-colors ${
                location.pathname === '/archive'
                  ? 'text-color-primary bg-surface-color-tertiary'
                  : 'text-color-secondary hover:text-color-primary hover:bg-surface-color-tertiary'
              }`}
            >
              Archive
            </Link>
            <Link 
              to="/about"
              className={`text-sm font-normal px-3 py-1.5 rounded transition-colors ${
                location.pathname === '/about'
                  ? 'text-color-primary bg-surface-color-tertiary'
                  : 'text-color-secondary hover:text-color-primary hover:bg-surface-color-tertiary'
              }`}
            >
              About
            </Link>
            <a 
              href="#contact" 
              className="text-sm font-normal text-color-secondary hover:text-color-primary hover:bg-surface-color-tertiary px-3 py-1.5 rounded transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Right side - Location, time, theme toggle, and hamburger menu */}
          <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
            <div className="hidden sm:block">
              <Location />
            </div>
            <ThemeToggle />
            
            {/* Hamburger menu button (visible on mobile/tablet) */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded transition-colors text-color-secondary hover:text-color-primary hover:bg-surface-color-tertiary"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile menu drawer */}
          <div
            className={`fixed top-[59px] left-0 right-0 bg-surface-color-primary border-b border-color-on-primary z-40 md:hidden transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
            style={{ backdropFilter: 'blur(18px)' }}
          >
            <nav className="flex flex-col px-6 py-4">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`text-base font-normal px-3 py-3 rounded transition-colors mb-1 ${
                  isActive('/')
                    ? 'text-color-primary bg-surface-color-tertiary'
                    : 'text-color-secondary hover:text-color-primary hover:bg-surface-color-tertiary'
                }`}
              >
                Projects
              </Link>
              <Link
                to="/archive"
                onClick={closeMobileMenu}
                className={`text-base font-normal px-3 py-3 rounded transition-colors mb-1 ${
                  location.pathname === '/archive'
                    ? 'text-color-primary bg-surface-color-tertiary'
                    : 'text-color-secondary hover:text-color-primary hover:bg-surface-color-tertiary'
                }`}
              >
                Archive
              </Link>
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className={`text-base font-normal px-3 py-3 rounded transition-colors mb-1 ${
                  location.pathname === '/about'
                    ? 'text-color-primary bg-surface-color-tertiary'
                    : 'text-color-secondary hover:text-color-primary hover:bg-surface-color-tertiary'
                }`}
              >
                About
              </Link>
              <button
                onClick={handleContactClick}
                className="text-base font-normal text-color-secondary hover:text-color-primary hover:bg-surface-color-tertiary px-3 py-3 rounded transition-colors text-left"
              >
                Contact
              </button>
              
              {/* Location in mobile menu */}
              <div className="mt-4 pt-4 border-t border-color-on-primary sm:hidden">
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

