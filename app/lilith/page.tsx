'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function LilithPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeCard, setActiveCard] = useState(null)

  const content = {
    en: {
      title: "WHO IS LILITH?",
      subtitle: "EXPLORE THE COSMIC BEING",
      backButton: "← ← ← ← ← BACK TO ECLIPSE",
      footer: '"Some souls were never meant to survive the fire — only to be reborn through it."'
    },
    ar: {
      title: "من هي ليليث؟",
      subtitle: "استكشف الكائن الكوني",
      backButton: "← العودة إلى الفضاء",
      footer: '"بعض الأرواح لم يكن مقدراً لها أن تنجو من النار — فقط لتولد من جديد من خلاله."'
    }
  }

  const cardCategories = [
    {
      id: "identity",
      titleEn: "Identity",
      titleAr: "الهوية",
      subtitleEn: "Who I Am",
      subtitleAr: "من أنا",
      type: "info",
      contentEn: { 
        name: "Lilith", 
        age: "Late 20s", 
        nationality: "Algerian", 
        ethnicity: "Turkish" 
      },
      contentAr: { 
        name: "ليليث", 
        age: "أواخر العشرينات", 
        nationality: "جزائرية", 
        ethnicity: "تركية" 
      },
      coreColor: "bg-cyan-200 shadow-[0_0_20px_#22d3ee]",
      armColor: "border-cyan-400/40 border-t-cyan-300",
      glowColor: "shadow-[0_0_30px_rgba(34,211,238,0.2)]",
      icon: "✨",
      x: 12,
      y: 20
    },
    {
      id: "hobbies",
      titleEn: "Hobbies",
      titleAr: "الهوايات",
      subtitleEn: "What I Love to Do",
      subtitleAr: "ما أحب فعله",
      type: "list",
      contentEn: [
        "Gym", "Reading Books", "Writing Articles, Books & Novels", "Making Songs", 
        "Music", "Writing", "Songwriting", "Singing", "Dancing",
        "Learning languages", "Yoga", "Cooking", "Home workouts", 
        "Stretching", "Skincare", "Crime documentaries", "Anime", "Movies", "TV shows"
      ],
      contentAr: [
        "الجيم", "قراءة الكتب", "كتابة المقالات والكتب والروايات", "صناعة الأغاني", 
        "الموسيقى", "الكتابة", "كتابة الأغاني", "الغناء", "الرقص",
        "تعلم اللغات", "اليوغا", "الطبخ", "تمارين منزلية", 
        "التمدد", "العناية بالبشرة", "وثائقيات الجريمة", "الأنمي", "الأفلام", "المسلسلات"
      ],
      coreColor: "bg-pink-200 shadow-[0_0_20px_#f472b6]",
      armColor: "border-pink-500/40 border-t-fuchsia-400",
      glowColor: "shadow-[0_0_30px_rgba(244,114,182,0.2)]",
      icon: "🎨",
      x: 82,
      y: 18
    },
    {
      id: "interests",
      titleEn: "Deep Interests",
      titleAr: "الاهتمامات العميقة",
      subtitleEn: "What Fascinates Me",
      subtitleAr: "ما يثير اهتمامي",
      type: "list",
      contentEn: [
        "Shadow Work", "Birth Chart Reading", "Psychology & Forensic Psychology", 
        "Philosophy", "Gothic Aesthetics", "Astronomy", "Mythology", "Human behavior", 
        "Neuroscience", "Cultures & Languages", "Technology & AI", "Art & Music",
        "Storytelling", "Spirituality & Astrology", "Tarot", "Energy healing",
        "Manifestation", "Meditation", "Dream meanings", "Ancient symbols",
        "Moon phases", "Horror & True Crime", "Documentaries", "Fitness & Healthy living", 
        "Self-improvement", "Animals", "Emotional intelligence", "Mystery", "Dark academia",
        "Cosmic & Vintage aesthetics", "Gothic style", "Rainy weather", "Space themes", 
        "Ancient civilizations", "Symbolism", "Body language", "Lucid dreaming", 
        "Parallel universe theories", "Ancient Greek & Japanese culture", "Energy frequencies",
        "Hidden meanings in films & music"
      ],
      contentAr: [
        "عمل الظل (Shadow Work)", "قراءة خريطة الولادة الفلكية", "علم النفس وعلم النفس الجنائي", 
        "الفلسفة", "الجماليات القوطية", "علم الفلك", "الأساطير", "السلوك البشري", 
        "علم الأعصاب", "الثقافات واللغات", "التكنولوجيا والذكاء الاصطناعي", "الفن والموسيقى",
        "سرد القصص", "الروحانية وعلم التنجيم", "التاروت", "الشفاء بالطاقة",
        "التحقيق", "التأمل", "تفسير الأحلام", "الرموز القديمة",
        "مراحل القمر", "الرعب والجريمة الحقيقية", "الأفلام الوثائقية", "اللياقة والحياة الصحية", 
        "تطوير الذات", "الحيوانات", "الذكاء العاطفي", "الغموض", "الأكاديميا المظلمة",
        "الجماليات الكونية والعتيقة", "الأسلوب القوطي", "الطقس الممطر", "موضوعات الفضاء", 
        "الحضارات القديمة", "الرمزية", "لغة الجسد", "الأحلام الواضحة", 
        "نظريات الأكوان المتوازية", "الثقافة اليونانية القديمة واليابانية", "ترددات الطاقة",
        "المعاني الخفية في الأفلام والموسيقى"
      ],
      coreColor: "bg-indigo-200 shadow-[0_0_20px_#818cf8]",
      armColor: "border-indigo-500/40 border-t-cyan-400",
      glowColor: "shadow-[0_0_30px_rgba(129,140,248,0.2)]",
      icon: "🔮",
      x: 88,
      y: 52
    },
    {
      id: "mbti",
      titleEn: "MBTI Type",
      titleAr: "نمط MBTI",
      subtitleEn: "The Architect",
      subtitleAr: "المهندس",
      type: "mbti",
      contentEn: { mbti: "INTJ-T", description: "Strategic, analytical, and visionary thinker with a turbulent mindset for constant growth." },
      contentAr: { mbti: "INTJ-T", description: "مفكر استراتيجي وتحليلي ورؤيوي، ذو عقلية متطلعة للتطور المستمر." },
      coreColor: "bg-emerald-200 shadow-[0_0_20px_#34d399]",
      armColor: "border-emerald-500/40 border-t-teal-300",
      glowColor: "shadow-[0_0_30px_rgba(52,211,153,0.2)]",
      icon: "⚡",
      x: 22,
      y: 72
    },
    {
      id: "astrology",
      titleEn: "My Zodiacs",
      titleAr: "أبراجي الفلكية",
      subtitleEn: "Cosmic Blueprint",
      subtitleAr: "المخطط الكوني",
      type: "grid",
      contentEn: {
        rising: "Leo", sun: "Taurus", moon: "Virgo", venus: "Gemini",
        mercury: "Aries", mars: "Scorpio", lilith: "Scorpio"
      },
      contentAr: {
        rising: "الأسد", sun: "الثور", moon: "العذراء", venus: "الجوزاء",
        mercury: "الحمل", mars: "العقرب", lilith: "العقرب"
      },
      coreColor: "bg-amber-200 shadow-[0_0_20px_#fbbf24]",
      armColor: "border-amber-500/40 border-t-orange-400",
      glowColor: "shadow-[0_0_30px_rgba(251,191,36,0.2)]",
      icon: "⭐",
      x: 54,
      y: 84
    },
    {
      id: "career",
      titleEn: "Career Path",
      titleAr: "المسار المهني",
      subtitleEn: "What I Do",
      subtitleAr: "ما أفعله",
      type: "list",
      contentEn: [
        "English Professor (University & Private School)", 
        "Web Developer", 
        "Spiritual, Energetic & Psychological Guide & Teacher"
      ],
      contentAr: [
        "أستاذة لغة إنجليزية (جامعة ومدرسة خاصة)", 
        "مطورة ويب", 
        "مرشدة ومعلمة روحية، نفسية وطاقية"
      ],
      coreColor: "bg-rose-200 shadow-[0_0_20px_#f43f5e]",
      armColor: "border-rose-500/40 border-t-red-400",
      glowColor: "shadow-[0_0_30px_rgba(244,63,94,0.2)]",
      icon: "💼",
      x: 48,
      y: 32
    },
    {
      id: "studies",
      titleEn: "Diplomas & Academic Path",
      titleAr: "الدبلومات والمسار الأكاديمي",
      subtitleEn: "Academic Journey",
      subtitleAr: "الرحلة الأكاديمية",
      type: "list",
      contentEn: [
        "Master's Degree in English Linguistics", 
        "Aspiring Computer Science Student & Robotics Engineer", 
        "AI & Programming Path", 
        "Psychology Studies"
      ],
      contentAr: [
        "شهادة الماجستير في اللغويات الإنجليزية", 
        "طالبة علوم حاسوب ومهندسة روبوتات طموحة", 
        "مسار الذكاء الاصطناعي والبرمجة", 
        "دراسات علم النفس"
      ],
      coreColor: "bg-sky-200 shadow-[0_0_20px_#38bdf8]",
      armColor: "border-sky-500/40 border-t-blue-400",
      glowColor: "shadow-[0_0_30px_rgba(56,189,248,0.2)]",
      icon: "📚",
      x: 10,
      y: 85
    },
    {
      id: "spirit_animals",
      titleEn: "Spirit Animals",
      titleAr: "الحيوانات الروحية",
      subtitleEn: "Spiritual Archetypes",
      subtitleAr: "الرموز الروحية",
      type: "animals",
      contentEn: [
        { title: "Primary Spirit Animal – Snake", text: "The snake represents transformation, rebirth, and hidden wisdom. Like a snake shedding its skin, I am constantly evolving, leaving behind old versions of myself to discover deeper truths. It reflects my attraction to shadow work, self-discovery, and personal growth." },
        { title: "Guide Animal – Owl", text: "The owl symbolizes intuition, insight, and the ability to see what others overlook. It guides me toward knowledge and understanding, helping me navigate uncertainty and uncover hidden meanings beneath the surface." },
        { title: "Shadow Animal – Raven", text: "The raven represents mystery, the unconscious mind, and transformation through darkness. It reflects my willingness to explore difficult emotions, question accepted beliefs, and seek wisdom in places others may fear to look." },
        { title: "Protective Animal – Black Jaguar", text: "The black jaguar symbolizes strength, protection, courage, and mastery of the shadow. It reminds me to stand in my power, trust my instincts, and move through life with confidence even when facing the unknown." },
        { title: "Higher Perspective Animal – Eagle", text: "The eagle represents freedom, vision, and independence. It flies high above limitations, seeing the bigger picture when others are focused on details. Like the eagle, I value my independence, prefer finding my own path, and strive to rise above challenges to gain a deeper understanding of life." }
      ],
      contentAr: [
        { title: "الحيوان الروحي الأساسي – الأفعى", text: "تمثل الأفعى التحول، إعادة الولادة، والحكمة الخفية. تماماً كالأفعى التي تغير جلدها، أنا في تطور مستمر، أترك وراء نفسي النسخ القديمة لأكتشف حقائق أعمق. هذا يعكس انجذابي لعمل الظل، واكتشاف الذات، والنمو الشخصي." },
        { title: "الحيوان المرشد – البومة", text: "ترمز البومة إلى الحدس، البصيرة، والقدرة على رؤية ما يغفله الآخرون. إنها ترشدني نحو المعرفة والفهم، وتساعدني على تنقل مسارات الشك وكشف المعاني المخفية الكامنة تحت السطح." },
        { title: "حيوان الظل – الغراب", text: "يمثل الغراب الغموض، العقل الباطن، والتحول عبر الظلام. يعكس رغبتي واستعدادي لاستكشاف المشاعر الصعبة، والتشكيك في المعتقدات السائدة، والبحث عن الحكمة في الأماكن التي قد يخشى الآخرون النظر إليها." },
        { title: "الحيوان الحامي – الجاغوار الأسود", text: "يرمز الجاغوار الأسود إلى القوة، الحماية، الشجاعة، والتمكن من الظل. يذكرني دائماً بأن أقف بقوتي، وأثق بغرائزي، وأتحرك في الحياة بثقة حتى عند مواجهة المجهول." },
        { title: "حيوان المنظور الأعلى – النسر", text: "يمثل النسر الحرية، الرؤية، والاستقلالية. يطير عالياً فوق القيود، ليرى الصورة الكبيرة عندما يركز الآخرون على التفاصيل الدقيقة. تماماً مثل النسر، أنا أقدر استقلاليتي، وأفضل إيجاد طريقي الخاص، وأسعى للارتفاع فوق التحديات لاكتساب فهم أعمق للحياة." }
      ],
      coreColor: "bg-purple-300 shadow-[0_0_20px_#a855f7]",
      armColor: "border-purple-500/40 border-t-pink-400",
      glowColor: "shadow-[0_0_30px_rgba(168,85,247,0.2)]",
      icon: "𓆙",
      x: 80,
      y: 84
    }
  ]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const openCard = (card) => {
    setActiveCard(card)
    setIsOpen(true)
  }

  const closeCard = () => {
    setIsOpen(false)
    setActiveCard(null)
  }

  const renderCardContent = (card) => {
    if (!card) return null
    const content = language === 'en' ? card.contentEn : card.contentAr
    
    if (card.type === "info") {
      return (
        <div className="space-y-4">
          <div className="bg-cyan-500/5 rounded-xl p-5 border border-cyan-500/20">
            <div className="flex justify-between items-center py-2">
              <span className="text-cyan-400 text-sm tracking-wider">{language === 'en' ? 'NAME' : 'الاسم'}</span>
              <span className="text-white text-lg font-light">{content.name}</span>
            </div>
            <div className="h-px bg-cyan-500/20 my-3" />
            <div className="flex justify-between items-center py-2">
              <span className="text-cyan-400 text-sm tracking-wider">{language === 'en' ? 'AGE' : 'العمر'}</span>
              <span className="text-white text-lg font-light">{content.age}</span>
            </div>
            <div className="h-px bg-cyan-500/20 my-3" />
            <div className="flex justify-between items-center py-2">
              <span className="text-cyan-400 text-sm tracking-wider">{language === 'en' ? 'NATIONALITY' : 'الجنسية'}</span>
              <span className="text-white text-lg font-light">{content.nationality}</span>
            </div>
            <div className="h-px bg-cyan-500/20 my-3" />
            <div className="flex justify-between items-center py-2">
              <span className="text-cyan-400 text-sm tracking-wider">{language === 'en' ? 'ETHNICITY' : 'الأصل / العرق'}</span>
              <span className="text-white text-lg font-light">{content.ethnicity}</span>
            </div>
          </div>
        </div>
      )
    }
    
    if (card.type === "mbti") {
      return (
        <div className="bg-purple-500/5 rounded-xl p-5 border border-purple-500/20 text-center">
          <p className="text-5xl font-light text-cyan-300 mb-3">{content.mbti}</p>
          <p className="text-gray-300 text-sm leading-relaxed">{content.description}</p>
        </div>
      )
    }
    
    if (card.type === "grid") {
      const keys = language === 'en' 
        ? ["rising", "sun", "moon", "venus", "mercury", "mars", "lilith"]
        : ["البرج الصاعد", "الشمس", "القمر", "الزهرة", "عطارد", "المريخ", "ليليث"]
      const values = language === 'en' ? Object.values(card.contentEn) : Object.values(card.contentAr)
      
      return (
        <div className="grid grid-cols-2 gap-3">
          {keys.map((key, idx) => (
            <div key={key} className="bg-cyan-500/5 rounded-lg p-3 text-center border border-cyan-500/20">
              <p className="text-cyan-400 text-xs uppercase tracking-wider">{key}</p>
              <p className="text-white font-light mt-1 text-base">{values[idx]}</p>
            </div>
          ))}
        </div>
      )
    }
    
    if (card.type === "list") {
      return (
        <div className="flex flex-wrap gap-2 max-h-[50vh] overflow-y-auto p-1 custom-scroll">
          {content.map((item, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-cyan-500/5 rounded-full text-sm text-gray-200 border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-200"
            >
              {item}
            </span>
          ))}
        </div>
      )
    }

    if (card.type === "animals") {
      return (
        <div className="space-y-4 max-h-[55vh] overflow-y-auto p-1 custom-scroll" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {content.map((animal, i) => (
            <div key={i} className="bg-purple-950/10 rounded-xl p-4 border border-purple-500/20">
              <h4 className="text-cyan-300 font-medium text-base tracking-wide mb-1">
                {animal.title}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                {animal.text}
              </p>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  const c = content[language]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#01020a] via-[#020412] to-[#030616] overflow-hidden relative">
      
      {/* Background animated stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(220)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              width: Math.random() * 2 + 0.5 + 'px',
              height: Math.random() * 2 + 0.5 + 'px',
              backgroundColor: `rgba(200, 220, 255, ${Math.random() * 0.6 + 0.2})`,
              animation: `twinkle ${Math.random() * 2 + 1}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + 's'
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-30 text-cyan-400/50 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 text-sm tracking-wider bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
      >
        {c.backButton}
      </motion.button>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-30 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-cyan-300 text-sm hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/20"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-12 pb-6 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-transparent bg-gradient-to-r from-cyan-200 via-blue-400 to-indigo-300 bg-clip-text">
          {c.title}
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4" />
        <p className="text-cyan-400/40 text-[10px] tracking-[0.3em] mt-3">{c.subtitle}</p>
      </motion.div>

      {/* Floating Galaxies Container */}
      <div className="relative w-full h-[calc(100vh-200px)]">
        {cardCategories.map((card, idx) => {
          const title = language === 'en' ? card.titleEn : card.titleAr
          const subtitle = language === 'en' ? card.subtitleEn : card.subtitleAr
          
          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.12 }}
              onClick={() => openCard({ ...card, title, subtitle })}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 w-32 h-32 md:w-36 md:h-36 flex items-center justify-center"
              style={{ left: `${card.x}%`, top: `${card.y}%` }}
            >
              <div className={`relative w-full h-full rounded-full flex items-center justify-center transition-all duration-500 ${card.glowColor}`}>
                
                {/* Galaxy Spiral Arm 1 */}
                <div className={`absolute inset-0 rounded-full border-2 border-transparent ${card.armColor} animate-galaxy-spin`} />
                
                {/* Galaxy Spiral Arm 2 */}
                <div className={`absolute inset-2 rounded-full border border-dashed border-transparent ${card.armColor} opacity-60 animate-galaxy-spin-reverse`} />
                
                {/* Micro cosmic dust ring */}
                <div className="absolute inset-4 rounded-full border border-white/5 animate-pulse" />

                {/* Bright Central Core */}
                <div className={`absolute w-4 h-4 rounded-full blur-[2px] ${card.coreColor}`} />

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center p-2 text-center bg-black/10 rounded-full w-full h-full backdrop-blur-[1px]">
                  <p className="text-2xl md:text-3xl filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">{card.icon}</p>
                  <p className="text-white font-light tracking-wide text-[11px] md:text-xs mt-1 bg-black/40 px-2 py-0.5 rounded-md border border-white/5">{title}</p>
                </div>
              </div>
              
              {/* Tooltip Description */}
              {hoveredCard === card.id && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 whitespace-nowrap z-30"
                >
                  <span className="text-cyan-200 text-[10px] tracking-wider bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/40 shadow-lg">
                    {subtitle}
                  </span>
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {isOpen && activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
            onClick={closeCard}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto bg-gradient-to-br from-[#05091f] to-[#01030d] rounded-2xl border border-cyan-500/20 shadow-2xl custom-scroll"
            >
              <button
                onClick={closeCard}
                className="absolute top-4 right-4 text-cyan-400/60 hover:text-cyan-400 transition-colors text-2xl z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-cyan-500/10"
              >
                ✕
              </button>

              <div className="text-center pt-8 pb-4 px-6 border-b border-cyan-500/10">
                <h2 className="text-2xl md:text-3xl font-light text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text">
                  {activeCard.title}
                </h2>
                <p className="text-cyan-400/50 text-sm mt-1 tracking-wide">{activeCard.subtitle}</p>
                <div className="w-12 h-px bg-gradient-to-r from-cyan-500 to-transparent mx-auto mt-3" />
              </div>

              <div className="p-6">
                {renderCardContent(activeCard)}
              </div>

              <div className="pt-4 pb-6 px-6 border-t border-cyan-500/10 text-center">
                <p className="text-cyan-400/30 text-xs tracking-wider">
                  {language === 'en' ? '✦ COSMIC BEING ✦' : '✦ كائن كوني ✦'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Poetry footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 left-0 right-0 text-center z-10"
      >
        <p className="text-cyan-400/20 text-xs italic tracking-wide px-4">
          {c.footer}
        </p>
      </motion.div>

      {/* Cosmic CSS Animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.25); }
        }
        @keyframes galaxySpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes galaxySpinReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-galaxy-spin {
          animation: galaxySpin 12s linear infinite;
        }
        .animate-galaxy-spin-reverse {
          animation: galaxySpinReverse 20s linear infinite;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(0, 100, 200, 0.05);
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 150, 255, 0.2);
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}