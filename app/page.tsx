'use client'

import { useState } from 'react'
import GatewayEntrance from '@/components/GatewayEntrance'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [showGateway, setShowGateway] = useState(true)
  const router = useRouter()

  const handleEnter = () => {
    setShowGateway(false)
    router.push('/space')
  }

  if (showGateway) {
    return <GatewayEntrance onEnter={handleEnter} />
  }

  return null
}
