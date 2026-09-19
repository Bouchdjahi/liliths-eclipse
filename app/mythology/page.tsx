'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function MythologyPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeMythology, setActiveMythology] = useState('greek')

  // Greek Mythology
  const greekData = {
    themes: ["Fate vs Free Will", "Hero's Journey", "Divine Justice", "Love & Tragedy", "Transformation"],
    symbols: [
      { nameEn: "Thunderbolt", nameAr: "الصاعقة", meaningEn: "Symbol of Zeus. Power, authority, divine law", meaningAr: "رمز زيوس. القوة، السلطة، القانون الإلهي", symbol: "⚡" },
      { nameEn: "Owl", nameAr: "البومة", meaningEn: "Athena. Wisdom, strategy, intelligence", meaningAr: "أثينا. الحكمة، الاستراتيجية، الذكاء", symbol: "🦉" },
      { nameEn: "Laurel Wreath", nameAr: "إكليل الغار", meaningEn: "Apollo. Victory and enlightenment", meaningAr: "أبولو. النصر والتنوير", symbol: "🌿" },
      { nameEn: "Serpent", nameAr: "الأفعى", meaningEn: "Healing, rebirth, prophecy", meaningAr: "الشفاء، البعث، النبوءة", symbol: "🐍" },
      { nameEn: "Fates' Thread", nameAr: "خيط القدر", meaningEn: "Human destiny, life, death, karma-like cycles", meaningAr: "مصير الإنسان، الحياة، الموت، دورات شبيهة بالكارما", symbol: "🧵" }
    ],
    creatures: ["Medusa", "Pegasus", "Minotaur", "Hydra", "Cerberus", "Phoenix"],
    gods: ["Zeus", "Athena", "Apollo", "Hades", "Ares", "Aphrodite", "Hermes"]
  }

  // Egyptian Mythology
  const egyptianData = {
    themes: ["Life after death", "Cosmic order (Ma'at)", "Resurrection", "Sacred kingship"],
    symbols: [
      { nameEn: "Ankh", nameAr: "عنخ", meaningEn: "Eternal life, divine immortality", meaningAr: "الحياة الأبدية، الخلود الإلهي", symbol: "☥" },
      { nameEn: "Eye of Horus", nameAr: "عين حورس", meaningEn: "Protection, healing, spiritual awareness", meaningAr: "الحماية، الشفاء، الوعي الروحي", symbol: "👁" },
      { nameEn: "Feather of Ma'at", nameAr: "ريشة ماعت", meaningEn: "Truth, balance, justice", meaningAr: "الحقيقة، التوازن، العدالة", symbol: "🪶" },
      { nameEn: "Solar Disk", nameAr: "القرص الشمسي", meaningEn: "Divine consciousness, creation", meaningAr: "الوعي الإلهي، الخلق", symbol: "☀" }
    ],
    animals: ["Falcon", "Jackal", "Scarab Beetle", "Cat", "Cobra"],
    gods: ["Ra", "Osiris", "Isis", "Anubis", "Horus", "Thoth", "Bastet"]
  }

  // Norse Mythology
  const norseData = {
    themes: ["Courage against fate", "Wisdom through sacrifice", "Cycles of destruction and rebirth"],
    symbols: [
      { nameEn: "Yggdrasil", nameAr: "يغدراسيل", meaningEn: "World Tree, connection of all realms", meaningAr: "شجرة العالم، اتصال جميع العوالم", symbol: "🌳" },
      { nameEn: "Rune Symbols", nameAr: "الرونية", meaningEn: "Sacred knowledge, magic, destiny", meaningAr: "المعرفة المقدسة، السحر، القدر", symbol: "ᛟ" },
      { nameEn: "Mjölnir", nameAr: "ميولنير", meaningEn: "Thor's hammer, protection and strength", meaningAr: "مطرقة ثور، الحماية والقوة", symbol: "🔨" },
      { nameEn: "Wolf", nameAr: "الذئب", meaningEn: "Chaos, instinct, power", meaningAr: "الفوضى، الغريزة، القوة", symbol: "🐺" }
    ],
    gods: ["Odin", "Thor", "Loki", "Freyja", "Tyr", "Heimdall", "Balder"]
  }

  // Celtic Mythology
  const celticData = {
    themes: ["Nature spirituality", "Sacred cycles", "Magic", "Otherworld journeys"],
    symbols: [
      { nameEn: "Triple Spiral (Triskelion)", nameAr: "الحلزون الثلاثي", meaningEn: "Life, death, rebirth", meaningAr: "الحياة، الموت، البعث", symbol: "🌀" },
      { nameEn: "Tree of Life", nameAr: "شجرة الحياة", meaningEn: "Connection between worlds", meaningAr: "الاتصال بين العوالم", symbol: "🌳" },
      { nameEn: "Celtic Knot", nameAr: "العقدة الكلتية", meaningEn: "Eternity, interconnectedness", meaningAr: "الخلود، الترابط", symbol: "∞" },
      { nameEn: "Moon Symbolism", nameAr: "رمزية القمر", meaningEn: "Intuition, feminine mystery", meaningAr: "الحدس، الغموض الأنثوي", symbol: "🌙" }
    ],
    beings: ["Druids", "Fairies", "Banshees", "Shape-shifters", "Leprechauns"],
    symbols_more: ["Triskelion", "Tree of Life", "Celtic Cross", "Claddagh", "Shamrock"]
  }

  // Mesopotamian Mythology
  const mesopotamianData = {
    themes: ["Civilization", "Divine kingship", "Creation myths", "Flood legends"],
    symbols: [
      { nameEn: "Eight-Pointed Star", nameAr: "النجمة الثمانية", meaningEn: "Ishtar, love and war", meaningAr: "عشتار، الحب والحرب", symbol: "⭐" },
      { nameEn: "Winged Disk", nameAr: "القرص المجنح", meaningEn: "Divine protection", meaningAr: "الحماية الإلهية", symbol: "🦅" },
      { nameEn: "Bull", nameAr: "الثور", meaningEn: "Fertility, strength", meaningAr: "الخصوبة، القوة", symbol: "🐂" },
      { nameEn: "Ziggurat", nameAr: "الزقورة", meaningEn: "Connection to heaven", meaningAr: "الاتصال بالسماء", symbol: "🏛" }
    ],
    stories: ["Epic of Gilgamesh", "Great Flood myths", "Descent of Ishtar"],
    gods: ["Gilgamesh", "Ishtar", "Enki", "Marduk", "Tiamat", "Ereshkigal"]
  }

  // African Mythology
  const africanData = {
    themes: ["Ancestors", "Community", "Spiritual balance", "Nature forces"],
    symbols: [
      { nameEn: "Anansi Spider", nameAr: "عنكبوت أنانسي", meaningEn: "Wisdom, storytelling", meaningAr: "الحكمة، رواية القصص", symbol: "🕸" },
      { nameEn: "Adinkra Symbols", nameAr: "رموز أديونكرا", meaningEn: "Philosophical teachings", meaningAr: "التعاليم الفلسفية", symbol: "☀" },
      { nameEn: "Gye Nyame", nameAr: "غاي نيامي", meaningEn: "Except God - divine supremacy", meaningAr: "إلا الله - السيادة الإلهية", symbol: "⭐" },
      { nameEn: "Sankofa", nameAr: "سانكوفا", meaningEn: "Learn from the past", meaningAr: "تعلم من الماضي", symbol: "🐦" },
      { nameEn: "Dwennimmen", nameAr: "دوينيمين", meaningEn: "Strength with humility", meaningAr: "القوة مع التواضع", symbol: "🐏" }
    ],
    concepts: ["Ancestor spirits", "Sacred animals", "Oral traditions", "Vodun", "Ifá"]
  }

  // Japanese Mythology
  const japaneseData = {
    themes: ["Harmony with nature", "Purification", "Spirits everywhere (Kami)", "Ritual"],
    symbols: [
      { nameEn: "Torii Gate", nameAr: "بوابة توري", meaningEn: "Entrance to sacred space", meaningAr: "مدخل الفضاء المقدس", symbol: "⛩" },
      { nameEn: "Sun Symbol", nameAr: "رمز الشمس", meaningEn: "Amaterasu, divine light", meaningAr: "أماتيراسو، النور الإلهي", symbol: "☀" },
      { nameEn: "Fox (Kitsune)", nameAr: "الثعلب (كيتسوني)", meaningEn: "Intelligence, transformation", meaningAr: "الذكاء، التحول", symbol: "🦊" },
      { nameEn: "Dragon", nameAr: "التنين", meaningEn: "Wisdom, water power", meaningAr: "الحكمة، قوة الماء", symbol: "🐉" }
    ],
    beings: ["Yokai", "Kitsune", "Tengu", "Oni", "Kami", "Tanuki"],
    deities: ["Amaterasu", "Susanoo", "Tsukuyomi", "Inari", "Raijin", "Fujin"]
  }

  // Native American Legends
  const nativeData = {
    themes: ["Connection with nature", "Animal wisdom", "Ancestors", "Sacred directions"],
    symbols: [
      { nameEn: "Dreamcatcher", nameAr: "حالم", meaningEn: "Protection from harmful dreams", meaningAr: "الحماية من الأحلام الضارة", symbol: "🕸" },
      { nameEn: "Eagle", nameAr: "النسر", meaningEn: "Spiritual vision", meaningAr: "الرؤية الروحية", symbol: "🦅" },
      { nameEn: "Thunderbird", nameAr: "طائر الرعد", meaningEn: "Divine power, storms", meaningAr: "القوة الإلهية، العواصف", symbol: "⚡" },
      { nameEn: "Medicine Wheel", nameAr: "عجلة الطب", meaningEn: "Balance, life cycles", meaningAr: "التوازن، دورات الحياة", symbol: "⭕" }
    ],
    animals: [
      { nameEn: "Wolf", nameAr: "الذئب", meaningEn: "Loyalty, instinct", meaningAr: "الولاء، الغريزة" },
      { nameEn: "Bear", nameAr: "الدب", meaningEn: "Strength, healing", meaningAr: "القوة، الشفاء" },
      { nameEn: "Raven", nameAr: "الغراب", meaningEn: "Transformation", meaningAr: "التحول" },
      { nameEn: "Buffalo", nameAr: "الجاموس", meaningEn: "Abundance", meaningAr: "الوفرة" }
    ]
  }

  // Universal Mythological Symbols
  const universalSymbols = [
    { nameEn: "Serpent", nameAr: "الأفعى", meaningEn: "Transformation, rebirth, wisdom", meaningAr: "التحول، البعث، الحكمة", symbol: "🐍" },
    { nameEn: "Tree", nameAr: "الشجرة", meaningEn: "Connection of worlds, life cycles", meaningAr: "اتصال العوالم، دورات الحياة", symbol: "🌳" },
    { nameEn: "Sun", nameAr: "الشمس", meaningEn: "Consciousness, divine light", meaningAr: "الوعي، النور الإلهي", symbol: "☀" },
    { nameEn: "Moon", nameAr: "القمر", meaningEn: "Intuition, feminine mystery", meaningAr: "الحدس، الغموض الأنثوي", symbol: "🌙" },
    { nameEn: "Dragon", nameAr: "التنين", meaningEn: "Primordial power, wisdom", meaningAr: "القوة البدائية، الحكمة", symbol: "🐉" },
    { nameEn: "Phoenix", nameAr: "العنقاء", meaningEn: "Rebirth, immortality", meaningAr: "البعث، الخلود", symbol: "🔥" },
    { nameEn: "Labyrinth", nameAr: "المتاهة", meaningEn: "Spiritual journey, self-discovery", meaningAr: "الرحلة الروحية، اكتشاف الذات", symbol: "🌀" },
    { nameEn: "Mountain", nameAr: "الجبل", meaningEn: "Divine realm, stability", meaningAr: "العالم الإلهي، الاستقرار", symbol: "⛰" },
    { nameEn: "Water", nameAr: "الماء", meaningEn: "Emotion, creation, purification", meaningAr: "العاطفة، الخلق، التطهير", symbol: "💧" },
    { nameEn: "Star", nameAr: "النجمة", meaningEn: "Destiny, guidance", meaningAr: "القدر، التوجيه", symbol: "⭐" }
  ]

  const mythologies = [
    { id: "greek", nameEn: "Greek", nameAr: "اليونانية", icon: "⚡" },
    { id: "egyptian", nameEn: "Egyptian", nameAr: "المصرية", icon: "☥" },
    { id: "norse", nameEn: "Norse", nameAr: "النوردية", icon: "🔨" },
    { id: "celtic", nameEn: "Celtic", nameAr: "الكلتية", icon: "🌀" },
    { id: "mesopotamian", nameEn: "Mesopotamian", nameAr: "بلاد الرافدين", icon: "⭐" },
    { id: "african", nameEn: "African", nameAr: "الأفريقية", icon: "🕸" },
    { id: "japanese", nameEn: "Japanese", nameAr: "اليابانية", icon: "⛩" },
    { id: "native", nameEn: "Native American", nameAr: "أمريكا الأصلية", icon: "🦅" },
    { id: "universal", nameEn: "Universal", nameAr: "العالمية", icon: "⭐" }
  ]

  const renderContent = () => {
    switch(activeMythology) {
      case 'greek':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-amber-950/40 to-stone-900/40 rounded-xl p-5 border border-amber-900/40 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <h3 className="text-amber-500/80 font-serif tracking-wider text-lg mb-3 flex items-center gap-2">📜 {language === 'en' ? 'Core Themes' : 'الموضوعات الأساسية'}</h3>
              <div className="flex flex-wrap gap-2.2">{greekData.themes.map(t => <span key={t} className="px-3 py-1.5 bg-amber-950/40 border border-amber-900/30 rounded-md text-amber-200/80 text-xs font-serif">{t}</span>)}</div>
            </div>
            
            <div>
              <h3 className="text-stone-300 font-serif tracking-wider text-lg mb-4 flex items-center gap-2">✨ {language === 'en' ? 'Major Symbols' : 'الرموز الرئيسية'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {greekData.symbols.map((s, i) => (
                  <div key={i} className="bg-gradient-to-b from-stone-900/50 to-stone-950/60 rounded-xl p-4 border border-amber-950/40 backdrop-blur-sm hover:border-amber-800/40 transition-all duration-300 group shadow-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl opacity-80 group-hover:opacity-100 transition-opacity">{s.symbol}</span>
                      <div>
                        <p className="text-amber-400/90 font-serif text-sm tracking-wide">{language === 'en' ? s.nameEn : s.nameAr}</p>
                        <p className="text-stone-400 font-light text-[11px] mt-0.5 leading-relaxed">{language === 'en' ? s.meaningEn : s.meaningAr}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-950/30 to-stone-900/30 rounded-xl p-5 border border-purple-950/40 backdrop-blur-md">
                <h3 className="text-purple-400/80 font-serif tracking-wider text-md mb-3">🦄 {language === 'en' ? 'Mythical Creatures' : 'مخلوقات أسطورية'}</h3>
                <div className="flex flex-wrap gap-2">{greekData.creatures.map(c => <span key={c} className="px-2.5 py-1 bg-purple-950/50 border border-purple-900/20 rounded-md text-purple-200/70 text-xs">{c}</span>)}</div>
              </div>
              <div className="bg-gradient-to-br from-stone-950/40 to-stone-900/40 rounded-xl p-5 border border-amber-950/40 backdrop-blur-md">
                <h3 className="text-amber-600/70 font-serif tracking-wider text-md mb-3">🏛️ {language === 'en' ? 'Important Gods' : 'آلهة مهمون'}</h3>
                <div className="flex flex-wrap gap-2">{greekData.gods.map(g => <span key={g} className="px-2.5 py-1 bg-amber-950/20 border border-amber-900/20 rounded-md text-amber-100/70 text-xs font-serif">{g}</span>)}</div>
              </div>
            </div>
          </div>
        )
      case 'egyptian':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-amber-950/40 to-stone-900/40 rounded-xl p-5 border border-amber-900/40 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <h3 className="text-amber-500/80 font-serif tracking-wider text-lg mb-3">📜 {language === 'en' ? 'Core Themes' : 'الموضوعات الأساسية'}</h3>
              <div className="flex flex-wrap gap-2.2">{egyptianData.themes.map(t => <span key={t} className="px-3 py-1.5 bg-amber-950/40 border border-amber-900/30 rounded-md text-amber-200/80 text-xs font-serif">{t}</span>)}</div>
            </div>
            <div>
              <h3 className="text-stone-300 font-serif tracking-wider text-lg mb-4">✨ {language === 'en' ? 'Major Symbols' : 'الرموز الرئيسية'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {egyptianData.symbols.map((s, i) => (
                  <div key={i} className="bg-gradient-to-b from-stone-900/50 to-stone-950/60 rounded-xl p-4 border border-amber-950/40 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl opacity-80">{s.symbol}</span>
                      <div>
                        <p className="text-amber-400/90 font-serif text-sm tracking-wide">{language === 'en' ? s.nameEn : s.nameAr}</p>
                        <p className="text-stone-400 font-light text-[11px] mt-0.5 leading-relaxed">{language === 'en' ? s.meaningEn : s.meaningAr}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-stone-950/40 to-stone-900/40 rounded-xl p-5 border border-amber-950/40 backdrop-blur-md">
                <h3 className="text-amber-600/70 font-serif tracking-wider text-md mb-3">🦁 {language === 'en' ? 'Sacred Animals' : 'حيوانات مقدسة'}</h3>
                <div className="flex flex-wrap gap-2">{egyptianData.animals.map(a => <span key={a} className="px-2.5 py-1 bg-stone-900/60 border border-amber-950/30 rounded-md text-amber-200/70 text-xs">{a}</span>)}</div>
              </div>
              <div className="bg-gradient-to-br from-stone-950/40 to-stone-900/40 rounded-xl p-5 border border-amber-950/40 backdrop-blur-md">
                <h3 className="text-amber-500/70 font-serif tracking-wider text-md mb-3">👑 {language === 'en' ? 'Important Gods' : 'آلهة مهمون'}</h3>
                <div className="flex flex-wrap gap-2">{egyptianData.gods.map(g => <span key={g} className="px-2.5 py-1 bg-amber-950/20 border border-amber-900/20 rounded-md text-amber-100/70 text-xs font-serif">{g}</span>)}</div>
              </div>
            </div>
          </div>
        )
      case 'norse':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-stone-950/50 to-stone-900/40 rounded-xl p-5 border border-stone-800/40 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <h3 className="text-stone-400 font-serif tracking-wider text-lg mb-3">📜 {language === 'en' ? 'Core Themes' : 'الموضوعات الأساسية'}</h3>
              <div className="flex flex-wrap gap-2.2">{norseData.themes.map(t => <span key={t} className="px-3 py-1.5 bg-stone-950/60 border border-stone-800/30 rounded-md text-stone-300 text-xs font-serif">{t}</span>)}</div>
            </div>
            <div>
              <h3 className="text-stone-300 font-serif tracking-wider text-lg mb-4">✨ {language === 'en' ? 'Major Symbols' : 'الرموز الرئيسية'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {norseData.symbols.map((s, i) => (
                  <div key={i} className="bg-gradient-to-b from-stone-900/50 to-stone-950/60 rounded-xl p-4 border border-stone-800/40 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl opacity-80">{s.symbol}</span>
                      <div>
                        <p className="text-stone-300 font-serif text-sm tracking-wide">{language === 'en' ? s.nameEn : s.nameAr}</p>
                        <p className="text-stone-400 font-light text-[11px] mt-0.5 leading-relaxed">{language === 'en' ? s.meaningEn : s.meaningAr}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-stone-950/40 to-stone-900/40 rounded-xl p-5 border border-stone-800/40 backdrop-blur-md">
              <h3 className="text-stone-400 font-serif tracking-wider text-md mb-3">⚔️ {language === 'en' ? 'Important Gods' : 'آلهة مهمون'}</h3>
              <div className="flex flex-wrap gap-2">{norseData.gods.map(g => <span key={g} className="px-2.5 py-1 bg-stone-900/50 border border-stone-800/20 rounded-md text-stone-300/80 text-xs font-serif">{g}</span>)}</div>
            </div>
          </div>
        )
      case 'celtic':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-emerald-950/20 to-stone-900/40 rounded-xl p-5 border border-emerald-950/30 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <h3 className="text-emerald-600/80 font-serif tracking-wider text-lg mb-3">📜 {language === 'en' ? 'Core Themes' : 'الموضوعات الأساسية'}</h3>
              <div className="flex flex-wrap gap-2.2">{celticData.themes.map(t => <span key={t} className="px-3 py-1.5 bg-stone-950/60 border border-emerald-950/20 rounded-md text-stone-300 text-xs font-serif">{t}</span>)}</div>
            </div>
            <div>
              <h3 className="text-stone-300 font-serif tracking-wider text-lg mb-4">✨ {language === 'en' ? 'Major Symbols' : 'الرموز الرئيسية'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {celticData.symbols.map((s, i) => (
                  <div key={i} className="bg-gradient-to-b from-stone-900/50 to-stone-950/60 rounded-xl p-4 border border-emerald-950/20 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl opacity-80">{s.symbol}</span>
                      <div>
                        <p className="text-emerald-400/80 font-serif text-sm tracking-wide">{language === 'en' ? s.nameEn : s.nameAr}</p>
                        <p className="text-stone-400 font-light text-[11px] mt-0.5 leading-relaxed">{language === 'en' ? s.meaningEn : s.meaningAr}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-950/20 to-stone-900/40 rounded-xl p-5 border border-purple-950/30 backdrop-blur-md">
                <h3 className="text-purple-400/70 font-serif tracking-wider text-md mb-3">🧚 {language === 'en' ? 'Sacred Beings' : 'كائنات مقدسة'}</h3>
                <div className="flex flex-wrap gap-2">{celticData.beings.map(b => <span key={b} className="px-2.5 py-1 bg-stone-950/50 border border-purple-950/20 rounded-md text-stone-300/80 text-xs">{b}</span>)}</div>
              </div>
              <div className="bg-gradient-to-br from-amber-950/20 to-stone-900/40 rounded-xl p-5 border border-amber-950/30 backdrop-blur-md">
                <h3 className="text-amber-600/70 font-serif tracking-wider text-md mb-3">🔮 {language === 'en' ? 'Sacred Symbols' : 'رموز مقدسة'}</h3>
                <div className="flex flex-wrap gap-2">{celticData.symbols_more.map(s => <span key={s} className="px-2.5 py-1 bg-stone-950/50 border border-amber-950/20 rounded-md text-amber-200/70 text-xs font-serif">{s}</span>)}</div>
              </div>
            </div>
          </div>
        )
      case 'universal':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-stone-950/60 via-stone-900/40 to-stone-950/60 rounded-xl p-5 border border-amber-950/30 backdrop-blur-md text-center">
              <p className="text-amber-200/60 font-serif italic text-sm tracking-wide">{language === 'en' ? 'These primal motifs emerge across archetypal narratives worldwide' : 'تظهر هذه الرموز البدائية عبر الروايات الأصلية في جميع أنحاء العالم'}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {universalSymbols.map((s, i) => (
                <div key={i} className="bg-gradient-to-b from-stone-900/40 to-stone-950/60 rounded-xl p-4 border border-amber-950/20 backdrop-blur-sm text-center shadow-md hover:border-amber-900/40 transition-colors duration-300">
                  <div className="text-3xl mb-2 opacity-80">{s.symbol}</div>
                  <p className="text-amber-500/80 font-serif text-xs tracking-wider uppercase mb-1">{language === 'en' ? s.nameEn : s.nameAr}</p>
                  <p className="text-stone-400 font-light text-[10px] leading-tight px-1">{language === 'en' ? s.meaningEn : s.meaningAr}</p>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return <div className="text-stone-500 font-serif text-center py-12">Select an archive of ancestral lore</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010312] via-[#020722] to-[#00020a] overflow-hidden relative selection:bg-amber-900/50 selection:text-amber-200">
      
      {/* Background Deep Dust Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(120)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full" 
            style={{ 
              left: Math.random() * 100 + '%', 
              top: Math.random() * 100 + '%', 
              width: Math.random() * 1.5 + 0.5 + 'px', 
              height: Math.random() * 1.5 + 0.5 + 'px', 
              backgroundColor: 'rgba(217, 119, 6, ' + (Math.random() * 0.4 + 0.1) + ')', 
              animation: 'emberFloat ' + (Math.random() * 4 + 2) + 's ease-in-out infinite' 
            }} 
          />
        ))}
      </div>

      {/* Navigation Layer */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        onClick={() => router.push("/")} 
        className="fixed top-6 left-6 z-30 text-stone-500 hover:text-amber-500/80 transition-all duration-300 flex items-center gap-2 text-xs font-serif tracking-[0.2em] bg-stone-950/60 border border-stone-900 backdrop-blur-md px-4 py-2 rounded-md shadow-2xl"
      >
        ← {language === 'en' ? 'BACK TO PORTAL' : 'العودة إلى البوابة'}
      </motion.button>

      <button 
        onClick={toggleLanguage} 
        className="fixed top-6 right-6 z-30 px-4 py-2 bg-stone-950/60 rounded-md text-stone-400 text-xs font-serif tracking-wider hover:text-amber-500/80 transition-all duration-300 border border-stone-900 backdrop-blur-md shadow-2xl"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Hero Header Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-20 pb-10 relative z-10">
        <div className="text-5xl mb-4 animate-ancientFloat opacity-70 tracking-widest">🏛️ ☥ ᛟ</div>
        <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-[0.25em] text-transparent bg-gradient-to-r from-amber-600 via-amber-200 to-amber-600 bg-clip-text drop-shadow-[0_2px_10px_rgba(217,119,6,0.3)]">
          {language === 'en' ? 'MYTHOLOGY' : 'الأساطير'}
        </h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-700/50 to-transparent mx-auto mt-4" />
        <p className="text-amber-700/40 text-[10px] font-serif tracking-[0.35em] mt-3 uppercase">
          {language === 'en' ? 'Ancient Wisdom • Primordial Deities • Sacred Archetypes' : 'حكمة قديمة • آلهة • رموز • أساطير'}
        </p>
      </motion.div>

      {/* Primary Selector Grid */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-2 pb-32">
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 border-b border-stone-950 pb-6">
          {mythologies.map(m => (
            <button 
              key={m.id} 
              onClick={() => setActiveMythology(m.id)} 
              className={`px-4 py-2 rounded-md text-xs font-serif tracking-wide transition-all duration-300 flex items-center gap-2 border ${
                activeMythology === m.id 
                  ? 'bg-amber-950/40 text-amber-300 border-amber-800/60 shadow-[0_0_15px_rgba(146,64,14,0.15)]' 
                  : 'bg-stone-950/60 text-stone-400 border-stone-900/60 hover:bg-stone-900/40 hover:text-amber-400/70'
              }`}
            >
              <span className="text-sm opacity-70">{m.icon}</span>
              {language === 'en' ? m.nameEn : m.nameAr}
            </button>
          ))}
        </div>

        {/* Dynamic Inner Panel View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMythology}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Keyframe Styling Layer */}
      <style>{`
        @keyframes emberFloat { 
          0%, 100% { opacity: 0.1; transform: translateY(0px) scale(0.9); } 
          50% { opacity: 0.5; transform: translateY(-8px) scale(1.1); } 
        } 
        @keyframes ancientFloat { 
          0%, 100% { transform: translateY(0px); filter: drop-shadow(0 0 2px rgba(217,119,6,0)); } 
          50% { transform: translateY(-5px); filter: drop-shadow(0 4px 8px rgba(217,119,6,0.15)); } 
        } 
        .animate-ancientFloat { animation: ancientFloat 5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}