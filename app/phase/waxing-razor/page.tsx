'use client'
import { useRouter } from 'next/navigation'

export default function PhasePage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#02082a] to-[#010620] flex flex-col items-center justify-center">
      <h1 className="text-4xl text-cyan-400 mb-4">Coming Soon</h1>
      <p className="text-gray-400 mb-8">This cosmic phase is still loading...</p>
      <button 
        onClick={() => router.back()}
        className="text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        ← Back to Space
      </button>
    </div>
  )
}
