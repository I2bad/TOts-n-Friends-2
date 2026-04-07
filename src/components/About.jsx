import { motion } from 'framer-motion'

const FEATURES = [
  { icon: 'verified', color: 'text-primary', bg: 'bg-primary/10', label: 'Certified Master Educators' },
  { icon: 'eco', color: 'text-secondary', bg: 'bg-secondary/10', label: 'Organic, Chef-Prepared Meals' },
  { icon: 'lock', color: 'text-tertiary', bg: 'bg-tertiary-container/30', label: 'Advanced Biometric Security' },
  { icon: 'psychology', color: 'text-primary', bg: 'bg-primary/10', label: 'Evidence-Based Curriculum' },
]

export default function About() {
  return (
    <section id="gallery" className="py-28 bg-surface-container-low overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Decorative blob */}
          <div className="absolute -top-16 -left-16 w-72 h-72 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative grid grid-cols-2 gap-5">
            <motion.div
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-[3rem] rounded-tr-[1rem] shadow-2xl"
            >
              <img
                className="w-full h-80 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY2mQXtlyOoIQh7f6Kshawvw-hj16UPIaldsua1PabfsaWY9ij1TPQwcDH1SYcDbHIpFQ38TO0luA74dcEUHTwBWtG0E5rpjb2AQqt8G9YisTk51VrVVbABM4pqYVkqtWK93Be6aSagIwlcCesmLC7MVFGpoq_zdB3kjX1kJWF87CB6ToqCDAML1JH48nyj4qZrNGyUWOU4yEQxrICK9l491uSgRjb8ZX6-Bg7EN-FAeFjxjdSluzuwJpt59ak8OMtqog_luRQiaMV"
                alt="Children playing outdoors"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-[3rem] mt-16 shadow-2xl"
            >
              <img
                className="w-full h-64 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-LHPTENxB5Xi2CSrHpPgyTkO7nxp3dOYLOd9dAP6BqkXb_UKcZ5QiEvoMB8Ntx_3XKywc0tz9UBH602itSUyOozWnTDnoNdobgjgVq32YiUdHQS7PKuEWyHoaC4L0IiFfCb7zLYpeK7Jm0bYv3ECAjmLrycjXBtvI89XLWkTxlgBkXAp5JPrQwIcrMa9Hn3QEhXrBoruvHVed2wiVTOXm-vqKJYtP4e3CUssz7xZ83WwD54Uj567c_yvRxctT9oCqjJZek_swvcQv"
                alt="Child discovering nature"
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 left-8 bg-white rounded-3xl px-6 py-4 shadow-2xl flex items-center gap-3 z-10"
            >
              <div className="w-12 h-12 bg-tertiary-container/40 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">child_care</span>
              </div>
              <div>
                <div className="font-headline font-black text-xl text-on-surface tracking-tight">200+</div>
                <div className="text-xs text-on-surface-variant font-label font-semibold">children thriving daily</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="text-secondary font-bold tracking-widest uppercase text-sm font-label mb-6 block">
            Our Heart & Soul
          </span>

          <h2 className="font-headline text-[clamp(2rem,5vw,4rem)] font-black text-on-surface leading-tight mb-8 tracking-tight">
            Nurturing the{' '}
            <span className="text-primary italic">Creative Spark</span>
            {' '}in every child.
          </h2>

          <p className="font-body text-xl text-on-surface-variant leading-relaxed mb-10">
            At Playful Atelier, we believe children aren't just students — they are artists, scientists,
            and dreamers. Our space is designed to be a "third teacher," offering beauty, complexity,
            and endless possibilities for exploration.
          </p>

          <ul className="space-y-5">
            {FEATURES.map((feature, i) => (
              <motion.li
                key={feature.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 text-lg font-semibold font-body text-on-surface"
              >
                <span className={`material-symbols-outlined ${feature.color} ${feature.bg} p-2.5 rounded-2xl flex-shrink-0`}>
                  {feature.icon}
                </span>
                {feature.label}
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mt-12 inline-flex items-center gap-3 bg-on-surface text-background px-8 py-4 rounded-full font-bold font-label text-base shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            Our Philosophy
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
