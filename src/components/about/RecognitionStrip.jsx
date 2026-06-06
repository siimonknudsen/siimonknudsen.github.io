import { Reveal, Stagger } from '../motion'
import Button from '../buttons/Button'
import styles from './RecognitionStrip.module.css'

/**
 * RecognitionStrip — a tasteful row for awards, features and speaking.
 *
 * These entries are CLEARLY-MARKED PLACEHOLDERS. Edit the RECOGNITION array
 * below with your real awards / features / talks, then remove the
 * `placeholder: true` flag on each so the muted "placeholder" styling drops
 * away. The layout is data-driven, so adding or removing rows is trivial.
 */
const RECOGNITION = [
  {
    title: 'Award / feature title',
    meta: 'Publication · Year',
    note: 'placeholder — add yours',
    placeholder: true,
  },
  {
    title: 'Conference talk / speaking',
    meta: 'Event name · Year',
    note: 'placeholder — add yours',
    placeholder: true,
  },
  {
    title: 'Press mention / interview',
    meta: 'Outlet · Year',
    note: 'placeholder — add yours',
    placeholder: true,
  },
]

// Inline download icon — currentColor, no external deps.
function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

function RecognitionStrip() {
  return (
    <Stagger as="ul" className={styles.list}>
      {RECOGNITION.map((item) => (
        <Reveal
          as="li"
          key={item.title}
          className={`glass-panel ${styles.card} ${item.placeholder ? styles.placeholder : ''}`}
        >
          <h3 className={`type-title text-color-primary ${styles.title}`}>{item.title}</h3>
          <p className={`type-label font-mono text-color-tertiary ${styles.meta}`}>{item.meta}</p>
          {item.placeholder && (
            <span className={`type-caption font-mono text-warning ${styles.note}`}>{item.note}</span>
          )}
        </Reveal>
      ))}

      <Reveal as="li" className={styles.cta}>
        <Button
          as="a"
          href={`${import.meta.env.BASE_URL}simon-knudsen-cv.pdf`}
          download
          variant="secondary"
          iconLeft={<DownloadIcon />}
        >
          Download CV (PDF)
        </Button>
      </Reveal>
    </Stagger>
  )
}

export default RecognitionStrip
