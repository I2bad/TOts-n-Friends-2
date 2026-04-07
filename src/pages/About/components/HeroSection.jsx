import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const BLOBS = [
  { color: '#3437f1', x: '12%', y: '20%', size: 320, delay: 0 },
  { color: '#fd7a4b', x: '75%', y: '15%', size: 260, delay: 1.2 },
  { color: '#6ffda9', x: '60%', y: '70%', size: 200, delay: 2.5 },
  { color: '#F5A623', x: '20%', y: '75%', size: 180, delay: 0.8 },
]

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#F0EAE0' }}>
      {/* Animated gradient blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        {BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0.12, 0.2, 0.12],
              scale: [0.9, 1.1, 0.9],
              x: [0, 15, -10, 0],
              y: [0, -20, 10, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: blob.delay,
            }}
            className="absolute rounded-full blur-3xl"
            style={{
              left: blob.x,
              top: blob.y,
              width: blob.size,
              height: blob.size,
              background: blob.color,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-secondary font-bold tracking-widest uppercase text-xs font-label mb-6"
        >
          About Tots n Friends
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-nunito font-black leading-[0.95] tracking-tight mb-8"
          style={{ fontSize: 'clamp(48px, 9vw, 110px)', color: '#2d2a24' }}
        >
          Where Every{' '}
          <span className="text-primary italic">Little Mind</span>
          {' '}Matters
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-on-surface-variant font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          We're more than a childcare centre. We're a community of passionate educators, curious children, and supportive families building the foundation for lifelong learning.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2 mb-16"
        >
          <span className="text-on-surface-variant/50 font-label text-xs uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-on-surface-variant/25 flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/40" />
          </motion.div>
        </motion.div>

        {/* Photo strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-4 w-full max-w-3xl"
        >
          {[
            { label: 'Classroom photo', color: '#3437f1', h: 'h-44' },
            { label: 'Children at play', color: '#fd7a4b', h: 'h-56' },
            { label: 'Outdoor activity', color: '#006639', h: 'h-44' },
          ].map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`flex-1 ${img.h} rounded-3xl overflow-hidden relative flex items-end p-4`}
              style={{ background: img.color + '15', border: `2px dashed ${img.color}30` }}
            >
              {/* Camera icon */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                style={{ color: img.color + '60' }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 5h-2.83l-1.41-1.41C15.4 3.21 14.7 3 14 3h-4c-.7 0-1.4.21-1.76.59L6.83 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <span className="font-label text-xs font-semibold text-center px-2">{img.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
