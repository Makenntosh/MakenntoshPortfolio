import { useState, useEffect } from 'react'
import { C } from './tokens'

import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { FeaturedProject } from './sections/FeaturedProject'
import { ProjectsGrid } from './sections/ProjectsGrid'
import { Services } from './sections/Services'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { ProjectPage } from './pages/ProjectPage'

// ── Minimal hash router ────────────────────────────────────────────────────────
type Route =
  | { type: 'home' }
  | { type: 'project'; id: number }

function parseHash(hash: string): Route {
  const match = hash.match(/^#\/project\/(\d+)$/)
  if (match) return { type: 'project', id: parseInt(match[1], 10) }
  return { type: 'home' }
}

export function navigate(path: string) {
  window.location.hash = path
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const openProject = (id: number) => navigate(`/project/${id}`)
  const goHome = () => navigate('/')

  // Dot-grid background texture
  const pageStyle = {
    background: C.bg,
    backgroundImage: 'radial-gradient(circle at center, rgba(196,147,63,0.04) 1px, transparent 1px)',
    backgroundSize: '32px 32px',
  } as const

  if (route.type === 'project') {
    return (
      <div style={pageStyle}>
        <ProjectPage projectId={route.id} onBack={goHome} />
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <Nav />
      <Hero />
      <FeaturedProject onOpen={openProject} />
      <ProjectsGrid onOpen={openProject} />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
