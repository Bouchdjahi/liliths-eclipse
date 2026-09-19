'use client'

interface InfoPanelProps {
  section: string | null
  isOpen: boolean
  onClose: () => void
}

export default function InfoPanel({ section, isOpen, onClose }: InfoPanelProps) {
  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative z-50 bg-[#080a14] border border-[#4a8cff]/20 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8892a0] hover:text-[#4a8cff] transition-colors text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        
        <h2 className="font-display text-2xl text-[#f8f9fa] tracking-wider mb-4 capitalize">
          {section || 'Section'}
        </h2>
        
        <div className="w-16 h-[1px] bg-gradient-to-r from-[#4a8cff] to-transparent mb-6" />
        
        <p className="text-[#8892a0] text-sm leading-relaxed">
          Content coming soon. Explore this section to discover more about {section}.
        </p>
      </div>
    </div>
  )
}