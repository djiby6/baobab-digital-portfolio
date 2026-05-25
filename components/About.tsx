'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiGlobe, FiCpu, FiZap } from 'react-icons/fi'
import Image from 'next/image'

const stats = [
  { value: '20+', label: 'Projets livrés',    color: '#2563EB' },
  { value: '3+',  label: "Années d'exp.",     color: '#06B6D4' },
  { value: '9+',  label: 'Technologies',      color: '#2563EB' },
  { value: '100%',label: 'Satisfaction',      color: '#06B6D4' },
]

const values = [
  { icon: FiCode,  title: 'Code de qualité',   desc: 'Architecture propre, code maintenable et performant.', color: '#2563EB' },
  { icon: FiGlobe, title: 'Vision africaine',  desc: "Solutions adaptées aux réalités du marché africain.",  color: '#06B6D4' },
  { icon: FiCpu,   title: 'Innovation IA',     desc: 'Intégration des dernières technologies intelligentes.', color: '#2563EB' },
  { icon: FiZap,   title: 'Livraison rapide',  desc: 'Projets livrés dans les délais avec un résultat premium.', color: '#06B6D4' },
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } }
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05), transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05), transparent 70%)', filter: 'blur(60px)' }} />

      <div ref={ref} className="container-custom">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-20">
          <p className="text-sm tracking-[0.4em] uppercase font-medium mb-4" style={{ color: '#2563EB' }}>
            Qui suis-je
          </p>
          <h2 className="font-space-grotesk text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            À propos de{' '}
            <span style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              moi
            </span>
          </h2>
          <div className="glow-line max-w-24 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }} className="relative">
            <div className="relative">
              {/* Frame gradient */}
              <div style={{
                background: 'linear-gradient(135deg, #60A5FA, #2563EB, #06B6D4)',
                padding: '2px', borderRadius: '28px',
                boxShadow: '0 20px 60px rgba(37,99,235,0.15), 0 4px 16px rgba(37,99,235,0.08)',
              }}>
                <div className="relative rounded-3xl overflow-hidden" style={{ background: '#F8FAFC' }}>
                  <Image
                    src="/images/profile-photo.png"
                    alt="Djibril Ndiaye — Développeur Full Stack Sénégal, fondateur Baobab Digital"
                    width={480}
                    height={560}
                    style={{ display: 'block', objectFit: 'cover', objectPosition: 'center top', width: '100%', height: 'auto' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-28"
                    style={{ background: 'linear-gradient(to top, rgba(248,250,252,0.8), transparent)' }} />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-bold font-space-grotesk text-lg"
                      style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Djibril Ndiaye
                    </p>
                    <p className="text-slate-600 text-xs tracking-wider">Fondateur & CEO — Baobab Digital</p>
                  </div>
                </div>
              </div>

              {/* Badge disponible */}
              <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass-card px-4 py-3"
                style={{ border: '1px solid rgba(37,99,235,0.15)', boxShadow: '0 4px 20px rgba(37,99,235,0.10)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full badge-pulse" style={{ background: '#06B6D4' }} />
                  <span className="text-xs text-slate-600">Disponible</span>
                </div>
              </motion.div>

              {/* Badge expérience */}
              <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 glass-card px-5 py-4"
                style={{ border: '1px solid rgba(37,99,235,0.12)' }}>
                <p className="text-2xl font-bold font-space-grotesk" style={{ color: '#2563EB' }}>3+</p>
                <p className="text-slate-400 text-xs">ans d&apos;exp.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="space-y-8">
            <motion.div variants={fadeUp}>
              <h3 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Passionné par l&apos;innovation digitale{' '}
                <span style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  africaine
                </span>
              </h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Je suis <strong className="text-slate-900">Djibril Ndiaye</strong>, fondateur de{' '}
                  <strong style={{ color: '#2563EB' }}>Baobab Digital</strong>, une agence
                  digitale premium qui transforme les idées africaines en solutions web et mobiles innovantes.
                </p>
                <p>
                  Avec plus de <strong className="text-slate-900">3 ans d&apos;expérience</strong> en
                  développement Full Stack, je maîtrise l&apos;ensemble de la chaîne de création
                  digitale : du design UI/UX au développement backend, en passant par la création de SaaS et l&apos;intégration IA.
                </p>
                <p>
                  Ma mission :{' '}
                  <strong style={{ color: '#2563EB' }}>Build. Innovate. Impact.</strong>{' '}
                  — produire des solutions digitales compétitives à l&apos;échelle internationale.
                </p>
              </div>
            </motion.div>

            {/* Value cards */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
              {values.map((v) => (
                <div key={v.title} className="glass-card-hover p-4 rounded-xl"
                  style={{ border: `1px solid ${v.color}20` }}>
                  <v.icon size={22} style={{ color: v.color }} className="mb-2" />
                  <p className="text-slate-900 font-semibold text-sm">{v.title}</p>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4 pt-2">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-space-grotesk text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-slate-400 text-xs mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex gap-4 pt-2">
              <a href="https://wa.me/212773591012" target="_blank" rel="noreferrer" className="btn-primary text-sm">WhatsApp</a>
              <a href="mailto:marketingdj12@gmail.com" className="btn-secondary text-sm">Email</a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
