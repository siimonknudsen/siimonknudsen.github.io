import ScrollAnimation from '../animations/ScrollAnimation'

/**
 * Reusable LogoGrid component for displaying company logos
 */
function LogoGrid({ logos = [], columns = 6, gap = "1" }) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "md:grid-cols-3 lg:grid-cols-6",
    7: "grid-cols-3 xs:grid-cols-4 md:grid-cols-5 lg:grid-cols-[repeat(7,minmax(0,1fr))]"
  }

  const gapClasses = {
    "1": "gap-1",
    "2": "gap-2",
    "4": "gap-4"
  }

  return (
    <div className={`grid ${gridCols[columns] || gridCols[7]} ${gapClasses[gap]}`}>
      {logos.map((logo, index) => {
        // Extract company name from logo path for better alt text
        const logoName = logo ? logo.split('/').pop().replace('.png', '').replace(/-/g, ' ') : ''
        return (
          <ScrollAnimation key={index}>
            <div className="w-full aspect-square rounded overflow-hidden">
              {logo ? (
                <img src={logo} alt={logoName || `Company logo ${index + 1}`} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full bg-neutral-700 rounded"></div>
              )}
            </div>
          </ScrollAnimation>
        )
      })}
    </div>
  )
}

export default LogoGrid

