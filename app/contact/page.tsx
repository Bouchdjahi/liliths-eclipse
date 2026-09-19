'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function ContactPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()

  const content = {
    en: {
      title: "LILITH'S ECLIPSE",
      subtitle: "REACH OUT THROUGH THE COSMIC VOID",
      
      botTitle: "🔮 The Cosmic Hub (Telegram Bot)",
      botUsername: "@lilithseclipsebot",
      botDesc: "Your master key to everything. Find detailed explanations of my services, courses, pricing structures, and general guidance 24/7.",
      botButton: "Enter The Hub →",

      bookingTitle: "🌙 Personal Sessions & Consultations",
      bookingUsername: "@xlilithec",
      bookingDesc: "Strictly for booking paid sessions. Contact me directly to arrange your specific date and time slot. (Paid services only).",
      bookingButton: "Request Session →",

      tellonymTitle: "👁️ Anonymous Cosmic Questions",
      tellonymUsername: "tellonym.me/liliths.ecilipse",
      tellonymDesc: "Have a burning question? Leave it here anonymously. I will transform selected questions into detailed explanatory posts.",
      tellonymButton: "Drop a Question →",

      tiktokTitle: "📱 TikTok Content",
      tiktokUsername: "@liliths.eclipse",
      tiktokDesc: "My ideas, my guidance, and everything you want to learn.",
      tiktokButton: "My Profile →",

      securityTitle: "⚠️ CRITICAL SECURITY WARNING",
      securityWarning: "I have NO other accounts on any other social platforms. If you encounter any profile using my username, brand name, or pictures anywhere else—be highly cautious. It is NOT me. Please report them immediately to protect the community.",
      officialListTitle: "My Only Official Cosmic Gateways:",
      
      backButton: "← ← ← ← ← BACK TO ECLIPSE"
    },
    ar: {
      title: "خسوف ليليث",
      subtitle: "تواصل عبر الفراغ الكوني",
      
      botTitle: "🔮 المركز الكوني (بوت التليجرام)",
      botUsername: "@lilithseclipsebot",
      botDesc: "متاح لك دائماً. تجد هنا شرحاً مفصلاً لخدماتي، دوراتي، الأسعار، والإرشادات العامة على مدار الساعة.",
      botButton: "دخول المركز →",

      bookingTitle: "🌙 الجلسات الخاصة والاستشارات",
      bookingUsername: "@xlilithec",
      bookingDesc: "مخصص فقط لحجز الجلسات المدفوعة. تواصل معي مباشرة لتحديد اليوم والساعة المناسبة لك. (خدمة غير مجانية).",
      bookingButton: "طلب حجز جلسة →",

      tellonymTitle: "👁️ أسئلة كونية مجهولة",
      tellonymUsername: "tellonym.me/liliths.ecilipse",
      tellonymDesc: "هل لديك سؤال محير؟ أرسله هنا بشكل مجهول. سأقوم بتحويل الأسئلة المختارة إلى منشورات شرح مفصلة.",
      tellonymButton: "أرسل سؤالك →",

      tiktokTitle: "📱 محتوى التيك توك",
      tiktokUsername: "@liliths.eclipse",
      tiktokDesc: "أفكاري، إرشاداتي، وكل ما تريد تعلمه.",
      tiktokButton: "ملفي الشخصي →",

      securityTitle: "⚠️ تحذير أمني هام جداً",
      securityWarning: "ليس لدي أي حسابات أخرى على أي منصة تواصل اجتماعي. إذا صادفت أي حساب يستخدم اسمي أو صوري في أي مكان آخر—احذر تماماً، فهو ليس أنا. يرجى الإبلاغ عن هذه الحسابات فوراً لحماية الجميع.",
      officialListTitle: "بواباتي الرسمية والوحيدة:",
      
      backButton: "← العودة إلى الفضاء"
    }
  }

  const c = content[language]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020410] via-[#05081c] to-[#01020a] text-gray-100 relative overflow-y-auto pb-16 selection:bg-purple-500/30">
      
      {/* Deep Space Background Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              width: Math.random() * 2 + 0.5 + 'px',
              height: Math.random() * 2 + 0.5 + 'px',
              backgroundColor: 'rgba(156, 163, 255, ' + (Math.random() * 0.4 + 0.1) + ')',
              animation: 'twinkle ' + (Math.random() * 3 + 2) + 's ease-in-out infinite',
              animationDelay: Math.random() * 4 + 's'
            }}
          />
        ))}
      </div>

      {/* Navigation Layer */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="text-purple-400/60 hover:text-purple-300 transition-all text-xs tracking-widest bg-purple-950/20 backdrop-blur-md px-4 py-2 rounded-full border border-purple-900/30"
        >
          {c.backButton}
        </motion.button>

        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-purple-950/40 rounded-full text-purple-300 text-xs tracking-wider hover:bg-purple-900/50 transition-all border border-purple-500/20 backdrop-blur-md"
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 mt-10">
        
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.25em] text-transparent bg-gradient-to-r from-purple-200 via-indigo-200 to-slate-400 bg-clip-text">
            {c.title}
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mx-auto mt-4" />
          <p className="text-purple-400/40 text-[10px] tracking-[0.35em] uppercase mt-3">{c.subtitle}</p>
        </motion.div>

        {/* Action Gateways Grid */}
        <div className="space-y-6">
          
          {/* HUB - TELEGRAM BOT */}
          <motion.a
            href="https://t.me/lilithseclipsebot"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="block group bg-gradient-to-br from-[#0a071a] to-[#120b2e] rounded-2xl p-6 border border-purple-900/40 hover:border-purple-600/50 transition-all duration-300 shadow-xl hover:shadow-purple-950/20"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-light text-purple-200 group-hover:text-purple-100 transition-colors">{c.botTitle}</h3>
                <p className="text-purple-400/70 font-mono text-xs mt-0.5">{c.botUsername}</p>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed font-light">{c.botDesc}</p>
              </div>
              <div className="shrink-0 text-center sm:text-right">
                <span className="inline-block bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs px-4 py-2 rounded-xl group-hover:bg-purple-900/80 transition-all font-medium">
                  {c.botButton}
                </span>
              </div>
            </div>
          </motion.a>

          {/* SESSIONS - PERSONAL TELEGRAM */}
          <motion.a
            href="https://t.me/xlilithec"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="block group bg-gradient-to-br from-[#05091a] to-[#0a1230] rounded-2xl p-6 border border-indigo-950/60 hover:border-indigo-500/40 transition-all duration-300 shadow-xl hover:shadow-indigo-950/20"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-light text-indigo-200 group-hover:text-indigo-100 transition-colors">{c.bookingTitle}</h3>
                <p className="text-indigo-400/70 font-mono text-xs mt-0.5">{c.bookingUsername}</p>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed font-light">{c.bookingDesc}</p>
              </div>
              <div className="shrink-0 text-center sm:text-right">
                <span className="inline-block bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs px-4 py-2 rounded-xl group-hover:bg-indigo-900/80 transition-all font-medium">
                  {c.bookingButton}
                </span>
              </div>
            </div>
          </motion.a>

          {/* QUESTIONS - TELLONYM */}
          <motion.a
            href="https://tellonym.me/liliths.ecilipse"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="block group bg-gradient-to-br from-[#09090b] to-[#18181b] rounded-2xl p-6 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-light text-zinc-200 group-hover:text-zinc-100 transition-colors">{c.tellonymTitle}</h3>
                <p className="text-zinc-500 font-mono text-xs mt-0.5">{c.tellonymUsername}</p>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed font-light">{c.tellonymDesc}</p>
              </div>
              <div className="shrink-0 text-center sm:text-right">
                <span className="inline-block bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs px-4 py-2 rounded-xl group-hover:bg-zinc-800 transition-all font-medium">
                  {c.tellonymButton}
                </span>
              </div>
            </div>
          </motion.a>

          {/* SOCIALS - TIKTOK */}
          <motion.a
            href="https://www.tiktok.com/@liliths.eclipse"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="block group bg-gradient-to-br from-[#030708] to-[#0a161a] rounded-2xl p-6 border border-cyan-950/50 hover:border-cyan-700/40 transition-all duration-300 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-light text-cyan-200 group-hover:text-cyan-100 transition-colors">{c.tiktokTitle}</h3>
                <p className="text-cyan-500/70 font-mono text-xs mt-0.5">{c.tiktokUsername}</p>
                <p className="text-cyan-400/80 text-sm mt-2 leading-relaxed font-light">{c.tiktokDesc}</p>
              </div>
              <div className="shrink-0 text-center sm:text-right">
                <span className="inline-block bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs px-4 py-2 rounded-xl group-hover:bg-cyan-950/80 transition-all font-medium">
                  {c.tiktokButton}
                </span>
              </div>
            </div>
          </motion.a>

        </div>

        {/* SECURITY BULLETIN */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12 bg-gradient-to-b from-[#120404] to-[#0a0202] rounded-2xl p-6 border border-red-950/80 backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-3 border-b border-red-950/60 pb-3">
            <span className="text-red-500 text-lg">🔒</span>
            <h4 className="text-red-400 text-xs tracking-[0.2em] font-semibold uppercase">{c.securityTitle}</h4>
          </div>
          <p className="text-red-300/70 text-xs leading-relaxed font-light mb-4">
            {c.securityWarning}
          </p>
          <div className="text-[11px] font-mono text-zinc-500 space-y-1 bg-black/30 p-3 rounded-xl border border-red-950/30">
            <p className="text-zinc-400 mb-1 font-sans">{c.officialListTitle}</p>
            <p className="text-purple-400/80">• Telegram Hub: @lilithseclipsebot</p>
            <p className="text-indigo-400/80">• Bookings: @xlilithec</p>
            <p className="text-cyan-400/80">• TikTok: @liliths.eclipse</p>
            <p className="text-zinc-400">• Tellonym: liliths.ecilipse</p>
          </div>
        </motion.div>

      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}