'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function PlantPlanet() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [hoveredPlant, setHoveredPlant] = useState(null)

  // Plant categories
  const categories = {
    all: { nameEn: "🌿 All Plants", nameAr: "🌿 جميع النباتات", icon: "🌿" },
    healing: { nameEn: "🌿 Healing & Energy", nameAr: "🌿 الشفاء والطاقة", icon: "🌿" },
    love: { nameEn: "🌸 Love & Emotion", nameAr: "🌸 الحب والعاطفة", icon: "🌸" },
    trees: { nameEn: "🌳 Spiritual Trees", nameAr: "🌳 الأشجار الروحية", icon: "🌳" },
    protection: { nameEn: "🛡️ Protection", nameAr: "🛡️ الحماية", icon: "🛡️" },
    abundance: { nameEn: "🌾 Abundance", nameAr: "🌾 الوفرة", icon: "🌾" },
    transformation: { nameEn: "🦋 Transformation", nameAr: "🦋 التحول", icon: "🦋" },
    chakras: { nameEn: "🔮 Chakras", nameAr: "🔮 الشاكرات", icon: "🔮" },
    zodiac: { nameEn: "♈ Zodiac Plants", nameAr: "♈ نباتات الأبراج", icon: "♈" },
    shadow: { nameEn: "🌑 Shadow Work", nameAr: "🌑 عمل الظل", icon: "🌑" },
    feminine: { nameEn: "🌙 Feminine Energy", nameAr: "🌙 الطاقة الأنثوية", icon: "🌙" },
    masculine: { nameEn: "☀️ Masculine Energy", nameAr: "☀️ الطاقة الذكرية", icon: "☀️" }
  }

  // Plants database
  const plants = [
    // Healing & Energy
    { id: "lavender", nameAr: "اللافندر", nameEn: "Lavender", category: "healing", chakra: "heart", zodiac: ["virgo", "libra"], meaningAr: "تهدئة، سلام داخلي، تنظيف الطاقة السلبية", meaningEn: "Calming, inner peace, cleansing negative energy", ritualAr: "ضع زيت اللافندر في حمامك لتهدئة العقل", ritualEn: "Add lavender oil to your bath for mental calm", color: "from-purple-950/40 to-emerald-950/20" },
    { id: "rosemary", nameAr: "الروز ماري", nameEn: "Rosemary", category: "healing", chakra: "third-eye", zodiac: ["aries", "leo"], meaningAr: "تنشيط الذاكرة، حماية من الطاقات الثقيلة", meaningEn: "Memory activation, protection from heavy energies", ritualAr: "احرق إكليل الجبل لتنقية الفضاء", ritualEn: "Burn rosemary to purify your space", color: "from-teal-950/40 to-emerald-950/20" },
    { id: "mint", nameAr: "النعناع", nameEn: "Mint", category: "healing", chakra: "throat", zodiac: ["gemini", "aquarius"], meaningAr: "تجديد الطاقة، وضوح ذهني", meaningEn: "Energy renewal, mental clarity", ritualAr: "اشرب شاي النعناع لتصفية الذهن", ritualEn: "Drink mint tea for mental clarity", color: "from-green-950/40 to-teal-950/20" },
    { id: "aloe-vera", nameAr: "الألوفيرا", nameEn: "Aloe Vera", category: "healing", chakra: "root", zodiac: ["cancer", "pisces"], meaningAr: "شفاء، حماية، امتصاص الطاقة السلبية", meaningEn: "Healing, protection, absorbing negative energy", ritualAr: "ضع الألوفيرا في غرفة نومك للحماية", ritualEn: "Place aloe vera in your bedroom for protection", color: "from-emerald-950/40 to-stone-900/30" },
        
    // Love & Emotion
    { id: "rose", nameAr: "الورد", nameEn: "Rose", category: "love", chakra: "heart", zodiac: ["libra", "taurus"], meaningAr: "الحب، القلب المفتوح، الرومانسية الروحية", meaningEn: "Love, open heart, spiritual romance", ritualAr: "ضع بتلات الورد في حمامك لجذب الحب", ritualEn: "Place rose petals in your bath to attract love", color: "from-rose-950/40 to-emerald-950/20" },
    { id: "jasmine", nameAr: "الياسمين", nameEn: "Jasmine", category: "love", chakra: "sacral", zodiac: ["cancer", "pisces"], meaningAr: "الجاذبية، الطاقة الأنثوية، الارتباط الروحي", meaningEn: "Attraction, feminine energy, spiritual connection", ritualAr: "ضع الياسمين تحت وسادتك لأحلام الحب", ritualEn: "Place jasmine under your pillow for love dreams", color: "from-stone-800/40 to-emerald-950/20" },
    { id: "camellia", nameAr: "الكاميليا", nameEn: "Camellia", category: "love", chakra: "heart", zodiac: ["taurus", "libra"], meaningAr: "الحب العميق والاحترام", meaningEn: "Deep love and respect", ritualAr: "أهدِ الكاميليا كرمز للاحترام العميق", ritualEn: "Give camellia as a symbol of deep respect", color: "from-pink-950/40 to-stone-900/30" },
    { id: "hibiscus", nameAr: "الكركديه", nameEn: "Hibiscus", category: "love", chakra: "sacral", zodiac: ["leo", "scorpio"], meaningAr: "الشغف والطاقة العاطفية القوية", meaningEn: "Passion and strong emotional energy", ritualAr: "اشرب شاي الكركديه لفتح شاكرا العجز", ritualEn: "Drink hibiscus tea to open sacral chakra", color: "from-red-950/40 to-emerald-950/20" },
        
    // Spiritual Trees
    { id: "olive", nameAr: "الزيتون", nameEn: "Olive", category: "trees", chakra: "crown", zodiac: ["libra", "pisces"], meaningAr: "السلام، الحكمة، البركة", meaningEn: "Peace, wisdom, blessing", ritualAr: "احمل غصن زيتون كرمز للسلام الداخلي", ritualEn: "Carry an olive branch as a symbol of inner peace", color: "from-emerald-950/40 to-stone-950/40" },
    { id: "oak", nameAr: "البلوط", nameEn: "Oak", category: "trees", chakra: "root", zodiac: ["sagittarius", "leo"], meaningAr: "القوة، الثبات، الحماية", meaningEn: "Strength, stability, protection", ritualAr: "قف تحت شجرة البلوط لتأريض طاقتك", ritualEn: "Stand under an oak tree to ground your energy", color: "from-amber-950/40 to-stone-900/30" },
    { id: "pine", nameAr: "الصنوبر", nameEn: "Pine", category: "trees", chakra: "crown", zodiac: ["capricorn", "aquarius"], meaningAr: "التطهير، طول العمر، الاتصال الروحي العالي", meaningEn: "Purification, longevity, high spiritual connection", ritualAr: "ضع إبر الصنوبر في بخورك للتطهير", ritualEn: "Place pine needles in your incense for purification", color: "from-green-950/40 to-stone-950/40" },
    { id: "fig", nameAr: "التين", nameEn: "Fig", category: "trees", chakra: "third-eye", zodiac: ["virgo", "taurus"], meaningAr: "المعرفة الباطنية، الأسرار الروحية", meaningEn: "Inner knowledge, spiritual secrets", ritualAr: "تأمل تحت شجرة التين لاستقبال الحكمة", ritualEn: "Meditate under a fig tree to receive wisdom", color: "from-purple-950/40 to-emerald-950/20" },
        
    // Protection
    { id: "sage", nameAr: "الميرمية", nameEn: "Sage", category: "protection", chakra: "third-eye", zodiac: ["sagittarius", "aquarius"], meaningAr: "تطهير قوي للطاقة السلبية", meaningEn: "Strong purification of negative energy", ritualAr: "احرق الميرمية لتنظيف منزلك", ritualEn: "Burn sage to cleanse your home", color: "from-slate-900/50 to-emerald-950/20" },
    { id: "basil", nameAr: "الريحان", nameEn: "Basil", category: "protection", chakra: "heart", zodiac: ["aries", "scorpio"], meaningAr: "حماية، جذب الحظ", meaningEn: "Protection, attracting luck", ritualAr: "ازرع الريحان عند باب منزلك للحماية", ritualEn: "Plant basil at your doorstep for protection", color: "from-lime-950/40 to-emerald-950/20" },
    { id: "garlic", nameAr: "الثوم", nameEn: "Garlic", category: "protection", chakra: "root", zodiac: ["aries", "scorpio"], meaningAr: "درع قوي ضد الطاقات السلبية", meaningEn: "Strong shield against negative energies", ritualAr: "علق فصوص الثوم عند المدخل للحماية", ritualEn: "Hang garlic cloves at the entrance for protection", color: "from-zinc-900/50 to-stone-950/40" },
    { id: "juniper", nameAr: "العرعر", nameEn: "Juniper", category: "protection", chakra: "root", zodiac: ["capricorn", "sagittarius"], meaningAr: "طرد الأرواح/الطاقات الثقيلة", meaningEn: "Repelling heavy energies", ritualAr: "احرق العرعر لتنقية الفضاء", ritualEn: "Burn juniper to purify the space", color: "from-sky-950/40 to-emerald-950/20" },
        
    // Abundance
    { id: "wheat", nameAr: "القمح", nameEn: "Wheat", category: "abundance", chakra: "root", zodiac: ["virgo", "taurus"], meaningAr: "الرزق، الوفرة، الخصوبة", meaningEn: "Sustenance, abundance, fertility", ritualAr: "ضع سنابل القمح في مطبخك لجذب الرزق", ritualEn: "Place wheat sheaves in your kitchen to attract sustenance", color: "from-amber-950/40 to-stone-950/40" },
    { id: "bamboo", nameAr: "الخيزران", nameEn: "Bamboo", category: "abundance", chakra: "root", zodiac: ["aquarius", "capricorn"], meaningAr: "النمو السريع، المرونة، الحظ", meaningEn: "Fast growth, flexibility, luck", ritualAr: "ضع نبات الخيزران في محفظتك لجذب المال", ritualEn: "Place bamboo in your wallet to attract money", color: "from-emerald-950/40 to-zinc-900/40" },
    { id: "pomegranate", nameAr: "الرمان", nameEn: "Pomegranate", category: "abundance", chakra: "sacral", zodiac: ["scorpio", "libra"], meaningAr: "الخصوبة، الطاقة الأنثوية، الوفرة الروحية", meaningEn: "Fertility, feminine energy, spiritual abundance", ritualAr: "تناول بذور الرمان لتعزيز الخصوبة", ritualEn: "Eat pomegranate seeds to enhance fertility", color: "from-red-950/40 to-emerald-950/20" },
        
    // Transformation
    { id: "lotus", nameAr: "اللوتس", nameEn: "Lotus", category: "transformation", chakra: "crown", zodiac: ["pisces", "cancer"], meaningAr: "الاستيقاظ الروحي، النقاء رغم الألم", meaningEn: "Spiritual awakening, purity through pain", ritualAr: "تأمل مع زهرة اللوتس للارتقاء الروحي", ritualEn: "Meditate with lotus flower for spiritual elevation", color: "from-fuchsia-950/40 to-emerald-950/20" },
    { id: "sunflower", nameAr: "دوار الشمس", nameEn: "Sunflower", category: "transformation", chakra: "solar-plexus", zodiac: ["leo", "sagittarius"], meaningAr: "النور الداخلي، التوجه نحو الوعي", meaningEn: "Inner light, turning toward consciousness", ritualAr: "ازرع دوار الشمس لتنمية ثقتك بنفسك", ritualEn: "Plant sunflowers to grow your confidence", color: "from-amber-900/40 to-stone-950/40" },
    { id: "orchid", nameAr: "الأوركيد", nameEn: "Orchid", category: "transformation", chakra: "crown", zodiac: ["libra", "aquarius"], meaningAr: "التحول الروحي، الجمال الداخلي", meaningEn: "Spiritual transformation, inner beauty", ritualAr: "ضع زهرة الأوركيد في غرفة التأمل", ritualEn: "Place orchid in your meditation room", color: "from-violet-950/40 to-stone-900/30" },
    { id: "cactus", nameAr: "الصبار", nameEn: "Cactus", category: "transformation", chakra: "root", zodiac: ["capricorn", "aries"], meaningAr: "الصمود، القوة في الظروف الصعبة", meaningEn: "Resilience, strength in difficult conditions", ritualAr: "ضع الصبار في مكان عملك للصمود", ritualEn: "Place cactus at your workplace for resilience", color: "from-stone-900/50 to-emerald-950/30" },
        
    // Chakras
    { id: "ginger-chakra", nameAr: "الزنجبيل", nameEn: "Ginger", category: "chakras", chakra: "root", zodiac: ["aries", "scorpio"], meaningAr: "الاستقرار، البقاء، القوة الجسدية", meaningEn: "Stability, survival, physical strength", ritualAr: "تناول الزنجبيل لتنشيط شاكرا الجذر", ritualEn: "Eat ginger to activate root chakra", color: "from-orange-950/40 to-stone-900/30" },
    { id: "orange-chakra", nameAr: "البرتقال", nameEn: "Orange", category: "chakras", chakra: "sacral", zodiac: ["cancer", "scorpio"], meaningAr: "الشغف، المتعة، الإبداع", meaningEn: "Passion, pleasure, creativity", ritualAr: "استخدم زيت البرتقال العطري لفتح الشاكرا الجنسية", ritualEn: "Use orange essential oil to open sacral chakra", color: "from-orange-950/40 to-emerald-950/20" },
    { id: "turmeric", nameAr: "الكركم", nameEn: "Turmeric", category: "chakras", chakra: "solar-plexus", zodiac: ["leo", "sagittarius"], meaningAr: "الثقة، الإرادة، السيطرة على الحياة", meaningEn: "Confidence, willpower, control of life", ritualAr: "اشرب الكركم مع الحليب لتقوية الإرادة", ritualEn: "Drink turmeric latte to strengthen willpower", color: "from-yellow-950/30 to-stone-900/40" },
    { id: "rose-chakra", nameAr: "الورد", nameEn: "Rose", category: "chakras", chakra: "heart", zodiac: ["libra", "taurus"], meaningAr: "الحب، الشفاء، التسامح", meaningEn: "Love, healing, forgiveness", ritualAr: "ضع زيت الورد على شاكرا القلب", ritualEn: "Apply rose oil to your heart chakra", color: "from-rose-950/40 to-emerald-950/20" },
    { id: "thyme", nameAr: "الزعتر", nameEn: "Thyme", category: "chakras", chakra: "throat", zodiac: ["gemini", "virgo"], meaningAr: "الكلام، الحقيقة، التعبير", meaningEn: "Speech, truth, expression", ritualAr: "اشرب شاي الزعتر لتنشيط شاكرا الحلق", ritualEn: "Drink thyme tea to activate throat chakra", color: "from-emerald-950/40 to-teal-950/30" },
    { id: "artemisia", nameAr: "الشيح", nameEn: "Artemisia", category: "chakras", chakra: "third-eye", zodiac: ["pisces", "sagittarius"], meaningAr: "الرؤية الداخلية، الحدس، الأحلام", meaningEn: "Inner vision, intuition, dreams", ritualAr: "ضع الشيح تحت وسادتك لأحلام صافية", ritualEn: "Place artemisia under your pillow for clear dreams", color: "from-indigo-950/40 to-stone-900/30" },
    { id: "frankincense", nameAr: "اللبان", nameEn: "Frankincense", category: "chakras", chakra: "crown", zodiac: ["aquarius", "pisces"], meaningAr: "الاتصال الروحي، الوعي العالي", meaningEn: "Spiritual connection, higher consciousness", ritualAr: "احرق اللبان للتأمل العميق", ritualEn: "Burn frankincense for deep meditation", color: "from-stone-800/40 to-emerald-950/30" },
    
    // Shadow Work Plants
    { id: "wormwood", nameAr: "الأفسنتين", nameEn: "Wormwood", category: "shadow", chakra: "third-eye", zodiac: ["scorpio", "pisces"], meaningAr: "مواجهة الظلال الداخلية", meaningEn: "Confronting inner shadows", ritualAr: "استخدم الأفسنتين بحذر لرؤية الأحلام", ritualEn: "Use wormwood cautiously for dream work", color: "from-purple-950/50 to-stone-950/50", caution: true },
    { id: "onion", nameAr: "البصل", nameEn: "Onion", category: "shadow", chakra: "root", zodiac: ["cancer", "scorpio"], meaningAr: "كشف المشاعر المخفية، طبقات النفس", meaningEn: "Revealing hidden emotions, layers of self", ritualAr: "قطع البصل لامتصاص الطاقة السلبية", ritualEn: "Cut onion to absorb negative energy", color: "from-amber-950/40 to-stone-900/40" },
    { id: "cypress", nameAr: "السرو", nameEn: "Cypress", category: "shadow", chakra: "crown", zodiac: ["capricorn", "aquarius"], meaningAr: "التحول، الموت الرمزي للبدايات القديمة", meaningEn: "Transformation, symbolic death of old beginnings", ritualAr: "تأمل مع السرو للتخلي عن الماضي", ritualEn: "Meditate with cypress to release the past", color: "from-emerald-950/40 to-stone-950/50" },
        
    // Feminine Energy Plants
    { id: "jasmine-feminine", nameAr: "الياسمين", nameEn: "Jasmine", category: "feminine", chakra: "sacral", zodiac: ["cancer", "pisces"], meaningAr: "الطاقة الأنثوية، الجاذبية، الارتباط الروحي", meaningEn: "Feminine energy, attraction, spiritual connection", ritualAr: "ارتدِ عطر الياسمين لتعزيز طاقتك الأنثوية", ritualEn: "Wear jasmine perfume to enhance feminine energy", color: "from-pink-950/30 to-stone-900/40" },
    { id: "lotus-feminine", nameAr: "اللوتس", nameEn: "Lotus", category: "feminine", chakra: "crown", zodiac: ["pisces", "cancer"], meaningAr: "النقاء، الولادة الروحية، الطاقة الأنثوية العليا", meaningEn: "Purity, spiritual birth, highest feminine energy", ritualAr: "تأمل مع زهرة اللوتس للاتصال بأنوثتك الروحية", ritualEn: "Meditate with lotus to connect with spiritual femininity", color: "from-fuchsia-950/40 to-emerald-950/20" },
    
    // Masculine Energy Plants
    { id: "cinnamon", nameAr: "القرفة", nameEn: "Cinnamon", category: "masculine", chakra: "solar-plexus", zodiac: ["aries", "leo"], meaningAr: "القوة، الحماية، الفعل، الجذب", meaningEn: "Strength, protection, action, attraction", ritualAr: "أضف القرفة لقهوتك لبدء يومك بقوة", ritualEn: "Add cinnamon to your coffee to start your day strong", color: "from-amber-950/40 to-emerald-950/10" },
    { id: "rosemary-masculine", nameAr: "الروز ماري", nameEn: "Rosemary", category: "masculine", chakra: "third-eye", zodiac: ["aries", "leo"], meaningAr: "الذاكرة، الحماية، الطاقة الذكرية النشطة", meaningEn: "Memory, protection, active masculine energy", ritualAr: "استخدم زيت الروز ماري لتنشيط عقلك", ritualEn: "Use rosemary oil to activate your mind", color: "from-teal-950/40 to-stone-900/30" },
    
    // Zodiac Plants - Fire Signs
    { id: "cinnamon-zodiac", nameAr: "القرفة", nameEn: "Cinnamon", category: "zodiac", zodiac: ["aries", "leo", "sagittarius"], element: "fire", meaningAr: "قوة، شغف، تحفيز", meaningEn: "Strength, passion, stimulation", ritualAr: "أضف القرفة لطعامك لزيادة الطاقة النارية", ritualEn: "Add cinnamon to your food to increase fire energy", color: "from-red-950/40 to-stone-900/40" },
    { id: "ginger-zodiac", nameAr: "الزنجبيل", nameEn: "Ginger", category: "zodiac", zodiac: ["aries", "leo", "sagittarius"], element: "fire", meaningAr: "طاقة، حركة، حماس", meaningEn: "Energy, movement, enthusiasm", ritualAr: "اشرب شاي الزنجبيل لتحفيز طاقتك", ritualEn: "Drink ginger tea to stimulate your energy", color: "from-orange-950/40 to-stone-900/30" },
    
    // Zodiac Plants - Earth Signs
    { id: "lavender-zodiac", nameAr: "اللافندر", nameEn: "Lavender", category: "zodiac", zodiac: ["taurus", "virgo", "capricorn"], element: "earth", meaningAr: "توازن وهدوء، استقرار عاطفي", meaningEn: "Balance, calm, emotional stability", ritualAr: "ضع زيت اللافندر لتهدئة أعصابك", ritualEn: "Apply lavender oil to calm your nerves", color: "from-purple-950/40 to-emerald-950/20" },
    
    // Zodiac Plants - Air Signs
    { id: "mint-zodiac", nameAr: "النعناع", nameEn: "Mint", category: "zodiac", zodiac: ["gemini", "libra", "aquarius"], element: "air", meaningAr: "وضوح ذهني، تواصل، صفاء", meaningEn: "Mental clarity, communication, purity", ritualAr: "اشرب شاي النعناع لتصفية أفكارك", ritualEn: "Drink mint tea to clear your thoughts", color: "from-emerald-950/40 to-stone-900/30" },
    
    // Zodiac Plants - Water Signs
    { id: "jasmine-zodiac", nameAr: "الياسمين", nameEn: "Jasmine", category: "zodiac", zodiac: ["cancer", "scorpio", "pisces"], element: "water", meaningAr: "حدس، أحلام، اتصال عاطفي قوي", meaningEn: "Intuition, dreams, strong emotional connection", ritualAr: "ضع الياسمين تحت وسادتك لأحلام واضحة", ritualEn: "Place jasmine under your pillow for clear dreams", color: "from-stone-800/40 to-emerald-950/20" }
  ]

  const getPlantsByCategory = (category) => {
    if (category === 'all') return plants
    return plants.filter(p => p.category === category)
  }

  const displayedPlants = getPlantsByCategory(activeCategory)

  // Floating bioluminescent spores particles
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const newParticles = []
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1.5,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 4
      })
    }
    setParticles(newParticles)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030705] via-[#06120c] to-[#020503] overflow-hidden relative selection:bg-emerald-800/50 selection:text-emerald-200">
      
      {/* Bioluminescent Forest Spores Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-70">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-emerald-400/30 to-lime-300/20 shadow-[0_0_8px_rgba(52,211,153,0.3)]"
            style={{
              left: particle.x + '%',
              top: particle.y + '%',
              width: particle.size + 'px',
              height: particle.size + 'px',
              animation: `forestFloat ${particle.duration}s ease-in-out infinite`,
              animationDelay: particle.delay + 's'
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
        className="fixed top-6 left-6 z-30 text-emerald-500/60 hover:text-emerald-400 transition-all duration-300 flex items-center gap-2 text-xs font-medium tracking-widest bg-emerald-950/20 border border-emerald-900/30 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
      >
        ← {language === 'en' ? 'BACK TO SANCTUARY' : 'العودة إلى الملاذ'}
      </motion.button>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-30 px-4 py-2 bg-emerald-950/30 rounded-full text-emerald-400 text-xs tracking-wider hover:bg-emerald-900/40 hover:text-emerald-300 transition-all duration-300 border border-emerald-800/40 backdrop-blur-md shadow-lg"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Enhanced Mysterious Nature Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-20 pb-8 relative z-10"
      >
        <div className="text-5xl mb-4 opacity-80 filter drop-shadow-[0_0_15px_rgba(16,185,129,0.4)] animate-forestFloat">🌿</div>
        <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.25em] text-transparent bg-gradient-to-r from-stone-200 via-emerald-300 to-stone-400 bg-clip-text filter drop-shadow-sm">
          {language === 'en' ? 'PLANET OF PLANTS' : 'كوكب النباتات'}
        </h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-emerald-700/60 to-transparent mx-auto mt-4" />
        <p className="text-emerald-600/50 text-[11px] font-medium tracking-[0.35em] mt-3 uppercase">
          {language === 'en' ? 'Spiritual Plant Symbolism & Rituals' : 'رمزية النباتات الروحية والطقوس'}
        </p>
      </motion.div>

      {/* Category Navigation with Dark Forest Styling */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 max-w-4xl mx-auto">
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-full text-xs font-light transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border ${
                activeCategory === key
                  ? 'bg-emerald-900/40 text-emerald-200 border-emerald-600/80 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                  : 'bg-stone-900/40 text-stone-400/80 border-stone-800/60 hover:border-emerald-800/60 hover:text-emerald-400 hover:bg-emerald-950/20'
              }`}
            >
              <span className="opacity-80 filter saturate-50">{cat.icon}</span>
              <span>{language === 'en' ? cat.nameEn : cat.nameAr}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Shadow-Infused Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-24">
          {displayedPlants.map((plant, idx) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.015, ease: "easeOut" }}
              whileHover={{ y: -4, shadow: "0 20px 30px rgba(0,0,0,0.7)" }}
              onMouseEnter={() => setHoveredPlant(plant.id)}
              onMouseLeave={() => setHoveredPlant(null)}
              onClick={() => setSelectedPlant(plant)}
              className={`bg-gradient-to-br ${plant.color} rounded-2xl p-5 border border-emerald-950/70 hover:border-emerald-700/40 transition-all duration-500 cursor-pointer relative overflow-hidden group shadow-[0_10px_25px_rgba(0,0,0,0.5)]`}
            >
              {/* Subtle inner glow grid border effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none transition-opacity duration-500" />
              
              {plant.caution && (
                <div className="absolute top-3 right-3 text-amber-500/80 text-xs animate-pulse">⚠️</div>
              )}
              
              <div className="flex items-center gap-4 mb-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-900/40 flex items-center justify-center text-xl shadow-inner group-hover:bg-emerald-900/50 transition-colors duration-300">
                  🌱
                </div>
                <div>
                  <h3 className="text-stone-200 font-light text-lg tracking-wide group-hover:text-emerald-300 transition-colors duration-300">
                    {language === 'en' ? plant.nameEn : plant.nameAr}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    {plant.chakra && (
                      <span className="text-emerald-500/50 text-[10px] font-mono tracking-wider uppercase">🔮 {plant.chakra}</span>
                    )}
                    {plant.element && (
                      <span className="text-amber-600/50 text-[10px] font-mono tracking-wider uppercase border-l border-stone-800 pl-2">🔥 {plant.element}</span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-stone-400/90 text-xs leading-relaxed line-clamp-2 pl-1 relative z-10 font-light group-hover:text-stone-300 transition-colors duration-300">
                {language === 'en' ? plant.meaningEn : plant.meaningAr}
              </p>

              <div className="mt-4 pt-2 border-t border-stone-900/60 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] text-stone-500 font-serif italic">
                  {categories[plant.category] ? (language === 'en' ? categories[plant.category].nameEn : categories[plant.category].nameAr) : ''}
                </span>
                <motion.span 
                  animate={{ x: hoveredPlant === plant.id ? 3 : 0 }}
                  className="text-emerald-500 text-[10px] flex items-center gap-1 font-light"
                >
                  {language === 'en' ? 'Commune' : 'اتصل'} →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deep Ritual Details Modal */}
      <AnimatePresence>
        {selectedPlant && (          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#010302]/90 backdrop-blur-xl p-4"
            onClick={() => setSelectedPlant(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#050c08] to-[#020503] rounded-3xl border border-emerald-900/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-7"
            >
              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-5 right-5 text-stone-500 hover:text-stone-300 text-lg z-10 w-8 h-8 flex items-center justify-center rounded-full bg-stone-900/40 border border-stone-800/60 hover:bg-stone-800/60 transition-all duration-200"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="text-4xl mb-2 filter drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">🌿</div>
                <h2 className="text-3xl font-extralight tracking-wider text-stone-200">
                  {language === 'en' ? selectedPlant.nameEn : selectedPlant.nameAr}
                </h2>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-emerald-800 to-transparent mx-auto my-3" />
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-950/20 rounded-2xl p-4 border border-emerald-900/30">
                  <p className="text-emerald-400 text-[11px] font-medium uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span>✨</span> {language === 'en' ? 'Spiritual Essence' : 'جوهر الروح'}
                  </p>
                  <p className="text-stone-300 text-sm font-light leading-relaxed">
                    {language === 'en' ? selectedPlant.meaningEn : selectedPlant.meaningAr}
                  </p>
                </div>

                <div className="bg-stone-900/40 rounded-2xl p-4 border border-stone-800/40">
                  <p className="text-amber-500/90 text-[11px] font-medium uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span>🕯️</span> {language === 'en' ? 'Sacred Ritual' : 'الطقوس الروحية'}
                  </p>
                  <p className="text-stone-300 text-sm font-light leading-relaxed">
                    {language === 'en' ? selectedPlant.ritualEn : selectedPlant.ritualAr}
                  </p>
                </div>

                {(selectedPlant.chakra || selectedPlant.element || selectedPlant.zodiac) && (
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {selectedPlant.chakra && (
                      <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-900/30 rounded-full text-emerald-400 text-[10px] tracking-wide uppercase">
                        🔮 Chakra: {selectedPlant.chakra}
                      </span>
                    )}
                    {selectedPlant.element && (
                      <span className="px-3 py-1 bg-amber-950/30 border border-amber-900/20 rounded-full text-amber-400 text-[10px] tracking-wide uppercase">
                        ⚡ Element: {selectedPlant.element}
                      </span>
                    )}
                    {selectedPlant.zodiac && selectedPlant.zodiac.map(z => (
                      <span key={z} className="px-3 py-1 bg-stone-900/50 border border-stone-800/60 rounded-full text-stone-400 text-[10px] tracking-wide uppercase">
                        ♈ {z}
                      </span>
                    ))}
                  </div>
                )}

                {selectedPlant.caution && (
                  <div className="bg-amber-950/20 rounded-xl p-3 border border-amber-900/20 text-center">
                    <p className="text-amber-500/80 text-xs font-light">
                      ⚠️ {language === 'en' ? 'Use with strict caution and spiritual reverence.' : 'استخدم بحذر شديد واحترام روحي.'}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-stone-900/80 text-center">
                <p className="text-emerald-700/40 text-[10px] tracking-[0.2em] uppercase font-serif italic">
                  ✦ {language === 'en' ? 'The wisdom of plants heals the soul' : 'حكمة النباتات تشفي الروح'} ✦
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes forestFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-15px) translateX(8px); opacity: 0.6; }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .animate-forestFloat {
          animation: forestFloat 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}