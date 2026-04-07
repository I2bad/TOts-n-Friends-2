import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PROGRAMS = [
  {
    title: 'Infant Program',
    age: '0 – 1 year',
    icon: 'baby_changing_station',
    color: '#3437f1',
    accent: '#3437f112',
    description: 'Gentle sensory exploration in a warm, nurturing environment. We focus on bonding, trust-building, and the earliest stages of cognitive and motor development.',
    highlights: ['Sensory play stations', 'Tummy time routines', 'Music & movement', 'Parent-infant bonding'],
  },
  {
    title: 'Toddler Program',
    age: '1 – 3 years',
    icon: 'toys',
    color: '#fd7a4b',
    accent: '#fd7a4b12',
    description: 'An active, language-rich environment where toddlers build independence, social skills, and confidence through structured play and free exploration.',
    highlights: ['Language immersion', 'Social play groups', 'Outdoor discovery', 'Self-help skills'],
  },
  {
    title: 'Preschool Program',
    age: '3 – 5 years',
    icon: 'palette',
    color: '#006639',
    accent: '#00663912',
    description: 'Creative, project-based learning that builds school readiness. Children develop critical thinking, literacy foundations, and collaborative skills through art, science, and storytelling.',
    highlights: ['STEM exploration', 'Creative arts', 'Early literacy', 'Collaborative projects'],
  },
  {
    title: 'After-School',
    age: '5 – 6 years',
    icon: 'auto_stories',
    color: '#F5A623',
    accent: '#F5A62312',
    description: 'Enrichment activities that complement formal schooling. A blend of homework support, creative workshops, and free play to decompress and grow after the school day.',
    highlights: ['Homework support', 'Art workshops', 'Physical play', 'Social enrichment'],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function ProgramsSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const decorY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={sectionRef} data-navtheme="cool" className="py-28 px-6 relative overflow-hidden">
      <motion.div
        style={{ y: decorY }}
        className="absolute -left-24 top-1/3 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-secondary font-bold tracking-widest uppercase text-sm font-label">
            What We Offer
          </span>
          <h2 className="font-headline text-[clamp(2rem,5vw,4rem)] font-black text-on-surface tracking-tight mt-3 mb-5">
            Our Programs
          </h2>
          <p className="font-body text-on-surface-variant text-lg max-w-xl mx-auto leading-relaxed">
            Thoughtfully designed experiences for every stage of early childhood — from first steps to school readiness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS.map((program, i) => (
            <motion.div
              key={program.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group relative rounded-[2.5rem] p-8 md:p-10 overflow-hidden transition-colors duration-300"
              style={{ background: program.accent }}
            >
              {/* Age badge */}
              <span
                className="absolute top-8 right-8 text-xs font-bold font-label px-3 py-1.5 rounded-full"
                style={{ background: program.color + '18', color: program.color }}
              >
                {program.age}
              </span>

              {/* Program photo placeholder */}
              <div
                className="w-full h-40 rounded-2xl mb-6 flex flex-col items-center justify-center gap-2 overflow-hidden relative"
                style={{ background: program.color + '10', border: `2px dashed ${program.color}25` }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill={program.color + '60'}>
                  <path d="M20 5h-2.83l-1.41-1.41C15.4 3.21 14.7 3 14 3h-4c-.7 0-1.4.21-1.76.59L6.83 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <span className="font-label text-xs font-semibold" style={{ color: program.color + '80' }}>
                  {program.title} photo
                </span>
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ background: program.color + '18' }}
              >
                <span className="material-symbols-outlined text-2xl" style={{ color: program.color }}>
                  {program.icon}
                </span>
              </div>

              <h3 className="font-headline font-black text-2xl text-on-surface tracking-tight mb-3">
                {program.title}
              </h3>

              <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                {program.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {program.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs font-label font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: program.color + '12', color: program.color }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Hover glow */}
              <div
                className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
                style={{ background: program.color + '20' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
