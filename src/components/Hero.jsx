import { motion } from 'framer-motion'
import { InteractiveRobotSpline } from './InteractiveRobotSpline'
import logo from '/logo.png'

const SPLINE_SCENE = 'https://prod.spline.design/KexH7Kmxx580QUad/scene.splinecode'

export default function Hero({ onSplineReady }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#F0EAE0' }}
    >
      {/* Side-by-side layout: text left, Spline right */}
      <div className="flex items-center min-h-screen w-full">

        {/* Left: text block */}
        <div
          className="relative z-10 flex-shrink-0 pointer-events-none px-6 md:px-0"
          style={{
            width: 'clamp(280px, 42%, 580px)',
            marginLeft: 'max(24px, calc(50% - 680px))',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 md:gap-4"
          >
            <img src={logo} alt="Tots & Friends logo" className="h-16 md:h-24 w-auto" />
            <h1
              className="font-nunito font-black tracking-tight leading-none"
              style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: '#2d2a24' }}
            >
              Tots n<br />Friends
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-end mt-2"
            style={{ marginRight: 'max(-40px, -3vw)' }}
          >
            <div
              className="font-profont text-white px-3 py-2 rounded-sm"
              style={{
                fontSize: 'clamp(14px, 1.5vw, 20px)',
                fontWeight: 900,
                backgroundColor: '#263c70',
                transform: 'rotate(-6deg)',
                transformOrigin: 'center center',
                letterSpacing: '0.05em',
                display: 'inline-block',
              }}
            >
              CHILDCARE CENTER
            </div>
          </motion.div>
        </div>

        {/* Right: Spline 3D scene — height slightly overshoots to hide Spline watermark */}
        <div
          className="absolute z-0 top-0 right-0 hero-spline-container"
          style={{ height: 'calc(100% + 60px)', overflow: 'hidden' }}
        >
          <InteractiveRobotSpline
            scene={SPLINE_SCENE}
            className="w-full h-full"
            onReady={onSplineReady}
          />
        </div>

      </div>
    </section>
  )
}
