'use client'

import Link from 'next/link'

export default function ContactPage() {
  const socials = [
    {
      icon: '💬',
      title: 'The Cosmic Hub (Telegram Bot)',
      handle: '@lilithseclipsebot',
      description: 'Your master key to everything. Find detailed explanations of my services, courses, pricing structures, and general guidance 24/7.',
      buttonText: 'Enter The Hub',
      link: 'https://t.me/lilithseclipsebot',
      accent: 'purple',
    },
    {
      icon: '🌙',
      title: 'Personal Sessions & Consultations',
      handle: '@xlilthec',
      description: 'Strictly for booking paid sessions. Contact me directly to arrange your specific date and time slot. (Paid services only).',
      buttonText: 'Request Session',
      link: 'https://t.me/xlilthec',
      accent: 'blue',
    },
    {
      icon: '🕳️',
      title: 'Anonymous Cosmic Questions',
      handle: 'tellonym.me/liliths.eclipse',
      description: 'Have a burning question? Leave it here anonymously. I will transform selected questions into detailed explanatory posts.',
      buttonText: 'Drop a Question',
      link: 'https://tellonym.me/liliths.eclipse',
      accent: 'silver',
    },
    {
      icon: '📱',
      title: 'TikTok Content',
      handle: '@liliths.eclipse',
      description: 'My ideas, my guidance, and everything you want to learn.',
      buttonText: 'My Profile',
      link: 'https://www.tiktok.com/@liliths.eclipse',
      accent: 'teal',
    },
    {
      icon: '📸',
      title: 'Instagram',
      handle: '@liliths_eclipse',
      description: 'Daily cosmic insights, aesthetic reels, and behind-the-scenes of the Lilith\'s Space universe.',
      buttonText: 'Follow on Instagram',
      link: 'https://instagram.com/liliths_eclipse',
      accent: 'pink',
    },
    {
      icon: '✖️',
      title: 'X (Twitter)',
      handle: '@lilithseclipse1',
      description: 'Short-form cosmic thoughts, live updates, and quick guidance throughout the day.',
      buttonText: 'Follow on X',
      link: 'https://x.com/lilithseclipse1',
      accent: 'silver',
    },
  ]

  const accentStyles: Record<string, string> = {
    purple: 'border-purple-500/30 hover:border-purple-400/60 shadow-purple-500/10',
    blue: 'border-blue-500/30 hover:border-blue-400/60 shadow-blue-500/10',
    silver: 'border-slate-400/30 hover:border-slate-300/60 shadow-slate-400/10',
    teal: 'border-teal-500/30 hover:border-teal-400/60 shadow-teal-500/10',
    pink: 'border-pink-500/30 hover:border-pink-400/60 shadow-pink-500/10',
  }

  return (
    <div className="min-h-screen bg-[#020308] text-[#f8f9fa] font-nav py-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Link */}
        <Link 
          href="/space" 
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#8892a0] hover:text-[#4a8cff] transition-colors mb-12"
        >
          ← ← ← Back to Eclipse
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl tracking-[0.2em] mb-6">
            LILITH&apos;S ECLIPSE
          </h1>
          <p className="text-[#8892a0] text-[10px] md:text-xs tracking-[0.4em] uppercase">
            Reach out through the cosmic void
          </p>
        </div>

        {/* Social Cards */}
        <div className="space-y-6">
          {socials.map((social, i) => (
            <div
              key={i}
              className={`bg-[#080a14]/60 backdrop-blur-sm border ${accentStyles[social.accent]} rounded-lg p-6 shadow-lg transition-all duration-300 hover:bg-[#0a0d1c]/80`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-light tracking-wide mb-1 flex items-center gap-2">
                    <span className="text-base">{social.icon}</span>
                    <span>{social.title}</span>
                  </h2>
                  <p className="text-[#4a8cff] text-xs tracking-wider mb-3">{social.handle}</p>
                  <p className="text-[#8892a0] text-sm leading-relaxed">{social.description}</p>
                </div>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start md:self-center whitespace-nowrap px-4 py-2 text-xs tracking-widest uppercase border border-[#4a8cff]/40 text-[#4a8cff] rounded-full hover:bg-[#4a8cff]/10 transition-all duration-300"
                >
                  {social.buttonText} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Security Warning */}
        <div className="mt-16 border border-red-500/30 bg-red-950/10 rounded-lg p-6 md:p-8">
          <h3 className="text-red-400 text-sm md:text-base tracking-widest uppercase mb-4 flex items-center gap-3">
            <span>🔒</span>
            <span>⚠ Critical Security Warning</span>
          </h3>
          <p className="text-[#c9c9d1] text-sm leading-relaxed mb-6">
            I have <strong>NO other accounts</strong> on any other social platforms. If you encounter any profile using my username, brand name, or pictures anywhere else—be highly cautious. <strong>It is NOT me.</strong> Please report them immediately to protect the community.
          </p>
          
          <div className="bg-black/40 rounded-md p-4 md:p-5 border border-red-500/20">
            <p className="text-[#8892a0] text-[10px] tracking-[0.3em] uppercase mb-3">
              My Only Official Cosmic Gateways:
            </p>
            <ul className="space-y-2 text-xs text-[#d1d5db]">
              <li className="flex items-center gap-2">
                <span className="text-[#4a8cff]">•</span>
                <span>Telegram Hub: <span className="text-[#8892a0]">@lilithseclipsebot</span></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#4a8cff]">•</span>
                <span>Bookings: <span className="text-[#8892a0]">@xlilthec</span></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#4a8cff]">•</span>
                <span>TikTok: <span className="text-[#8892a0]">@liliths.eclipse</span></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#4a8cff]">•</span>
                <span>Instagram: <span className="text-[#8892a0]">@liliths_eclipse</span></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#4a8cff]">•</span>
                <span>X (Twitter): <span className="text-[#8892a0]">@lilithseclipse1</span></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#4a8cff]">•</span>
                <span>Tellonym: <span className="text-[#8892a0]">liliths.eclipse</span></span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}