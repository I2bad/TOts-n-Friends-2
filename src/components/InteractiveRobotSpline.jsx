import { Suspense, lazy, useRef, useEffect, useCallback } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

/**
 * Double-RAF + buffer pattern:
 * Spline's onLoad fires when data is parsed, NOT when the GPU has compiled
 * shaders and painted the first frame. Two rAF passes + 100ms lets the
 * compositor flush the WebGL pipeline before we signal "ready".
 */
function waitForGPU() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(resolve, 100)
      })
    })
  })
}

export function InteractiveRobotSpline({ scene, className, style, onReady }) {
  const splineRef = useRef(null)

  // Cleanup: dispose WebGL context on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (splineRef.current) {
        splineRef.current.dispose()
        splineRef.current = null
      }
    }
  }, [])

  const handleLoad = useCallback((splineApp) => {
    // Store ref for cleanup
    splineRef.current = splineApp

    // Wait for GPU to actually finish rendering before signaling ready
    waitForGPU().then(() => {
      if (onReady) onReady()
    })
  }, [onReady])

  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center ${className ?? ''}`} />
      }
    >
      <Spline scene={scene} className={className} style={style} onLoad={handleLoad} />
    </Suspense>
  )
}
