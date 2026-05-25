'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiSend, FiCheck, FiMessageCircle, FiInstagram, FiLinkedin, FiFacebook } from 'react-icons/fi'
import { SiTiktok, SiBehance } from 'react-icons/si'
import Image from 'next/image'

const contactMethods = [
  {
    icon: FiMessageCircle,
    label: 'WhatsApp',
    value: '+212 77 359 10 12',
    href: 'https://wa.me/212773591012',
    color: '#16A34A',
    desc: 'Réponse rapide garantie',
  },
  {
    icon: FiMail,
    label: 'Email',
    value: 'marketingdj12@gmail.com',
    href: 'mailto:marketingdj12@gmail.com',
    color: '#2563EB',
    desc: 'Pour les projets détaillés',
  },
]

const socials = [
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/djibril-ndiaye-53b377411', color: '#0A66C2' },
  { icon: FiFacebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590459927081', color: '#1877F2' },
  { icon: FiInstagram, label: 'Instagram', href: 'https://www.instagram.com/baobabdigitalwebsaas', color: '#E1306C' },
  { icon: SiTiktok, label: 'TikTok', href: 'https://www.tiktok.com/@baobabdigital1', color: '#010101' },
  { icon: SiBehance, label: 'Behance', href: 'https://www.behance.net/djibrilndiaye3', color: '#1769FF' },
]

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1800))
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-white">
      {/* Background decorations */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.05), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.04), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div ref={ref} className="container-custom">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/images/baobab-logo.png"
              alt="Baobab Digital — Contactez notre agence digitale en Afrique"
              width={180}
              height={80}
              style={{
                height: '70px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 16px rgba(37,99,235,0.20)) drop-shadow(0 2px 6px rgba(6,182,212,0.12))',
              }}
            />
          </div>
          <p className="text-[#2563EB] text-sm tracking-[0.4em] uppercase font-medium mb-4">
            Travaillons ensemble
          </p>
          <h2 className="font-space-grotesk text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            Contactez{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              moi
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Vous avez un projet ? Une idée ? Parlons-en ensemble.
            Je réponds sous 24h.
          </p>
          <div className="glow-line max-w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Contact info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2 space-y-8"
          >
            {/* Intro */}
            <motion.div variants={fadeUp}>
              <h3 className="font-space-grotesk text-2xl font-bold text-slate-900 mb-4">
                Démarrons votre projet
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Que vous ayez besoin d&apos;un site web, d&apos;une application ou
                d&apos;une stratégie digitale complète, je suis là pour vous
                accompagner de A à Z.
              </p>
            </motion.div>

            {/* Contact methods */}
            <motion.div variants={fadeUp} className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 group"
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.background = `${method.color}05`
                    target.style.borderColor = `${method.color}20`
                    target.style.boxShadow = `0 8px 32px ${method.color}10`
                    target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.background = '#F8FAFC'
                    target.style.borderColor = '#E2E8F0'
                    target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
                    target.style.transform = 'translateY(0)'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: `${method.color}10`,
                      border: `1px solid ${method.color}20`,
                    }}
                  >
                    <method.icon size={20} style={{ color: method.color }} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="font-semibold text-sm"
                      style={{ color: method.color }}
                    >
                      {method.label}
                    </p>
                    <p className="text-slate-600 text-sm truncate">{method.value}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{method.desc}</p>
                  </div>
                  <span className="ml-auto text-slate-300 group-hover:text-slate-500 transition-colors">
                    →
                  </span>
                </a>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp}>
              <p className="text-slate-400 text-xs tracking-widest uppercase mb-4">
                Réseaux sociaux
              </p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      color: '#94A3B8',
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement
                      target.style.background = `${social.color}10`
                      target.style.borderColor = `${social.color}25`
                      target.style.color = social.color
                      target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement
                      target.style.background = '#F8FAFC'
                      target.style.borderColor = '#E2E8F0'
                      target.style.color = '#94A3B8'
                      target.style.transform = 'translateY(0)'
                    }}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Availability card */}
            <motion.div
              variants={fadeUp}
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(22,163,74,0.05)',
                border: '1px solid rgba(22,163,74,0.15)',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-2 h-2 rounded-full badge-pulse"
                  style={{ background: '#16A34A' }}
                />
                <p className="text-[#16A34A] font-semibold text-sm">
                  Disponible pour nouveaux projets
                </p>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Actuellement disponible pour des missions freelance et
                des collaborations long terme.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-8 space-y-5"
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
              }}
            >
              <h3 className="font-space-grotesk text-xl font-bold text-slate-900 mb-2">
                Envoyer un message
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 text-xs mb-2 uppercase tracking-wider">
                    Nom complet
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-xs mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    className="input-premium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 text-xs mb-2 uppercase tracking-wider">
                  Type de projet
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="input-premium"
                >
                  <option value="">Sélectionnez un type de projet</option>
                  <option value="Site web">Création de site web</option>
                  <option value="Application">Application mobile</option>
                  <option value="SaaS">Développement SaaS</option>
                  <option value="Design">Design UI/UX</option>
                  <option value="Marketing">Marketing digital & SEO</option>
                  <option value="IA">Automatisation IA</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 text-xs mb-2 uppercase tracking-wider">
                  Votre message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Décrivez votre projet, vos besoins et votre budget approximatif..."
                  className="input-premium resize-none"
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={sending || sent}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-sm tracking-wider transition-all duration-300 relative overflow-hidden"
                style={{
                  background: sent
                    ? 'linear-gradient(135deg, #16A34A, #15803D)'
                    : 'linear-gradient(135deg, #3B82F6, #2563EB, #1D4ED8)',
                  color: '#FFFFFF',
                  opacity: sending ? 0.8 : 1,
                }}
                whileHover={{ scale: sending ? 1 : 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Shimmer effect */}
                {!sending && !sent && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s linear infinite',
                    }}
                  />
                )}

                {sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : sent ? (
                  <>
                    <FiCheck size={18} />
                    Message envoyé !
                  </>
                ) : (
                  <>
                    <FiSend size={18} />
                    Envoyer le message
                  </>
                )}
              </motion.button>

              <p className="text-slate-400 text-xs text-center">
                En envoyant ce message, vous acceptez d&apos;être contacté par
                Baobab Digital.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
