/**
 * PROJECT CONTENT DATA
 *
 * Projects load from JSON at /public/projects/{project-id}/content.json
 * (see projectContentLoader.js). This file only holds the default/fallback
 * content used when a project has no content.json.
 *
 * To add content for a new project:
 * 1. Find your project ID in ProjectGrid.jsx (e.g. 'zliide-app', 'apple-home-app')
 * 2. Create /public/projects/{project-id}/ and a content.json with FLAT fields
 *    (the loader reads these top-level keys — there is no "metadata" wrapper):
 *    {
 *      "title": "...", "description": "...",
 *      "role": "...", "client": "...", "team": "...", "timeline": "...",
 *      "problem": "...", "solution": "...",
 *      "heroImage": "hero.jpg",
 *      "process":  [{ "step": "...", "body": "...", "image": "step1.jpg" }],
 *      "outcomes": [{ "metric": "...", "label": "...", "note": "..." }],
 *      "content":  [{ "type": "image", "src": "image1.jpg" },
 *                   { "type": "text",  "content": "..." }],
 *      "appScreens": [{ "src": "screen1.png" }]
 *    }
 * 3. Upload images into the project folder (paths resolve relative to it).
 */

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
  // New optional editorial / case-study fields. Null/empty by default so the
  // ProjectPage renders the legacy challenge/solution/content blocks and nothing
  // breaks for projects that haven't filled these in yet.
  role: null,
  team: null,
  timeline: null,
  problem: null,
  process: [],
  outcomes: [],
  heroImage: null,
  challenge: "This project addressed key user experience challenges through comprehensive research and design.",
  solution: "The solution was developed through iterative design processes, focusing on usability and meeting user needs.",
  content: []
}
