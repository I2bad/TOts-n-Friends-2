import { motion } from 'framer-motion'

const PILLARS = [
  {
    num: '01',
    label: 'Our Mission',
    heading: 'Nurturing curious, confident learners',
    body: 'Every day, we create safe, joyful spaces where children discover the world through play-based exploration. We believe the earliest years shape who children become — and we treat each moment as an opportunity to inspire wonder.',
    color: '#3437f1',
  },
  {
    num: '02',
    label: 'Our Vision',
    heading: 'A lifelong love of discovery',
    body: 'We envision a world where every child\'s first learning experience ignites curiosity that lasts a lifetime. By fostering resilience, empathy, and creativity from the start, we\'re helping shape compassionate future leaders.',
    color: '#fd7a4b',
  },
  {
    num: '03',
    label: 'Our Philosophy',
    heading: 'Child-led, play-powered learning',
    body: 'Learning isn\'t something we impose — it\'s something children do naturally when given the right environment. Our approach combines Reggio Emilia principles with modern developmental research, letting each child\'s interests guide their journey.',
    color: '#006639',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function MissionSection() {
  return (
    <section data-navtheme="cool" className="pt-24 pb-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Section header — two-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 mb-24">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-headline text-[clamp(2.2rem,5vw,3.5rem)] font-black text-on-surface tracking-tight leading-[1.1]"
          >
            Our Story &amp; Purpose
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-body text-on-surface-variant text-lg leading-relaxed md:pt-3"
          >
            Three pillars guide everything we do — from how we design our classrooms to how we greet each child at the door.
          </motion.p>
        </div>

        {/* Pillars — stacked rows separated by lines */}
        <div className="flex flex-col">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 md:gap-10 py-14 border-t border-on-surface/10 last:border-b"
            >
              {/* Number */}
              <span
                className="font-headline font-black text-3xl md:text-4xl leading-none hidden md:block"
                style={{ color: pillar.color }}
              >
                {pillar.num}
              </span>

              {/* Left — label + heading */}
              <div>
                <span
                  className="font-label font-bold text-xs uppercase tracking-widest block mb-3"
                  style={{ color: pillar.color }}
                >
                  {pillar.label}
                </span>
                <h3 className="font-headline font-black text-2xl md:text-3xl text-on-surface tracking-tight leading-snug">
                  {pillar.heading}
                </h3>
              </div>

              {/* Right — body */}
              <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed md:pt-6">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Image placeholder — clean, simple */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-20 w-full h-72 md:h-[420px] rounded-2xl overflow-hidden flex items-center justify-center"
          style={{ background: '#f0ece6' }}
        >
          <div className="flex flex-col items-center gap-3 text-on-surface-variant/30">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 5h-2.83l-1.41-1.41C15.4 3.21 14.7 3 14 3h-4c-.7 0-1.4.21-1.76.59L6.83 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            <span className="font-label text-sm font-semibold">Replace with your image</span>
            <span className="font-body text-xs">1440 &times; 640 px recommended</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
