'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8FAFC]"
    >
      {/* Soft light orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.06), transparent)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05), transparent)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo animé */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative"
        >
          {/* Halo pulsant bleu */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.04, 0.25] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(37,99,235,0.4), rgba(6,182,212,0.15), transparent)',
              width: '320px', height: '320px',
              top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          />

          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/images/baobab-logo.png"
              alt="Baobab Digital Logo"
              width={200}
              height={200}
              priority
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 24px rgba(37,99,235,0.25)) drop-shadow(0 2px 8px rgba(6,182,212,0.15))',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Barre de chargement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative h-[2px] rounded-full overflow-hidden"
          style={{ width: 240, background: 'rgba(37,99,235,0.10)' }}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '120%' }}
            transition={{ delay: 0.6, duration: 1.6, ease: 'linear', repeat: Infinity }}
            className="absolute inset-y-0 w-1/2 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #2563EB, #06B6D4, transparent)' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ delay: 0.7, duration: 2, repeat: Infinity }}
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'rgba(37,99,235,0.5)' }}
        >
          Chargement...
        </motion.p>
      </div>
    </motion.div>
  )
}
