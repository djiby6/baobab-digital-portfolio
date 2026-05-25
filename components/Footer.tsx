'use client'

import { motion } from 'framer-motion'
import { FiMail, FiMessageCircle, FiInstagram, FiLinkedin, FiFacebook, FiHeart } from 'react-icons/fi'
import { SiTiktok, SiBehance } from 'react-icons/si'
import Image from 'next/image'

const footerLinks = {
  Navigation: [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Services', href: '#services' },
  ],
  Projets: [
    { label: 'Mbalax Hub', href: '#projects' },
    { label: 'Applications SaaS', href: '#projects' },
    { label: 'Projets IA', href: '#projects' },
    { label: 'Voir tous', href: '#projects' },
  ],
  Contact: [
    { label: 'WhatsApp', href: 'https://wa.me/212773591012' },
    { label: 'Email', href: 'mailto:marketingdj12@gmail.com' },
    { label: 'Instagram', href: 'https://www.instagram.com/baobabdigitalwebsaas' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/djibril-ndiaye-53b377411' },
  ],
}

const socials = [
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/djibril-ndiaye-53b377411', label: 'LinkedIn', color: '#0A66C2' },
  { icon: FiFacebook, href: 'https://www.facebook.com/profile.php?id=61590459927081', label: 'Facebook', color: '#1877F2' },
  { icon: FiInstagram, href: 'https://www.instagram.com/baobabdigitalwebsaas', label: 'Instagram', color: '#E1306C' },
  { icon: SiTiktok, href: 'https://www.tiktok.com/@baobabdigital1', label: 'TikTok', color: '#010101' },
  { icon: SiBehance, href: 'https://www.behance.net/djibrilndiaye3', label: 'Behance', color: '#1769FF' },
  { icon: FiMessageCircle, href: 'https://wa.me/212773591012', label: 'WhatsApp', color: '#16A34A' },
  { icon: FiMail, href: 'mailto:marketingdj12@gmail.com', label: 'Email', color: '#2563EB' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-slate-100 bg-[#F8FAFC]">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(37,99,235,0.04), transparent)',
        }}
      />

      <div className="relative container-custom">
        {/* Top section */}
        <div className="py-16 grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/images/baobab-logo.png"
                alt="Baobab Digital — Agence digitale web SaaS IA Afrique"
                width={180}
                height={80}
                style={{
                  height: '90px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 16px rgba(37,99,235,0.15)) drop-shadow(0 2px 6px rgba(6,182,212,0.10))',
                }}
              />
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
              Nous transformons les idées africaines en solutions digitales
              modernes et compétitives à l&apos;échelle internationale.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    color: '#94A3B8',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.background = `${s.color}10`
                    target.style.borderColor = `${s.color}25`
                    target.style.color = s.color
                    target.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.background = '#FFFFFF'
                    target.style.borderColor = '#E2E8F0'
                    target.style.color = '#94A3B8'
                    target.style.transform = 'translateY(0)'
                  }}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-slate-400 text-xs tracking-[0.3em] uppercase font-medium mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('#') ? (
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-slate-500 text-sm hover:text-blue-600 transition-colors duration-200 text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 text-sm hover:text-blue-600 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="glow-line" />

        {/* Bottom bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs">
            © 2024 Baobab Digital. Tous droits réservés.
          </p>
          <p className="text-slate-400 text-xs flex items-center gap-1.5">
            Fait avec{' '}
            <FiHeart
              size={12}
              style={{ color: '#2563EB', fill: '#2563EB' }}
            />{' '}
            par{' '}
            <span className="text-blue-600">Djibril Ndiaye</span>
            {' '}— Baobab Digital 🌍
          </p>
          <div className="flex gap-6">
            <button className="text-slate-400 text-xs hover:text-slate-600 transition-colors">
              Politique de confidentialité
            </button>
            <button className="text-slate-400 text-xs hover:text-slate-600 transition-colors">
              Mentions légales
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
