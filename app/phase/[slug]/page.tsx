'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PhasePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const [phaseData, setPhaseData] = useState<any>(null)

  const phases: Record<string, { title: string; description: string; meaning: string; color: string; element: string }> = {
    "waning-gibbous": {
      title: "🌙 Waning Gibbous",
      description: "The phase of release and gratitude. The moon begins to fade after its fullest expression.",
      meaning: "Let go of what no longer serves you",
      color: "from-purple-400 to-blue-400",
      element: "Water"
    },
    "third-quarter": {
      title: "📖 Third Quarter",
      description: "The halfway point of the waning cycle. A time for forgiveness and completion.",
      meaning: "Release attachments and old patterns",
      color: "from-indigo-400 to-purple-400",
      element: "Earth"
    },
    "waning-crescent": {
      title: "✨ Waning Crescent",
      description: "The final sliver before darkness. A time for rest, dreams, and surrender.",
      meaning: "Trust the unknown, rest deeply",
      color: "from-blue-400 to-cyan-400",
      element: "Water"
    },
    "thin-crescent": {
      title: "🌙 Thin Crescent",
      description: "A delicate return of light. Hope begins to emerge from darkness.",
      meaning: "New beginnings are approaching",
      color: "from-cyan-400 to-teal-400",
      element: "Air"
    },
    "very-thin": {
      title: "✨ Very Thin Crescent",
      description: "Almost invisible, the quiet moment before renewal.",
      meaning: "Stillness holds infinite potential",
      color: "from-slate-400 to-blue-400",
      element: "Spirit"
    },
    "razor-crescent": {
      title: "⚡ Razor Crescent",
      description: "A sharp, precise sliver cutting through the void.",
      meaning: "Clarity, focus, decisive action",
      color: "from-amber-400 to-orange-400",
      element: "Fire"
    },
    "almost-new": {
      title: "🖤 Almost New",
      description: "The darkest night before the rebirth.",
      meaning: "Shadow work, deep healing",
      color: "from-gray-700 to-purple-800",
      element: "Shadow"
    },
    "waxing-razor": {
      title: "🌅 Waxing Razor",
      description: "The first light returns, sharp and focused.",
      meaning: "Renewal, fresh intentions",
      color: "from-orange-400 to-amber-400",
      element: "Fire"
    },
    "waxing-thin": {
      title: "🌙 Waxing Thin",
      description: "Growing light, gathering momentum.",
      meaning: "Build your dreams steadily",
      color: "from-green-400 to-teal-400",
      element: "Earth"
    },
    "waxing-crescent": {
      title: "🌙 Waxing Crescent",
      description: "The crescent grows, intentions take form.",
      meaning: "Set clear intentions, take action",
      color: "from-emerald-400 to-cyan-400",
      element: "Air"
    },
    "first-quarter": {
      title: "🔮 First Quarter",
      description: "Half illuminated, moving toward fullness.",
      meaning: "Decision, commitment, action",
      color: "from-yellow-400 to-orange-400",
      element: "Fire"
    }
  }

  useEffect(() => {
    if (slug && phases[slug]) {
      setPhaseData(phases[slug])
    }
  }, [slug])

  if (!phaseData) {
    return (
      <div className="min-h-screen bg-[#02030a] flex items-center justify-center">
        <div className="text-cyan-400 animate-pulse">Loading cosmic wisdom...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#02030a] to-[#050a1a] flex flex-col items-center justify-center px-6">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="absolute top-8 left-8 text-cyan-400/60 hover:text-cyan-400 transition-colors flex items-center gap-2"
      >
        ← Back to Space
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <div className={`text-7xl md:text-8xl mb-6 bg-gradient-to-r ${phaseData.color} bg-clip-text text-transparent`}>
          {phaseData.title.split(' ')[0]}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-light text-cyan-300 mb-4">
          {phaseData.title}
        </h1>
        
        <div className="w-20 h-px bg-gradient-to-r from-cyan-500 to-transparent mx-auto my-6" />
        
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
          {phaseData.description}
        </p>
        
        <div className="bg-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
          <p className="text-cyan-400 text-sm tracking-wider mb-2">✦ COSMIC MESSAGE ✦</p>
          <p className="text-white text-xl italic">{phaseData.meaning}</p>
          <div className="mt-4 flex justify-center gap-6">
            <span className="text-cyan-400/60 text-sm">Element: {phaseData.element}</span>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="mt-8 px-8 py-3 bg-transparent border border-cyan-500 rounded-full text-cyan-400 hover:bg-cyan-500/10 transition-all"
        >
          Return to Lilith's Space
        </motion.button>
      </motion.div>
    </div>
  )
}