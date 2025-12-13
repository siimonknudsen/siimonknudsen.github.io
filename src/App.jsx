import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import Archive from './pages/Archive'
import About from './pages/About'
import StyleGuide from './pages/StyleGuide'
import ScrollToTop from './components/animations/ScrollToTop'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/about" element={<About />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </Router>
  )
}

export default App