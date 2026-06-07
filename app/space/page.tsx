'use client'

import { useEffect } from 'react'
import CosmicUniverse from '@/components/CosmicUniverse'

export default function SpacePage() {
  useEffect(() => {
    localStorage.setItem('hasEnteredUniverse', 'true')
  }, [])

  return <CosmicUniverse />
}
