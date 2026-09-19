'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function CosmicEnergyCalendar() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [reminders, setReminders] = useState({})
  const [emailInputs, setEmailInputs] = useState({})
  const [activeInputId, setActiveInputId] = useState(null)
  const [showReminderToast, setShowReminderToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Load reminders from localStorage
  useEffect(() => {
    const savedReminders = localStorage.getItem('cosmicReminders')
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders))
    }
  }, [])

  // Handle the email submission process
  const handleSubscribe = async (e, eventId, eventNameEn, eventNameAr) => {
    e.preventDefault();
    e.stopPropagation();
    
    const userEmail = emailInputs[eventId];
    if (!userEmail || !userEmail.includes('@')) {
      setToastMessage(language === 'en' ? '❌ Please provide a valid celestial email coordinate.' : '❌ يرجى إدخال بريد إلكتروني صحيح.');
      setShowReminderToast(true);
      setTimeout(() => setShowReminderToast(false), 3000);
      return;
    }

    // Update Local Storage & UI State
    const newReminders = { ...reminders, [eventId]: userEmail };
    setReminders(newReminders);
    localStorage.setItem('cosmicReminders', JSON.stringify(newReminders));
    
    // Close the input drawer
    setActiveInputId(null);

    /* 
      PRODUCTION INTEGRATION NOTE:
      You will pass the structured configuration data downstream to your backend mail client handler here.
      Example:
      await fetch('/api/reminders/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email: userEmail, event: eventId })
      });
    */

    if (language === 'en') {
      setToastMessage(`✨ Space alignment complete! Lilith's Eclipse will dispatch a cosmic transmission to ${userEmail} when the energies peak.`);
    } else {
      setToastMessage(`✨ تم ضبط المحاذاة! سيرسل لك كسوف ليليث رسالة كونيّة إلى ${userEmail} عندما تبلغ الطاقات ذروتها.`);
    }
    
    setShowReminderToast(true);
    setTimeout(() => setShowReminderToast(false), 4500);
  }

  // Remove an active reminder profile
  const removeReminder = (e, eventId) => {
    e.stopPropagation();
    const newReminders = { ...reminders };
    delete newReminders[eventId];
    setReminders(newReminders);
    localStorage.setItem('cosmicReminders', JSON.stringify(newReminders));

    setToastMessage(language === 'en' ? '🔔 Alignment reminder removed' : '🔔 تم إلغاء تذكير المحاذاة');
    setShowReminderToast(true);
    setTimeout(() => setShowReminderToast(false), 3000);
  }

  const cosmicEvents = [
    {
      id: "solar-eclipse",
      nameEn: "☀️ Solar Eclipse",
      nameAr: "☀️ كسوف الشمس",
      symbol: "🌞",
      spiritualMeaningAr: "... كسوف الشمس ليس مجرد ظاهرة فلكية، بل بوابة رمزية لإعادة ضبط الهوية والوعي ...",
      spiritualMeaningEn: "A Solar Eclipse is not just an astronomical phenomenon, but a symbolic gateway to reset identity and consciousness...",
      effectsAr: "تظهر الظلال الخفية، المعتقدات القديمة، التحول العميق، إعادة ضبط الهوية",
      effectsEn: "Hidden shadows emerge, old beliefs surface, deep transformation, identity reset",
      ritualAr: "تأمل داخلي، تدوين ما يظهر من مشاعر، الاستماع للحدس، احتضان الظل",
      ritualEn: "Inner meditation, journal emerging feelings, listen to intuition, shadow embrace",
      nextDate: "October 2, 2026",
      color: "from-amber-600/10 via-orange-950/20 to-transparent",
      glowColor: "rgba(249, 115, 22, 0.15)"
    },
    {
      id: "lunar-eclipse",
      nameEn: "🌙 Lunar Eclipse",
      nameAr: "🌙 خسوف القمر",
      symbol: "🌕",
      spiritualMeaningAr: "... خسوف القمر يمثل لحظة التحرر والختام الروحي ...",
      spiritualMeaningEn: "A Lunar Eclipse represents a moment of liberation and spiritual closure...",
      effectsAr: "تحرر عاطفي، ختام روحي، تطهير، غفران، إغلاق للفصول المنتهية",
      effectsEn: "Emotional release, spiritual closure, purification, forgiveness, closing finished chapters",
      ritualAr: "طقوس التخلي، كتابة رسائل الغفران، حمام ملحي للتطهير، تأمل النار",
      ritualEn: "Release ceremony, write forgiveness letters, salt bath for purification, fire meditation",
      nextDate: "September 7, 2026",
      color: "from-fuchsia-950/20 via-purple-900/10 to-transparent",
      glowColor: "rgba(168, 85, 247, 0.15)"
    },
    {
      id: "full-moon",
      nameEn: "🌕 Full Moon",
      nameAr: "🌕 اكتمال القمر",
      symbol: "🌕",
      spiritualMeaningAr: "... اكتمال القمر هو ذروة الدورة القمرية، حيث تصل الطاقة إلى أعلى درجات الوضوح والتجلي ...",
      spiritualMeaningEn: "The Full Moon is the peak of the lunar cycle, where energy reaches its highest levels of clarity and manifestation...",
      effectsAr: "وضوح ورؤية، ذروة طاقية، حصاد روحي، اكتمال، احتفال بالتقدم",
      effectsEn: "Clarity and vision, energetic peak, spiritual harvest, completion, celebrating progress",
      ritualAr: "شحن البلورات، كتابة قائمة الامتنان، طقوس القمر، تأمل تحت ضوء القمر",
      ritualEn: "Charge crystals, write gratitude list, moon ritual, meditate under moonlight",
      nextDate: "June 11, 2026",
      color: "from-yellow-950/20 via-amber-900/10 to-transparent",
      glowColor: "rgba(234, 179, 8, 0.15)"
    },
    {
      id: "new-moon",
      nameEn: "🌑 New Moon",
      nameAr: "🌑 قمر جديد",
      symbol: "🌑",
      spiritualMeaningAr: "... القمر الجديد هو رحم الإمكانيات اللامحدودة ...",
      spiritualMeaningEn: "The New Moon is the womb of infinite possibilities...",
      effectsAr: "بدايات جديدة، زرع بذور روحية، تأمل داخلي، نوايا، إمكانيات لا نهائية",
      effectsEn: "New beginnings, planting spiritual seeds, inner reflection, intentions, infinite possibilities",
      ritualAr: "تحديد النوايا، لوحة الرؤية، تأمل الظلام، كتابة الأمنيات",
      ritualEn: "Set intentions, vision board, darkness meditation, write wishes",
      nextDate: "June 25, 2026",
      color: "from-slate-900/30 via-zinc-950/20 to-transparent",
      glowColor: "rgba(148, 163, 184, 0.1)"
    },
    {
      id: "blue-moon",
      nameEn: "💙 Blue Moon",
      nameAr: "💙 القمر الأزرق",
      symbol: "💙",
      spiritualMeaningAr: "... القمر الأزرق رمز للندرة والتضخيم الطاقي ...",
      spiritualMeaningEn: "The Blue Moon is a symbol of rarity and energetic amplification...",
      effectsAr: "تضخيم طاقي، أحلام ورؤى، تواصل مع الحدس، توسيع الوعي، سحر نادر",
      effectsEn: "Energetic amplification, dreams and visions, intuition connection, expanded consciousness, rare magic",
      ritualAr: "تحديد أمنيات جريئة، طقوس القمر، الرقص تحت ضوء القمر، التأمل",
      ritualEn: "Set bold wishes, moon ritual, dance under moonlight, meditation",
      nextDate: "May 31, 2026",
      color: "from-cyan-950/20 via-blue-900/10 to-transparent",
      glowColor: "rgba(6, 182, 212, 0.15)"
    },
    {
      id: "super-moon",
      nameEn: "✨ Super Moon",
      nameAr: "✨ القمر العملاق",
      symbol: "✨",
      spiritualMeaningAr: "... عندما يبدو القمر أكبر وأكثر إشراقًا، يصبح رمزًا لتضخيم كل ما نحمله داخلنا ...",
      spiritualMeaningEn: "When the moon appears larger and brighter, it becomes a symbol of amplifying everything we carry within...",
      effectsAr: "تضخيم كل شيء، مشاعر مكثفة، فرصة للشفاء، نمو شخصي، مراقبة ذاتية",
      effectsEn: "Amplifies everything, intense emotions, healing opportunity, personal growth, self-observation",
      ritualAr: "شحن البلورات، حمام القمر، تحديد نوايا كبيرة، تأمل",
      ritualEn: "Charge crystals, moon bath, set big intentions, meditation",
      nextDate: "October 17, 2026",
      color: "from-yellow-600/10 via-amber-950/20 to-transparent",
      glowColor: "rgba(245, 158, 11, 0.15)"
    },
    {
      id: "mercury-retrograde",
      nameEn: "☿ Mercury Retrograde",
      nameAr: "☿ تراجع عطارد",
      symbol: "☿",
      spiritualMeaningAr: "... يُنظر إلى تراجع عطارد في الممارسات الروحية كدعوة للتباطؤ والمراجعة بدلاً من الاندفاع إلى الأمام ...",
      spiritualMeaningEn: "Mercury Retrograde is seen in spiritual practices as an invitation to slow down and review rather than rush forward...",
      effectsAr: "تباطل ومراجعة، إعادة تقييم، اكتمال غير المكتمل، وعي، تأمل",
      effectsEn: "Slowing down and review, reassessment, completing unfinished business, awareness, reflection",
      ritualAr: "مراجعة الماضي، تدوين التأملات، إكمال المشاريع القديمة، راحة",
      ritualEn: "Review the past, journal reflections, complete old projects, rest",
      nextDate: "August 5 - 28, 2026",
      color: "from-emerald-950/20 via-teal-900/10 to-transparent",
      glowColor: "rgba(16, 185, 129, 0.12)"
    },
    {
      id: "summer-solstice",
      nameEn: "☀️ Summer Solstice",
      nameAr: "☀️ الانقلاب الصيفي",
      symbol: "🌞",
      spiritualMeaningAr: "... الانقلاب الصيفي يمثل ذروة النور والقوة والحيوية ...",
      spiritualMeaningEn: "The Summer Solstice represents the peak of light, power, and vitality...",
      effectsAr: "ذروة النور والقوة، وفرة، احتفال، تجلي واعي، شكر وامتنان",
      effectsEn: "Peak of light and power, abundance, celebration, conscious manifestation, gratitude",
      ritualAr: "تأمل شروق الشمس، احتفال النار، احتفال الطبيعة، شحن شمسي",
      ritualEn: "Sunrise meditation, bonfire ceremony, nature celebration, solar charging",
      nextDate: "June 21, 2026",
      color: "from-red-950/20 via-orange-900/10 to-transparent",
      glowColor: "rgba(239, 68, 68, 0.15)"
    },
    {
      id: "winter-solstice",
      nameEn: "❄️ Winter Solstice",
      nameAr: "❄️ الانقلاب الشتوي",
      symbol: "❄️",
      spiritualMeaningAr: "... الانقلاب الشتوي يمثل أعمق نقطة في الظلام قبل عودة النور ...",
      spiritualMeaningEn: "The Winter Solstice represents the deepest point of darkness before the return of light...",
      effectsAr: "ظلام عميق، موت رمزي، ولادة جديدة، سكون وتأمل، بذور المستقبل",
      effectsEn: "Deep darkness, symbolic death, rebirth, stillness and meditation, future seeds",
      ritualAr: "احتفالات الشموع، تدوين الأحلام، تأمل الظلام، نوايا البذور",
      ritualEn: "Candle ceremonies, journal dreams, darkness meditation, seed intentions",
      nextDate: "December 21, 2026",
      color: "from-indigo-950/30 via-blue-950/20 to-transparent",
      glowColor: "rgba(99, 102, 241, 0.12)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010314] via-[#020725] to-[#00020f] overflow-hidden relative font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Deep Nebula */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [-20, 20, -20],
          y: [-10, 15, -10]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-purple-800/20 to-cyan-800/10 rounded-full blur-[120px] top-1/4 left-1/4 pointer-events-none z-0"
      />

      {/* Stellar Matrix */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(140)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              width: Math.random() * 1.5 + 0.5 + 'px',
              height: Math.random() * 1.5 + 0.5 + 'px',
              backgroundColor: i % 3 === 0 ? '#c084fc' : i % 4 === 0 ? '#22d3ee' : '#ffffff',
              animation: 'twinkle ' + (Math.random() * 3 + 2) + 's ease-in-out infinite',
              animationDelay: Math.random() * 4 + 's'
            }}
          />
        ))}
      </div>

      {/* Cosmic Toast Notification System */}
      <AnimatePresence>
        {showReminderToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#040a25]/95 backdrop-blur-xl px-6 py-4 rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.25)] border border-cyan-500/30 text-center max-w-md w-[90%]"
          >
            <p className="text-cyan-200 text-xs font-light tracking-wide leading-relaxed">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Interface Anchors */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center relative z-30">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="text-cyan-500/40 hover:text-cyan-300 transition-all duration-300 flex items-center gap-2 text-[10px] tracking-[0.2em] bg-[#020518]/60 backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500/10"
        >
          ← {language === 'en' ? 'RETURN TO ORBIT' : 'العودة إلى الفضاء'}
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={toggleLanguage}
          className="px-4 py-2 bg-[#020518]/60 backdrop-blur-md rounded-lg text-cyan-400 text-[11px] font-medium tracking-widest hover:text-cyan-200 hover:border-cyan-500/40 transition-all duration-300 border border-cyan-500/10"
        >
          {language === 'en' ? 'العربية' : 'ENGLISH'}
        </motion.button>
      </div>

      {/* Cosmic Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-8 pb-12 relative z-10"
      >
        <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.3em] text-transparent bg-gradient-to-r from-slate-200 via-cyan-200 to-slate-400 bg-clip-text drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          {language === 'en' ? 'CELESTIAL WISDOM' : 'تقويم الطاقة الكونية'}
        </h1>
        <p className="text-cyan-500/30 text-[9px] tracking-[0.4em] mt-3 uppercase">
          {language === 'en' ? 'Spiritual Astronomy Library' : 'دليل علم الفلك الروحي'}
        </p>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Calendar Grid Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cosmicEvents.map((event, idx) => {
            const registeredEmail = reminders[event.id];
            const isInputOpen = activeInputId === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.6 }}
                whileHover={!isInputOpen ? { y: -4, boxShadow: `0 10px 30px ${event.glowColor}` } : {}}
                onClick={() => !isInputOpen && setSelectedEvent(event)}
                className={`bg-gradient-to-b ${event.color} bg-[#03071c]/30 backdrop-blur-md rounded-xl p-6 border border-slate-800/60 hover:border-cyan-500/30 transition-all duration-500 cursor-pointer relative group overflow-hidden`}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-300">
                      {event.symbol}
                    </span>
                    <h3 className="text-slate-200 font-light text-base tracking-wide group-hover:text-cyan-300 transition-colors duration-300">
                      {language === 'en' ? event.nameEn.replace(/[^a-zA-Z ]/g, "") : event.nameAr.replace(/[^\u0621-\u064A ]/g, "")}
                    </h3>
                  </div>
                  
                  {registeredEmail && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                  )}
                </div>

                <p className="text-slate-400/80 text-xs font-light leading-relaxed line-clamp-3 mb-6 h-12">
                  {language === 'en' ? event.spiritualMeaningEn : event.spiritualMeaningAr}
                </p>

                {/* Inline Email Forms Drawer Expansion */}
                <AnimatePresence initial={false}>
                  {isInputOpen && (
                    <motion.form
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                      onSubmit={(e) => handleSubscribe(e, event.id, event.nameEn, event.nameAr)}
                      className="overflow-hidden mb-4 space-y-2 pt-2 border-t border-slate-900/40"
                    >
                      <label className="block text-[9px] text-cyan-400/60 uppercase tracking-widest">
                        {language === 'en' ? 'Enter Email Destination:' : 'أدخل بريدك الإلكتروني لمتابعة التحول:'}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          required
                          placeholder="name@universe.com"
                          value={emailInputs[event.id] || ''}
                          onChange={(e) => setEmailInputs({ ...emailInputs, [event.id]: e.target.value })}
                          className="bg-[#010416]/90 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/40 flex-1 font-light placeholder:text-slate-700"
                        />
                        <button
                          type="submit"
                          className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-md px-3 text-xs font-light hover:bg-cyan-500/30 transition-colors"
                        >
                          ✔
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                <div className="pt-3 border-t border-slate-900/60 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 tracking-wider">
                    {event.nextDate}
                  </span>
                  
                  {registeredEmail ? (
                    <button
                      onClick={(e) => removeReminder(e, event.id)}
                      className="px-3 py-1 rounded-md transition-all duration-300 tracking-wide font-light bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:border-red-500/30 hover:text-red-400"
                      title={registeredEmail}
                    >
                      {language === 'en' ? 'Aligned ✓' : 'متصل بالبريد ✓'}
                    </button>
                  ) : (
                    <button
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setActiveInputId(isInputOpen ? null : event.id);
                      }}
                      className={`px-3 py-1 rounded-md transition-all duration-300 tracking-wide font-light ${
                        isInputOpen 
                          ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                          : 'bg-transparent text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/20'
                      }`}
                    >
                      {isInputOpen ? (language === 'en' ? 'Cancel' : 'إلغاء') : (language === 'en' ? 'Align Energy' : 'تذكير بالبريد')}
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Expanded Modal Window */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#01020a]/85 backdrop-blur-lg p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#030616]/90 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 md:p-8 custom-scrollbar"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-5 right-5 text-slate-500 hover:text-cyan-400 transition-colors text-lg"
              >
                ✕
              </button>

              <div className="text-center mb-8">
                <div className="text-4xl mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">{selectedEvent.symbol}</div>
                <h2 className="text-xl md:text-2xl font-light tracking-wide text-slate-200">
                  {language === 'en' ? selectedEvent.nameEn : selectedEvent.nameAr}
                </h2>
                <p className="text-cyan-500/40 text-[9px] tracking-widest mt-1 uppercase">Next Meridian Focus: {selectedEvent.nextDate}</p>
              </div>

              <div className="space-y-6">
                <div className="bg-[#050922]/50 rounded-xl p-5 border border-slate-900">
                  <h4 className="text-cyan-400/60 text-[10px] tracking-widest uppercase mb-2">
                    {language === 'en' ? '✦ Cosmic Resonance' : '✦ الحكمة الكونية'}
                  </h4>
                  <p className="text-slate-300 font-light text-xs md:text-sm leading-relaxed whitespace-pre-line">
                    {language === 'en' ? selectedEvent.spiritualMeaningEn : selectedEvent.spiritualMeaningAr}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#050922]/50 rounded-xl p-4 border border-slate-900">
                    <h4 className="text-purple-400/60 text-[10px] tracking-widest uppercase mb-2">
                      {language === 'en' ? '⚡ Dimensional Influx' : '⚡ التأثيرات الطاقية'}
                    </h4>
                    <p className="text-slate-300 font-light text-xs leading-relaxed">
                      {language === 'en' ? selectedEvent.effectsEn : selectedEvent.effectsAr}
                    </p>
                  </div>
                  
                  <div className="bg-[#050922]/50 rounded-xl p-4 border border-slate-900">
                    <h4 className="text-amber-500/60 text-[10px] tracking-widest uppercase mb-2">
                      {language === 'en' ? '🕯️ Integration Act' : '🕯️ العمل الروحي'}
                    </h4>
                    <p className="text-slate-300 font-light text-xs leading-relaxed">
                      {language === 'en' ? selectedEvent.ritualEn : selectedEvent.ritualAr}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-900 flex justify-between items-center">
                <p className="text-slate-600 text-[9px] tracking-wider italic">
                  {language === 'en' ? 'As above, so below.' : 'كما في السماء، كذلك على الأرض.'}
                </p>
                <button
                  onClick={(e) => {
                    setSelectedEvent(null);
                    setActiveInputId(selectedEvent.id);
                  }}
                  className={`text-xs px-4 py-1.5 rounded-lg transition-all duration-300 ${
                    reminders[selectedEvent.id]
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-transparent text-slate-400 hover:text-cyan-400 border border-slate-800'
                  }`}
                >
                  {reminders[selectedEvent.id] ? (language === 'en' ? 'Configured' : 'مؤقّت') : (language === 'en' ? 'Setup Transmission' : 'ضبط التذكير')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.25); }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 999px;
        }
      `}</style>
    </div>
  )
}