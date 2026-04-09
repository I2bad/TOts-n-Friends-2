import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import logo from '/logo.png'

const MILESTONES = [
  {
    year: '2018',
    title: 'Where It All Began',
    tag: 'Founded',
    description:
      'Tots & Friends Childcare Centre opens its doors with a humble beginning — just 10 children and a big dream. From day one, our focus was simple: create a warm, nurturing space where every child feels seen, safe, and celebrated.',
    color: '#2B4BDB',
    icon: '🌱',
  },
  {
    year: '2019',
    title: 'Learning Through Play',
    tag: 'Milestone',
    description:
      'We introduce our first onsite play-based classroom, purpose-built for 3-year-olds. Rooted in the belief that children learn best through exploration and imagination, the classroom becomes a space where curiosity is the curriculum.',
    color: '#E84444',
    icon: '🧩',
  },
  {
    year: '2020',
    title: 'Adapting With Heart',
    tag: 'Resilience',
    description:
      'When the world paused, we pivoted. Tots & Friends transitioned to online classes, ensuring our children and families stayed connected, supported, and learning — from the comfort and safety of home. For nearly two years, we brought the classroom to you.',
    color: '#2D8C50',
    icon: '💻',
  },
  {
    year: '2023',
    title: 'Back Together Again',
    tag: 'Growth',
    description:
      'Our doors reopened and our family grew. Onsite classes resumed with renewed energy, and we welcomed a brand new age group — opening enrolment to children as young as 2 years old. A new chapter, with the same heart.',
    color: '#F5A623',
    icon: '🎉',
  },
  {
    year: '2025',
    title: 'Taking the Stage',
    tag: 'Community',
    description:
      'A landmark moment for our little ones and their families — Tots & Friends hosted its very first concert outside the centre, performed in a full-sized hall. The energy was electric, the performances were unforgettable, and the pride in the room was immeasurable. A celebration of how far we have all come.',
    color: '#2B4BDB',
    icon: '🎭',
  },
]

// Animated progress line that fills as you scroll
function ProgressLine() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const clipBottom = useTransform(scrollYProgress, [0, 1], [100, 0])
  const clipPath = useMotionTemplate`inset(0 0 ${clipBottom}% 0)`

  return (
    <div ref={ref} className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 pointer-events-none">
      {/* Track */}
      <div className="absolute inset-0 bg-surface-container-high" />
      {/* Gradient spans full height, clipped to reveal evenly on scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath,
          background: 'linear-gradient(to bottom, #3437f1, #E84444, #2D8C50, #F5A623, #2B4BDB)',
        }}
      />
    </div>
  )
}

function TimelineEntry({ milestone, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isRight = index % 2 === 0

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[2rem_1fr] md:grid-cols-[1fr_4rem_1fr] items-start gap-0 mb-20 md:mb-24"
    >
      {/* Left content (desktop) — only even entries */}
      <div className="hidden md:flex justify-end pr-10">
        {isRight && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm w-full"
          >
            <Card milestone={milestone} />
          </motion.div>
        )}
      </div>

      {/* Centre column — dot only */}
      <div className="flex flex-col items-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-4 h-4 rounded-full border-[3px] border-background shadow-lg mt-1"
          style={{ backgroundColor: milestone.color }}
        />
      </div>

      {/* Right content (desktop odd / all mobile) */}
      <div className={`pl-6 md:pl-10 ${isRight ? 'md:invisible md:pointer-events-none' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-sm"
        >
          {/* Mobile: show all here. Desktop: show only odd */}
          <div className="md:hidden">
            <Card milestone={milestone} />
          </div>
          {!isRight && (
            <div className="hidden md:block">
              <Card milestone={milestone} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

function Card({ milestone }) {
  return (
    <div className="group">
      {/* Tag */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ backgroundColor: milestone.color + '18', color: milestone.color }}
        >
          {milestone.tag}
        </span>
        <span className="text-on-surface-variant text-xs font-bold tracking-widest font-headline">
          {milestone.year}
        </span>
      </div>

      {/* Icon + Title */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl mt-0.5 flex-shrink-0">{milestone.icon}</span>
        <h3 className="font-headline font-black text-2xl text-on-surface tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
          {milestone.title}
        </h3>
      </div>

      {/* Divider */}
      <div
        className="h-px w-10 mb-4 transition-all duration-500 group-hover:w-20"
        style={{ backgroundColor: milestone.color }}
      />

      {/* Description */}
      <p className="text-on-surface-variant font-body text-sm leading-relaxed">
        {milestone.description}
      </p>
    </div>
  )
}

export default function Timeline() {
  const containerRef = useRef(null)

  return (
    <div className="text-on-surface font-body">
      <main className="relative z-10 bg-background overflow-x-hidden min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative pt-40 pb-32 px-6 md:px-20 overflow-hidden" style={{ background: '#F0EAE0' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <img src={logo} alt="Tots & Friends" className="h-14 w-auto" />
            <span
              className="font-profont text-white text-sm px-3 py-1.5 rounded-sm font-black tracking-widest"
              style={{ backgroundColor: '#263c70', transform: 'rotate(-2deg)', display: 'inline-block' }}
            >
              SINCE 2018
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-nunito font-black leading-none mb-6"
            style={{ fontSize: 'clamp(56px, 10vw, 120px)', color: '#2d2a24' }}
          >
            Our<br />Story
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-on-surface-variant font-body text-xl max-w-lg leading-relaxed"
          >
            From a single room and a big dream, to a family of hundreds. Here's how Tots & Friends came to be.
          </motion.p>
        </div>

        {/* Decorative large year */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute right-0 bottom-0 font-headline font-black text-[20vw] leading-none select-none pointer-events-none"
          style={{ color: '#2d2a2408' }}
        >
          2018
        </motion.div>
      </section>

      {/* Timeline */}
      <section ref={containerRef} className="relative py-24 px-6 md:px-20 max-w-5xl mx-auto">
        <ProgressLine />

        <div>
          {MILESTONES.map((milestone, index) => (
            <TimelineEntry key={milestone.year} milestone={milestone} index={index} />
          ))}
        </div>

        {/* End cap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 mt-4"
        >
          <div className="w-4 h-4 rounded-full bg-on-surface" />
          <p className="font-headline font-black text-xl text-on-surface tracking-tight">
            The story continues...
          </p>
          <p className="text-on-surface-variant text-sm font-body">
            We're just getting started. 🌈
          </p>
        </motion.div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
