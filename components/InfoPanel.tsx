'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface InfoPanelProps {
  section: string | null
  isOpen: boolean
  onClose: () => void
}

export default function InfoPanel({ section, isOpen, onClose }: InfoPanelProps) {
  const getContent = () => {
    const phaseInfo: Record<string, { title: string; description: string; meaning: string }> = {
      "Waning Gibbous": {
        title: "🌙 Waning Gibbous",
        description: "The moon is past full and decreasing in light.",
        meaning: "Release, gratitude, reflection"
      },
      "Third Quarter": {
        title: "📖 Third Quarter",
        description: "Half of the moon is illuminated, waning.",
        meaning: "Forgiveness, letting go, completion"
      },
      "Waning Crescent": {
        title: "✨ Waning Crescent",
        description: "A thin crescent just before the new moon.",
        meaning: "Rest, surrender, dreamwork"
      },
      "Thin Crescent": {
        title: "🌙 Thin Crescent",
        description: "A delicate sliver of light returning.",
        meaning: "Hope, new beginnings, intention"
      },
      "Very Thin": {
        title: "✨ Very Thin Crescent",
        description: "Almost invisible, the quiet before renewal.",
        meaning: "Stillness, inner knowing, trust"
      },
      "Razor Crescent": {
        title: "⚡ Razor Crescent",
        description: "A sharp, precise sliver of light.",
        meaning: "Clarity, focus, cutting away"
      },
      "Almost New": {
        title: "🖤 Almost New",
        description: "The darkest phase, just before rebirth.",
        meaning: "Shadow work, deep rest, potential"
      },
      "Waxing Razor": {
        title: "🌅 Waxing Razor",
        description: "The first light returning after new moon.",
        meaning: "Renewal, fresh start, action"
      },
      "Waxing Thin": {
        title: "🌙 Waxing Thin",
        description: "Growing light, gathering momentum.",
        meaning: "Building, nurturing, growth"
      },
      "Waxing Crescent": {
        title: "🌙 Waxing Crescent",
        description: "The crescent grows toward first quarter.",
        meaning: "Setting intentions, manifestation"
      },
      "First Quarter": {
        title: "🔮 First Quarter",
        description: "Half illuminated, moving toward full.",
        meaning: "Decision, action, overcoming"
      }
    }

    const info = phaseInfo[section || ""] || {
      title: "🌙 Eclipse Phase",
      description: "A phase of the lunar cycle",
      meaning: "Cosmic alignment"
    }

    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-3 text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text">
          {info.title}
        </h2>
        <div className="w-12 h-px bg-gradient-to-r from-cyan-500 to-transparent mx-auto my-4" />
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          {info.description}
        </p>
        <div className="bg-cyan-500/10 rounded-lg p-3 mt-3">
          <p className="text-cyan-400 text-xs tracking-wider">✦ {info.meaning} ✦</p>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed top-1/2 right-5 transform -translate-y-1/2 w-80 max-w-[85vw] bg-black/60 backdrop-blur-xl rounded-2xl p-5 z-50 border border-cyan-500/30"
        >
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl">✕</button>
          {getContent()}
        </motion.div>
      )}
    </AnimatePresence>
  )
}