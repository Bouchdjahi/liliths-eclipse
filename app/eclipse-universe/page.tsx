'use client'

import { useEffect } from 'react'
import CosmicUniverse from '@/components/CosmicUniverse'

export default function EclipseUniversePage() {
  // Save that user has entered
  useEffect(() => {
    localStorage.setItem('hasEntered', 'true')
  }, [])

  return <CosmicUniverse />
}
