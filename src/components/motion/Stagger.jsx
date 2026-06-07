import { Children, cloneElement, isValidElement } from 'react'

/**
 * <Stagger> — sequences direct children by injecting a `--i` index, which the
 * `.fx-stagger > *` rule turns into transition-delay. Pair children with
 * `.fx-reveal`/<Reveal> so they cascade in. Polymorphic via `as`.
 */
// Comp is rendered as <Comp> below; ESLint can't see JSX usage without
// react/jsx-uses-vars, so the destructured rename reads as unused.
// eslint-disable-next-line no-unused-vars
export default function Stagger({ as: Comp = 'div', className = '', children, ...props }) {
  return (
    <Comp className={`fx-stagger ${className}`.trim()} {...props}>
      {Children.map(children, (child, i) =>
        isValidElement(child)
          ? cloneElement(child, { style: { '--i': i, ...(child.props.style || {}) } })
          : child
      )}
    </Comp>
  )
}
