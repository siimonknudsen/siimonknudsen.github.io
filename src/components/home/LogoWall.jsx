import { Reveal, useReducedMotion } from '../motion'
import styles from './LogoWall.module.css'

// Auto-load every company logo from the shared assets folder.
const logoModules = import.meta.glob('../../assets/logos/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
})

const LOGOS = Object.entries(logoModules)
  .map(([path, url]) => ({
    url,
    name: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/-/g, ' '),
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

/**
 * LogoWall — social-proof band of company logos.
 *
 * With motion allowed it scrolls as a seamless marquee that pauses on hover.
 * With prefers-reduced-motion it falls back to a static, wrapping logo row —
 * no auto-scroll. The track is duplicated so the loop has no visible seam.
 */
function LogoWall({ logos = LOGOS }) {
  const reduced = useReducedMotion()

  if (!logos.length) return null

  const renderLogo = (logo, key) => (
    <div key={key} className={styles.cell}>
      <img
        src={logo.url}
        alt={logo.name}
        loading="lazy"
        className={styles.logo}
      />
    </div>
  )

  if (reduced) {
    return (
      <Reveal preset="fade" className={styles.staticWrap}>
        {logos.map((logo, i) => renderLogo(logo, i))}
      </Reveal>
    )
  }

  return (
    <Reveal preset="fade" className={styles.marquee}>
      <div className={styles.track} aria-hidden="false">
        {logos.map((logo, i) => renderLogo(logo, `a-${i}`))}
      </div>
      {/* Duplicate track for a seamless loop; hidden from a11y tree. */}
      <div className={styles.track} aria-hidden="true">
        {logos.map((logo, i) => renderLogo(logo, `b-${i}`))}
      </div>
    </Reveal>
  )
}

export default LogoWall
