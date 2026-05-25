'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  SiHtml5, SiBootstrap, SiJavascript, SiJquery,
  SiPhp, SiNodedotjs, SiExpress, SiMysql, SiMongodb,
  SiGithub, SiReact, SiNextdotjs, SiSocketdotio,
} from 'react-icons/si'
import { FiTerminal, FiGlobe, FiDatabase, FiLock, FiZap, FiCode, FiGitBranch } from 'react-icons/fi'

const skillCategories = [
  {
    title: 'Front-End',
    color: '#2563EB',
    icon: FiCode,
    description: 'Interfaces modernes et réactives',
    skills: [
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: FiCode, color: '#1572B6' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F59E0B' },
      { name: 'jQuery', icon: SiJquery, color: '#0769AD' },
      { name: 'React', icon: SiReact, color: '#0EA5E9' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#0F172A' },
      { name: 'Terminal / Bash', icon: FiTerminal, color: '#16A34A' },
      { name: 'Git / GitHub', icon: FiGitBranch, color: '#F05032' },
    ],
  },
  {
    title: 'Back-End',
    color: '#7C3AED',
    icon: FiGlobe,
    description: 'APIs robustes et architectures scalables',
    skills: [
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#16A34A' },
      { name: 'Express.js', icon: SiExpress, color: '#0F172A' },
      { name: 'EJS', icon: FiCode, color: '#7C3AED' },
      { name: 'APIs REST', icon: FiGlobe, color: '#16A34A' },
      { name: 'RESTful APIs', icon: FiGlobe, color: '#2563EB' },
    ],
  },
  {
    title: 'Bases de données',
    color: '#16A34A',
    icon: FiDatabase,
    description: 'Stockage performant et fiable',
    skills: [
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Mongoose', icon: SiMongodb, color: '#880000' },
    ],
  },
  {
    title: 'Authentification',
    color: '#F59E0B',
    icon: FiLock,
    description: 'Sécurisation des accès utilisateurs',
    skills: [
      { name: 'Passport.js', icon: FiLock, color: '#16A34A' },
      { name: 'JWT', icon: FiLock, color: '#F59E0B' },
      { name: 'Sessions', icon: FiLock, color: '#7C3AED' },
    ],
  },
  {
    title: 'JavaScript Async',
    color: '#06B6D4',
    icon: FiZap,
    description: 'Programmation asynchrone moderne',
    skills: [
      { name: 'Promises', icon: FiZap, color: '#F59E0B' },
      { name: 'Async / Await', icon: FiZap, color: '#06B6D4' },
      { name: 'Socket.io', icon: SiSocketdotio, color: '#0F172A' },
    ],
  },
]

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-[#F8FAFC]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(37,99,235,0.04), transparent)',
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
          <p className="text-[#7C3AED] text-sm tracking-[0.4em] uppercase font-medium mb-4">
            Stack technique
          </p>
          <h2 className="font-space-grotesk text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            Mes{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              compétences
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Maîtrise complète de la chaîne de développement web moderne,
            du front-end au back-end.
          </p>
          <div
            className="glow-line max-w-24 mx-auto mt-6"
            style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, #2563EB, transparent)' }}
          />
        </motion.div>

        {/* Categories */}
        <div className="space-y-6">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: catIdx * 0.1 }}
            >
              <div
                className="p-8 rounded-2xl animated-border"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${cat.color}10`,
                      border: `1px solid ${cat.color}20`,
                    }}
                  >
                    <cat.icon size={22} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3
                      className="font-space-grotesk text-lg font-bold"
                      style={{ color: cat.color }}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{cat.description}</p>
                  </div>
                </div>

                {/* Skills grid */}
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: catIdx * 0.1 + sIdx * 0.05 + 0.2,
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-default"
                      style={{
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        const target = e.currentTarget as HTMLElement
                        target.style.background = `${skill.color}08`
                        target.style.borderColor = `${skill.color}30`
                        target.style.boxShadow = `0 4px 12px ${skill.color}15`
                      }}
                      onMouseLeave={(e) => {
                        const target = e.currentTarget as HTMLElement
                        target.style.background = '#F8FAFC'
                        target.style.borderColor = '#E2E8F0'
                        target.style.boxShadow = 'none'
                      }}
                    >
                      <skill.icon
                        size={16}
                        style={{ color: skill.color, flexShrink: 0 }}
                      />
                      <span className="text-slate-700 text-sm font-medium">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 text-sm">
            Et en constante évolution — j&apos;apprends continuellement de nouvelles technologies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
