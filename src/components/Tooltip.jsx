import styles from './Tooltip.module.css'

// Reusable hover/focus tooltip, modelled on the "Worked at" company tooltip.
// Pure-CSS driven (no JS hover state): the popup is hidden via opacity/visibility
// and revealed on the wrapper's :hover / :focus-within. Calm, slow motion using
// the shared duration/easing tokens; reduced-motion safe.
//
//   <Tooltip content={<…>} placement="top">{trigger}</Tooltip>
//
// `placement` — "top" (default, above the trigger) or "bottom".
function Tooltip({ content, placement = 'top', children }) {
  return (
    <span className={styles.trigger}>
      {children}
      <span
        role="tooltip"
        className={`glass-panel ${styles.tooltip} ${styles[placement] ?? styles.top}`}
      >
        {content}
      </span>
    </span>
  )
}

export default Tooltip
