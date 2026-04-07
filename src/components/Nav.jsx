import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'About', href: '/#about' },
  { label: 'For Parents', to: '/philosophy' },
  { label: 'Our Story', to: '/timeline' },
]

// Warm cream (hero / warm-bg sections) vs barely-darker off-white (white-bg sections)
const NAV_WARM = '#f1e5d5'
const NAV_COOL = '#ece7e0'
// Routes where the whole page is white/neutral — start on cool
const COOL_ROUTES = ['/timeline']

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [navBg, setNavBg] = useState(NAV_WARM)
  const location = useLocation()
  const [showLogo, setShowLogo] = useState(location.pathname !== '/')

  // Set default pill color per route (sub-pages have no section observers)
  useEffect(() => {
    setNavBg(COOL_ROUTES.includes(location.pathname) ? NAV_COOL : NAV_WARM)
  }, [location.pathname])

  // Logo visibility — hero section only exists on homepage
  useEffect(() => {
    const target = document.getElementById('hero')
    if (!target) { setShowLogo(true); return }
    const observer = new IntersectionObserver(
      ([entry]) => setShowLogo(!entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [location.pathname])

  // Section-level color switching (landing page)
  useEffect(() => {
    const coolSections = document.querySelectorAll('[data-navtheme="cool"]')
    if (!coolSections.length) return
    const active = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? active.add(e.target) : active.delete(e.target)))
        setNavBg(active.size > 0 ? NAV_COOL : NAV_WARM)
      },
      { rootMargin: '-60px 0px -80% 0px', threshold: 0 }
    )
    coolSections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])

useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const isActive = (link) => {
    if (link.to) return location.pathname === link.to
    if (link.href === '/#about') return location.pathname === '/'
    return false
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 px-6 md:px-10 pt-5"
    >
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">

        {/* Logo — equal width to right side so pill stays centered */}
        <div className="flex-1 flex items-center">
          <Link to="/">
            <motion.img
              src="/logo.png"
              alt="Tots & Friends Childcare Centre"
              initial={showLogo ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -180, scale: 0.5 }}
              animate={{
                opacity: showLogo ? 1 : 0,
                rotate: showLogo ? 0 : -180,
                scale: showLogo ? 1 : 0.5,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: showLogo ? 1.05 : 1 }}
              className="h-14 w-auto select-none"
              style={{ pointerEvents: showLogo ? 'auto' : 'none' }}
            />
          </Link>
        </div>

        {/* Centre pill — desktop */}
        <div
          className="hidden md:flex items-center rounded-full px-1 py-1 gap-0.5 nav-pill"
          style={{ backgroundColor: navBg, transition: 'background-color 0.4s ease' }}
        >
          {links.map((link) => {
            const active = isActive(link)
            const cls = `nav-pill-link ${active ? 'nav-pill-active' : ''} px-5 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase transition-colors`

            return link.to ? (
              <Link key={link.label} to={link.to} className={cls}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={cls}>
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Right actions */}
        <div className="flex-1 hidden md:flex items-center justify-end gap-3">
          <Link to="/contact">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`px-7 py-3 rounded-full font-bold text-sm tracking-wide transition-colors shadow-lg ${location.pathname === '/contact'
                  ? 'bg-amber-500 text-white shadow-amber-500/30'
                  : 'bg-amber-400 hover:bg-amber-500 text-white shadow-amber-400/30'
                }`}
            >
              Get in Touch
            </motion.div>
          </Link>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="w-11 h-11 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center text-xs transition-colors shadow-md"
          >
            ◀
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-white/80 rounded-full backdrop-blur-sm"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-5 h-0.5 bg-gray-800 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-800 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-800 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden md:hidden mt-2"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-6 py-5 flex flex-col gap-3 shadow-lg">
          {links.map((link) => {
            const active = isActive(link)
            const baseClass = "text-base font-semibold uppercase tracking-wide py-2 border-b border-gray-100 last:border-0 transition-colors"

            return link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={`${baseClass} ${active ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`${baseClass} text-gray-600 hover:text-gray-900`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          })}
          <Link
            to="/contact"
            className="mt-2 bg-amber-400 text-white px-6 py-3 rounded-full font-bold text-sm w-full text-center block"
            onClick={() => setMenuOpen(false)}
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  )
}
