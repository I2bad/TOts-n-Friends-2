import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', enquiry: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="text-on-surface font-body">
      <main className="relative z-10 overflow-x-hidden min-h-screen" style={{ background: '#F0EAE0' }}>
      <Nav />

      {/* Main section */}
      <section className="pt-36 md:pt-44 pb-20 px-6 md:px-16 lg:px-24" style={{ background: '#F0EAE0' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* ── Left column ── */}
            <div className="flex flex-col justify-between min-h-[500px]">
              {/* Top content */}
              <div>
                <motion.span
                  {...fadeUp(0)}
                  className="font-bold tracking-widest uppercase text-xs font-label mb-5 block"
                  style={{ color: '#263c70' }}
                >
                  Contact Us
                </motion.span>

                <motion.h1
                  {...fadeUp(0.08)}
                  className="font-nunito font-black leading-none tracking-tight mb-6"
                  style={{ fontSize: 'clamp(56px, 8vw, 100px)', color: '#2d2a24' }}
                >
                  Contact
                </motion.h1>

                <motion.p
                  {...fadeUp(0.15)}
                  className="font-body text-base leading-relaxed max-w-sm mb-8"
                  style={{ color: '#5c5a54' }}
                >
                  We'd love to hear from you. Whether you have a question about enrolment, our programmes, or just want to say hi — we're here to help.
                </motion.p>

                <motion.div {...fadeUp(0.2)}>
                  <Link
                    to="/#about"
                    className="inline-block border-2 text-xs font-bold font-label uppercase tracking-widest px-5 py-2.5 rounded-sm transition-colors duration-300"
                    style={{ borderColor: '#2d2a24', color: '#2d2a24' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2d2a24'; e.currentTarget.style.color = '#F0EAE0' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#2d2a24' }}
                  >
                    About Us
                  </Link>
                </motion.div>
              </div>

              {/* Bottom — email & tel */}
              <motion.div
                {...fadeUp(0.3)}
                className="flex gap-12 mt-16 lg:mt-0"
              >
                <div>
                  <span className="font-bold tracking-widest uppercase text-xs font-label block mb-1.5" style={{ color: '#263c70' }}>
                    Email
                  </span>
                  <a
                    href="mailto:hello@totsnfriends.com.sg"
                    className="font-headline font-black text-sm md:text-base tracking-tight hover:text-primary transition-colors"
                    style={{ color: '#2d2a24' }}
                  >
                    HELLO@TOTSNFRIENDS.COM.SG
                  </a>
                </div>
                <div>
                  <span className="font-bold tracking-widest uppercase text-xs font-label block mb-1.5" style={{ color: '#263c70' }}>
                    Tel
                  </span>
                  <a
                    href="tel:+6591234567"
                    className="font-headline font-black text-sm md:text-base tracking-tight hover:text-primary transition-colors"
                    style={{ color: '#2d2a24' }}
                  >
                    +65 9123 4567
                  </a>
                </div>
              </motion.div>
            </div>

            {/* ── Right column — form with corner brackets ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative bg-white/40 rounded-sm p-2"
            >
              {/* Corner brackets */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: '#2d2a2440' }} />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: '#2d2a2440' }} />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="py-16 px-8 text-center flex flex-col items-center gap-4"
                >
                  <span className="text-5xl">🎉</span>
                  <h3 className="font-headline font-black text-2xl text-on-surface tracking-tight">
                    Message Received!
                  </h3>
                  <p className="text-on-surface-variant font-body text-sm leading-relaxed max-w-xs">
                    Thank you for reaching out. We'll be in touch within one business day.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', enquiry: '', message: '' }) }}
                    className="mt-2 border border-on-surface text-on-surface px-8 py-3 rounded-sm font-bold text-xs font-label uppercase tracking-widest hover:bg-on-surface hover:text-white transition-colors duration-300"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="py-6 px-4 md:px-8 space-y-0">
                  {/* Name */}
                  <div className="py-4 border-b" style={{ borderColor: '#2d2a2418' }}>
                    <label className="font-bold tracking-widest uppercase text-xs font-label block mb-2" style={{ color: '#263c70' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full bg-transparent outline-none font-body text-sm"
                      style={{ color: '#2d2a24' }}
                    />
                  </div>

                  {/* Email */}
                  <div className="py-4 border-b" style={{ borderColor: '#2d2a2418' }}>
                    <label className="font-bold tracking-widest uppercase text-xs font-label block mb-2" style={{ color: '#263c70' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full bg-transparent outline-none font-body text-sm"
                      style={{ color: '#2d2a24' }}
                    />
                  </div>

                  {/* Phone */}
                  <div className="py-4 border-b" style={{ borderColor: '#2d2a2418' }}>
                    <label className="font-bold tracking-widest uppercase text-xs font-label block mb-2" style={{ color: '#263c70' }}>
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+65 9123 4567"
                      className="w-full bg-transparent outline-none font-body text-sm"
                      style={{ color: '#2d2a24' }}
                    />
                  </div>

                  {/* Enquiry type */}
                  <div className="py-4 border-b" style={{ borderColor: '#2d2a2418' }}>
                    <label className="font-bold tracking-widest uppercase text-xs font-label block mb-2" style={{ color: '#263c70' }}>
                      Enquiry
                    </label>
                    <select
                      name="enquiry"
                      value={form.enquiry}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none font-body text-sm cursor-pointer appearance-none"
                      style={{ color: '#2d2a24' }}
                    >
                      <option value="" disabled>Select...</option>
                      <option>Enrolment Enquiry</option>
                      <option>Programme Information</option>
                      <option>General Question</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="py-4 border-b" style={{ borderColor: '#2d2a2418' }}>
                    <label className="font-bold tracking-widest uppercase text-xs font-label block mb-2" style={{ color: '#263c70' }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your child and what you're looking for..."
                      className="w-full bg-transparent outline-none font-body text-sm resize-none"
                      style={{ color: '#2d2a24' }}
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-6">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full border-2 py-4 rounded-sm font-bold font-label text-xs uppercase tracking-widest transition-colors duration-300"
                      style={{ borderColor: '#2d2a24', color: '#2d2a24' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2d2a24'; e.currentTarget.style.color = '#F0EAE0' }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#2d2a24' }}
                    >
                      Submit
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
