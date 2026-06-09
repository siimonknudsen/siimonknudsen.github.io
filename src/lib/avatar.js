// Simon's avatar photo, used everywhere his face appears (header brand, header
// About menu, footer Avatar, About portrait).
//
// Drop the real photo at `public/simon.jpg` and it shows automatically. Until
// then, `onAvatarError` falls back to the memoji (`simon-virtual.png`) so no
// broken image ever renders.
const BASE = import.meta.env.BASE_URL

export const AVATAR_SRC = `${BASE}simon.jpg`

export function onAvatarError(e) {
  // Guard against an infinite loop if the fallback is also missing.
  e.currentTarget.onerror = null
  e.currentTarget.src = `${BASE}simon-virtual.png`
}
