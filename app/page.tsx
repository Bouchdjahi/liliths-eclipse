'use client'

import { useState, useEffect } from 'react'
import GatewayEntrance from '@/components/GatewayEntrance'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [showGateway, setShowGateway] = useState(true)
  const router = useRouter()

  // Check if user has already entered
  useEffect(() => {
    const hasEntered = localStorage.getItem('hasEnteredUniverse')
    if (hasEntered === 'true') {
      setShowGateway(false)
      router.replace('/space')
    }
  }, [])

  const handleEnter = () => {
    setShowGateway(false)
    localStorage.setItem('hasEnteredUniverse', 'true')
    router.push('/space')
  }

  if (showGateway) {
    return <GatewayEntrance onEnter={handleEnter} />
  }

  return null
}
