import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: "The transformation in our son's confidence since starting the Preschool program is nothing short of miraculous. The atelier environment is truly magical.",
    name: 'Sarah Jenkins',
    role: 'Mother of Leo, age 4',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3yPlnKDMAIqFl-S89oQNVQo-2ckRGMTP0gcVe3KW4szvVqbRn1xNrIinEM1RHWlOqobk4hdnVoPGSjRz4-ry2Fm5rpEp-81wFmDKiq26aBdsdFoTWh-4krrjBzMnhFz870JkoyB3R38VlPiEraszWomFAdLKQh5SQeixnCkIg2RTf-6on0zYoNwl_83C3bllXJ--6dC74wJDGarWTjS9Ri46FrDV4jtNwQrJfPqeEX4gZaWgpO9HoDXfCBpZae93j4YCjC8pXbTew',
    highlight: false,
    rating: 5,
  },
  {
    quote: "We looked at ten schools before choosing Playful Atelier. Nothing else compares to the high-end feel and the genuine warmth of the staff here.",
    name: 'David Chen',
    role: 'Father of Maya, age 2',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArH2oEGAX26P_Be0S-kLXcNIrzuGLbaVdlfes2-dzRS-voUXybklsHhU8-L7q-kv1XLvWzhawclaNDL77I2dxOC4bwBH51-c1K2nybl6C-8YFLGHaXAnasV_d0tNNJdsqREv1QszCQknqRf_N1zs18NhGV1h7r8Yo42gABrYAEsmqF0Yfn5hUCgXxAuoleFUJx4hbKlb7knEaJH0JrRISaWG94pmwRbUPJtO1vYMrdrZvmWhnnZ4r4ES3ISReNMociIiGNEn56TALM',
    highlight: true,
    rating: 5,
  },
  {
    quote: "The organic meals and the focus on outdoor play are exactly what we were looking for. Our daughter comes home happy and full of stories every single day.",
    name: 'Jessica Taylor',
    role: 'Mother of Chloe, age 1',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDipxxNj6k-yyyoepiVOgsc4f9anTllGJiIjuqs4sBwmq5upvPx3Ghu9HMoizHftSVA1YiD9oMVNB__G6lwStlgZiRM18x5xVeDKN5JGBQHeXPX2q6zC4aTOx3gwWOEcgeHYnyShHw7GpV40-E7bbitY-ROOoRd3gt_5jP9ySsJ1m5MoTsH9uOBEyLkRknH1JgWM8vY2nWvc5DfjZ7olCxeKcszlKeUQU_uH1qDT0QTqKnBX-6oYgapepTt9XNNEFjqEGUAb2048A0Y',
    highlight: false,
    rating: 5,
  },
  {
    quote: "The curriculum is beautifully balanced between structured learning and free exploration. I can already see how it's shaping my child's love of learning.",
    name: 'Amara Okonkwo',
    role: 'Mother of James, age 3',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3yPlnKDMAIqFl-S89oQNVQo-2ckRGMTP0gcVe3KW4szvVqbRn1xNrIinEM1RHWlOqobk4hdnVoPGSjRz4-ry2Fm5rpEp-81wFmDKiq26aBdsdFoTWh-4krrjBzMnhFz870JkoyB3R38VlPiEraszWomFAdLKQh5SQeixnCkIg2RTf-6on0zYoNwl_83C3bllXJ--6dC74wJDGarWTjS9Ri46FrDV4jtNwQrJfPqeEX4gZaWgpO9HoDXfCBpZae93j4YCjC8pXbTew',
    highlight: false,
    rating: 5,
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5 mb-6">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="material-symbols-filled text-secondary" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>
          star
        </span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const dragRef = useRef(null)

  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length)

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60) next()
    else if (info.offset.x > 60) prev()
  }

  return (
    <section id="testimonials" data-navtheme="cool" className="py-28 bg-surface overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-bold tracking-widest uppercase text-sm font-label block mb-3">
            What Parents Say
          </span>
          <h2 className="font-headline text-[clamp(2rem,5vw,4rem)] font-bold text-on-surface tracking-tight">
            Voices of Our Parents
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              ref={dragRef}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 60, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`relative p-10 md:p-14 rounded-[3rem] shadow-2xl cursor-grab active:cursor-grabbing select-none ${
                TESTIMONIALS[active].highlight
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-highest text-on-surface'
              }`}
            >
              {/* Quote mark */}
              <span
                className={`material-symbols-outlined text-7xl absolute top-6 right-8 opacity-15 ${
                  TESTIMONIALS[active].highlight ? 'text-white' : 'text-secondary'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>

              <StarRating count={TESTIMONIALS[active].rating} />

              <p className={`text-xl md:text-2xl leading-relaxed mb-10 font-body italic relative z-10 ${
                TESTIMONIALS[active].highlight ? 'text-white/95' : 'text-on-surface'
              }`}>
                "{TESTIMONIALS[active].quote}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={TESTIMONIALS[active].img}
                  alt={TESTIMONIALS[active].name}
                  className={`w-14 h-14 rounded-full object-cover border-2 ${
                    TESTIMONIALS[active].highlight ? 'border-white/50' : 'border-primary/30'
                  }`}
                />
                <div>
                  <div className={`font-bold font-headline text-lg ${
                    TESTIMONIALS[active].highlight ? 'text-white' : 'text-on-surface'
                  }`}>
                    {TESTIMONIALS[active].name}
                  </div>
                  <div className={`text-sm font-label ${
                    TESTIMONIALS[active].highlight ? 'text-white/70' : 'text-on-surface-variant'
                  }`}>
                    {TESTIMONIALS[active].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active
                      ? 'w-8 h-3 bg-primary'
                      : 'w-3 h-3 bg-surface-container-highest hover:bg-outline'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={prev}
                className="w-12 h-12 rounded-full border-2 border-surface-container-high flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={next}
                className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
