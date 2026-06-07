'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function LibraryPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeShelf, setActiveShelf] = useState('philosophy')
  const [showLilithModal, setShowLilithModal] = useState(false)

  // 1. Philosophy Collection
  const philosophyShelf = [
    { id: "the-courage-to-be", nameEn: "📜 The Courage to Be", nameAr: "📜 الشجاعة من أجل الكينونة", icon: "📜", descriptionEn: "Paul Tillich — Analysis of anxiety and courage structures.", descriptionAr: "بول تيليش — تحليل بنيات القلق والشجاعة." },
    { id: "the-myth-of-sisyphus", nameEn: "⏳ The Myth of Sisyphus", nameAr: "⏳ أسطورة سيزيف", icon: "⏳", descriptionEn: "Albert Camus — Crucial existential thoughts on the absurd.", descriptionAr: "ألبير كامو — أفكار وجودية حاسمة حول العبثية." },
    { id: "in-praise-of-idleness", nameEn: "✍️ In Praise of Idleness", nameAr: "✍️ مديح الكسل", icon: "✍️", descriptionEn: "Bertrand Russell — A critique of the industrial working obsession.", descriptionAr: "برتراند راسل — نقد للهوس الصناعي بالعمل المتواصل." },
    { id: "the-denial-of-death", nameEn: "💀 The Denial of Death", nameAr: "💀 إنكار الموت", icon: "💀", descriptionEn: "Ernest Becker — Psychological defensive walls against death awareness.", descriptionAr: "إرنست بيكر — الجدران الدفاعية النفسية ضد الوعي بالفناء." },
    { id: "the-power-of-logic", nameEn: "⚙️ The Power of Logic", nameAr: "⚙️ قوة المنطق", icon: "⚙️", descriptionEn: "C. Stephen Layman — Analytical parameters of logical processing.", descriptionAr: "سي ستيفن لايمان — المعالم التحليلية للمعالجة المنطقية." },
    { id: "ethics-inventing-right-and-wrong", nameEn: "⚖️ Ethics: Inventing Right & Wrong", nameAr: "⚖️ الأخلاق: اختراع الصواب والخطأ", icon: "⚖️", descriptionEn: "J. L. Mackie — A fundamental challenge to objective moral metrics.", descriptionAr: "جي إل ماكي — تحدي أساسي للمقاييس الأخلاقية الموضوعية." },
    { id: "how-to-listen-hear-and-validate", nameEn: "🗝️ How to Listen, Hear & Validate", nameAr: "🗝️ كيف تستمع، تسمع وتصادق", icon: "🗝️", descriptionEn: "Core relational methodologies for human emotional reconciliation.", descriptionAr: "المنهجيات الأساسية للتوافق العاطفي البشري." },
    { id: "the-stranger", nameEn: "🔍 The Stranger", nameAr: "🔍 الغريب", icon: "🔍", descriptionEn: "Albert Camus — A portrait of absolute detachment and social isolation.", descriptionAr: "ألبير كامو — صورة للانفصال المطلق والعزلة الاجتماعية." },
    { id: "the-metamorphosis", nameEn: "🪲 The Metamorphosis", nameAr: "🪲 المسخ", icon: "🪲", descriptionEn: "Franz Kafka — A surreal exploration of guilt and body alienation.", descriptionAr: "فرانز كافكا — استكشاف سريالي للذنب واغتراب الجسد." },
    { id: "white-nights", nameEn: "🌙 White Nights", nameAr: "🌙 الليالي البيضاء", icon: "🌙", descriptionEn: "Fyodor Dostoevsky — An emotional journey through loneliness and dreams.", descriptionAr: "فيودور دوستويفسكي — رحلة عاطفية عبر العزلة والأحلام الفاتنة." },
    { id: "no-longer-human", nameEn: "🥀 No Longer Human", nameAr: "🥀 لم يعد إنسانًا", icon: "🥀", descriptionEn: "Osamu Dazai — Poignant breakdown profile of utter existential isolation.", descriptionAr: "أوسامو دازاي — تحليل مؤثر لعزلة وجودية مطلقة." },
    { id: "meditations", nameEn: "🏛️ Meditations", nameAr: "🏛️ التأملات", icon: "🏛️", descriptionEn: "Marcus Aurelius — Private stoic internal framework metrics.", descriptionAr: "ماركوس أوريليوس — مقاييس الأطر الداخلية للرواقية الشخصية." },
    { id: "letters-from-a-stoic", nameEn: "✉️ Letters from a Stoic", nameAr: "✉️ رسائل من رواقي", icon: "✉️", descriptionEn: "Seneca — Timeless transactional letters detailing life and deliberate virtue.", descriptionAr: "سنيكا — رسائل تعاملية خالدة توضح تفاصيل الحياة والفضيلة المتعمدة." },
    { id: "the-trial", nameEn: "🏛️ The Trial", nameAr: "🏛️ المحاكمة", icon: "🏛️", descriptionEn: "Franz Kafka — The ultimate horror of a faceless, dark tracking bureaucracy.", descriptionAr: "فرانز كافكا — الرعب المطلق لبيروقراطية مظلمة مجهولة الهوية." },
    { id: "notes-from-underground", nameEn: "🕳️ Notes from Underground", nameAr: "🕳️ رسائل من تحت الأرض", icon: "🕳️", descriptionEn: "Fyodor Dostoevsky — Pristine original text exploring existential defiance.", descriptionAr: "فيودور دوستويفسكي — نص أصلي نقي يستكشف التحدي الوجودي." },
    { id: "slaughterhouse-five", nameEn: "🚀 Slaughterhouse-Five", nameAr: "🚀 المسلخ رقم خمسة", icon: "🚀", descriptionEn: "Kurt Vonnegut — Satirical non-linear timeline tracking war trauma.", descriptionAr: "كورت فونيغوت — تتبع ساخر وغير خطي لصدمات الحرب عبر الزمن." }
  ]

  // 2. Psychology Collection
  const psychologyShelf = [
    { id: "the-laws-of-human-nature", nameEn: "👁️ The Laws of Human Nature", nameAr: "👁️ قوانين الطبيعة البشرية", icon: "👁️", descriptionEn: "Robert Greene — Systematic codes analyzing core human hidden drivers.", descriptionAr: "روبرت غرين — رموز منهجية تحلل الدوافع الخفية للبشر." },
    { id: "surrounded-by-idiots", nameEn: "🔴 Surrounded by Idiots", nameAr: "🔴 محاط بالحمقى", icon: "🔴", descriptionEn: "Thomas Erikson — Color system breakdown for relational analysis.", descriptionAr: "توماس إريكسون — تفكيك نظام الألوان للتحليل السلوكي البيني." },
    { id: "surrounded-by-psychopaths", nameEn: "🧠 Surrounded by Psychopaths", nameAr: "🧠 محاط بالمرضى النفسيين", icon: "🧠", descriptionEn: "Thomas Erikson — Protection measures against absolute manipulative systems.", descriptionAr: "توماس إريكسون — مقاييس الحماية ضد أنظمة التلاعب المطلقة." },
    { id: "surrounded-by-narcissists", nameEn: "🎭 Surrounded by Narcissists", nameAr: "🎭 محاط بالنرجسيين", icon: "🎭", descriptionEn: "Thomas Erikson — Neutralizing extreme ego exploitation landscapes.", descriptionAr: "توماس إريكسون — تحييد بيئات الاستغلال القائمة على الأنا المتطرفة." },
    { id: "surrounded-by-liars", nameEn: "🤫 Surrounded by Liars", nameAr: "🤫 محاط بالكاذبين", icon: "🤫", descriptionEn: "Thomas Erikson — Behavioral deviation and structural deceit detection parameters.", descriptionAr: "توماس إريكسون — معالم الكشف عن الانحراف السلوكي والخداع الهيكلي." },
    { id: "surrounded-by-vampires", nameEn: "🦇 Surrounded by Vampires", nameAr: "🦇 محاط بمصاصي الطاقة", icon: "🦇", descriptionEn: "Thomas Erikson — Stopping conversational resource extraction loops.", descriptionAr: "توماس إريكسون — إيقاف حلقات استنزاف الموارد الحوارية." },
    { id: "the-criminal-brain", nameEn: "🔬 The Criminal Brain", nameAr: "🔬 الدماغ الإجرامي", icon: "🔬", descriptionEn: "Nicole Rafter — Neural evolutionary logs mapping structural deviance.", descriptionAr: "نيكول رافتر — سجلات التطور العصبي التي ترسم الخرائط الانحرافية الهيكلية." },
    { id: "criminal-psychology", nameEn: "⚖️ Criminal Psychology", nameAr: "⚖️ علم النفس الجنائي", icon: "⚖️", descriptionEn: "Francis Parker — Forensic metrics investigating deviant behavioral patterns.", descriptionAr: "فرانسيس باركر — مقاييس الأدلة الجنائية التي تبحث في أنماط السلوك المنحرف." },
    { id: "power", nameEn: "👑 The 48 Laws of Power", nameAr: "👑 48 قانونًا للقوة", icon: "👑", descriptionEn: "Robert Greene — Tactical calculation parameters for social control layouts.", descriptionAr: "روبرت غرين — معالم الحسابات التكتيكية لمخططات السيطرة الاجتماعية." },
    { id: "thinking-fast-and-slow", nameEn: "⏳ Thinking, Fast and Slow", nameAr: "⏳ التفكير السريع والبطيء", icon: "⏳", descriptionEn: "Daniel Kahneman — Dual cognitive processing architecture profiles.", descriptionAr: "دانيال كانمان — ملفات بنية المعالجة الإدراكية المزدوجة." },
    { id: "the-prince", nameEn: "⚜️ The Prince", nameAr: "⚜️ الأمير", icon: "⚜️", descriptionEn: "Niccolò Machiavelli — Foundational realism governing systemic rule structures.", descriptionAr: "نيكولو ميكافيلي — الواقعية الأساسية التي تحكم هياكل الحكم المنهجي." },
    { id: "luminary-50-shadow-protocols", nameEn: "🔮 Luminary: The 50 Shadow Protocols", nameAr: "🔮 المضيء: بروتوكولات الظل الخمسون", icon: "🔮", descriptionEn: "Esoteric Security Systems — Advanced metrics of protective shadow configuration processing.", descriptionAr: "أنظمة الأمن الباطنية — مقاييس متقدمة لمعالجة تكوينات الظل الوقائية." },
    { id: "the-dark-secrets", nameEn: "🗝️ The Dark Secrets", nameAr: "🗝️ الأسرار المظلمة", icon: "🗝️", descriptionEn: "Legacyfy A. — Implicit tracking parameters of subconscious structural persuasion.", descriptionAr: "ليجاسيفاي أ. — معالم التتبع الضمنية للإقناع البنيوي اللاوعي." }
  ]

  // 3. Gothic Collection
  const gothicShelf = [
    { id: "the-tell-tale-heart", nameEn: "🦅 The Tell-Tale Heart", nameAr: "🦅 القلب الوشي", icon: "🦅", descriptionEn: "Edgar Allan Poe — Pristine metrics of psychological guilt and paranoia.", descriptionAr: "إدغار آلان بو — مقاييس نقية للذنب والبارانويا النفسية." },
    { id: "the-black-cat", nameEn: "🐈‍⬛ The Black Cat", nameAr: "🐈‍⬛ القط الأسود", icon: "🐈‍⬛", descriptionEn: "Edgar Allan Poe — Analysis of domestic malice and dark omens.", descriptionAr: "إدغار آلان بو — تحليل للخبث المنزلي والنذر المظلمة." },
    { id: "the-fall-of-the-house-of-usher", nameEn: "🏰 Fall of the House of Usher", nameAr: "🏰 سقوط بيت آشر", icon: "🏰", descriptionEn: "Edgar Allan Poe — Structural decay of architectural sanity and lineage.", descriptionAr: "إدغار آلان بو — التدهور الهيكلي للسلامة العقلية والسلالة." },
    { id: "the-cask-of-amontillado", nameEn: "🍷 The Cask of Amontillado", nameAr: "🍷 برميل أمونتيلادو", icon: "🍷", descriptionEn: "Edgar Allan Poe — A cold, unyielding tracking profile of absolute revenge.", descriptionAr: "إدغار آلان بو — ملف تتبع بارد وصارم للانتقام المطلق." },
    { id: "the-masque-of-the-red-death", nameEn: "🎭 Masque of the Red Death", nameAr: "🎭 قناع الموت الأحمر", icon: "🎭", descriptionEn: "Edgar Allan Poe — Allegory tracking mortality breaching opulent defenses.", descriptionAr: "إدغار آلان بو — مجاز يتتبع اختراق الفناء للدفاعات الفخمة." },
    { id: "the-pit-and-the-pendulum", nameEn: "⚙️ The Pit and the Pendulum", nameAr: "⚙️ الحفرة والبندول", icon: "⚙️", descriptionEn: "Edgar Allan Poe — Captivity metrics under sadistic mechanical torment.", descriptionAr: "إدغار آلان بو — مقاييس الأسر تحت التعذيب الميكانيكي السادي." },
    { id: "the-murders-in-the-rue-morgue", nameEn: "🕵️‍♂️ Murders in the Rue Morgue", nameAr: "🕵️‍♂️ جرائم شارع مورغ", icon: "🕵️‍♂️", descriptionEn: "Edgar Allan Poe — The source code of analytical detective fiction layouts.", descriptionAr: "إدغار آلان بو — الرمز المصدري لمخططات قصص التحري التحليلية." },
    { id: "the-gold-bug", nameEn: "🪲 The Gold-Bug", nameAr: "🪲 الجعران الذهبي", icon: "🪲", descriptionEn: "Edgar Allan Poe — Intricate compilation decoding cipher treasure maps.", descriptionAr: "إدغار آلان بو — تجميع معقد لفك تشفير خرائط الكنوز المرمزة." },
    { id: "frankenstein", nameEn: "⚡ Frankenstein", nameAr: "⚡ فرانكنشتاين", icon: "⚡", descriptionEn: "Mary Shelley — Hubris tracking the creation and isolation of life.", descriptionAr: "ماري شيلي — غطرسة تتتبع خلق الحياة وعزلتها المريرة." },
    { id: "dracula", nameEn: "🧛 Dracula", nameAr: "🧛 دراكولا", icon: "🧛", descriptionEn: "Bram Stoker — Epistolary tracking of ancestral vampiric migration layers.", descriptionAr: "برام ستوكر — تتبع رسائلي لطبقات هجرة مصاصي الدماء العريقة." },
    { id: "dr-jekyll-mr-hyde", nameEn: "🧪 Jekyll & Mr. Hyde", nameAr: "🧪 د. جيكل والسيد هايد", icon: "🧪", descriptionEn: "R. L. Stevenson — The fundamental split profile of human moral duality.", descriptionAr: "ر. ل. ستيفنسون — الملف المنقسم الأساسي لثنائية الأخلاق البشرية." },
    { id: "the-picture-of-dorian-gray", nameEn: "🖼️ The Picture of Dorian Gray", nameAr: "🖼️ صورة دوريان غراي", icon: "🖼️", descriptionEn: "Oscar Wilde — Dark aesthetic tracking of a portrait absorbing internal sins.", descriptionAr: "أوسكار وايلد — تتبع جمالي مظلم للوحة تمتص الخطايا الداخلية." },
    { id: "the-monk", nameEn: "⛪ The Monk", nameAr: "⛪ الراهب", icon: "⛪", descriptionEn: "Matthew Lewis — Transgressive gothic corruption tracking structures.", descriptionAr: "ماثيو لويس — بنيات تتبع الفساد القوطي التجاوزي." },
    { id: "the-mysteries-of-udolpho", nameEn: "🏰 The Mysteries of Udolpho", nameAr: "🏰 أسرار أدولفو", icon: "🏰", descriptionEn: "Ann Radcliffe — Foundational atmospheric castle containment matrices.", descriptionAr: "آن رادكليف — مصفوفات احتواء القلعة الجوية التأسيسية." },
    { id: "the-castle-of-otranto", nameEn: "👑 The Castle of Otranto", nameAr: "👑 قلعة أوترانتو", icon: "👑", descriptionEn: "Horace Walpole — Source zero archetype governing all gothic fiction.", descriptionAr: "هوراس والبول — النموذج الأصلي صفر المصدر الحاكم لكل الخيال القوطي." },
    { id: "the-haunting-of-hill-house", nameEn: "🏚️ The Haunting of Hill House", nameAr: "🏚️ رعب منزل هيل", icon: "🏚️", descriptionEn: "Shirley Jackson — Psychogeographical architectural mapping of dread.", descriptionAr: "شيرلي جاكسون — رسم خرائط معماري نفسي وجغرافي للرعب." }
  ]

  // Locked Vault Template Generator for Cosmic Shelves
  const createLockedVault = (categoryEn: string, categoryAr: string) => [
    { 
      id: "locked-vault", 
      nameEn: `🔒 ${categoryEn} Chamber`, 
      nameAr: `🔒 غرفة ${categoryAr}`, 
      icon: "🔒", 
      descriptionEn: "Lilith will upload books sooner. Just be patient.", 
      descriptionAr: "ليليث ستقوم برفع الكتب قريباً. فقط كن صبوراً.", 
      isLocked: true 
    }
  ]

  const renderShelfContent = () => {
    let activeCategories = []
    let baseThemeClass = "" 
    let readBtnClass = ""

    if (activeShelf === 'philosophy') {
      activeCategories = philosophyShelf
      baseThemeClass = "from-[#23150d]/60 to-[#140b06]/80 border-[#b89047]/20 hover:border-[#b89047]/40"
      readBtnClass = "bg-[#b89047]/20 text-[#e6ca95] border border-[#b89047]/40 hover:bg-[#b89047]/30"
    } else if (activeShelf === 'psychology') {
      activeCategories = psychologyShelf
      baseThemeClass = "from-[#1a1c23]/60 to-[#0e1014]/80 border-[#4d5b7c]/20 hover:border-[#4d5b7c]/40"
      readBtnClass = "bg-[#4d5b7c]/20 text-[#abb9d3] border border-[#4d5b7c]/40 hover:bg-[#4d5b7c]/30"
    } else if (activeShelf === 'gothic') {
      activeCategories = gothicShelf
      baseThemeClass = "from-[#18111e]/60 to-[#0b070f]/80 border-[#8553a7]/20 hover:border-[#8553a7]/40"
      readBtnClass = "bg-[#8553a7]/20 text-[#d0b4e6] border border-[#8553a7]/40 hover:bg-[#8553a7]/30"
    } 
    // New Cosmic Vault Theming
    else if (activeShelf === 'astronomy') {
      activeCategories = createLockedVault('Astronomy', 'علم الفلك')
      baseThemeClass = "from-[#0a1128]/60 to-[#020617]/80 border-[#38bdf8]/20"
    } else if (activeShelf === 'linguistics') {
      activeCategories = createLockedVault('Linguistics', 'اللسانيات')
      baseThemeClass = "from-[#1e1b4b]/60 to-[#0f172a]/80 border-[#818cf8]/20"
    } else if (activeShelf === 'astrobiology') {
      activeCategories = createLockedVault('Astrobiology', 'علم الأحياء الفلكي')
      baseThemeClass = "from-[#064e3b]/60 to-[#022c22]/80 border-[#34d399]/20"
    } else if (activeShelf === 'physics') {
      activeCategories = createLockedVault('Physics', 'الفيزياء')
      baseThemeClass = "from-[#311042]/60 to-[#190524]/80 border-[#f472b6]/20"
    } else if (activeShelf === 'technology') {
      activeCategories = createLockedVault('Technology', 'التكنولوجيا')
      baseThemeClass = "from-[#111827]/60 to-[#030712]/80 border-[#9ca3af]/20"
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeCategories.map((shelf, index) => (
          <motion.div
            key={shelf.id + index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={shelf.isLocked ? {} : { y: -4 }}
            className={`bg-gradient-to-br ${baseThemeClass} backdrop-blur-[2px] rounded-lg p-6 border transition-all duration-300 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl opacity-80">{shelf.icon}</div>
                <div>
                  <h3 className="text-[#f4efe2] font-serif font-medium text-lg tracking-wide">{language === 'en' ? shelf.nameEn : shelf.nameAr}</h3>
                  <p className="text-[#c7beaa]/70 text-xs mt-2 leading-relaxed font-sans font-light italic">{language === 'en' ? shelf.descriptionEn : shelf.descriptionAr}</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              {shelf.isLocked ? (
                <div className="w-full px-4 py-2.5 rounded text-xs tracking-widest font-serif italic text-center text-[#8c826e]/50 border border-white/5 bg-black/40">
                  {language === 'en' ? '🔐 Vault Sealed' : '🔐 القبو مغلق ومحمي'}
                </div>
              ) : (
                <button
                  onClick={() => router.push(`/library/read/${shelf.id}`)}
                  className={`w-full px-4 py-2.5 rounded text-xs tracking-widest font-serif uppercase transition-all duration-300 flex items-center justify-center gap-2 ${readBtnClass}`}
                >
                  🕯️ {language === 'en' ? 'Examine Insights' : 'فحص الرؤى والأرشيف'}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070913] text-[#f4efe2] overflow-hidden relative selection:bg-[#b89047]/30 selection:text-[#f4efe2]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(35,21,13,0.25),transparent_70%)] pointer-events-none" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          onClick={() => router.push("/")}
          className="text-[#c7beaa] opacity-60 hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-xs font-serif tracking-[0.2em]"
        >
          ← {language === 'en' ? 'LEAVE CHAMBER' : 'مغادرة الغرفة'}
        </motion.button>

        <button
          onClick={toggleLanguage}
          className="px-4 py-1.5 rounded bg-transparent border border-[#b89047]/20 text-[#c7beaa] text-xs font-serif hover:border-[#b89047]/50 hover:text-[#f4efe2] transition-all duration-300"
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-10 pb-4 relative z-10">
        <div className="text-4xl mb-4 opacity-40 select-none animate-sway">🏛️</div>
        <h1 className="text-3xl md:text-5xl font-serif font-normal tracking-[0.25em] text-[#e6ca95]">
          {language === 'en' ? 'THE GRAND ARCHIVE' : 'الأرشيف الكبير'}
        </h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#b89047]/40 to-transparent mx-auto mt-4" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12 border-b border-[#b89047]/10 pb-6 text-xs md:text-sm tracking-widest font-serif">
          <button onClick={() => setActiveShelf('philosophy')} className={`px-2 py-1 transition-colors duration-300 ${activeShelf === 'philosophy' ? 'text-[#e6ca95]' : 'text-[#8c826e]'}`}>
            {language === 'en' ? 'Philosophy' : 'الفلسفة'}
          </button>
          <button onClick={() => setActiveShelf('psychology')} className={`px-2 py-1 transition-colors duration-300 ${activeShelf === 'psychology' ? 'text-[#abb9d3]' : 'text-[#8c826e]'}`}>
            {language === 'en' ? 'Psychology' : 'علم النفس'}
          </button>
          <button onClick={() => setActiveShelf('gothic')} className={`px-2 py-1 transition-colors duration-300 ${activeShelf === 'gothic' ? 'text-[#d0b4e6]' : 'text-[#8c826e]'}`}>
            {language === 'en' ? 'Gothic & Poe' : 'القصص القوطية وبو'}
          </button>
          <button onClick={() => setActiveShelf('astronomy')} className={`px-2 py-1 transition-colors duration-300 ${activeShelf === 'astronomy' ? 'text-[#38bdf8]' : 'text-[#8c826e]'}`}>
            {language === 'en' ? 'Astronomy' : 'علم الفلك'}
          </button>
          <button onClick={() => setActiveShelf('linguistics')} className={`px-2 py-1 transition-colors duration-300 ${activeShelf === 'linguistics' ? 'text-[#818cf8]' : 'text-[#8c826e]'}`}>
            {language === 'en' ? 'Linguistics' : 'اللسانيات'}
          </button>
          <button onClick={() => setActiveShelf('astrobiology')} className={`px-2 py-1 transition-colors duration-300 ${activeShelf === 'astrobiology' ? 'text-[#34d399]' : 'text-[#8c826e]'}`}>
            {language === 'en' ? 'Astrobiology' : 'علم الأحياء الفلكي'}
          </button>
          <button onClick={() => setActiveShelf('physics')} className={`px-2 py-1 transition-colors duration-300 ${activeShelf === 'physics' ? 'text-[#f472b6]' : 'text-[#8c826e]'}`}>
            {language === 'en' ? 'Physics' : 'الفيزياء'}
          </button>
          <button onClick={() => setActiveShelf('technology')} className={`px-2 py-1 transition-colors duration-300 ${activeShelf === 'technology' ? 'text-[#9ca3af]' : 'text-[#8c826e]'}`}>
            {language === 'en' ? 'Technology' : 'التكنولوجيا'}
          </button>
          
          <button 
            onClick={() => setShowLilithModal(true)} 
            className="ml-2 px-3 py-1 text-[#e6ca95] hover:text-[#fff] transition-colors duration-300 border border-[#e6ca95]/20 rounded"
          >
            ✨ {language === 'en' ? "Lilith's Books & Novels" : 'كتب وروايات ليليث'}
          </button>
        </div>

        <div className="min-h-[400px]">
          {renderShelfContent()}
        </div>
      </div>

      {showLilithModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0e1017] border border-[#e6ca95]/30 max-w-md w-full p-8 rounded-lg shadow-2xl text-center font-serif text-[#f4efe2]"
          >
            <div className="text-4xl mb-4 text-[#e6ca95]">✒️</div>
            <h3 className="text-xl tracking-widest text-[#e6ca95] uppercase mb-4">
              {language === 'en' ? "Lilith's Secret Grimoires" : 'مخطوطات ليليث السرية'}
            </h3>
            <p className="text-sm text-[#c7beaa] leading-relaxed italic mb-6">
              {language === 'en' 
                ? "Lilith will upload books sooner. Just be patient. The manuscripts are unfolding beautifully in due time."
                : "ليليث ستقوم برفع الكتب قريباً. فقط كن صبوراً. المخطوطات تتكشف وتكتمل بشكل جميل في الوقت المناسب."}
            </p>
            <button 
              onClick={() => setShowLilithModal(false)}
              className="px-6 py-2 bg-[#e6ca95]/10 border border-[#e6ca95]/40 text-xs tracking-widest uppercase hover:bg-[#e6ca95]/20 transition-all text-[#e6ca95] rounded"
            >
              {language === 'en' ? 'Acknowledge & Close' : 'تأكيد وإغلاق'}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}