import { Reveal } from '../motion'
import styles from './ShowreelTile.module.css'

/**
 * ShowreelTile — a 16:9 glass-panel PLACEHOLDER for the selected-work reel.
 * Deliberately reads as "coming soon": a play glyph + caption over a frosted
 * stage. Swap the inner placeholder block for a <video> or <Media> later.
 */
function ShowreelTile() {
  return (
    <Reveal as="section" preset="fade-up" className={styles.wrap}>
      <p className={`type-overline font-mono text-color-tertiary ${styles.overline}`}>
        Selected work
      </p>

      <div className={`glass-panel ${styles.frame}`}>
        {/* 16:9 stage — replace this block with a <video>/<Media> when ready */}
        <div className={styles.stage} aria-hidden="true">
          <span className={`glass-item ${styles.play}`}>
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="currentColor"
              focusable="false"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>

        <p className={`type-caption text-color-secondary ${styles.caption}`}>
          Showreel — coming soon
        </p>
      </div>
    </Reveal>
  )
}

export default ShowreelTile
