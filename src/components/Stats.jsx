import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 500, suffix: '+', label: 'Happy Families', icon: 'favorite' },
  { value: 15, suffix: '+', label: 'Expert Educators', icon: 'school' },
  { value: 98, suffix: '%', label: 'Parent Satisfaction', icon: 'star' },
  { value: 12, suffix: '', label: 'Years of Excellence', icon: 'workspace_premium' },
]

function CountUp({ target, suffix, isInView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTime = null
    const duration = 2200

    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(easeOut(progress) * target))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [isInView, target])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 px-6 bg-primary relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-center text-white"
            >
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="material-symbols-outlined text-secondary">{stat.icon}</span>
              </div>
              <div className="font-headline text-5xl md:text-6xl font-black tracking-tighter mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              <div className="text-white/70 font-label font-semibold text-sm tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
