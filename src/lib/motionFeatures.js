// Lazy-loaded Motion feature bundle. `domAnimation` covers
// transforms/opacity/layout-free animations + AnimatePresence exits + gestures
// (whileHover/whileTap/whileInView) — everything our reveals/transitions need,
// WITHOUT the heavier drag/layout `domMax` set. Loaded on demand by <LazyMotion>
// (see App.jsx) so it stays out of the initial bundle (~no cost to first paint).
import { domAnimation } from 'motion/react'

export default domAnimation
