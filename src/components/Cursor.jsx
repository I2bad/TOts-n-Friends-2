import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)

  const dotX = useSpring(cursorX, { stiffness: 900, damping: 30 })
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 30 })

  const ringX = useSpring(cursorX, { stiffness: 200, damping: 25 })
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 25 })

  const isHovering = useRef(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const enterLink = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        isHovering.current = true
        dotRef.current?.style.setProperty('transform', 'translate(-50%, -50%) scale(2)')
        ringRef.current?.style.setProperty('transform', 'translate(-50%, -50%) scale(1.6)')
        ringRef.current?.style.setProperty('border-color', '#fd7a4b')
      }
    }

    const leaveLink = () => {
      isHovering.current = false
      dotRef.current?.style.setProperty('transform', 'translate(-50%, -50%) scale(1)')
      ringRef.current?.style.setProperty('transform', 'translate(-50%, -50%) scale(1)')
      ringRef.current?.style.setProperty('border-color', '#3437f1')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', enterLink)
    document.addEventListener('mouseout', leaveLink)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', enterLink)
      document.removeEventListener('mouseout', leaveLink)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        ref={dotRef}
        className="cursor-dot w-2.5 h-2.5 bg-primary rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          transition: 'transform 0.15s ease',
        }}
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring w-8 h-8 border-2 border-primary rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          transition: 'transform 0.2s ease, border-color 0.2s ease',
        }}
      />
    </>
  )
}
