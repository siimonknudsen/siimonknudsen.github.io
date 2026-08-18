import ShaderBackground from './shader/ShaderBackground'
import { useTheme } from '../contexts/ThemeContext'
import styles from './HeroBackground.module.css'

// Mesh "gradient-grid" — four corner points [top-left, top-right, bottom-left,
// bottom-right]. Neutral achromatic tints only (Simon: black & white background,
// no warm/orange wash) — a barely-there near-black / near-white drift for subtle
// life behind the hero, sitting under the neutral mesh at 0.5 opacity.
const PALETTE = {
  dark: ['#1a1a1a', '#0a0a0a', '#0a0a0a', '#161616'],
  light: ['#f4f4f4', '#ffffff', '#ffffff', '#f2f2f2'],
}

/**
 * HeroBackground — the calm flow-gradient behind the hero, tinted to the active
 * theme, with a soft fade into the page surface at the bottom.
 */
function HeroBackground() {
  const { theme } = useTheme()
  const colors = PALETTE[theme] || PALETTE.dark

  return (
    <div className={styles.root} aria-hidden="true">
      <ShaderBackground colors={colors} speed={0.05} className={styles.shader} />
      <div className={styles.grid} />
      <div className={styles.fade} />
    </div>
  )
}

export default HeroBackground
