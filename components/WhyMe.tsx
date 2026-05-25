'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiZap, FiSmartphone, FiCode, FiStar, FiHeadphones, FiTrendingUp, FiShield, FiGlobe } from 'react-icons/fi'

const reasons = [
  {
    icon: FiStar,
    title: 'Design moderne',
    desc: 'Interfaces premium qui impressionnent dès le premier regard et convertissent vos visiteurs.',
    color: '#2563EB',
  },
  {
    icon: FiZap,
    title: 'Livraison rapide',
    desc: 'Vos projets livrés dans les délais, sans compromis sur la qualité ni les fonctionnalités.',
    color: '#F59E0B',
  },
  {
    icon: FiSmartphone,
    title: 'Responsive mobile',
    desc: 'Chaque pixel est pensé pour tous les écrans — mobile, tablette, desktop.',
    color: '#06B6D4',
  },
  {
    icon: FiCode,
    title: 'Expertise Full Stack',
    desc: 'React, Next.js, Node.js, bases de données — je maîtrise toute la chaîne technique.',
    color: '#7C3AED',
  },
  {
    icon: FiTrendingUp,
    title: 'Branding premium',
    desc: 'Une identité visuelle forte qui positionne votre marque comme un leader sur le marché.',
    color: '#16A34A',
  },
  {
    icon: FiHeadphones,
    title: 'Support professionnel',
    desc: 'Disponible, réactif et engagé bien après la livraison. Votre succès est ma priorité.',
    color: '#EC4899',
  },
  {
    icon: FiShield,
    title: 'Code sécurisé',
    desc: 'Bonnes pratiques de sécurité, données protégées, architecture robuste et scalable.',
    color: '#EA580C',
  },
  {
    icon: FiGlobe,
    title: 'Vision africaine',
    desc: 'Je comprends le marché africain et ses besoins — une expertise rare et précieuse.',
    color: '#0EA5E9',
  },
]

export default function WhyMe() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="why" className="section-padding relative overflow-hidden bg-[#F8FAFC]">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05), transparent 70%)', filter: 'blur(80px)' }} />

      <div ref={ref} className="container-custom">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#2563EB] text-sm tracking-[0.4em] uppercase font-medium mb-4">
            La différence
          </p>
          <h2 className="font-space-grotesk text-4xl sm:text-5xl font-bold mb-5 text-slate-900">
            Pourquoi choisir{' '}
            <span style={{
              background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Baobab Digital ?
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            Pas juste un prestataire — un partenaire qui investit dans le succès de votre projet autant que vous.
          </p>
          <div className="glow-line max-w-24 mx-auto mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative p-6 rounded-2xl transition-all duration-300"
              style={{
                background: '#FFFFFF',
                border: '1px solid #F1F5F9',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                const t = e.currentTarget as HTMLElement
                t.style.transform = 'translateY(-6px)'
                t.style.boxShadow = `0 12px 40px ${r.color}12, 0 2px 8px rgba(0,0,0,0.06)`
                t.style.borderColor = `${r.color}20`
              }}
              onMouseLeave={e => {
                const t = e.currentTarget as HTMLElement
                t.style.transform = 'translateY(0)'
                t.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
                t.style.borderColor = '#F1F5F9'
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                style={{ background: `${r.color}10`, border: `1px solid ${r.color}20` }}
              >
                <r.icon size={22} style={{ color: r.color }} />
              </div>

              <h3 className="font-space-grotesk text-base font-bold text-slate-900 mb-2">
                {r.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {r.desc}
              </p>

              {/* Accent dot */}
              <div
                className="absolute top-5 right-5 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: r.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-14 text-center"
        >
          <a
            href="https://wa.me/212773591012"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Démarrer mon projet →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
