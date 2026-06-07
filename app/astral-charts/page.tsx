'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function AstralCharts() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState('zodiac')
  const [selectedItem, setSelectedItem] = useState<any>(null)

  // Zodiac Signs with deepened colors
  const zodiacSigns = [
    { id: "aries", nameAr: "الحمل", nameEn: "Aries", symbol: "♈", element: "fire", dateEn: "Mar 21 - Apr 19", dateAr: "21 مارس - 19 أبريل", traitsEn: "Passion, courage, impulsiveness, leadership", traitsAr: "شغف، شجاعة، اندفاع، قيادة", energy: "اندفاع، شغف، قيادة، قوة داخلية", color: "from-red-950/40 via-red-900/20 to-orange-950/30", glow: "hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:border-red-500/40" },
    { id: "taurus", nameAr: "الثور", nameEn: "Taurus", symbol: "♉", element: "earth", dateEn: "Apr 20 - May 20", dateAr: "20 أبريل - 20 مايو", traitsEn: "Stability, loyalty, sensuality, patience", traitsAr: "استقرار، ولاء، حسية، صبر", energy: "استقرار، واقعية، بناء، صبر", color: "from-green-950/40 via-emerald-950/20 to-teal-950/30", glow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:border-emerald-500/40" },
    { id: "gemini", nameAr: "الجوزاء", nameEn: "Gemini", symbol: "♊", element: "air", dateEn: "May 21 - Jun 20", dateAr: "21 مايو - 20 يونيو", traitsEn: "Curiosity, adaptability, communication", traitsAr: "فضول، تكيف، تواصل", energy: "عقل، تواصل، أفكار، تحليل", color: "from-amber-950/40 via-yellow-950/20 to-orange-950/30", glow: "hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:border-amber-500/40" },
    { id: "cancer", nameAr: "السرطان", nameEn: "Cancer", symbol: "♋", element: "water", dateEn: "Jun 21 - Jul 22", dateAr: "21 يونيو - 22 يوليو", traitsEn: "Emotional, intuitive, protective, nurturing", traitsAr: "عاطفي، حدسي، حامي، مغذي", energy: "عاطفة، حدس، عمق نفسي، حساسية", color: "from-blue-950/40 via-cyan-950/20 to-indigo-950/30", glow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] hover:border-blue-500/40" },
    { id: "leo", nameAr: "الأسد", nameEn: "Leo", symbol: "♌", element: "fire", dateEn: "Jul 23 - Aug 22", dateAr: "23 يوليو - 22 أغسطس", traitsEn: "Confident, creative, generous, dramatic", traitsAr: "واثق، مبدع، كريم، درامي", energy: "اندفاع، شغف، قيادة، قوة داخلية", color: "from-orange-950/40 via-red-950/20 to-amber-950/30", glow: "hover:shadow-[0_0_15px_rgba(249,115,22,0.25)] hover:border-orange-500/40" },
    { id: "virgo", nameAr: "العذراء", nameEn: "Virgo", symbol: "♍", element: "earth", dateEn: "Aug 23 - Sep 22", dateAr: "23 أغسطس - 22 سبتمبر", traitsEn: "Analytical, practical, meticulous, helpful", traitsAr: "تحليلي، عملي، دقيق، مفيد", energy: "استقرار، واقعية، بناء، صبر", color: "from-amber-950/30 via-stone-900/40 to-yellow-950/20", glow: "hover:shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:border-purple-400/40" },
    { id: "libra", nameAr: "الميزان", nameEn: "Libra", symbol: "♎", element: "air", dateEn: "Sep 23 - Oct 22", dateAr: "23 سبتمبر - 22 أكتوبر", traitsEn: "Diplomatic, social, fair, idealistic", traitsAr: "دبلوماسي، اجتماعي، عادل، مثالي", energy: "عقل، تواصل، أفكار، اجتماعية", color: "from-pink-950/40 via-fuchsia-950/20 to-purple-950/30", glow: "hover:shadow-[0_0_15px_rgba(236,72,153,0.25)] hover:border-pink-500/40" },
    { id: "scorpio", nameAr: "العقرب", nameEn: "Scorpio", symbol: "♏", element: "water", dateEn: "Oct 23 - Nov 21", dateAr: "23 أكتوبر - 21 نوفمبر", traitsEn: "Passionate, intense, secretive, transformative", traitsAr: "شغوف، مكثف، سري، متحول", energy: "عاطفة، حدس، عمق نفسي، حساسية", color: "from-purple-950/50 via-indigo-950/30 to-black", glow: "hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:border-purple-500/50" },
    { id: "sagittarius", nameAr: "القوس", nameEn: "Sagittarius", symbol: "♐", element: "fire", dateEn: "Nov 22 - Dec 21", dateAr: "22 نوفمبر - 21 ديسمبر", traitsEn: "Adventurous, optimistic, philosophical", traitsAr: "مغامر، متفائل، فلسفي", energy: "اندفاع، شغف، قيادة، رغبة في الحركة", color: "from-orange-950/40 via-yellow-950/20 to-red-950/30", glow: "hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:border-amber-500/40" },
    { id: "capricorn", nameAr: "الجدي", nameEn: "Capricorn", symbol: "♑", element: "earth", dateEn: "Dec 22 - Jan 19", dateAr: "22 ديسمبر - 19 يناير", traitsEn: "Disciplined, responsible, ambitious, patient", traitsAr: "منضبط، مسؤول، طموح، صبور", energy: "استقرار، واقعية، بناء، إنجاز", color: "from-slate-900/60 via-zinc-900/40 to-black", glow: "hover:shadow-[0_0_15px_rgba(148,163,184,0.25)] hover:border-slate-400/40" },
    { id: "aquarius", nameAr: "الدلو", nameEn: "Aquarius", symbol: "♒", element: "air", dateEn: "Jan 20 - Feb 18", dateAr: "20 يناير - 18 فبراير", traitsEn: "Innovative, humanitarian, independent", traitsAr: "مبتكر، إنساني، مستقل", energy: "عقل، تواصل، أفكار، حرية فكرية", color: "from-cyan-950/40 via-blue-950/20 to-indigo-950/30", glow: "hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:border-cyan-500/40" },
    { id: "pisces", nameAr: "الحوت", nameEn: "Pisces", symbol: "♓", element: "water", dateEn: "Feb 19 - Mar 20", dateAr: "19 فبراير - 20 مارس", traitsEn: "Compassionate, artistic, intuitive, dreamy", traitsAr: "رحيم، فني، حدسي، حالم", energy: "عاطفة، حدس، عمق نفسي، عالم داخلي", color: "from-indigo-950/40 via-purple-950/20 to-slate-950/30", glow: "hover:shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:border-indigo-500/40" }
  ]

  // Planets and meanings
  const planets = [
    { id: "sun", nameAr: "الشمس", nameEn: "Sun", symbol: "☀️", meaningAr: "الهوية، الجوهر، الإرادة، الوعي الأساسي", meaningEn: "Identity, essence, will, basic consciousness", color: "from-amber-950/40 to-orange-950/30", glow: "hover:border-amber-500/40" },
    { id: "moon", nameAr: "القمر", nameEn: "Moon", symbol: "🌙", meaningAr: "المشاعر، اللاوعي، الأمان الداخلي، الطفولة النفسية", meaningEn: "Emotions, subconscious, inner security, inner child", color: "from-slate-900/50 to-blue-950/30", glow: "hover:border-blue-400/40" },
    { id: "mercury", nameAr: "عطارد", nameEn: "Mercury", symbol: "☿", meaningAr: "العقل، التفكير، التواصل، اللغة", meaningEn: "Mind, thinking, communication, language", color: "from-yellow-950/30 to-amber-950/30", glow: "hover:border-yellow-500/40" },
    { id: "venus", nameAr: "الزهرة", nameEn: "Venus", symbol: "♀", meaningAr: "الحب، الجمال، العلاقات، الذوق، القيم", meaningEn: "Love, beauty, relationships, taste, values", color: "from-rose-950/40 to-pink-950/30", glow: "hover:border-pink-500/40" },
    { id: "mars", nameAr: "المريخ", nameEn: "Mars", symbol: "♂", meaningAr: "الطاقة، الغضب، الشجاعة، الدافع، الرغبة", meaningEn: "Energy, anger, courage, drive, desire", color: "from-red-950/40 to-orange-950/30", glow: "hover:border-red-500/40" },
    { id: "jupiter", nameAr: "المشتري", nameEn: "Jupiter", symbol: "♃", meaningAr: "التوسع، الحظ، الإيمان، الحكمة، النمو", meaningEn: "Expansion, luck, faith, wisdom, growth", color: "from-blue-950/40 to-cyan-950/30", glow: "hover:border-cyan-500/40" },
    { id: "saturn", nameAr: "زحل", nameEn: "Saturn", symbol: "♄", meaningAr: "الدروس، القيود، النضج، المسؤولية، الزمن", meaningEn: "Lessons, limitations, maturity, responsibility, time", color: "from-neutral-900/60 to-slate-950/40", glow: "hover:border-slate-500/40" },
    { id: "uranus", nameAr: "أورانوس", nameEn: "Uranus", symbol: "♅", meaningAr: "التغيير، الثورة، الحرية، الصدمات المفاجئة", meaningEn: "Change, revolution, freedom, sudden shocks", color: "from-cyan-950/40 to-teal-950/30", glow: "hover:border-teal-500/40" },
    { id: "neptune", nameAr: "نبتون", nameEn: "Neptune", symbol: "♆", meaningAr: "الروحانية، الأحلام، الخيال، الذوبان، الغموض", meaningEn: "Spirituality, dreams, imagination, dissolution, mystery", color: "from-purple-950/40 to-indigo-950/30", glow: "hover:border-indigo-500/40" },
    { id: "pluto", nameAr: "بلوتو", nameEn: "Pluto", symbol: "♇", meaningAr: "التحول العميق، الموت الرمزي، القوة الخفية، التجدد", meaningEn: "Deep transformation, symbolic death, hidden power, renewal", color: "from-purple-950/50 to-stone-950/50", glow: "hover:border-purple-600/50" }
  ]

  // Asteroids and points
  const asteroids = [
    { id: "lilith", nameAr: "ليليث", nameEn: "Lilith (Black Moon)", symbol: "⚶", meaningAr: "الجانب المتمرد والمقموع، الرغبات المكبوتة، القوة الأنثوية غير الخاضعة، الظل النفسي", meaningEn: "Rebellious and repressed side, suppressed desires, unsubmissive feminine power, psychological shadow", color: "from-purple-950/60 via-fuchsia-950/30 to-black", glow: "hover:border-purple-500/60 shadow-[0_0_10px_rgba(168,85,247,0.1)]" },
    { id: "ceres", nameAr: "سيريس", nameEn: "Ceres", symbol: "⚳", meaningAr: "الرعاية، الأمومة، العطاء، التغذية", meaningEn: "Care, motherhood, giving, nourishment", color: "from-green-950/40 to-emerald-950/30", glow: "hover:border-emerald-500/40" },
    { id: "pallas", nameAr: "بالاس", nameEn: "Pallas", symbol: "⚴", meaningAr: "الحكمة، الاستراتيجية، الذكاء التحليلي", meaningEn: "Wisdom, strategy, analytical intelligence", color: "from-blue-950/40 to-slate-950/30", glow: "hover:border-blue-500/40" },
    { id: "vesta", nameAr: "فيستا", nameEn: "Vesta", symbol: "⚵", meaningAr: "التركيز، الالتزام، الطقوس الداخلية", meaningEn: "Focus, commitment, inner rituals", color: "from-orange-950/40 to-stone-950/30", glow: "hover:border-amber-500/40" },
    { id: "chiron", nameAr: "تشيرون", nameEn: "Chiron", symbol: "⚷", meaningAr: "الجراح الداخلية + الشفاء العميق", meaningEn: "Inner wounds + deep healing", color: "from-yellow-950/40 to-amber-950/30", glow: "hover:border-yellow-500/40" }
  ]

  // Lunar Nodes
  const lunarNodes = [
    { id: "north-node", nameAr: "العقدة الشمالية", nameEn: "North Node", symbol: "☊", meaningAr: "الاتجاه الروحي والتطور المستقبلي", meaningEn: "Spiritual direction and future development", color: "from-cyan-950/40 to-blue-950/30", glow: "hover:border-cyan-500/40" },
    { id: "south-node", nameAr: "العقدة الجنوبية", nameEn: "South Node", symbol: "☋", meaningAr: "الماضي، العادات، الكارما القديمة", meaningEn: "Past, habits, old karma", color: "from-neutral-900/60 to-slate-950/40", glow: "hover:border-slate-400/40" }
  ]

  // Houses
  const houses = [
    { id: "house1", number: "I", nameAr: "البيت الأول", nameEn: "1st House", meaningAr: "الذات والبداية، المظهر الخارجي، الهوية", meaningEn: "Self and beginning, external appearance, identity", color: "from-red-950/30 to-black", glow: "hover:border-red-500/30" },
    { id: "house2", number: "II", nameAr: "البيت الثاني", nameEn: "2nd House", meaningAr: "المال والقيم، الموارد، الذاتية", meaningEn: "Money and values, resources, self-worth", color: "from-green-950/30 to-black", glow: "hover:border-green-500/30" },
    { id: "house3", number: "III", nameAr: "البيت الثالث", nameEn: "3rd House", meaningAr: "التواصل والتعلم، الإخوة، البيئة القريبة", meaningEn: "Communication and learning, siblings, immediate environment", color: "from-amber-950/30 to-black", glow: "hover:border-amber-500/30" },
    { id: "house4", number: "IV", nameAr: "البيت الرابع", nameEn: "4th House", meaningAr: "الجذور والعائلة، المنزل، الأمان العاطفي", meaningEn: "Roots and family, home, emotional security", color: "from-blue-950/30 to-black", glow: "hover:border-blue-500/30" },
    { id: "house5", number: "V", nameAr: "البيت الخامس", nameEn: "5th House", meaningAr: "الحب والإبداع، الأطفال، التعبير الذاتي", meaningEn: "Love and creativity, children, self-expression", color: "from-pink-950/30 to-black", glow: "hover:border-pink-500/30" },
    { id: "house6", number: "VI", nameAr: "البيت السادس", nameEn: "6th House", meaningAr: "الصحة والعمل اليومي، الخدمة، الروتين", meaningEn: "Health and daily work, service, routine", color: "from-stone-900/40 to-black", glow: "hover:border-purple-500/30" },
    { id: "house7", number: "VII", nameAr: "البيت السابع", nameEn: "7th House", meaningAr: "العلاقات والشراكات، الزواج، العدالة", meaningEn: "Relationships and partnerships, marriage, justice", color: "from-cyan-950/30 to-black", glow: "hover:border-cyan-500/30" },
    { id: "house8", number: "VIII", nameAr: "البيت الثامن", nameEn: "8th House", meaningAr: "التحول، الأسرار، الطاقة العميقة، الميراث", meaningEn: "Transformation, secrets, deep energy, inheritance", color: "from-purple-950/40 to-black", glow: "hover:border-purple-500/40 shadow-[0_0_12px_rgba(147,51,234,0.15)]" },
    { id: "house9", number: "IX", nameAr: "البيت التاسع", nameEn: "9th House", meaningAr: "السفر، الفلسفة، المعرفة العليا، المعتقدات", meaningEn: "Travel, philosophy, higher knowledge, beliefs", color: "from-orange-950/30 to-black", glow: "hover:border-orange-500/30" },
    { id: "house10", number: "X", nameAr: "البيت العاشر", nameEn: "10th House", meaningAr: "المهنة والسمعة، المكانة الاجتماعية، الهدف", meaningEn: "Career and reputation, social status, purpose", color: "from-red-950/30 to-black", glow: "hover:border-rose-500/30" },
    { id: "house11", number: "XI", nameAr: "البيت الحادي عشر", nameEn: "11th House", meaningAr: "الأصدقاء والأحلام، المجموعات، الأهداف الجماعية", meaningEn: "Friends and dreams, groups, collective goals", color: "from-indigo-950/30 to-black", glow: "hover:border-indigo-500/30" },
    { id: "house12", number: "XII", nameAr: "البيت الثاني عشر", nameEn: "12th House", meaningAr: "اللاوعي والعزلة والروحانية، الأحلام", meaningEn: "Subconscious, isolation, spirituality, dreams", color: "from-violet-950/40 to-black", glow: "hover:border-violet-500/40 shadow-[0_0_10px_rgba(139,92,246,0.1)]" }
  ]

  // Aspects
  const aspects = [
    { id: "conjunction", nameAr: "اقتران", nameEn: "Conjunction", symbol: "☌", meaningAr: "دمج طاقة قوية، توحد الكواكب", meaningEn: "Strong energy merging, planets unite", angle: "180°C", color: "from-slate-900/60 to-neutral-950/50", glow: "hover:border-slate-400/40" },
    { id: "square", nameAr: "تربيع", nameEn: "Square", symbol: "□", meaningAr: "توتر وصراع داخلي، تحديات للنمو", meaningEn: "Tension and internal conflict, challenges for growth", angle: "90°", color: "from-red-950/40 to-black", glow: "hover:border-red-500/40" },
    { id: "opposition", nameAr: "مقابلة", nameEn: "Opposition", symbol: "☍", meaningAr: "شد وجذب، توازن بين قطبين", meaningEn: "Pull and push, balance between two poles", angle: "180°", color: "from-blue-950/40 to-black", glow: "hover:border-blue-500/40" },
    { id: "trine", nameAr: "تثليث", nameEn: "Trine", symbol: "△", meaningAr: "انسجام طبيعي، تدفق سلس للطاقة", meaningEn: "Natural harmony, smooth energy flow", angle: "120°", color: "from-emerald-950/40 to-black", glow: "hover:border-emerald-500/40" },
    { id: "sextile", nameAr: "تسديس", nameEn: "Sextile", symbol: "⚹", meaningAr: "فرص وتوازن، إمكانيات إيجابية", meaningEn: "Opportunities and balance, positive potentials", angle: "60°", color: "from-amber-950/40 to-black", glow: "hover:border-amber-500/40" }
  ]

  const renderContent = () => {
    switch(activeTab) {
      case 'zodiac':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {zodiacSigns.map((sign, idx) => (
              <motion.div
                key={sign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => setSelectedItem({ ...sign, type: 'zodiac' })}
                className={`bg-gradient-to-br ${sign.color} bg-black/40 backdrop-blur-md rounded-xl p-5 border border-purple-950/40 transition-all duration-300 cursor-pointer ${sign.glow}`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">{sign.symbol}</div>
                  <h3 className="text-stone-200 font-light text-lg tracking-wide">{language === 'en' ? sign.nameEn : sign.nameAr}</h3>
                  <p className="text-purple-400/50 text-[10px] mt-1 font-mono">{language === 'en' ? sign.dateEn : sign.dateAr}</p>
                  <div className="mt-3 inline-block px-2.5 py-0.5 bg-black/40 border border-purple-500/20 rounded-full text-stone-300 text-[10px] uppercase tracking-wider">
                    {language === 'en' ? sign.element : (sign.element === 'fire' ? 'ناري' : sign.element === 'earth' ? 'ترابي' : sign.element === 'air' ? 'هوائي' : 'مائي')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )
      case 'planets':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planets.map((planet, idx) => (
              <motion.div
                key={planet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedItem({ ...planet, type: 'planet' })}
                className={`bg-gradient-to-br ${planet.color} bg-black/50 backdrop-blur-md rounded-xl p-5 border border-purple-950/30 transition-all duration-300 cursor-pointer ${planet.glow}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">{planet.symbol}</div>
                  <div>
                    <h3 className="text-stone-100 font-light tracking-wide text-lg">{language === 'en' ? planet.nameEn : planet.nameAr}</h3>
                    <p className="text-stone-400 text-xs line-clamp-2 mt-1 leading-relaxed">
                      {language === 'en' ? planet.meaningEn : planet.meaningAr}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )
      case 'asteroids':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...asteroids, ...lunarNodes].map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedItem({ ...item, type: 'asteroid' })}
                className={`bg-gradient-to-br ${item.color} bg-black/50 backdrop-blur-md rounded-xl p-5 border border-purple-950/30 transition-all duration-300 cursor-pointer ${item.glow}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl text-purple-300/80">{item.symbol}</div>
                  <div>
                    <h3 className="text-stone-100 font-light tracking-wide text-lg">{language === 'en' ? item.nameEn : item.nameAr}</h3>
                    <p className="text-stone-400 text-xs line-clamp-2 mt-1 leading-relaxed">
                      {language === 'en' ? item.meaningEn : item.meaningAr}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )
      case 'houses':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {houses.map((house, idx) => (
              <motion.div
                key={house.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedItem({ ...house, type: 'house' })}
                className={`bg-gradient-to-br ${house.color} bg-black/60 backdrop-blur-md rounded-xl p-4 border border-purple-950/40 transition-all duration-300 cursor-pointer text-center ${house.glow}`}
              >
                <div className="text-2xl font-mono tracking-widest text-purple-400/80 font-light">{house.number}</div>
                <h3 className="text-stone-200 text-sm mt-1.5 tracking-wide">{language === 'en' ? house.nameEn : house.nameAr}</h3>
                <p className="text-stone-500 text-[11px] mt-1.5 line-clamp-2 leading-tight">
                  {language === 'en' ? house.meaningEn : house.meaningAr}
                </p>
              </motion.div>
            ))}
          </div>
        )
      case 'aspects':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aspects.map((aspect, idx) => (
              <motion.div
                key={aspect.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedItem({ ...aspect, type: 'aspect' })}
                className={`bg-gradient-to-br ${aspect.color} bg-black/50 backdrop-blur-md rounded-xl p-5 border border-purple-950/30 transition-all duration-300 cursor-pointer ${aspect.glow}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-stone-100 font-light tracking-wide text-lg">{language === 'en' ? aspect.nameEn : aspect.nameAr}</h3>
                    <p className="text-purple-400 text-xs font-mono mt-0.5">{aspect.symbol} • {aspect.angle}</p>
                  </div>
                  <div className="text-3xl text-stone-400/40">{aspect.symbol}</div>
                </div>
                <p className="text-stone-400 text-xs mt-3 leading-relaxed">
                  {language === 'en' ? aspect.meaningEn : aspect.meaningAr}
                </p>
              </motion.div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020514] via-[#050a24] to-[#01030d] overflow-hidden relative font-sans selection:bg-purple-500/30 text-stone-200">
      
      {/* Deep Celestial Stars Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              width: Math.random() * 1.5 + 0.5 + 'px',
              height: Math.random() * 1.5 + 0.5 + 'px',
              boxShadow: '0 0 4px rgba(255,255,255,0.8)',
              animation: 'twinkle ' + (Math.random() * 3 + 2) + 's ease-in-out infinite'
            }}
          />
        ))}
      </div>

      {/* Navigation & Controls */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-30 text-stone-400/60 hover:text-purple-300 transition-all duration-300 flex items-center gap-2 text-xs tracking-[0.2em] bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-purple-950/50"
      >
        ← {language === 'en' ? 'RETURN TO VOID' : 'العودة إلى الفراغ'}
      </motion.button>

      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-30 px-4 py-2 bg-purple-950/40 text-purple-300 text-xs tracking-widest rounded-full hover:bg-purple-900/40 transition-all duration-300 border border-purple-500/20 backdrop-blur-md font-mono"
      >
        {language === 'en' ? 'العربية' : 'ENGLISH'}
      </button>

      {/* Main Celestial Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-20 pb-10 relative z-10"
      >
        <div className="text-4xl mb-4 animate-float opacity-70 filter drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]">🔮</div>
        <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-transparent bg-gradient-to-b from-stone-100 via-purple-300 to-stone-400 bg-clip-text font-serif">
          {language === 'en' ? 'ASTRAL CHARTS' : 'الخرائط الفلكية'}
        </h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mx-auto mt-4" />
        <p className="text-purple-400/40 text-[10px] tracking-[0.35em] mt-3 uppercase">
          {language === 'en' ? 'Geometric blueprints of cosmic energy' : 'البصمة الهندسية للطاقة الكونية'}
        </p>
      </motion.div>

      {/* Interface Tabs */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 bg-black/20 backdrop-blur-sm p-2 rounded-full max-w-3xl mx-auto border border-purple-950/20">
          {[
            { id: 'zodiac', labelEn: 'Zodiac Signs', labelAr: 'الأبراج', icon: '♈' },
            { id: 'planets', labelEn: 'Planets', labelAr: 'الكواكب', icon: '🪐' },
            { id: 'asteroids', labelEn: 'Asteroids', labelAr: 'الكويكبات', icon: '⚶' },
            { id: 'houses', labelEn: 'Houses', labelAr: 'البيوت', icon: '🏠' },
            { id: 'aspects', labelEn: 'Aspects', labelAr: 'الزوايا', icon: '📐' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-purple-950/60 text-purple-200 border border-purple-500/30 shadow-[0_0_10px_rgba(147,51,234,0.15)]'
                  : 'text-stone-400/70 hover:text-stone-200 hover:bg-purple-950/20'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{language === 'en' ? tab.labelEn : tab.labelAr}</span>
            </button>
          ))}
        </div>

        {renderContent()}
      </div>

      {/* Astral Detail Overlay View */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#0b0617] to-[#02040f] rounded-2xl border border-purple-500/20 shadow-2xl p-7"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 text-stone-500 hover:text-stone-300 transition-colors text-xl font-light"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="text-5xl mb-3 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                  {selectedItem.symbol || (selectedItem.type === 'house' ? '🏠' : '⭐')}
                </div>
                <h2 className="text-2xl font-light tracking-wide text-transparent bg-gradient-to-r from-stone-200 via-purple-300 to-stone-200 bg-clip-text">
                  {language === 'en' ? selectedItem.nameEn : selectedItem.nameAr}
                </h2>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mx-auto my-3" />
              </div>

              {selectedItem.type === 'zodiac' && (
                <div className="space-y-3.5">
                  <div className="bg-black/40 rounded-xl p-4 border border-purple-950/40">
                    <p className="text-purple-400 text-xs tracking-widest uppercase mb-1 font-mono">📅 {language === 'en' ? 'Alignment Period' : 'فترة المحاذاة'}</p>
                    <p className="text-stone-200 font-light text-sm">{language === 'en' ? selectedItem.dateEn : selectedItem.dateAr}</p>
                  </div>
                  <div className="bg-black/40 rounded-xl p-4 border border-purple-950/40">
                    <p className="text-purple-400 text-xs tracking-widest uppercase mb-1 font-mono">⚡ {language === 'en' ? 'Archetypal Traits' : 'السمات البدائية'}</p>
                    <p className="text-stone-300 text-sm leading-relaxed">{language === 'en' ? selectedItem.traitsEn : selectedItem.traitsAr}</p>
                    <p className="text-purple-300/70 text-xs mt-3 border-t border-purple-950/40 pt-2.5 leading-relaxed">{selectedItem.energy}</p>
                  </div>
                </div>
              )}

              {(selectedItem.type === 'planet' || selectedItem.type === 'asteroid' || selectedItem.type === 'house') && (
                <div className="bg-black/40 rounded-xl p-4 border border-purple-950/40">
                  <p className="text-purple-400 text-xs tracking-widest uppercase mb-1 font-mono">🪐 {language === 'en' ? 'Astrological Manifestation' : 'المظهر الفلكي'}</p>
                  <p className="text-stone-300 text-sm leading-relaxed font-light">{language === 'en' ? selectedItem.meaningEn : selectedItem.meaningAr}</p>
                </div>
              )}

              {selectedItem.type === 'aspect' && (
                <div className="space-y-3.5">
                  <div className="bg-black/40 rounded-xl p-4 border border-purple-950/40">
                    <p className="text-purple-400 text-xs tracking-widest uppercase mb-1 font-mono">📐 {language === 'en' ? 'Geometric Angle' : 'الزاوية الهندسية'}</p>
                    <p className="text-stone-200 font-mono text-sm">{selectedItem.angle}</p>
                  </div>
                  <div className="bg-black/40 rounded-xl p-4 border border-purple-950/40">
                    <p className="text-purple-400 text-xs tracking-widest uppercase mb-1 font-mono">✨ {language === 'en' ? 'Energetic Resonance' : 'الرنين الطاقي'}</p>
                    <p className="text-stone-300 text-sm leading-relaxed">{language === 'en' ? selectedItem.meaningEn : selectedItem.meaningAr}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle { 
          0%, 100% { opacity: 0.1; transform: scale(0.9); } 
          50% { opacity: 0.8; transform: scale(1.1); } 
        }
        @keyframes float { 
          0%, 100% { transform: translateY(0px) rotate(0deg); } 
          50% { transform: translateY(-6px) rotate(2deg); } 
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
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