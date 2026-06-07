import { Children, cloneElement, isValidElement } from 'react'
import styles from './StatGrid.module.css'

/**
 * StatGrid — responsive auto-fit layout for StatCards. Columns wrap to fewer
 * (never squish), generous gaps for an editorial feel rather than a dense admin
 * grid. Injects a stagger `delay` into each child so the row cascades in calmly.
 * Keep a row to 1–4 cards; let one hero metric break out if you want a focal
 * point (give it the `accent` prop).
 *
 *  - min     minimum card width before wrapping (default 220px)
 *  - stagger ms between each card's reveal (default 90)
 */
function StatGrid({ children, min = '220px', stagger = 90, className = '' }) {
  return (
    <div
      className={`${styles.grid} ${className}`.trim()}
      style={{ '--stat-min': min }}
    >
      {Children.map(children, (child, i) =>
        isValidElement(child) && child.props.delay == null
          ? cloneElement(child, { delay: i * stagger })
          : child
      )}
    </div>
  )
}

export default StatGrid
