import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const CONFETTI_DOTS = [
  { color: '#3437f1', x: '8%', y: '18%', size: 8, delay: 0 },
  { color: '#fd7a4b', x: '85%', y: '22%', size: 6, delay: 0.5 },
  { color: '#6ffda9', x: '72%', y: '75%', size: 10, delay: 1.2 },
  { color: '#F5A623', x: '15%', y: '70%', size: 7, delay: 0.8 },
  { color: '#E84444', x: '90%', y: '55%', size: 5, delay: 1.8 },
  { color: '#2D8C50', x: '50%', y: '12%', size: 8, delay: 2.2 },
  { color: '#3437f1', x: '30%', y: '85%', size: 6, delay: 1.5 },
]

export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto relative overflow-hidden rounded-[4rem] p-14 md:p-24 text-center"
        style={{
          background: 'linear-gradient(135deg, #fff5f0 0%, #ffebe0 40%, #fff0f5 100%)',
          boxShadow: '0 40px 80px -20px rgba(253, 122, 75, 0.25), 0 0 0 1px rgba(253, 122, 75, 0.08)',
        }}
      >
        {/* Floating confetti dots */}
        {CONFETTI_DOTS.map((dot, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -12, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: dot.delay,
            }}
            className="absolute rounded-full"
            style={{
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              background: dot.color,
            }}
          />
        ))}

        {/* Blobs */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-headline text-[clamp(2rem,5vw,3.5rem)] font-black text-on-surface tracking-tight mb-6"
          >
            Ready to See the Tots n Friends Difference?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-on-surface-variant text-lg md:text-xl mb-14 max-w-2xl mx-auto font-body leading-relaxed"
          >
            We'd love to welcome you and your child for a visit. See our spaces, meet our educators, and discover why families choose Tots n Friends.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-5"
          >
            <Link to="/contact">
              <motion.div
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary text-white px-10 py-5 rounded-full text-lg font-bold font-label shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-shadow duration-300"
              >
                Book a Tour
              </motion.div>
            </Link>
            <Link to="/contact">
              <motion.div
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-on-surface-variant px-10 py-5 rounded-full text-lg font-bold font-label shadow-lg hover:text-primary transition-colors"
              >
                Enroll Now
              </motion.div>
            </Link>
          </motion.div>

          <p className="mt-8 text-sm text-on-surface-variant/60 font-label">
            No commitment required · Free tour available
          </p>
        </div>
      </motion.div>
    </section>
  )
}
