import { useState, useCallback, useRef, useEffect } from 'react'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import useSpotlight from '../hooks/useSpotlight'
import Button from '../components/buttons/Button'
import Media from '../components/Media'
import ShaderBackground from '../components/shader/ShaderBackground'
import ProjectCard from '../components/projects/ProjectCard'
import Badge from '../components/Badge'
import Input from '../components/forms/Input'
import { Reveal, Stagger, useReducedMotion } from '../components/motion'
import TestimonialCard from '../components/cards/TestimonialCard'
import SkillCard from '../components/cards/SkillCard'
import { StatCard, StatGrid, Sparkline, TrendChart } from '../components/charts'
import Avatar from '../components/Avatar'
import Location from '../components/Location'
import ThemeToggle from '../components/ThemeToggle'
import styles from './StyleGuide.module.css'

/* ── Data ───────────────────────────────────────────────────────── */

const SAMPLE = 'Human-centered by design'

// Semantic type styles (the canonical roles). Each bundles size + line-height + weight + tracking.
const typeScale = [
  { label: 'type-display', cls: 'type-display', size: '48 / 1.1', weight: 'Medium', track: '−4%' },
  { label: 'type-display-sm', cls: 'type-display-sm', size: '40 / 1.1', weight: 'Medium', track: '−4%' },
  { label: 'type-heading', cls: 'type-heading', size: '32 / 1.15', weight: 'Medium', track: '−3%' },
  { label: 'type-heading-sm', cls: 'type-heading-sm', size: '24 / 1.2', weight: 'Medium', track: '−3%' },
  { label: 'type-title', cls: 'type-title', size: '20 / 1.3', weight: 'Medium', track: '−2%' },
  { label: 'type-subtitle', cls: 'type-subtitle', size: '18 / 1.4', weight: 'Medium', track: '−2%' },
  { label: 'type-body-lg', cls: 'type-body-lg', size: '18 / 1.6', weight: 'Regular', track: '−2%' },
  { label: 'type-body', cls: 'type-body', size: '16 / 1.6', weight: 'Regular', track: '−2%' },
  { label: 'type-body-sm', cls: 'type-body-sm', size: '14 / 1.5', weight: 'Regular', track: '−1%' },
  { label: 'type-label', cls: 'type-label', size: '14 / 1.4', weight: 'Medium', track: '−1%' },
  { label: 'type-caption', cls: 'type-caption', size: '12 / 1.4', weight: 'Regular', track: '−1%' },
  { label: 'type-overline', cls: 'type-overline', size: '12 / 1.4', weight: 'Medium', track: '+8% · uppercase' },
  { label: 'type-micro', cls: 'type-micro', size: '10 / 1.3', weight: 'Medium', track: '−1%' },
]

const surfaces = [
  { title: 'Surface · Primary', token: '--surface-color-primary', light: '#FFFFFF', dark: '#000000', cls: 'bg-surface-color-primary' },
  { title: 'Surface · Secondary', token: '--surface-color-secondary', light: '#F5F5F5', dark: '#1A1A1A', cls: 'bg-surface-color-secondary' },
  { title: 'Surface · Tertiary', token: '--surface-color-tertiary', light: '#E5E5E5', dark: '#2D2D2D', cls: 'bg-surface-color-tertiary' },
]

const texts = [
  { title: 'Text · Primary', token: '--text-color-primary', light: '#000000', dark: '#FFFFFF', cls: 'text-color-primary' },
  { title: 'Text · Secondary', token: '--text-color-secondary', light: '#525252', dark: '#A3A3A3', cls: 'text-color-secondary' },
  { title: 'Text · Tertiary', token: '--text-color-tertiary', light: '#737373', dark: '#D4D4D4', cls: 'text-color-tertiary' },
]

const borders = [
  { title: 'Border · On Primary', token: '--border-color-on-primary', light: '#E5E5E5', dark: '#1E1E1E', cls: 'border-color-on-primary' },
  { title: 'Border · Primary', token: '--border-color-primary', light: '#1E1E1E', dark: '#1E1E1E', cls: 'border-color-primary' },
  { title: 'Border · Secondary', token: '--border-color-secondary', light: '#D4D4D4', dark: '#404040', cls: 'border-color-secondary' },
]

// Primitive neutral ramp (theme-independent palette the semantics reference)
const neutrals = [
  ['0', '#FFFFFF'], ['50', '#FAFAFA'], ['100', '#F5F5F5'], ['200', '#E5E5E5'],
  ['300', '#D4D4D4'], ['400', '#A3A3A3'], ['500', '#737373'], ['600', '#525252'],
  ['700', '#404040'], ['800', '#2D2D2D'], ['850', '#1E1E1E'], ['900', '#1A1A1A'],
  ['1000', '#000000'],
]

// Full character set (BDO Grotesk)
const GLYPHS = [
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ...'abcdefghijklmnopqrstuvwxyz',
  ...'0123456789',
  ...'&@#$%€£*+=/().,:;!?·—…',
]

// Tailwind step → px (the curated spacing scale)
const spacingScale = [
  { name: '0', px: 0 },
  { name: '0.5', px: 2 },
  { name: '1', px: 4 },
  { name: '1.5', px: 6 },
  { name: '2', px: 8 },
  { name: '3', px: 12 },
  { name: '4', px: 16 },
  { name: '5', px: 20 },
  { name: '6', px: 24 },
  { name: '7', px: 28 },
  { name: '8', px: 32 },
  { name: '9', px: 36 },
  { name: '10', px: 40 },
  { name: '12', px: 48 },
  { name: '14', px: 56 },
  { name: '16', px: 64 },
  { name: '20', px: 80 },
  { name: '32', px: 128 },
  { name: '41', px: 164 },
  { name: '50', px: 200 },
]

const durations = [
  { name: 'duration-instant', ms: '100ms' },
  { name: 'duration-fast', ms: '150ms' },
  { name: 'duration-quick', ms: '200ms' },
  { name: 'duration-base', ms: '300ms' },
  { name: 'duration-slow', ms: '450ms' },
  { name: 'duration-slower', ms: '600ms' },
]

