'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GatewayEntranceProps {
  onEnter: () => void
}

export default function GatewayEntrance({ onEnter }: GatewayEntranceProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleEnter = () => {
    setIsVisible(false)
    setTimeout(onEnter, 1800)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-cosmic-black via-cosmic-navy to-cosmic-black"
        >
          <div className="text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-5xl md:text-7xl font-futuristic bg-gradient-to-r from-white via-cosmic-silver to-cosmic-cyan bg-clip-text text-transparent mb-6"
            >
              LilithsEclipse
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <p className="text-cosmic-silver text-lg md:text-xl italic border-l-4 border-cosmic-cyan pl-6">
                &ldquo;Some souls were never meant to survive the fire — only to be reborn through it.&rdquo;
              </p>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(74, 74, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              className="px-8 py-3 bg-transparent border-2 border-cosmic-cyan text-cosmic-cyan rounded-full text-lg font-futuristic tracking-wider hover:bg-cosmic-cyan hover:text-cosmic-black transition-all duration-300"
            >
              Enter the Eclipse
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
