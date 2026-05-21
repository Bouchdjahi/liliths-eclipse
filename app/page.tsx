'use client'

import { useState, useEffect } from 'react'
import GatewayEntrance from '@/components/GatewayEntrance'
import CosmicUniverse from '@/components/CosmicUniverse'

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    // Check if user has already entered (optional localStorage)
    const entered = localStorage.getItem('lilithsEclipseEntered')
    if (entered === 'true') {
      setHasEntered(true)
    }
  }, [])

  const handleEnter = () => {
    setHasEntered(true)
    localStorage.setItem('lilithsEclipseEntered', 'true')
  }

  if (!hasEntered) {
    return <GatewayEntrance onEnter={handleEnter} />
  }

  return <CosmicUniverse />
}
