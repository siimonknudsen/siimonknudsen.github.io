/**
 * PROJECT CONTENT LOADER
 * 
 * Loads project content from JSON files in /public/projects/{project-id}/content.json
 * Falls back to default content if file doesn't exist
 */

import { defaultProjectContent } from './projectContent'

/**
 * Load project content from JSON file
 * @param {string} projectId - The project ID
 * @returns {Promise<object>} Project content or default content
 */
export async function loadProjectContent(projectId) {
  try {
    const response = await fetch(`/projects/${projectId}/content.json`)
    
    if (!response.ok) {
      // File doesn't exist, return default
      return defaultProjectContent
    }
    
    const jsonData = await response.json()
    
    // Transform JSON structure to match expected format
    // Resolve image paths relative to project folder
    const projectBasePath = `/projects/${projectId}/`
    
    return {
      title: jsonData.title || defaultProjectContent.title,
      description: jsonData.description || defaultProjectContent.description,
      client: jsonData.client || defaultProjectContent.client,
      when: jsonData.when || defaultProjectContent.when,
      details: jsonData.details || defaultProjectContent.details,
      responsibilities: jsonData.responsibilities || defaultProjectContent.responsibilities,
      // New optional editorial / case-study fields (null when absent → render falls back)
      role: jsonData.role || null,
      team: jsonData.team || null,
      timeline: jsonData.timeline || null,
      problem: jsonData.problem || null,
      // Process steps: resolve any per-step image relative to the project folder
      process: (jsonData.process || []).map(step => ({
        ...step,
        image: step.image ? `${projectBasePath}${step.image}` : null
      })),
      // Outcomes: { metric, label, note? } — pass through untouched
      outcomes: jsonData.outcomes || [],
      heroImage: jsonData.heroImage ? `${projectBasePath}${jsonData.heroImage}` : null,
      challenge: jsonData.challenge || defaultProjectContent.challenge,
      solution: jsonData.solution || defaultProjectContent.solution,
      content: (jsonData.content || []).map(block => {
        if (block.type === 'image') {
          return {
            ...block,
            src: `${projectBasePath}${block.src}`
          }
        }
        // Behind-the-scenes block: resolve each item's image src
        if (block.type === 'bts') {
          return {
            ...block,
            items: (block.items || []).map(item => ({
              ...item,
              src: item.src ? `${projectBasePath}${item.src}` : item.src
            }))
          }
        }
        return block
      }),
      // App screens for app projects (iPhone mockups)
      appScreens: (jsonData.appScreens || []).map(screen => ({
        ...screen,
        src: `${projectBasePath}${screen.src}`
      }))
    }
  } catch (error) {
    console.warn(`Failed to load content for project ${projectId}:`, error)
    return defaultProjectContent
  }
}

/**
 * Synchronous version that returns default content immediately
 * Use this for initial render, then update with loadProjectContent
 * @returns {object} Default project content
 */
export function getDefaultProjectContent() {
  return defaultProjectContent
}

