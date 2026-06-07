'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function NumerologyPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState('mirror-hours')
  const [selectedItem, setSelectedItem] = useState(null)

  // Mirror Hours (الأوقات المتطابقة)
  const mirrorHours = [
    { time: "00:00", meaningAr: "بداية جديدة، دورة تنتهي وأخرى تبدأ، إمكانيات غير محدودة", meaningEn: "New beginning, one cycle ends and another begins, unlimited possibilities" },
    { time: "01:01", meaningAr: "الاستقلالية، الثقة بالنفس، بداية فكرة جديدة", meaningEn: "Independence, self-confidence, beginning of a new idea" },
    { time: "02:02", meaningAr: "الشراكات، التوازن، الصبر والثقة بالمسار", meaningEn: "Partnerships, balance, patience and trust in the path" },
    { time: "03:03", meaningAr: "الإبداع، التعبير عن الذات، دعم روحي", meaningEn: "Creativity, self-expression, spiritual support" },
    { time: "04:04", meaningAr: "الحماية، الاستقرار، بناء أساس قوي", meaningEn: "Protection, stability, building a strong foundation" },
    { time: "05:05", meaningAr: "التغيير، المغامرة، التحرر من القديم", meaningEn: "Change, adventure, liberation from the old" },
    { time: "06:06", meaningAr: "الحب، العائلة، التوازن العاطفي", meaningEn: "Love, family, emotional balance" },
    { time: "07:07", meaningAr: "اليقظة الروحية، الحكمة، التطور الداخلي", meaningEn: "Spiritual awakening, wisdom, inner development" },
    { time: "08:08", meaningAr: "الوفرة، النجاح المادي، القوة الشخصية", meaningEn: "Abundance, material success, personal power" },
    { time: "09:09", meaningAr: "النهايات، إغلاق دورة، خدمة الآخرين", meaningEn: "Endings, closing a cycle, serving others" },
    { time: "10:10", meaningAr: "الانسجام مع القدر، التقدم للأمام", meaningEn: "Harmony with destiny, moving forward" },
    { time: "11:11", meaningAr: "الصحوة الروحية، تجليات قوية، بوابة طاقية", meaningEn: "Spiritual awakening, powerful manifestations, energetic gateway" },
    { time: "12:12", meaningAr: "النمو والتطور والانتقال لمرحلة جديدة", meaningEn: "Growth, development, transition to a new stage" },
    { time: "13:13", meaningAr: "التحول العميق والتخلص من الأنماط القديمة", meaningEn: "Deep transformation, releasing old patterns" },
    { time: "14:14", meaningAr: "التوازن أثناء التغيير", meaningEn: "Balance during change" },
    { time: "15:15", meaningAr: "تحولات عاطفية وعلاقات مهمة", meaningEn: "Emotional transformations and important relationships" },
    { time: "16:16", meaningAr: "تحطيم الأنا وإعادة بناء الذات", meaningEn: "Ego destruction and self-rebuilding" },
    { time: "17:17", meaningAr: "الثقة بالحدس وتحقيق الأهداف", meaningEn: "Trusting intuition and achieving goals" },
    { time: "18:18", meaningAr: "الوفرة المرتبطة بالخدمة والعطاء", meaningEn: "Abundance linked to service and giving" },
    { time: "19:19", meaningAr: "اكتمال مرحلة والاستعداد للبداية القادمة", meaningEn: "Completing a stage and preparing for the next beginning" },
    { time: "20:20", meaningAr: "الصبر، الإيمان، انتظار التوقيت المناسب", meaningEn: "Patience, faith, waiting for the right timing" },
    { time: "21:21", meaningAr: "نجاح قريب وتحقيق نتائج", meaningEn: "Upcoming success and achieving results" },
    { time: "22:22", meaningAr: "بناء الأحلام الكبيرة وتحويل الرؤى إلى واقع", meaningEn: "Building big dreams and turning visions into reality" },
    { time: "23:23", meaningAr: "دعم روحي وتشجيع على مواصلة الطريق", meaningEn: "Spiritual support and encouragement to continue the path" }
  ]

  // Single Numbers (الأرقام المفردة)
  const singleNumbers = [
    { number: "0", meaningAr: "الوحدة، المصدر، الإمكانيات اللانهائية", meaningEn: "Unity, source, infinite possibilities" },
    { number: "1", meaningAr: "القيادة والبدايات، الاستقلال، المبادرة، الإرادة، الشجاعة", meaningEn: "Leadership and beginnings, independence, initiative, will, courage" },
    { number: "2", meaningAr: "التوازن والشراكات، التعاون، الدبلوماسية، الحساسية", meaningEn: "Balance and partnerships, cooperation, diplomacy, sensitivity" },
    { number: "3", meaningAr: "الإبداع والتعبير، التواصل، الفرح، التعبير الفني", meaningEn: "Creativity and expression, communication, joy, artistic expression" },
    { number: "4", meaningAr: "الاستقرار والأسس، النظام، الانضباط، العمل الجاد", meaningEn: "Stability and foundations, order, discipline, hard work" },
    { number: "5", meaningAr: "الحرية والتغيير، المغامرة، التجربة، التحرر", meaningEn: "Freedom and change, adventure, experience, liberation" },
    { number: "6", meaningAr: "الح الحب والعائلة، المسؤولية، الرعاية، التوازن العاطفي", meaningEn: "Love and family, responsibility, care, emotional balance" },
    { number: "7", meaningAr: "الروحانية والحكمة، التأمل، البحث عن الحقيقة", meaningEn: "Spirituality and wisdom, meditation, searching for truth" },
    { number: "8", meaningAr: "القوة والوفرة، النجاح، السلطة، الوفرة المادية", meaningEn: "Power and abundance, success, authority, material abundance" },
    { number: "9", meaningAr: "الإكمال والخدمة الإنسانية، الرحمة، الحكمة", meaningEn: "Completion and humanitarian service, compassion, wisdom" }
  ]

  // Master Numbers (الأرقام الرئيسية)
  const masterNumbers = [
    { number: "11", meaningAr: "الحدس العالي، الإلهام، الصحوة الروحية", meaningEn: "High intuition, inspiration, spiritual awakening" },
    { number: "22", meaningAr: "البنّاء العظيم، تحويل الأحلام إلى واقع", meaningEn: "Great builder, turning dreams into reality" },
    { number: "33", meaningAr: "المعلم الروحي، الشفاء، الحب غير المشروط", meaningEn: "Spiritual teacher, healing, unconditional love" },
    { number: "44", meaningAr: "الثبات والقوة وتحقيق الإنجازات الكبيرة", meaningEn: "Stability, strength, achieving great accomplishments" },
    { number: "55", meaningAr: "التحرر والتغيير الجذري", meaningEn: "Liberation and radical change" },
    { number: "66", meaningAr: "الخدمة والمحبة والانسجام", meaningEn: "Service, love, and harmony" },
    { number: "77", meaningAr: "الحكمة الباطنية والتطور الروحي", meaningEn: "Inner wisdom and spiritual development" },
    { number: "88", meaningAr: "الوفرة والقوة الشخصية", meaningEn: "Abundance and personal power" },
    { number: "99", meaningAr: "إكمال الدورات الكارمية", meaningEn: "Completing karmic cycles" }
  ]

  // Double Numbers (الأرقام المتكررة الثنائية)
  const doubleNumbers = [
    { number: "00", meaningAr: "الفراغ الخلاّق، الإمكانيات اللامحدودة", meaningEn: "Creative void, unlimited possibilities" },
    { number: "11", meaningAr: "الحدس، الإلهام، البدايات", meaningEn: "Intuition, inspiration, beginnings" },
    { number: "22", meaningAr: "البناء والتجسيد وتحقيق الأحلام", meaningEn: "Building, embodiment, dream manifestation" },
    { number: "33", meaningAr: "المعلم الروحي، الرحمة، الشفاء", meaningEn: "Spiritual teacher, compassion, healing" },
    { number: "44", meaningAr: "الحماية والاستقرار", meaningEn: "Protection and stability" },
    { number: "55", meaningAr: "التغيير والتحرر", meaningEn: "Change and liberation" },
    { number: "66", meaningAr: "الحب والعائلة والتناغم", meaningEn: "Love, family, and harmony" },
    { number: "77", meaningAr: "الحكمة والتطور الروحي", meaningEn: "Wisdom and spiritual development" },
    { number: "88", meaningAr: "الوفرة والقوة", meaningEn: "Abundance and power" },
    { number: "99", meaningAr: "الإكمال والنهايات", meaningEn: "Completion and endings" }
  ]

  // Triple Numbers (الأرقام الثلاثية)
  const tripleNumbers = [
    { number: "111", meaningAr: "تجليات سريعة، انتبهي لأفكارك", meaningEn: "Quick manifestations, pay attention to your thoughts" },
    { number: "222", meaningAr: "الثقة والصبر والتوازن", meaningEn: "Trust, patience, and balance" },
    { number: "333", meaningAr: "دعم روحي وإبداع", meaningEn: "Spiritual support and creativity" },
    { number: "444", meaningAr: "أنتِ محاطة بالحماية والدعم", meaningEn: "You are surrounded by protection and support" },
    { number: "555", meaningAr: "تغييرات كبيرة قادمة", meaningEn: "Big changes coming" },
    { number: "666", meaningAr: "إعادة التوازن بين الروح والمادة", meaningEn: "Reconnecting balance between spirit and matter" },
    { number: "777", meaningAr: "نمو روحي قوي", meaningEn: "Strong spiritual growth" },
    { number: "888", meaningAr: "وفرة ونجاح", meaningEn: "Abundance and success" },
    { number: "999", meaningAr: "اكتمال دورة مهمة", meaningEn: "Completion of an important cycle" }
  ]

  // Quadruple Numbers (الأرقام الرباعية)
  const quadrupleNumbers = [
    { number: "1111", meaningAr: "بوابة صحوة وتجليات قوية", meaningEn: "Gateway of awakening and powerful manifestations" },
    { number: "2222", meaningAr: "انسجام وثقة بالمسار الإلهي", meaningEn: "Harmony and trust in the divine path" },
    { number: "3333", meaningAr: "توسع روحي وإبداعي", meaningEn: "Spiritual and creative expansion" },
    { number: "4444", meaningAr: "حماية واستقرار قويان", meaningEn: "Strong protection and stability" },
    { number: "5555", meaningAr: "تحول جذري", meaningEn: "Radical transformation" },
    { number: "6666", meaningAr: "إعادة تنظيم الحياة", meaningEn: "Life reorganization" },
    { number: "7777", meaningAr: "حكمة ومعرفة عميقة", meaningEn: "Wisdom and deep knowledge" },
    { number: "8888", meaningAr: "وفرة مضاعفة", meaningEn: "Doubled abundance" },
    { number: "9999", meaningAr: "إغلاق فصل كامل من الحياة", meaningEn: "Closing a complete chapter of life" }
  ]

  // Life Path Numbers (رقم مسار الحياة)
  const lifePathNumbers = [
    { number: "1", nameAr: "القائد", nameEn: "The Leader", meaningAr: "القائد، المستقل، المبتكر", meaningEn: "Leader, independent, innovative" },
    { number: "2", nameAr: "الوسيط", nameEn: "The Mediator", meaningAr: "الوسيط، الدبلوماسي، الحساس", meaningEn: "Mediator, diplomat, sensitive" },
    { number: "3", nameAr: "الفنان", nameEn: "The Artist", meaningAr: "الفنان، المبدع، المتحدث", meaningEn: "Artist, creative, speaker" },
    { number: "4", nameAr: "البنّاء", nameEn: "The Builder", meaningAr: "البنّاء، المنظم، العملي", meaningEn: "Builder, organizer, practical" },
    { number: "5", nameAr: "المستكشف", nameEn: "The Explorer", meaningAr: "المستكشف، الحر، المغامر", meaningEn: "Explorer, free, adventurous" },
    { number: "6", nameAr: "الراعي", nameEn: "The Nurturer", meaningAr: "الراعي، المعالج، المحب", meaningEn: "Nurturer, healer, loving" },
    { number: "7", nameAr: "الباحث", nameEn: "The Seeker", meaningAr: "الباحث، الحكيم، الروحاني", meaningEn: "Seeker, wise, spiritual" },
    { number: "8", nameAr: "المدير", nameEn: "The Manager", meaningAr: "المدير، صاحب النفوذ، صانع النجاح", meaningEn: "Manager, influential, success-maker" },
    { number: "9", nameAr: "الإنساني", nameEn: "The Humanitarian", meaningAr: "الإنساني، المعلم، صاحب الرسالة", meaningEn: "Humanitarian, teacher, messenger" },
    { number: "11", nameAr: "الرسول الروحي", nameEn: "The Spiritual Messenger", meaningAr: "الرسول الروحي، الحدس العالي", meaningEn: "Spiritual messenger, high intuition" },
    { number: "22", nameAr: "البنّاء العظيم", nameEn: "The Master Builder", meaningAr: "البنّاء العظيم، تحويل الأحلام إلى واقع", meaningEn: "Master builder, turning dreams into reality" },
    { number: "33", nameAr: "المعلم الشافي", nameEn: "The Healing Teacher", meaningAr: "المعلم الشافي، الحب غير المشروط", meaningEn: "Healing teacher, unconditional love" }
  ]

  // Karmic Numbers (الأرقام الكارمية)
  const karmicNumbers = [
    { number: "13", meaningAr: "التحول من خلال الجهد والانضباط", meaningEn: "Transformation through effort and discipline" },
    { number: "14", meaningAr: "تعلم الاعتدال والسيطرة على الرغبات", meaningEn: "Learning moderation and controlling desires" },
    { number: "16", meaningAr: "انهيار الأوهام وإعادة بناء الذات", meaningEn: "Breaking illusions and self-rebuilding" },
    { number: "19", meaningAr: "تعلم الاستقلال وتحمل المسؤولية", meaningEn: "Learning independence and taking responsibility" }
  ]

  // Number-Planet Relationship
  const numberPlanets = [
    { number: "1", planetAr: "الشمس", planetEn: "Sun", symbol: "☀️" },
    { number: "2", planetAr: "القمر", planetEn: "Moon", symbol: "🌙" },
    { number: "3", planetAr: "المشتري", planetEn: "Jupiter", symbol: "♃" },
    { number: "4", planetAr: "أورانوس", planetEn: "Uranus", symbol: "♅" },
    { number: "5", planetAr: "عطارد", planetEn: "Mercury", symbol: "☿" },
    { number: "6", planetAr: "الزهرة", planetEn: "Venus", symbol: "♀" },
    { number: "7", planetAr: "نبتون", planetEn: "Neptune", symbol: "♆" },
    { number: "8", planetAr: "زحل", planetEn: "Saturn", symbol: "♄" },
    { number: "9", planetAr: "المريخ", planetEn: "Mars", symbol: "♂" }
  ]

  const abundanceNumbers = ["8", "17", "26", "35", "44", "88", "808", "888", "8888"]
  const loveNumbers = ["2", "6", "15", "24", "33", "66", "222", "444", "717"]
  const spiritualNumbers = ["7", "11", "22", "33", "77", "111", "777", "1111", "1212", "1717", "7171"]

  const renderContent = () => {
    const gridStyle = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    const cardBaseStyle = "backdrop-blur-md bg-black/40 rounded-xl p-4 border transition-all duration-500 cursor-pointer text-center relative overflow-hidden group shadow-lg"

    switch(activeTab) {
      case 'mirror-hours':
        return (
          <div className={gridStyle}>
            {mirrorHours.map((item, idx) => (
              <motion.div key={item.time} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.015 }} whileHover={{ y: -4 }} onClick={() => setSelectedItem({ ...item, type: 'mirror-hour' })} className={`${cardBaseStyle} border-cyan-500/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]`}>
                <div className="text-2xl font-mono font-bold tracking-widest text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">{item.time}</div>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2 group-hover:text-gray-200 transition-colors">{language === 'en' ? item.meaningEn : item.meaningAr}</p>
              </motion.div>
            ))}
          </div>
        )
      case 'single-numbers':
        return (
          <div className={gridStyle}>
            {singleNumbers.map((item, idx) => (
              <motion.div key={item.number} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.02 }} whileHover={{ y: -4 }} onClick={() => setSelectedItem({ ...item, type: 'single' })} className={`${cardBaseStyle} border-blue-500/10 hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]`}>
                <div className="text-4xl font-extrabold text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">{item.number}</div>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2 group-hover:text-gray-200 transition-colors">{language === 'en' ? item.meaningEn : item.meaningAr}</p>
              </motion.div>
            ))}
          </div>
        )
      case 'master-numbers':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {masterNumbers.map((item, idx) => (
              <motion.div key={item.number} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} whileHover={{ y: -4 }} onClick={() => setSelectedItem({ ...item, type: 'master' })} className={`${cardBaseStyle} border-purple-500/10 hover:border-purple-400/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]`}>
                <div className="text-4xl font-black text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">{item.number}</div>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2 group-hover:text-gray-200 transition-colors">{language === 'en' ? item.meaningEn : item.meaningAr}</p>
              </motion.div>
            ))}
          </div>
        )
      case 'double-numbers':
        return (
          <div className={gridStyle}>
            {doubleNumbers.map((item, idx) => (
              <motion.div key={item.number} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.02 }} whileHover={{ y: -4 }} onClick={() => setSelectedItem({ ...item, type: 'double' })} className={`${cardBaseStyle} border-emerald-500/10 hover:border-emerald-400/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]`}>
                <div className="text-3xl font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">{item.number}</div>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2 group-hover:text-gray-200 transition-colors">{language === 'en' ? item.meaningEn : item.meaningAr}</p>
              </motion.div>
            ))}
          </div>
        )
      case 'triple-numbers':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tripleNumbers.map((item, idx) => (
              <motion.div key={item.number} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} whileHover={{ y: -4 }} onClick={() => setSelectedItem({ ...item, type: 'triple' })} className={`${cardBaseStyle} border-amber-500/10 hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]`}>
                <div className="text-3xl font-bold text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">{item.number}</div>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2 group-hover:text-gray-200 transition-colors">{language === 'en' ? item.meaningEn : item.meaningAr}</p>
              </motion.div>
            ))}
          </div>
        )
      case 'quadruple-numbers':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quadrupleNumbers.map((item, idx) => (
              <motion.div key={item.number} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} whileHover={{ y: -4 }} onClick={() => setSelectedItem({ ...item, type: 'quadruple' })} className={`${cardBaseStyle} border-rose-500/10 hover:border-rose-400/40 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]`}>
                <div className="text-3xl font-bold text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">{item.number}</div>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2 group-hover:text-gray-200 transition-colors">{language === 'en' ? item.meaningEn : item.meaningAr}</p>
              </motion.div>
            ))}
          </div>
        )
      case 'life-path':
        return (
          <div className={gridStyle}>
            {lifePathNumbers.map((item, idx) => (
              <motion.div key={item.number} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.025 }} whileHover={{ y: -4 }} onClick={() => setSelectedItem({ ...item, type: 'life-path' })} className={`${cardBaseStyle} border-indigo-500/10 hover:border-indigo-400/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]`}>
                <div className="text-4xl font-extrabold text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]">{item.number}</div>
                <div className="text-cyan-300 text-[11px] font-medium tracking-wider mt-1">{language === 'en' ? item.nameEn : item.nameAr}</div>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2 group-hover:text-gray-200 transition-colors">{language === 'en' ? item.meaningEn : item.meaningAr}</p>
              </motion.div>
            ))}
          </div>
        )
      case 'karmic':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {karmicNumbers.map((item, idx) => (
              <motion.div key={item.number} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} whileHover={{ y: -4 }} onClick={() => setSelectedItem({ ...item, type: 'karmic' })} className={`${cardBaseStyle} border-slate-600/10 hover:border-slate-400/40 hover:shadow-[0_0_20px_rgba(148,163,184,0.15)]`}>
                <div className="text-4xl font-bold text-slate-300 drop-shadow-[0_0_8px_rgba(148,163,184,0.4)]">{item.number}</div>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2 group-hover:text-gray-200 transition-colors">{language === 'en' ? item.meaningEn : item.meaningAr}</p>
              </motion.div>
            ))}
          </div>
        )
      case 'special-numbers':
        return (
          <div className="space-y-6">
            <div className="backdrop-blur-md bg-black/30 rounded-2xl p-5 border border-amber-500/10 hover:border-amber-500/20 transition-all duration-300">
              <h3 className="text-amber-400 text-base font-medium mb-4 flex items-center gap-2 tracking-wide">✨ {language === 'en' ? 'Abundance Numbers' : 'أرقام الوفرة'}</h3>
              <div className="flex flex-wrap gap-2.5">
                {abundanceNumbers.map(num => <span key={num} className="px-4 py-1.5 bg-amber-500/5 hover:bg-amber-500/10 rounded-full text-amber-300 font-mono text-base border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.05)] transition-colors">{num}</span>)}
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 rounded-2xl p-5 border border-pink-500/10 hover:border-pink-500/20 transition-all duration-300">
              <h3 className="text-pink-400 text-base font-medium mb-4 flex items-center gap-2 tracking-wide">✨ {language === 'en' ? 'Love Numbers' : 'أرقام الحب'}</h3>
              <div className="flex flex-wrap gap-2.5">
                {loveNumbers.map(num => <span key={num} className="px-4 py-1.5 bg-pink-500/5 hover:bg-pink-500/10 rounded-full text-pink-300 font-mono text-base border border-pink-500/20 shadow-[0_0_10px_rgba(244,63,94,0.05)] transition-colors">{num}</span>)}
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 rounded-2xl p-5 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
              <h3 className="text-purple-400 text-base font-medium mb-4 flex items-center gap-2 tracking-wide">✨ {language === 'en' ? 'Spiritual Awakening Numbers' : 'أرقام الصحوة الروحية'}</h3>
              <div className="flex flex-wrap gap-2.5">
                {spiritualNumbers.map(num => <span key={num} className="px-4 py-1.5 bg-purple-500/5 hover:bg-purple-500/10 rounded-full text-purple-300 font-mono text-base border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.05)] transition-colors">{num}</span>)}
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 rounded-2xl p-5 border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300">
              <h3 className="text-cyan-400 text-base font-medium mb-4 flex items-center gap-2 tracking-wide">✨ {language === 'en' ? 'Numbers & Planets' : 'الأرقام والكواكب'}</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {numberPlanets.map(item => (
                  <div key={item.number} className="text-center p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/10 hover:border-cyan-400/30 transition-all">
                    <div className="text-cyan-300 font-bold text-xl mb-1">{item.number} <span className="text-sm opacity-80">{item.symbol}</span></div>
                    <div className="text-gray-400 text-[11px] tracking-wide">{language === 'en' ? item.planetEn : item.planetAr}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const tabs = [
    { id: 'mirror-hours', nameEn: 'Mirror Hours', nameAr: 'الأوقات المتطابقة' },
    { id: 'single-numbers', nameEn: 'Single Numbers', nameAr: 'الأرقام المفردة' },
    { id: 'master-numbers', nameEn: 'Master Numbers', nameAr: 'الأرقام الرئيسية' },
    { id: 'double-numbers', nameEn: 'Double Numbers', nameAr: 'الأرقام المتكررة' },
    { id: 'triple-numbers', nameEn: 'Triple Numbers', nameAr: 'الأرقام الثلاثية' },
    { id: 'quadruple-numbers', nameEn: 'Quadruple Numbers', nameAr: 'الأرقام الرباعية' },
    { id: 'life-path', nameEn: 'Life Path', nameAr: 'مسار الحياة' },
    { id: 'karmic', nameEn: 'Karmic Numbers', nameAr: 'الأرقام الكارمية' },
    { id: 'special-numbers', nameEn: 'Special Numbers', nameAr: 'أرقام خاصة' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020412] via-[#04071d] to-[#01020a] overflow-hidden relative font-sans text-gray-200 selection:bg-purple-500/30">
      
      {/* Astral Cosmic Dust Glow Backgrounds */}
      <div className="absolute top-[20%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/5 blur-[140px] pointer-events-none animate-pulse-slow delay-1000" />

      {/* Sparkling Starfield */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(120)].map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{ left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', width: Math.random() * 1.5 + 0.5 + 'px', height: Math.random() * 1.5 + 0.5 + 'px', backgroundColor: '#e2e8f0', animation: 'twinkle ' + (Math.random() * 3 + 2) + 's ease-in-out infinite' }} />
        ))}
      </div>

      {/* Header Interactivity */}
      <motion.button initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} onClick={() => router.push("/")} className="fixed top-6 left-6 z-30 text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 text-xs tracking-widest bg-white/5 hover:bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
        ← {language === 'en' ? '← ← ← ← BACK TO ECLIPSE' : 'العودة إلى الفضاء'}
      </motion.button>
      
      <button onClick={toggleLanguage} className="fixed top-6 right-6 z-30 px-5 py-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 text-xs tracking-wider hover:text-white transition-all duration-300 border border-white/5 backdrop-blur-md">
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Hero Header Section */}
      <div className="text-center pt-20 pb-8 relative z-10">
        <div className="inline-flex items-center gap-1 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 mb-4 text-sm text-cyan-400/80 tracking-widest backdrop-blur-md animate-float">
          <span>🌌</span> {language === 'en' ? 'ASTRAL GEOMETRY' : 'الهندسة الكونية'} <span>✨</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.25em] text-transparent bg-gradient-to-r from-gray-100 via-cyan-200 to-gray-100 bg-clip-text drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          {language === 'en' ? 'NUMEROLOGY' : 'علم الأعداد'}
        </h1>
        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mx-auto mt-4" />
        <p className="text-cyan-400/40 text-[10px] font-medium tracking-[0.35em] mt-3 uppercase">{language === 'en' ? 'The Mystical Language of Cosmic Vibrations' : 'اللغة الغامضة للاعلوية والترددات'}</p>
      </div>

      {/* Navigation Cosmic Tabs */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4 pb-28">
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto bg-black/20 p-2 rounded-3xl border border-white/5 backdrop-blur-md">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}>
              {language === 'en' ? tab.nameEn : tab.nameAr}
            </button>
          ))}
        </div>

        {/* Dynamically Loaded Grid Elements */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Deep Space Modal Focus popup */}
      <AnimatePresence>
        {selectedItem && (          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4" onClick={() => setSelectedItem(null)}>            <motion.div initial={{ scale: 0.95, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 15 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md bg-[#040614] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-lg">✕</button>
              <div className="text-center mb-6">
                <div className="text-6xl font-black text-transparent bg-gradient-to-b from-white to-gray-400 bg-clip-text font-mono tracking-tighter mb-2">{selectedItem.time || selectedItem.number}</div>
                {selectedItem.type === 'life-path' && <div className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">{language === 'en' ? selectedItem.nameEn : selectedItem.nameAr}</div>}
                <div className="w-8 h-[1px] bg-gray-700 mx-auto mt-4" />
              </div>
              <p className="text-gray-300 text-center text-sm md:text-base leading-relaxed tracking-wide px-2">{language === 'en' ? selectedItem.meaningEn : selectedItem.meaningAr}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle { 0%,100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 0.9; transform: scale(1.2); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes pulseSlow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.05); } }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  )
}