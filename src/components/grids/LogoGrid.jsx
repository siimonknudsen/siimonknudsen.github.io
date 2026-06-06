import ScrollAnimation from '../animations/ScrollAnimation'
import styles from './LogoGrid.module.css'

/**
 * Reusable LogoGrid component for displaying company logos
 */
function LogoGrid({ logos = [], columns = 6, gap = "1" }) {
  const gridCols = {
    2: styles.cols2,
    3: styles.cols3,
    4: styles.cols4,
    5: styles.cols5,
    6: styles.cols6,
    7: styles.cols7
  }

  const gapClasses = {
    "1": styles.gap1,
    "2": styles.gap2,
    "4": styles.gap4
  }

  return (
    <div className={`${styles.grid} ${gridCols[columns] || gridCols[7]} ${gapClasses[gap]}`}>
      {logos.map((logo, index) => {
        // Extract company name from logo path for better alt text
        const logoName = logo ? logo.split('/').pop().replace('.png', '').replace(/-/g, ' ') : ''
        return (
          <ScrollAnimation key={index}>
            <div className={styles.cell}>
              {logo ? (
                <img
                  src={logo}
                  alt={logoName || `Company logo ${index + 1}`}
                  loading="lazy"
                  className={styles.logo}
                />
              ) : (
                <div className={`bg-surface-color-tertiary ${styles.placeholder}`}></div>
              )}
            </div>
          </ScrollAnimation>
        )
      })}
    </div>
  )
}

export default LogoGrid

