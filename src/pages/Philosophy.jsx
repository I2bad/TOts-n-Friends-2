import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import logo from '/logo.png'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const MYTHS = [
  {
    myth: '"Play is just play — it\'s not real learning."',
    truth:
      'Research consistently shows that children enrolled in play-oriented programmes do better in life — including academically — than those in academic-focused programmes. Play is the primary way children develop language, mathematical thinking, and problem-solving skills.',
    source: 'Trying Together; Lillio / Rae Pica',
    sourceUrl: 'https://tryingtogether.org/dap/early-learning-myths-vs-facts/',
    icon: '🎨',
    color: '#E84444',
  },
  {
    myth: '"Academic skills should be the main focus of early education."',
    truth:
      'Quality early childhood programmes focus equally on social, emotional, and physical development alongside academics. These foundational skills — like self-regulation, empathy, and cooperation — are what truly support long-term success in and out of the classroom.',
    source: 'Trying Together',
    sourceUrl: 'https://tryingtogether.org/dap/early-learning-myths-vs-facts/',
    icon: '📚',
    color: '#2B4BDB',
  },
  {
    myth: '"The earlier you start formal academics, the better."',
    truth:
      'Pushing formal academics too early can actually be counterproductive. Many academic programmes designed for young children are not developmentally appropriate. A child\'s natural curiosity and readiness should guide the pace — not arbitrary benchmarks.',
    source: 'Lillio / Rae Pica, Award-Winning ECE Educator',
    sourceUrl:
      'https://www.lillio.com/blog/the-top-5-myths-educators-hear-from-parents-in-early-childhood-education',
    icon: '⏰',
    color: '#F5A623',
  },
  {
    myth: '"You need expensive educational toys for brain development."',
    truth:
      'There is no scientific evidence that costly "educational" toys improve brain development — in fact, they can overstimulate children. The most effective brain-building activities are talking, reading, and singing with your child. They cost nothing at all.',
    source: 'First 5 California',
    sourceUrl:
      'https://www.first5california.com/en-us/articles/myths-about-your-childs-brain-baby-toddler-preschooler/',
    icon: '🧸',
    color: '#2D8C50',
  },
  {
    myth: '"Real learning only begins when my child starts school."',
    truth:
      'Parents are a child\'s first and most important educators. Everyday moments — reading together, responding to babbling, even playing peekaboo — are powerful learning experiences. Studies show that encouraging responses during story time can accelerate a two-year-old\'s language development by up to 9 months.',
    source: 'First 5 California',
    sourceUrl:
      'https://www.first5california.com/en-us/articles/myths-about-your-childs-brain-baby-toddler-preschooler/',
    icon: '🏠',
    color: '#E84444',
  },
]

const STATS = [
  {
    number: '90%',
    label: 'of a child\'s brain develops by age 5',
    detail: 'The first five years are the most critical window for cognitive, social, and emotional development.',
    source: 'Trying Together; Rasmussen University',
    color: '#3437f1',
  },
  {
    number: '11.4%',
    label: 'increase in high school graduation rates',
    detail: 'Children who attend quality early childhood programmes are significantly more likely to finish school.',
    source: 'PMC Meta-Analysis (22 studies, 1960–2016)',
    color: '#2D8C50',
  },
  {
    number: '8.1%',
    label: 'decrease in special education placement',
    detail: 'Early intervention and quality care reduce the need for special education services later in life.',
    source: 'PMC Meta-Analysis',
    color: '#F5A623',
  },
  {
    number: '1M+',
    label: 'neural connections formed every second',
    detail: 'In the early years, a child\'s brain forms more than one million new neural connections per second.',
    source: 'ZERO TO THREE',
    color: '#E84444',
  },
]

const SOURCES = [
  {
    name: 'Trying Together',
    title: 'Early Learning: Myths vs. Facts',
    url: 'https://tryingtogether.org/dap/early-learning-myths-vs-facts/',
  },
  {
    name: 'Lillio (The Preschool Podcast)',
    title: 'The Top 5 Myths Educators Hear from Parents in Early Childhood Education',
    url: 'https://www.lillio.com/blog/the-top-5-myths-educators-hear-from-parents-in-early-childhood-education',
  },
  {
    name: 'PMC / National Institutes of Health',
    title: 'Impacts of Early Childhood Education on Medium- and Long-Term Educational Outcomes',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6107077/',
  },
  {
    name: 'First 5 California',
    title: 'Myths About Your Child\'s Brain',
    url: 'https://www.first5california.com/en-us/articles/myths-about-your-childs-brain-baby-toddler-preschooler/',
  },
  {
    name: 'Rasmussen University',
    title: '6 Common ECE Myths (And The Early Childhood Education Facts)',
    url: 'https://www.rasmussen.edu/degrees/education/blog/early-childhood-education-facts/',
  },
]

