/**
 * Consent + Microsoft Clarity loader.
 *
 * The ONE place that decides whether any analytics ever runs. Nothing here
 * fires until the visitor taps "Accept" in the cookie banner. On "Decline"
 * we store the choice and load nothing — no script, no cookies.
 *
 * ── How to turn analytics on ────────────────────────────────────────────────
 * 1. Go to https://clarity.microsoft.com → sign in (free) → "New project".
 * 2. Name it (e.g. "Simon Knudsen Portfolio"), set the site URL.
 * 3. Open Settings → Overview and copy the 10-character Project ID
 *    (looks like "abcd1efgh2").
 * 4. Paste it into CLARITY_PROJECT_ID below (or set VITE_CLARITY_ID in a .env
 *    file / the deploy workflow). That's it — recordings + heatmaps + stats
 *    will appear in the Clarity dashboard for anyone who accepts.
 *
 * The Project ID is NOT a secret (it ships in the page source for every
 * analytics tool), so it's safe to paste here directly.
 */

// Paste your Clarity Project ID here, or provide it via VITE_CLARITY_ID.
const CLARITY_PROJECT_ID =
  import.meta.env.VITE_CLARITY_ID || 'mcb5n1jwt7'

export const CONSENT_KEY = 'cookie-consent' // 'accepted' | 'declined'

/** Read the stored choice, or null if the visitor hasn't decided yet. */
export function getConsent() {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

/** Persist the visitor's choice. */
export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* storage blocked (private mode) — choice just won't persist */
  }
}

let clarityInjected = false

/**
 * Inject the Microsoft Clarity tag exactly once. Safe to call repeatedly.
 * No-ops (with a friendly note) until a Project ID is configured.
 */
export function loadClarity() {
  if (typeof window === 'undefined') return
  if (clarityInjected || window.clarity) return

  if (!CLARITY_PROJECT_ID) {
    console.info(
      '[consent] Visitor accepted analytics, but no Clarity Project ID is set yet. ' +
        'Add it in src/lib/consent.js (CLARITY_PROJECT_ID) to start tracking.'
    )
    return
  }

  clarityInjected = true

  // Standard Microsoft Clarity bootstrap snippet.
  ;(function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        ;(c[a].q = c[a].q || []).push(arguments)
      }
    t = l.createElement(r)
    t.async = 1
    t.src = 'https://www.clarity.ms/tag/' + i
    y = l.getElementsByTagName(r)[0]
    y.parentNode.insertBefore(t, y)
  })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID)

  // Signal that the user has granted consent (Clarity's consent API).
  try {
    window.clarity('consent')
  } catch {
    /* clarity not ready yet — the queue above buffers the call */
  }
}

/** On app start: if the visitor previously accepted, resume tracking. */
export function initConsent() {
  if (getConsent() === 'accepted') loadClarity()
}
