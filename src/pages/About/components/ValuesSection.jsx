import { useState } from 'react'
import { motion } from 'framer-motion'

const VALUES = [
  {
    icon: 'favorite',
    title: 'Kindness & Empathy',
    description: 'We teach children to understand and care for one another, building emotional intelligence from the very beginning.',
    color: '#E84444',
    bg: '#E8444410',
  },
  {
    icon: 'explore',
    title: 'Curiosity & Exploration',
    description: 'Every question is celebrated. We nurture children\'s natural desire to discover, experiment, and make sense of the world.',
    color: '#3437f1',
    bg: '#3437f110',
  },
  {
    icon: 'diversity_3',
    title: 'Inclusivity & Belonging',
    description: 'Every child and family is welcomed and valued. We celebrate differences and create a community where everyone belongs.',
    color: '#fd7a4b',
    bg: '#fd7a4b10',
  },
  {
    icon: 'shield',
    title: 'Safety & Trust',
    description: 'Parents trust us with their greatest treasure. We maintain the highest standards of care, safety, and transparency.',
    color: '#006639',
    bg: '#00663910',
  },
  {
    icon: 'palette',
    title: 'Creativity & Joy',
    description: 'Art, music, movement, and imaginative play are woven into every day. Joyful learning creates lasting memories and deeper understanding.',
    color: '#F5A623',
    bg: '#F5A62310',
  },
  {
    icon: 'psychiatry',
    title: 'Growth & Resilience',
    description: 'We help children develop confidence to try new things, learn from setbacks, and celebrate their own progress.',
    color: '#2D8C50',
    bg: '#2D8C5010',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

function ValueCard({ value, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-[2rem] p-8 cursor-default overflow-hidden"
      style={{
        boxShadow: hovered
          ? `0 20px 50px -12px ${value.color}22, 0 0 0 1px ${value.color}18`
          : '0 4px 20px -4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Icon */}
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 6 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: value.bg }}
      >
        <span className="material-symbols-outlined text-2xl" style={{ color: value.color }}>
          {value.icon}
        </span>
      </motion.div>

      <h3 className="font-headline font-bold text-lg text-on-surface tracking-tight mb-3">
        {value.title}
      </h3>

      <motion.p
        animate={{ opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
        className="font-body text-on-surface-variant text-sm leading-relaxed"
      >
        {value.description}
      </motion.p>

      {/* Hover accent dot */}
      <motion.div
        animate={{
          scale: hovered ? 1 : 0,
          opacity: hovered ? 0.15 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full"
        style={{ background: value.color }}
      />
    </motion.div>
  )
}

export default function ValuesSection() {
  return (
    <section className="py-28 px-6" style={{ background: '#F0EAE0' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-secondary font-bold tracking-widest uppercase text-sm font-label">
            What We Believe
          </span>
          <h2 className="font-headline text-[clamp(2rem,5vw,4rem)] font-black text-on-surface tracking-tight mt-3 mb-5">
            Our Core Values
          </h2>
          <p className="font-body text-on-surface-variant text-lg max-w-xl mx-auto leading-relaxed">
            These principles guide everything we do — from how we design our classrooms to how we greet each child at the door.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
