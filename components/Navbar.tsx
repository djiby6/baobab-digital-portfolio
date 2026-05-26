'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FiLinkedin, FiFacebook, FiInstagram, FiMessageCircle } from 'react-icons/fi'
import { SiTiktok, SiBehance } from 'react-icons/si'
import { useSectionNavigation } from '@/hooks/useSectionNavigation'

const navSocials = [
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/djibril-ndiaye-53b377411', label: 'LinkedIn', color: '#0A66C2' },
  { icon: FiFacebook, href: 'https://www.facebook.com/profile.php?id=61590459927081', label: 'Facebook', color: '#1877F2' },
  { icon: FiInstagram, href: 'https://www.instagram.com/baobabdigitalwebsaas', label: 'Instagram', color: '#E1306C' },
  { icon: SiTiktok, href: 'https://www.tiktok.com/@baobabdigital1', label: 'TikTok', color: '#010101' },
  { icon: SiBehance, href: 'https://www.behance.net/djibrilndiaye3', label: 'Behance', color: '#1769FF' },
  { icon: FiMessageCircle, href: 'https://wa.me/212773591012', label: 'WhatsApp', color: '#16A34A' },
]

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { activeSection, scrollToSection } = useSectionNavigation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    scrollToSection(href)
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(248,250,252,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(37,99,235,0.10)' : 'none',
          boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('#hero')}
              className="flex items-center group"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Retour en haut de page"
            >
              <Image
                src="/images/baobab-logo.png"
                alt="Baobab Digital — Agence développement web SaaS Afrique"
                width={180}
                height={80}
                priority
                style={{
                  height: '58px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(37,99,235,0.20))',
                  transition: 'filter 0.3s ease',
                }}
              />
            </motion.button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i + 0.3 }}
                    onClick={() => handleNavClick(link.href)}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 group"
                    style={{ color: isActive ? '#2563EB' : '#475569' }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {/* Active underline */}
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
                      style={{
                        background: 'linear-gradient(90deg, #2563EB, #06B6D4)',
                        width: isActive ? '70%' : '0%',
                      }}
                    />
                    {/* Hover underline */}
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full opacity-0 group-hover:opacity-40 transition-all duration-300"
                      style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)', width: '70%' }}
                    />
                  </motion.button>
                )
              })}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                onClick={() => handleNavClick('#contact')}
                className="hidden md:block btn-primary text-xs tracking-widest"
                style={{ padding: '10px 24px' }}
              >
                Me contacter
              </motion.button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2"
                aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={mobileOpen}
              >
                <motion.span
                  animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
                  className="block w-6 h-0.5 origin-center"
                  style={{ background: '#2563EB' }}
                />
                <motion.span
                  animate={{ opacity: mobileOpen ? 0 : 1 }}
                  className="block w-4 h-0.5"
                  style={{ background: '#2563EB' }}
                />
                <motion.span
                  animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
                  className="block w-6 h-0.5 origin-center"
                  style={{ background: '#2563EB' }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden bg-slate-900/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 bottom-0 z-40 lg:hidden w-72 flex flex-col pt-20 pb-8 px-8 gap-2"
              style={{
                background: 'rgba(248,250,252,0.98)',
                borderLeft: '1px solid rgba(37,99,235,0.12)',
                boxShadow: '-8px 0 40px rgba(0,0,0,0.08)',
              }}
              role="dialog"
              aria-label="Menu de navigation"
            >
              {/* Logo mobile */}
              <div className="flex items-center justify-center mb-6 pb-5 border-b border-slate-100">
                <Image
                  src="/images/baobab-logo.png"
                  alt="Baobab Digital"
                  width={180}
                  height={80}
                  style={{
                    height: '80px',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 8px rgba(37,99,235,0.20))',
                  }}
                />
              </div>

              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left py-3.5 px-4 rounded-xl font-medium transition-all duration-200"
                    style={{
                      color: isActive ? '#2563EB' : '#475569',
                      background: isActive ? 'rgba(37,99,235,0.06)' : 'transparent',
                      border: isActive ? '1px solid rgba(37,99,235,0.15)' : '1px solid transparent',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </motion.button>
                )
              })}

              <div className="mt-auto space-y-4">
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="btn-primary w-full text-center text-sm"
                >
                  Me contacter
                </button>

                {/* Socials mobile */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  {navSocials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                      style={{ background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0' }}
                      onMouseEnter={(e) => {
                        const t = e.currentTarget as HTMLElement
                        t.style.background = `${s.color}15`
                        t.style.borderColor = `${s.color}30`
                        t.style.color = s.color
                        t.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        const t = e.currentTarget as HTMLElement
                        t.style.background = '#F1F5F9'
                        t.style.borderColor = '#E2E8F0'
                        t.style.color = '#64748B'
                        t.style.transform = 'translateY(0)'
                      }}
                    >
                      <s.icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
