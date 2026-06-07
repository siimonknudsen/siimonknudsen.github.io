import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

/**
 * Modal — an accessible, frosted dialog primitive.
 *
 * Renders nothing when closed. When open: a top-level fixed overlay with a
 * click-away scrim and a centered `.glass-panel` dialog. Handles Escape to
 * close, body-scroll lock, focus-into-dialog on open, a Tab/Shift+Tab focus
 * trap, and focus restore to the previously-focused element on close.
 *
 * Motion is calm (fade + slight scale/translate); reduced-motion appears
 * instantly via the global token override in index.css.
 *
 * @example
 * function Example() {
 *   const [open, setOpen] = useState(false)
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>Open</button>
 *       <Modal isOpen={open} onClose={() => setOpen(false)} title="Settings">
 *         <p>Dialog content goes here.</p>
 *       </Modal>
 *     </>
 *   )
 * }
 *
 * @param {object}   props
 * @param {boolean}  props.isOpen     Whether the modal is shown.
 * @param {Function} props.onClose    Called on Escape, scrim click, or close button.
 * @param {React.ReactNode} props.children  Dialog body content.
 * @param {string}  [props.title]     Accessible name; rendered as a heading + used for aria-labelledby.
 * @param {string}  [props.className] Extra class names for the dialog card.
 */
function Modal({ isOpen, onClose, children, title, className = '' }) {
  const dialogRef = useRef(null)
  const previouslyFocused = useRef(null)
  const titleId = useId()

  // Escape to close + simple focus trap (Tab / Shift+Tab cycle within dialog).
  useEffect(() => {
    if (!isOpen) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose?.()
        return
      }
      if (e.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusable = dialog.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (e.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else if (active === last || !dialog.contains(active)) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Lock body scroll, move focus into the dialog, restore focus on close.
  useEffect(() => {
    if (!isOpen) return

    previouslyFocused.current = document.activeElement

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Move focus into the dialog (the close button, falling back to the card).
    const dialog = dialogRef.current
    const focusTarget =
      dialog?.querySelector('button, a[href], textarea, input, select, [tabindex]:not([tabindex="-1"])') ||
      dialog
    focusTarget?.focus()

    return () => {
      document.body.style.overflow = prevOverflow
      const toRestore = previouslyFocused.current
      if (toRestore && typeof toRestore.focus === 'function') toRestore.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.overlay}>
      {/* Scrim — click-away to close */}
      <div className={`${styles.scrim} bg-scrim`} onClick={() => onClose?.()} aria-hidden="true" />

      {/* Dialog card — top-level, no transformed ancestor so .glass-panel blur renders */}
      <div
        ref={dialogRef}
        className={`${styles.dialog} glass-panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title ? undefined : 'Dialog'}
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        <button
          type="button"
          className={`${styles.close} focus-ring-glass`}
          onClick={() => onClose?.()}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {title && (
          <h2 id={titleId} className={`${styles.title} type-heading`}>
            {title}
          </h2>
        )}

        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
