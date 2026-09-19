'use client'

import { useState } from 'react'

export default function LanguageToggle() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="absolute top-6 right-6 z-50 px-4 py-1.5 bg-transparent rounded-full text-[#d1d5db] text-xs tracking-widest hover:border-[#4a8cff] hover:text-[#4a8cff] transition-all duration-300 border border-[#d1d5db]/30 backdrop-blur-sm"
    >
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  )
}