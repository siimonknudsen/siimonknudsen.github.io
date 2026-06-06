import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import Location from './Location'
import { allProjects } from './projects/ProjectGrid'
import styles from './Footer.module.css'

function Footer() {

  return (
    <footer className={`bg-surface-color-primary text-color-primary border-color-on-primary ${styles.footer}`}>
      <div className={styles.container}>
        {/* Four Columns */}
        <div className={styles.columns}>
          {/* Column 1: Simon Knudsen */}
          <div className={styles.column}>
            <div className={styles.avatarWrap}>
              <Avatar name="Simon Knudsen" title="Product Designer" size="small" />
            </div>

            <div className={styles.locationWrap}>
              <Location />
            </div>

            <div className={styles.linkList}>
              <Link to="/archive" className={`type-body-sm text-color-secondary focus-ring ${styles.link}`}>
                Archive
              </Link>
              <Link to="/design-system" className={`type-body-sm text-color-secondary focus-ring ${styles.link}`}>
                Design system
              </Link>
            </div>
          </div>

          {/* Column 2: Projects */}
          <div className={styles.column}>
            <h3 className={`type-label text-color-primary ${styles.heading}`}>Projects</h3>
            <div className={styles.linkList}>
              {allProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className={`type-body-sm text-color-secondary focus-ring ${styles.link}`}
                >
                  {project.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: About */}
          <div className={styles.column}>
            <h3 className={`type-label text-color-primary ${styles.heading}`}>About</h3>
            <div className={styles.linkList}>
              <Link to="/about#about-me" className={`type-body-sm text-color-secondary focus-ring ${styles.link}`}>
                About me
              </Link>
              <Link to="/about#companies" className={`type-body-sm text-color-secondary focus-ring ${styles.link}`}>
                Companies
              </Link>
              <Link to="/about#skills" className={`type-body-sm text-color-secondary focus-ring ${styles.link}`}>
                Skills
              </Link>
              <Link to="/about#testimonials" className={`type-body-sm text-color-secondary focus-ring ${styles.link}`}>
                Testimonials
              </Link>
              <Link to="/about#pictures" className={`type-body-sm text-color-secondary focus-ring ${styles.link}`}>
                Pictures
              </Link>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className={styles.column}>
            <h3 className={`type-label text-color-primary ${styles.heading}`}>Contact</h3>
            <div className={styles.linkList}>
              <a href="mailto:simonoverlund@hotmail.com" className={`type-body-sm text-color-secondary focus-ring ${styles.link}`}>
                simonoverlund@hotmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/simon-knudsen/"
                target="_blank"
                rel="noopener noreferrer"
                className={`type-body-sm text-color-secondary focus-ring ${styles.link}`}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-color-on-primary ${styles.bottom}`}>
          <p className={`type-caption text-color-secondary ${styles.copyright}`}>
            © 2021-{new Date().getFullYear()} Simon Knudsen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
