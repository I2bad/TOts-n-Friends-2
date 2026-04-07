import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto relative overflow-hidden rounded-[2rem] md:rounded-[4rem] p-8 md:p-14 lg:p-24 text-center"
        style={{
          background: 'linear-gradient(135deg, #fff5f0 0%, #ffebe0 40%, #fff0f5 100%)',
          boxShadow: '0 40px 80px -20px rgba(253, 122, 75, 0.25), 0 0 0 1px rgba(253, 122, 75, 0.08)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        {/* Floating balls */}
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-12 w-14 h-14 rounded-full opacity-70"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #feb99a, #fd7a4b)',
            boxShadow: '0 12px 30px rgba(253, 122, 75, 0.4)',
          }}
        />
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute bottom-10 right-16 w-10 h-10 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #8b8ef9, #3437f1)',
            boxShadow: '0 10px 25px rgba(52, 55, 241, 0.4)',
          }}
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-1/2 right-8 w-8 h-8 rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #b4fee1, #6ffda9)',
            boxShadow: '0 8px 20px rgba(111, 253, 169, 0.5)',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-secondary/15 text-secondary border border-secondary/20 px-5 py-2 rounded-full text-sm font-bold font-label mb-8"
          >
            <span className="material-symbols-outlined text-base">schedule</span>
            Fall Enrollment Now Open
          </motion.div>

          <h2 className="font-headline text-[clamp(2rem,5vw,4rem)] font-black text-on-surface tracking-tight mb-6">
            Start Their Journey Today
          </h2>

          <p className="text-on-surface-variant text-xl md:text-2xl mb-14 max-w-2xl mx-auto font-body leading-relaxed">
            Limited spots available. Secure your child's place in our creative atelier and invest in a future of wonder.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <motion.button
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-primary text-white px-8 md:px-12 py-4 md:py-6 rounded-full text-base md:text-xl font-bold font-label shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-shadow duration-300"
            >
              Book a Tour Today
            </motion.button>
            <motion.button
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-on-surface-variant px-6 md:px-10 py-4 md:py-6 rounded-full text-base md:text-xl font-bold font-label shadow-lg hover:text-primary transition-colors"
            >
              Download Brochure
            </motion.button>
          </div>

          <p className="mt-8 text-sm text-on-surface-variant/60 font-label">
            No commitment required · Free consultation available
          </p>
        </div>
      </motion.div>
    </section>
  )
}
