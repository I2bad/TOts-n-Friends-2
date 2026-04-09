import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PROGRAMS = [
  {
    id: 'infant',
    number: '01',
    title: 'Infant Care',
    subtitle: 'Primary Development',
    age: '0 — 12 Months',
    focus: 'Sensory Focus',
    color: '#3437f1',
    description:
      'Sensory-rich environments designed to foster neuro-pathway development through tactile exploration and soft acoustic landscapes.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWcpB0miSYNL9VrOJ4VJ5JZ0yZhYrrIw55wOIQTVz1XzvKBANGooOK_aE7i1_NgixQeG-dJAfgDrUGQC5CewZcwtM51TSRh8JDS9CoHHIk98wRtD5Vx4HKukUk_8lGPg6JT5UfIF6f1uHyooiIPrvxqjh8c4r5-cSOh0QpcaRE4Y80oAl_U-1P6iN2KLhoEVKmTv8-EskBGGdHgIeqxx1fWiIoi1TBZHAOMprCW4qH5xBwUdCEB8cnFKyXDhQGkLoTIIaxRUl_uRDw',
    mask: 'ellipse',
  },
  {
    id: 'toddler',
    number: '02',
    title: 'Toddler Program',
    subtitle: 'Creative Expression',
    age: '1 — 3 Years',
    focus: 'Reggio Inspired',
    color: '#fd7a4b',
    description:
      'Encouraging autonomy through the "Hundred Languages of Children," utilizing clay, paint, and light as primary mediums of discovery.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD64iRY2rVcFLjkuYz2fN-eELi9KtchIOekrQ1Q__Y-zmNMTmRw6CqVrU59Ij9okGBWNA5hOw1B8uhNlHkZLlOkzBBX-i2DqwLiQrFNL22DHb6H9UYwzLfAAybA08cM-zIZafjNDpMl83Rv6YLIljrpVCUdaLV7FtMePEf3WvEYIkjqn4V-FuEZuL5m2oKIEcn4f4SqzBfOdwBuzdxHW83OCMrRy8ck_hlvX9uGdl0br8VoAWu6ruNTQXlj4vb0wUChU1xgf6qVqalQ',
    mask: 'blob',
  },
  {
    id: 'preschool',
    number: '03',
    title: 'Preschool',
    subtitle: 'Advanced Inquiry',
    age: '3 — 5 Years',
    focus: 'STEAM Focus',
    color: '#006639',
    description:
      'A STEAM-integrated curriculum where architectural building and early coding principles meet philosophical inquiry and literature.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB-aoMfqQhNF_hXRWaSjo2tE2Ry9J7saFLIKkmo_A1WnqKK-UCSUIUGjI2vH7EsLC8Rwk5-O6Sl7MQ6Hzru0ap69uocQ0P4nNpIyFQUELqNWfer8mm3Lsc0eeu3-vwJvcqGKIxVnFsb21F4beo5CqM8l9AogmJakP4EsycMnNSMERI-VOuxqTzyR2awC259ztmkgAMvMwv695EoDI_ppE__Uo7-7H7ekT93l1qBx1G9lT60GwYODJs25EtE5r5gka92PytsgriRI3K',
    mask: 'ellipse',
  },
  {
    id: 'afterschool',
    number: '04',
    title: 'The Creative Hive',
    subtitle: 'Extended Mentorship',
    age: '6 — 10 Years',
    focus: 'Digital Arts',
    color: '#fd7a4b',
    description:
      'Deep-dive workshops in digital curation, botanical studies, and collaborative project management for elementary-aged scholars.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHauWTk9dnIpiUE7KayJlRXI-AvcEg0fkOLr9b13rQKxX6nSC-kW7jHyTOqzkEcFK_SU0ZVB5r53bK0eQ3vSCNOxRQQSLWoaiEPdVWWMj1m9-qqurvy4MTivzbw1dRN5tsom5idAw1Olqz_4sl45kWPGLCl-3VauMaBKxs3dNj_4rHsGobU9l-LUSpvSUqrkFInFR5JGjjAbxOcfx6eCvPoo8BpCMNqB7wpCNQZSil-86LCaEfB18e9o8cPaFjNvqpnK85C6TiZnq2',
    mask: 'blob',
  },
]

const contentVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
}

export default function ProgramsSection() {
  const [active, setActive] = useState(0)
  const program = PROGRAMS[active]

  return (
    <section id="services" className="py-28 px-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <span className="text-secondary font-bold tracking-widest uppercase text-sm font-label">
          Programs
        </span>
        <h2 className="font-headline text-[clamp(2rem,5vw,4rem)] font-black text-on-surface tracking-tight mt-3 mb-5">
          What We Offer
        </h2>
        <p className="font-body text-on-surface-variant text-lg max-w-xl leading-relaxed">
          Thoughtfully designed experiences for every stage of early childhood — from first steps to school readiness.
        </p>
      </motion.header>

      {/* Body — sidebar + content */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Sidebar tabs */}
        <nav className="w-full lg:w-1/4 flex flex-col gap-6 lg:sticky lg:top-32">
          <span className="text-xs font-label tracking-[0.2em] uppercase text-on-surface-variant/60 mb-2">
            Our Curriculum
          </span>
          {PROGRAMS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`text-left transition-all duration-300 border-l-4 ${
                active === i
                  ? 'border-on-surface pl-6 opacity-100'
                  : 'border-transparent pl-4 opacity-40 hover:opacity-80'
              }`}
            >
              <span className="block text-xs uppercase tracking-widest text-on-surface-variant/60 mb-1">
                {p.number}
              </span>
              <span className="text-xl md:text-2xl font-headline font-semibold tracking-tight text-on-surface">
                {p.title}
              </span>
            </button>
          ))}
        </nav>

        {/* Content pane */}
        <div className="w-full lg:w-3/4 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={program.id}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col md:flex-row gap-10 md:gap-14 items-center"
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div
                  className="relative overflow-hidden bg-surface-container-low aspect-[4/5]"
                  style={
                    program.mask === 'ellipse'
                      ? { clipPath: 'ellipse(48% 50% at 50% 50%)' }
                      : { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }
                  }
                >
                  <img
                    className="w-full h-full object-cover"
                    src={program.img}
                    alt={program.title}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="w-full md:w-1/2">
                <span className="font-label text-xs tracking-[0.2em] uppercase text-on-surface-variant/60 block mb-2">
                  {program.subtitle}
                </span>
                <h3 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-6 leading-tight">
                  {program.title}
                </h3>
                <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8">
                  {program.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  <span className="px-5 py-2 rounded-full bg-surface-container text-[11px] uppercase tracking-widest text-on-surface font-label font-semibold">
                    {program.age}
                  </span>
                  <span className="px-5 py-2 rounded-full bg-surface-container text-[11px] uppercase tracking-widest text-on-surface font-label font-semibold">
                    {program.focus}
                  </span>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
