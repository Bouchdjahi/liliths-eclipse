'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { labelEn: "HOME", labelAr: "الرئيسية", progress: 0.00, route: "/" },
  { labelEn: "WHO IS LILITH?", labelAr: "من هي ليليث؟", progress: 0.08, route: "/lilith" },
  { labelEn: "COSMIC ENERGY", labelAr: "الطاقة الكونية", progress: 0.16, route: "/reading-energy" },
  { labelEn: "SYMBOLS", labelAr: "الرموز", progress: 0.24, route: "/symbolys" },
  { labelEn: "CHAKRAS", labelAr: "الشاكرات", progress: 0.32, route: "/chakras" },
  { labelEn: "SPIRIT ANIMALS", labelAr: "الحيوانات الروحية", progress: 0.40, route: "/spirit-animals" },
  { labelEn: "PLANT PLANET", labelAr: "كوكب النباتات", progress: 0.48, route: "/plant-planet" },
  { labelEn: "ASTRAL CHARTS", labelAr: "الأبراج والفلك", progress: 0.56, route: "/astral-charts" },
  { labelEn: "NUMEROLOGY", labelAr: "علم الأعداد", progress: 0.64, route: "/numerology" },
  { labelEn: "READINGS", labelAr: "القراءات", progress: 0.72, route: "/phase/courses" },
  { labelEn: "LIBRARY", labelAr: "المكتبة", progress: 0.80, route: "/library" },
  { labelEn: "MUSIC", labelAr: "الموسيقى", progress: 0.88, route: "/music" },
  { labelEn: "ABOUT", labelAr: "حول", progress: 0.96, route: "/phase/services" },
  { labelEn: "CONTACT", labelAr: "اتصل", progress: 0.04, route: "/contact" },
  { labelEn: "WEBSITE", labelAr: "الموقع", progress: 0.12, route: "/websites" },
]

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const router = useRouter()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [moonPositions, setMoonPositions] = useState<Array<{x: number, y: number, labelEn: string, labelAr: string, route: string}>>([])
  
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'ar' : 'en')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768

    let stars: Array<{x: number, y: number, r: number, twinkleSpeed: number, baseAlpha: number, phase: number}> = []
    let comets: Array<{x: number, y: number, length: number, speed: number, angle: number, life: number, active: boolean}> = []
    let nebulaClouds: Array<{x: number, y: number, radius: number, color: string, driftSpeed: number}> = []
    let cometSpawnTimer = 0

    const initStarsAndNebulas = (w: number, h: number) => {
      stars = []
      const starCount = isMobile ? 250 : 500
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          baseAlpha: Math.random() * 0.5 + 0.4,
          phase: Math.random() * Math.PI * 2,
        })
      }
      for (let i = 0; i < 15; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2 + 0.8,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          baseAlpha: Math.random() * 0.4 + 0.6,
          phase: Math.random() * Math.PI * 2,
        })
      }
      nebulaClouds = [
        { x: w * 0.15, y: h * 0.2, radius: w * 0.4, color: 'rgba(15, 25, 70, 0.35)', driftSpeed: 0.00008 },
        { x: w * 0.85, y: h * 0.35, radius: w * 0.45, color: 'rgba(10, 20, 55, 0.30)', driftSpeed: -0.00006 },
        { x: w * 0.5, y: h * 0.9, radius: w * 0.5, color: 'rgba(20, 30, 80, 0.25)', driftSpeed: 0.00005 },
        { x: w * 0.1, y: h * 0.75, radius: w * 0.3, color: 'rgba(8, 15, 45, 0.40)', driftSpeed: -0.0001 },
        { x: w * 0.9, y: h * 0.85, radius: w * 0.35, color: 'rgba(12, 22, 60, 0.30)', driftSpeed: 0.00007 },
      ]
      comets = []
    }

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initStarsAndNebulas(window.innerWidth, window.innerHeight)
    }
    setCanvasSize()

    let rotationAngleRef = 0
    let time = 0
    let animationId: number

    const spawnComet = (w: number, h: number) => {
      const startFromTop = Math.random() > 0.5
      const x = startFromTop ? Math.random() * w : -50
      const y = startFromTop ? -50 : Math.random() * h * 0.5
      const angle = (Math.PI / 4) + (Math.random() * Math.PI / 8 - Math.PI / 16)
      comets.push({
        x,
        y,
        length: Math.random() * 80 + 80,
        speed: Math.random() * 6 + 8,
        angle,
        life: 0,
        active: true,
      })
    }

    const drawCosmicBackground = (w: number, h: number) => {
      ctx.fillStyle = '#020308'
      ctx.fillRect(0, 0, w, h)

      const centerX = w / 2
      const centerY = h / 2
      const ambientGrd = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, Math.max(w, h) * 0.75)
      ambientGrd.addColorStop(0, '#060a20')
      ambientGrd.addColorStop(0.4, '#030510')
      ambientGrd.addColorStop(1, '#020308')
      ctx.fillStyle = ambientGrd
      ctx.fillRect(0, 0, w, h)

      nebulaClouds.forEach((cloud) => {
        cloud.x += cloud.driftSpeed * w
        cloud.y += cloud.driftSpeed * h * 0.5
        if (cloud.x > w + cloud.radius) cloud.x = -cloud.radius
        if (cloud.x < -cloud.radius) cloud.x = w + cloud.radius
        if (cloud.y > h + cloud.radius) cloud.y = -cloud.radius
        if (cloud.y < -cloud.radius) cloud.y = h + cloud.radius

        const nebulaGrd = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius)
        nebulaGrd.addColorStop(0, cloud.color)
        nebulaGrd.addColorStop(0.6, cloud.color.replace(/[\d.]+\)$/, '0.05)'))
        nebulaGrd.addColorStop(1, 'transparent')
        ctx.fillStyle = nebulaGrd
        ctx.fillRect(0, 0, w, h)
      })

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 50 + star.phase) * 0.5 + 0.5
        const alpha = star.baseAlpha * twinkle
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240, 245, 255, ${alpha})`
        ctx.fill()

        if (star.r > 0.9) {
          const shineGrd = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 6)
          shineGrd.addColorStop(0, `rgba(200, 220, 255, ${alpha * 0.3})`)
          shineGrd.addColorStop(0.4, `rgba(180, 210, 255, ${alpha * 0.08})`)
          shineGrd.addColorStop(1, 'transparent')
          ctx.fillStyle = shineGrd
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r * 6, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      cometSpawnTimer += 1
      if (cometSpawnTimer > 180 && comets.length < 3) {
        spawnComet(w, h)
        cometSpawnTimer = 0
      }

      comets = comets.filter(comet => {
        comet.x += Math.cos(comet.angle) * comet.speed
        comet.y += Math.sin(comet.angle) * comet.speed
        comet.life += 1

        if (comet.x > w + 100 || comet.y > h + 100 || comet.life > 400) return false

        const tailX = comet.x - Math.cos(comet.angle) * comet.length
        const tailY = comet.y - Math.sin(comet.angle) * comet.length
        
        const cometGrd = ctx.createLinearGradient(tailX, tailY, comet.x, comet.y)
        cometGrd.addColorStop(0, 'rgba(180, 210, 255, 0)')
        cometGrd.addColorStop(0.7, 'rgba(200, 225, 255, 0.4)')
        cometGrd.addColorStop(1, 'rgba(255, 255, 255, 0.9)')

        ctx.beginPath()
        ctx.strokeStyle = cometGrd
        ctx.lineWidth = 1.5
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(comet.x, comet.y)
        ctx.stroke()

        const headGrd = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, 12)
        headGrd.addColorStop(0, 'rgba(255, 255, 255, 1)')
        headGrd.addColorStop(0.3, 'rgba(200, 225, 255, 0.6)')
        headGrd.addColorStop(1, 'transparent')
        ctx.fillStyle = headGrd
        ctx.beginPath()
        ctx.arc(comet.x, comet.y, 12, 0, Math.PI * 2)
        ctx.fill()

        return true
      })
    }

    const drawCentralCorona = (x: number, y: number, radius: number) => {
      for (let i = 0; i < 3; i++) {
        const pulseRadius = radius + 5 + i * 8 + Math.sin(time * 1.5 + i) * 3
        const gradient = ctx.createRadialGradient(x, y, radius - 4, x, y, pulseRadius)
        gradient.addColorStop(0, `rgba(74, 140, 255, ${0.15 - i * 0.04})`)
        gradient.addColorStop(0.6, `rgba(74, 140, 255, ${0.05 - i * 0.01})`)
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
      ctx.arc(x, y, radius + 4, 0, Math.PI * 2)
      ctx.fillStyle = isHovered ? 'rgba(74, 140, 255, 0.15)' : 'rgba(74, 140, 255, 0.03)'
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
      ctx.fillStyle = 'rgba(3, 4, 10, 0.96)'
      
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
        ctx.arc(x, y, radius + 8, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(74, 140, 255, 0.4)'
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.restore()
      }
    }

    const drawScene = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const centerX = w / 2
      const centerY = h / 2 + 60  // Pushed down to make room for the title

      drawCosmicBackground(w, h)

      const centralBaseRadius = isMobile ? 60 : 80
      drawCentralCorona(centerX, centerY, centralBaseRadius)

      ctx.beginPath()
      ctx.arc(centerX, centerY, centralBaseRadius + 1, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(74, 140, 255, 0.9)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      const centralMoonGrd = ctx.createLinearGradient(centerX - 40, centerY - 40, centerX + 40, centerY + 40)
      centralMoonGrd.addColorStop(0, '#02030a')
      centralMoonGrd.addColorStop(1, '#000000')
      ctx.beginPath()
      ctx.arc(centerX, centerY, centralBaseRadius, 0, Math.PI * 2)
      ctx.fillStyle = centralMoonGrd
      ctx.fill()

      ctx.beginPath()
      ctx.arc(centerX, centerY, centralBaseRadius - 6, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(74, 140, 255, 0.15)'
      ctx.lineWidth = 1
      ctx.stroke()

      const orbitRadius = isMobile ? Math.min(w, h) * 0.45 : Math.min(w, h) * 0.35
      ctx.beginPath()
      ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(74, 140, 255, 0.08)'
      ctx.lineWidth = 1
      ctx.stroke()

      rotationAngleRef += 0.0004
      time += 0.016

      const newPositions: Array<{x: number, y: number, labelEn: string, labelAr: string, route: string}> = []

      NAV_ITEMS.forEach((item, idx) => {
        const angle = (idx / NAV_ITEMS.length) * Math.PI * 2 + rotationAngleRef
        const x = centerX + Math.cos(angle) * orbitRadius
        const y = centerY + Math.sin(angle) * orbitRadius
        
        newPositions.push({ x, y, labelEn: item.labelEn, labelAr: item.labelAr, route: item.route })

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = 'rgba(74, 140, 255, 0.03)'
        ctx.lineWidth = 0.5
        ctx.stroke()

        const moonRadius = isMobile ? 20 : 24
        const isHovered = hoveredIndex === idx
        drawRealisticMoon(x, y, moonRadius, item.progress, isHovered)
      })
      
      setMoonPositions(newPositions)
    }

    const animate = () => {
      drawScene()
      animationId = requestAnimationFrame(animate)
    }
    
    animate()

    const handleResize = () => setCanvasSize()
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [language, hoveredIndex])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020308] font-nav">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
      
      {/* Moon Click Targets */}
      {moonPositions.map((moon, index) => (
        <button
          key={index}
          onClick={() => router.push(moon.route)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="absolute rounded-full cursor-pointer transition-all duration-300"
          style={{
            left: moon.x - 30,
            top: moon.y - 30,
            width: '60px',
            height: '60px',
            background: 'transparent',
            border: 'none',
            zIndex: 20,
            touchAction: 'manipulation'
          }}
          aria-label={language === 'en' ? moon.labelEn : moon.labelAr}
        />
      ))}
      
      {/* Moon Labels (Only visible on hover) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {moonPositions.map((moon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredIndex === index ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
            className="absolute text-center whitespace-nowrap"
            style={{
              left: moon.x,
              top: moon.y - 45,
              transform: 'translateX(-50%)',
            }}
          >
            <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#d1d5db] font-light">
              {language === 'en' ? moon.labelEn : moon.labelAr}
            </span>
          </motion.div>
        ))}
      </div>
      
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 z-50 px-4 py-1.5 bg-transparent rounded-full text-[#d1d5db] text-xs tracking-widest hover:border-[#4a8cff] hover:text-[#4a8cff] transition-all duration-300 border border-[#d1d5db]/30 backdrop-blur-sm"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Title - Only this text now */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-12 left-0 right-0 text-center z-20 pointer-events-none select-none"
      >
        <h1 className="font-display text-4xl md:text-5xl tracking-[0.15em] text-[#f8f9fa] filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {language === 'en' ? "LILITH'S SPACE" : "فضاء ليليث"}
        </h1>
      </motion.div>
      
    </div>
  )
}
