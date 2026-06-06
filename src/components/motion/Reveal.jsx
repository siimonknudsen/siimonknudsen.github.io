import useReveal from './useReveal'

const PRESET = {
  fade: '',
  'fade-up': 'fx-fade-up',
  'scale-in': 'fx-scale-in',
}

/**
 * <Reveal> — declarative scroll-reveal using the owned motion presets.
 * preset: 'fade' | 'fade-up' | 'scale-in'. Optional delay (ms) or use
 * inside <Stagger> for sequenced children. Polymorphic via `as`.
 */
export default function Reveal({
  as: Comp = 'div',
  preset = 'fade-up',
  delay,
  once = true,
  className = '',
  style,
  children,
  ...props
}) {
  const { ref, isVisible } = useReveal({ once })
  const mergedStyle = delay != null ? { transitionDelay: `${delay}ms`, ...style } : style
  return (
    <Comp
      ref={ref}
      style={mergedStyle}
      className={`fx-reveal ${PRESET[preset] ?? ''} ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </Comp>
  )
}
