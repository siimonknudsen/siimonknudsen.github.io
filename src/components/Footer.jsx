import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import Location from './Location'
import { allProjects } from './projects/ProjectGrid'

function Footer() {

  return (
    <footer className="w-full bg-surface-color-primary text-color-primary p-6 border-t border-color-on-primary">
      <div className="max-w-7xl mx-auto">
        {/* Four Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Simon Knudsen */}
          <div className="flex flex-col">
            <div className="mb-4">
              <Avatar name="Simon Knudsen" title="Product Designer" size="small" />
            </div>
            
            <div className="mb-6">
              <Location />
            </div>

            <div className="flex flex-col gap-0.5">
              <Link to="/archive" className="type-body-sm text-color-secondary hover:text-color-primary transition-colors block py-2 rounded-md focus-ring">
                Archive
              </Link>
              <Link to="/design-system" className="type-body-sm text-color-secondary hover:text-color-primary transition-colors block py-2 rounded-md focus-ring">
                Design system
              </Link>
            </div>
          </div>

          {/* Column 2: Projects */}
          <div className="flex flex-col">
            <h3 className="type-label text-color-primary mb-4">Projects</h3>
            <div className="flex flex-col gap-0.5">
              {allProjects.map((project) => (
                <Link 
                  key={project.id}
                  to={`/project/${project.id}`} 
                  className="type-body-sm text-color-secondary hover:text-color-primary transition-colors block py-2 rounded-md focus-ring"
                >
                  {project.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: About */}
          <div className="flex flex-col">
            <h3 className="type-label text-color-primary mb-4">About</h3>
            <div className="flex flex-col gap-0.5">
              <Link to="/about#about-me" className="type-body-sm text-color-secondary hover:text-color-primary transition-colors block py-2 rounded-md focus-ring">
                About me
              </Link>
              <Link to="/about#companies" className="type-body-sm text-color-secondary hover:text-color-primary transition-colors block py-2 rounded-md focus-ring">
                Companies
              </Link>
              <Link to="/about#skills" className="type-body-sm text-color-secondary hover:text-color-primary transition-colors block py-2 rounded-md focus-ring">
                Skills
              </Link>
              <Link to="/about#testimonials" className="type-body-sm text-color-secondary hover:text-color-primary transition-colors block py-2 rounded-md focus-ring">
                Testimonials
              </Link>
              <Link to="/about#pictures" className="type-body-sm text-color-secondary hover:text-color-primary transition-colors block py-2 rounded-md focus-ring">
                Pictures
              </Link>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col">
            <h3 className="type-label text-color-primary mb-4">Contact</h3>
            <div className="flex flex-col gap-0.5">
              <a href="mailto:simonoverlund@hotmail.com" className="type-body-sm text-color-secondary hover:text-color-primary transition-colors block py-2 rounded-md focus-ring">
                simonoverlund@hotmail.com
              </a>
              <a 
                href="https://www.linkedin.com/in/simon-knudsen/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="type-body-sm text-color-secondary hover:text-color-primary transition-colors block py-2 rounded-md focus-ring"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-color-on-primary pt-6">
          <p className="type-caption text-color-secondary text-center">
            © 2021-{new Date().getFullYear()} Simon Knudsen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

