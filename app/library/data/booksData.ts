'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { masterLibraryData } from '@/app/library/data/booksData'

export default function BookReaderPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  
  const bookId = params?.bookId as string
  const book = masterLibraryData ? masterLibraryData[bookId] : null

  if (!book) {
    return (
      <div className="min-h-screen bg-[#070913] text-[#f4efe2] flex flex-col items-center justify-center font-serif p-6">
        <p className="text-sm tracking-widest opacity-60 mb-4">ARCHIVAL RECORD NOT LOCATED</p>
        <button 
          onClick={() => router.push('/library')}
          className="text-xs tracking-widest uppercase px-4 py-2 border border-[#b89047]/30 text-[#e6ca95]"
        >
          Return to Vault
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070913] text-[#f4efe2] relative selection:bg-[#b89047]/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(24,17,30,0.4),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <button
          onClick={() => router.push('/library')}
          className="text-xs tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity font-serif mb-12 block"
        >
          ← CLOSE COMPENDIUM
        </button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#b89047] font-serif block mb-2">
            {language === 'en' ? 'Archival Insights' : 'رؤى أرشيفية متقدمة'}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#e6ca95] mb-2 leading-tight">
            {language === 'en' ? book.titleEn : book.titleAr}
          </h1>
          <p className="text-sm italic text-[#c7beaa]/60 font-serif mb-8">
            {language === 'en' ? `By ${book.authorEn}` : `بقلم ${book.authorAr}`}
          </p>

          <div className="w-full h-[1px] bg-gradient-to-r from-[#b89047]/20 via-transparent to-transparent mb-10" />

          <div className="space-y-10 font-sans text-sm md:text-base leading-relaxed text-[#c7beaa]/90 font-light">
            <section className="bg-white/[0.01] border border-white/5 rounded-lg p-6 md:p-8">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#e6ca95] font-serif mb-4">
                {language === 'en' ? 'Core Synthesis' : 'الخلاصة الجوهرية'}
              </h2>
              <p>{language === 'en' ? book.summaryEn : book.summaryAr}</p>
            </section>

            <section className="p-2">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#e6ca95] font-serif mb-3">
                {language === 'en' ? 'Biographical Context' : 'السياق السير الذاتي'}
              </h2>
              <p className="italic opacity-80">{language === 'en' ? book.authorInfoEn : book.authorInfoAr}</p>
            </section>

            <section className="p-2">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#e6ca95] font-serif mb-3">
                {language === 'en' ? 'Historical Timeline' : 'السجل التاريخي والمنشأ'}
              </h2>
              <p className="opacity-80">{language === 'en' ? book.historyEn : book.historyAr}</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}