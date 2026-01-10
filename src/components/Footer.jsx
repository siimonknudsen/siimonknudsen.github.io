import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import Location from './Location'

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
              <a href="#zliide-app" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Zliide App
              </a>
              <a href="#apple-home-app" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Apple Home App
              </a>
              <a href="#zliide-website" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Zliide Website
              </a>
              <a href="#adservice-website" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Adservice Website
              </a>
              <a href="#leadplatform-website" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                LeadPlatform Website
              </a>
              <a href="#zliide-dashboard" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Zliide Dashboard
              </a>
            </div>
          </div>

          {/* Column 3: About */}
          <div className="flex flex-col">
            <h3 className="text-sm font-normal text-color-primary mb-4 leading-none">About</h3>
            <div className="flex flex-col gap-2">
              <a href="#about-me" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                About me
              </a>
              <a href="#skills" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Skills
              </a>
              <a href="#testimonials" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Testimonials
              </a>
              <a href="#design-tech-stack" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Design & Tech Stack
              </a>
              <a href="#pictures" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                Pictures
              </a>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col">
            <h3 className="text-sm font-normal text-color-primary mb-4 leading-none">Contact</h3>
            <div className="flex flex-col gap-2">
              <a href="mailto:simonoverlund@hotmail.com" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                simonoverlund@hotmail.com
              </a>
              <a href="#linkedin" className="text-sm text-color-secondary font-normal hover:text-color-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-color-on-primary pt-6">
          <p className="text-xs text-color-secondary font-normal text-center">
            © 2021-2024 Simon Knudsen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

