import { allArchiveProjects } from '../components/projects/ProjectGrid'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import ProjectCard from '../components/projects/ProjectCard'
import styles from './Archive.module.css'

function Archive() {
  return (
    <>
      {/* Archive Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollAnimation>
            <h1 className={`type-display text-color-primary ${styles.title}`}>Archive</h1>
          </ScrollAnimation>
          {/* 3 Column Grid */}
          <div className={styles.grid}>
            {allArchiveProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                delay={(index % 2) * 80}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Archive

