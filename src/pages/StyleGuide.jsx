import { useState } from 'react'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import Button from '../components/buttons/Button'
import Media from '../components/Media'
import ShaderBackground from '../components/shader/ShaderBackground'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectTag from '../components/projects/ProjectTag'
import Input from '../components/forms/Input'
import TestimonialCard from '../components/cards/TestimonialCard'
import SkillCard from '../components/cards/SkillCard'
import Avatar from '../components/Avatar'
import Location from '../components/Location'
import ThemeToggle from '../components/ThemeToggle'

/* ── Data ───────────────────────────────────────────────────────── */

const SAMPLE = 'Human-centered by design'

// Semantic type styles (the canonical roles). Each bundles size + weight + line-height.
const typeScale = [
  { label: 'type-display', cls: 'type-display', meta: '48 · Medium' },
  { label: 'type-display-sm', cls: 'type-display-sm', meta: '40 · Medium' },
  { label: 'type-heading', cls: 'type-heading', meta: '32 · Medium' },
  { label: 'type-heading-sm', cls: 'type-heading-sm', meta: '24 · Medium' },
  { label: 'type-title', cls: 'type-title', meta: '20 · Medium' },
  { label: 'type-subtitle', cls: 'type-subtitle', meta: '18 · Medium' },
  { label: 'type-body-lg', cls: 'type-body-lg', meta: '18 · Regular' },
  { label: 'type-body', cls: 'type-body', meta: '16 · Regular' },
  { label: 'type-body-sm', cls: 'type-body-sm', meta: '14 · Regular' },
  { label: 'type-label', cls: 'type-label', meta: '14 · Medium' },
  { label: 'type-caption', cls: 'type-caption', meta: '12 · Regular' },
  { label: 'type-overline', cls: 'type-overline', meta: '12 · Medium · Uppercase' },
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

// Full character set (Inter)
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
  { name: '16', px: 64 },
  { name: '20', px: 80 },
  { name: '32', px: 128 },
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

const radiusScale = [
  { name: '--radius-sm', val: '4px', cls: 'rounded' },
  { name: '--radius-md', val: '8px', cls: 'rounded-lg' },
  { name: '--radius-lg', val: '12px', cls: 'rounded-xl' },
  { name: '--radius-xl', val: '16px', cls: 'rounded-2xl' },
  { name: 'pill · icons only', val: 'full', cls: 'rounded-full' },
]

// Brand ramp (orange) — the owned brand colour
const brandRamp = [
  ['50', '#FFF4EE'], ['100', '#FFE6D6'], ['200', '#FECCAE'], ['300', '#FCAB7C'], ['400', '#F98A4D'],
  ['500', '#F26A2E'], ['600', '#DB5320'], ['700', '#B43F1B'], ['800', '#8C331A'], ['900', '#5F2614'],
]

// Transparent alpha ramps (light = white α, dark = black α)
const transparentSteps = ['2', '4', '8', '12', '16', '24', '40', '60', '80']

// Feedback / status colours (theme-aware semantics)
const feedback = [
  { title: 'Success', token: '--feedback-success', text: 'text-success', soft: 'bg-success-soft', border: 'border-success', light: '#059669', dark: '#34D399' },
  { title: 'Warning', token: '--feedback-warning', text: 'text-warning', soft: 'bg-warning-soft', border: 'border-warning', light: '#D97706', dark: '#FBBF24' },
  { title: 'Error', token: '--feedback-error', text: 'text-error', soft: 'bg-error-soft', border: 'border-error', light: '#DC2626', dark: '#F87171' },
  { title: 'Info', token: '--feedback-info', text: 'text-info', soft: 'bg-info-soft', border: 'border-info', light: '#2563EB', dark: '#60A5FA' },
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
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-color-tertiary">{children}</p>
  )
}

function SectionHeading({ id, overline, title, children }) {
  return (
    <div id={id} className="scroll-mt-28 mb-10">
      <Overline>{overline}</Overline>
      <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-color-primary mt-3 mb-3">{title}</h2>
      {children && <p className="text-[16px] text-color-secondary leading-snug max-w-2xl">{children}</p>}
    </div>
  )
}

function MonoMeta({ children, className = '' }) {
  return <span className={`font-mono text-[12px] text-color-tertiary ${className}`}>{children}</span>
}

function Tile({ label, children, className = '' }) {
  return (
    <div className={`glass-panel rounded-2xl p-5 flex flex-col gap-4 ${className}`}>
      <span className="font-mono text-[11px] uppercase tracking-wider text-color-secondary">{label}</span>
      <div className="flex-1 flex items-center justify-center min-h-[96px]">{children}</div>
    </div>
  )
}

