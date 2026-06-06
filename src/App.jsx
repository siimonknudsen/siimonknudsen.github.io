import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import Archive from './pages/Archive'
import About from './pages/About'
import StyleGuide from './pages/StyleGuide'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/animations/ScrollToTop'
import styles from './App.module.css'

// Document titles for the static routes (project pages set their own).
const ROUTE_TITLES = {
  '/': null, // site default
  '/archive': 'Archive',
  '/about': 'About',
  '/style-guide': 'Design System',
  '/design-system': 'Design System',
}

// Keyed by pathname so the gentle fade-in (.page-enter) re-runs on each navigation.
function AnimatedRoutes() {
  const location = useLocation()

  // Keep the tab title meaningful per route (ProjectPage overrides via usePageTitle).
  useEffect(() => {
    if (location.pathname in ROUTE_TITLES) {
      const t = ROUTE_TITLES[location.pathname]
      document.title = t ? `${t} · Simon Knudsen` : 'Simon Knudsen | Product Designer Portfolio'
    }
  }, [location.pathname])

  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/about" element={<About />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="/design-system" element={<StyleGuide />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
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
    </Router>
  )
}

export default App
