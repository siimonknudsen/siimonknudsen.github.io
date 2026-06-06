import { Reveal, Stagger } from '../motion'
import styles from './PrinciplesList.module.css'

const PRINCIPLES = [
  {
    title: 'Let the work speak',
    body: 'The design should never show off. I keep things calm and simple so what really matters stands out.',
  },
  {
    title: 'Clear beats clever',
    body: 'If something looks cool but makes people stop and think, it goes. Easy to understand wins every time.',
  },
  {
    title: 'The small stuff matters',
    body: 'The way things move, line up and respond to a click — getting those tiny details right is what makes a product feel good to use.',
  },
  {
    title: 'Works for everyone',
    body: 'Good design should work for everyone — readable text, works with a keyboard, and comfortable for people sensitive to motion. Never an afterthought.',
  },
  {
    title: 'Build it to reuse',
    body: 'Instead of designing every screen from scratch, I build a kit of reusable pieces so the whole product stays consistent and easy to grow.',
  },
  {
    title: 'Results over screens',
    body: 'A project is a success when it actually moves the needle for the business and the people using it — not just because it shipped.',
  },
]

/**
 * PrinciplesList — the design principles Simon works by, shown as a
 * tasteful grid of glass cards. Numbered for editorial rhythm.
 */
function PrinciplesList() {
  return (
    <Stagger as="ol" className={styles.list}>
      {PRINCIPLES.map((principle, index) => (
        <Reveal as="li" key={principle.title} className={`glass-panel ${styles.card}`}>
          <span className={`type-overline font-mono text-color-tertiary ${styles.index}`} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className={`type-title text-color-primary ${styles.title}`}>
            {principle.title}
          </h3>
          <p className="type-body text-color-secondary">
            {principle.body}
          </p>
        </Reveal>
      ))}
    </Stagger>
  )
}

export default PrinciplesList
