import { useId } from 'react'

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
    'w-full rounded-lg bg-surface-color-secondary text-color-primary type-body ' +
    'px-3.5 py-2.5 border transition-[border-color,box-shadow] duration-fast ease-standard ' +
    'placeholder:text-color-tertiary ' +
    'focus:outline-none focus-visible:outline-none ' +
    (error
      ? 'border-[color:var(--feedback-error)] focus:border-[color:var(--feedback-error)] focus:ring-2 focus:ring-[color:var(--feedback-error)] '
      : 'border-color-secondary focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)] ') +
    (multiline ? 'min-h-[112px] resize-y ' : '') +
    className

  return (
    <div className="flex flex-col gap-1.5">
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