const easings = [
  { name: 'ease-standard', curve: '0.2, 0, 0, 1' },
  { name: 'ease-decelerate', curve: '0.16, 1, 0.3, 1' },
  { name: 'ease-accelerate', curve: '0.3, 0, 1, 1' },
  { name: 'ease-emphasized', curve: '0.05, 0.7, 0.1, 1' },
  { name: 'ease-spring', curve: '0.34, 1.56, 0.64, 1' },
]

// The honest radius scale — sm/md are the only real card radii; lg/xl/2xl all CLAMP to 8 (the 2026 tight cap).
const radiusScale = [
  { name: '--radius-sm', val: '4px', css: '4px' },
  { name: '--radius-md', val: '8px', css: '8px' },
  { name: '--radius-pill', val: 'full', css: '9999px' },
]

// Brand ramp (orange) — the owned brand colour
const brandRamp = [
  ['50', '#FFF4EE'], ['100', '#FFE6D6'], ['200', '#FECCAE'], ['300', '#FCAB7C'], ['400', '#F98A4D'],
  ['500', '#F26A2E'], ['600', '#DB5320'], ['700', '#B43F1B'], ['800', '#8C331A'], ['900', '#5F2614'],
]

// Transparent alpha ramps (light = white α, dark = black α)
const transparentSteps = ['2', '4', '8', '12', '16', '24', '40', '60', '80']

// Status primitive ramps (50→950) — feed the success/warning/error/info roles.
const statusSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
const statusRamps = [
  { key: 'green', label: 'Success · green ramp', hexes: ['#ECFDF5', '#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399', '#10B981', '#059669', '#047857', '#065F46', '#064E3B', '#022C22'] },
  { key: 'amber', label: 'Warning · amber ramp', hexes: ['#FFFBEB', '#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F', '#451A03'] },
  { key: 'red', label: 'Error · red ramp', hexes: ['#FEF2F2', '#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D', '#450A0A'] },
  { key: 'blue', label: 'Info · blue ramp', hexes: ['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A', '#172554'] },
]

// Feedback / status colours (theme-aware semantics)
const feedback = [
  { title: 'Success', token: '--feedback-success', text: 'text-success', soft: 'bg-success-soft', border: 'border-success', light: '#059669', dark: '#34D399' },
  { title: 'Warning', token: '--feedback-warning', text: 'text-warning', soft: 'bg-warning-soft', border: 'border-warning', light: '#D97706', dark: '#FBBF24' },
  { title: 'Error', token: '--feedback-error', text: 'text-error', soft: 'bg-error-soft', border: 'border-error', light: '#DC2626', dark: '#F87171' },
  { title: 'Info', token: '--feedback-info', text: 'text-info', soft: 'bg-info-soft', border: 'border-info', light: '#2563EB', dark: '#60A5FA' },
  { title: 'Action', token: '--action', text: 'text-action', soft: 'bg-action-soft', border: 'border-action', light: '#4F46E5', dark: '#6366F1' },
]

// The eight owned motion presets (the .fx-* / page-enter layer in index.css).
// kind drives how each specimen replays: 'reveal' toggles .is-visible on Play,
// 'stagger' replays staggered children, 'enter' re-runs its keyframe via key,
// 'interactive' responds to pointer / focus and is always live.
const fxPresets = [
  { name: '.fx-reveal', desc: 'Fade in', kind: 'reveal', cls: 'fx-reveal' },
  { name: '.fx-reveal + .fx-fade-up', desc: 'Fade + rise', kind: 'reveal', cls: 'fx-reveal fx-fade-up' },
  { name: '.fx-reveal + .fx-scale-in', desc: 'Scale in', kind: 'reveal', cls: 'fx-reveal fx-scale-in' },
  { name: '.fx-stagger', desc: 'Stagger children', kind: 'stagger' },
  { name: '.fx-reveal (observer)', desc: 'Scroll reveal', kind: 'reveal', cls: 'fx-reveal fx-fade-up' },
  { name: '.fx-hover-lift', desc: 'Hover lift', kind: 'interactive', cls: 'fx-hover-lift' },
  { name: '.fx-press', desc: 'Press scale', kind: 'interactive', cls: 'fx-press' },
  { name: '.page-enter', desc: 'Page transition', kind: 'enter', cls: 'page-enter' },
]

// Elevation / shadow scale (theme-aware)
const elevation = [
  { name: 'shadow-xs', token: '--shadow-xs' },
  { name: 'shadow-sm', token: '--shadow-sm' },
  { name: 'shadow-md', token: '--shadow-md' },
  { name: 'shadow-lg', token: '--shadow-lg' },
  { name: 'shadow-xl', token: '--shadow-xl' },
]

/* ── Building blocks ────────────────────────────────────────────── */

function Overline({ children }) {
  return (
    <p className={`font-mono text-color-tertiary ${styles.overline}`}>{children}</p>
  )
}

function SectionHeading({ id, overline, title, children }) {
  return (
    <div id={id} className={styles.sectionHeading}>
      <Overline>{overline}</Overline>
      <h2 className={`text-color-primary ${styles.sectionTitle}`}>{title}</h2>
      {children && <p className={`text-color-secondary ${styles.sectionLead}`}>{children}</p>}
    </div>
  )
}

function MonoMeta({ children, className = '' }) {
  return <span className={`font-mono text-color-tertiary ${styles.monoMeta} ${className}`}>{children}</span>
}

/* A simple inline icon for the icon-only / icon-pair button demos. Inherits
   currentColor + sizes to 1em so it tracks the button's text colour and size. */
function ArrowIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* The unifying device — a specimen card. Live sample on top, ONE muted mono metadata
   row beneath (name left / values right). Surface = .glass-panel carrying the cursor
   spotlight (.fx-spotlight), or a tonal surface-2/3 fill where glass would stack. No border. */
