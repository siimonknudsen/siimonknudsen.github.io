import { useEffect } from 'react'

const SITE = 'Simon Knudsen'
const TAGLINE = 'Product Designer'

/**
 * Sets document.title for the current page. Pass a page-specific title;
 * falls back to the site default. Keeps tab titles meaningful per route
 * (a small but real UX/SEO win for an SPA).
 */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} | ${TAGLINE} Portfolio`
  }, [title])
}
