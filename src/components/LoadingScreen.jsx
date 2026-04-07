import { useState, useEffect, useCallback } from 'react'

const BALL_COLORS = ['#2B4BDB', '#E84444', '#2D8C50', '#F5A623']
const MIN_DISPLAY = 800   // minimum time for logo animation to look smooth
const MAX_SPLINE = 8000   // absolute max wait for Spline GPU-ready
const EXIT_MS = 500

export default function LoadingScreen({ onFinished, onReadyForContent, splineReady }) {
  const [exiting, setExiting] = useState(false)

  const exit = useCallback(() => {
    if (exiting) return
    setExiting(true)
    setTimeout(() => {
      document.body.style.overflow = ''
      onFinished()
    }, EXIT_MS)
  }, [exiting, onFinished])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Mount routes immediately so Spline starts loading right away
    onReadyForContent()

    // Wait for ALL of these in parallel — exit as soon as all are met:
    //  1. Fonts loaded
    //  2. Spline GPU-ready (or timeout)
    //  3. Minimum display time (so the loader doesn't flash)
    const splineOrTimeout = splineReady
      ? Promise.race([splineReady, new Promise((r) => setTimeout(r, MAX_SPLINE))])
      : Promise.resolve()

    Promise.all([
      document.fonts.ready,
      splineOrTimeout,
      new Promise((r) => setTimeout(r, MIN_DISPLAY)),
    ]).then(exit)

    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F0EAE0',
        opacity: exiting ? 0 : 1,
        transition: `opacity ${EXIT_MS}ms ease`,
        willChange: 'opacity',
      }}
    >
      <img
        src="/logo.png"
        alt="Tots & Friends"
        draggable={false}
        style={{
          height: 96,
          width: 'auto',
          marginBottom: 32,
          animation: 'loader-spin-in 1s cubic-bezier(0.16,1,0.3,1) both',
          willChange: 'transform, opacity',
        }}
      />

      <p
        style={{
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: '-0.025em',
          color: '#2d2a24',
          marginBottom: 40,
          animation: 'loader-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s both',
          willChange: 'transform, opacity',
        }}
      >
        Tots n Friends
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {BALL_COLORS.map((color, i) => (
          <div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: color,
              animation: `loader-dot-in 0.3s ease ${0.5 + i * 0.08}s both, loader-bounce 0.9s ease-in-out ${0.7 + i * 0.12}s infinite`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
    </div>
  )
}
