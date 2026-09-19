'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function SymbolysPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('alchemy') // Defaulting to alchemy based on your screen layout
  const [selectedSymbol, setSelectedSymbol] = useState(null)

  // 1. ALCHEMICAL SYMBOLS (Updated with Philosopher's Stone, Sulfur, Salt, and core elements)
  const alchemySymbols = [
    { id: "philosophers-stone", nameEn: "Philosopher's Stone", nameAr: "حجر الفلاسفة", symbol: " can-be-represented-as ⚪", meaningEn: "Transmutation, spiritual perfection, immortality", meaningAr: "التحويل الجوهري، الكمال الروحي، الخلود الأبدي", originEn: "Magnum Opus Alchemy", originAr: "العمل العظيم في الخيمياء", color: "from-amber-950/40 to-stone-900/40" },
    { id: "alch-sulfur", nameEn: "Sulfur", nameAr: "الكبريت الخيميائي", symbol: "🜍", meaningEn: "Soul, masculine energy, fire, transformation", meaningAr: "الروح، الطاقة الذكرية، عنصر النار، التحول الداخلي", originEn: "The Tria Prima", originAr: "الثلاثية الأساسية الأولى", color: "from-red-950/30 to-stone-950/40" },
    { id: "alch-mercury", nameEn: "Mercury", nameAr: "الزئبق الخيميائي", symbol: "☿", meaningEn: "Mind, fluidity, communication, adaptability", meaningAr: "العقل الباطن، السيولة، التواصل، القدرة على التكيف", originEn: "The Tria Prima", originAr: "الثلاثية الأساسية الأولى", color: "from-zinc-900/40 to-neutral-900/40" },
    { id: "alch-salt", nameEn: "Salt", nameAr: "الملح الخيميائي", symbol: "🜔", meaningEn: "Body, physical matter, stability, preservation", meaningAr: "الجسد المادي، المادة الأرضية، الاستقرار، الحفظ والتأريض", originEn: "The Tria Prima", originAr: "الثلاثية الأساسية الأولى", color: "from-stone-900/40 to-neutral-950/50" },
    { id: "element-fire", nameEn: "Alchemical Fire", nameAr: "عنصر النار", symbol: "🜂", meaningEn: "Transformation, Passion, Pure drive", meaningAr: "التحول، العاطفة والسرعة، الدافع النقي الأولي", originEn: "Four Elements", originAr: "العناصر الأربعة", color: "from-red-950/20 to-stone-900/30" },
    { id: "element-water", nameEn: "Alchemical Water", nameAr: "عنصر الماء", symbol: "🜄", meaningEn: "Intuition, Fluidity, Deep emotions", meaningAr: "الحدس الباطني، السيولة، المشاعر العميقة والخفية", originEn: "Four Elements", originAr: "العناصر الأربعة", color: "from-blue-950/20 to-neutral-900/30" },
    { id: "element-air", nameEn: "Alchemical Air", nameAr: "عنصر الهواء", symbol: "🜁", meaningEn: "Communication, Intellect, Cosmic breath", meaningAr: "التواصل الفكري، الذكاء، الأنفاس والروح الكونية", originEn: "Four Elements", originAr: "العناصر الأربعة", color: "from-stone-900/30 to-zinc-900/40" },
    { id: "element-earth", nameEn: "Alchemical Earth", nameAr: "عنصر الأرض", symbol: "🜃", meaningEn: "Stability, Grounding, Material foundation", meaningAr: "الاستقرار الثابت، التأريض، الأساس المادي للمادة", originEn: "Four Elements", originAr: "العناصر الأربعة", color: "from-neutral-950/40 to-stone-900/30" }
  ]

  // 2. ELDER FUTHARK RUNES (Complete set parsed from your documentation list)
  const runicSymbols = [
    { id: "rune-fehu", nameEn: "Fehu", nameAr: "رونة فيهو", symbol: "ᚠ", meaningEn: "Wealth, Abundance, Financial success", meaningAr: "الثروة المادية، الوفرة المستمرة، النجاح المالي والعملي", originEn: "Elder Futhark", originAr: "الأبجدية الفوثاركية القديمة", color: "from-amber-950/20 to-stone-950/40" },
    { id: "rune-uruz", nameEn: "Uruz", nameAr: "رونة أوروز", symbol: "ᚢ", meaningEn: "Strength, Power, Primal vitality", meaningAr: "القوة البدنية الشديدة، القدرة، الحيوية الأولية الخام", originEn: "Elder Futhark", originAr: "الأبجدية الفوثاركية القديمة", color: "from-neutral-900/40 to-stone-900/30" },
    { id: "rune-thurisaz", nameEn: "Thurisaz", nameAr: "رونة ثوريساز", symbol: "ᚦ", meaningEn: "Protection, Boundaries, Severe challenges", meaningAr: "الحماية الدفاعية، وضع الحدود الصارمة، التحديات الكبرى", originEn: "Elder Futhark", originAr: "الأبجدية الفوثاركية القديمة", color: "from-stone-950/50 to-neutral-900/40" },
    { id: "rune-ansuz", nameEn: "Ansuz", nameAr: "رونة أنسوز", symbol: "ᚨ", meaningEn: "Divine messages, Higher communication, Wisdom", meaningAr: "الرسائل الإلهية، الاتصال الأعلى، الحكمة الفكرية العميقة", originEn: "Elder Futhark", originAr: "الأبجدية الفوثاركية القديمة", color: "from-neutral-900/30 to-stone-900/30" },
    { id: "rune-raidho", nameEn: "Raidho", nameAr: "رونة رايدهو", symbol: "ᚱ", meaningEn: "Journey, Physical travel, Cosmic destiny", meaningAr: "الرحلة الطويلة، الانتقال المادي، مسار القدر الكوني", originEn: "Elder Futhark", originAr: "الأبجدية الفوثاركية القديمة", color: "from-zinc-900/30 to-stone-950/40" },
    { id: "rune-algiz", nameEn: "Algiz", nameAr: "رونة ألغيز", symbol: "ᛉ", meaningEn: "Protection, Spiritual shield, Higher Guidance", meaningAr: "الحماية العليا، الدرع الروحي، الاتصال بالإرشاد الإلهي", originEn: "Elder Futhark", originAr: "الأبجدية الفوثاركية القديمة", color: "from-stone-900/40 to-neutral-950/50" },
    { id: "rune-dagaz", nameEn: "Dagaz", nameAr: "رونة داغاز", symbol: "ᛞ", meaningEn: "Awakening, Metamorphic transformation, Dawn", meaningAr: "الصحوة الروحية، التحول الجذري الشامل، فجر الوعي", originEn: "Elder Futhark", originAr: "الأبجدية الفوثاركية القديمة", color: "from-neutral-950/50 to-stone-950/40" }
  ]

  // 3. SACRED GEOMETRY MATRICES
  const geometrySymbols = [
    { id: "flower-of-life", nameEn: "Flower of Life", nameAr: "زهرة الحياة", symbol: "❀", meaningEn: "Creation, Unity, Divine blueprint of existence", meaningAr: "الخلق، الوحدة الشاملة، المخطط الإلهي للوجود الكوني", originEn: "Sacred Geometry", originAr: "الهندسة المقدسة", color: "from-stone-900/40 to-neutral-900/30" },
    { id: "seed-of-life", nameEn: "Seed of Life", nameAr: "بذرة الحياة", symbol: "○○•", meaningEn: "New beginnings, Sovereign manifestation", meaningAr: "البدايات الجديدة، التجلي السيادي الواعي للطاقة", originEn: "Sacred Geometry", originAr: "الهندسة المقدسة", color: "from-neutral-950/40 to-stone-900/30" },
    { id: "metatrons-cube", nameEn: "Metatron's Cube", nameAr: "مكعب ميتاترون", symbol: "⬡", meaningEn: "Balance, Protection, Supreme universal order", meaningAr: "التوازن الهيكلي، الحماية، النظام الكوني الأعلى المطلق", originEn: "Complex Geometry", originAr: "الهندسة المعقدة الأثرية", color: "from-amber-950/20 to-zinc-900/40" },
    { id: "vesica-piscis", nameEn: "Vesica Piscis", nameAr: "فيسيكا بيسيس", symbol: "◉", meaningEn: "Divine union, Sacred feminine and masculine integration", meaningAr: "الاتحاد الإلهي، تكامل الأنوثة والذكورة المقدسة الباطنية", originEn: "Ancient Geometry", originAr: "الهندسة القديمة", color: "from-stone-900/30 to-neutral-900/40" }
  ]

  const categories = [
    { id: "alchemy", nameEn: "Alchemical Symbols", nameAr: "الرموز الخيميائية", icon: "⚗️" },
    { id: "runes", nameEn: "Elder Futhark Runes", nameAr: "رونات الفوثارك", icon: "ᚠ" },
    { id: "geometry", nameEn: "Sacred Geometry", nameAr: "الهندسة المقدسة", icon: "⬡" }
  ]

  const getSymbolsByCategory = () => {
    switch(activeCategory) {
      case 'alchemy': return alchemySymbols
      case 'runes': return runicSymbols
      case 'geometry': return geometrySymbols
      default: return alchemySymbols
    }
  }

  const currentSymbols = getSymbolsByCategory()

  return (
    <div className="min-h-screen bg-[#030206] text-stone-300 overflow-hidden relative font-serif selection:bg-amber-900/40 selection:text-amber-200">
      
      {/* Dynamic Starry Matrix Background */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25 bg-[radial-gradient(#4a3118_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-[#050308]" />

      {/* Atmospheric Glow Modules */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-950/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-950/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Interface Controls */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        whileHover={{ opacity: 1, textShadow: "0 0 8px #d97706" }}
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-30 text-stone-400 font-mono transition-all duration-300 text-[10px] uppercase tracking-[0.25em] bg-stone-950/80 backdrop-blur-md px-4 py-2 border border-stone-800/40 rounded-sm"
      >
        ← {language === 'en' ? 'Back to Space' : 'العودة للمساحة'}
      </motion.button>

      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-30 px-4 py-2 bg-stone-950/80 rounded-sm text-stone-400 font-mono text-[10px] tracking-widest hover:text-amber-400 hover:bg-stone-900/60 transition-all duration-300 border border-stone-800/40 backdrop-blur-md"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Title & Brand Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-28 pb-10 relative z-10"
      >
        <div className="flex justify-center gap-3 text-2xl text-amber-600/40 font-light mb-4 select-none">
          <span>🌀</span><span>⚗️</span><span>🕉</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-normal tracking-[0.3em] text-transparent bg-gradient-to-b from-stone-100 via-stone-300 to-stone-600 bg-clip-text uppercase">
          SYMBOLYS
        </h1>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent mx-auto mt-4" />
        <p className="text-stone-500 font-mono text-[9px] tracking-[0.4em] uppercase mt-4">
          {language === 'en' ? 'Sacred Geometry • Alchemy • Esoteric Signs' : 'الهندسة المقدسة • الخيمياء • العلامات الباطنية'}
        </p>
      </motion.div>

      {/* Custom Rounded Pill Pills Navigation (Matches your image aesthetic) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-2.5 pb-4">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              onClick={() => setActiveCategory(cat.id)} 
              className={`px-5 py-2.5 rounded-full text-xs tracking-wider transition-all duration-500 flex items-center gap-2.5 font-sans border ${
                activeCategory === cat.id 
                  ? 'bg-purple-950/20 text-purple-300 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                  : 'bg-stone-950/40 text-stone-400 hover:text-stone-200 hover:bg-stone-900/30 border-stone-800/30'
              }`}
            >
              <span className="opacity-60 font-serif text-sm">{cat.icon}</span> 
              {language === 'en' ? cat.nameEn : cat.nameAr}
            </button>
          ))}
        </div>

        {/* Display System Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <AnimatePresence mode="wait">
            {currentSymbols.map((symbol, idx) => (
              <motion.div
                key={symbol.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: idx * 0.02, duration: 0.3 }}
                whileHover={{ scale: 1.01, borderColor: 'rgba(168, 85, 247, 0.25)' }}
                onClick={() => setSelectedSymbol(symbol)}
                className={`bg-[#0b0813]/60 backdrop-blur-sm border border-stone-900/80 rounded-xl p-8 cursor-pointer transition-all duration-300 text-center relative group overflow-hidden`}
              >
                <div className="text-4xl text-stone-400 group-hover:text-purple-300 transition-colors duration-500 font-light my-4 select-none">
                  {symbol.symbol}
                </div>
                <h3 className="text-stone-200 font-medium tracking-wide text-sm font-sans">
                  {language === 'en' ? symbol.nameEn : symbol.nameAr}
                </h3>
                <p className="text-stone-500 group-hover:text-stone-400 text-[11px] font-sans mt-3 line-clamp-2 h-9 leading-relaxed transition-colors">
                  {language === 'en' ? symbol.meaningEn : symbol.meaningAr}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Medieval Codex Info Box Modal Module */}
      <AnimatePresence>
        {selectedSymbol && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedSymbol(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#09070f] rounded-xl border border-purple-950/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-8 font-sans"
            >
              <button 
                onClick={() => setSelectedSymbol(null)} 
                className="absolute top-5 right-5 text-stone-500 hover:text-stone-300 transition-colors font-mono text-[9px] tracking-widest"
              >
                ✕ CLOSE
              </button>
              
              <div className="text-center mb-6">
                <div className="text-5xl text-purple-200/80 my-4 select-none font-light">{selectedSymbol.symbol}</div>
                <h2 className="text-xl font-normal tracking-wide text-stone-200">
                  {language === 'en' ? selectedSymbol.nameEn : selectedSymbol.nameAr}
                </h2>
                <div className="w-12 h-px bg-purple-900/30 mx-auto my-3" />
              </div>

              <div className="space-y-3.5">
                <div className="bg-stone-950/80 border border-stone-900 p-4 rounded-lg">
                  <p className="text-amber-600/70 text-[9px] uppercase tracking-widest font-mono mb-1">
                    ✦ {language === 'en' ? 'Signification Spectrum' : 'طيف الدلالة والمعنى'}
                  </p>
                  <p className="text-stone-300 text-xs leading-relaxed font-light">
                    {language === 'en' ? selectedSymbol.meaningEn : selectedSymbol.meaningAr}
                  </p>
                </div>

                <div className="bg-stone-950/80 border border-stone-900 p-4 rounded-lg">
                  <p className="text-amber-600/70 text-[9px] uppercase tracking-widest font-mono mb-1">
                    📜 {language === 'en' ? 'Domain Origin' : 'أصل ونطاق الرمز'}
                  </p>
                  <p className="text-stone-400 text-xs font-light">
                    {language === 'en' ? selectedSymbol.originEn : selectedSymbol.originAr}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}