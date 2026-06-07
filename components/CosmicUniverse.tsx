'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const EclipseSequence = dynamic(() => import('./EclipseSequence'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-[#02082a]">
      <div className="text-cyan-400 animate-pulse text-xl tracking-wider">Loading Lilith's Space...</div>
    </div>
  )
})

export default function CosmicUniverse() {
  return (
    <div className="fixed inset-0 bg-[#02082a]">
      <EclipseSequence />
    </div>
  )
}