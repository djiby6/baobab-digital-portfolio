'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0

      setVisible(scrollTop > 400)
      setProgress(pct)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Sync history back to hero
    window.history.replaceState({ section: 'hero' }, '', '#hero')
  }

  // SVG arc parameters
  const size = 48
  const strokeWidth = 2.5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
          style={{ width: size, height: size }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Retour en haut de page"
        >
          {/* Progress ring */}
          <svg
            width={size}
            height={size}
            className="absolute inset-0 -rotate-90"
            aria-hidden="true"
          >
            {/* Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(37,99,235,0.15)"
              strokeWidth={strokeWidth}
            />
            {/* Progress */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#scrollGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
            <defs>
              <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Button face */}
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: size - strokeWidth * 2 - 4,
              height: size - strokeWidth * 2 - 4,
              background: 'rgba(248,250,252,0.95)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px rgba(37,99,235,0.18), 0 1px 4px rgba(0,0,0,0.06)',
              border: '1px solid rgba(37,99,235,0.12)',
            }}
          >
            <FiArrowUp size={16} style={{ color: '#2563EB', strokeWidth: 2.5 }} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
