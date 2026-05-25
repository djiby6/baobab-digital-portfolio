'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(124,58,237,0.2))',
            border: '1px solid rgba(212,175,55,0.3)',
            backdropFilter: 'blur(10px)',
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 25px rgba(212,175,55,0.3)',
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Retour en haut"
        >
          <FiArrowUp size={20} style={{ color: '#D4AF37' }} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