function ColorLabel({ title, token, light, dark }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[14px] font-medium text-color-primary leading-tight">{title}</span>
      <MonoMeta>{token}</MonoMeta>
      <MonoMeta className="text-color-secondary">L {light} · D {dark}</MonoMeta>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────── */

function StyleGuide() {
  const [play, setPlay] = useState(false)

  return (
    <>
      {/* Cover */}
      <section className="relative overflow-hidden px-6 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(var(--border-color-on-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-color-on-primary) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 30% 0%, black, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 30% 0%, black, transparent 75%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <ScrollAnimation>
            <Overline>Portfolio · 2026</Overline>
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-color-primary mt-4 mb-5">
              Design System
            </h1>
            <p className="text-[18px] text-color-secondary leading-snug max-w-2xl">
              The visual language behind this portfolio — the typography, color, frosted-glass
              materials, and components that keep everything consistent across light and dark.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {['Inter', 'Light / Dark', 'Frosted glass', 'Design tokens'].map((t) => (
                <span
                  key={t}
                  className="glass rounded-lg px-4 py-1.5 font-mono text-[12px] text-color-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Body with sticky index */}
      <div className="max-w-6xl mx-auto px-6 pb-24 xl:grid xl:grid-cols-[170px_1fr] xl:gap-16">
        {/* Sticky table of contents */}
        <nav className="hidden xl:block sticky top-28 self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-color-tertiary mb-4">
            On this page
          </p>
          <ul className="flex flex-col gap-2.5">
            {[
              ['#typography', 'Typography'],
              ['#color', 'Color'],
              ['#materials', 'Materials'],
              ['#spacing', 'Spacing & Radius'],
              ['#motion', 'Motion'],
              ['#components', 'Components'],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[14px] text-color-secondary hover:text-color-primary transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-24 min-w-0">
          {/* Typography */}
          <section>
            <ScrollAnimation>
              <SectionHeading id="typography" overline="Foundations" title="Typography">
                One typeface, two weights. Type is set with semantic roles — display, heading,
                body, label — each bundling size, weight and line-height (sizes 10–48).
              </SectionHeading>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="grid sm:grid-cols-[1.2fr_1fr] gap-4 mb-10">
                <div className="glass-panel rounded-2xl p-8 flex flex-col justify-between min-h-[200px]">
                  <span className="text-[88px] leading-none font-medium tracking-tight text-color-primary">
                    Aa
                  </span>
                  <div className="flex items-baseline justify-between mt-6">
                    <span className="text-[20px] font-medium text-color-primary">Inter</span>
                    <MonoMeta>Aa–Zz · 0–9</MonoMeta>
                  </div>
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <div className="glass-panel rounded-2xl p-6 flex items-center justify-between">
                    <span className="text-4xl font-normal text-color-primary">Ag</span>
                    <div className="text-right">
                      <p className="text-[14px] font-medium text-color-primary">Regular</p>
                      <MonoMeta>weight 400</MonoMeta>
                    </div>
                  </div>
                  <div className="glass-panel rounded-2xl p-6 flex items-center justify-between">
                    <span className="text-4xl font-medium text-color-primary">Ag</span>
                    <div className="text-right">
                      <p className="text-[14px] font-medium text-color-primary">Medium</p>
                      <MonoMeta>weight 500</MonoMeta>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="flex flex-col">
                {typeScale.map((t) => (
                  <div key={t.label} className="border-t border-color-on-primary py-5">
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-color-secondary">
                        {t.label}
                      </span>
                      <MonoMeta>{t.meta}</MonoMeta>
                    </div>
                    <p className={`${t.cls} text-color-primary`}>{SAMPLE}</p>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="mt-12">
                <Overline>Character set · Inter</Overline>
                <div
                  className="grid gap-2 mt-4"
                  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(52px, 1fr))' }}
                >
                  {GLYPHS.map((g, i) => (
                    <div
                      key={i}
                      className="glass-item aspect-square rounded-xl border border-color-on-primary flex items-center justify-center"
                    >
                      <span className="text-2xl text-color-primary">{g}</span>
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
                border) that invert between light and dark, plus one green accent and a set of
                feedback colours. Nothing is hard-coded.
              </SectionHeading>
            </ScrollAnimation>

            <div className="flex flex-col gap-10">
              {/* Primitives — neutral ramp */}
              <ScrollAnimation>
                <div>
                  <Overline>Primitives · neutral ramp</Overline>
                  <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
                    {neutrals.map(([step, hex]) => (
                      <div key={step} className="flex flex-col gap-1.5">
                        <div className="h-14 rounded-xl border border-color-secondary" style={{ backgroundColor: `var(--neutral-${step})` }} />
                        <span className="font-mono text-[10px] text-color-primary leading-none">{step}</span>
                        <span className="font-mono text-[10px] text-color-tertiary leading-none">{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* Primitives — brand ramp */}
              <ScrollAnimation>
                <div>
                  <Overline>Primitives · brand ramp (orange)</Overline>
                  <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
                    {brandRamp.map(([step, hex]) => (
                      <div key={step} className="flex flex-col gap-1.5">
                        <div className="h-14 rounded-xl border border-color-secondary" style={{ backgroundColor: `var(--brand-${step})` }} />
                        <span className="font-mono text-[10px] text-color-primary leading-none">{step}</span>
                        <span className="font-mono text-[10px] text-color-tertiary leading-none">{hex}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-accent" />
                    <span className="font-mono text-[11px] text-color-primary">accent</span>
                    <span className="font-mono text-[11px] text-color-tertiary">brand-500 / 600 (themed)</span>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Primitives — transparent ramps */}
              <ScrollAnimation>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Overline>Primitives · transparent light</Overline>
                    <div className="mt-4 rounded-xl overflow-hidden border border-color-secondary" style={{ background: 'repeating-conic-gradient(var(--neutral-700) 0% 25%, var(--neutral-900) 0% 50%) 50% / 16px 16px' }}>
                      <div className="grid grid-cols-9">
                        {transparentSteps.map((s) => (
                          <div key={s} className="h-12" style={{ backgroundColor: `var(--transparent-light-${s})` }} title={`light-${s}`} />
                        ))}
                      </div>
                    </div>
                    <MonoMeta className="mt-2 block">white α · 2–80%</MonoMeta>
                  </div>
                  <div>
                    <Overline>Primitives · transparent dark</Overline>
                    <div className="mt-4 rounded-xl overflow-hidden border border-color-secondary" style={{ background: 'repeating-conic-gradient(var(--neutral-100) 0% 25%, var(--neutral-0) 0% 50%) 50% / 16px 16px' }}>
                      <div className="grid grid-cols-9">
                        {transparentSteps.map((s) => (
                          <div key={s} className="h-12" style={{ backgroundColor: `var(--transparent-dark-${s})` }} title={`dark-${s}`} />
                        ))}
                      </div>
                    </div>
                    <MonoMeta className="mt-2 block">black α · 2–80%</MonoMeta>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Semantic roles → Surfaces */}
              <ScrollAnimation>
                <div>
                  <Overline>Semantic · surfaces</Overline>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
                    {surfaces.map((s) => (
                      <div key={s.token} className="flex flex-col gap-3">
                        <div className={`h-28 rounded-2xl border border-color-secondary ${s.cls}`} />
                        <ColorLabel {...s} />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* Text */}
              <ScrollAnimation>
                <div>
                  <Overline>Text</Overline>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
                    {texts.map((s) => (
                      <div key={s.token} className="flex flex-col gap-3">
                        <div className="h-28 rounded-2xl border border-color-secondary bg-surface-color-secondary flex items-center justify-center">
                          <span className={`text-5xl font-medium ${s.cls}`}>Ag</span>
                        </div>
                        <ColorLabel {...s} />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* Borders + accent */}
              <ScrollAnimation>
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
                  <div>
                    <Overline>Borders</Overline>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
                      {borders.map((s) => (
                        <div key={s.title} className="flex flex-col gap-3">
                          <div className="h-28 rounded-2xl bg-surface-color-primary flex items-center justify-center">
                            <div className={`h-16 w-full mx-4 rounded-xl border-2 ${s.cls}`} />
                          </div>
                          <ColorLabel {...s} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Overline>Accent</Overline>
                    <div className="mt-4 flex flex-col gap-3">
                      <div className="h-28 rounded-2xl border border-color-secondary bg-surface-color-primary flex items-center justify-center">
                        <span className="w-5 h-5 rounded-full bg-accent pulse-glow" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-medium text-color-primary leading-tight">
                          Brand · Orange
                        </span>
                        <MonoMeta>bg-accent</MonoMeta>
                        <MonoMeta className="text-color-secondary">brand-500 · #F26A2E</MonoMeta>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Feedback / status */}
              <ScrollAnimation>
                <div>
                  <Overline>Semantic · feedback</Overline>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
                    {feedback.map((f) => (
                      <div key={f.token} className="flex flex-col gap-3">
                        <div className={`h-28 rounded-2xl border ${f.border} ${f.soft} flex items-center justify-center`}>
                          <span className={`text-2xl font-semibold ${f.text}`}>{f.title}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[14px] font-medium text-color-primary leading-tight">{f.title}</span>
                          <MonoMeta>{f.token}</MonoMeta>
                          <MonoMeta className="text-color-secondary">L {f.light} · D {f.dark}</MonoMeta>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
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
                className="relative overflow-hidden rounded-2xl p-6 sm:p-10"
                style={{
                  background:
                    'linear-gradient(135deg, var(--accent) 0%, var(--neutral-600) 55%, var(--neutral-900) 100%)',
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="glass rounded-2xl p-5">
                    <p className="text-[15px] font-medium text-color-primary">.glass</p>
                    <p className="text-[13px] text-color-secondary leading-snug mt-1">
                      Bars &amp; chrome. Lighter tint, 16px blur.
                    </p>
                  </div>
                  <div className="glass-panel rounded-2xl p-5">
                    <p className="text-[15px] font-medium text-color-primary">.glass-panel</p>
                    <p className="text-[13px] text-color-secondary leading-snug mt-1">
                      Menus &amp; overlays. Stronger scrim, 24px blur.
                    </p>
                  </div>
                  <div className="glass-panel rounded-2xl p-2">
                    <p className="px-3 pt-2 pb-1 font-mono text-[11px] uppercase tracking-wider text-color-secondary">
                      .glass-item
                    </p>
                    <div className="glass-item glass-item-active rounded-xl px-3 py-2 text-[14px] text-color-primary">
                      Active row
                    </div>
                    <div className="glass-item rounded-xl px-3 py-2 text-[14px] text-color-secondary">
                      Hover row
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {[
                  ['--glass-blur-sm', '8px'],
                  ['--glass-blur-md', '16px'],
                  ['--glass-blur-lg', '24px'],
                  ['--glass-saturate', '180%'],
                ].map(([name, val]) => (
                  <div key={name} className="rounded-2xl border border-color-secondary p-4">
                    <p className="text-[15px] font-medium text-color-primary">{val}</p>
                    <MonoMeta>{name}</MonoMeta>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            {/* Elevation / shadow scale */}
            <ScrollAnimation>
              <div className="mt-10">
                <Overline>Elevation · shadow scale</Overline>
                <p className="text-[14px] text-color-secondary leading-snug max-w-2xl mt-2">
                  For solid (non-glass) surfaces. Theme-aware — tight and subtle in light, deeper
                  and softer in dark.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
                  {elevation.map((e) => (
                    <div key={e.token} className="flex flex-col gap-3">
                      <div
                        className="h-24 rounded-2xl bg-surface-color-secondary"
                        style={{ boxShadow: `var(${e.token})` }}
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-medium text-color-primary leading-tight">{e.name}</span>
                        <MonoMeta>{e.token}</MonoMeta>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </section>

          {/* Spacing & Radius */}
          <section>
            <ScrollAnimation>
              <SectionHeading id="spacing" overline="Foundations" title="Spacing & Radius">
                A consistent rhythm built on a 4px base, with a small set of corner radii.
              </SectionHeading>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <ScrollAnimation>
                <div>
                  <Overline>Spacing</Overline>
                  <div className="flex flex-col gap-3 mt-4">
                    {spacingScale.map((s) => (
                      <div key={s.name} className="flex items-center gap-4">
                        <div className="h-4 rounded bg-accent" style={{ width: `${s.px}px` }} />
                        <MonoMeta className="text-color-secondary">{s.name}</MonoMeta>
                        <MonoMeta>{s.px}px</MonoMeta>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation>
                <div>
                  <Overline>Radius</Overline>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {radiusScale.map((r) => (
                      <div key={r.name} className="flex flex-col gap-2">
                        <div
                          className={`h-20 bg-surface-color-secondary border border-color-secondary ${r.cls}`}
                        />
                        <div className="flex items-baseline justify-between">
                          <MonoMeta className="text-color-secondary">{r.name}</MonoMeta>
                          <MonoMeta>{r.val}</MonoMeta>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <Overline>Duration</Overline>
                  <div className="flex flex-col gap-2 mt-4">
                    {durations.map((d) => (
                      <div
                        key={d.name}
                        className="flex items-center justify-between rounded-xl border border-color-secondary px-4 py-2.5"
                      >
                        <MonoMeta className="text-color-secondary">{d.name}</MonoMeta>
                        <MonoMeta>{d.ms}</MonoMeta>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Overline>Easing</Overline>
                  <div className="flex flex-col gap-2 mt-4">
                    {easings.map((e) => (
                      <div
                        key={e.name}
                        className="flex items-center justify-between rounded-xl border border-color-secondary px-4 py-2.5"
                      >
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
              <div className="flex flex-col gap-4 mt-6">
                {/* Easing — same distance & duration, different curve */}
                <div className="glass-panel rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-color-secondary">
                      Easing · same distance & duration
                    </span>
                    <button
                      onClick={() => setPlay((p) => !p)}
                      className="type-label px-4 py-1.5 rounded-full bg-surface-color-contrast-primary text-color-contrast-primary transition-transform duration-fast ease-standard active:scale-[0.97]"
                    >
                      Play ▸
                    </button>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {easings.map((e) => (
                      <div key={e.name} className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-color-secondary w-36 shrink-0">{e.name}</span>
                        <div className="relative flex-1 h-5 rounded-full bg-[color:var(--glass-item-hover)]">
                          <span
                            className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-accent"
                            style={{
                              left: play ? 'calc(100% - 20px)' : '4px',
                              transition: `left 700ms cubic-bezier(${e.curve})`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration — same easing, different speed */}
                <div className="glass-panel rounded-2xl p-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-color-secondary">
                    Duration · same easing (ease-standard)
                  </span>
                  <div className="flex flex-col gap-2.5 mt-4">
                    {durations.map((d) => (
                      <div key={d.name} className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-color-secondary w-36 shrink-0">{d.name}</span>
                        <div className="relative flex-1 h-5 rounded-full bg-[color:var(--glass-item-hover)]">
                          <span
                            className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-surface-color-contrast-primary"
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="group glass-panel rounded-2xl p-5 flex flex-col gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-color-secondary">Hover · lift</span>
                    <div className="flex-1 grid place-items-center min-h-[96px]">
                      <div className="h-16 w-16 rounded-2xl bg-surface-color-tertiary transition-transform duration-fast ease-standard group-hover:-translate-y-1.5 group-hover:scale-105" />
                    </div>
                    <span className="type-caption text-color-secondary">Hover the tile</span>
                  </div>

                  <div className="glass-panel rounded-2xl p-5 flex flex-col gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-color-secondary">Press · scale</span>
                    <div className="flex-1 grid place-items-center min-h-[96px]">
                      <button className="h-16 w-16 rounded-2xl bg-surface-color-contrast-primary transition-transform duration-instant ease-standard active:scale-90" />
                    </div>
                    <span className="type-caption text-color-secondary">Click &amp; hold</span>
                  </div>

                  <div className="glass-panel rounded-2xl p-5 flex flex-col gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-color-secondary">Reveal · fade + rise</span>
                    <div className="flex-1 grid place-items-center min-h-[96px]">
                      <div
                        className="h-16 w-16 rounded-2xl bg-accent"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <Tile label="Buttons" className="sm:col-span-2 lg:col-span-3">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="accent">Accent</Button>
                      <Button variant="glass">Glass</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                      <Button loading>Loading</Button>
                      <Button disabled>Disabled</Button>
                    </div>
                  </div>
                </Tile>
                <Tile label="Tags / Chips">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <ProjectTag>UX Design</ProjectTag>
                    <ProjectTag>UI Design</ProjectTag>
                    <ProjectTag>Design System</ProjectTag>
                  </div>
                </Tile>
                <Tile label="Form input" className="sm:col-span-2">
                  <div className="w-full flex flex-col gap-4">
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
                <Tile label="Location" className="sm:col-span-2">
                  <Location />
                </Tile>
                <Tile label="Media · image">
                  <Media src="/projects/apple-home-app/images/hero" alt="" aspect="aspect-video" rounded="rounded-xl" className="w-full" />
                </Tile>
                <Tile label="Hero background · shader" className="sm:col-span-2 lg:col-span-3">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden">
                    <ShaderBackground
                      colors={['#d8602b', '#09090a', '#160d09', '#7c3618']}
                      speed={0.05}
                      className="w-full h-full"
                    />
                  </div>
                </Tile>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="mb-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-color-secondary mb-4">
                  Project card
                </p>
                <div className="max-w-xl">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-color-secondary mb-4">
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
                  <p className="font-mono text-[11px] uppercase tracking-wider text-color-secondary mb-4">
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
        </div>
      </div>
    </>
  )
}

export default StyleGuide