/* ── Scroll-triggered section wrapper ── */
function RevealSection({ children, className = '', style }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ── Myth / Fact card ── */
function MythCard({ myth, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0 rounded-sm overflow-hidden">
        {/* Myth side */}
        <div className="p-8 md:p-10 relative" style={{ backgroundColor: myth.color + '0A' }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{myth.icon}</span>
            <span
              className="text-xs font-bold uppercase tracking-widest font-label px-3 py-1 rounded-full"
              style={{ backgroundColor: myth.color + '18', color: myth.color }}
            >
              Myth #{index + 1}
            </span>
          </div>
          <p className="font-headline font-black text-xl md:text-2xl text-on-surface leading-snug tracking-tight italic">
            {myth.myth}
          </p>
          {/* Decorative line */}
          <div
            className="absolute bottom-0 left-8 right-8 lg:bottom-auto lg:left-auto lg:right-0 lg:top-8 lg:bottom-8 h-px lg:h-auto lg:w-px"
            style={{ backgroundColor: myth.color + '25' }}
          />
        </div>

        {/* Truth side */}
        <div className="p-8 md:p-10 bg-white/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2D8C50' }} />
            <span className="text-xs font-bold uppercase tracking-widest font-label" style={{ color: '#2D8C50' }}>
              The Truth
            </span>
          </div>
          <p className="text-on-surface-variant font-body text-sm md:text-base leading-relaxed mb-4">
            {myth.truth}
          </p>
          <p className="text-on-surface-variant/50 font-body text-xs">
            Source: {myth.source}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Stat card ── */
function StatCard({ stat, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group"
    >
      <div className="h-full p-8 rounded-sm bg-white/60 hover:bg-white transition-colors duration-300">
        <span
          className="font-nunito font-black leading-none tracking-tight block mb-3"
          style={{ fontSize: 'clamp(48px, 6vw, 72px)', color: stat.color }}
        >
          {stat.number}
        </span>
        <p className="font-headline font-black text-on-surface text-base md:text-lg tracking-tight mb-2">
          {stat.label}
        </p>
        <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-3">
          {stat.detail}
        </p>
        <p className="text-on-surface-variant/40 font-body text-xs">
          {stat.source}
        </p>
      </div>
    </motion.div>
  )
}

export default function Philosophy() {
  return (
    <div className="text-on-surface font-body">
      <main className="relative z-10 bg-background overflow-x-hidden min-h-screen">
      <Nav />

      {/* ── Hero ── */}
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
              FOR PARENTS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-nunito font-black leading-none mb-6"
            style={{ fontSize: 'clamp(56px, 10vw, 120px)', color: '#2d2a24' }}
          >
            Our<br />Philosophy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-on-surface-variant font-body text-xl max-w-lg leading-relaxed"
          >
            Early childhood is the most important chapter of your child's life. Here's what the research says — and what every parent should know.
          </motion.p>
        </div>

        {/* Decorative background text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute right-0 bottom-0 font-headline font-black text-[18vw] leading-none select-none pointer-events-none"
          style={{ color: '#2d2a2406' }}
        >
          WHY
        </motion.div>
      </section>

      {/* ── Key stat banner ── */}
      <section className="py-16 md:py-20 px-6 md:px-20" style={{ background: '#3437f1' }}>
        <RevealSection className="max-w-5xl mx-auto text-center">
          <span className="font-nunito font-black text-white leading-none tracking-tight block mb-4" style={{ fontSize: 'clamp(64px, 12vw, 140px)' }}>
            90%
          </span>
          <p className="text-white/90 font-headline font-black text-xl md:text-2xl tracking-tight mb-3">
            of a child's brain develops before age 5
          </p>
          <p className="text-white/60 font-body text-sm md:text-base max-w-md mx-auto leading-relaxed">
            The first five years shape the foundation for all future learning, behaviour, and health. What happens in these years matters more than any other period of life.
          </p>
          <p className="text-white/30 font-body text-xs mt-4">
            Trying Together; Rasmussen University
          </p>
        </RevealSection>
      </section>

      {/* ── Myths section ── */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="mb-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-xs font-label mb-4 block">
              Myths vs Facts
            </span>
            <h2
              className="font-nunito font-black leading-none tracking-tight mb-4"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#2d2a24' }}
            >
              What We Often Hear
            </h2>
            <p className="text-on-surface-variant font-body text-base md:text-lg max-w-xl leading-relaxed">
              As parents, it's natural to want the best for your child. But some of the most common beliefs about early education are actually misconceptions. Here's what the research really says.
            </p>
          </RevealSection>

          <div className="space-y-6">
            {MYTHS.map((myth, i) => (
              <MythCard key={i} myth={myth} index={i} />
            ))}
          </div>

          {/* Expert quote */}
          <RevealSection className="mt-16 py-10 px-8 md:px-12 border-l-4" style={{ borderColor: '#3437f1', backgroundColor: '#3437f108' }}>
            <p className="font-headline font-black text-on-surface text-lg md:text-xl leading-relaxed tracking-tight mb-4 italic">
              "We need parents on our side in terms of what's the truth about children, what's really right for children, so that parents will help educators advocate for it."
            </p>
            <p className="text-on-surface-variant font-body text-sm">
              — <span className="font-bold">Rae Pica</span>, Award-Winning Early Childhood Educator & Author
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ── Benefits / Stats section ── */}
      <section className="py-24 px-6 md:px-20" style={{ background: '#F0EAE0' }}>
        <div className="max-w-5xl mx-auto">
          <RevealSection className="mb-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-xs font-label mb-4 block">
              The Evidence
            </span>
            <h2
              className="font-nunito font-black leading-none tracking-tight mb-4"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#2d2a24' }}
            >
              What Research Shows
            </h2>
            <p className="text-on-surface-variant font-body text-base md:text-lg max-w-xl leading-relaxed">
              Decades of research — including landmark studies like the Perry Preschool Project and the Abecedarian Project — consistently show that quality early childhood education produces lasting, measurable benefits.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>

          {/* Additional benefit callout */}
          <RevealSection className="mt-12 text-center">
            <p className="text-on-surface-variant font-body text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              A meta-analysis of <span className="font-bold text-on-surface">22 high-quality studies spanning 1960 to 2016</span> found that the benefits of early childhood education don't fade over time — they actually <span className="font-bold text-on-surface">grow stronger</span> as children progress through school.
            </p>
            <p className="text-on-surface-variant/50 font-body text-xs mt-3">
              PMC / National Institutes of Health
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ── CTA section ── */}
      <section className="py-24 px-6 md:px-20">
        <RevealSection className="max-w-5xl mx-auto text-center">
          <h2
            className="font-nunito font-black leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#2d2a24' }}
          >
            Give Your Child the<br />Best Start
          </h2>
          <p className="text-on-surface-variant font-body text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8">
            At Tots & Friends, we believe every child deserves a nurturing, play-rich environment where they can grow at their own pace. Come see the difference for yourself.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-block bg-amber-400 hover:bg-amber-500 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-colors shadow-lg shadow-amber-400/30"
            >
              Get in Touch
            </Link>
            <Link
              to="/timeline"
              className="inline-block border border-on-surface text-on-surface text-xs font-bold font-label uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-on-surface hover:text-white transition-colors duration-300"
            >
              Our Story
            </Link>
          </div>
        </RevealSection>
      </section>

      {/* ── Sources ── */}
      <section className="py-16 px-6 md:px-20 border-t border-surface-container-high">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <span className="text-secondary font-bold tracking-widest uppercase text-xs font-label mb-6 block">
              Sources & References
            </span>
            <ol className="space-y-3">
              {SOURCES.map((source, i) => (
                <li key={i} className="text-on-surface-variant font-body text-sm leading-relaxed">
                  <span className="text-on-surface font-bold">[{i + 1}]</span>{' '}
                  <span className="font-bold">{source.name}</span> — {source.title}.{' '}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-all"
                  >
                    {source.url}
                  </a>
                </li>
              ))}
            </ol>
          </RevealSection>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
