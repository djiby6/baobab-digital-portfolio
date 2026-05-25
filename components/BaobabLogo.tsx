'use client'

interface BaobabLogoProps {
  size?: number
  className?: string
}

export default function BaobabLogo({ size = 52, className = '' }: BaobabLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="35%" stopColor="#D4A520" />
          <stop offset="70%" stopColor="#C8900C" />
          <stop offset="100%" stopColor="#A87010" />
        </linearGradient>
        <linearGradient id="goldGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8900C" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>

      {/* ── Racines circuit (bas gauche) ── */}
      <line x1="34" y1="95" x2="18" y2="95" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="18" y1="95" x2="18" y2="104" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="18" cy="107" r="3.5" fill="url(#goldGrad)" />

      <line x1="30" y1="98" x2="10" y2="98" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="7" cy="98" r="3" fill="url(#goldGrad)" />

      {/* ── Racines circuit (bas droite) ── */}
      <line x1="66" y1="95" x2="82" y2="95" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="82" y1="95" x2="82" y2="104" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="82" cy="107" r="3.5" fill="url(#goldGrad)" />

      <line x1="70" y1="98" x2="90" y2="98" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="93" cy="98" r="3" fill="url(#goldGrad)" />

      {/* ── Tronc principal ── */}
      <path
        d="M34 100 L34 90 Q30 80 28 70 L72 70 Q70 80 66 90 L66 100 Z"
        fill="url(#goldGrad)"
      />
      {/* Tronc haut (narrowing) */}
      <path
        d="M38 70 L38 52 Q40 48 50 48 Q60 48 62 52 L62 70 Z"
        fill="url(#goldGrad)"
      />

      {/* ── Branche horizontale principale ── */}
      <line x1="10" y1="44" x2="90" y2="44" stroke="url(#goldGrad)" strokeWidth="4.5" strokeLinecap="round"/>

      {/* ── Branche gauche ── */}
      <line x1="16" y1="44" x2="16" y2="32" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"/>
      {/* T-junction gauche */}
      <circle cx="16" cy="44" r="4" fill="url(#goldGrad2)" />
      {/* Sous-branches gauche */}
      <line x1="16" y1="32" x2="6" y2="32" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="3" cy="32" r="3.5" fill="url(#goldGrad)" />
      <line x1="16" y1="32" x2="28" y2="32" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="28" y1="32" x2="28" y2="22" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="28" cy="19" r="3.5" fill="url(#goldGrad)" />
      <circle cx="16" cy="32" r="4" fill="url(#goldGrad2)" />

      {/* ── Branche centrale (haut) ── */}
      <line x1="50" y1="44" x2="50" y2="28" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="50" cy="44" r="4" fill="url(#goldGrad2)" />
      {/* T sommet centre */}
      <line x1="50" y1="28" x2="38" y2="28" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="35" cy="28" r="3.5" fill="url(#goldGrad)" />
      <line x1="50" y1="28" x2="50" y2="16" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="50" cy="13" r="3.5" fill="url(#goldGrad)" />
      <line x1="50" y1="28" x2="62" y2="28" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="65" cy="28" r="3.5" fill="url(#goldGrad)" />
      <circle cx="50" cy="28" r="4.5" fill="url(#goldGrad2)" />

      {/* ── Branche droite ── */}
      <line x1="84" y1="44" x2="84" y2="32" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="84" cy="44" r="4" fill="url(#goldGrad2)" />
      {/* Sous-branches droite */}
      <line x1="84" y1="32" x2="94" y2="32" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="97" cy="32" r="3.5" fill="url(#goldGrad)" />
      <line x1="84" y1="32" x2="72" y2="32" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="72" y1="32" x2="72" y2="22" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="72" cy="19" r="3.5" fill="url(#goldGrad)" />
      <circle cx="84" cy="32" r="4" fill="url(#goldGrad2)" />

      {/* ── Branche gauche far ── */}
      <line x1="10" y1="44" x2="10" y2="54" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="10" cy="57" r="3" fill="url(#goldGrad)" />

      {/* ── Branche droite far ── */}
      <line x1="90" y1="44" x2="90" y2="54" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="90" cy="57" r="3" fill="url(#goldGrad)" />
    </svg>
  )
}
