import { Suspense, lazy, useCallback } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

export function InteractiveRobotSpline({ scene, className, style, onReady }) {
  // react-spline v4 disposes the WebGL context in its own cleanup — no manual dispose needed.
  // Double-calling dispose() crashes the runtime, so we removed the earlier useRef/useEffect pattern.
  const handleLoad = useCallback((splineApp) => {
    if (!onReady) return
    // Double-RAF + 100 ms lets the GPU flush shaders before we signal "ready"
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setTimeout(onReady, 100)
      )
    )
  }, [onReady])

  return (
    <Suspense fallback={<div className={`w-full h-full ${className ?? ''}`} />}>
      <Spline
        scene={scene}
        className={className}
        style={style}
        onLoad={handleLoad}
        renderOnDemand={false}
      />
    </Suspense>
  )
}
