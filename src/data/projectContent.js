/**
 * PROJECT CONTENT DATA
 * 
 * To add content for a project:
 * 1. Find your project ID (e.g., 'zliide-app', 'apple-home-app')
 * 2. Add a new entry below using the project ID as the key
 * 3. Fill in the content sections
 * 
 * Structure:
 * - overview: Array of paragraphs (strings)
 * - keyFeatures: Array of feature descriptions (strings)
 * - images: Array of image paths (strings) - first image is hero, rest are additional
 * - designProcess: Array of objects with { title, description }
 */

export const projectContent = {
  // Zliide In-Store Ordering App
  'zliide-app': {
    challenge: "Zliide is a technology company that seeks to reinvent the fashion industry by making physical retail stores more digital with solutions and features such as assisted-checkout, in-store ordering and informative dashboards. The task was to improve the current user experience of the in-store ordering app.",
    solution: "The new solution improved user satisfaction by 21.3%. The concept was enhanced through feedback gathered from brand stakeholders, store employees, and store customers. During user testing, the new solution was selected as the preferred choice by 100% of the participants. As a result of the new solution, new Figma design system components and tokens were added, while others were updated.",
    overview: [
      "Designed an in-store ordering app increasing physical fashion stores monthly store revenue up by additional 6% by reducing out-of-stock situations.",
      "The redesign focused on improving the user experience through comprehensive research with brand stakeholders, store employees, and customers. The solution addressed key pain points in the ordering process while maintaining brand consistency."
    ],
    keyFeatures: [
      "Reduced out-of-stock situations leading to 6% increase in monthly store revenue",
      "Improved user satisfaction by 21.3%",
      "100% user preference in testing sessions",
      "Enhanced design system with new components and tokens",
      "Streamlined in-store ordering workflow"
    ],
    images: [
      "/projects/zliide-app/hero.jpg",
      "/projects/zliide-app/ordering-flow.jpg",
      "/projects/zliide-app/checkout.jpg"
    ],
    designProcess: [
      {
        title: "UX Research",
        description: "Conducted comprehensive research with brand stakeholders, store employees, and store customers to understand pain points in the current in-store ordering experience. Gathered feedback to identify key areas for improvement."
      },
      {
        title: "UX & UI Design",
        description: "Designed an improved solution that addressed user needs while maintaining brand consistency. Created wireframes and high-fidelity prototypes, iterating based on stakeholder and user feedback throughout the design process."
      },
      {
        title: "User Testing & Implementation",
        description: "Conducted user testing where the new solution was selected as the preferred choice by 100% of participants. Updated and expanded the Figma design system with new components and tokens. Performed QA testing to ensure quality implementation."
      }
    ],
    metadata: {
      client: "Zliide",
      year: "2024",
      type: "App",
      responsibilities: ["UX Research", "UX Design", "UI Design", "Design System", "User Testing", "QA Testing"]
    }
  },

  // Example: Apple Home App
  'apple-home-app': {
    overview: [
      "The Apple Home App project focused on solving user frictions in energy consumption tracking. Users struggled to understand their electricity, water, and heat consumption patterns, leading to higher bills and environmental impact.",
      "We redesigned the consumption tracking interface to provide clear, actionable insights. The new design increased user awareness of consumption patterns by 60% and helped users reduce their energy usage by an average of 15%."
    ],
    keyFeatures: [
      "Real-time consumption tracking for electricity, water, and heat",
      "Visual consumption patterns and trends over time",
      "Personalized energy-saving recommendations",
      "Smart device integration and automation",
      "Cost breakdown and budget tracking"
    ],
    images: [
      "/projects/apple-home-app/hero.jpg",
      "/projects/apple-home-app/consumption.jpg",
      "/projects/apple-home-app/insights.jpg"
    ],
    designProcess: [
      {
        title: "Research",
        description: "Analyzed user behavior data and conducted interviews to understand why users weren't engaging with consumption tracking features. Identified key friction points in the current interface."
      },
      {
        title: "Design",
        description: "Designed intuitive visualizations for consumption data that made complex information easy to understand. Created a recommendation system that provided actionable insights."
      },
      {
        title: "Implementation",
        description: "Worked closely with Apple's design and engineering teams to implement the new consumption tracking features, ensuring seamless integration with existing HomeKit infrastructure."
      }
    ]
  },

  // Example: Zliide Website (with different images and text)
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
  },

  // Example: Adservice Website (completely different content)
  'adservice-website': {
    overview: [
      "Complete redesign of the Adservice website to modernize the brand and improve user experience. The project involved a comprehensive audit of the existing site and user research to identify key improvement areas.",
      "The new design system created consistency across all pages while improving load times and mobile responsiveness."
    ],
    keyFeatures: [
      "Modern, clean design system",
      "Improved page load performance",
      "Enhanced mobile responsiveness",
      "Better content hierarchy",
      "Streamlined contact and inquiry forms"
    ],
    images: [
      "/projects/adservice-website/hero.jpg",
      "/projects/adservice-website/services.jpg",
      "/projects/adservice-website/contact.jpg"
    ],
    designProcess: [
      {
        title: "Research",
        description: "Conducted comprehensive website audit and user interviews to identify pain points and opportunities for improvement."
      },
      {
        title: "Design",
        description: "Developed a new design system and created high-fidelity mockups for all key pages, focusing on modern aesthetics and usability."
      },
      {
        title: "Implementation",
        description: "Worked closely with developers to ensure pixel-perfect implementation and optimal performance across all devices."
      }
    ]
  },

  // Add more projects here - each can have completely different images and text:
  // 'your-project-id': {
  //   overview: [
  //     "Your unique overview text paragraph 1...",
  //     "Your unique overview text paragraph 2..."
  //   ],
  //   keyFeatures: [
  //     "Your unique feature 1",
  //     "Your unique feature 2",
  //     "Your unique feature 3"
  //   ],
  //   images: [
  //     "/projects/your-project/your-hero-image.jpg",  // Different images for each project
  //     "/projects/your-project/your-image-1.jpg",
  //     "/projects/your-project/your-image-2.jpg"
  //   ],
  //   designProcess: [
  //     {
  //       title: "Research",
  //       description: "Your unique research description..."
  //     },
  //     {
  //       title: "Design",
  //       description: "Your unique design description..."
  //     },
  //     {
  //       title: "Implementation",
  //       description: "Your unique implementation description..."
  //     }
  //   ]
  // },
}

