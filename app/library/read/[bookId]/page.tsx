'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { masterLibraryData } from '../../data/booksData'

export default function BookInsightsPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  
  const bookId = params.bookId as string
  const book = masterLibraryData[bookId]

  // Fallback for empty or locked items from your upcoming shelves
  if (!book || book.isLocked) {
    return (
      <div className="min-h-screen bg-[#070913] flex flex-col items-center justify-center text-[#f4efe2] font-serif p-6 text-center">
        <div className="text-4xl mb-4 opacity-30">🔒</div>
        <h2 className="text-xl tracking-widest text-[#e6ca95] font-normal uppercase mb-2">
          {language === 'en' ? 'Volume Restrained' : 'المجلد محجوب حالياً'}
        </h2>
        <p className="text-xs text-[#8c826e] max-w-sm italic leading-relaxed">
          {language === 'en' 
            ? 'This structural chronicle remains secured within the vaults. Subject to future archival tracking updates.' 
            : 'هذا السجل البنيوي لا يزال مؤمناً داخل الخزائن. يخضع لتحديثات الأرشفة المستقبلية.'}
        </p>
        <button 
          onClick={() => router.back()} 
          className="mt-8 px-5 py-2 border border-[#b89047]/20 text-[11px] tracking-[0.2em] uppercase text-[#b89047] hover:bg-[#b89047]/10 transition-all duration-300 rounded"
        >
          {language === 'en' ? 'Return to Archives' : 'العودة إلى الأرشيف'}
        </button>
      </div>
    )
  }

  const isAr = language === 'ar'

  return (
    <div className="min-h-screen bg-[#0a0b10] text-[#e3dcce] font-serif relative overflow-y-auto selection:bg-[#b89047]/20 selection:text-[#fff]">
      {/* Ambient soft background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#b89047]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()} 
          className="text-[#8c826e] text-xs tracking-[0.2em] hover:text-[#e6ca95] transition-colors duration-300 mb-16 uppercase flex items-center gap-2"
        >
          ← {language === 'en' ? 'BACK TO SHELF' : 'العودة إلى الرف'}
        </button>

        {/* Exhibition Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Scholarly Card Display */}
          <div className="lg:col-span-1 bg-gradient-to-b from-[#16120e] to-[#0c0a08] border border-[#b89047]/10 p-8 rounded-lg text-center shadow-2xl relative group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,144,71,0.05),transparent_70%)] pointer-events-none" />
            <div className="text-3xl mb-4 filter sepia opacity-40">📜</div>
            <h1 className="text-2xl font-normal text-[#f4efe2] tracking-wide leading-snug">
              {isAr ? book.titleAr : book.titleEn}
            </h1>
            <p className="text-[#b89047] font-sans text-xs uppercase tracking-widest mt-3">
              {isAr ? book.authorAr : book.authorEn}
            </p>
            <div className="w-12 h-[1px] bg-[#b89047]/20 mx-auto mt-6" />
            <p className="text-[10px] text-[#8c826e]/50 italic tracking-wider mt-4 uppercase">
              {language === 'en' ? 'Archival Card № ' : 'بطاقة أرشيفية رقم '} {bookId.slice(0, 5)}
            </p>
          </div>

          {/* Right Column: Insights Vault Content */}
          <div className={`lg:col-span-2 space-y-10 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            
            {/* Summary */}
            <motion.section 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="border-b border-[#b89047]/5 pb-8"
            >
              <h2 className="text-xs tracking-[0.25em] text-[#b89047] uppercase font-sans font-medium mb-3">
                ⚖️ {language === 'en' ? 'Book Compendium Summary' : 'ملخص الكِتاب المكثف'}
              </h2>
              <p className="text-[#c7beaa] text-base md:text-lg font-light leading-relaxed font-serif">
                {isAr ? book.summaryAr : book.summaryEn}
              </p>
            </motion.section>

            {/* Author Background */}
            <motion.section 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="border-b border-[#b89047]/5 pb-8"
            >
              <h2 className="text-xs tracking-[0.25em] text-[#b89047] uppercase font-sans font-medium mb-3">
                ✒️ {language === 'en' ? 'Author Biographical Dossier' : 'الملف البيوغرافي للمؤلف'}
              </h2>
              <p className="text-[#c7beaa]/80 text-sm md:text-base font-light leading-relaxed">
                {isAr ? book.authorInfoAr : book.authorInfoEn}
              </p>
            </motion.section>

            {/* Historical Background */}
            <motion.section 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xs tracking-[0.25em] text-[#b89047] uppercase font-sans font-medium mb-3">
                ⏳ {language === 'en' ? 'Historical Timeline Context' : 'السياق والخلفية التاريخية'}
              </h2>
              <p className="text-[#c7beaa]/80 text-sm md:text-base font-light leading-relaxed italic">
                {isAr ? book.historyAr : book.historyEn}
              </p>
            </motion.section>

          </div>
        </div>

        <footer className="mt-24 pt-8 border-t border-[#b89047]/5 text-center text-[11px] text-[#8c826e]/40 tracking-widest uppercase">
          ✦ {language === 'en' ? 'Liliths Eclipse Library Exhibition' : 'معرض مكتبة كسوف ليليث'} ✦
        </footer>
      </div>
    </div>
  )
}