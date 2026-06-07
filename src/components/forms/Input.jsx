import { useId } from 'react'
import styles from './Input.module.css'

/**
 * Input / Textarea — the design-system form field. Tokenised, accessible
 * (label association, focus ring, error state with text + aria-invalid).
 *
 * Props: label, hint, error, multiline, id, ...native input/textarea props.
 */
function Input({ label, hint, error, multiline = false, id, className = '', ...props }) {
  const autoId = useId()
  const fieldId = id || autoId
  const hintId = hint ? `${fieldId}-hint` : undefined
  const errId = error ? `${fieldId}-err` : undefined
  const Field = multiline ? 'textarea' : 'input'

  const fieldClass =
    `text-color-primary type-body ${styles.field} ` +
    (error ? `${styles.fieldError} ` : `${styles.fieldDefault} `) +
    (multiline ? `${styles.multiline} ` : '') +
    className

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={fieldId} className="type-label text-color-secondary">
          {label}
        </label>
      )}
      <Field
        id={fieldId}
        className={fieldClass}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={errId || hintId}
        {...props}
      />
      {error ? (
        <span id={errId} className="type-caption text-error">
          {error}
        </span>
      ) : (
        hint && (
          <span id={hintId} className="type-caption text-color-tertiary">
            {hint}
          </span>
        )
      )}
    </div>
  )
}

export default Input
