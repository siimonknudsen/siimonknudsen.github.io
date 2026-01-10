/**
 * PROJECT CONTENT DATA
 * 
 * NOTE: Projects should now use JSON files in /public/projects/{project-id}/content.json
 * This file is kept for backward compatibility and default content.
 * 
 * To add content for a new project:
 * 1. Find your project ID from ProjectGrid.jsx (e.g., 'zliide-app', 'apple-home-app')
 * 2. Create a folder: /public/projects/{project-id}/
 * 3. Create content.json in that folder with the structure:
 *    {
 *      "metadata": { "client": "...", "year": "...", "type": "...", "responsibilities": [...] },
 *      "challenge": "...",
 *      "solution": "...",
 *      "heroImage": "hero.jpg",
 *      "content": [
 *        { "type": "image", "src": "image1.jpg" },
 *        { "type": "text", "content": "Text content..." }
 *      ]
 *    }
 * 4. Upload images to the project folder
 */

// Legacy content - kept for backward compatibility
// New projects should use JSON files in /public/projects/{project-id}/content.json
export const projectContent = {

}

/**
 * Default content used when a project doesn't have a content.json file
 * This is the fallback structure
 */
export const defaultProjectContent = {
  title: "Project Title",
  description: "Project description",
  client: "Client",
  when: "2024",
  details: "Project",
  responsibilities: ["UX Design", "UI Design"],
  heroImage: null,
  challenge: "This project addressed key user experience challenges through comprehensive research and design.",
  solution: "The solution was developed through iterative design processes, focusing on usability and meeting user needs.",
  content: []
}
