import { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import Archive from './pages/Archive'
import About from './pages/About'
import StyleGuide from './pages/StyleGuide'
import Playground from './pages/Playground'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import IntroLoader from './components/IntroLoader'
import ScrollToTop from './components/animations/ScrollToTop'
import styles from './App.module.css'

// Document titles for the static routes (project pages set their own).
const ROUTE_TITLES = {
  '/': null, // site default
  '/archive': 'Archive',
  '/about': 'About',
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
  const playWipe = !firstRender.current
  useEffect(() => {
    firstRender.current = false
  }, [location.pathname])

  return (
    <>
      {/* Curtain wipe — keyed by pathname so it remounts and replays on
          every navigation. Sweeps up over the viewport, then off the top. */}
      {playWipe && (
        <div key={location.pathname} className={styles.wipe} aria-hidden="true" />
      )}
      <div key={location.pathname} className={playWipe ? 'page-enter-nav' : 'page-enter'}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/about" element={<About />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="/design-system" element={<StyleGuide />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </>
  )
}

function App() {
  return (
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
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
      {/* Global film-grain — filmic depth over the flat-digital surfaces */}
      <div className="grain" aria-hidden="true" />
      {/* First-load intro loader — wordmark + filling line, once per session */}
      <IntroLoader />
    </Router>
  )
}

export default App
