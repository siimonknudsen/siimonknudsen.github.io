# How to Add Content to Project Pages

## Quick Start

1. **Open** `src/data/projectContent.js`
2. **Find your project ID** (check `src/components/projects/ProjectGrid.jsx` for the list)
3. **Add your unique content** - each project can have completely different text and images
4. **Add your images** to `public/projects/[project-id]/` folder

## Project IDs

Current project IDs:
- `zliide-app`
- `apple-home-app`
- `zliide-website`
- `adservice-website`
- `leadplatform-website`
- `zliide-dashboard`
- `archive-project-1` through `archive-project-6`

## Content Structure

Each project needs this structure:

```javascript
'your-project-id': {
  overview: [
    "First paragraph of your overview...",
    "Second paragraph (optional)..."
  ],
  keyFeatures: [
    "Feature 1 description",
    "Feature 2 description",
    "Feature 3 description",
    // Add as many as you want
  ],
  images: [
    "/projects/your-project/hero.jpg",  // First image is the hero
    "/projects/your-project/image1.jpg", // Additional images
    "/projects/your-project/image2.jpg"
  ],
  designProcess: [
    {
      title: "Research",
      description: "Your research phase description..."
    },
    {
      title: "Design",
      description: "Your design phase description..."
    },
    {
      title: "Implementation",
      description: "Your implementation phase description..."
    }
  ]
}
```

## Example

```javascript
'zliide-website': {
  overview: [
    "Redesigned the Zliide company website to improve user engagement and conversion rates. The new design focuses on clear value proposition and streamlined user journeys.",
    "The redesign resulted in a 35% increase in conversion rates and improved user engagement metrics across all key pages."
  ],
  keyFeatures: [
    "Clear value proposition on homepage",
    "Streamlined navigation structure",
    "Improved product showcase",
    "Enhanced mobile experience",
    "Optimized conversion funnels"
  ],
  images: [
    "/projects/zliide-website/hero.jpg",
    "/projects/zliide-website/homepage.jpg",
    "/projects/zliide-website/product-page.jpg"
  ],
  designProcess: [
    {
      title: "Research",
      description: "Analyzed user behavior data and conducted interviews to understand user needs and pain points."
    },
    {
      title: "Design",
      description: "Created wireframes and prototypes focusing on improving conversion rates and user engagement."
    },
    {
      title: "Implementation",
      description: "Collaborated with the development team to implement the new design with focus on performance and accessibility."
    }
  ]
}
```

## Image Paths

- **Each project can have completely different images**
- Place images in the `public/projects/` folder
- Use the structure: `public/projects/[project-id]/[image-name].jpg`
- First image in the array will be the hero image (shown at the top)
- Additional images will appear below the overview section
- **Example structure:**
  ```
  public/
    projects/
      zliide-app/
        hero.jpg
        ordering-flow.jpg
        checkout.jpg
      apple-home-app/
        hero.jpg
        consumption.jpg
        insights.jpg
      your-project/
        hero.jpg
        image1.jpg
        image2.jpg
  ```

## Important Notes

- **Each project is completely independent** - different text, different images
- If you don't add content for a project, it will use default placeholder content
- You can add as many paragraphs to `overview` as you want
- You can add as many `keyFeatures` as needed
- You can add as many images as you want (first one is hero, rest are additional)
- The `designProcess` array should typically have 3 items, but you can customize
- **Images are project-specific** - each project can have its own unique set of images
- **Text is project-specific** - each project can have completely different descriptions, features, and process descriptions

## Quick Template

Copy this template and fill it in:

```javascript
'project-id': {
  overview: [
    "",
    ""
  ],
  keyFeatures: [
    "",
    "",
    ""
  ],
  images: [
    "/projects/project-id/hero.jpg"
  ],
  designProcess: [
    {
      title: "Research",
      description: ""
    },
    {
      title: "Design",
      description: ""
    },
    {
      title: "Implementation",
      description: ""
    }
  ]
}
```

