import ShaderBackground from './shader/ShaderBackground'
import { useTheme } from '../contexts/ThemeContext'

// Mesh "gradient-grid" — four corner points [top-left, top-right, bottom-left,
// bottom-right]. Diagonal green→teal blooms over dark (light: soft mint over white).
// Warm "ember" blooms that harmonize with the orange brand accent.
// [top-left, top-right, bottom-left, bottom-right]
const PALETTE = {
  dark: ['#d8602b', '#09090a', '#160d09', '#7c3618'],
  light: ['#ffe1cf', '#ffffff', '#fbf3ee', '#ffd2b2'],
}

/**
 * HeroBackground — the calm flow-gradient behind the hero, tinted to the active
 * theme, with a soft fade into the page surface at the bottom.
 */
function HeroBackground() {
  const { theme } = useTheme()
  const colors = PALETTE[theme] || PALETTE.dark

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <ShaderBackground colors={colors} speed={0.05} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--surface-color-primary)]" />
    </div>
  )
}

export default HeroBackground
