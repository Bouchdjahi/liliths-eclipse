'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function MusicPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState('spotify')
  const [selectedVideo, setSelectedVideo] = useState(null)

  // Spotify Account
  const spotifyProfile = {
    url: "https://open.spotify.com/user/31s77xloemte22ihj5yonptlcvii?si=253647c5b1e24a9e",
    username: "@liliths.eclipse",
    descriptionEn: "My cosmic playlists for every mood - dark ambient, ethereal wave, gothic dream pop, and spiritual vibrations",
    descriptionAr: "قوائم التشغيل الكونية الخاصة بي لكل مزاج - أجواء مظلمة، موجات أثيرية، بوب أحلام قوطي، واهتزازات روحية"
  }

  // Curated Clips & Reflections with real non-rickroll IDs
  const musicVideos = [
    {
      id: "video1",
      titleEn: "Prequel",
      titleAr: "Prequel",
      artist: "Falling in Reverse",
      descriptionEn: "During that period, I used to feel deeply disconnected in a strange but intense way, as if the world around me was quietly speaking to me. The cold weather made everything feel sharper, and even breathing felt new, like I was noticing air inside my lungs for the first time. I often saw ravens during that time, which added to this unusual sense of meaning in everything around me. I would sit alone for long moments, listening to Prequel by Falling in Reverse on repeat, and the music video deeply drew me in, especially its imagery of breaking chains, which reflected what I was feeling inside without me fully understanding it at the time.",
      descriptionAr: "خلال تلك الفترة، كنت أشعر بانفصال عميق بطريقة غريبة ومكثفة، وكأن العالم من حولي يتحدث إلي بهدوء. جعل الطقس البارد كل شيء يبدو أكثر حدة، وشعرت أن التنفس شيء جديد، وكأنني ألاحظ الهواء داخل رئتي لأول مرة. كثيراً ما رأيت الغربان، مما أضاف إحساساً غريباً بالمعنى لكل شيء من حولي. كنت أجلس بمفردي للحظات طويلة، أستمع إلى الأغنية بشكل متكرر، وقد جذبني الفيديو كليب بعمق، خاصة صور سلاسل الكسر، والتي عكست ما كنت أشعر به في الداخلي دون أن أفهمه تماماً في ذلك الوقت.",
      url: "https://www.youtube.com/watch?v=8X5ZIn7v9fU",
      thumbnail: "https://img.youtube.com/vi/8X5ZIn7v9fU/0.jpg",
      vibe: "🐦 Disconnection & Ravens",
      color: "from-slate-950 to-purple-950"
    },
    {
      id: "video2",
      titleEn: "The Eagle Flies Alone",
      titleAr: "The Eagle Flies Alone",
      artist: "Arch Enemy",
      descriptionEn: "Later on, The Eagle Flies Alone by Arch Enemy became especially meaningful to me. During my awakening phase, when I was breaking away from old beliefs and mental conditioning, I started feeling a strong sense of rebellion and inner independence. The song matched that energy, and I felt deeply drawn to it during that time of transformation.",
      descriptionAr: "في وقت لاحق، أصبحت هذه الأغنية ذات معنى خاص بالنسبة لي. خلال مرحلة صحوتي، عندما كنت أتحرر من المعتقدات القديمة والتكييف العقلي، بدأت أشعر بشعور قوي بالتمرد والاستقلال الداخلي. تلاقت الأغنية مع تلك الطاقة، وشعرت بانجذاب عميق إليها خلال وقت التحول هذا.",
      url: "https://www.youtube.com/watch?v=mjF1rmSVjwM",
      thumbnail: "https://img.youtube.com/vi/mjF1rmSVjwM/0.jpg",
      vibe: "🦅 Rebellion & Awakening",
      color: "from-zinc-950 to-neutral-900"
    },
    {
      id: "video3",
      titleEn: "Dying to Love",
      titleAr: "Dying to Love",
      artist: "Bad Omens",
      descriptionEn: "Later, during a more emotional part of my awakening, I started facing my feelings more directly and realized that I wasn’t actually afraid of love—I deeply wanted it. But because I wasn’t receiving it, I began to feel pain around it. During that time, songs like Dying to Love spoke to me on a deeper level, almost like they were reflecting what I couldn’t fully express in myself.",
      descriptionAr: "لاحقاً، خلال جزء أكثر عاطفية من صحوتي، بدأت في مواجهة مشاعري بشكل مباشر وأدركت أنني لم أكن خائفة من الحب في الواقع - بل أردته بشدة. ولكن لأنني لم أكن أستقبله، بدأت أشعر بالألم حوله. خلال ذلك الوقت، تحدثت إليّ مثل هذه الأغاني على مستوى أعمق، وكأنها تعكس ما لم أستطع التعبير عنه بالكامل في نفسي.",
      url: "https://www.youtube.com/watch?v=1a9v6vN_v8U",
      thumbnail: "https://img.youtube.com/vi/1a9v6vN_v8U/0.jpg",
      vibe: "🖤 Emotional Evolution",
      color: "from-red-950/40 to-black/90"
    },
    {
      id: "video4",
      titleEn: "Nightmare",
      titleAr: "Nightmare",
      artist: "Witto Goom",
      descriptionEn: "During the phase when I was chasing my twin flame, the song Nightmare by Witto Goom felt especially connected to what I was going through. It matched the intensity of my emotions and the confusion I was experiencing at that time, almost like it was expressing the inner chaos and longing I couldn’t fully put into words.",
      descriptionAr: "خلال المرحلة التي كنت أطارد فيها شعاع توأم روحي، شعرت أن أغنية كابوس لـ Witto Goom مرتبطة بشكل خاص بما كنت أمر به. لقد تماشى ذلك مع شدة عواطفي والارتباك الذي كنت أعيشه في ذلك الوقت، وكأنه يعبر عن الفوضى الداخلية والشوق الذي لم أستطع صياغته بالكلمات تماماً.",
      url: "https://www.youtube.com/watch?v=3nS_GvL8-0Y",
      thumbnail: "https://img.youtube.com/vi/3nS_GvL8-0Y/0.jpg",
      vibe: "🔥 Twin Flame Chaos",
      color: "from-fuchsia-950/40 to-black/85"
    },
    {
      id: "video5",
      titleEn: "Alive Again",
      titleAr: "Alive Again",
      artist: "Reed Wonder ft. Aurora Olivas",
      descriptionEn: "During my first spiritual awakening, when I discovered the idea of twin flames and began my healing journey, Alive Again by Reed Wonder and Aurora Olivas really resonated with me. It felt like a reflection of that moment of inner change, as if I was slowly starting to rebuild myself and understand what I was going through on a deeper level.",
      descriptionAr: "خلال صحوتي الروحية الأولى، عندما اكتشفت فكرة توأم الشعلة وبدأت رحلة الشفاء، أحدثت هذه الأغنية صدى حقيقياً داخلي. لقد شعرت وكأنها انعكاس للحظة التغيير الداخلي تلك، كما لو كنت أبدأ ببطء في إعادة بناء نفسي وفهم ما كنت أمر به على مستوى أعمق.",
      url: "https://www.youtube.com/watch?v=N64eMh_O0l8",
      thumbnail: "https://img.youtube.com/vi/N64eMh_O0l8/0.jpg",
      vibe: "✨ Healing & Rebirth",
      color: "from-purple-950/40 to-neutral-950"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04020d] via-[#080314] to-[#010105] text-mono overflow-hidden relative font-mono selection:bg-pink-500 selection:text-black">
      {/* Scanline CRT Arcade Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-40 opacity-70" />

      {/* Retro Pixel Grid Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#ff007f_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Floating Pixel Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl animate-float-slow select-none image-render-pixel"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 4 + 's',
              opacity: 0.25
            }}
          >
            {['🖤', '💀', '👾', '✨', '🕷️'][i % 5]}
          </div>
        ))}
      </div>

      {/* Back button (Pixelated Style) */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-30 text-pink-400 border-2 border-dashed border-pink-500/40 hover:border-pink-500 bg-black/80 px-4 py-2 rounded-none transition-all duration-200 text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(236,72,153,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(236,72,153,0.5)] active:translate-y-0.5"
      >
        ◀ {language === 'en' ? '← ← ← ← BACK TO ECLIPSE' : 'العودة إلى الفضاء'}
      </motion.button>

      {/* Language Toggle (Pixelated Style) */}
      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-30 px-4 py-2 bg-purple-950/80 text-pink-400 border-2 border-pink-500/50 hover:bg-pink-500 hover:text-black transition-all duration-200 text-xs shadow-[4px_4px_0px_0px_rgba(168,85,247,0.4)]"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-16 pb-8 relative z-10"
      >
        <div className="text-5xl mb-4 animate-bounce-soft select-none tracking-widest">👾🖤💀👾</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-pink-500 bg-clip-text drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
          {language === 'en' ? "LILITH'S ARCADE" : 'موسيقى ليليث'}
        </h1>
        <p className="text-pink-400 text-xs tracking-widest mt-4 bg-black/40 inline-block px-4 py-1 border border-pink-500/20">
          {language === 'en' ? 'STATION: PIXEL.KUROMI.CORE' : 'محطة: بيكسيز • كورومي'}
        </p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('spotify')}
            className={`px-6 py-3 text-sm tracking-widest transition-all duration-150 relative ${activeTab === 'spotify' ? 'bg-purple-900/40 text-pink-300 border-2 border-pink-400 shadow-[4px_4px_0px_0px_#ec4899]' : 'bg-black/60 text-purple-400/70 border-2 border-purple-950 hover:border-purple-800'}`}
          >
            [ 🎧 {language === 'en' ? 'Spotify' : 'سبوتيفاي'} ]
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 text-sm tracking-widest transition-all duration-150 relative ${activeTab === 'videos' ? 'bg-purple-900/40 text-pink-300 border-2 border-pink-400 shadow-[4px_4px_0px_0px_#ec4899]' : 'bg-black/60 text-purple-400/70 border-2 border-purple-950 hover:border-purple-800'}`}
          >
            [ 📺 {language === 'en' ? 'Clips' : 'فيديوهات'} ]
          </button>
          <button
            onClick={() => setActiveTab('songs')}
            className={`px-6 py-3 text-sm tracking-widest transition-all duration-150 relative ${activeTab === 'songs' ? 'bg-purple-900/40 text-pink-300 border-2 border-pink-400 shadow-[4px_4px_0px_0px_#ec4899]' : 'bg-black/60 text-purple-400/70 border-2 border-purple-950 hover:border-purple-800'}`}
          >
            [ ✍️ {language === 'en' ? 'My Songs' : 'أغانيّ'} ]
          </button>
        </div>

        {/* Spotify Section */}
        {activeTab === 'spotify' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-black/80 border-4 border-double border-purple-500/60 p-8 shadow-[8px_8px_0px_0px_rgba(147,51,234,0.3)] relative">
              <div className="absolute top-2 left-2 text-[10px] text-purple-500/40">&lt;SYS_CONN&gt;</div>
              <div className="text-6xl mb-4 text-center text-purple-400 animate-pulse">👾</div>
              <h2 className="text-xl text-pink-300 text-center uppercase tracking-widest">KUROMI PLAYLIST HUB</h2>
              <p className="text-purple-400/60 text-xs text-center mb-6">{spotifyProfile.username}</p>
              <p className="text-gray-400 text-xs mb-8 text-center leading-relaxed bg-purple-950/20 p-4 border border-purple-900/40">
                {language === 'en' ? spotifyProfile.descriptionEn : spotifyProfile.descriptionAr}
              </p>
              <div className="text-center">
                <a
                  href={spotifyProfile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-500 text-black font-bold text-xs tracking-widest uppercase transition-colors border-2 border-black shadow-[4px_4px_0px_0px_#fff]"
                >
                  🚀 {language === 'en' ? 'LAUNCH SPOTIFY' : 'تشغيل الحساب'}
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Music Videos Section */}
        {activeTab === 'videos' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {musicVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedVideo(video)}
                className={`bg-black/90 border-2 border-purple-900/60 hover:border-pink-500 p-4 transition-all duration-200 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_#ec4899]`}
              >
                <div className="relative border border-purple-950 mb-3 bg-neutral-950">
                  <img
                    src={video.thumbnail}
                    alt={video.titleEn}
                    className="w-full h-36 object-cover opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 image-render-pixel"
                  />
                  <div className="absolute bottom-1 left-1 bg-black text-[9px] text-pink-400 px-2 py-0.5 border border-pink-500/30">
                    {video.vibe}
                  </div>
                </div>
                <h3 className="text-pink-200 text-sm tracking-wide truncate">{language === 'en' ? video.titleEn : video.titleAr}</h3>
                <p className="text-purple-400/60 text-[10px] uppercase mb-2">{video.artist}</p>
                <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-3 bg-purple-950/10 p-2 border border-purple-950">
                  {language === 'en' ? video.descriptionEn : video.descriptionAr}
                </p>
                <div className="mt-3 text-pink-500/50 text-[9px] tracking-widest text-right">
                  [ {language === 'en' ? 'EXECUTE WATCH' : 'عرض الفيد'} ]
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* My Songs Section */}
        {activeTab === 'songs' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="bg-black/90 border-2 border-dashed border-pink-500/50 p-8 shadow-[4px_4px_0px_0px_#ec4899]">
              <div className="text-4xl mb-3 animate-pulse">🔒</div>
              <h3 className="text-pink-300 font-bold tracking-widest uppercase text-sm mb-2">
                {language === 'en' ? 'Transmission Locked' : 'الإرسال مغلق'}
              </h3>
              <p className="text-gray-400 text-xs tracking-wider leading-relaxed bg-purple-950/20 p-4 border border-purple-900/30">
                {language === 'en' 
                  ? 'I will publish them sooner. Tracks are currently offline, undergoing calibration within the void.' 
                  : 'سأقوم بنشرهم قريباً جداً. الأغاني حالياً غير متصلة بالشبكة وتخضع للمعايرة.'}
              </p>
              <div className="mt-4 text-[9px] text-purple-500 tracking-widest uppercase">
                [ status: unreleased // writing phase ]
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#07040f] border-4 border-pink-500 p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 text-pink-500 hover:text-white text-sm bg-black px-2 py-1 border border-pink-500 font-mono z-50"
              >
                [X]
              </button>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-pink-300 uppercase tracking-widest">
                  {language === 'en' ? selectedVideo.titleEn : selectedVideo.titleAr}
                </h2>
                <p className="text-purple-400 text-xs">{selectedVideo.artist}</p>
              </div>
              <div className="max-h-48 overflow-y-auto custom-scrollbar bg-black p-4 border border-purple-950 mb-4 text-gray-300 text-xs leading-relaxed">
                {language === 'en' ? selectedVideo.descriptionEn : selectedVideo.descriptionAr}
              </div>
              <div className="aspect-video bg-black border-2 border-dashed border-purple-900 flex flex-col items-center justify-center p-4">
                <p className="text-pink-400/60 text-center text-xs tracking-wide">
                  👾 {language === 'en' ? 'CRT VIDEO DECODER LINK ACTIVE' : 'رابط وحدة فك ترميز الفيديو نشط'}
                  <br />
                  <a href={selectedVideo.url} target="_blank" rel="noopener noreferrer" className="text-purple-300 underline mt-4 inline-block tracking-widest text-[11px] hover:text-pink-400">
                    {language === 'en' ? 'LAUNCH_EXTERNAL_YT_STREAM →' : 'شاهد على يوتيوب →'}
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="relative z-10 text-center py-12">
        <p className="text-purple-500/30 text-[9px] tracking-widest bg-black/20 inline-block px-4 py-1 border border-purple-950/20">
          💀 [ PIXEL_MATRIX v1.2 // LILITH ] 💀
        </p>
      </div>

      <style>{`
        @keyframes float-slow { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(3deg); } }
        @keyframes bounce-soft { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-bounce-soft { animation: bounce-soft 2.5s ease-in-out infinite; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .image-render-pixel { image-rendering: pixelated; image-rendering: crisp-edges; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { bg: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { bg: #ec4899; }
      `}</style>
    </div>
  )
}