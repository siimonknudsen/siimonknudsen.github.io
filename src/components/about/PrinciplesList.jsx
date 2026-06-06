import { Reveal, Stagger } from '../motion'
import styles from './PrinciplesList.module.css'

const PRINCIPLES = [
  {
    title: 'Work first',
    body: 'The work is the hero — the interface stays quiet so the craft and the outcomes lead.',
  },
  {
    title: 'Clarity over cleverness',
    body: 'Every choice should aid comprehension; if an effect fights the user, it goes.',
  },
  {
    title: 'Craft in the details',
    body: 'Hover states, easing, optical alignment — the last 1% is what separates good from done.',
  },
  {
    title: 'Accessible by default',
    body: 'Contrast, keyboard support and reduced-motion are baseline requirements, not extras.',
  },
  {
    title: 'Systems, not one-offs',
    body: 'I design reusable patterns and tokens so the whole product moves together over time.',
  },
  {
    title: 'Outcomes over output',
    body: 'Success is a metric that moved for the business and the user, not the number of screens shipped.',
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
