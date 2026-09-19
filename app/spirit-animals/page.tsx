'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function SpiritAnimalsPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState('guide')
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Complete A-Z Spirit Animals Encyclopedia
  const spiritAnimals = [
    // A
    { id: "eagle", nameEn: "Eagle", nameAr: "النسر", symbol: "🦅", element: "Air", type: "Spirit Guide", coreEn: "Vision, higher perspective, spiritual awakening", coreAr: "الرؤية، المنظور الأعلى، الصحوة الروحية", spiritEn: "Rising above problems, clarity, destiny direction", spiritAr: "الارتفاع فوق المشاكل، الوضوح، اتجاه القدر", powerEn: "Leadership, sharp perception, independence", powerAr: "القيادة، الإدراكي الحاد، الاستقلال", protectionEn: "Sees danger from far away (awareness shield)", protectionAr: "يرى الخطر من بعيد (درع الوعي)", shadowEn: "Emotional detachment, arrogance", shadowAr: "الانفصال العاطفي، الغطرسة", color: "from-amber-600/10 to-yellow-600/10" },
    { id: "ant", nameEn: "Ant", nameAr: "النملة", symbol: "🐜", element: "Earth", type: "Spirit Guide", coreEn: "Discipline, patience, collective strength", coreAr: "الانضباط، الصبر، القوة الجماعية", spiritEn: "Long-term building, consistency", spiritAr: "البناء طويل المدى، الاتساق", powerEn: "Unstoppable persistence", powerAr: "المثابرة التي لا تقهر", protectionEn: "Survival through structure", protectionAr: "البقاء من خلال البنية", shadowEn: "Overwork, losing individuality", shadowAr: "الإرهاق، فقدان الفردية", color: "from-emerald-800/10 to-amber-800/10" },
    // B
    { id: "bear", nameEn: "Bear", nameAr: "الدب", symbol: "🐻", element: "Earth", type: "Power Animal", coreEn: "Strength, grounding, healing solitude", coreAr: "القوة، التجذير، عزلة الشفاء", spiritEn: "Inner healing, rest cycles", spiritAr: "الشفاء الداخلي، دورات الراحة", powerEn: "Raw strength, emotional stability", powerAr: "القوة الخام، الاستقرار العاطفي", protectionEn: "Physical + emotional defense", protectionAr: "الدفاع الجسدي والعاطفي", shadowEn: "Anger, isolation, suppression", shadowAr: "الغضب، العزلة، القمع", color: "from-amber-800/10 to-emerald-900/10" },
    { id: "bee", nameEn: "Bee", nameAr: "النحلة", symbol: "🐝", element: "Earth/Air", type: "Spirit Guide", coreEn: "Community, productivity, divine order", coreAr: "المجتمع، الإنتاجية، النظام الإلهي", spiritEn: "Purpose through service", spiritAr: "الهدف من خلال الخدمة", powerEn: "Teamwork and creation", powerAr: "العمل الجماعي والإبداع", protectionEn: "Structured harmony", protectionAr: "الانسجام المنظم", shadowEn: "Burnout, people-pleasing", shadowAr: "الإرهاق، إرضاء الآخرين", color: "from-yellow-600/10 to-emerald-800/10" },
    // C
    { id: "cat", nameEn: "Cat", nameAr: "القط", symbol: "🐱", element: "Air/Earth", type: "Spirit Guide", coreEn: "Independence, mystery, intuition", coreAr: "الاستقلال، الغموض، الحدس", spiritEn: "Self-trust, inner guidance", spiritAr: "الثقة بالنفس، التوجيه الداخلي", powerEn: "Spiritual sensitivity", powerAr: "الحساسية الروحية", protectionEn: "Energetic boundary sensing", protectionAr: "استشعار الحدود الطاقية", shadowEn: "Emotional distance, avoidance", shadowAr: "المسافة العاطفية، التجنب", color: "from-stone-700/10 to-emerald-800/10" },
    { id: "crocodile", nameEn: "Crocodile", nameAr: "التمساح", symbol: "🐊", element: "Water/Earth", type: "Shadow Animal", coreEn: "Survival instinct, ancient wisdom", coreAr: "غريزة البقاء، الحكمة القديمة", spiritEn: "Patience before action", spiritAr: "الصبر قبل الفعل", powerEn: "Primal survival intelligence", powerAr: "ذكاء البقاء البدائي", protectionEn: "Hidden strength, stealth awareness", protectionAr: "القوة الخفية، الوعي الخفي", shadowEn: "Emotional suppression, aggression", shadowAr: "القمع العاطفي، العدوانية", color: "from-green-800/20 to-emerald-900/20" },
    // D
    { id: "dolphin", nameEn: "Dolphin", nameAr: "الدلفين", symbol: "🐬", element: "Water", type: "Spirit Guide", coreEn: "Joy, emotional healing, communication", coreAr: "الفرح، الشفاء العاطفي، التواصل", spiritEn: "Emotional intelligence", spiritAr: "الذكاء العاطفي", powerEn: "Healing presence", powerAr: "الحضور الشافي", protectionEn: "Emotional harmony", protectionAr: "الانسجام العاطفي", shadowEn: "Escapism, avoidance of pain", shadowAr: "الهروب، تجنب الألم", color: "from-teal-800/10 to-emerald-900/10" },
    // E
    { id: "elephant", nameEn: "Elephant", nameAr: "الفيل", symbol: "🐘", element: "Earth", type: "Protection Animal", coreEn: "Memory, wisdom, ancestral strength", coreAr: "الذاكرة، الحكمة، القوة الأجدادية", spiritEn: "Deep emotional lessons", spiritAr: "الدروس العاطفية العميقة", powerEn: "Stability and endurance", powerAr: "الاستقرار والتحمل", protectionEn: "Ancestral shielding", protectionAr: "الحماية الأجدادية", shadowEn: "Emotional heaviness, holding past trauma", shadowAr: "الثقل العاطفي، التمسك بصدمات الماضي", color: "from-stone-600/10 to-emerald-800/10" },
    // F
    { id: "fox", nameEn: "Fox", nameAr: "الثعلب", symbol: "🦊", element: "Earth/Air", type: "Spirit Guide", coreEn: "Strategy, intelligence, adaptability", coreAr: "الاستراتيجية، الذكاء، القدرة على التكيف", spiritEn: "Clever navigation of challenges", spiritAr: "التنقل الذكي عبر التحديات", powerEn: "Problem-solving intelligence", powerAr: "ذكاء حل المشكلات", protectionEn: "Survival through awareness", protectionAr: "البقاء من خلال الوعي", shadowEn: "Manipulation, avoidance", shadowAr: "التلاعب، التجنب", color: "from-orange-600/10 to-emerald-800/10" },
    // G
    { id: "giraffe", nameEn: "Giraffe", nameAr: "الزرافة", symbol: "🦒", element: "Air/Earth", type: "Spirit Guide", coreEn: "Higher perspective, long vision", coreAr: "المنظور الأعلى، الرؤية البعيدة", spiritEn: "Seeing future possibilities", spiritAr: "رؤية الاحتمالات المستقبلية", powerEn: "Calm observation", powerAr: "الملاحظة الهادئة", protectionEn: "Emotional distance for clarity", protectionAr: "المسافة العاطفية من أجل الوضوح", shadowEn: "Disconnect from emotions", shadowAr: "الانفصال عن المشاعر", color: "from-yellow-700/10 to-emerald-800/10" },
    // H
    { id: "horse", nameEn: "Horse", nameAr: "الحصان", symbol: "🐎", element: "Fire/Earth", type: "Power Animal", coreEn: "Freedom, movement, life force", coreAr: "الحرية، الحركة، قوة الحياة", spiritEn: "Forward momentum in life", spiritAr: "الزخم إلى الأمام في الحياة", powerEn: "Stamina, passion, drive", powerAr: "التحمل، الشغف، الدافع", protectionEn: "Escape from stagnation", protectionAr: "الهروب من الركود", shadowEn: "Impulsiveness, burnout", shadowAr: "الاندفاع، الإرهاق", color: "from-amber-700/10 to-emerald-800/10" },
    // L
    { id: "lion", nameEn: "Lion", nameAr: "الأسد", symbol: "🦁", element: "Fire", type: "Power Animal", coreEn: "Leadership, courage, authority", coreAr: "القيادة، الشجاعة، السلطة", spiritEn: "Confidence and self-power", spiritAr: "الثقة والقوة الذاتية", powerEn: "Dominance over fear", powerAr: "السيطرة على الخوف", protectionEn: "Territorial energy defense", protectionAr: "الدفاع الطاقي عن المنطقة", shadowEn: "Ego, control issues", shadowAr: "الأنا، مشاكل السيطرة", color: "from-amber-600/10 to-emerald-900/10" },
    // O
    { id: "owl", nameEn: "Owl", nameAr: "البومة", symbol: "🦉", element: "Air", type: "Spirit Guide", coreEn: "Wisdom, hidden truth, intuition", coreAr: "الحكمة، الحقيقة الخفية، الحدس", spiritEn: "Seeing what others miss", spiritAr: "رؤية ما يفوته الآخرون", powerEn: "Deep perception", powerAr: "الإدراك العميق", protectionEn: "Night awareness, insight", protectionAr: "الوعي الليلي، البصيرة", shadowEn: "Emotional isolation", shadowAr: "العزلة العاطفية", color: "from-emerald-800/10 to-stone-800/10" },
    // S
    { id: "snake", nameEn: "Snake", nameAr: "الأفعى", symbol: "🐍", element: "Earth", type: "Shadow Animal", coreEn: "Transformation, rebirth, shedding", coreAr: "التحول، البعث، التخلص من الجلد", spiritEn: "Shedding old identity", spiritAr: "التخلص من الهوية القديمة", powerEn: "Healing transformation", powerAr: "التحول الشافي", protectionEn: "Energetic regeneration", protectionAr: "التجديد الطاقي", shadowEn: "Fear, emotional intensity", shadowAr: "الخوف، الكثافة العاطفية", color: "from-green-700/20 to-emerald-800/20" },
    // T
    { id: "tiger", nameEn: "Tiger", nameAr: "النمر", symbol: "🐅", element: "Fire", type: "Power Animal", coreEn: "Power, passion, instinct", coreAr: "القوة، الشغف، الغريزة", spiritEn: "Raw emotional strength", spiritAr: "القوة العاطفية الخام", powerEn: "Fearless action", powerAr: "العمل بدون خوف", protectionEn: "Aggressive boundary defense", protectionAr: "الدفاع العدواني عن الحدود", shadowEn: "Rage, impulsiveness", shadowAr: "الغضب، الاندفاع", color: "from-orange-700/10 to-emerald-900/10" },
    { id: "turtle", nameEn: "Turtle", nameAr: "السلحفاة", symbol: "🐢", element: "Earth/Water", type: "Protection Animal", coreEn: "Patience, longevity, protection", coreAr: "الصبر، طول العمر، الحماية", spiritEn: "Slow but steady growth", spiritAr: "نمو بطيء لكن ثابت", powerEn: "Endurance", powerAr: "التحمل", protectionEn: "Emotional shell", protectionAr: "الصدفة العاطفية", shadowEn: "Emotional withdrawal", shadowAr: "الانسحاب العاطفي", color: "from-emerald-700/20 to-teal-800/10" },
    // W
    { id: "wolf", nameEn: "Wolf", nameAr: "الذئب", symbol: "🐺", element: "Earth/Air", type: "Spirit Guide", coreEn: "Instinct, loyalty, intuition", coreAr: "الغريزة، الولاء، الحدس", spiritEn: "Inner truth + pack awareness", spiritAr: "الحقيقة الداخلية + الوعي الجماعي", powerEn: "Leadership in groups", powerAr: "القيادة في المجموعات", protectionEn: "Territorial defense", protectionAr: "الدفاع عن المنطقة", shadowEn: "Loneliness, emotional suppression", shadowAr: "الوحدة، القمع العاطفي", color: "from-stone-600/10 to-emerald-900/10" }
  ]

  // Animal Types Categories
  const animalTypes = [
    { id: "spirit-guide", nameEn: "🌿 Spirit Guide Animals", nameAr: "🌿 حيوانات المرشد الروحي", descriptionEn: "These represent your current path or life lesson. They appear when you are changing, need guidance, confused, or awakening.", descriptionAr: "تمثل مسارك الحالي أو درس حياتك. تظهر عندما تتغير، تحتاج إلى توجيه، مرتبك، أو تستيقظ." },
    { id: "protection", nameEn: "🐾 Protection Animals", nameAr: "🐾 حيوانات الحماية", descriptionEn: "These represent energetic shielding and survival instincts. They show boundaries, protection from negativity, survival strength, and instinctual intelligence.", descriptionAr: "تمثل الحماية الطاقية وغريزة البقاء. تظهر الحدود، الحماية من السلبية، قوة البقاء، والذكاء الغريزي." },
    { id: "shadow", nameEn: "🌒 Shadow Animals", nameAr: "🌒 حيوانات الظل", descriptionEn: "These represent suppressed emotions or unconscious patterns. They appear when fear is not acknowledged, trauma is active, or ego/denial is involved.", descriptionAr: "تمثل المشاعر المكبوتة أو الأنماط اللاواعية. تظهر عندما لا يتم الاعتراف بالخوف، أو يكون الصدمة نشطًا، أو تورط الأنا/الإنكار." },
    { id: "power", nameEn: "⚡ Power Animals", nameAr: "⚡ حيوانات القوة", descriptionEn: "These represent your core strength and potential. They reflect innate talents, leadership energy, confidence, and spiritual power.", descriptionAr: "تمثل قوتك الأساسية وإمكانياتك. تعكس المواهب الفطرية، طاقة القيادة، الثقة، والقوة الروحية." }
  ]

  // Element-Based Categories
  const elementCategories = [
    { id: "fire", nameEn: "🔥 Fire Animals", nameAr: "🔥 حيوانات النار", animals: ["Tiger", "Lion", "Horse"], descriptionEn: "Action, transformation, instinct, leadership", descriptionAr: "العمل، التحول، الغريزة، القيادة" },
    { id: "water", nameEn: "🌊 Water Animals", nameAr: "🌊 حيوانات الماء", animals: ["Dolphin", "Crocodile"], descriptionEn: "Emotions, intuition, healing, subconscious", descriptionAr: "المشاعر، الحدس، الشفاء، اللاوعي" },
    { id: "earth", nameEn: "🌍 Earth Animals", nameAr: "🌍 حيوانات الأرض", animals: ["Bear", "Elephant", "Snake", "Turtle", "Ant", "Fox"], descriptionEn: "Grounding, stability, wisdom, patience", descriptionAr: "التجذير، الاستقرار، الحكمة، الصبر" },
    { id: "air", nameEn: "🌬 Air Animals", nameAr: "🌬 حيوانات الهواء", animals: ["Eagle", "Owl", "Butterfly"], descriptionEn: "Thought, spirit, messages, intelligence", descriptionAr: "الفكر، الروح، الرسائل، الذكاء" }
  ]

  const filteredAnimals = spiritAnimals.filter(animal =>
    animal.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.nameAr.includes(searchTerm)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020c08] via-[#04140d] to-[#010805] text-stone-200 overflow-hidden relative font-sans">
      
      {/* Background Glowing Fireflies */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-emerald-400 blur-[1px]" 
            style={{ 
              left: Math.random() * 100 + '%', 
              top: Math.random() * 100 + '%', 
              width: Math.random() * 3 + 2 + 'px', 
              height: Math.random() * 3 + 2 + 'px', 
              opacity: Math.random() * 0.4 + 0.2,
              animation: `firefly ${Math.random() * 4 + 4}s ease-in-out infinite alternate` 
            }} 
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-30 text-emerald-400/60 hover:text-emerald-400 transition-all duration-300 flex items-center gap-2 text-xs tracking-widest bg-emerald-950/40 border border-emerald-900/50 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
      >
        ← {language === 'en' ? 'LEAVE THE CANOPY' : 'مغادرة المظلة'}
      </motion.button>

      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-30 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-xs tracking-wider hover:bg-emerald-500/20 transition-all duration-300 border border-emerald-500/30 backdrop-blur-md shadow-lg"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Jungle Totem Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-16 pb-8 relative z-10"
      >
        <div className="text-6xl mb-4 animate-float filter drop-shadow-[0_4px_12px_rgba(16,185,129,0.2)]">🐺🦅🐻</div>
        <h1 className="text-3xl md:text-5xl font-light tracking-[0.25em] text-transparent bg-gradient-to-r from-amber-200 via-emerald-300 to-amber-200 bg-clip-text drop-shadow-sm">
          {language === 'en' ? 'SPIRIT ANIMALS & TOTEMS' : 'الحيوانات الروحية والطواطم'}
        </h1>
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mx-auto mt-4" />
        <p className="text-emerald-500/50 text-[10px] md:text-xs tracking-[0.4em] uppercase mt-3 font-medium">
          {language === 'en' ? 'ANIMAL GUIDES • JUNGLE TOTEMS • POWER SPIRITS' : 'المرشدون الحيوانيون • الطواطم • حيوانات القوة'}
        </p>
      </motion.div>

      {/* Creative Navigation Tabs */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button onClick={() => setActiveTab('guide')} className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all ${activeTab === 'guide' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.1)]' : 'bg-emerald-950/20 text-emerald-500/70 border border-transparent hover:bg-emerald-900/30'}`}>{language === 'en' ? '🌿 Ancient Guide' : '🌿 الدليل القديم'}</button>
          <button onClick={() => setActiveTab('types')} className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all ${activeTab === 'types' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.1)]' : 'bg-amber-950/20 text-amber-500/70 border border-transparent hover:bg-amber-900/30'}`}>{language === 'en' ? '🐾 Totem Realms' : '🐾 ممالك الطواطم'}</button>
          <button onClick={() => setActiveTab('elements')} className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all ${activeTab === 'elements' ? 'bg-teal-500/20 text-teal-300 border border-teal-400/50 shadow-[0_0_15px_rgba(45,212,191,0.1)]' : 'bg-teal-950/20 text-teal-400/70 border border-transparent hover:bg-teal-900/30'}`}>{language === 'en' ? '🌍 Elements' : '🌍 العناصر'}</button>
          <button onClick={() => setActiveTab('encyclopedia')} className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all ${activeTab === 'encyclopedia' ? 'bg-stone-700/30 text-stone-300 border border-stone-500/50 shadow-[0_0_15px_rgba(214,211,209,0.1)]' : 'bg-stone-900/40 text-stone-400/70 border border-transparent hover:bg-stone-800/40'}`}>{language === 'en' ? '📚 Encyclopedia A-Z' : '📚 موسوعة الألف إلى الياء'}</button>
        </div>

        {/* Complete Guide Section */}
        {activeTab === 'guide' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-950/40 to-stone-900/50 rounded-2xl p-6 border border-emerald-500/10 shadow-xl backdrop-blur-sm">
              <h2 className="text-xl font-light text-emerald-300 tracking-wide mb-3">{language === 'en' ? 'What Are Spirit Animals?' : 'ما هي الحيوانات الروحية؟'}</h2>
              <p className="text-stone-300 text-sm leading-relaxed font-light">{language === 'en' ? 'Spirit animals (also called totems or animal guides) are symbolic archetypes that represent inner traits, subconscious lessons, emotional patterns, spiritual protection, and life direction. They are not "pets in spirit form" but mirrors of consciousness through nature.' : 'الحيوانات الروحية (وتسمى أيضًا الطواطم أو المرشدون الحيوانيون) هي نماذج رمزية تمثل السمات الداخلية، الدروس اللاواعية، الأنماط العاطفية، الحماية الروحية، واتجاه الحياة. إنها ليست "حيوانات أليفة في شكل روحي" بل مرايا للوعي من خلال الطبيعة.'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {animalTypes.map((type) => (
                <div key={type.id} className="bg-gradient-to-br from-stone-900/60 to-emerald-950/30 rounded-2xl p-5 border border-emerald-900/30 shadow-lg">
                  <h3 className="text-lg font-light text-amber-200 mb-2">{language === 'en' ? type.nameEn : type.nameAr}</h3>
                  <p className="text-stone-400 text-xs leading-relaxed font-light">{language === 'en' ? type.descriptionEn : type.descriptionAr}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-emerald-950/30 to-amber-950/20 rounded-2xl p-6 border border-amber-900/20 shadow-lg">
              <h2 className="text-xl font-light text-amber-300 mb-4">{language === 'en' ? 'How Spirit Animals Choose You' : 'كيف تختارك الحيوانات الروحية'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-emerald-400 font-medium text-xs tracking-wider uppercase mb-3">🌿 {language === 'en' ? 'Nature Syncs:' : 'الأنماط الشائعة:'}</p>
                  <ul className="text-stone-300 text-xs space-y-2 list-none font-light">
                    <li>✨ {language === 'en' ? 'Repeated sightings in real life or nature' : 'مشاهدات متكررة في الحياة الواقعية أو الطبيعة'}</li>
                    <li>✨ {language === 'en' ? 'Vivid dreams involving a specific animal' : 'أحلام حية تتعلق بحيوان معين'}</li>
                    <li>✨ {language === 'en' ? 'Sudden strong intuition or emotional pulls' : 'رد فعل عاطفي أو حدسي مفاجئ'}</li>
                    <li>✨ {language === 'en' ? 'Visual synchronicities in art or imagery' : 'التزامن البصري في الفن والرموز'}</li>
                  </ul>
                </div>
                <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-900/40 flex flex-col justify-center">
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">⚠️ {language === 'en' ? 'Important Reminder:' : 'مهم:'}</p>
                  <p className="text-stone-400 text-xs font-light leading-relaxed">{language === 'en' ? 'It is a profound symbolic resonance that surfaces when your subconscious aligns with the natural spirit\'s core blueprint.' : 'إنه صدى رمزي عميق يظهر عندما يتوافق وعيك الباطن مع المخطط الأساسي للروح الطبيعية.'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Animal Types Section */}
        {activeTab === 'types' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spiritAnimals.map((animal, idx) => (
              <motion.div 
                key={animal.id} 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.02 }} 
                whileHover={{ scale: 1.01, y: -2 }} 
                onClick={() => setSelectedAnimal(animal)} 
                className={`bg-gradient-to-br ${animal.color} bg-[#04120a]/80 backdrop-blur-sm rounded-2xl p-5 border border-emerald-900/40 hover:border-emerald-500/40 cursor-pointer transition-all duration-300 shadow-md group`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl filter drop-shadow-md transform group-hover:scale-110 transition-transform">{animal.symbol}</div>
                  <div>
                    <h3 className="text-stone-100 font-medium text-base tracking-wide">{language === 'en' ? animal.nameEn : animal.nameAr}</h3>
                    <p className="text-emerald-400/60 text-[10px] uppercase font-semibold tracking-wider mt-0.5">{animal.type}</p>
                  </div>
                </div>
                <p className="text-stone-300 text-xs mt-3 font-light leading-relaxed line-clamp-2">{language === 'en' ? animal.coreEn : animal.coreAr}</p>
                <div className="mt-3 pt-2 border-t border-emerald-950 flex gap-2">
                  <span className="text-[9px] bg-emerald-900/30 border border-emerald-800/40 px-2 py-0.5 rounded-full text-emerald-300 font-medium tracking-wider uppercase">{animal.element}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Elements Section */}
        {activeTab === 'elements' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {elementCategories.map((element) => (
              <div key={element.id} className="bg-gradient-to-br from-[#05160e] to-stone-900/80 rounded-2xl p-5 border border-emerald-900/30 shadow-lg">
                <h3 className="text-lg font-light text-emerald-300 tracking-wide mb-1">{language === 'en' ? element.nameEn : element.nameAr}</h3>
                <p className="text-stone-400 text-xs font-light mb-4">{language === 'en' ? element.descriptionEn : element.descriptionAr}</p>
                <div className="flex flex-wrap gap-2">
                  {element.animals.map(animal => (
                    <span key={animal} className="px-3 py-1 bg-emerald-950/40 border border-emerald-900/50 rounded-full text-emerald-300 text-xs font-light">
                      {animal}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Encyclopedia A-Z */}
        {activeTab === 'encyclopedia' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8 max-w-md mx-auto">
              <input 
                type="text" 
                placeholder={language === 'en' ? '🌿 Track an animal spirit...' : '🌿 ابحث عن حيوان روحي...'} 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full px-5 py-2.5 bg-[#030e09]/90 border border-emerald-900/50 rounded-full text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-emerald-600/70 focus:shadow-[0_0_15px_rgba(16,185,129,0.05)] text-sm transition-all"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredAnimals.map((animal, idx) => (
                <motion.div 
                  key={animal.id} 
                  initial={{ opacity: 0, scale: 0.97 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: idx * 0.01 }} 
                  whileHover={{ scale: 1.02 }} 
                  onClick={() => setSelectedAnimal(animal)} 
                  className={`bg-gradient-to-br ${animal.color} bg-[#04120a]/60 rounded-xl p-3 border border-emerald-950 hover:border-emerald-800/50 cursor-pointer flex items-center gap-3 transition-colors`}
                >
                  <div className="text-3xl filter drop-shadow-sm">{animal.symbol}</div>
                  <div>
                    <div className="text-stone-200 font-medium text-sm">{language === 'en' ? animal.nameEn : animal.nameAr}</div>
                    <div className="text-emerald-500/60 text-[9px] uppercase tracking-wider mt-0.5">{animal.element} • {animal.type.split(' ')[0]}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Deep Jungle Animal Detail Modal */}
      <AnimatePresence>
        {selectedAnimal && (          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4" 
            onClick={() => setSelectedAnimal(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 15 }} 
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-[#030f0a] to-[#010604] rounded-2xl border border-emerald-800/40 shadow-2xl p-6 scrollbar-thin"
            >
              <button 
                onClick={() => setSelectedAnimal(null)} 
                className="absolute top-4 right-4 text-stone-500 hover:text-emerald-400 text-xl transition-colors"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="text-6xl mb-2 filter drop-shadow-md">{selectedAnimal.symbol}</div>
                <h2 className="text-2xl md:text-3xl font-light text-transparent bg-gradient-to-r from-amber-200 to-emerald-300 bg-clip-text">
                  {language === 'en' ? selectedAnimal.nameEn : selectedAnimal.nameAr}
                </h2>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent mx-auto my-3" />
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                <div className="bg-emerald-950/20 rounded-xl p-3.5 border border-emerald-900/30">
                  <p className="text-amber-300/80 text-[10px] font-bold uppercase tracking-wider mb-1">✨ {language === 'en' ? 'Core Meaning' : 'المعنى الجوهري'}</p>
                  <p className="text-stone-200 text-sm font-light">{language === 'en' ? selectedAnimal.coreEn : selectedAnimal.coreAr}</p>
                </div>
                <div className="bg-emerald-950/20 rounded-xl p-3.5 border border-emerald-900/30">
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">🌿 {language === 'en' ? 'Spirit Guidance' : 'المرشد الروحي'}</p>
                  <p className="text-stone-200 text-sm font-light">{language === 'en' ? selectedAnimal.spiritEn : selectedAnimal.spiritAr}</p>
                </div>
                <div className="bg-emerald-950/20 rounded-xl p-3.5 border border-emerald-900/30">
                  <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">⚡ {language === 'en' ? 'Power Essence' : 'حيوان القوة'}</p>
                  <p className="text-stone-200 text-sm font-light">{language === 'en' ? selectedAnimal.powerEn : selectedAnimal.powerAr}</p>
                </div>
                <div className="bg-emerald-950/20 rounded-xl p-3.5 border border-emerald-900/30">
                  <p className="text-teal-400 text-[10px] font-bold uppercase tracking-wider mb-1">🛡️ {language === 'en' ? 'Protection Aura' : 'الحماية'}</p>
                  <p className="text-stone-200 text-sm font-light">{language === 'en' ? selectedAnimal.protectionEn : selectedAnimal.protectionAr}</p>
                </div>
                <div className="bg-emerald-950/20 rounded-xl p-3.5 border border-emerald-900/30">
                  <p className="text-stone-400 text-[10px] font-bold uppercase tracking-wider mb-1">🌒 {language === 'en' ? 'Shadow Teachings' : 'حيوان الظل'}</p>
                  <p className="text-stone-300 text-sm font-light">{language === 'en' ? selectedAnimal.shadowEn : selectedAnimal.shadowAr}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-950 text-center">
                <p className="text-emerald-600/40 text-[9px] uppercase tracking-[0.2em]">✦ {language === 'en' ? 'The wild mirrors the soul' : 'الحيوان يعكس روحك'} ✦</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes firefly { 
          0% { opacity: 0.1; transform: translateY(0px) scale(0.9); } 
          50% { opacity: 0.6; } 
          100% { opacity: 0.2; transform: translateY(-20px) scale(1.1); } 
        } 
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-6px); } 
        } 
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}