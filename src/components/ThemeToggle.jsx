import { useTheme } from '../contexts/ThemeContext'
import styles from './ThemeToggle.module.css'

function SunIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  )
}

/**
 * Segmented light/dark control. Switching animates with a View Transitions
 * "circular reveal" that blooms from the clicked button, with a colour
 * cross-fade fallback and full prefers-reduced-motion support.
 */
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  const switchTo = (next, event) => {
    if (next === theme) return

    const root = document.documentElement
    const apply = () => {
      // Toggle the class synchronously so the View Transition captures the new
      // state immediately; setTheme keeps context state + localStorage in sync.
      root.classList.toggle('dark', next === 'dark')
      setTheme(next)
    }

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Reduced motion → instant, no animation.
    if (reduce) {
      apply()
      return
    }

    // No View Transitions support → brief colour cross-fade.
    if (!document.startViewTransition) {
      root.classList.add('theme-anim')
      apply()
      window.setTimeout(() => root.classList.remove('theme-anim'), 900)
      return
    }

    // Circular reveal from the clicked control.
    const x = event?.clientX ?? window.innerWidth
    const y = event?.clientY ?? 0
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => apply())
    transition.ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 900,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={styles.group}
    >
      {/* Sliding thumb */}
      <span
        aria-hidden="true"
        className={`bg-surface-color-primary ${styles.thumb}`}
        style={{ transform: isDark ? 'translateX(1.75rem)' : 'translateX(0)' }}
      />
      <button
        type="button"
        onClick={(e) => switchTo('light', e)}
        aria-label="Light mode"
        aria-pressed={!isDark}
        className={`${styles.btn} ${
          !isDark ? 'text-color-primary' : `text-color-secondary ${styles.btnHover}`
        }`}
      >
        <SunIcon />
      </button>
      <button
        type="button"
        onClick={(e) => switchTo('dark', e)}
        aria-label="Dark mode"
        aria-pressed={isDark}
        className={`${styles.btn} ${
          isDark ? 'text-color-primary' : `text-color-secondary ${styles.btnHover}`
        }`}
      >
        <MoonIcon />
      </button>
    </div>
  )
}

export default ThemeToggle
