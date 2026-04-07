import { motion } from 'framer-motion'

const TEAM = [
  {
    name: 'Sarah Chen',
    role: 'Founder & Director',
    speciality: 'Montessori-trained, 15+ years in ECE',
    initials: 'SC',
    color: '#3437f1',
    bio: 'Sarah founded Tots n Friends with a simple belief: that every child deserves a joyful, nurturing start. She brings deep expertise in curriculum design and a passion for play-based learning.',
  },
  {
    name: 'Dr. Mei Lin',
    role: 'Head of Curriculum',
    speciality: 'Early Childhood Development PhD',
    initials: 'ML',
    color: '#fd7a4b',
    bio: 'Mei designs our evidence-based programmes, blending the latest developmental research with creative teaching approaches that keep children engaged and thriving.',
  },
  {
    name: 'James Tan',
    role: 'Lead Educator',
    speciality: 'STEM for Early Learners',
    initials: 'JT',
    color: '#006639',
    bio: 'James turns everyday moments into science experiments. His hands-on approach to early STEM learning helps children discover that maths and science are everywhere.',
  },
  {
    name: 'Priya Nair',
    role: 'Child Psychologist',
    speciality: 'Social-Emotional Development',
    initials: 'PN',
    color: '#E84444',
    bio: 'Priya supports children\'s emotional wellbeing and guides our team in creating a secure, responsive environment where every child feels understood.',
  },
  {
    name: 'Aisha Rahman',
    role: 'Creative Arts Specialist',
    speciality: 'Visual Arts & Music Education',
    initials: 'AR',
    color: '#F5A623',
    bio: 'Aisha fills our days with colour, rhythm, and imagination. She believes creative expression is one of the most powerful ways children learn about themselves and the world.',
  },
  {
    name: 'David Lim',
    role: 'Movement & Play Coach',
    speciality: 'Gross Motor & Outdoor Learning',
    initials: 'DL',
    color: '#2D8C50',
    bio: 'David designs our outdoor learning experiences and physical development programmes, helping children build coordination, confidence, and a love of nature.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function TeamSection() {
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
            The People Behind the Magic
          </span>
          <h2 className="font-headline text-[clamp(2rem,5vw,4rem)] font-black text-on-surface tracking-tight mt-3 mb-5">
            Meet Our Team
          </h2>
          <p className="font-body text-on-surface-variant text-lg max-w-xl mx-auto leading-relaxed">
            Dedicated specialists who bring warmth, expertise, and genuine care to every interaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group bg-white rounded-[2rem] p-8 hover:shadow-xl transition-shadow duration-400 relative overflow-hidden"
            >
              {/* Portrait placeholder */}
              <div
                className="w-full h-52 rounded-2xl mb-5 flex flex-col items-center justify-center gap-2 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300"
                style={{ background: member.color + '10', border: `2px dashed ${member.color}25` }}
              >
                {/* Silhouette shape */}
                <svg width="60" height="60" viewBox="0 0 24 24" fill={member.color + '40'}>
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
                <span className="font-label text-xs font-semibold" style={{ color: member.color + '80' }}>
                  {member.name} — portrait
                </span>
              </div>

              {/* Name + role */}
              <div className="mb-5">
                <h3 className="font-headline font-bold text-base text-on-surface tracking-tight">
                  {member.name}
                </h3>
                <p className="font-label text-xs font-semibold" style={{ color: member.color }}>
                  {member.role}
                </p>
              </div>

              {/* Speciality badge */}
              <span
                className="inline-block text-xs font-label font-semibold px-3 py-1.5 rounded-full mb-4"
                style={{ background: member.color + '12', color: member.color }}
              >
                {member.speciality}
              </span>

              {/* Bio — fades in on hover */}
              <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                {member.bio}
              </p>

              {/* Hover accent */}
              <div
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                style={{ background: member.color + '25' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
