import { allArchiveProjects } from '../data/projects'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import ProjectCard from '../components/projects/ProjectCard'
import styles from './Archive.module.css'

function Archive() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollAnimation>
          <h1 className={styles.title}>Archive</h1>
        </ScrollAnimation>
        <div className={styles.grid}>
          {allArchiveProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              delay={(index % 2) * 80}
              noMedia={project.noMedia}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Archive
