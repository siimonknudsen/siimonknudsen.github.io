import ScrollAnimation from '../animations/ScrollAnimation'

/**
 * Reusable ImageGrid component for displaying images in a grid
 */
function ImageGrid({ 
  images = [], 
  columns = 4, 
  gap = "1",
  aspectRatio = "9/16" // "9/16", "16/9", "1/1", etc.
}) {
  const gridCols = {
    2: "grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-3 lg:grid-cols-4"
  }

  const gapClasses = {
    "1": "gap-1",
    "2": "gap-2",
    "4": "gap-4"
  }

  const aspectClasses = {
    "9/16": "aspect-[9/16]",
    "16/9": "aspect-video",
    "1/1": "aspect-square"
  }

  return (
    <div className={`grid ${gridCols[columns]} ${gapClasses[gap]}`}>
      {images.map((image, index) => (
        <ScrollAnimation key={index}>
          <div className={`w-full ${aspectClasses[aspectRatio]} bg-neutral-700 rounded-lg overflow-hidden`}>
            {image ? (
              <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
        </ScrollAnimation>
      ))}
    </div>
  )
}

export default ImageGrid

