'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiLinkedin, FiFacebook, FiInstagram, FiMessageCircle } from 'react-icons/fi'
import { SiTiktok, SiBehance } from 'react-icons/si'

const heroSocials = [
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/djibril-ndiaye-53b377411', label: 'LinkedIn', color: '#0A66C2' },
  { icon: FiFacebook, href: 'https://www.facebook.com/profile.php?id=61590459927081', label: 'Facebook', color: '#1877F2' },
  { icon: FiInstagram, href: 'https://www.instagram.com/baobabdigitalwebsaas', label: 'Instagram', color: '#E1306C' },
  { icon: SiTiktok, href: 'https://www.tiktok.com/@baobabdigital1', label: 'TikTok', color: '#010101' },
  { icon: SiBehance, href: 'https://www.behance.net/djibrilndiaye3', label: 'Behance', color: '#1769FF' },
  { icon: FiMessageCircle, href: 'https://wa.me/212773591012', label: 'WhatsApp', color: '#16A34A' },
]

const roles = [
  'Développeur Full Stack',
  'Créateur SaaS',
  'UI/UX Designer',
  'Architecte Digital',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const speed = isDeleting ? 40 : 80
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, displayText.length + 1))
        if (displayText.length === currentRole.length) setTimeout(() => setIsDeleting(true), 1500)
      } else {
        setDisplayText(currentRole.slice(0, displayText.length - 1))
        if (displayText.length === 0) {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const colors = ['#2563EB', '#3B82F6', '#06B6D4', '#0EA5E9', '#60A5FA']
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.6 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.3 + 0.06,
    }))
    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      })
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (dist < 100) {
            ctx.save()
            ctx.globalAlpha = (1 - dist / 100) * 0.05
            ctx.strokeStyle = '#2563EB'; ctx.lineWidth = 0.5
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke()
            ctx.restore()
          }
        })
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF]">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.7 }} />
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Light orbs */}
      <div className="absolute top-10 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07), transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06), transparent 70%)', filter: 'blur(60px)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Texte */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-7"
            >
              <Image
                src="/images/baobab-logo.png"
                alt="Baobab Digital"
                width={180}
                height={80}
                priority
                style={{
                  height: '72px', width: 'auto', objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 16px rgba(37,99,235,0.25)) drop-shadow(0 2px 8px rgba(6,182,212,0.15))',
                }}
              />
            </motion.div>

            {/* Badge disponible */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-widest mb-6"
              style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.20)', color: '#2563EB' }}
            >
              <span className="w-2 h-2 rounded-full badge-pulse" style={{ background: '#2563EB' }} />
              DISPONIBLE POUR MISSIONS
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-slate-400 text-lg font-light tracking-wider mb-3"
            >
              Bonjour, je suis
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-space-grotesk text-5xl sm:text-6xl lg:text-7xl font-bold mb-5 leading-none"
            >
              <span className="block text-slate-900">Djibril</span>
              <span className="block" style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 55%, #06B6D4 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Ndiaye
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mb-7 h-10"
            >
              <div className="w-[3px] h-8 rounded-full"
                style={{ background: 'linear-gradient(180deg, #2563EB, #06B6D4)' }} />
              <span className="text-xl sm:text-2xl font-medium" style={{
                background: 'linear-gradient(90deg, #2563EB, #06B6D4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {displayText}
                <span className="inline-block w-0.5 h-6 ml-1 align-middle animate-pulse"
                  style={{ background: '#2563EB' }} />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="text-slate-500 text-base sm:text-lg max-w-lg mb-9 leading-relaxed font-light"
            >
              Je construis des solutions digitales{' '}
              <span style={{ color: '#2563EB', fontWeight: 500 }}>premium</span>{' '}
              pour les entrepreneurs africains qui veulent{' '}
              <span style={{ color: '#06B6D4', fontWeight: 500 }}>dominer le marché digital</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary font-space-grotesk tracking-widest"
              >
                Voir mes projets
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary font-space-grotesk tracking-widest"
              >
                Me contacter
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="flex gap-10"
            >
              {[
                { value: '3+', label: "Ans d'expérience" },
                { value: '20+', label: 'Projets livrés' },
                { value: '100%', label: 'Satisfaction' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold font-space-grotesk" style={{
                    background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>{s.value}</div>
                  <div className="text-slate-400 text-xs tracking-wide mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Photo de profil */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Halo extérieur */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0.06, 0.25] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute rounded-3xl pointer-events-none"
                style={{
                  inset: '-12%',
                  background: 'radial-gradient(ellipse, rgba(37,99,235,0.30), rgba(6,182,212,0.12), transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />

              {/* Photo flottante */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Bordure gradient animée */}
                <div style={{
                  background: 'linear-gradient(135deg, #60A5FA, #2563EB, #06B6D4, #38BDF8)',
                  padding: '2px', borderRadius: '28px',
                  boxShadow: '0 20px 60px rgba(37,99,235,0.20), 0 4px 20px rgba(37,99,235,0.12)',
                }}>
                  <div style={{ borderRadius: '26px', overflow: 'hidden', background: '#F8FAFC' }}>
                    <Image
                      src="/images/profile-photo.png"
                      alt="Djibril Ndiaye — Baobab Digital"
                      width={400}
                      height={460}
                      priority
                      style={{ display: 'block', objectFit: 'cover', objectPosition: 'center top' }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Badge expérience */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
                className="absolute -left-10 top-16 px-4 py-3 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(37,99,235,0.15)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 20px rgba(37,99,235,0.12)',
                }}
              >
                <div className="text-[10px] text-slate-400 mb-0.5 tracking-wider">EXPÉRIENCE</div>
                <div className="text-lg font-bold" style={{ color: '#2563EB' }}>3+ Ans</div>
              </motion.div>

              {/* Badge disponible */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.3, type: 'spring', stiffness: 200 }}
                className="absolute -right-8 bottom-20 px-4 py-3 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(6,182,212,0.20)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 20px rgba(6,182,212,0.12)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full badge-pulse"
                    style={{ background: '#06B6D4' }} />
                  <span className="text-sm font-semibold" style={{ color: '#06B6D4' }}>Disponible</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 tracking-wide">Missions & Projets</div>
              </motion.div>

              {/* Badge projets */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
                className="absolute -left-6 bottom-8 px-3 py-2 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(37,99,235,0.15)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 16px rgba(37,99,235,0.10)',
                }}
              >
                <div className="text-[10px] text-slate-400">Projets livrés</div>
                <div className="text-base font-bold" style={{ color: '#2563EB' }}>20+ ✓</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social sidebar — desktop only */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute left-6 bottom-24 hidden xl:flex flex-col items-center gap-3"
      >
        {heroSocials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.8)', color: '#94A3B8', border: '1px solid #E2E8F0', backdropFilter: 'blur(8px)' }}
            onMouseEnter={e => {
              const t = e.currentTarget as HTMLElement
              t.style.background = `${s.color}15`
              t.style.borderColor = `${s.color}35`
              t.style.color = s.color
              t.style.transform = 'translateX(4px) scale(1.1)'
              t.style.boxShadow = `0 4px 12px ${s.color}20`
            }}
            onMouseLeave={e => {
              const t = e.currentTarget as HTMLElement
              t.style.background = 'rgba(255,255,255,0.8)'
              t.style.borderColor = '#E2E8F0'
              t.style.color = '#94A3B8'
              t.style.transform = 'translateX(0) scale(1)'
              t.style.boxShadow = 'none'
            }}
          >
            <s.icon size={14} />
          </a>
        ))}
        <div className="w-px h-12 mt-1" style={{ background: 'linear-gradient(180deg, #2563EB40, transparent)' }} />
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-slate-400 text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(180deg, #2563EB, transparent)' }}
        />
      </div>
    </section>
  )
}
