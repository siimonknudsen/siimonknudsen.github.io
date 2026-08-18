import ShaderBackground from './shader/ShaderBackground'
import { useTheme } from '../contexts/ThemeContext'
import styles from './HeroBackground.module.css'

// Mesh "gradient-grid" — four corner points [top-left, top-right, bottom-left,
// bottom-right]. FLAT: all four corners share one colour so the shader renders a
// solid field with no gradient/drift (Simon: "even flatter, pure white/black").
// Matches the flat mesh base — dark #0a0a0a, light #ffffff.
const PALETTE = {
  dark: ['#0a0a0a', '#0a0a0a', '#0a0a0a', '#0a0a0a'],
  light: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
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
