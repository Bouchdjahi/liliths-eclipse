'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

export default function EclipseSequence() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check if mobile
    const isMobile = window.innerWidth < 768

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    setCanvasSize()

    // Retrieve persistent system rotation angle from sessionStorage
    let rotationAngle = 0
    if (typeof window !== 'undefined') {
      const savedAngle = sessionStorage.getItem('eclipse_rotation_angle')
      if (savedAngle) {
        rotationAngle = parseFloat(savedAngle)
      }
    }

    let hoveredX = -1000
    let hoveredY = -1000
    let animationId: number
    let time = 0

    const phases = [
      { label: "Courses", progress: 0.0, displayNameEn: "📚 COURSES", displayNameAr: "📚 الدورات", special: false },
      { label: "Services", progress: 0.1, displayNameEn: "✨ SERVICES", displayNameAr: "✨ الخدمات", special: false },
      { label: "Library", progress: 0.2, displayNameEn: "📖 LIBRARY", displayNameAr: "📖 المكتبة", special: "brown" },
      { label: "Music", progress: 0.3, displayNameEn: "🎵 MUSIC", displayNameAr: "🎵 الموسيقى", special: "pink" },
      { label: "Spirit Animals", progress: 0.4, displayNameEn: "🐺 SPIRIT ANIMALS", displayNameAr: "🐺 الحيوانات الروحية", special: "orange" },
      { label: "Chakras", progress: 0.5, displayNameEn: "🔴 CHAKRAS", displayNameAr: "🔴 الشاكرات", special: "rainbow" },
      { label: "Symbolys", progress: 0.6, displayNameEn: "🌀 SYMBOLYS", displayNameAr: "🌀 الرموز", special: "teal" },
      { label: "Reading Energy", progress: 0.7, displayNameEn: "📅 COSMIC ENERGY", displayNameAr: "📅 الطاقة الكونية", special: "purple" },
      { label: "Plant Planet", progress: 0.8, displayNameEn: "🌿 PLANT PLANET", displayNameAr: "🌿 كوكب النباتات", special: "green" },
      { label: "Astral Charts", progress: 0.9, displayNameEn: "⭐ ASTRAL CHARTS", displayNameAr: "⭐ الأبراج والفلك", special: "gold" },
      { label: "Numerology", progress: 0.95, displayNameEn: "🔢 NUMEROLOGY", displayNameAr: "🔢 علم الأعداد", special: "silver" },
      { label: "Contact", progress: 0.85, displayNameEn: "📞 CONTACT", displayNameAr: "📞 اتصل", special: "pink" },
      { label: "Lilith", progress: 0.15, displayNameEn: "✨ WHO IS LILITH ✨", displayNameAr: "✨ من هي ليليث ✨", special: "cyan" }
    ]

    const phasePages: Record<string, string> = {
      "Courses": "/phase/courses",
      "Services": "/phase/services",
      "Library": "/library",
      "Music": "/music",
      "Spirit Animals": "/spirit-animals",
      "Chakras": "/chakras",
      "Symbolys": "/symbolys",
      "Reading Energy": "/reading-energy",
      "Plant Planet": "/plant-planet",
      "Astral Charts": "/astral-charts",
      "Numerology": "/numerology",
      "Contact": "/contact",
      "Lilith": "/lilith"
    }

    const drawCentralCorona = (x: number, y: number, radius: number) => {
      for (let i = 0; i < 4; i++) {
        const pulseRadius = radius + 10 + i * 12 + Math.sin(time * 2.0 + i) * 5
        const gradient = ctx.createRadialGradient(x, y, radius - 8, x, y, pulseRadius)
        gradient.addColorStop(0, `rgba(0, 160, 255, ${0.22 - i * 0.05})`)
        gradient.addColorStop(0.5, `rgba(110, 70, 240, ${0.1 - i * 0.02})`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, pulseRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawRealisticMoon = (x: number, y: number, radius: number, phaseProgress: number, isHovered: boolean) => {
      ctx.save()
      
      ctx.beginPath()
      ctx.arc(x, y, radius + 3, 0, Math.PI * 2)
      ctx.fillStyle = isHovered ? 'rgba(0, 180, 255, 0.08)' : 'rgba(130, 170, 255, 0.03)'
      ctx.fill()

      const moonGrd = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, radius * 0.1, x, y, radius)
      moonGrd.addColorStop(0, '#fdfcf7')
      moonGrd.addColorStop(0.4, '#e6e0cc')
      moonGrd.addColorStop(0.8, '#cbbfa5')
      moonGrd.addColorStop(1, '#a69a84')
      
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = moonGrd
      ctx.fill()
      
      const craters = [
        [0.25, 0.2, 0.22], [-0.3, 0.35, 0.16], [0.45, -0.15, 0.14],
        [-0.35, -0.25, 0.18], [0.0, 0.5, 0.12], [-0.15, -0.45, 0.14],
        [0.5, 0.15, 0.1], [-0.5, -0.05, 0.12]
      ]
      
      craters.forEach(([dx, dy, cr]) => {
        const cX = x + dx * radius
        const cY = y + dy * radius
        const cR = cr * radius
        
        ctx.beginPath()
        ctx.arc(cX, cY, cR, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(80, 72, 58, 0.38)'
        ctx.fill()
        
        ctx.beginPath()
        ctx.arc(cX + cR * 0.15, cY + cR * 0.15, cR * 0.85, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)'
        ctx.lineWidth = 0.7
        ctx.stroke()
      })

      ctx.beginPath()
      ctx.arc(x, y, radius + 0.5, 0, Math.PI * 2)
      ctx.clip()

      ctx.fillStyle = 'rgba(6, 10, 28, 0.96)'
      
      if (phaseProgress < 0.5) {
        const norm = phaseProgress / 0.5
        const rx = Math.max(0.001, Math.abs(radius * (1 - 2 * norm)))
        ctx.beginPath()
        ctx.arc(x, y, radius + 1, Math.PI / 2, (3 * Math.PI) / 2, false)
        ctx.ellipse(x, y, rx, radius, 0, (3 * Math.PI) / 2, Math.PI / 2, (norm > 0.5))
        ctx.fill()
      } else if (phaseProgress < 1.0) {
        const norm = (phaseProgress - 0.5) / 0.5
        const rx = Math.max(0.001, Math.abs(radius * (2 * norm - 1)))
        ctx.beginPath()
        ctx.arc(x, y, radius + 1, Math.PI / 2, (3 * Math.PI) / 2, false)
        ctx.ellipse(x, y, rx, radius, 0, (3 * Math.PI) / 2, Math.PI / 2, (norm < 0.5))
        ctx.fill()
      }
      ctx.restore()

      if (isHovered) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, radius + 6, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0, 220, 255, 0.35)'
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.restore()
      }
    }

    const drawScene = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const centerX = w / 2
      const centerY = h / 2

      ctx.fillStyle = '#02061e'
      ctx.fillRect(0, 0, w, h)

      const ambientGrd = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, Math.max(w, h) * 0.55)
      ambientGrd.addColorStop(0, '#09103c')
      ambientGrd.addColorStop(0.5, '#040826')
      ambientGrd.addColorStop(1, '#010312')
      ctx.fillStyle = ambientGrd
      ctx.fillRect(0, 0, w, h)

      const centralBaseRadius = 75
      drawCentralCorona(centerX, centerY, centralBaseRadius)

      ctx.beginPath()
      ctx.arc(centerX, centerY, centralBaseRadius + 2, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      const centralMoonGrd = ctx.createLinearGradient(centerX - 40, centerY - 40, centerX + 40, centerY + 40)
      centralMoonGrd.addColorStop(0, '#080c24')
      centralMoonGrd.addColorStop(1, '#020412')
      ctx.beginPath()
      ctx.arc(centerX, centerY, centralBaseRadius, 0, Math.PI * 2)
      ctx.fillStyle = centralMoonGrd
      ctx.fill()

      ctx.beginPath()
      ctx.arc(centerX, centerY, centralBaseRadius - 6, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0, 170, 255, 0.15)'
      ctx.lineWidth = 1
      ctx.stroke()

      const orbitRadius = isMobile ? Math.min(w, h) * 0.45 : Math.min(w, h) * 0.35
      ctx.beginPath()
      ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0, 140, 245, 0.05)'
      ctx.lineWidth = 1
      ctx.stroke()

      rotationAngle += 0.0006

      phases.forEach((phase, idx) => {
        const angle = (idx / phases.length) * Math.PI * 2 + rotationAngle
        const x = centerX + Math.cos(angle) * orbitRadius
        const y = centerY + Math.sin(angle) * orbitRadius

        const hitRadius = isMobile ? 45 : 26
        const dist = Math.hypot(hoveredX - x, hoveredY - y)
        const isHovered = dist < hitRadius

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = isHovered ? 'rgba(0, 180, 255, 0.1)' : 'rgba(0, 130, 245, 0.02)'
        ctx.lineWidth = 0.6
        ctx.stroke()

        const moonRadius = isMobile ? 32 : 24
        drawRealisticMoon(x, y, moonRadius, phase.progress, isHovered)

        const displayName = language === 'en' ? phase.displayNameEn : phase.displayNameAr
        const isSpecial = phase.special !== false

        if (isSpecial || isHovered) {
          const fontSize = isMobile ? '14px' : '10px'
          ctx.font = `500 ${fontSize} "Space Grotesk", sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'bottom'
          
          let labelColor = '#8be8ff'
          if (phase.special === "cyan") labelColor = '#00ffff'
          else if (phase.special === "pink") labelColor = '#ff66cc'
          else if (phase.special === "purple") labelColor = '#aa66ff'
          else if (phase.special === "green") labelColor = '#44ff88'
          else if (phase.special === "gold") labelColor = '#ffcc00'
          else if (phase.special === "silver") labelColor = '#c0c0c0'
          else if (phase.special === "brown") labelColor = '#cd7f32'
          else if (phase.special === "orange") labelColor = '#ff8c00'
          else if (phase.special === "teal") labelColor = '#20b2aa'
          else if (phase.special === "rainbow") labelColor = '#ff88ff'

          ctx.fillStyle = labelColor
          const labelOffset = isMobile ? 48 : 34
          ctx.fillText(displayName, x, y - labelOffset)
        }
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      hoveredX = (e.clientX - rect.left) * scaleX
      hoveredY = (e.clientY - rect.top) * scaleY
    }

    // Handle both mouse and touch events
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const touch = e.touches[0]
      
      const touchX = (touch.clientX - rect.left) * scaleX
      const touchY = (touch.clientY - rect.top) * scaleY

      const w = window.innerWidth
      const h = window.innerHeight
      const centerX = w / 2
      const centerY = h / 2
      const orbitRadius = isMobile ? Math.min(w, h) * 0.45 : Math.min(w, h) * 0.35
      const clickRadius = isMobile ? 55 : 28

      for (let idx = 0; idx < phases.length; idx++) {
        const angle = (idx / phases.length) * Math.PI * 2 + rotationAngle
        const x = centerX + Math.cos(angle) * orbitRadius
        const y = centerY + Math.sin(angle) * orbitRadius
        const dist = Math.hypot(touchX - x, touchY - y)

        if (dist < clickRadius) {
          const page = phasePages[phases[idx].label]
          if (page) {
            sessionStorage.setItem('eclipse_rotation_angle', rotationAngle.toString())
            router.push(page)
          }
          break
        }
      }
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const clickX = (e.clientX - rect.left) * scaleX
      const clickY = (e.clientY - rect.top) * scaleY

      const w = window.innerWidth
      const h = window.innerHeight
      const centerX = w / 2
      const centerY = h / 2
      const orbitRadius = isMobile ? Math.min(w, h) * 0.45 : Math.min(w, h) * 0.35
      const clickRadius = isMobile ? 55 : 28

      for (let idx = 0; idx < phases.length; idx++) {
        const angle = (idx / phases.length) * Math.PI * 2 + rotationAngle
        const x = centerX + Math.cos(angle) * orbitRadius
        const y = centerY + Math.sin(angle) * orbitRadius
        const dist = Math.hypot(clickX - x, clickY - y)

        if (dist < clickRadius) {
          const page = phasePages[phases[idx].label]
          if (page) {
            sessionStorage.setItem('eclipse_rotation_angle', rotationAngle.toString())
            router.push(page)
          }
          break
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    window.addEventListener('touchstart', handleTouchStart, { passive: false })

    const animate = () => {
      time += 0.012
      drawScene()
      animationId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      setCanvasSize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('resize', handleResize)
    }
  }, [router, language])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#02061e]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 z-50 px-4 py-2 bg-cyan-500/10 rounded-full text-cyan-300 text-sm hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/30 backdrop-blur-sm"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Clean, Non-Exaggerated Animated Header (Pushed higher up, slightly scaled down to avoid blocking any moons) */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-8 left-0 right-0 text-center z-10 pointer-events-none select-none flex flex-col items-center justify-center"
      >
        <motion.h1 
          animate={{ 
            letterSpacing: language === 'en' ? ["0.22em", "0.30em", "0.22em"] : ["0.10em", "0.16em", "0.10em"],
            textShadow: [
              "0 0 12px rgba(34,211,238,0.2)", 
              "0 0 24px rgba(147,51,234,0.4)", 
              "0 0 12px rgba(34,211,238,0.2)"
            ]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-2xl md:text-3xl font-light tracking-[0.22em] text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-300 bg-clip-text filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {language === 'en' ? "LILITH'S SPACE" : "فضاء ليليث"}
        </motion.h1>
        
        <motion.div 
          animate={{ width: ["40px", "96px", "40px"], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2.5" 
        />
      </motion.div>
      
      {/* Informative Subtext Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10 pointer-events-none px-4 select-none">
        <p className="text-cyan-400/30 text-[8px] md:text-[9px] tracking-widest leading-relaxed max-w-4xl mx-auto">
          {language === 'en' 
            ? '✦ CYAN = LILITH | PINK = MUSIC/CONTACT | PURPLE = COSMIC ENERGY | GREEN = PLANT PLANET | GOLD = ASTRAL CHARTS | SILVER = NUMEROLOGY | BROWN = LIBRARY | ORANGE = SPIRIT ANIMALS | RAINBOW = CHAKRAS | TEAL = SYMBOLYS ✦'
            : '✦ السماوي = ليليث | الوردي = الموسيقى/الاتصال | البنفسجي = الطاقة الكونية | الأخضر = كوكب النباتات | الذهبي = الأبراج | الفضي = علم الأعداد | البني = المكتبة | البرتقالي = الحيوانات الروحية | قوس قزح = الشاكرات | الفيروزي = الرموز ✦'}
        </p>
      </div>
    </div>
  )
}