/**
 * Default content used when a project doesn't have specific content defined
 * Projects without entries in projectContent will use this fallback
 */
export const defaultProjectContent = {
  overview: [
    "This project represents a comprehensive approach to solving complex user experience challenges. Through extensive research and iterative design processes, we developed a solution that addresses the core needs of our target audience while maintaining a focus on usability and aesthetic appeal.",
    "The design process involved multiple stages including user interviews, competitive analysis, wireframing, prototyping, and user testing. Each phase contributed valuable insights that shaped the final product into something truly impactful."
  ],
  keyFeatures: [
    "Intuitive user interface with clear navigation patterns",
    "Responsive design that works across all device sizes",
    "Accessibility features ensuring inclusive user experience",
    "Performance optimizations for fast loading times",
    "Seamless integration with existing systems"
  ],
  images: [],
  designProcess: [
    {
      title: "Research",
      description: "Conducted extensive user research to understand pain points and identify opportunities for improvement."
    },
    {
      title: "Design",
      description: "Created wireframes and high-fidelity prototypes, iterating based on feedback and testing results."
    },
    {
      title: "Implementation",
      description: "Collaborated closely with developers to ensure design fidelity and optimal user experience."
    }
  ]
}

/**
 * Helper function to get content for a project
 * @param {string} projectId - The project ID
 * @returns {object} Project content or default content
 */
export const getProjectContent = (projectId) => {
  return projectContent[projectId] || defaultProjectContent
}
