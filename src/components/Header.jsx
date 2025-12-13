import { Link, useLocation } from 'react-router-dom'
import Avatar from './Avatar'
import Location from './Location'
import ThemeToggle from './ThemeToggle'

function Header() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 w-full px-6 py-2 bg-surface-primary/50 z-50 border-b border-border-on-primary" style={{ backdropFilter: 'blur(18px)' }}>
      <nav className="flex items-center max-w-[1920px] mx-auto relative">
        {/* Left side - Avatar and name */}
        <Link to="/" className="flex-shrink-0">
          <Avatar name="Simon Knudsen" title="Product Designer" size="small" />
        </Link>

        {/* Center - Navigation links */}
        <div className="flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
          <Link 
            to="/"
            className={`text-sm font-normal px-3 py-2 rounded transition-colors ${
              isActive('/') 
                ? 'text-text-primary bg-surface-tertiary' 
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary'
            }`}
          >
            Projects
          </Link>
          <Link 
            to="/archive"
            className={`text-sm font-normal px-3 py-2 rounded transition-colors ${
              location.pathname === '/archive'
                ? 'text-text-primary bg-surface-tertiary'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary'
            }`}
          >
            Archive
          </Link>
          <Link 
            to="/about"
            className={`text-sm font-normal px-3 py-2 rounded transition-colors ${
              location.pathname === '/about'
                ? 'text-text-primary bg-surface-tertiary'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary'
            }`}
          >
            About
          </Link>
          <a 
            href="#contact" 
            className="text-sm font-normal text-text-secondary hover:text-text-primary hover:bg-surface-tertiary px-3 py-2 rounded transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right side - Location, time, and theme toggle */}
        <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
          <Location />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Header

