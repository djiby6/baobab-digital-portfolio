'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const testimonials = [
  {
    id: 1,
    name: 'Aminata Diallo',
    role: 'CEO, Boutique Mode Dakar',
    country: '🇸🇳 Sénégal',
    avatar: 'AD',
    color: '#2563EB',
    rating: 5,
    text: 'Djibril a transformé ma boutique en ligne en une vraie expérience premium. Les ventes ont augmenté de 300% en 3 mois. Son travail est exceptionnel, professionnel et livré dans les délais.',
    project: 'Site e-commerce',
  },
  {
    id: 2,
    name: 'Moussa Traoré',
    role: 'Fondateur, EdTech Mali',
    country: '🇲🇱 Mali',
    avatar: 'MT',
    color: '#7C3AED',
    rating: 5,
    text: 'J\'avais une idée SaaS depuis 2 ans. Djibril l\'a concrétisée en 6 semaines. Code propre, design élégant, architecture solide. Je recommande Baobab Digital à tous les entrepreneurs africains.',
    project: 'Application SaaS',
  },
  {
    id: 3,
    name: 'Fatou Bah',
    role: 'Restauratrice, Abidjan',
    country: '🇨🇮 Côte d\'Ivoire',
    avatar: 'FB',
    color: '#16A34A',
    rating: 5,
    text: 'Mon site restaurant est maintenant la référence dans ma ville. Les réservations en ligne ont explosé. Djibril comprend parfaitement les besoins du marché africain. Travail de haut niveau.',
    project: 'Site restaurant',
  },
  {
    id: 4,
    name: 'Ibrahim Koné',
    role: 'Entrepreneur Digital',
    country: '🇧🇫 Burkina Faso',
    avatar: 'IK',
    color: '#F59E0B',
    rating: 5,
    text: 'La qualité du code, la réactivité et le professionnalisme de Djibril sont au-delà de mes attentes. Mon application quiz a été téléchargée 10 000 fois en 1 mois. Incroyable.',
    project: 'Application quiz',
  },
  {
    id: 5,
    name: 'Mariam Coulibaly',
    role: 'Directrice Marketing, Bamako',
    country: '🇲🇱 Mali',
    avatar: 'MC',
    color: '#06B6D4',
    rating: 5,
    text: 'Baobab Digital n\'est pas juste un prestataire, c\'est un vrai partenaire digital. Djibril apporte des idées innovantes et comprend nos enjeux business. Collaboration au top.',
    project: 'Branding & SEO',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }
  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const t = testimonials[current]

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden bg-[#F8FAFC]">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.04), transparent)',
        }}
      />

      <div ref={ref} className="container-custom">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#7C3AED] text-sm tracking-[0.4em] uppercase font-medium mb-4">
            Ce qu&apos;ils disent
          </p>
          <h2 className="font-space-grotesk text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            Témoignages{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              clients
            </span>
          </h2>
          <div
            className="glow-line max-w-24 mx-auto"
            style={{
              background: 'linear-gradient(90deg, transparent, #7C3AED, #2563EB, transparent)',
            }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div
              className="relative rounded-3xl p-8 sm:p-12 overflow-hidden"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              {/* Big quote decoration */}
              <div
                className="absolute top-6 left-8 text-8xl font-serif leading-none pointer-events-none select-none"
                style={{ color: `${t.color}12` }}
              >
                &ldquo;
              </div>

              {/* Gradient blob */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none transition-all duration-700"
                style={{
                  background: `radial-gradient(circle, ${t.color}06, transparent)`,
                  filter: 'blur(40px)',
                  transform: 'translate(30%, -30%)',
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FiStar
                        key={i}
                        size={18}
                        style={{ color: '#F59E0B', fill: '#F59E0B' }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-700 text-lg sm:text-xl leading-relaxed mb-8 font-light relative z-10">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg font-space-grotesk flex-shrink-0"
                        style={{
                          background: `${t.color}12`,
                          border: `1px solid ${t.color}25`,
                          color: t.color,
                        }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 font-space-grotesk">
                          {t.name}
                        </p>
                        <p className="text-slate-500 text-sm">{t.role}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{t.country}</p>
                      </div>
                    </div>
                    <div
                      className="px-4 py-2 rounded-xl text-xs font-medium"
                      style={{
                        background: `${t.color}08`,
                        color: t.color,
                        border: `1px solid ${t.color}15`,
                      }}
                    >
                      {t.project}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setAutoplay(false); setCurrent(i) }}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === current ? 24 : 8,
                      height: 8,
                      background:
                        i === current
                          ? 'linear-gradient(90deg, #2563EB, #7C3AED)'
                          : '#E2E8F0',
                    }}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#94A3B8',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.borderColor = 'rgba(37,99,235,0.3)'
                    target.style.color = '#2563EB'
                    target.style.background = 'rgba(37,99,235,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.borderColor = '#E2E8F0'
                    target.style.color = '#94A3B8'
                    target.style.background = '#F8FAFC'
                  }}
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#94A3B8',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.borderColor = 'rgba(37,99,235,0.3)'
                    target.style.color = '#2563EB'
                    target.style.background = 'rgba(37,99,235,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.borderColor = '#E2E8F0'
                    target.style.color = '#94A3B8'
                    target.style.background = '#F8FAFC'
                  }}
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Mini testimonials row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8"
          >
            {testimonials.map((t2, i) => (
              <button
                key={t2.id}
                onClick={() => { setAutoplay(false); setCurrent(i) }}
                className="rounded-xl p-3 text-center transition-all duration-300"
                style={{
                  background: i === current ? `${t2.color}08` : '#FFFFFF',
                  border: i === current ? `1px solid ${t2.color}20` : '1px solid #E2E8F0',
                  boxShadow: i === current ? `0 4px 12px ${t2.color}10` : 'none',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold mx-auto mb-1.5"
                  style={{
                    background: `${t2.color}12`,
                    color: t2.color,
                  }}
                >
                  {t2.avatar}
                </div>
                <p className="text-slate-500 text-[10px] truncate">{t2.name}</p>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
