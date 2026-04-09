import { motion } from 'framer-motion'
import CircularTestimonials from '../../../components/ui/CircularTestimonials'

const TEAM = [
  {
    quote:
      'Sarah founded Tots n Friends with a simple belief: that every child deserves a joyful, nurturing start. She brings deep expertise in curriculum design and a passion for play-based learning.',
    name: 'Sarah Chen',
    designation: 'Founder & Director — Montessori-trained, 15+ years in ECE',
    src: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&h=600&fit=crop&q=80',
  },
  {
    quote:
      'Mei designs our evidence-based programmes, blending the latest developmental research with creative teaching approaches that keep children engaged and thriving.',
    name: 'Dr. Mei Lin',
    designation: 'Head of Curriculum — Early Childhood Development PhD',
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&q=80',
  },
  {
    quote:
      'James turns everyday moments into science experiments. His hands-on approach to early STEM learning helps children discover that maths and science are everywhere.',
    name: 'James Tan',
    designation: 'Lead Educator — STEM for Early Learners',
    src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop&q=80',
  },
  {
    quote:
      "Priya supports children's emotional wellbeing and guides our team in creating a secure, responsive environment where every child feels understood.",
    name: 'Priya Nair',
    designation: 'Child Psychologist — Social-Emotional Development',
    src: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&h=600&fit=crop&q=80',
  },
  {
    quote:
      'Aisha fills our days with colour, rhythm, and imagination. She believes creative expression is one of the most powerful ways children learn about themselves and the world.',
    name: 'Aisha Rahman',
    designation: 'Creative Arts Specialist — Visual Arts & Music Education',
    src: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&h=600&fit=crop&q=80',
  },
  {
    quote:
      'David designs our outdoor learning experiences and physical development programmes, helping children build coordination, confidence, and a love of nature.',
    name: 'David Lim',
    designation: 'Movement & Play Coach — Gross Motor & Outdoor Learning',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&q=80',
  },
]

export default function TeamSection() {
  return (
    <section className="py-28 px-6" style={{ background: '#F0EAE0' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-bold tracking-widest uppercase text-sm font-label">
            The People Behind the Magic
          </span>
          <h2 className="font-headline text-[clamp(2rem,5vw,4rem)] font-black text-on-surface tracking-tight mt-3 mb-5">
            Meet Our Team
          </h2>
          <p className="font-body text-on-surface-variant text-lg max-w-xl mx-auto leading-relaxed">
            Dedicated specialists who bring warmth, expertise, and genuine care to every interaction.
          </p>
        </motion.div>

        <div className="flex items-center justify-center">
          <CircularTestimonials
            testimonials={TEAM}
            autoplay
            colors={{
              name: '#1c1b1b',
              designation: '#454556',
              testimony: '#2f2f2f',
              arrowBackground: '#1c1b1b',
              arrowForeground: '#fcf9f8',
              arrowHoverBackground: '#fd7a4b',
            }}
            fontSizes={{
              name: '28px',
              designation: '16px',
              quote: '18px',
            }}
          />
        </div>
      </div>
    </section>
  )
}
