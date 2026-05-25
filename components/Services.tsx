'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiGlobe, FiSmartphone, FiPackage, FiLayout,
  FiFeather, FiTrendingUp, FiCpu, FiServer, FiCode
} from 'react-icons/fi'

const services = [
  {
    icon: FiGlobe,
    title: 'Création de sites web',
    description:
      'Sites vitrine, corporate et e-commerce ultra-modernes, optimisés SEO et haute performance.',
    color: '#2563EB',
    tags: ['Next.js', 'React', 'WordPress'],
  },
  {
    icon: FiSmartphone,
    title: 'Applications mobiles',
    description:
      'Applications iOS et Android cross-platform avec une expérience utilisateur premium.',
    color: '#7C3AED',
    tags: ['React Native', 'Expo', 'Flutter'],
  },
  {
    icon: FiPackage,
    title: 'Développement SaaS',
    description:
      'Création de logiciels SaaS B2B/B2C avec abonnements, dashboards et APIs robustes.',
    color: '#16A34A',
    tags: ['Node.js', 'MongoDB', 'Stripe'],
  },
  {
    icon: FiLayout,
    title: 'Design UI/UX',
    description:
      'Interfaces intuitives et esthétiques qui convertissent les visiteurs en clients.',
    color: '#F59E0B',
    tags: ['Figma', 'Framer', 'Design System'],
  },
  {
    icon: FiFeather,
    title: 'Branding & Identité',
    description:
      "Création d'identités visuelles mémorables qui reflètent votre vision et vos valeurs.",
    color: '#EC4899',
    tags: ['Logo', 'Charte graphique', 'Brand Book'],
  },
  {
    icon: FiTrendingUp,
    title: 'SEO & Marketing digital',
    description:
      'Stratégies de croissance organique, publicité ciblée et optimisation des conversions.',
    color: '#06B6D4',
    tags: ['SEO', 'Google Ads', 'Social Media'],
  },
  {
    icon: FiCpu,
    title: 'Automatisation IA',
    description:
      "Intégration d'IA pour automatiser vos processus métier et booster votre productivité.",
    color: '#2563EB',
    tags: ['OpenAI', 'Automation', 'Chatbots'],
  },
  {
    icon: FiServer,
    title: 'Développement backend',
    description:
      'APIs performantes, bases de données optimisées et architectures microservices.',
    color: '#7C3AED',
    tags: ['Node.js', 'Express', 'MySQL'],
  },
  {
    icon: FiCode,
    title: "Création d'APIs",
    description:
      'APIs RESTful documentées, sécurisées et intégrables à tout système tiers.',
    color: '#16A34A',
    tags: ['REST', 'GraphQL', 'Swagger'],
  },
]

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-white">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.05), transparent 70%)',
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
          <p className="text-[#16A34A] text-sm tracking-[0.4em] uppercase font-medium mb-4">
            Ce que je fais
          </p>
          <h2 className="font-space-grotesk text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            Mes{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #16A34A, #2563EB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              services
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Des solutions digitales complètes pour propulser votre business
            vers le succès à l&apos;échelle africaine et internationale.
          </p>
          <div
            className="glow-line max-w-24 mx-auto mt-6"
            style={{
              background: 'linear-gradient(90deg, transparent, #16A34A, #2563EB, transparent)',
            }}
          />
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.07 }}
              className="group relative rounded-2xl p-6 cursor-default overflow-hidden animated-border"
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                transition: 'all 0.4s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
              whileHover={{ y: -6 }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.background = `${service.color}05`
                target.style.borderColor = `${service.color}20`
                target.style.boxShadow = `0 12px 40px ${service.color}12, 0 2px 8px rgba(0,0,0,0.04)`
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.background = '#F8FAFC'
                target.style.borderColor = '#E2E8F0'
                target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
              }}
            >
              {/* Gradient blob */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${service.color}12, transparent)`,
                  filter: 'blur(30px)',
                  transform: 'translate(30%, -30%)',
                }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300"
                style={{
                  background: `${service.color}10`,
                  border: `1px solid ${service.color}20`,
                }}
              >
                <service.icon size={24} style={{ color: service.color }} />
              </div>

              {/* Content */}
              <h3 className="font-space-grotesk text-lg font-bold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
                    style={{
                      background: `${service.color}08`,
                      color: service.color,
                      border: `1px solid ${service.color}15`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow on hover */}
              <div
                className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                style={{ color: service.color }}
              >
                <span className="text-lg">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 mb-6">
            Vous avez un projet en tête ?
          </p>
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary"
          >
            Démarrer un projet
          </button>
        </motion.div>
      </div>
    </section>
  )
}
