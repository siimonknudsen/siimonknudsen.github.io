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
    6: "md:grid-cols-3 lg:grid-cols-6"
  }

  const gapClasses = {
    "1": "gap-1",
    "2": "gap-2",
    "4": "gap-4"
  }

  return (
    <div className={`grid grid-cols-2 ${gridCols[columns]} ${gapClasses[gap]}`}>
      {logos.map((logo, index) => (
        <ScrollAnimation key={index}>
          <div className="bg-surface-secondary rounded-lg w-full aspect-square p-3">
            {logo ? (
              <img src={logo} alt={`Logo ${index + 1}`} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full bg-neutral-700 rounded"></div>
            )}
          </div>
        </ScrollAnimation>
      ))}
    </div>
  )
}

export default LogoGrid

