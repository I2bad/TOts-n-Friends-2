import { useEffect, useState, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { cancelFrame, frame } from 'framer-motion'
import Lenis from 'lenis'

// Module-level so ScrollToTop can reach the Lenis instance
let lenisInstance = null

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
  return null
}
import LoadingScreen from './components/LoadingScreen'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import MobileNav from './components/MobileNav'
import Timeline from './pages/Timeline'
import Contact from './pages/Contact'
import Philosophy from './pages/Philosophy'
import MissionSection from './pages/About/components/MissionSection'
import ValuesSection from './pages/About/components/ValuesSection'
import ProgramsSection from './pages/About/components/ProgramsSection'
import TeamSection from './pages/About/components/TeamSection'

function Home({ onSplineReady }) {
  return (
    <div className="text-on-surface font-body">
      {/* Main content sits ON TOP of the fixed footer */}
      <main className="relative z-10 bg-background overflow-x-hidden">
        <Nav />
        <Hero onSplineReady={onSplineReady} />
        <div id="about">
          <MissionSection />
          <ValuesSection />
          <ProgramsSection />
          <TeamSection />
        </div>
        <Testimonials />
        <CTA />
      </main>
      {/* Footer is fixed behind content — revealed as page scrolls up */}
      <Footer />
      <MobileNav />
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [contentMounted, setContentMounted] = useState(false)

  // Promise that resolves when scene GPU render is confirmed (double-RAF + buffer)
  const sceneResolverRef = useRef(null)
  const [sceneReady] = useState(
    () => new Promise((resolve) => { sceneResolverRef.current = resolve })
  )

  // Lenis synced onto Framer Motion's frame loop (no competing RAF)
  useEffect(() => {
    if (loading) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: false, // we drive it from Framer Motion's loop
    })
    lenisInstance = lenis

    // Hook into Framer Motion's update tick — single shared RAF, no contention
    const update = (data) => lenis.raf(data.timestamp)
    frame.update(update, true)

    return () => {
      cancelFrame(update)
      lenis.destroy()
      lenisInstance = null
    }
  }, [loading])

  return (
    <>
      <ScrollToTop />
      {loading && (
        <LoadingScreen
          onFinished={() => setLoading(false)}
          onReadyForContent={() => setContentMounted(true)}
          splineReady={sceneReady}
        />
      )}
      {contentMounted && (
        <Routes>
          <Route path="/" element={<Home onSplineReady={sceneResolverRef.current} />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/philosophy" element={<Philosophy />} />
        </Routes>
      )}
    </>
  )
}
