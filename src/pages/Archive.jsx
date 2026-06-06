import { allArchiveProjects } from '../components/projects/ProjectGrid'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import ProjectCard from '../components/projects/ProjectCard'

function Archive() {
  return (
    <>
      {/* Archive Section */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-page mx-auto">
          <ScrollAnimation>
            <h1 className="type-display text-color-primary mb-12">Archive</h1>
          </ScrollAnimation>
          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {allArchiveProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description=""
                tags={[]}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Archive

