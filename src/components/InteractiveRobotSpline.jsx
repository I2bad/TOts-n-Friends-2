import { Suspense, lazy, useCallback } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

export function InteractiveRobotSpline({ scene, className, style, onReady }) {
  // react-spline v4 disposes the WebGL context in its own cleanup — no manual dispose needed.
  // Double-calling dispose() crashes the runtime, so we removed the earlier useRef/useEffect pattern.
  const handleLoad = useCallback((splineApp) => {
    // Watch the DOM and remove the Spline watermark whenever it appears
    const purge = () =>
      document.querySelectorAll('a[href*="spline"], #spline-watermark, [class*="watermark"]')
        .forEach(el => el.remove())

    purge()
    const observer = new MutationObserver(purge)
    observer.observe(document.body, { childList: true, subtree: true })
    // Disconnect after 3 s — watermark won't reappear after that
    setTimeout(() => observer.disconnect(), 3000)

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
