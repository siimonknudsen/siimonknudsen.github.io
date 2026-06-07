import { Children, cloneElement, isValidElement } from 'react'
import { REVEAL_STAGGER_MS } from './revealMotion'

/**
 * <Stagger> — sequences direct <Reveal> children by injecting an incremental
 * `delay` (ms) onto each, so they cascade in reading order. (Previously this
 * injected a CSS `--i` index; now the children are Framer Motion springs, so we
 * pass the spring's `delay` directly.) Any existing `delay` on a child is
 * preserved and offset. Polymorphic via `as` (renders a plain element — the
 * children are the animated ones).
 */
// Comp is rendered as <Comp> below; ESLint can't see JSX usage without
// react/jsx-uses-vars, so the destructured rename reads as unused.
// eslint-disable-next-line no-unused-vars
export default function Stagger({ as: Comp = 'div', className = '', children, ...props }) {
  return (
    <Comp className={`fx-stagger ${className}`.trim()} {...props}>
      {Children.map(children, (child, i) =>
        isValidElement(child)
          ? cloneElement(child, {
              delay: (child.props.delay || 0) + i * REVEAL_STAGGER_MS,
            })
          : child
      )}
    </Comp>
  )
}
