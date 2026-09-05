/**
 * Hero backdrops available in the DEV-ONLY explorer (see HeroExplorer.jsx).
 * `halo` is what production ships; the rest are parked explorations kept one
 * click away so we can keep iterating on them — the sky simulator especially
 * (Simon, 2026-09-05: "save the sky thing for iterations for us").
 * Lives in its own module so the component files export only components and
 * fast refresh keeps working.
 */
export const HERO_VARIANTS = [
  { id: 'halo', label: 'Halo (live)' },
  { id: 'none', label: 'Flat' },
  { id: 'aurora', label: 'Aurora' },
  { id: 'sky', label: 'Sky' },
  { id: 'skytime', label: 'Sky 24h' },
]
