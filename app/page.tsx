'use client'

import { useState, useEffect } from 'react'
import GatewayEntrance from '@/components/GatewayEntrance'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false)
  const router = useRouter()

  const handleEnter = () => {
    setHasEntered(true)
    // Replace the current history entry instead of pushing
    router.replace('/eclipse-universe')
  }

  // Check if user has already entered
  useEffect(() => {
    const entered = localStorage.getItem('hasEntered')
    if (entered === 'true') {
      setHasEntered(true)
      router.replace('/eclipse-universe')
    }
  }, [])

  if (!hasEntered) {
    return <GatewayEntrance onEnter={handleEnter} />
  }

  return null
}