function Specimen({ children, name, value, surface = 'glass-panel', className = '', sampleClassName = '' }) {
  const onMouseMove = useSpotlight()
  const isGlass = surface === 'glass-panel'
  return (
    <div
      onMouseMove={isGlass ? onMouseMove : undefined}
      className={`${surface} group ${styles.specimen} ${className}`}
    >
      {isGlass && <span aria-hidden="true" className="fx-spotlight" />}
      <div className={`${styles.specimenSample} ${sampleClassName}`}>{children}</div>
      {(name || value) && (
        <div className={styles.specimenMeta}>
          <span className="font-mono text-color-tertiary">{name}</span>
          {value && <span className="font-mono text-color-tertiary">{value}</span>}
        </div>
      )}
    </div>
  )
}

function Tile({ label, children, className = '' }) {
  const onMouseMove = useSpotlight()
  return (
    <div onMouseMove={onMouseMove} className={`glass-panel group ${styles.tile} ${className}`}>
      <span aria-hidden="true" className="fx-spotlight" />
      <span className={`font-mono text-color-secondary ${styles.tileLabel}`}>{label}</span>
      <div className={styles.tileBody}>{children}</div>
    </div>
  )
}

function ColorLabel({ title, token, light, dark }) {
  return (
    <div className={styles.colorLabel}>
      <span className={`text-color-primary ${styles.colorTitle}`}>{title}</span>
      <MonoMeta>{token}</MonoMeta>
      <MonoMeta className="text-color-secondary">L {light} · D {dark}</MonoMeta>
    </div>
  )
}

/* ── Copy-to-clipboard hook ─────────────────────────────────────── */

function useCopy() {
  const [copied, setCopied] = useState(null)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback((value, key) => {
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(value).then(() => {
      setCopied(key)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(null), 1200)
    }).catch(() => {})
  }, [])

  return { copied, copy }
}

/* ── Active-section tracking for the sticky TOC ─────────────────── */
// IntersectionObserver flips the active id when a section heading reaches the
// top third of the viewport. rootMargin: ignore the bottom ~65% so a section
// only counts as "active" once its heading has climbed near the top.
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observed = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!observed.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting heading.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 }
    )

    observed.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

// A swatch that copies a token/hex to the clipboard on click.
function CopySwatch({ value, copyKey, copied, onCopy, className = '', faceClassName = '', style, swatchStyle, children }) {
  const isCopied = copied === copyKey
  return (
    <button
      type="button"
      onClick={() => onCopy(value, copyKey)}
      title={`Copy ${value}`}
      aria-label={`Copy ${value} to clipboard`}
      className={`focus-ring ${styles.copySwatch} ${className}`}
      style={style}
    >
      <span className={`${styles.copySwatchFace} ${faceClassName}`} style={swatchStyle}>
        {children}
        <span
          aria-hidden={!isCopied}
          className={`font-mono ${styles.copyBadge} ${isCopied ? styles.copyBadgeOn : ''}`}
        >
          Copied
        </span>
      </span>
    </button>
  )
}

/* ── Page ───────────────────────────────────────────────────────── */

// Sidebar nav, grouped like a top-tier DS index (Foundations → Library) so the
// page reads as a structured reference, not a flat scroll.
const TOC = [
  ['Foundations', [
    ['typography', 'Typography'],
    ['color', 'Color'],
    ['materials', 'Materials'],
    ['spacing', 'Spacing'],
    ['radius', 'Radius'],
    ['motion', 'Motion'],
  ]],
  ['Library', [
    ['components', 'Components'],
    ['data', 'Data display'],
  ]],
]
const TOC_IDS = TOC.flatMap(([, items]) => items.map(([id]) => id))

