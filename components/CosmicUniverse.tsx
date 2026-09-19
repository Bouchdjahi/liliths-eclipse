'use client'

import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

export default function CosmicUniverse() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#03040a' }}>
      <Scene3D />
    </div>
  )
}