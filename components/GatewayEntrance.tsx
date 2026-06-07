'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

interface GatewayEntranceProps {
  onEnter: () => void
}

export default function GatewayEntrance({ onEnter }: GatewayEntranceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { language, toggleLanguage } = useLanguage()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    setCanvasSize()

    // --- Dynamic Space Objects Config ---
    
    // 1. Static/Twinkling Ambient Stars
    const staticStars: { x: number; y: number; size: number; baseAlpha: number; phase: number; speed: number }[] = []
    for (let i = 0; i < 350; i++) {
      staticStars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.1 + 0.2,
        baseAlpha: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.02
      })
    }

    // 2. Cosmic Background Dust/Nebula Nodes
    const cosmicDust: { x: number; y: number; r: number; color: string }[] = []
    for (let i = 0; i < 8; i++) {
      cosmicDust.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 150 + 100,
        color: Math.random() > 0.5 ? 'rgba(10, 30, 60, 0.15)' : 'rgba(5, 15, 40, 0.2)'
      })
    }

    // 3. Fast Random Background Shooting Stars
    const shootingStars: { x: number; y: number; length: number; speed: number; angle: number; alpha: number; active: boolean }[] = []
    const createShootingStar = () => {
      return {
        x: Math.random() * window.innerWidth * 0.8,
        y: Math.random() * window.innerHeight * 0.4,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 12 + 8,
        angle: Math.PI / 6 + (Math.random() - 0.5) * 0.05, // ~30 degrees downward swoop
        alpha: 0,
        active: true
      }
    }
    
    // Spawn initial ones safely inactive
    for (let i = 0; i < 3; i++) {
      shootingStars.push({ ...createShootingStar(), active: false, alpha: 0 })
    }

    // 4. The Giant Main Hyper-Realistic Comet
    let mainComet = {
      x: window.innerWidth * -0.2,
      y: window.innerHeight * 0.9,
      targetX: window.innerWidth * 0.36,
      targetY: window.innerHeight * 0.48,
      size: 16,
      progress: 0,
      speed: 0.0025, // Sweet smooth cinematic crawl
    }

    // Main Comet Tail Particles
    const tailParticles: { id: number; offsetAngle: number; speed: number; size: number; maxLife: number; life: number; colorType: number }[] = []
    let particleIdCounter = 0

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.016
      const w = window.innerWidth
      const h = window.innerHeight

      // --- RENDER SPACE BACKGROUND (Pitch Black with deep subtle nodes) ---
      ctx.fillStyle = '#010206'
      ctx.fillRect(0, 0, w, h)

      // Draw faint space dust clusters
      cosmicDust.forEach(dust => {
        const gradient = ctx.createRadialGradient(dust.x, dust.y, 0, dust.x, dust.y, dust.r)
        gradient.addColorStop(0, dust.color)
        gradient.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(dust.x, dust.y, dust.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw twinkling dark sky stars
      staticStars.forEach(star => {
        const twinkle = Math.sin(time * star.speed + star.phase) * 0.4 + 0.6
        ctx.fillStyle = `rgba(215, 235, 255, ${star.baseAlpha * twinkle})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // --- ANIMATE & RENDER AMBIENT SHOOTING STARS ---
      if (Math.random() < 0.015) {
        const slot = shootingStars.find(s => !s.active)
        if (slot) Object.assign(slot, createShootingStar())
      }

      shootingStars.forEach(star => {
        if (!star.active) return

        // Update positions
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed
        
        if (star.alpha < 1) star.alpha += 0.08 // Fade in quickly

        // Out of boundaries checkout
        if (star.x > w || star.y > h) {
          star.active = false
        }

        // Draw trail stroke line
        const grad = ctx.createLinearGradient(
          star.x, star.y, 
          star.x - Math.cos(star.angle) * star.length, 
          star.y - Math.sin(star.angle) * star.length
        )
        grad.addColorStop(0, `rgba(160, 220, 255, ${star.alpha * 0.7})`)
        grad.addColorStop(0.2, `rgba(100, 180, 240, ${star.alpha * 0.4})`)
        grad.addColorStop(1, 'rgba(100, 180, 240, 0)')

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x - Math.cos(star.angle) * star.length, star.y - Math.sin(star.angle) * star.length)
        ctx.stroke()
      })

      // --- ANIMATE & RENDER THE ICONIC MAIN COMET METEOR ---
      
      // Calculate current position based on an elegant cinematic interpolation
      if (mainComet.progress < 1) {
        mainComet.progress += mainComet.speed
      } else {
        // Soft loop initialization if it flies away completely over time
        mainComet.progress = 0
      }

      // Exact trajectory match: sweeping up from bottom-left towards the title
      const currentX = w * -0.1 + (w * 0.46) * mainComet.progress
      const currentY = h * 0.85 - (h * 0.45) * mainComet.progress
      const angleOfAttack = Math.atan2(-0.45 * h, 0.46 * w) // Path trajectory vector direction

      // Generate trailing sparks actively
      for (let i = 0; i < 4; i++) {
        tailParticles.push({
          id: particleIdCounter++,
          offsetAngle: angleOfAttack + Math.PI + (Math.random() - 0.5) * 0.28,
          speed: Math.random() * 4 + 1.5,
          size: Math.random() * 3.5 + 0.8,
          maxLife: Math.random() * 45 + 25,
          life: 0,
          colorType: Math.random()
        })
      }

      // Render tail particles drifting outwards
      for (let i = tailParticles.length - 1; i >= 0; i--) {
        const p = tailParticles[i]
        p.life++

        if (p.life >= p.maxLife) {
          tailParticles.splice(i, 1)
          continue
        }

        const lifeRatio = p.life / p.maxLife
        const currentParticleX = currentX + Math.cos(p.offsetAngle) * p.speed * p.life
        const currentParticleY = currentY + Math.sin(p.offsetAngle) * p.speed * p.life
        const opacity = (1 - lifeRatio) * 0.6

        let color = `rgba(140, 215, 255, ${opacity})` // Cyan frost
        if (p.colorType > 0.75) color = `rgba(240, 180, 110, ${opacity * 0.8})` // Fiery warm spark accent
        if (p.colorType < 0.15) color = `rgba(255, 255, 255, ${opacity})` // Pure Core hot white

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(currentParticleX, currentParticleY, p.size * (1 - lifeRatio * 0.5), 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw Comet Head Energy Glow Layers
      const headGlow = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, mainComet.size * 3.5)
      headGlow.addColorStop(0, 'rgba(255, 255, 255, 1)')
      headGlow.addColorStop(0.2, 'rgba(160, 230, 255, 0.8)')
      headGlow.addColorStop(0.5, 'rgba(50, 140, 240, 0.35)')
      headGlow.addColorStop(1, 'rgba(0,0,0,0)')
      
      ctx.fillStyle = headGlow
      ctx.beginPath()
      ctx.arc(currentX, currentY, mainComet.size * 3.5, 0, Math.PI * 2)
      ctx.fill()

      // Hyper-bright crystal core
      ctx.fillStyle = '#ffffff'
      ctx.shadowBlur = 20
      ctx.shadowColor = '#90e0ff'
      ctx.beginPath()
      ctx.arc(currentX, currentY, mainComet.size * 0.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0 // Reset

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const content = {
    en: {
      titleLine1: "Lilith",
      titleLine2: "Eclipse",
      quote: "Some souls were never meant to survive the fire",
      quote2: "...only to be reborn through it.",
      button: "ENTER THE ECLIPSE"
    },
    ar: {
      titleLine1: "ليليث",
      titleLine2: "إكليبس",
      quote: "بعض الأرواح لم يكن مقدراً لها أن تنجو من النار",
      quote2: "...فقط لتولد من جديد من خلاله.",
      button: "ادخل إلى الكسوف"
    }
  }

  const c = content[language]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#010206] overflow-hidden select-none">
      {/* High-Performance Interactive Night Sky Canvas Context */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 z-50 px-4 py-2 bg-cyan-500/10 rounded-full text-cyan-400 text-sm hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/20 backdrop-blur-sm"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Hero Layout Content Block (Asymmetric Right Alignment matched perfectly) */}
      <div className="w-full md:w-1/2 lg:w-[53%] text-left px-8 md:px-14 lg:px-24 relative z-10 flex flex-col items-start justify-center mt-4">
        
        {/* Title Typographic Stack with Layered Soft Cosmic Glow */}
        <div className="mb-4 font-sans">
          <motion.h1
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="text-7xl md:text-8xl lg:text-[108px] font-bold tracking-normal leading-[0.95] text-white"
            style={{
              textShadow: '0 0 30px rgba(170, 225, 255, 0.4), 0 0 60px rgba(170, 225, 255, 0.15)'
            }}
          >
            {c.titleLine1}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, delay: 0.15, ease: "easeOut" }}
            className="text-7xl md:text-8xl lg:text-[108px] font-bold tracking-normal leading-[1.05] text-cyan-300/90"
            style={{
              textShadow: '0 0 35px rgba(34, 211, 238, 0.45), 0 0 70px rgba(34, 211, 238, 0.2)'
            }}
          >
            {c.titleLine2}
          </motion.h1>
        </div>
        
        {/* Subtitle Quotes Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mb-12 text-left max-w-[600px]"
        >
          <p className="text-gray-300 text-lg md:text-xl font-light italic tracking-wide leading-relaxed">
            &ldquo;{c.quote}&rdquo;
          </p>
          <p className="text-cyan-400 text-base md:text-lg font-medium italic tracking-wider mt-3 pl-12 md:pl-16">
            {c.quote2}
          </p>
        </motion.div>
        
        {/* Dynamic Interactive Call To Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(34, 211, 238, 0.15)' }}
          whileTap={{ scale: 0.99 }}
          onClick={onEnter}
          className="flex items-center gap-4 px-10 py-3.5 bg-transparent border border-cyan-500/30 rounded-full text-cyan-300 text-sm md:text-base tracking-[0.25em] font-light hover:bg-cyan-500/5 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
        >
          <span className="text-xs text-cyan-400/80">✦</span>
          {c.button}
          <span className="text-xs text-cyan-400/80">✦</span>
        </motion.button>
      </div>

      {/* Tiny Ambient Explore Metric Badge */}
      <div className="absolute bottom-6 right-8 flex flex-col items-center gap-1 opacity-20 pointer-events-none text-[10px] tracking-[0.3em] text-cyan-400">
        <div className="w-[1px] h-6 bg-cyan-400 mb-1" />
        EXPLORE
      </div>

      {/* Absolute Bottom-Left Corner Brand Initials */}
      <div className="absolute bottom-6 left-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 text-xs font-mono pointer-events-none">
        N
      </div>
    </div>
  )
}