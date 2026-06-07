'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

export default function EclipseSequence() {
  const canvasRef = useRef(null)
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [rotationAngle, setRotationAngle] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth < 768)
  }, [])

  const phases = [
    { id: "courses", label: "Courses", progress: 0.95, displayNameEn: "📚 COURSES", displayNameAr: "📚 الدورات", special: false, route: "/phase/courses" },
    { id: "services", label: "Services", progress: 0.85, displayNameEn: "✨ SERVICES", displayNameAr: "✨ الخدمات", special: false, route: "/phase/services" },
    { id: "library", label: "Library", progress: 0.75, displayNameEn: "📖 LIBRARY", displayNameAr: "📖 المكتبة", special: "brown", route: "/library" },
    { id: "music", label: "Music", progress: 0.65, displayNameEn: "🎵 MUSIC", displayNameAr: "🎵 الموسيقى", special: "pink", route: "/music" },
    { id: "spirit-animals", label: "Spirit Animals", progress: 0.6, displayNameEn: "🐺 SPIRIT ANIMALS", displayNameAr: "🐺 الحيوانات الروحية", special: "orange", route: "/spirit-animals" },
    { id: "chakras", label: "Chakras", progress: 0.55, displayNameEn: "🔴 CHAKRAS", displayNameAr: "🔴 الشاكرات", special: "rainbow", route: "/chakras" },
    { id: "symbolys", label: "Symbolys", progress: 0.5, displayNameEn: "🌀 SYMBOLYS", displayNameAr: "🌀 الرموز", special: "teal", route: "/symbolys" },
    { id: "mythology", label: "Mythology", progress: 0.47, displayNameEn: "🏛️ MYTHOLOGY", displayNameAr: "🏛️ الأساطير", special: "gold", route: "/mythology" },
    { id: "cosmic-energy", label: "Cosmic Energy", progress: 0.45, displayNameEn: "📅 COSMIC ENERGY", displayNameAr: "📅 الطاقة الكونية", special: "purple", route: "/reading-energy" },
    { id: "plant-planet", label: "Plant Planet", progress: 0.4, displayNameEn: "🌿 PLANT PLANET", displayNameAr: "🌿 كوكب النباتات", special: "green", route: "/plant-planet" },
    { id: "astral-charts", label: "Astral Charts", progress: 0.35, displayNameEn: "⭐ ASTRAL CHARTS", displayNameAr: "⭐ الأبراج والفلك", special: "gold", route: "/astral-charts" },
    { id: "numerology", label: "Numerology", progress: 0.3, displayNameEn: "🔢 NUMEROLOGY", displayNameAr: "🔢 علم الأعداد", special: "silver", route: "/numerology" },
    { id: "contact", label: "Contact", progress: 0.2, displayNameEn: "📞 CONTACT", displayNameAr: "📞 اتصل", special: "pink", route: "/contact" },
    { id: "lilith", label: "Lilith", progress: 0.1, displayNameEn: "✨ WHO IS LILITH ✨", displayNameAr: "✨ من هي ليليث ✨", special: "cyan", route: "/lilith" }
  ]

  // Update rotation angle
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle(prev => prev + 0.002)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const getOrbitPosition = (index, total, angle) => {
    const orbitRadius = isMobile ? 180 : 280
    const rad = (index / total) * Math.PI * 2 + angle
    const x = Math.cos(rad) * orbitRadius
    const y = Math.sin(rad) * orbitRadius
    return { x, y }
  }

  const getRingColor = (special) => {
    switch(special) {
      case 'cyan': return '#00ffff'
      case 'pink': return '#ff66cc'
      case 'purple': return '#aa66ff'
      case 'green': return '#44ff88'
      case 'gold': return '#ffcc00'
      case 'silver': return '#c0c0c0'
      case 'brown': return '#cd7f32'
      case 'orange': return '#ff8c00'
      case 'rainbow': return '#ff00ff'
      case 'teal': return '#20b2aa'
      default: return null
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#02082a]">
      {/* Canvas for visuals only */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ touchAction: 'none' }}
      />

      {/* Clickable HTML buttons for moons */}
      <div className="relative w-full h-full">
        {phases.map((phase, idx) => {
          const { x, y } = getOrbitPosition(idx, phases.length, rotationAngle)
          const ringColor = getRingColor(phase.special)
          
          return (
            <motion.button
              key={phase.id}
              onClick={() => router.push(phase.route)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center shadow-lg transition-all active:scale-95 hover:scale-105
                ${isMobile ? 'w-20 h-20' : 'w-24 h-24'}`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                backgroundColor: 'rgba(100, 100, 180, 0.85)',
                backdropFilter: 'blur(4px)',
                border: ringColor ? `2px solid ${ringColor}` : '1px solid rgba(0, 150, 200, 0.5)',
                boxShadow: ringColor ? `0 0 15px ${ringColor}` : '0 0 10px rgba(0, 150, 200, 0.3)'
              }}
            >
              <span className="text-white text-xs font-bold text-center px-1">
                {language === 'en' ? phase.displayNameEn : phase.displayNameAr}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 z-50 px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 text-sm hover:bg-cyan-500/30 transition-all duration-300 border border-cyan-500/30 backdrop-blur-sm"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Title */}
      <div className="absolute top-12 left-0 right-0 text-center z-10 pointer-events-none">
        <h1 className="text-2xl md:text-4xl font-light tracking-[0.2em] text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text">
          {language === 'en' ? "LILITH'S SPACE" : "فضاء ليليث"}
        </h1>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-3" />
      </div>
    </div>
  )
}
