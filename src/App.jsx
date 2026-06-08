import { useEffect, useRef, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { LazyMotion } from 'motion/react'
import Home from './pages/Home'
// Non-landing routes are code-split: each becomes its own chunk loaded on first
// visit, so the heavy internal pages (StyleGuide/Playground) no longer ship in
// the initial bundle. Home stays eager (it's the landing page). The global
// shader/header/footer remain mounted during navigation, so a null Suspense
// fallback is seamless (no layout flash).
const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const Archive = lazy(() => import('./pages/Archive'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const StyleGuide = lazy(() => import('./pages/StyleGuide'))
const Playground = lazy(() => import('./pages/Playground'))
const MotionLab = lazy(() => import('./pages/MotionLab'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Lazily pull in Motion's animation feature set so it stays out of the initial
// bundle (the `m` components stay tiny until this resolves).
const loadMotionFeatures = () => import('./lib/motionFeatures').then((m) => m.default)
import Header from './components/Header'
import Footer from './components/Footer'
import IntroLoader from './components/IntroLoader'
import CookieConsent from './components/CookieConsent'
import ScrollToTop from './components/animations/ScrollToTop'
import { initConsent } from './lib/consent'
import styles from './App.module.css'

// Document titles for the static routes (project pages set their own).
const ROUTE_TITLES = {
  '/': null, // site default
  '/archive': 'Archive',
  '/about': 'About',
  '/contact': 'Contact',
  '/style-guide': 'Design System',
  '/design-system': 'Design System',
  '/playground': 'Playground',
}

// Keyed by pathname so the gentle fade-in (.page-enter) re-runs on each navigation.
function AnimatedRoutes() {
  const location = useLocation()
  // Skip the curtain wipe on the very first paint; only play it on
  // subsequent client-side navigations.
  const firstRender = useRef(true)

  // Keep the tab title meaningful per route (ProjectPage overrides via usePageTitle).
  useEffect(() => {
    if (location.pathname in ROUTE_TITLES) {
      const t = ROUTE_TITLES[location.pathname]
      document.title = t ? `${t} · Simon Knudsen` : 'Simon Knudsen | Product Designer Portfolio'
    }
  }, [location.pathname])

  // Render the wipe for this navigation, then flip the flag off so the
  // first load stays untouched. Read before flipping so the panel still
  // mounts on the *next* navigation (the first real route change).
  // Intentional: reading the ref during render to decide whether to play the
  // wipe on this navigation. The flag is flipped in the effect below, so the
  // first paint is skipped and every later navigation plays. Safe because the
  // value only ever goes true→false once and the effect re-syncs per route.
  // eslint-disable-next-line react-hooks/refs
  const playWipe = !firstRender.current
  useEffect(() => {
    firstRender.current = false
  }, [location.pathname])

  return (
    <>
      {/* Curtain wipe — keyed by pathname so it remounts and replays on
          every navigation. Sweeps up over the viewport, then off the top. */}
      {/* playWipe is derived from the render-time ref read justified above. */}
      {/* eslint-disable-next-line react-hooks/refs */}
      {playWipe && (
        <div key={location.pathname} className={styles.wipe} aria-hidden="true" />
      )}
      {/* eslint-disable-next-line react-hooks/refs */}
      <div key={location.pathname} className={playWipe ? 'page-enter-nav' : 'page-enter'}>
      <Suspense fallback={null}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="/design-system" element={<StyleGuide />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/motion-lab" element={<MotionLab />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      </div>
    </>
  )
}

function App() {
  // If the visitor accepted analytics on a previous visit, resume Clarity.
  useEffect(() => {
    initConsent()
  }, [])

  return (
    <LazyMotion features={loadMotionFeatures} strict>
    <Router basename={import.meta.env.BASE_URL}>
      {/* Skip link — first focusable element, for keyboard / screen-reader users */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      {/* Single app shell: persistent chrome (Header/Footer) wraps the routed
          content. The nav no longer re-mounts on navigation, and there is one
          real <main> landmark + skip-link target for the whole site. */}
      <div className={`${styles.shell} bg-surface-color-primary text-color-primary`}>
        <Header />
        <main id="main-content" tabIndex={-1} className={styles.main}>
          {/* The site's single background: a soft warm mesh that glass actually
              frosts. It MUST live in normal flow (not a `position: fixed` layer)
              because `backdrop-filter` cannot sample a fixed layer — that was the
              old shader's core problem (GLASS §8 "fixed-background trap"). So this
              sits as the FIRST child of <main>, sticky-pinned to the viewport
              (feels fixed on scroll, yet IS sampleable), carrying soft warm radial
              blobs (medium-frequency = frosts beautifully) and NO grid lines (a
              frosted grid was explicitly rejected, GLASS §8). Static by design:
              re-blurring an animating backdrop every scroll frame behind ~20 live
              glass surfaces is the main jank source, so it's pure CSS with only an
              optional slow GPU-cheap transform drift. */}
          <div className={styles.meshBackdrop} aria-hidden="true" />
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
      {/* Global film-grain — filmic depth over the flat-digital surfaces */}
      <div className="grain" aria-hidden="true" />
      {/* First-load intro loader — wordmark + filling line, once per session */}
      <IntroLoader />
      {/* Cookie consent — gates Microsoft Clarity (nothing loads until Accept) */}
      <CookieConsent />
    </Router>
    </LazyMotion>
  )
}

export default App
