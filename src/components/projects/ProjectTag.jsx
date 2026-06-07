import styles from './ProjectTag.module.css'

function ProjectTag({ children }) {
  return (
    <span className={`type-caption text-color-secondary ${styles.tag}`}>
      {children}
    </span>
  )
}

export default ProjectTag
