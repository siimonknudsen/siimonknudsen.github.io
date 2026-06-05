import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

/**
 * 404 — friendly, on-brand not-found page. Site chrome (Header/Footer/<main>)
 * is provided by the App shell.
 */
function NotFound() {
  usePageTitle('Page not found')
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-md">
        <p className="type-overline text-accent mb-4">Error 404</p>
        <h1 className="type-display-sm text-color-primary mb-4">
          This page wandered off.
        </h1>
        <p className="type-body text-color-secondary mb-8">
          The link may be broken or the page may have moved. Let&apos;s get you back
          to the work.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="glass-item glass-item-active type-label text-color-primary px-5 py-2.5 rounded-lg focus-ring"
          >
            Back to projects
          </Link>
          <Link
            to="/about"
            className="type-label text-color-secondary hover:text-color-primary transition-colors px-5 py-2.5 rounded-lg focus-ring"
          >
            About me
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
