'use client'

import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import LanguageToggle from './LanguageToggle'
import InfoPanel from './InfoPanel'

// Dynamically import 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

export default function CosmicUniverse() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const handlePlanetClick = (section: string) => {
    setActiveSection(section)
    setIsPanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    setTimeout(() => setActiveSection(null), 300)
  }

  return (
    <div className="fixed inset-0 bg-cosmic-black">
      <LanguageToggle />
      
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="text-cosmic-cyan animate-pulse">Loading cosmic dimension...</div>
        </div>
      }>
        <Scene3D onPlanetClick={handlePlanetClick} />
      </Suspense>
      
      <InfoPanel 
        section={activeSection} 
        isOpen={isPanelOpen} 
        onClose={handleClosePanel} 
      />
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cosmic-silver text-sm opacity-60 pointer-events-none">
        ✨ drift among planets — click any to explore ✨
      </div>
    </div>
  )
}
