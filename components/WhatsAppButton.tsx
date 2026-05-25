'use client'

import { useState } from 'react'
import { FiMessageCircle, FiX } from 'react-icons/fi'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href="https://wa.me/212773591012"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: hovered
          ? 'linear-gradient(135deg, #1a56db, #2563EB)'
          : 'linear-gradient(135deg, #2563EB, #1D4ED8)',
        color: '#FFFFFF',
        borderRadius: 50,
        padding: hovered ? '12px 20px 12px 16px' : '14px',
        boxShadow: hovered
          ? '0 8px 32px rgba(37,99,235,0.45), 0 2px 8px rgba(0,0,0,0.15)'
          : '0 4px 20px rgba(37,99,235,0.35), 0 2px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'scale(1.06) translateY(-2px)' : 'scale(1)',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: hovered ? 200 : 52,
      }}
    >
      {/* Pulse ring */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 50,
          border: '2px solid rgba(37,99,235,0.4)',
          animation: 'whatsapp-pulse 2.5s ease-out infinite',
          pointerEvents: 'none',
        }}
      />

      <FiMessageCircle size={22} style={{ flexShrink: 0 }} />

      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 0.2,
          opacity: hovered ? 1 : 0,
          maxWidth: hovered ? 120 : 0,
          transition: 'opacity 0.2s ease, max-width 0.3s ease',
          overflow: 'hidden',
        }}
      >
        Discutons !
      </span>

      <style>{`
        @keyframes whatsapp-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </a>
  )
}
