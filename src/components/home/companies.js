import { LenusLogo, BeefitLogo, ZliideLogo, AdtractionLogo } from './WorkedAtLogos'

/**
 * The companies Simon has worked at — shared by the WorkedAt logo row and the
 * hero explorations. NOTE: `period` is supplied by Simon (real dates);
 * `industry`/`size` are best-effort and easy to correct; we don't invent
 * employment data. Order = most recent first.
 *
 * LOGO BALANCE RULE (always apply): every logo MUST read at the same *optical*
 * size in the row, not the same pixel height. Logos differ in proportion
 * (wordmark x-height, ascenders, icon density), so each gets a `logoScale`
 * multiplier on the shared base height to even them out. When adding/replacing
 * a logo, tune its `logoScale` against the others in-browser until the visual
 * weight matches — don't leave it at 1. Current: Lenus 1 · Beefit 1.12 ·
 * Zliide 0.7 · Adtraction 0.9.
 */
export const COMPANIES = [
  {
    name: 'Lenus',
    Logo: LenusLogo,
    industry: 'Health & fitness software',
    size: '300+',
    website: 'lenus.io',
    logoScale: 1, // per-logo optical balance (these logos differ in proportion)
    period: '2025 — Present',
    model: 'B2B2C',
  },
  {
    name: 'Beefit',
    Logo: BeefitLogo,
    industry: 'Health & fitness software',
    size: '10+',
    website: 'beefit.io',
    logoScale: 1.12, // optical balance — see logoScale rule above
    period: '2024 — 2025',
    model: 'B2B2C',
  },
  {
    name: 'Zliide',
    Logo: ZliideLogo,
    industry: 'Fashion technology',
    size: '10+',
    website: '', // Zliide no longer exists
    logoScale: 0.7,
    period: '2023 — 2024',
    model: 'B2B2C',
  },
  {
    name: 'Adtraction',
    Logo: AdtractionLogo,
    industry: 'Affiliate marketing',
    size: '30+',
    website: 'adtraction.com',
    logoScale: 0.9,
    period: '2021 — 2023',
    model: 'B2B',
  },
]
