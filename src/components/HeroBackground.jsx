import ShaderBackground from './shader/ShaderBackground'
import { useTheme } from '../contexts/ThemeContext'

// Mesh "gradient-grid" — four corner points [top-left, top-right, bottom-left,
// bottom-right]. Diagonal green→teal blooms over dark (light: soft mint over white).
const PALETTE = {
  dark: ['#1f7a52', '#0a0a0b', '#0d1411', '#1b8a86'],
  light: ['#c7ecd9', '#ffffff', '#f4f8f6', '#aadcd7'],
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
