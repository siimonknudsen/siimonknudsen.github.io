import { useEffect, useRef, useState } from 'react'
// `m` is used only as the JSX element <m.div>; ESLint's no-unused-vars doesn't
// count JSX member usage (same workaround as Reveal.jsx/Stagger.jsx).
// eslint-disable-next-line no-unused-vars
import { m } from 'motion/react'
import styles from './MotionLab.module.css'

/**
 * /motion-lab — a side-by-side comparison harness for the reveal motion.
 * LEFT  = the CURRENT production reveal (CSS `.fx-reveal.fx-fade-up`, 0.9s
 *         even-fade tween, fixed — the baseline we're judging against).
 * RIGHT = the NEW Motion spring reveal, with live stiffness/damping/travel/
 *         stagger controls so Simon can dial the feel directly.
 * Both columns replay together (keyed by `runId`) so it's a fair A/B.
 * This page is unlinked (test tool); remove or fold into the style guide later.
 */

const SAMPLE = [
  { k: 'Card', t: 'Project card', d: 'A glass surface revealing on scroll.' },
  { k: 'Card', t: 'Second item', d: 'Staggered just after the first.' },
  { k: 'Card', t: 'Third item', d: 'The cascade continues calmly.' },
  { k: 'Card', t: 'Fourth item', d: 'Last in the group settles in.' },
]

const PRESETS = {
  Calm: { stiffness: 55, damping: 18, mass: 1 },
  Gentle: { stiffness: 90, damping: 22, mass: 1 },
  Soft: { stiffness: 70, damping: 15, mass: 1.1 },
  Snappy: { stiffness: 140, damping: 20, mass: 1 },
}

// LEFT column card — the real current CSS reveal. Starts hidden, gets
// `.is-visible` on the next frame so the production 0.9s transition fires.
function CssCard({ index, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => el.classList.add('is-visible'))
    )
    return () => cancelAnimationFrame(id)
  }, [])
  return (
    <div
      ref={ref}
      className={`fx-reveal fx-fade-up ${styles.card} glass`}
      style={{ transitionDelay: `${index * 90}ms` }} // current stagger step
    >
      {children}
    </div>
  )
}

function CardBody({ item }) {
  return (
    <>
      <span className={`type-overline text-color-tertiary ${styles.kicker}`}>{item.k}</span>
      <h3 className={`type-title text-color-primary ${styles.cardTitle}`}>{item.t}</h3>
      <p className={`type-body text-color-secondary ${styles.cardDesc}`}>{item.d}</p>
    </>
  )
}

function Slider({ label, value, min, max, step, suffix, onChange }) {
  return (
    <label className={styles.slider}>
      <span className={styles.sliderLabel}>
        {label} <strong>{value}{suffix}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

export default function MotionLab() {
  const [runId, setRunId] = useState(0)
  const [spring, setSpring] = useState(PRESETS.Calm)
  const [travel, setTravel] = useState(28) // px
  const [stagger, setStagger] = useState(90) // ms
  const [activePreset, setActivePreset] = useState('Calm')

  const replay = () => setRunId((n) => n + 1)
  const applyPreset = (name) => {
    setSpring(PRESETS[name])
    setActivePreset(name)
  }
  const setParam = (key) => (val) => {
    setSpring((s) => ({ ...s, [key]: val }))
    setActivePreset('Custom')
  }

  const transition = (i) => ({
    type: 'spring',
    stiffness: spring.stiffness,
    damping: spring.damping,
    mass: spring.mass,
    delay: (i * stagger) / 1000,
  })

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <h1 className="type-display text-color-primary">Motion lab</h1>
        <p className="type-body-lg text-color-secondary">
          Same content, revealed two ways. <strong>Left</strong> is the current CSS reveal
          (0.9s even fade — the baseline). <strong>Right</strong> is the new Motion spring —
          tune it live below, then hit replay.
        </p>
      </header>

      {/* ── Controls ───────────────────────────────────────── */}
      <div className={`${styles.controls} glass-panel`}>
        <div className={styles.presets}>
          {Object.keys(PRESETS).map((name) => (
            <button
              key={name}
              className={`${styles.preset} ${activePreset === name ? styles.presetActive : ''}`}
              onClick={() => applyPreset(name)}
            >
              {name}
            </button>
          ))}
          <span className={`${styles.preset} ${activePreset === 'Custom' ? styles.presetActive : ''} ${styles.presetCustom}`}>
            Custom
          </span>
        </div>

        <div className={styles.sliders}>
          <Slider label="Stiffness" value={spring.stiffness} min={20} max={200} step={5} onChange={setParam('stiffness')} />
          <Slider label="Damping" value={spring.damping} min={5} max={40} step={1} onChange={setParam('damping')} />
          <Slider label="Mass" value={spring.mass} min={0.5} max={2} step={0.1} onChange={setParam('mass')} />
          <Slider label="Travel" value={travel} min={0} max={64} step={2} suffix="px" onChange={setTravel} />
          <Slider label="Stagger" value={stagger} min={0} max={200} step={10} suffix="ms" onChange={setStagger} />
        </div>

        <button className={styles.replay} onClick={replay}>↻ Replay both</button>
      </div>

      {/* ── Side-by-side stage ─────────────────────────────── */}
      <div className={styles.stage}>
        <section className={styles.column}>
          <h2 className={`type-overline text-color-tertiary ${styles.colHead}`}>Current · CSS (0.9s)</h2>
          <div key={runId} className={styles.cards}>
            {SAMPLE.map((item, i) => (
              <CssCard key={i} index={i}>
                <CardBody item={item} />
              </CssCard>
            ))}
          </div>
        </section>

        <section className={styles.column}>
          <h2 className={`type-overline ${styles.colHead} ${styles.colHeadNew}`}>
            New · Motion spring ({spring.stiffness}/{spring.damping}/{spring.mass})
          </h2>
          <div key={runId} className={styles.cards}>
            {SAMPLE.map((item, i) => (
              <m.div
                key={i}
                className={`${styles.card} glass`}
                initial={{ opacity: 0, y: travel }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition(i)}
              >
                <CardBody item={item} />
              </m.div>
            ))}
          </div>
        </section>
      </div>

      <p className={`type-body-sm text-color-tertiary ${styles.note}`}>
        Tip: lower stiffness + higher damping = slower, softer, no overshoot. Lower damping
        adds a gentle bounce. When a setting feels right, tell me the four numbers and I'll
        make it the site-wide reveal.
      </p>
    </div>
  )
}
