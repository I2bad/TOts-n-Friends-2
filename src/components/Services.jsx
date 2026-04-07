import { motion } from 'framer-motion'

const PROGRAMS = [
  {
    icon: 'baby_changing_station',
    title: 'Infant Care',
    age: '0 – 12 months',
    color: 'primary',
    colorHex: '#3437f1',
    bg: 'hover:bg-primary/8',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    offset: 'md:mt-0',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWcpB0miSYNL9VrOJ4VJ5JZ0yZhYrrIw55wOIQTVz1XzvKBANGooOK_aE7i1_NgixQeG-dJAfgDrUGQC5CewZcwtM51TSRh8JDS9CoHHIk98wRtD5Vx4HKukUk_8lGPg6JT5UfIF6f1uHyooiIPrvxqjh8c4r5-cSOh0QpcaRE4Y80oAl_U-1P6iN2KLhoEVKmTv8-EskBGGdHgIeqxx1fWiIoi1TBZHAOMprCW4qH5xBwUdCEB8cnFKyXDhQGkLoTIIaxRUl_uRDw',
    description: 'Nurturing soft environments designed for safety and sensory discovery for our youngest learners.',
    rotate: 'group-hover:rotate-2',
  },
  {
    icon: 'toys',
    title: 'Toddler Program',
    age: '1 – 3 years',
    color: 'secondary',
    colorHex: '#fd7a4b',
    bg: 'hover:bg-secondary/8',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    offset: 'md:mt-14',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD64iRY2rVcFLjkuYz2fN-eELi9KtchIOekrQ1Q__Y-zmNMTmRw6CqVrU59Ij9okGBWNA5hOw1B8uhNlHkZLlOkzBBX-i2DqwLiQrFNL22DHb6H9UYwzLfAAybA08cM-zIZafjNDpMl83Rv6YLIljrpVCUdaLV7FtMePEf3WvEYIkjqn4V-FuEZuL5m2oKIEcn4f4SqzBfOdwBuzdxHW83OCMrRy8ck_hlvX9uGdl0br8VoAWu6ruNTQXlj4vb0wUChU1xgf6qVqalQ',
    description: 'Exploratory play and social foundations focused on independence and emotional growth.',
    rotate: 'group-hover:-rotate-2',
  },
  {
    icon: 'palette',
    title: 'Preschool',
    age: '3 – 5 years',
    color: 'tertiary',
    colorHex: '#006639',
    bg: 'hover:bg-tertiary-container/20',
    iconBg: 'bg-tertiary-container/30',
    iconColor: 'text-tertiary',
    offset: 'md:mt-0',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB-aoMfqQhNF_hXRWaSjo2tE2Ry9J7saFLIKkmo_A1WnqKK-UCSUIUGjI2vH7EsLC8Rwk5-O6Sl7MQ6Hzru0ap69uocQ0P4nNpIyFQUELqNWfer8mm3Lsc0eeu3-vwJvcqGKIxVnFsb21F4beo5CqM8l9AogmJakP4EsycMnNSMERI-VOuxqTzyR2awC259ztmkgAMvMwv695EoDI_ppE__Uo7-7H7ekT93l1qBx1G9lT60GwYODJs25EtE5r5gka92PytsgriRI3K',
    description: 'Creative curriculum preparing future thinkers through art, science, and collaborative projects.',
    rotate: 'group-hover:scale-105',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <span className="text-secondary font-bold tracking-widest uppercase text-sm font-label">What We Offer</span>
        <h2 className="font-headline text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-on-surface tracking-tight mt-3 mb-5">
          Our Programs
        </h2>
        <div className="flex justify-center gap-2">
          <div className="w-10 h-2 bg-primary rounded-full" />
          <div className="w-16 h-2 bg-secondary rounded-full" />
          <div className="w-10 h-2 bg-tertiary-container rounded-full" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROGRAMS.map((program, i) => (
          <motion.div
            key={program.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className={`group relative bg-surface-container-low p-8 rounded-[3rem] ${program.bg} transition-colors duration-500 overflow-hidden ${program.offset}`}
          >
            {/* Decorative corner blob */}
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
              style={{ background: program.colorHex + '25' }}
            />

            {/* Age badge */}
            <span
              className="absolute top-6 right-6 text-xs font-bold font-label px-3 py-1 rounded-full"
              style={{ background: program.colorHex + '18', color: program.colorHex }}
            >
              {program.age}
            </span>

            {/* Icon */}
            <div className={`w-16 h-16 ${program.iconBg} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
              <span className={`material-symbols-outlined ${program.iconColor} text-3xl`}>
                {program.icon}
              </span>
            </div>

            <h3 className="font-headline text-3xl font-bold text-on-surface mb-4 tracking-tight">
              {program.title}
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-8 font-body">
              {program.description}
            </p>

            {/* Image */}
            <div className="overflow-hidden rounded-[2rem]">
              <img
                className={`w-full h-52 object-cover shadow-xl ${program.rotate} transition-transform duration-500`}
                src={program.img}
                alt={program.title}
              />
            </div>

            {/* Learn more */}
            <motion.div
              className="flex items-center gap-2 mt-6 font-bold font-label opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: program.colorHex }}
            >
              <span className="text-sm">Learn more</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
