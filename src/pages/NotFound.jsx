import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import styles from './NotFound.module.css'

/**
 * 404 — friendly, on-brand not-found page. Site chrome (Header/Footer/<main>)
 * is provided by the App shell.
 */
function NotFound() {
  usePageTitle('Page not found')
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <p className={`type-overline text-accent ${styles.overline}`}>Error 404</p>
        <h1 className={`type-display-sm text-color-primary ${styles.heading}`}>
          This page wandered off.
        </h1>
        <p className={`type-body text-color-secondary ${styles.lead}`}>
          The link may be broken or the page may have moved. Let&apos;s get you back
          to the work.
        </p>
        <div className={styles.actions}>
          <Link
            to="/"
            className={`glass-item glass-item-active type-label text-color-primary focus-ring ${styles.primary}`}
          >
            Back to projects
          </Link>
          <Link
            to="/about"
            className={`type-label text-color-secondary focus-ring ${styles.secondary}`}
          >
            About me
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
