'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function ChakrasPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState('chakras')
  const [selectedChakra, setSelectedChakra] = useState(null)

  // 7 Chakras Data
  const chakras = [
    { id: "crown", nameEn: "Crown Chakra", nameAr: "شاكرا التاج", sanskrit: "Sahasrara", locationEn: "Top of head", locationAr: "أعلى الرأس", element: "Cosmic Energy", color: "#C084FC", colorName: "Violet/White", quoteEn: "I understand", quoteAr: "أنا أفهم", meaningEn: "Spiritual connection, higher consciousness", meaningAr: "الاتصال الروحي، الوعي الأعلى", balancedEn: "Peace, spiritual awareness, sense of unity", balancedAr: "السلام، الوعي الروحي، الشعور بالوحدة", blockedEn: "Disconnection, lack of purpose, spiritual confusion", blockedAr: "الانفصال، عدم وجود هدف، الارتباك الروحي", healingEn: "Silence meditation, prayer, connection with universe", healingAr: "تأمل الصمت، الصلاة، الاتصال بالكون", affirmationEn: "I am connected to all that is.", affirmationAr: "أنا متصل بكل ما هو كائن.", bg: "from-purple-950/40 to-slate-950/60", border: "border-purple-500/20", glow: "shadow-[0_0_20px_rgba(192,132,252,0.4)]", text: "text-purple-300" },
    { id: "third-eye", nameEn: "Third Eye Chakra", nameAr: "شاكرا العين الثالثة", sanskrit: "Ajna", locationEn: "Between eyebrows", locationAr: "بين الحاجبين", element: "Light", color: "#6366F1", colorName: "Indigo", quoteEn: "I see", quoteAr: "أنا أرى", meaningEn: "Intuition, perception, inner vision", meaningAr: "الحدس، الإدراك، الرؤية الداخلية", balancedEn: "Strong intuition, mental clarity, insight", balancedAr: "حدس قوي، وضوح عقلي، بصيرة", blockedEn: "Confusion, lack of direction, overthinking", blockedAr: "الارتباك، عدم وجود اتجاه، التفكير الزائد", healingEn: "Meditation, dream journaling, reducing mental noise", healingAr: "التأمل، تدوين الأحلام، تقليل الضوضاء الذهنية", affirmationEn: "I trust my inner wisdom.", affirmationAr: "أنا أثق بحكمتي الداخلية.", bg: "from-indigo-950/40 to-slate-950/60", border: "border-indigo-500/20", glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)]", text: "text-indigo-300" },
    { id: "throat", nameEn: "Throat Chakra", nameAr: "شاكرا الحلق", sanskrit: "Vishuddha", locationEn: "Throat", locationAr: "الحلق", element: "Sound", color: "#38BDF8", colorName: "Blue", quoteEn: "I talk", quoteAr: "أنا أتحدث", meaningEn: "Communication, truth, expression", meaningAr: "التواصل، الحقيقة، التعبير", balancedEn: "Clear communication, authentic expression", balancedAr: "تواصل واضح، تعبير أصيل", blockedEn: "Fear of speaking, suppressed truth, social anxiety", blockedAr: "الخوف من التحدث، الحقيقة المكبوتة، القلق الاجتماعي", healingEn: "Singing, journaling, speaking truth", healingAr: "الغناء، التدوين، قول الحقيقة", affirmationEn: "I speak my truth with clarity.", affirmationAr: "أتحدث بحقيقتي بوضوح.", bg: "from-sky-950/40 to-slate-950/60", border: "border-sky-500/20", glow: "shadow-[0_0_20px_rgba(56,189,248,0.4)]", text: "text-sky-300" },
    { id: "heart", nameEn: "Heart Chakra", nameAr: "شاكرا القلب", sanskrit: "Anahata", locationEn: "Chest center", locationAr: "وسط الصدر", element: "Air", color: "#34D399", colorName: "Green", quoteEn: "I love", quoteAr: "أنا أحب", meaningEn: "Love, compassion, connection", meaningAr: "الحب، الرحمة، الاتصال", balancedEn: "Emotional harmony, healthy relationships, forgiveness", balancedAr: "الانسجام العاطفي، العلاقات الصحية، التسامح", blockedEn: "Emotional pain, heartbreak, difficulty trusting", blockedAr: "الألم العاطفي، انكسار القلب، صعوبة الثقة", healingEn: "Gratitude practice, forgiveness work, nature connection", healingAr: "ممارسة الامتنان، عمل التسامح، الاتصال بالطبيعة", affirmationEn: "I give and receive love freely.", affirmationAr: "أعطي وأستقبل الحب بحرية.", bg: "from-emerald-950/40 to-slate-950/60", border: "border-emerald-500/20", glow: "shadow-[0_0_20px_rgba(52,211,153,0.4)]", text: "text-emerald-300" },
    { id: "solar-plexus", nameEn: "Solar Plexus Chakra", nameAr: "شاكرا الضفيرة الشمسية", sanskrit: "Manipura", locationEn: "Stomach area", locationAr: "منطقة المعدة", element: "Fire", color: "#FBBF24", colorName: "Yellow", quoteEn: "I do", quoteAr: "أنا أفعل", meaningEn: "Power, confidence, identity", meaningAr: "القوة، الثقة، الهوية", balancedEn: "Self-confidence, strong will, motivation", balancedAr: "الثقة بالنفس، الإرادة القوية، الدافع", blockedEn: "Low self-esteem, control issues, fear of rejection", blockedAr: "تدني احترام الذات، مشاكل السيطرة، الخوف من الرفض", healingEn: "Sun exposure, core workouts", healingAr: "التعرض لأشعة الشمس، تمارين البطن", affirmationEn: "I am powerful.", affirmationAr: "أنا قوي.", bg: "from-amber-950/40 to-slate-950/60", border: "border-amber-500/20", glow: "shadow-[0_0_20px_rgba(251,191,36,0.4)]", text: "text-amber-300" },
    { id: "sacral", nameEn: "Sacral Chakra", nameAr: "شاكرا العجز", sanskrit: "Svadhisthana", locationEn: "Lower abdomen", locationAr: "أسفل البطن", element: "Water", color: "#FB923C", colorName: "Orange", quoteEn: "I feel", quoteAr: "أنا أشعر", meaningEn: "Emotion, pleasure, creativity, sexuality", meaningAr: "العاطفة، المتعة، الإبداع، الجنسانية", balancedEn: "Emotional flow, creativity, healthy relationships", balancedAr: "التدفق العاطفي، الإبداع، العلاقات الصحية", blockedEn: "Emotional suppression, guilt, creative block", blockedAr: "القمع العاطفي، الذنب، الانسداد الإبداعي", healingEn: "Dancing, water therapy (swimming, baths), creative arts", healingAr: "الرقص، العلاج المائي (السباحة، الحمامات)، الفنون الإبداعية", affirmationEn: "I allow myself to feel.", affirmationAr: "أسمح لنفسي بالشعور.", bg: "from-orange-950/40 to-slate-950/60", border: "border-orange-500/20", glow: "shadow-[0_0_20px_rgba(251,146,60,0.4)]", text: "text-orange-300" },
    { id: "root", nameEn: "Root Chakra", nameAr: "شاكرا الجذر", sanskrit: "Muladhara", locationEn: "Base of spine", locationAr: "قاعدة العمود الفقري", element: "Earth", color: "#F87171", colorName: "Red", quoteEn: "I am", quoteAr: "أنا أكون", meaningEn: "Survival, safety, grounding, stability", meaningAr: "البقاء، الأمان، التجذير، الاستقرار", balancedEn: "Feeling safe, financial stability, strong grounding", balancedAr: "الشعور بالأمان، الاستقرار المالي، تجذير قوي", blockedEn: "Anxiety, fear of survival, financial stress, feeling unstable", blockedAr: "القلق، الخوف من البقاء، الضغط المالي، الشعور بعدم الاستقرار", healingEn: "Walking barefoot, red foods (beets, tomatoes), physical exercise", healingAr: "المشي حافي القدمين، الأطعمة الحمراء (البنجر، الطماطم)، التمارين الرياضية", affirmationEn: "I am safe.", affirmationAr: "أنا آمن.", bg: "from-red-950/40 to-slate-950/60", border: "border-red-500/20", glow: "shadow-[0_0_20px_rgba(248,113,113,0.4)]", text: "text-red-300" }
  ]

  // Aura Layers
  const auraLayers = [
    { id: "physical", nameEn: "Physical Layer", nameAr: "الطبقة الجسدية", descEn: "Health, fatigue, physical sensations", descAr: "الصحة، التعب، الأحاسيس الجسدية", color: "from-red-950/40 to-slate-950/60" },
    { id: "emotional", nameEn: "Emotional Layer", nameAr: "الطبقة العاطفية", descEn: "Feelings and emotional patterns. Reacts strongly to stress or love.", descAr: "المشاعر والأنماط العاطفية. تتفاعل بقوة مع التوتر أو الحب.", color: "from-orange-950/40 to-slate-950/60" },
    { id: "mental", nameEn: "Mental Layer", nameAr: "الطبقة العقلية", descEn: "Thoughts, beliefs, mindset. Overthinking creates turbulence here.", descAr: "الأفكار، المعتقدات، العقلية. الإفراط في التفكير يخلق اضطرابًا هنا.", color: "from-amber-950/40 to-slate-950/60" },
    { id: "astral", nameEn: "Astral Layer", nameAr: "الطبقة النجمية", descEn: "Love, relationships, connection energy. Sensitive to bonds and attachments.", descAr: "الحب، العلاقات، طاقة الاتصال. حساسة للروابط والارتباطات.", color: "from-emerald-950/40 to-slate-950/60" },
    { id: "spiritual", nameEn: "Spiritual Layer", nameAr: "الطبقة الروحية", descEn: "Higher consciousness. Intuition, purpose, divine connection.", descAr: "الوعي الأعلى. الحدس، الهدف، الاتصال الإلهي.", color: "from-sky-950/40 to-slate-950/60" }
  ]

  // Energy Healing Methods
  const healingMethods = [
    { id: "meditation", nameEn: "🧘 Meditation", nameAr: "🧘 التأمل", descEn: "Clears mental noise, aligns chakras naturally", descAr: "يزيل الضوضاء الذهنية، يوازن الشاكرات بشكل طبيعي" },
    { id: "breathwork", nameEn: "🌬️ Breathwork", nameAr: "🌬️ تمارين التنفس", descEn: "Moves stuck energy, activates nervous system balance", descAr: "يحريك الطاقة العالقة، ينشط توازن الجهاز العصبي" },
    { id: "yoga", nameEn: "🧘‍♀️ Yoga", nameAr: "🧘‍♀️ اليوغا", descEn: "Opens energy channels, aligns body and chakras", descAr: "يفتح قنوات الطاقة، يوازن الجسم والشاكرات" },
    { id: "sound-healing", nameEn: "🎶 Sound Healing", nameAr: "🎶 الشفاء بالصوت", descEn: "Frequencies like 432Hz / 528Hz. Tuning forks, singing bowls", descAr: "ترددات مثل 432Hz / 528Hz. شوكات رنين، أوتار الغناء" },
    { id: "crystals", nameEn: "💎 Crystals", nameAr: "💎 البلورات", descEn: "Amethyst (intuition), Rose quartz (heart healing), Black tourmaline (protection)", descAr: "الجمشت (الحدس)، الكوارتز الوردي (شفاء القلب)، التورمالين الأسود (الحماية)" },
    { id: "nature", nameEn: "🌿 Nature Grounding", nameAr: "🌿 التجذير في الطبيعة", descEn: "Forest walks, barefoot on earth, sunlight exposure", descAr: "المشي في الغابة، حافي القدمين على الأرض، التعرض لأشعة الشمس" }
  ]

  // Frequency Concept
  const frequencies = [
    { level: "Low Frequency", levelAr: "تردد منخفض", emotions: "Fear, anger, sadness", emotionsAr: "الخوف، الغضب، الحزن", color: "from-red-950/50 to-slate-950/60" },
    { level: "Medium Frequency", levelAr: "تردد متوسط", emotions: "Neutrality, stability", emotionsAr: "الحياد، الاستقرار", color: "from-amber-950/50 to-slate-950/60" },
    { level: "High Frequency", levelAr: "تردد عالي", emotions: "Love, peace, awareness", emotionsAr: "الحب، السلام، الوعي", color: "from-emerald-950/50 to-slate-950/60" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010416] via-[#020722] to-[#00020d] overflow-hidden relative font-sans text-slate-100">
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{ left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', width: Math.random() * 1.5 + 0.5 + 'px', height: Math.random() * 1.5 + 0.5 + 'px', backgroundColor: 'rgba(160, 190, 255, ' + (Math.random() * 0.4 + 0.1) + ')', animation: 'twinkle ' + (Math.random() * 3 + 2) + 's ease-in-out infinite' }} />
        ))}
      </div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-30 text-cyan-400/50 hover:text-cyan-400 hover:scale-105 transition-all duration-300 flex items-center gap-2 text-xs font-medium tracking-[0.15em] bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/10"
      >
        ← {language === 'en' ? '← ← ← ← BACK TO ECLIPSE' : 'العودة إلى الفضاء'}
      </motion.button>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-30 px-4 py-2 bg-cyan-950/40 rounded-full text-cyan-400 text-xs tracking-wider hover:bg-cyan-900/40 transition-all duration-300 border border-cyan-500/20 backdrop-blur-md"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-16 pb-8 relative z-10 mx-4"
      >
        <div className="flex justify-center gap-2 md:gap-4 mb-4 text-sm md:text-base opacity-80 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
          {chakras.map(c => <span key={c.id} style={{ color: c.color }}>✦</span>)}
        </div>
        <h1 className="text-2xl md:text-4xl font-light tracking-[0.25em] text-transparent bg-gradient-to-r from-slate-200 via-cyan-300 to-slate-400 bg-clip-text font-serif">
          {language === 'en' ? 'CHAKRAS & ENERGY SYSTEM' : 'الشاكرات ونظام الطاقة'}
        </h1>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mx-auto mt-4" />
        <p className="text-cyan-500/40 text-[10px] tracking-[0.35em] mt-3 uppercase">
          {language === 'en' ? 'The Subtle Body • Energy Centers • Aura' : 'الجسم الدقيق • مراكز الطاقة • الهالة'}
        </p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-2">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button onClick={() => setActiveTab('chakras')} className={`px-5 py-2.5 rounded-full text-xs tracking-wider transition-all duration-300 backdrop-blur-sm ${activeTab === 'chakras' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]' : 'bg-slate-950/40 text-slate-400 border border-slate-800/50 hover:bg-slate-900/40 hover:text-slate-200'}`}>{language === 'en' ? '✨ 7 Chakras Diagram' : '✨ مخطط الشاكرات السبع'}</button>
          <button onClick={() => setActiveTab('aura')} className={`px-5 py-2.5 rounded-full text-xs tracking-wider transition-all duration-300 backdrop-blur-sm ${activeTab === 'aura' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]' : 'bg-slate-950/40 text-slate-400 border border-slate-800/50 hover:bg-slate-900/40 hover:text-slate-200'}`}>{language === 'en' ? '🌫️ Aura Layers' : '🌫️ طبقات الهالة'}</button>
          <button onClick={() => setActiveTab('healing')} className={`px-5 py-2.5 rounded-full text-xs tracking-wider transition-all duration-300 backdrop-blur-sm ${activeTab === 'healing' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]' : 'bg-slate-950/40 text-slate-400 border border-slate-800/50 hover:bg-slate-900/40 hover:text-slate-200'}`}>{language === 'en' ? '🌿 Healing Methods' : '🌿 طرق الشفاء'}</button>
          <button onClick={() => setActiveTab('frequency')} className={`px-5 py-2.5 rounded-full text-xs tracking-wider transition-all duration-300 backdrop-blur-sm ${activeTab === 'frequency' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]' : 'bg-slate-950/40 text-slate-400 border border-slate-800/50 hover:bg-slate-900/40 hover:text-slate-200'}`}>{language === 'en' ? '🌌 Frequency' : '🌌 التردد'}</button>
        </div>

        {/* 7 Chakras Section - Interactive Aligned Energy Node Layout */}
        {activeTab === 'chakras' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-4xl mx-auto py-4">
            
            {/* Visual Column: Alignment System */}
            <div className="relative flex flex-col items-center justify-between h-[620px] w-24 py-6">
              {/* Spine Energy Alignment Filament */}
              <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-emerald-500 to-red-500 opacity-40 shadow-[0_0_8px_rgba(6,182,212,0.3)]" />
              
              {/* Chakra Portal Orbs */}
              {chakras.map((chakra, idx) => (
                <motion.div
                  key={chakra.id}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setSelectedChakra(chakra)}
                  className={`w-10 h-10 rounded-full z-10 cursor-pointer flex items-center justify-center bg-slate-950 border border-white/20 transition-all duration-500 ${chakra.glow}`}
                  style={{ borderColor: chakra.color }}
                >
                  <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: chakra.color }} />
                </motion.div>
              ))}
            </div>

            {/* Information Column: Direct Alignment Text Cards */}
            <div className="flex-1 w-full flex flex-col justify-between h-auto lg:h-[620px] gap-4 lg:gap-0">
              {chakras.map((chakra, idx) => (
                <motion.div
                  key={chakra.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: language === 'en' ? 6 : -6 }}
                  onClick={() => setSelectedChakra(chakra)}
                  className={`bg-gradient-to-r ${chakra.bg} rounded-xl p-3 border ${chakra.border} hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between group`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full hidden sm:block" style={{ backgroundColor: chakra.color }} />
                    <div>
                      <h3 className="text-sm font-medium text-slate-200 tracking-wide group-hover:text-cyan-300 transition-colors">
                        {language === 'en' ? chakra.nameEn : chakra.nameAr}
                        <span className="text-[11px] font-normal text-slate-500 mx-2 font-serif italic">({chakra.sanskrit})</span>
                      </h3>
                      <p className="text-slate-400 text-xs mt-0.5 line-clamp-1 max-w-md">
                        {language === 'en' ? chakra.meaningEn : chakra.meaningAr}
                      </p>
                    </div>
                  </div>
                  <div className="text-right whitespace-nowrap px-2">
                    <span className="text-[11px] font-serif tracking-wider font-light text-slate-400 italic block">
                      "{language === 'en' ? chakra.quoteEn : chakra.quoteAr}"
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500">
                      {language === 'en' ? chakra.locationEn : chakra.locationAr}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        )}

        {/* Aura Layers Section */}
        {activeTab === 'aura' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-950/20 to-slate-950/60 rounded-2xl p-6 border border-cyan-500/10 mb-6 text-center lg:text-left">
              <h2 className="text-xl font-light text-cyan-300 tracking-wide mb-2">{language === 'en' ? 'The Aura (Energy Field)' : 'الهالة (مجال الطاقة)'}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{language === 'en' ? 'The aura is the subtle electromagnetic-like field enveloping the body. It shifts dynamically, mirrors your psychological blueprint, mental constructs, and immediate health state.' : 'الهالة هي المجال الشبيه بالكهرومغناطيسي المحيط بالجسم. إنها تتغير ديناميكياً وتعكس حالتك العاطفية، العقلية، والصحية.'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {auraLayers.map((layer) => (
                <div key={layer.id} className={`bg-gradient-to-br ${layer.color} rounded-xl p-5 border border-slate-800/60 hover:border-slate-700 transition-all`}>
                  <h3 className="text-sm font-medium text-slate-200 tracking-wide">{language === 'en' ? layer.nameEn : layer.nameAr}</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">{language === 'en' ? layer.descEn : layer.descAr}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-gradient-to-br from-amber-950/20 to-slate-950/60 rounded-xl p-5 border border-amber-500/10">
              <h3 className="text-amber-400 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">⚡ {language === 'en' ? 'Aura Blockage Indicators' : 'علامات انسداد الهالة'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-400 text-xs">
                <span className="flex items-center gap-2">✦ {language === 'en' ? 'Feeling instantly drained around toxic environments' : 'الشعور بالإرهاق الفوري في البيئات السامة'}</span>
                <span className="flex items-center gap-2">✦ {language === 'en' ? 'Sensory and emotional hypersensitivity overload' : 'الحمل الحسي والعاطفي الزائد'}</span>
                <span className="flex items-center gap-2">✦ {language === 'en' ? 'Persistent psychic confusion or heavy mental fog' : 'الارتباك النفسي المستمر أو الضباب العقلي الكثيف'}</span>
                <span className="flex items-center gap-2">✦ {language === 'en' ? 'Inexplicable lack of foundational drive and inspiration' : 'نقص غير مبرر في الحافز الأساسي والإلهام'}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Healing Methods Section */}
        {activeTab === 'healing' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {healingMethods.map((method) => (
              <div key={method.id} className="bg-gradient-to-br from-slate-900/30 to-slate-950/60 rounded-xl p-5 border border-slate-800/60 hover:border-slate-700 transition-all">
                <h3 className="text-sm font-medium text-slate-300 tracking-wide">{language === 'en' ? method.nameEn : method.nameAr}</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">{language === 'en' ? method.descEn : method.descAr}</p>
              </div>
            ))}
            <div className="bg-gradient-to-br from-purple-950/20 to-slate-950/60 rounded-xl p-5 border border-purple-500/10 col-span-full mt-2">
              <h3 className="text-purple-400 text-xs uppercase tracking-widest mb-3">🧭 {language === 'en' ? 'Daily Energy Alignment Integration' : 'روتين بسيط ومستمر لمحاذاة الطاقة'}</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-slate-400 text-xs text-center">
                <div className="p-2 bg-slate-950/40 rounded-lg border border-slate-800/40">🌬️ <p className="mt-1">{language === 'en' ? 'Conscious Breath (5m)' : 'تنفس واعي (5 د)'}</p></div>
                <div className="p-2 bg-slate-950/40 rounded-lg border border-slate-800/40">🦶 <p className="mt-1">{language === 'en' ? 'Earth Grounding' : 'اتصال بالأرض'}</p></div>
                <div className="p-2 bg-slate-950/40 rounded-lg border border-slate-800/40">💭 <p className="mt-1">{language === 'en' ? 'Shadow Audit' : 'مراقبة المشاعر'}</p></div>
                <div className="p-2 bg-slate-950/40 rounded-lg border border-slate-800/40">🧘 <p className="mt-1">{language === 'en' ? 'Stillness Meditation' : 'تأمل الصمت'}</p></div>
                <div className="p-2 bg-slate-950/40 rounded-lg border border-slate-800/40">✨ <p className="mt-1">{language === 'en' ? 'Focus Intention' : 'تحديد النية الإرادية'}</p></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Frequency Concept Section */}
        {activeTab === 'frequency' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/40 via-slate-950/60 to-slate-900/40 rounded-2xl p-6 border border-slate-800/60 text-center">
              <p className="text-slate-400 italic text-sm font-serif">"{language === 'en' ? 'Everything in the universe vibrates at a specific subtle frequency.' : 'كل شيء في الكون يهتز بتردد دقيق ومعين.'}"</p>
              <p className="text-cyan-400/80 text-xs tracking-wide mt-3">{language === 'en' ? 'Elevating your blueprint vibration = structuring somatic, emotional, and thought patterns into dynamic coherence' : 'رفع التردد = إعادة تنظيم الأنماط الجسدية والعاطفية والفكرية في انسجام وتناغم تام'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {frequencies.map((freq) => (
                <div key={freq.level} className={`bg-gradient-to-br ${freq.color} rounded-xl p-5 border border-slate-800/40 text-center hover:border-slate-700 transition-all`}>
                  <h3 className="text-sm font-medium text-slate-200 tracking-wider">{language === 'en' ? freq.level : freq.levelAr}</h3>
                  <p className="text-slate-400 text-xs mt-2 italic">{language === 'en' ? freq.emotions : freq.emotionsAr}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Chakra Detail Modal Component */}
      <AnimatePresence>
        {selectedChakra && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4" onClick={() => setSelectedChakra(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 15 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#040924] to-[#010312] rounded-2xl border border-cyan-500/20 shadow-2xl p-6 md:p-8">
              <button onClick={() => setSelectedChakra(null)} className="absolute top-5 right-5 text-slate-500 hover:text-slate-200 text-xl transition-colors">✕</button>
              
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center border mb-3" style={{ borderColor: selectedChakra.color, boxShadow: `0 0 15px ${selectedChakra.color}40` }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedChakra.color }} />
                </div>
                <h2 className="text-2xl font-light text-slate-200 tracking-wide">{language === 'en' ? selectedChakra.nameEn : selectedChakra.nameAr}</h2>
                <p className="text-xs text-slate-500 font-serif mt-1 italic">{selectedChakra.sanskrit} • {selectedChakra.colorName}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-900"><p className="text-cyan-400/80 text-[10px] uppercase tracking-wider mb-1">📍 {language === 'en' ? 'Vessel Location & Element' : 'الموقع والعنصر في الجسد'}</p><p className="text-slate-300 text-xs leading-relaxed">{language === 'en' ? selectedChakra.locationEn : selectedChakra.locationAr} • {selectedChakra.element}</p></div>
                <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-900"><p className="text-emerald-400/80 text-[10px] uppercase tracking-wider mb-1">⚖️ {language === 'en' ? 'Coherent Balanced Integration' : 'حالة الاتزان والتناغم الأثيري'}</p><p className="text-slate-300 text-xs leading-relaxed">{language === 'en' ? selectedChakra.balancedEn : selectedChakra.balancedAr}</p></div>
                <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-900"><p className="text-red-400/80 text-[10px] uppercase tracking-wider mb-1">🚫 {language === 'en' ? 'Distorted / Blocked Indicators' : 'علامات عدم الاتزان والانسداد الطاقي'}</p><p className="text-slate-300 text-xs leading-relaxed">{language === 'en' ? selectedChakra.blockedEn : selectedChakra.blockedAr}</p></div>
                <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-900"><p className="text-purple-400/80 text-[10px] uppercase tracking-wider mb-1">🌿 {language === 'en' ? 'Alignment Remedies' : 'طرق وممارسات إعادة المحاذاة والشفاء'}</p><p className="text-slate-300 text-xs leading-relaxed">{language === 'en' ? selectedChakra.healingEn : selectedChakra.healingAr}</p></div>
                <div className="bg-gradient-to-r from-slate-950 via-cyan-950/20 to-slate-950 rounded-xl p-4 border border-cyan-500/10 text-center"><p className="text-cyan-400 text-[10px] uppercase tracking-wider mb-1">✨ {language === 'en' ? 'Somatic Affirmation' : 'التوكيد النفسي والجسدي'}</p><p className="text-slate-200 text-xs italic font-serif">"{language === 'en' ? selectedChakra.affirmationEn : selectedChakra.affirmationAr}"</p></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.6; } }
      `}</style>
    </div>
  )
}