function StyleGuide() {
  const [play, setPlay] = useState(false)
  const prefersReduced = useReducedMotion()
  const { copied, copy } = useCopy()
  const activeSection = useActiveSection(TOC_IDS)

  return (
    <>
      {/* Cover */}
      <section className={styles.cover}>
        <div aria-hidden="true" className={styles.coverBloom} />
        <div className={styles.coverInner}>
          {/* Page hero — reveal on mount (immediate), not on scroll: it's above
              the fold on load, so a scroll trigger can leave it faded. */}
          <ScrollAnimation immediate>
            <Overline>Portfolio · 2026</Overline>
            <h1 className={`text-color-primary ${styles.coverTitle}`}>
              Design System
            </h1>
            <p className={`text-color-secondary ${styles.coverLead}`}>
              The visual language behind this portfolio — the typography, color, frosted-glass
              materials, and components that keep everything consistent across light and dark.
            </p>
            <div className={styles.coverTags}>
              {['BDO Grotesk', 'Light / Dark', 'Frosted glass', 'Design tokens'].map((t) => (
                <span
                  key={t}
                  className={`glass font-mono text-color-secondary ${styles.coverTag}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Body with sticky index */}
      <div className={styles.body}>
        {/* Sticky table of contents — active-section tracking */}
        <nav className={styles.toc} aria-label="On this page">
          <p className={`font-mono text-color-tertiary ${styles.tocHeading}`}>
            On this page
          </p>
          {TOC.map(([group, items]) => (
            <div key={group} className={styles.tocGroup}>
              <p className={`text-color-tertiary ${styles.tocGroupLabel}`}>{group}</p>
              <ul className={styles.tocList}>
                {items.map(([id, label]) => {
                  const isActive = activeSection === id
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={`${isActive ? 'text-color-primary' : 'text-color-secondary'} ${styles.tocLink} ${isActive ? styles.tocLinkActive : ''}`}
                      >
                        {label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.content}>
          {/* Typography */}
          <section>
            <ScrollAnimation>
              <SectionHeading id="typography" overline="Foundations" title="Typography">
                One typeface, two weights. Type is set with semantic roles — display, heading,
                body, label — each bundling size, weight and line-height (sizes 10–48).
              </SectionHeading>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.typeFontGrid}>
                <div className={`glass-panel ${styles.typeBigPanel}`}>
                  <span className={`text-color-primary ${styles.typeAa}`}>
                    Aa
                  </span>
                  <div className={styles.typeAaRow}>
                    <span className={`text-color-primary ${styles.typeInterLabel}`}>BDO Grotesk</span>
                    <MonoMeta>Aa–Zz · 0–9</MonoMeta>
                  </div>
                </div>
                <div className={styles.typeWeightCol}>
                  <div className={`glass-panel ${styles.typeWeightCard}`}>
                    <span className={`text-color-primary ${styles.typeAg}`} style={{ fontWeight: 'var(--weight-regular)' }}>Ag</span>
                    <div className={styles.typeWeightText}>
                      <p className={`text-color-primary ${styles.typeWeightName}`}>Regular</p>
                      <MonoMeta>weight 400</MonoMeta>
                    </div>
                  </div>
                  <div className={`glass-panel ${styles.typeWeightCard}`}>
                    <span className={`text-color-primary ${styles.typeAg}`} style={{ fontWeight: 'var(--weight-medium)' }}>Ag</span>
                    <div className={styles.typeWeightText}>
                      <p className={`text-color-primary ${styles.typeWeightName}`}>Medium</p>
                      <MonoMeta>weight 500</MonoMeta>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.group}>
                <Overline>Type scale · semantic roles</Overline>
                <div className={styles.typeScale}>
                  {typeScale.map((t) => (
                    <Specimen
                      key={t.label}
                      name={t.label}
                      value={`${t.size} · ${t.weight} · ${t.track}`}
                    >
                      <p className={`${t.cls} text-color-primary`}>{SAMPLE}</p>
                    </Specimen>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.group}>
                <Overline>In running text · type-body</Overline>
                <p className={`type-body text-color-secondary ${styles.runningText}`}>
                  Type is the hero. Set in BDO Grotesk across two weights, every role pairs a
                  size with its line-height and tracking so paragraphs hold a calm, even rhythm
                  at any length — the negative tracking tightens display sizes without ever
                  pinching body copy, which keeps long reading comfortable and unhurried.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.group}>
                <Overline>Character set · BDO Grotesk</Overline>
                <div className={styles.charGrid}>
                  {GLYPHS.map((g, i) => (
                    <div key={i} className={`glass-item ${styles.charCell}`}>
                      <span className={`text-color-primary ${styles.charGlyph}`}>{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </section>

          {/* Color */}
          <section>
            <ScrollAnimation>
              <SectionHeading id="color" overline="Foundations" title="Color">
                Two tiers — a primitive neutral ramp, mapped to semantic roles (surface, text,
                border) that invert between light and dark, plus one warm-orange accent and a set
                of feedback colours. Nothing is hard-coded.
              </SectionHeading>
            </ScrollAnimation>

            <div className={styles.colorBands}>
            <div className={styles.colorBand}>
              {/* Primitives — neutral ramp */}
              <ScrollAnimation>
                <div>
                  <Overline>Primitives · neutral ramp</Overline>
                  <div className={styles.rampGrid}>
                    {neutrals.map(([step, hex]) => (
                      <div key={step} className={styles.swatchCol}>
                        <CopySwatch
                          value={hex}
                          copyKey={`neutral-${step}`}
                          copied={copied}
                          onCopy={copy}
                          faceClassName={styles.swatchHairline}
                          swatchStyle={{ backgroundColor: `var(--neutral-${step})` }}
                        />
                        <span className={`font-mono text-color-primary ${styles.swatchStep}`}>{step}</span>
                        <span className={`font-mono text-color-tertiary ${styles.swatchHex}`}>{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* Primitives — brand ramp */}
              <ScrollAnimation>
                <div>
                  <Overline>Primitives · brand ramp (orange)</Overline>
                  <div className={styles.rampGrid}>
                    {brandRamp.map(([step, hex]) => (
                      <div key={step} className={styles.swatchCol}>
                        <CopySwatch
                          value={hex}
                          copyKey={`brand-${step}`}
                          copied={copied}
                          onCopy={copy}
                          faceClassName={styles.swatchHairline}
                          swatchStyle={{ backgroundColor: `var(--brand-${step})` }}
                        />
                        <span className={`font-mono text-color-primary ${styles.swatchStep}`}>{step}</span>
                        <span className={`font-mono text-color-tertiary ${styles.swatchHex}`}>{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* Primitives — transparent light (white α), per-swatch like the solid ramps */}
              <ScrollAnimation>
                <div>
                  <Overline>Primitives · transparent light (white α)</Overline>
                  <div className={styles.rampGrid}>
                    {transparentSteps.map((s) => (
                      <div key={s} className={styles.swatchCol}>
                        <CopySwatch
                          value={`--transparent-light-${s}`}
                          copyKey={`tl-${s}`}
                          copied={copied}
                          onCopy={copy}
                          faceClassName={styles.swatchHairline}
                          swatchStyle={{
                            backgroundColor: 'var(--neutral-800)',
                            backgroundImage: `linear-gradient(var(--transparent-light-${s}), var(--transparent-light-${s})), repeating-conic-gradient(var(--neutral-600) 0% 25%, var(--neutral-900) 0% 50%)`,
                            backgroundSize: 'auto, 12px 12px',
                          }}
                        />
                        <span className={`font-mono text-color-primary ${styles.swatchStep}`}>{s}</span>
                        <span className={`font-mono text-color-tertiary ${styles.swatchHex}`}>{s}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* Primitives — transparent dark (black α) */}
              <ScrollAnimation>
                <div>
                  <Overline>Primitives · transparent dark (black α)</Overline>
                  <div className={styles.rampGrid}>
                    {transparentSteps.map((s) => (
                      <div key={s} className={styles.swatchCol}>
                        <CopySwatch
                          value={`--transparent-dark-${s}`}
                          copyKey={`td-${s}`}
                          copied={copied}
                          onCopy={copy}
                          faceClassName={styles.swatchHairline}
                          swatchStyle={{
                            backgroundColor: 'var(--neutral-100)',
                            backgroundImage: `linear-gradient(var(--transparent-dark-${s}), var(--transparent-dark-${s})), repeating-conic-gradient(var(--neutral-300) 0% 25%, var(--neutral-0) 0% 50%)`,
                            backgroundSize: 'auto, 12px 12px',
                          }}
                        />
                        <span className={`font-mono text-color-primary ${styles.swatchStep}`}>{s}</span>
                        <span className={`font-mono text-color-tertiary ${styles.swatchHex}`}>{s}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* Primitives — status ramps (success / warning / error / info) */}
              {statusRamps.map((ramp) => (
                <ScrollAnimation key={ramp.key}>
                  <div>
                    <Overline>Primitives · {ramp.label}</Overline>
                    <div className={styles.rampGrid}>
                      {statusSteps.map((step, i) => (
                        <div key={step} className={styles.swatchCol}>
                          <CopySwatch
                            value={ramp.hexes[i]}
                            copyKey={`${ramp.key}-${step}`}
                            copied={copied}
                            onCopy={copy}
                            faceClassName={styles.swatchHairline}
                            swatchStyle={{ backgroundColor: `var(--${ramp.key}-${step})` }}
                          />
                          <span className={`font-mono text-color-primary ${styles.swatchStep}`}>{step}</span>
                          <span className={`font-mono text-color-tertiary ${styles.swatchHex}`}>{ramp.hexes[i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <div className={styles.colorBand}>
              {/* Accent — its own lone specimen moment */}
              <ScrollAnimation>
                <div>
                  <Overline>Accent · the one warm colour</Overline>
                  <div className={styles.accentStage}>
                    <span className={`bg-accent ${styles.accentBlock}`} />
                    <div className={styles.accentInfo}>
                      <span className={`text-color-primary ${styles.colorTitle}`}>Brand · Orange</span>
                      <p className={`text-color-secondary ${styles.accentBlurb}`}>
                        The single owned accent — themed for contrast (brand-500 dark / brand-600
                        light). All other colour comes from project imagery; the chrome stays
                        monochrome plus this one warm signal.
                      </p>
                      <div className={styles.accentTokens}>
                        <MonoMeta>bg-accent</MonoMeta>
                        <MonoMeta>brand-500 · #F26A2E</MonoMeta>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Semantic roles → Surfaces */}
              <ScrollAnimation>
                <div>
                  <Overline>Semantic · surfaces</Overline>
                  <div className={styles.threeCol}>
                    {surfaces.map((s) => (
                      <div key={s.token} className={styles.colorItem}>
                        <div className={`${s.cls} ${styles.colorSwatchLg} ${styles.swatchHairline}`} />
                        <ColorLabel {...s} />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* Text */}
              <ScrollAnimation>
                <div>
                  <Overline>Semantic · text</Overline>
                  <div className={styles.threeCol}>
                    {texts.map((s) => (
                      <div key={s.token} className={styles.colorItem}>
                        <div className={`bg-surface-color-secondary ${styles.textSwatch}`}>
                          <span className={`${s.cls} ${styles.textSwatchAg}`}>Ag</span>
                        </div>
                        <ColorLabel {...s} />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* Borders */}
              <ScrollAnimation>
                <div>
                  <Overline>Semantic · borders</Overline>
                  <div className={styles.threeCol}>
                    {borders.map((s) => (
                      <div key={s.title} className={styles.colorItem}>
                        <div className={`bg-surface-color-secondary ${styles.borderSwatch}`}>
                          <div className={`${s.cls} ${styles.borderInner}`} />
                        </div>
                        <ColorLabel {...s} />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* Feedback / status */}
              <ScrollAnimation>
                <div>
                  <Overline>Semantic · feedback</Overline>
                  <div className={styles.feedbackGrid}>
                    {feedback.map((f) => (
                      <div key={f.token} className={styles.colorItem}>
                        <CopySwatch
                          value={f.token}
                          copyKey={f.token}
                          copied={copied}
                          onCopy={copy}
                          faceClassName={`${f.soft} ${styles.feedbackSwatch}`}
                        >
                          <span className={`${f.text} ${styles.feedbackTitle}`}>{f.title}</span>
                        </CopySwatch>
                        <div className={styles.colorLabel}>
                          <span className={`text-color-primary ${styles.colorTitle}`}>{f.title}</span>
                          <MonoMeta>{f.token}</MonoMeta>
                          <MonoMeta className="text-color-secondary">L {f.light} · D {f.dark}</MonoMeta>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            </div>
          </section>

          {/* Materials */}
          <section>
            <ScrollAnimation>
              <SectionHeading id="materials" overline="Foundations" title="Materials">
                Frosted-glass surfaces — the signature of the refresh. Shown over color so the blur
                reads. Panels use a stronger fill so text stays legible.
              </SectionHeading>
            </ScrollAnimation>

            <ScrollAnimation>
              <div
                className={styles.materialsShowcase}
                style={{
                  background:
                    'linear-gradient(135deg, var(--accent) 0%, var(--neutral-600) 55%, var(--neutral-900) 100%)',
                }}
              >
                <div className={styles.materialsGrid}>
                  <div className={`glass ${styles.materialCard}`}>
                    <p className={`text-color-primary ${styles.materialName}`}>.glass</p>
                    <p className={`text-color-secondary ${styles.materialDesc}`}>
                      Bars &amp; chrome. Lighter tint, 16px blur.
                    </p>
                  </div>
                  <div className={`glass-panel ${styles.materialCard}`}>
                    <p className={`text-color-primary ${styles.materialName}`}>.glass-panel</p>
                    <p className={`text-color-secondary ${styles.materialDesc}`}>
                      Menus &amp; overlays. Stronger scrim, 24px blur.
                    </p>
                  </div>
                  <div className={`glass-panel ${styles.materialItemCard}`}>
                    <p className={`font-mono text-color-secondary ${styles.materialItemLabel}`}>
                      .glass-item
                    </p>
                    <div className={`glass-item glass-item-active text-color-primary ${styles.materialItemRow}`}>
                      Active row
                    </div>
                    <div className={`glass-item text-color-secondary ${styles.materialItemRow}`}>
                      Hover row
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Glass lab — chips floating over a moving gradient so the blur reads */}
            <ScrollAnimation>
              <div className={styles.glassLab}>
                <div
                  aria-hidden="true"
                  className={`${styles.glassLabStage} ${prefersReduced ? '' : styles.glassLabStageAnim}`}
                />
                <div className={styles.glassLabChips}>
                  <div className={`glass ${styles.glassLabChip}`}>
                    <span className={`text-color-primary ${styles.glassLabChipName}`}>.glass</span>
                    <span className={`font-mono text-color-secondary ${styles.glassLabChipMeta}`}>16px blur · lighter tint</span>
                  </div>
                  <div className={`glass-panel ${styles.glassLabChip}`}>
                    <span className={`text-color-primary ${styles.glassLabChipName}`}>.glass-panel</span>
                    <span className={`font-mono text-color-secondary ${styles.glassLabChipMeta}`}>24px blur · stronger scrim</span>
                  </div>
                </div>
                <span className={`font-mono text-color-tertiary ${styles.glassLabCaption}`}>
                  Glass lab · chips float over a moving gradient — compare how each material blurs the motion behind it
                </span>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.group}>
                <Overline>Blur &amp; saturation tokens</Overline>
                <div className={styles.blurGrid}>
                  {[
                    ['--glass-blur-sm', '8px'],
                    ['--glass-blur-md', '16px'],
                    ['--glass-blur-lg', '24px'],
                    ['--glass-saturate', '180%'],
                  ].map(([name, val]) => (
                    <Specimen key={name} surface="surface-3" name={name}>
                      <p className={`text-color-primary ${styles.blurVal}`}>{val}</p>
                    </Specimen>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            {/* Elevation / shadow scale */}
            <ScrollAnimation>
              <div className={styles.group}>
                <Overline>Elevation · shadow scale</Overline>
                <p className={`text-color-secondary ${styles.elevationLead}`}>
                  For solid (non-glass) surfaces. Theme-aware — tight and subtle in light, deeper
                  and softer in dark.
                </p>
                <div className={`surface-3 ${styles.elevationStage}`}>
                  <div className={styles.elevationGrid}>
                    {elevation.map((e) => (
                      <div key={e.token} className={styles.colorItem}>
                        <div
                          className={`surface-1 ${styles.elevationCard}`}
                          style={{ boxShadow: `var(${e.token})` }}
                        />
                        <div className={styles.colorLabel}>
                          <span className={`text-color-primary ${styles.colorTitle}`}>{e.name}</span>
                          <MonoMeta>{e.token}</MonoMeta>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </section>

          {/* Spacing */}
          <section>
            <ScrollAnimation>
              <SectionHeading id="spacing" overline="Foundations" title="Spacing">
                A consistent rhythm built on a 4px base.
              </SectionHeading>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.group}>
                <Overline>Spacing scale · component rhythm</Overline>
                <div className={styles.spacingList}>
                  {spacingScale.filter((s) => s.px < 128).map((s) => (
                    <div key={s.name} className={styles.spacingRow}>
                      <div className={`bg-accent ${styles.spacingBar}`} style={{ width: `${s.px}px` }} />
                      <MonoMeta className="text-color-secondary">{s.name}</MonoMeta>
                      <MonoMeta>{s.px}px</MonoMeta>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.group}>
                <Overline>Section rhythm · sparse large end</Overline>
                <div className={styles.spacingList}>
                  {spacingScale.filter((s) => s.px >= 128).map((s) => (
                    <div key={s.name} className={styles.spacingRow}>
                      <div className={`bg-accent ${styles.spacingBar}`} style={{ width: `${s.px}px` }} />
                      <MonoMeta className="text-color-secondary">{s.name}</MonoMeta>
                      <MonoMeta>{s.px}px</MonoMeta>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </section>

          {/* Radius */}
          <section>
            <ScrollAnimation>
              <SectionHeading id="radius" overline="Foundations" title="Radius">
                A small, deliberate set of corner radii — tight by design.
              </SectionHeading>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.group}>
                <Overline>Radius scale</Overline>
                <div className={styles.radiusGrid}>
                  {radiusScale.map((r) => (
                    <div key={r.name} className={styles.radiusItem}>
                      <div
                        className={`surface-3 ${styles.radiusSwatch}`}
                        style={{ borderRadius: r.css }}
                      />
                      <div className={styles.radiusMetaRow}>
                        <MonoMeta className="text-color-secondary">{r.name}</MonoMeta>
                        <MonoMeta>{r.val}</MonoMeta>
                      </div>
                    </div>
                  ))}
                </div>
                <p className={`font-mono text-color-tertiary ${styles.radiusNote}`}>
                  --radius-lg / xl / 2xl all clamp to 8px (the 2026 tight cap). Cards, panels,
                  bars and images cap at 8; the pill is reserved for circular elements + chips.
                </p>
              </div>
            </ScrollAnimation>
          </section>

          {/* Motion */}
          <section>
            <ScrollAnimation>
              <SectionHeading id="motion" overline="Foundations" title="Motion">
                Calm, purposeful motion. Durations scale with distance; entrances
                decelerate and settle, exits accelerate away.
              </SectionHeading>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.twoCol}>
                <div className={styles.group}>
                  <Overline>Duration</Overline>
                  <div className={`surface-2 ${styles.motionTokenList}`}>
                    {durations.map((d) => (
                      <div key={d.name} className={styles.motionTokenRow}>
                        <MonoMeta className="text-color-secondary">{d.name}</MonoMeta>
                        <MonoMeta>{d.ms}</MonoMeta>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.group}>
                  <Overline>Easing</Overline>
                  <div className={`surface-2 ${styles.motionTokenList}`}>
                    {easings.map((e) => (
                      <div key={e.name} className={styles.motionTokenRow}>
                        <MonoMeta className="text-color-secondary">{e.name}</MonoMeta>
                        <MonoMeta>cubic-bezier({e.curve})</MonoMeta>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Live examples */}
            <ScrollAnimation>
              <div className={styles.motionExamples}>
                {/* Easing — same distance & duration, different curve */}
                <div className={`glass-panel ${styles.motionPanel}`}>
                  <div className={styles.motionPanelHead}>
                    <span className={`font-mono text-color-secondary ${styles.motionLabel}`}>
                      Easing · same distance & duration
                    </span>
                    <button
                      onClick={() => setPlay((p) => !p)}
                      className={`type-label bg-surface-color-contrast-primary text-color-contrast-primary ${styles.playButton}`}
                    >
                      Play ▸
                    </button>
                  </div>
                  <div className={styles.trackList}>
                    {easings.map((e) => (
                      <div key={e.name} className={styles.trackRow}>
                        <span className={`font-mono text-color-secondary ${styles.trackName}`}>{e.name}</span>
                        <div className={styles.track}>
                          <span
                            className={`bg-accent ${styles.trackDot}`}
                            style={{
                              left: play ? 'calc(100% - 20px)' : '4px',
                              transition: prefersReduced ? 'none' : `left 700ms cubic-bezier(${e.curve})`,
                            }}
                          />
                        </div>
                        <span className={`font-mono text-color-tertiary ${styles.trackCurve}`}>
                          cubic-bezier({e.curve})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration — same easing, different speed */}
                <div className={`glass-panel ${styles.motionPanel}`}>
                  <span className={`font-mono text-color-secondary ${styles.motionLabel}`}>
                    Duration · same easing (ease-standard)
                  </span>
                  <div className={`${styles.trackList} ${styles.panelLabelMt}`}>
                    {durations.map((d) => (
                      <div key={d.name} className={styles.trackRow}>
                        <span className={`font-mono text-color-secondary ${styles.trackName}`}>{d.name}</span>
                        <div className={styles.track}>
                          <span
                            className={`bg-surface-color-contrast-primary ${styles.trackDot}`}
                            style={{
                              left: play ? 'calc(100% - 20px)' : '4px',
                              transition: `left ${d.ms} var(--ease-standard)`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interaction patterns */}
                <div className={styles.interactionGrid}>
                  <div className={`glass-panel ${styles.interactionCard}`}>
                    <span className={`font-mono text-color-secondary ${styles.motionLabel}`}>Hover · lift</span>
                    <div className={styles.interactionStage}>
                      <div className={`bg-surface-color-tertiary ${styles.liftTile}`} />
                    </div>
                    <span className="type-caption text-color-secondary">Hover the tile</span>
                  </div>

                  <div className={`glass-panel ${styles.interactionCard}`}>
                    <span className={`font-mono text-color-secondary ${styles.motionLabel}`}>Press · scale</span>
                    <div className={styles.interactionStage}>
                      <button className={`bg-surface-color-contrast-primary ${styles.pressTile}`} />
                    </div>
                    <span className="type-caption text-color-secondary">Click &amp; hold</span>
                  </div>

                  <div className={`glass-panel ${styles.interactionCard}`}>
                    <span className={`font-mono text-color-secondary ${styles.motionLabel}`}>Reveal · fade + rise</span>
                    <div className={styles.interactionStage}>
                      <div
                        className={`bg-accent ${styles.revealTile}`}
                        style={{
                          opacity: play ? 1 : 0,
                          transform: play ? 'none' : 'translateY(12px)',
                          transition: 'opacity 600ms var(--ease-decelerate), transform 600ms var(--ease-decelerate)',
                        }}
                      />
                    </div>
                    <span className="type-caption text-color-secondary">Tap Play above</span>
                  </div>
                </div>

                {/* Owned motion layer — live staggered reveal */}
                <div className={styles.motionSubBlock}>
                  <span className={`font-mono text-color-secondary ${styles.motionLabel}`}>
                    Presets · the owned motion layer (&lt;Reveal&gt; + &lt;Stagger&gt;)
                  </span>
                  <Stagger key={play ? 'on' : 'off'} className={styles.revealRow}>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <Reveal key={i} preset="fade-up" className={`bg-accent-soft ${styles.revealChip}`} />
                    ))}
                  </Stagger>
                  <span className={`type-caption text-color-secondary ${styles.motionCaption}`}>
                    fade · fade-up · scale-in · stagger · hover-lift · press · scroll-reveal · page-transition — tap Play to replay
                  </span>
                </div>

                {/* The eight .fx-* presets — discoverable specimens */}
                <div className={styles.motionSubBlock}>
                  <span className={`font-mono text-color-secondary ${styles.motionLabel}`}>
                    Presets · the eight .fx-* utility classes
                  </span>
                  <div key={play ? 'fx-on' : 'fx-off'} className={styles.fxGrid}>
                    {fxPresets.map((p) => {
                      // .is-visible reveals the .fx-reveal family; on Play (or reduced motion) show it.
                      const revealed = play || prefersReduced
                      let stage
                      if (p.kind === 'stagger') {
                        stage = (
                          <div className={`fx-stagger ${styles.fxStaggerRow}`}>
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                className={`bg-accent-soft fx-reveal fx-fade-up ${revealed ? 'is-visible' : ''} ${styles.fxStaggerDot}`}
                                style={{ '--i': i }}
                              />
                            ))}
                          </div>
                        )
                      } else if (p.kind === 'interactive') {
                        stage = (
                          <span
                            tabIndex={0}
                            className={`bg-accent-soft ${p.cls} ${styles.fxDot}`}
                          />
                        )
                      } else if (p.kind === 'enter') {
                        // Re-runs its keyframe whenever Play flips (the grid key remounts it).
                        stage = (
                          <span className={`bg-accent-soft ${prefersReduced ? '' : p.cls} ${styles.fxDot}`} />
                        )
                      } else {
                        // reveal family
                        stage = (
                          <span
                            className={`bg-accent-soft ${p.cls} ${revealed ? 'is-visible' : ''} ${styles.fxDot}`}
                          />
                        )
                      }
                      return (
                        <div key={p.name} className={`glass-panel ${styles.fxCard}`}>
                          <div className={styles.fxStage}>{stage}</div>
                          <span className={`font-mono text-color-primary ${styles.fxName}`}>{p.name}</span>
                          <span className="type-caption text-color-tertiary">{p.desc}</span>
                        </div>
                      )
                    })}
                  </div>
                  <span className={`type-caption text-color-secondary ${styles.motionCaption}`}>
                    Entrance presets replay on Play · hover-lift &amp; press respond to pointer / focus
                  </span>
                </div>
              </div>
            </ScrollAnimation>
          </section>

          {/* Components */}
          <section>
            <ScrollAnimation>
              <SectionHeading id="components" overline="Library" title="Components">
                The reusable pieces these pages are built from.
              </SectionHeading>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.componentsGrid}>
                <Tile label="Buttons" className={styles.colSpanFull}>
                  <div className={styles.tileFill}>
                    <div className={styles.btnRow}>
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="accent">Accent</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="glass">Glass</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                    <div className={styles.btnRow}>
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                      <Button loading>Loading</Button>
                      <Button disabled>Disabled</Button>
                    </div>
                    <div className={styles.btnRow}>
                      <Button variant="primary" iconOnly={<ArrowIcon />} aria-label="Continue" />
                      <Button variant="secondary" iconOnly={<PlusIcon />} aria-label="Add item" />
                      <Button variant="outline" iconOnly={<ArrowIcon />} aria-label="Next" />
                      <Button variant="ghost" iconOnly={<PlusIcon />} aria-label="More options" />
                    </div>
                  </div>
                </Tile>
                <Tile label="Tags / Chips">
                  <div className={styles.tagRow}>
                    <Badge size="md">UX Design</Badge>
                    <Badge size="md">UI Design</Badge>
                    <Badge size="md">Design System</Badge>
                  </div>
                </Tile>
                <Tile label="Badges">
                  <div className={styles.tagRow}>
                    <Badge variant="solid">Featured</Badge>
                    <Badge variant="outline">Available</Badge>
                    <Badge variant="active">Archived</Badge>
                    <Badge tone="accent">New</Badge>
                  </div>
                </Tile>
                <Tile label="Form input" className={styles.colSpan2Sm}>
                  <div className={styles.inputCol}>
                    <Input label="Email" type="email" placeholder="you@example.com" hint="We'll never share it." />
                    <Input label="Message" multiline placeholder="Tell me about your project…" error="This field is required." />
                  </div>
                </Tile>
                <Tile label="Theme toggle">
                  <ThemeToggle />
                </Tile>
                <Tile label="Avatar">
                  <Avatar name="Simon Knudsen" title="Product Designer" size="small" />
                </Tile>
                <Tile label="Location" className={styles.colSpan2Sm}>
                  <Location />
                </Tile>
                <Tile label="Media · image">
                  <Media src="/projects/apple-home-app/images/hero" alt="" aspect="aspect-video" rounded="rounded-xl" />
                </Tile>
                <Tile label="Hero background · shader" className={styles.colSpanFull}>
                  <div className={styles.shaderStage}>
                    <ShaderBackground
                      colors={['#d8602b', '#09090a', '#160d09', '#7c3618']}
                      speed={0.05}
                    />
                  </div>
                </Tile>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.cardBlock}>
                <p className={`font-mono text-color-secondary ${styles.cardLabel}`}>
                  Project card
                </p>
                <div className={styles.projectCardWrap}>
                  <ProjectCard
                    id="zliide-app"
                    title="Zliide In-Store Ordering App"
                    description="Redesigned an in-store ordering app increasing physical fashion stores monthly store revenue."
                    tags={['UX Design', 'UI Design', 'Design System']}
                  />
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className={styles.cardsPair}>
                <div>
                  <p className={`font-mono text-color-secondary ${styles.cardLabel}`}>
                    Testimonial card
                  </p>
                  <TestimonialCard
                    logo={null}
                    recommender="Morten Møgelmose"
                    title="CEO"
                    company="Zliide"
                    text="Simon is characterized by his positive energy and willingness to learn. He quickly found his place and contributed to the overall product. Simon has my full recommendation."
                  />
                </div>
                <div>
                  <p className={`font-mono text-color-secondary ${styles.cardLabel}`}>
                    Skill card
                  </p>
                  <SkillCard
                    title="Design Systems"
                    description="Establishing a consistent design language and guidelines to ensure cohesive brand experiences, streamlining development, and scaling across products."
                  />
                </div>
              </div>
            </ScrollAnimation>
          </section>

          {/* Data display — KPI / stats / charts kit */}
          <section>
            <ScrollAnimation>
              <SectionHeading id="data" overline="Library" title="Data display">
                KPIs, stats and trend charts — hand-rolled SVG, zero dependencies,
                driven entirely by the tokens. Depth from the glass surface, spotlight
                glow and whitespace (no borders); accent gradients fade to transparent;
                calm draw-in motion that snaps to final state under reduced motion.
              </SectionHeading>

              <div className={styles.dataStack}>
                <StatGrid>
                  <StatCard
                    label="Monthly revenue"
                    value={48230}
                    prefix="$"
                    delta={12.4}
                    deltaLabel="vs last month"
                    data={[12, 18, 15, 22, 28, 26, 34, 38, 42, 48]}
                    accent
                  />
                  <StatCard
                    label="Active users"
                    value={9120}
                    delta={4.1}
                    deltaLabel="vs last month"
                    data={[40, 42, 41, 45, 47, 46, 50, 53, 55, 58]}
                  />
                  <StatCard
                    label="Churn"
                    value={2.3}
                    decimals={1}
                    suffix="%"
                    delta={-0.6}
                    deltaLabel="vs last month"
                  />
                  <StatCard label="NPS" value={62} delta={8} deltaLabel="vs last quarter" />
                </StatGrid>

                <div className={`glass-panel ${styles.dataPanel}`}>
                  <p className={`type-overline text-color-tertiary ${styles.dataPanelLabel}`}>
                    Revenue · last 12 months
                  </p>
                  <TrendChart
                    data={[18, 22, 21, 27, 31, 29, 36, 35, 41, 46, 44, 52]}
                    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                    format={(v) => `$${v}K`}
                    endLabel="$52K"
                    ariaLabel="Monthly revenue grew from $18K to $52K over the last 12 months"
                  />
                </div>

                <div className={styles.sparklineBlock}>
                  <p className={`type-overline text-color-tertiary ${styles.sparklineLabel}`}>
                    Sparkline
                  </p>
                  <Sparkline data={[8, 12, 10, 16, 14, 20, 18, 26, 30]} height={44} />
                </div>
              </div>
            </ScrollAnimation>
          </section>
        </div>
      </div>
    </>
  )
}

export default StyleGuide
