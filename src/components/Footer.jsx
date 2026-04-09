import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const BALL_COLORS = ['#2B4BDB', '#E84444', '#2D8C50', '#F5C842', '#F4A5C0']
const BALL_COUNT = 23
const ABOVE = 320

const LINK_GROUPS = [
  {
    heading: 'Company',
    links: ['Privacy Policy', 'Safety Standards', 'Careers', 'Contact'],
  },
  {
    heading: 'Explore',
    links: ['Services', 'Gallery', 'Curriculum', 'Testimonials'],
  },
]

function getRadius(vw, vh) {
  const base = Math.round((vw * 0.07 + vh * 0.06) / 2)
  return Math.max(50, Math.min(180, base))
}

function SmileyFace() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <circle cx="34" cy="42" r="13" stroke="white" strokeWidth="5" fill="none" />
      <circle cx="34" cy="42" r="6" fill="white" />
      <circle cx="66" cy="42" r="13" stroke="white" strokeWidth="5" fill="none" />
      <circle cx="66" cy="42" r="6" fill="white" />
      <path d="M 23 64 Q 50 88 77 64"
        stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function Footer() {
  const physContainerRef = useRef(null)
  const footerRef = useRef(null)
  const ballEls = useRef([])
  const faceEls = useRef([])
  const bodiesRef = useRef([])
  const radiiRef = useRef([])
  const rafRef = useRef(null)
  const cleanupRef = useRef(null)
  const matterRef = useRef(null)
  const spacerRef = useRef(null)
  const [expanded, setExpanded] = useState(false)

  const rot3D = useRef(
    Array.from({ length: BALL_COUNT }, () => ({
      rx: (Math.random() - 0.5) * Math.PI * 1.5,
      ry: Math.random() * Math.PI * 2,
    }))
  )

  /* ── Expand / collapse — observe the SPACER (in document flow), not the fixed footer ── */
  useEffect(() => {
    const el = spacerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setExpanded(entry.intersectionRatio > 0.5),
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* ── Physics simulation ── */
  useEffect(() => {
    const physContainer = physContainerRef.current
    const footerEl = footerRef.current
    if (!physContainer || !footerEl) return

    const startSim = async () => {
      // Skip heavy physics simulation on mobile devices
      if (window.innerWidth < 768) return

      if (!matterRef.current) {
        matterRef.current = (await import('matter-js')).default
      }
      const Matter = matterRef.current
      if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null }

      rot3D.current = Array.from({ length: BALL_COUNT }, () => ({
        rx: (Math.random() - 0.5) * Math.PI * 1.5,
        ry: Math.random() * Math.PI * 2,
      }))

      const W = window.innerWidth
      const baseR = getRadius(W, window.innerHeight)
      const radii = Array.from({ length: BALL_COUNT }, () => baseR + Math.round((Math.random() - 0.5) * 16))
      radiiRef.current = radii

      const footerH = footerEl.offsetHeight
      const containerH = ABOVE + footerH

      physContainer.style.height = `${containerH}px`

      const shuffledColors = [...BALL_COLORS].sort(() => Math.random() - 0.5)
      ballEls.current.forEach((el, i) => {
        if (!el) return
        const d = radii[i] * 2
        el.style.width = `${d}px`
        el.style.height = `${d}px`
        el.style.backgroundColor = shuffledColors[i % shuffledColors.length]
      })

      const { Engine, Bodies, World, Runner } = Matter
      const engine = Engine.create({ gravity: { y: 1.4 } })
      const runner = Runner.create()

      const walls = [
        Bodies.rectangle(W / 2, containerH + 30, W + 300, 60, { isStatic: true, friction: 0.6, restitution: 0.55 }),
        Bodies.rectangle(-40, containerH / 2, 80, containerH * 3, { isStatic: true, friction: 0.4, restitution: 0.5 }),
        Bodies.rectangle(W + 40, containerH / 2, 80, containerH * 3, { isStatic: true, friction: 0.4, restitution: 0.5 }),
      ]
      World.add(engine.world, walls)
      Runner.run(runner, engine)

      const bodies = []
      const dropTimers = []
      bodiesRef.current = bodies

      Array.from({ length: BALL_COUNT }, (_, i) => {
        const timer = setTimeout(() => {
          const r = radii[i]
          const x = r + Math.random() * (W - r * 2)
          const y = -(r * 2 + Math.random() * 120)
          const body = Bodies.circle(x, y, r, {
            restitution: 0.5,
            friction: 0.4,
            frictionAir: 0.01,
            density: 0.003,
          })
          World.add(engine.world, body)
          bodies.push(body)
        }, i * 180)
        dropTimers.push(timer)
      })

      const jumpInterval = setInterval(() => {
        if (bodies.length === 0) return
        const idx = Math.floor(Math.random() * bodies.length)
        const body = bodies[idx]
        const r = radii[idx] ?? 70
        const sizeFactor = 70 / r
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 7,
          y: -(10 + Math.random() * 7) * sizeFactor,
        })
      }, 1800)

      const sync = () => {
        bodies.forEach((body, i) => {
          const ballEl = ballEls.current[i]
          const faceEl = faceEls.current[i]
          if (!ballEl || !faceEl) return

          const r = radii[i]
          const { x, y } = body.position
          ballEl.style.transform = `translate(${x - r}px, ${y - r}px)`

          rot3D.current[i].rx += body.velocity.y * 0.008
          rot3D.current[i].ry += body.velocity.x * 0.008

          const { rx, ry } = rot3D.current[i]
          const faceX = Math.sin(ry) * r
          const faceY = -Math.sin(rx) * Math.cos(ry) * r

          faceEl.style.transform =
            `translate(${faceX}px, ${faceY}px) rotate(${body.angle}rad)`
          faceEl.style.opacity = '1'
        })
        rafRef.current = requestAnimationFrame(sync)
      }
      sync()

      cleanupRef.current = () => {
        dropTimers.forEach(clearTimeout)
        clearInterval(jumpInterval)
        cancelAnimationFrame(rafRef.current)
        Runner.stop(runner)
        World.clear(engine.world)
        Engine.clear(engine)
        ballEls.current.forEach(el => {
          if (el) el.style.transform = 'translate(-9999px, -9999px)'
        })
      }
    }

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(startSim, 300)
    }

    // Observe the spacer (in document flow) — fixed footer is always "visible"
    const spacerEl = spacerRef.current
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startSim()
        } else {
          if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null }
          bodiesRef.current = []
        }
      },
      { threshold: 0.05 }
    )
    if (spacerEl) footerObserver.observe(spacerEl)

    return () => {
      if (cleanupRef.current) cleanupRef.current()
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      footerObserver.disconnect()
    }
  }, [])

  const kickBall = (i) => {
    const Matter = matterRef.current
    const body = bodiesRef.current[i]
    if (!body || !Matter) return
    const r = radiiRef.current[i] ?? 70
    const sizeFactor = 70 / r
    Matter.Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 10,
      y: -(28 + Math.random() * 14) * sizeFactor,
    })
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.6)
  }

  return (
    <>
      {/* ── Spacer — in document flow, observed for expand/collapse trigger ── */}
      <div ref={spacerRef} aria-hidden="true" style={{ height: '80vh' }} />

      {/* ── Fixed footer — sits behind main content ── */}
      <footer
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0 z-0 bg-surface-container-low rounded-t-[4rem] overflow-hidden"
        style={{ height: '80vh' }}
      >
        {/* ── Physics container — hidden on mobile (too heavy / buggy on phones) ── */}
        <div
          ref={physContainerRef}
          className="absolute inset-x-0 pointer-events-none hidden md:block"
          style={{ top: -ABOVE }}
        >
          {Array.from({ length: BALL_COUNT }, (_, i) => (
            <div
              key={i}
              ref={el => ballEls.current[i] = el}
              onClick={() => kickBall(i)}
              className="absolute pointer-events-auto"
              style={{
                width: 120,
                height: 120,
                left: 0,
                top: 0,
                borderRadius: '50%',
                cursor: 'pointer',
                userSelect: 'none',
                willChange: 'transform',
                overflow: 'hidden',
                zIndex: 5,
              }}
            >
              <div
                ref={el => faceEls.current[i] = el}
                style={{ position: 'absolute', inset: 0, transformOrigin: 'center center' }}
              >
                <SmileyFace />
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer glass panel ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-20 pb-10 pointer-events-none">
          <div className="max-w-[1440px] mx-auto pointer-events-none">
            <div className="bg-surface-container-low/70 backdrop-blur-sm rounded-3xl px-8 md:px-14 py-8 shadow-sm transition-colors duration-300 hover:bg-white pointer-events-auto">

              {/* ─ Summary strip — same 3-col grid so headings align over sub-links ─ */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Tots & Friends" className="h-10 w-auto" />
                  <span className="text-xl font-black text-primary font-headline tracking-tighter">
                    Tots n Friends
                  </span>
                </div>
                {LINK_GROUPS.map((group) => (
                  <span key={group.heading} className="hidden md:block font-headline font-bold text-on-surface tracking-tight text-sm">
                    {group.heading}
                  </span>
                ))}
              </div>

              {/* ─ Expandable content ─ */}
              <div
                className="footer-details"
                style={{
                  maxHeight: expanded ? '500px' : '0px',
                  opacity: expanded ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-10 mb-12">
                  {/* Brand column */}
                  <div>
                    <p className="text-on-surface-variant font-body leading-relaxed text-sm max-w-xs">
                      A premium early education environment where curiosity, creativity, and care converge. Nurturing tomorrow's creatives since 2012.
                    </p>
                    <div className="flex gap-4 mt-8">
                      {['camera_alt', 'social_leaderboard', 'location_on'].map((icon) => (
                        <motion.button
                          key={icon}
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.93 }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                        >
                          <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Link columns with staggered reveal (headings already in summary strip) */}
                  {LINK_GROUPS.map((group, gi) => (
                    <div key={group.heading}>
                      <ul className="space-y-3">
                        {group.links.map((link, li) => (
                          <li
                            key={link}
                            className="footer-sub-link"
                            style={{
                              opacity: expanded ? 1 : 0,
                              transform: expanded ? 'translateY(0)' : 'translateY(12px)',
                              transition: `opacity 0.4s ease ${(gi * 4 + li) * 60}ms, transform 0.4s ease ${(gi * 4 + li) * 60}ms`,
                            }}
                          >
                            <a
                              href="#"
                              className="text-on-surface-variant hover:text-primary transition-colors font-label text-sm font-medium hover:underline"
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Bottom bar */}
                <div
                  className="border-t border-surface-container-high pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
                  style={{
                    opacity: expanded ? 1 : 0,
                    transform: expanded ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s',
                  }}
                >
                  <p className="text-sm text-on-surface-variant font-label">
                    © 2024 Tots n Friends. Nurturing Tomorrow's Creatives.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant font-label">
                    <span className="w-2 h-2 bg-tertiary-container rounded-full animate-pulse" />
                    Accepting enrollments for Fall 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
