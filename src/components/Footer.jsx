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

            <div className="flex flex-col gap-2">
              <Link to="/archive" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Archive
              </Link>
              <Link to="/style-guide" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Style Guide
              </Link>
            </div>
          </div>

          {/* Column 2: Projects */}
          <div className="flex flex-col">
            <h3 className="text-sm font-normal text-color-primary mb-4 leading-none">Projects</h3>
            <div className="flex flex-col gap-2">
              {allProjects.map((project) => (
                <Link 
                  key={project.id}
                  to={`/project/${project.id}`} 
                  className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors"
                >
                  {project.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: About */}
          <div className="flex flex-col">
            <h3 className="text-sm font-normal text-color-primary mb-4 leading-none">About</h3>
            <div className="flex flex-col gap-2">
              <Link to="/about#about-me" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                About me
              </Link>
              <Link to="/about#companies" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Companies
              </Link>
              <Link to="/about#skills" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Skills
              </Link>
              <Link to="/about#testimonials" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Testimonials
              </Link>
              <Link to="/about#pictures" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Pictures
              </Link>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col">
            <h3 className="text-sm font-normal text-color-primary mb-4 leading-none">Contact</h3>
            <div className="flex flex-col gap-2">
              <a href="mailto:simonoverlund@hotmail.com" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                simonoverlund@hotmail.com
              </a>
              <a 
                href="https://www.linkedin.com/in/simon-knudsen/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-color-on-primary pt-6">
          <p className="text-xs text-color-secondary font-normal text-center">
            © 2021-{new Date().getFullYear()} Simon Knudsen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

