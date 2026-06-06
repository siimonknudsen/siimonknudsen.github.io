import { Link } from 'react-router-dom'
import { Reveal, Stagger } from '../components/motion'
import ShaderBackground from '../components/shader/ShaderBackground'
import styles from './Playground.module.css'

/**
 * Playground — frames the site's craft layer as a set of live experiments:
 * the cursor-reactive WebGL shader, the owned motion layer, the glass tokens,
 * and a link into the full design system. Self-contained; no global edits.
 */
function Playground() {
  return (
    <>
      <section id="main-content" tabIndex={-1} className={styles.section}>
        <div className={styles.container}>
          {/* Intro */}
          <Reveal preset="fade-up" as="header" className={styles.intro}>
            <p className="type-overline text-accent">PLAYGROUND</p>
            <h1 className="type-display text-color-primary">Experiments &amp; craft</h1>
            <p className={`type-body text-color-secondary ${styles.lede}`}>
              This site is hand-built from the studs up — a bespoke design system,
              no Tailwind, a custom WebGL shader behind the hero, and an owned
              motion layer that costs roughly nothing. Below are a few of the moving
              parts, left running so you can poke at them.
            </p>
          </Reveal>

          {/* Experiment grid */}
          <div className={styles.grid}>
            {/* (a) Cursor-reactive WebGL shader */}
            <Reveal preset="fade-up" className={`glass-panel ${styles.card} ${styles.cardWide}`}>
              <div className={styles.frame}>
                <ShaderBackground
                  className={styles.shader}
                  colors={['#0a0a0a', '#1c1c1c', '#2a1a10', '#e2632a']}
                  speed={0.08}
                />
              </div>
              <div className={styles.cardBody}>
                <p className="type-overline text-color-tertiary">01 — WebGL</p>
                <h2 className="type-title text-color-primary">Cursor-reactive shader</h2>
                <p className="type-body-sm text-color-secondary">
                  A dependency-free fragment shader. Move your cursor across the
                  frame — the gradient swirls toward the pointer, eased so it glides
                  rather than snaps. Pauses offscreen and respects reduced motion.
                </p>
              </div>
            </Reveal>

            {/* (b) Motion demo */}
            <Reveal preset="fade-up" className={`glass-panel ${styles.card}`}>
              <div className={styles.cardBody}>
                <p className="type-overline text-color-tertiary">02 — Motion</p>
                <h2 className="type-title text-color-primary">Staggered reveals</h2>
                <p className="type-body-sm text-color-secondary">
                  The owned motion layer — CSS presets driven by a tiny hook. Each
                  tile below cascades in on its own delay.
                </p>
              </div>
              <Stagger className={styles.motionTiles}>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <Reveal
                    key={n}
                    preset="scale-in"
                    className={`glass-item ${styles.motionTile}`}
                  >
                    <span className="font-mono type-label text-color-secondary">
                      {String(n + 1).padStart(2, '0')}
                    </span>
                  </Reveal>
                ))}
              </Stagger>
            </Reveal>

            {/* (c) Glass lab */}
            <Reveal preset="fade-up" className={`glass-panel ${styles.card}`}>
              <div className={styles.cardBody}>
                <p className="type-overline text-color-tertiary">03 — Surfaces</p>
                <h2 className="type-title text-color-primary">Glass lab</h2>
                <p className="type-body-sm text-color-secondary">
                  Two frosted recipes over the same gradient — see how
                  <code className={styles.code}>.glass</code> and
                  <code className={styles.code}>.glass-panel</code> catch light
                  differently.
                </p>
              </div>
              <div className={styles.glassStage}>
                <div className={`glass ${styles.glassChip}`}>
                  <span className="type-label text-color-primary">.glass</span>
                </div>
                <div className={`glass-panel ${styles.glassChip}`}>
                  <span className="type-label text-color-primary">.glass-panel</span>
                </div>
              </div>
            </Reveal>

            {/* (d) Link to full design system */}
            <Reveal preset="fade-up" className={styles.card}>
              <Link to="/design-system" className={`glass-panel ${styles.linkCard} focus-ring`}>
                <div className={styles.cardBody}>
                  <p className="type-overline text-color-tertiary">04 — Reference</p>
                  <h2 className="type-title text-color-primary">The full system</h2>
                  <p className="type-body-sm text-color-secondary">
                    Tokens, type roles, colour ramps, glass, motion presets and
                    every component, documented in one place.
                  </p>
                </div>
                <span className={`type-label text-accent ${styles.linkCta}`} aria-hidden="true">
                  Open the design system →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

export default Playground
