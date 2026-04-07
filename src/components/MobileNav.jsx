import { useState } from 'react'
import { motion } from 'framer-motion'

const TABS = [
  { icon: 'home', label: 'Home', active: true },
  { icon: 'explore', label: 'Programs' },
  { icon: 'calendar_today', label: 'Tours' },
  { icon: 'person', label: 'Account' },
]

export default function MobileNav() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="md:hidden fixed bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-full shadow-2xl shadow-primary/15 flex justify-around items-center px-4 py-3 z-50 border border-surface-container-high/50">
      {TABS.map((tab, i) => (
        <button
          key={tab.label}
          onClick={() => setActiveTab(i)}
          className={`flex flex-col items-center gap-1 relative px-4 py-1 rounded-full transition-colors ${
            activeTab === i ? 'text-primary' : 'text-outline'
          }`}
        >
          {activeTab === i && (
            <motion.div
              layoutId="mobile-tab-indicator"
              className="absolute inset-0 bg-primary/10 rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span
            className="material-symbols-outlined text-xl z-10"
            style={activeTab === i ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            {tab.icon}
          </span>
          <span className="text-[10px] font-bold font-label z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
