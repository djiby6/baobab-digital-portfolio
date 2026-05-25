'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiArrowRight, FiClock, FiCheck } from 'react-icons/fi'

// ── Types ─────────────────────────────────────────────────────────────────────

interface SubProject { name: string; progress: number; color: string }
interface Project {
  id: string; title: string; subtitle: string; category: string
  status: 'delivered' | 'in-progress'; progress: number
  color: string; accent: string; description: string
  tags: string[]; link: string; linkLabel: string; features: string[]
  subProjects?: SubProject[]
}

// ── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 'afrowear', title: 'AfroWear Store', subtitle: 'Mode africaine premium',
    category: 'E-commerce', status: 'delivered', progress: 100,
    color: '#111827', accent: '#374151',
    description: 'Boutique e-commerce de mode africaine contemporaine avec catalogue premium et expérience d\'achat fluide.',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    link: 'https://www.adjoaa.com', linkLabel: 'Voir le projet',
    features: ['Catalogue premium', 'Paiement sécurisé', 'Lookbook digital', 'Mobile-first'],
  },
  {
    id: 'sneakers', title: 'Dakar Sneakers', subtitle: 'Chaussures & prêt-à-porter',
    category: 'E-commerce', status: 'delivered', progress: 100,
    color: '#EA580C', accent: '#F97316',
    description: 'Boutique sneakers premium avec configurateur de style et livraison express partout au Sénégal.',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    link: 'https://www.dailypaperclothing.com', linkLabel: 'Voir le projet',
    features: ['Configurateur style', 'Stock temps réel', 'Livraison express', 'Guide pointures'],
  },
  {
    id: 'accessories', title: 'Baobab Accessories', subtitle: 'Bijoux & accessoires luxe',
    category: 'E-commerce', status: 'delivered', progress: 100,
    color: '#92400E', accent: '#D97706',
    description: 'Boutique de bijoux et accessoires haut de gamme avec présentation élégante et personnalisation sur mesure.',
    tags: ['Next.js', 'Framer Motion', 'Stripe', 'Sanity'],
    link: 'https://marketplace.anka.africa/en', linkLabel: 'Voir le projet',
    features: ['Personnalisation', 'Carte cadeau', 'Try-on virtuel', 'Gravure sur mesure'],
  },
  {
    id: 'sunuapp', title: 'Sunu App', subtitle: 'Application mobile moderne',
    category: 'Mobile App', status: 'delivered', progress: 100,
    color: '#1D4ED8', accent: '#06B6D4',
    description: 'Application mobile tout-en-un pour entrepreneurs africains : gestion business, paiements et analytics.',
    tags: ['React Native', 'Node.js', 'Firebase', 'Expo'],
    link: 'https://www.chargel.com', linkLabel: 'Voir le projet',
    features: ['Gestion business', 'Paiement mobile', 'Analytics IA', 'Notifications push'],
  },
  {
    id: 'fitdakar', title: 'Fit Dakar', subtitle: 'Fitness & coaching premium',
    category: 'Web', status: 'delivered', progress: 100,
    color: '#1E293B', accent: '#3B82F6',
    description: 'Plateforme fitness avec programmes IA personnalisés, suivi nutritionnel et coaching en ligne.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    link: 'https://www.myfitnesslive.com', linkLabel: 'Voir le projet',
    features: ['Programmes IA', 'Coach virtuel', 'Suivi nutrition', 'Sessions live'],
  },
  {
    id: 'academy', title: 'Baobab Academy', subtitle: 'Plateforme e-learning',
    category: 'E-learning', status: 'delivered', progress: 100,
    color: '#0056D2', accent: '#7C3AED',
    description: 'Plateforme d\'apprentissage pour les professionnels africains avec certifications reconnues et mentorat.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    link: 'https://altschoolafrica.com', linkLabel: 'Voir le projet',
    features: ['100+ cours', 'Certifications', 'Dashboard étudiant', 'Mentorat live'],
  },
  {
    id: 'teranga', title: 'Teranga Restaurant', subtitle: 'Commande & livraison en ligne',
    category: 'Web', status: 'delivered', progress: 100,
    color: '#D97706', accent: '#F59E0B',
    description: 'Plateforme restaurant moderne avec commande en ligne, suivi GPS et menu digital interactif.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Google Maps'],
    link: 'https://www.layucca-dakar.com', linkLabel: 'Voir le projet',
    features: ['Commande en ligne', 'Suivi GPS', 'Menu digital', 'Réservation table'],
  },
  // ── In-progress (UNCHANGED) ────────────────────────────────────────────────
  {
    id: 'ia', title: 'Suite IA Africaine', subtitle: 'Intelligence artificielle & automatisation',
    category: 'IA', status: 'in-progress', progress: 68,
    color: '#06B6D4', accent: '#7C3AED',
    description: 'Suite d\'outils IA innovants : générateur vocal Wolof, assistant business IA, automatisation intelligente.',
    tags: ['Python', 'OpenAI', 'Node.js', 'TensorFlow'],
    link: '#', linkLabel: 'En développement',
    features: ['IA Wolof', 'Assistant Business', 'Automatisation', 'IA Créateurs'],
    subProjects: [
      { name: 'Générateur vocal Wolof', progress: 75, color: '#06B6D4' },
      { name: 'Assistant IA Business', progress: 60, color: '#7C3AED' },
      { name: 'Automatisation IA', progress: 70, color: '#D4A520' },
      { name: 'IA Créateurs contenu', progress: 45, color: '#16A34A' },
    ],
  },
  {
    id: 'saas', title: 'Plateforme SaaS Business', subtitle: 'Outils cloud pour entrepreneurs africains',
    category: 'SaaS', status: 'in-progress', progress: 55,
    color: '#16A34A', accent: '#D4A520',
    description: 'Suite SaaS complète : CRM, analytics, gestion clients et outils business pour entrepreneurs africains.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    link: '#', linkLabel: 'En développement',
    features: ['CRM avancé', 'Analytics IA', 'Multi-tenant', 'API publique'],
    subProjects: [
      { name: 'CRM & Gestion clients', progress: 70, color: '#16A34A' },
      { name: 'Analytics dashboard', progress: 50, color: '#D4A520' },
      { name: 'Facturation Stripe', progress: 45, color: '#06B6D4' },
      { name: 'API publique', progress: 35, color: '#7C3AED' },
    ],
  },
  {
    id: 'mbalax', title: 'Mbalax Hub', subtitle: 'Plateforme musicale sénégalaise',
    category: 'Music Platform', status: 'in-progress', progress: 40,
    color: '#7C3AED', accent: '#16A34A',
    description: 'La première plateforme de streaming dédiée au Mbalax sénégalais avec lecteur audio avancé et communauté.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS S3'],
    link: 'https://audiomack.com', linkLabel: 'Inspiré de',
    features: ['Streaming HD', 'Artistes SN', 'Communauté', 'Playlists'],
    subProjects: [
      { name: 'Lecteur audio avancé', progress: 65, color: '#7C3AED' },
      { name: 'Profils artistes', progress: 45, color: '#16A34A' },
      { name: 'Communauté & Social', progress: 30, color: '#D4A520' },
      { name: 'Streaming live', progress: 20, color: '#06B6D4' },
    ],
  },
]

// ── SVG Mockups — Delivered Projects (clean, minimal) ─────────────────────────

function AfroWearMockup() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="360" height="200" fill="#FFFFFF"/>
      {/* Black announcement bar — adjoaa.com style */}
      <rect width="360" height="22" fill="#111111"/>
      <text x="180" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="6" letterSpacing="0.8">ENJOY 10% OFF YOUR FIRST ORDER — CODE: WELCOME10</text>
      <text x="348" y="14" fill="#666666" fontSize="8">×</text>
      {/* White navbar */}
      <rect y="22" width="360" height="38" fill="#FFFFFF"/>
      <line x1="0" y1="60" x2="360" y2="60" stroke="#EBEBEB" strokeWidth="0.5"/>
      {/* Logo: red dot + brand name */}
      <circle cx="18" cy="41" r="4.5" fill="#CC2200"/>
      <text x="27" y="45" fill="#111111" fontSize="10" fontWeight="900" letterSpacing="1.5">AFROWEAR</text>
      {/* Nav items */}
      <text x="148" y="45" fill="#111111" fontSize="6" letterSpacing="0.3">SHOP</text>
      <text x="181" y="45" fill="#111111" fontSize="6" letterSpacing="0.3">WARDROBE</text>
      <text x="232" y="45" fill="#111111" fontSize="6" letterSpacing="0.3">WEDDING</text>
      <text x="278" y="45" fill="#111111" fontSize="6" letterSpacing="0.3">MODEST</text>
      {/* Right icons */}
      <circle cx="326" cy="41" r="5" fill="none" stroke="#111111" strokeWidth="1.2"/>
      <line x1="330" y1="45" x2="332.5" y2="47.5" stroke="#111111" strokeWidth="1.2"/>
      <rect x="337" y="35.5" width="10" height="10" rx="1" fill="none" stroke="#111111" strokeWidth="1.2"/>
      <path d="M338.5 35.5 Q338.5 33 342 33 Q345.5 33 345.5 35.5" stroke="#111111" strokeWidth="1" fill="none"/>
      {/* Two editorial panels */}
      <rect y="60" width="180" height="140" fill="#F5F0EA"/>
      <rect x="180" y="60" width="180" height="140" fill="#EBE4D8"/>
      <line x1="180" y1="60" x2="180" y2="200" stroke="#FFFFFF" strokeWidth="2"/>
      {/* Left panel text */}
      <text x="18" y="102" fill="#111111" fontSize="19" fontWeight="900" letterSpacing="-0.5">NEW</text>
      <text x="18" y="123" fill="#111111" fontSize="19" fontWeight="900" letterSpacing="-0.5">ARRIVALS</text>
      <text x="18" y="138" fill="#888888" fontSize="5.5" letterSpacing="2">SPRING / SUMMER 2025</text>
      <rect x="18" y="150" width="58" height="16" fill="#111111"/>
      <text x="47" y="161" textAnchor="middle" fill="#FFFFFF" fontSize="6" letterSpacing="1.2">SHOP NOW</text>
      {/* Left silhouette */}
      <ellipse cx="148" cy="96" rx="13" ry="16" fill="#C4A882" opacity="0.7"/>
      <path d="M134 118 L140 100 L156 100 L162 118 L160 192 L136 192 Z" fill="#9B7B5C" opacity="0.55"/>
      {/* Right panel silhouette */}
      <ellipse cx="270" cy="96" rx="13" ry="16" fill="#C4A882" opacity="0.7"/>
      <path d="M256 118 L262 100 L278 100 L284 118 L282 192 L258 192 Z" fill="#7A6A9A" opacity="0.55"/>
      <text x="148" y="196" textAnchor="middle" fill="#555" fontSize="5.5">Dashiki — 42 000 F</text>
      <text x="270" y="196" textAnchor="middle" fill="#555" fontSize="5.5">Boubou — 68 000 F</text>
    </svg>
  )
}

function SneakersMockup() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="360" height="200" fill="#FFFFFF"/>
      {/* Black announcement bar — Daily Paper style */}
      <rect width="360" height="22" fill="#111111"/>
      <text x="180" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="6" letterSpacing="0.5">FREE WORLDWIDE SHIPPING ON ORDERS OVER 150€</text>
      {/* White navbar */}
      <rect y="22" width="360" height="40" fill="#FFFFFF"/>
      <line x1="0" y1="62" x2="360" y2="62" stroke="#E5E7EB" strokeWidth="0.5"/>
      {/* Hamburger left */}
      <rect x="16" y="37" width="14" height="1.5" rx="0.75" fill="#111111"/>
      <rect x="16" y="41" width="14" height="1.5" rx="0.75" fill="#111111"/>
      <rect x="16" y="45" width="14" height="1.5" rx="0.75" fill="#111111"/>
      {/* Centered logo */}
      <text x="180" y="45" textAnchor="middle" fill="#111111" fontSize="11" fontWeight="900" letterSpacing="4">DAKAR PAPER</text>
      {/* Right icons */}
      <circle cx="330" cy="42" r="5" fill="none" stroke="#111111" strokeWidth="1.2"/>
      <line x1="334" y1="46" x2="336.5" y2="48.5" stroke="#111111" strokeWidth="1.2"/>
      <rect x="342" y="36.5" width="10" height="10" rx="1" fill="none" stroke="#111111" strokeWidth="1.2"/>
      {/* Dark editorial hero */}
      <rect y="62" width="360" height="100" fill="#111111"/>
      <text x="24" y="106" fill="#FFFFFF" fontSize="28" fontWeight="900" letterSpacing="-1">STREETWEAR</text>
      <text x="24" y="134" fill="#EA580C" fontSize="20" fontWeight="900" letterSpacing="-0.5">DAKAR 2025</text>
      <rect x="24" y="146" width="88" height="16" fill="#EA580C"/>
      <text x="68" y="157" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" letterSpacing="0.5">EXPLORE NOW</text>
      {/* Sneaker silhouette */}
      <path d="M220 148 Q244 116 290 112 Q320 109 348 118 L356 130 Q360 142 348 148 L282 158 Q248 166 220 148 Z" fill="#EA580C" opacity="0.9"/>
      <path d="M220 148 Q246 140 284 138 Q312 136 338 140" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.35"/>
      {/* Bottom nav strip */}
      <rect y="162" width="360" height="38" fill="#F9FAFB"/>
      {['Hommes', 'Femmes', 'Enfants', 'Nouveautés', 'Sale'].map((item, i) => (
        <text key={i} x={24 + i * 68} y="184" fill="#374151" fontSize="6.5" fontWeight={i === 0 ? '700' : '400'}>{item}</text>
      ))}
      <line x1="24" y1="188" x2="62" y2="188" stroke="#111111" strokeWidth="1.2"/>
    </svg>
  )
}

function AccessoriesMockup() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="360" height="200" fill="#FDFAF6"/>
      {/* Warm top bar — Anka Africa style */}
      <rect width="360" height="20" fill="#2D1F0E"/>
      <text x="180" y="13" textAnchor="middle" fill="#D4A520" fontSize="6" letterSpacing="0.5">🌍 Artisans africains — Livraison internationale</text>
      {/* White navbar */}
      <rect y="20" width="360" height="42" fill="#FFFFFF"/>
      <line x1="0" y1="62" x2="360" y2="62" stroke="#E8DDD0" strokeWidth="0.8"/>
      {/* Logo */}
      <text x="20" y="38" fill="#2D1F0E" fontSize="14" fontWeight="900">ANKA</text>
      <text x="20" y="50" fill="#D4A520" fontSize="5.5" letterSpacing="1.5">MARKETPLACE</text>
      {/* Search bar */}
      <rect x="100" y="28" width="168" height="24" rx="4" fill="#F5F0E8" stroke="#E0D0C0" strokeWidth="0.8"/>
      <text x="115" y="43" fill="#A0907A" fontSize="6.5">🔍  Rechercher des artisans...</text>
      <text x="286" y="38" fill="#2D1F0E" fontSize="6">Boutiques</text>
      <text x="330" y="38" fill="#2D1F0E" fontSize="6">Panier</text>
      {/* Category pills */}
      <rect y="62" width="360" height="28" fill="#FBF6EE"/>
      {['Bijoux', 'Mode', 'Maison', 'Art', 'Beauté', 'Enfants'].map((cat, i) => (
        <g key={i}>
          <rect x={12 + i * 58} y="70" width="50" height="14" rx="7"
            fill={i === 0 ? '#2D1F0E' : '#FFFFFF'}
            stroke={i === 0 ? '#2D1F0E' : '#D0C0A8'}
            strokeWidth="0.8"/>
          <text x={37 + i * 58} y="80" textAnchor="middle"
            fill={i === 0 ? '#FFFFFF' : '#5A4A3A'} fontSize="5.5">{cat}</text>
        </g>
      ))}
      {/* Product grid */}
      {[
        { x: 12, bg: '#F0E8D8', emoji: '💍', name: 'Bague Akan', price: '28 000 F', seller: 'Artisan Accra' },
        { x: 96, bg: '#E8F0E0', emoji: '🧣', name: 'Kente Wrap', price: '45 000 F', seller: 'Tisserand Kumasi' },
        { x: 180, bg: '#F0E0E8', emoji: '🏺', name: 'Poterie Dakar', price: '18 000 F', seller: 'Céramiste SN' },
        { x: 264, bg: '#E0E8F0', emoji: '👜', name: 'Sac Cuir', price: '62 000 F', seller: 'Artisan Maroc' },
      ].map(item => (
        <g key={item.x}>
          <rect x={item.x} y="96" width="76" height="98" rx="6" fill="#FFFFFF" stroke="#E8DDD0" strokeWidth="0.7"/>
          <rect x={item.x} y="96" width="76" height="52" rx="6" fill={item.bg}/>
          <rect x={item.x + 52} y="96" width="24" height="10" fill={item.bg}/>
          <text x={item.x + 38} y="128" textAnchor="middle" fontSize="20">{item.emoji}</text>
          <text x={item.x + 8} y="162" fill="#2D1F0E" fontSize="5.5" fontWeight="600">{item.name}</text>
          <text x={item.x + 8} y="172" fill="#888" fontSize="4.5">{item.seller}</text>
          <text x={item.x + 8} y="184" fill="#D4A520" fontSize="6" fontWeight="700">{item.price}</text>
        </g>
      ))}
    </svg>
  )
}

function SunuAppMockup() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="360" height="200" fill="#FFFFFF"/>
      {/* White navbar — Chargel.com style purple */}
      <rect width="360" height="44" fill="#FFFFFF"/>
      <line x1="0" y1="44" x2="360" y2="44" stroke="#E8E8F0" strokeWidth="0.5"/>
      {/* Purple logo */}
      <circle cx="18" cy="22" r="7" fill="#4C54D5"/>
      <text x="18" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900">S</text>
      <text x="30" y="26" fill="#4C54D5" fontSize="10" fontWeight="800">sunu</text>
      {['Fonctionnalités', 'Tarifs', 'Blog'].map((item, i) => (
        <text key={i} x={92 + i * 72} y="26" fill="#4A4A6A" fontSize="6.5">{item}</text>
      ))}
      {/* CTA buttons */}
      <rect x="278" y="13" width="40" height="18" rx="4" fill="none" stroke="#4C54D5" strokeWidth="1"/>
      <text x="298" y="25" textAnchor="middle" fill="#4C54D5" fontSize="6" fontWeight="600">Connexion</text>
      <rect x="323" y="13" width="32" height="18" rx="4" fill="#4C54D5"/>
      <text x="339" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="600">Essai</text>
      {/* Hero left */}
      <text x="20" y="78" fill="#111827" fontSize="16" fontWeight="800" letterSpacing="-0.5">Gérez votre</text>
      <text x="20" y="97" fill="#4C54D5" fontSize="16" fontWeight="800" letterSpacing="-0.5">business</text>
      <text x="20" y="116" fill="#111827" fontSize="16" fontWeight="800" letterSpacing="-0.5">partout.</text>
      <text x="20" y="132" fill="#6B7280" fontSize="6.5">Paiements · CRM · Analytics IA</text>
      <rect x="20" y="144" width="82" height="22" rx="6" fill="#4C54D5"/>
      <text x="61" y="158" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="600">Commencer →</text>
      <rect x="108" y="144" width="82" height="22" rx="6" fill="none" stroke="#4C54D5" strokeWidth="1"/>
      <text x="149" y="158" textAnchor="middle" fill="#4C54D5" fontSize="7">Voir démo</text>
      {/* Stats */}
      <text x="20" y="184" fill="#4C54D5" fontSize="11" fontWeight="800">2 400+</text>
      <text x="20" y="194" fill="#9CA3AF" fontSize="5">Entreprises</text>
      <text x="82" y="184" fill="#4C54D5" fontSize="11" fontWeight="800">98%</text>
      <text x="82" y="194" fill="#9CA3AF" fontSize="5">Satisfaction</text>
      <text x="124" y="184" fill="#4C54D5" fontSize="11" fontWeight="800">24/7</text>
      <text x="124" y="194" fill="#9CA3AF" fontSize="5">Support</text>
      {/* Phone mockup */}
      <rect x="218" y="50" width="118" height="148" rx="18" fill="#1A1A2E"/>
      <rect x="223" y="55" width="108" height="138" rx="14" fill="#FFFFFF"/>
      <rect x="253" y="58" width="48" height="10" rx="5" fill="#1A1A2E"/>
      {/* App header */}
      <rect x="223" y="70" width="108" height="26" fill="#4C54D5"/>
      <text x="277" y="86" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700">Sunu App</text>
      {/* KPI cards */}
      <rect x="226" y="100" width="48" height="32" rx="5" fill="#EEF0FF"/>
      <text x="250" y="113" textAnchor="middle" fill="#4C54D5" fontSize="9" fontWeight="700">2.4M</text>
      <text x="250" y="124" textAnchor="middle" fill="#6B7280" fontSize="4.5">FCFA</text>
      <rect x="278" y="100" width="50" height="32" rx="5" fill="#FFF8EE"/>
      <text x="303" y="113" textAnchor="middle" fill="#D97706" fontSize="9" fontWeight="700">1 247</text>
      <text x="303" y="124" textAnchor="middle" fill="#6B7280" fontSize="4.5">Clients</text>
      {/* Chart bars */}
      {[14, 22, 18, 30, 26, 34, 30].map((h, i) => (
        <rect key={i} x={228 + i * 14} y={178 - h} width="10" height={h} rx="2"
          fill="#4C54D5" opacity={0.4 + i * 0.08}/>
      ))}
      {/* Bottom nav */}
      <rect x="223" y="182" width="108" height="11" fill="#F9FAFB"/>
      {['🏠', '📊', '💳', '👤'].map((icon, i) => (
        <text key={i} x={234 + i * 26} y="191" fill="#111111" fontSize="8">{icon}</text>
      ))}
    </svg>
  )
}

function FitDakarMockup() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="360" height="200" fill="#FFFFFF"/>
      {/* Red promo bar — myfitnesslive.com style */}
      <rect width="360" height="22" fill="#DC2626"/>
      <text x="180" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="6" letterSpacing="0.5">🔥 -20% SUR TOUT • CODE: FITDAKAR20 • LIVRAISON GRATUITE</text>
      {/* White navbar with centered logo */}
      <rect y="22" width="360" height="40" fill="#FFFFFF"/>
      <line x1="0" y1="62" x2="360" y2="62" stroke="#F0F0F0" strokeWidth="0.8"/>
      <text x="180" y="36" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="900" letterSpacing="1">FIT DAKAR</text>
      <text x="180" y="50" textAnchor="middle" fill="#DC2626" fontSize="5.5" letterSpacing="3">CLUB</text>
      {['Protéines', 'BCAA', 'Créatine'].map((item, i) => (
        <text key={i} x={12 + i * 54} y="42" fill="#374151" fontSize="6">{item}</text>
      ))}
      {['Coaching', 'Shop'].map((item, i) => (
        <text key={i} x={276 + i * 42} y="42" fill="#374151" fontSize="6">{item}</text>
      ))}
      {/* Category icons */}
      <rect y="62" width="360" height="40" fill="#F9FAFB"/>
      {[
        { label: 'Protéines', emoji: '💪', x: 18 },
        { label: 'BCAA', emoji: '⚡', x: 90 },
        { label: 'Brûleurs', emoji: '🔥', x: 162 },
        { label: 'Créatine', emoji: '🏋️', x: 234 },
        { label: 'Vitamines', emoji: '🌿', x: 306 },
      ].map(cat => (
        <g key={cat.x}>
          <circle cx={cat.x + 20} cy="82" r="16" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8"/>
          <text x={cat.x + 20} y="86" textAnchor="middle" fontSize="13">{cat.emoji}</text>
          <text x={cat.x + 20} y="100" textAnchor="middle" fill="#374151" fontSize="5">{cat.label}</text>
        </g>
      ))}
      {/* Product cards */}
      {[
        { x: 12, color: '#DC2626', bg: '#FEF2F2', emoji: '🥤', name: 'Whey Protein', price: '28 500 F', badge: 'BEST' },
        { x: 96, color: '#D97706', bg: '#FFFBEB', emoji: '⚡', name: 'BCAA Pro', price: '18 000 F', badge: '-20%' },
        { x: 180, color: '#7C3AED', bg: '#F5F3FF', emoji: '💊', name: 'Multi-Vit', price: '12 500 F', badge: 'NEW' },
        { x: 264, color: '#16A34A', bg: '#F0FDF4', emoji: '🏆', name: 'Créatine X', price: '22 000 F', badge: 'TOP' },
      ].map(item => (
        <g key={item.x}>
          <rect x={item.x} y="108" width="76" height="86" rx="6" fill="#FFFFFF" stroke="#F0F0F0" strokeWidth="0.8"/>
          <rect x={item.x} y="108" width="76" height="46" rx="6" fill={item.bg}/>
          <rect x={item.x + 52} y="108" width="24" height="10" fill={item.bg}/>
          <rect x={item.x + 4} y="112" width="20" height="10" rx="5" fill={item.color}/>
          <text x={item.x + 14} y="120" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="700">{item.badge}</text>
          <text x={item.x + 38} y="138" textAnchor="middle" fontSize="18">{item.emoji}</text>
          <text x={item.x + 8} y="164" fill="#111827" fontSize="5.5" fontWeight="600">{item.name}</text>
          <text x={item.x + 8} y="176" fill={item.color} fontSize="6.5" fontWeight="700">{item.price}</text>
          <rect x={item.x + 8} y="183" width="60" height="9" rx="4" fill={item.color}/>
          <text x={item.x + 38} y="190" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="600">AJOUTER</text>
        </g>
      ))}
    </svg>
  )
}

function AcademyMockup() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Dark navy — AltSchool Africa style */}
      <rect width="360" height="200" fill="#050D1A"/>
      {/* Navbar */}
      <rect width="360" height="44" fill="#080F1E"/>
      <line x1="0" y1="44" x2="360" y2="44" stroke="#1A2A3A" strokeWidth="0.8"/>
      {/* Logo */}
      <text x="18" y="24" fill="#FBBF24" fontSize="12" fontWeight="900">Alt</text>
      <text x="40" y="24" fill="#FFFFFF" fontSize="12" fontWeight="900">School</text>
      <text x="18" y="38" fill="#6B8AAA" fontSize="5" letterSpacing="1.5">AFRICA</text>
      {['Schools', 'Curriculum', 'Community', 'Alumni'].map((item, i) => (
        <text key={i} x={110 + i * 54} y="28" fill="#94A3B8" fontSize="6">{item}</text>
      ))}
      {/* Login + Sign up */}
      <rect x="278" y="13" width="36" height="18" rx="4" fill="none" stroke="#FBBF24" strokeWidth="1"/>
      <text x="296" y="25" textAnchor="middle" fill="#FBBF24" fontSize="6" fontWeight="600">Login</text>
      <rect x="320" y="13" width="36" height="18" rx="4" fill="#FBBF24"/>
      <text x="338" y="25" textAnchor="middle" fill="#000000" fontSize="6" fontWeight="700">Sign Up</text>
      {/* Hero headline */}
      <text x="20" y="76" fill="#FFFFFF" fontSize="18" fontWeight="800" letterSpacing="-0.5">Learn.</text>
      <text x="20" y="97" fill="#FBBF24" fontSize="18" fontWeight="800" letterSpacing="-0.5">Build.</text>
      <text x="20" y="118" fill="#FFFFFF" fontSize="18" fontWeight="800" letterSpacing="-0.5">Launch.</text>
      <text x="20" y="134" fill="#6B8AAA" fontSize="6.5">Rejoignez 15 000+ étudiants africains</text>
      <rect x="20" y="143" width="96" height="20" rx="5" fill="#FBBF24"/>
      <text x="68" y="156" textAnchor="middle" fill="#000000" fontSize="7" fontWeight="700">Apply Now →</text>
      {/* Schools grid */}
      <text x="204" y="66" fill="#94A3B8" fontSize="5.5" letterSpacing="2">SCHOOLS</text>
      {[
        { name: 'Engineering', emoji: '⚙️', color: '#06B6D4' },
        { name: 'Product', emoji: '📱', color: '#FBBF24' },
        { name: 'Data', emoji: '📊', color: '#A855F7' },
        { name: 'Business', emoji: '💼', color: '#16A34A' },
      ].map((school, i) => (
        <g key={i}>
          <rect x={204 + (i % 2) * 80} y={74 + Math.floor(i / 2) * 58} width="72" height="48" rx="8"
            fill="#0D1A2A" stroke={school.color + '40'} strokeWidth="0.8"/>
          <text x={240 + (i % 2) * 80} y={98 + Math.floor(i / 2) * 58} textAnchor="middle" fontSize="14">{school.emoji}</text>
          <text x={240 + (i % 2) * 80} y={112 + Math.floor(i / 2) * 58} textAnchor="middle"
            fill={school.color} fontSize="5.5" fontWeight="600">{school.name}</text>
        </g>
      ))}
      <text x="180" y="192" textAnchor="middle" fill="#2A3A4A" fontSize="5.5">Africa&apos;s leading tech school · Cohort 2025 open</text>
    </svg>
  )
}

function TerangaMockup() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Dark luxury — La Yucca Dakar style */}
      <rect width="360" height="200" fill="#0D0803"/>
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={i * 90} y1="0" x2={i * 90} y2="200" stroke="#1A1208" strokeWidth="0.5"/>
      ))}
      {/* Dark navbar */}
      <rect width="360" height="50" fill="#100A04"/>
      <line x1="0" y1="50" x2="360" y2="50" stroke="#D4A52025" strokeWidth="0.8"/>
      {/* Centered logo */}
      <text x="180" y="26" textAnchor="middle" fill="#D4A520" fontSize="14" fontWeight="100" letterSpacing="8">TERANGA</text>
      <text x="180" y="42" textAnchor="middle" fill="#6B5A3A" fontSize="5" letterSpacing="4">RESTAURANT DAKAR</text>
      {/* Left nav */}
      <text x="16" y="28" fill="#8B7355" fontSize="5.5" letterSpacing="1">MENU</text>
      <text x="16" y="42" fill="#8B7355" fontSize="5.5" letterSpacing="1">VINS</text>
      {/* Right nav */}
      <text x="302" y="28" fill="#8B7355" fontSize="5.5" letterSpacing="1">RÉSERVER</text>
      <text x="308" y="42" fill="#D4A520" fontSize="5.5" letterSpacing="1">CONTACT</text>
      {/* Hero section */}
      <text x="180" y="90" textAnchor="middle" fill="#6B5A3A" fontSize="6" letterSpacing="3">DEPUIS 2018</text>
      <text x="180" y="112" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="300" letterSpacing="2">La Saveur</text>
      <text x="180" y="134" textAnchor="middle" fill="#D4A520" fontSize="22" fontWeight="300" letterSpacing="2">du Sénégal</text>
      <line x1="140" y1="142" x2="220" y2="142" stroke="#D4A52050" strokeWidth="0.8"/>
      {/* Elegant CTA */}
      <rect x="128" y="152" width="104" height="24" rx="1" fill="none" stroke="#D4A520" strokeWidth="0.8"/>
      <text x="180" y="167" textAnchor="middle" fill="#D4A520" fontSize="6.5" letterSpacing="2">RÉSERVER UNE TABLE</text>
      {/* Menu categories */}
      {[
        { x: 12, label: 'ENTRÉES', emoji: '🥗' },
        { x: 72, label: 'THIÉBOU', emoji: '🍚' },
        { x: 132, label: 'YASSA', emoji: '🍗' },
        { x: 192, label: 'MAAFÉ', emoji: '🥘' },
        { x: 252, label: 'DESSERTS', emoji: '🍮' },
        { x: 312, label: 'VINS', emoji: '🍷' },
      ].map(cat => (
        <g key={cat.x}>
          <text x={cat.x + 20} y="182" textAnchor="middle" fontSize="12">{cat.emoji}</text>
          <text x={cat.x + 20} y="196" textAnchor="middle" fill="#5A4A2A" fontSize="4.5" letterSpacing="0.3">{cat.label}</text>
        </g>
      ))}
    </svg>
  )
}

// ── SVG Mockups — In-progress (UNCHANGED) ────────────────────────────────────

function IaMockup() {
  return (
    <svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="iabg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#000818"/><stop offset="100%" stopColor="#00101F"/>
        </linearGradient>
        <linearGradient id="iacyan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4"/><stop offset="100%" stopColor="#0EA5E9"/>
        </linearGradient>
        <linearGradient id="iapurple" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#A855F7"/>
        </linearGradient>
      </defs>
      <rect width="360" height="230" fill="url(#iabg)"/>
      {[0,1,2,3,4,5].map(i => <line key={i} x1={0} y1={i*46} x2={360} y2={i*46} stroke="#06B6D4" strokeWidth="0.3" opacity="0.15"/>)}
      {[0,1,2,3,4,5,6,7].map(i => <line key={i} x1={i*52} y1={0} x2={i*52} y2={230} stroke="#06B6D4" strokeWidth="0.3" opacity="0.15"/>)}
      {[[50,40],[50,90],[50,140],[50,190]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill="#000818" stroke="#06B6D4" strokeWidth="1.5"/>
          <circle cx={x} cy={y} r="4" fill="#06B6D4" opacity="0.8"/>
        </g>
      ))}
      {[[120,30],[120,75],[120,120],[120,165],[120,195]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" fill="#000818" stroke="#A855F7" strokeWidth="1.5"/>
          <circle cx={x} cy={y} r="3.5" fill="#A855F7" opacity="0.8"/>
        </g>
      ))}
      {[[180,50],[180,110],[180,170]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="#000818" stroke="#06B6D4" strokeWidth="2"/>
          <circle cx={x} cy={y} r="5" fill="#06B6D4" opacity="0.9"/>
        </g>
      ))}
      {[[50,40,120,30],[50,40,120,75],[50,90,120,75],[50,90,120,120],[50,140,120,120],[50,140,120,165],[50,190,120,165],[50,190,120,195]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#06B6D4" strokeWidth="0.8" opacity="0.3"/>
      ))}
      {[[120,30,180,50],[120,75,180,50],[120,75,180,110],[120,120,180,110],[120,165,180,170],[120,195,180,170]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#A855F7" strokeWidth="0.8" opacity="0.3"/>
      ))}
      <rect x="205" y="8" width="148" height="214" rx="10" fill="#000C1A" stroke="#06B6D4" strokeWidth="0.8"/>
      <rect x="205" y="8" width="148" height="22" rx="10" fill="#001224"/>
      <rect x="205" y="20" width="148" height="10" fill="#001224"/>
      <text x="279" y="22" textAnchor="middle" fill="#06B6D4" fontSize="7" fontWeight="bold" letterSpacing="1">BAOBAB AI SUITE</text>
      {[
        {name:'Générateur Wolof', icon:'🎙', pct:75, color:'#06B6D4'},
        {name:'Assistant Business', icon:'💼', pct:60, color:'#A855F7'},
        {name:'Auto-Workflow IA', icon:'⚡', pct:70, color:'#D4A520'},
        {name:'IA Créateurs', icon:'🎬', pct:45, color:'#16A34A'},
      ].map((tool, i) => (
        <g key={i}>
          <rect x="210" y={34 + i*48} width="138" height="42" rx="7" fill="#00101C" stroke={tool.color} strokeWidth="0.5" opacity="0.9"/>
          <text x="218" y={52 + i*48} fill={tool.color} fontSize="10">{tool.icon}</text>
          <text x="234" y={52 + i*48} fill="#C0E0F0" fontSize="6" fontWeight="bold">{tool.name}</text>
          <text x="234" y={62 + i*48} fill="#4A7A8A" fontSize="5">En développement...</text>
          <rect x="210" y={66 + i*48} width="138" height="4" rx="2" fill="#001824"/>
          <rect x="210" y={66 + i*48} width={138 * tool.pct / 100} height="4" rx="2" fill={tool.color}/>
          <text x="342" y={71 + i*48} textAnchor="end" fill={tool.color} fontSize="5">{tool.pct}%</text>
        </g>
      ))}
      <text x="100" y="220" textAnchor="middle" fill="#06B6D4" fontSize="6" opacity="0.6">RÉSEAU DE NEURONES</text>
    </svg>
  )
}

function SaasMockup() {
  return (
    <svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="sbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#060D06"/><stop offset="100%" stopColor="#0A160A"/>
        </linearGradient>
      </defs>
      <rect width="360" height="230" fill="url(#sbg)" rx="10" stroke="#1A3A1A" strokeWidth="1"/>
      <rect x="0" y="0" width="70" height="230" rx="10" fill="#080E08"/>
      <rect x="60" y="0" width="10" height="230" fill="#080E08"/>
      <text x="35" y="22" textAnchor="middle" fill="#D4A520" fontSize="8" fontWeight="bold">BD</text>
      <text x="35" y="30" textAnchor="middle" fill="#16A34A" fontSize="4" letterSpacing="1">SaaS</text>
      <line x1="10" y1="36" x2="60" y2="36" stroke="#1A3A1A" strokeWidth="0.8"/>
      {[
        {icon:'📊', label:'Dashboard', active:true},
        {icon:'👥', label:'CRM', active:false},
        {icon:'📈', label:'Analytics', active:false},
        {icon:'💳', label:'Facturation', active:false},
        {icon:'⚙️', label:'Paramètres', active:false},
      ].map((item, i) => (
        <g key={i}>
          <rect x="5" y={42 + i*34} width="60" height="28" rx="6"
            fill={item.active ? '#1B4A1B' : 'transparent'} stroke={item.active ? '#16A34A' : 'transparent'} strokeWidth="0.7"/>
          <text x="35" y={54 + i*34} textAnchor="middle" fontSize="12">{item.icon}</text>
          <text x="35" y={65 + i*34} textAnchor="middle" fill={item.active ? '#16A34A' : '#3A5A3A'} fontSize="4">{item.label}</text>
        </g>
      ))}
      <rect x="70" y="0" width="290" height="26" fill="#0A120A"/>
      <text x="82" y="17" fill="#fff" fontSize="8" fontWeight="bold">Dashboard — Bienvenue, Djibril 👋</text>
      <rect x="318" y="6" width="36" height="14" rx="5" fill="#1B4A1B" stroke="#16A34A" strokeWidth="0.7"/>
      <text x="336" y="16" textAnchor="middle" fill="#16A34A" fontSize="5">+ Nouveau</text>
      {[
        {label:'Revenus mensuels', value:'2.4M FCFA', change:'+18%', color:'#D4A520', icon:'💰'},
        {label:'Clients actifs', value:'1 247', change:'+12%', color:'#16A34A', icon:'👥'},
        {label:'Taux conversion', value:'8.4%', change:'+3.1%', color:'#06B6D4', icon:'📈'},
        {label:'Score NPS', value:'72/100', change:'+5pts', color:'#7C3AED', icon:'⭐'},
      ].map((kpi, i) => (
        <g key={i}>
          <rect x={72 + i*71} y="28" width="68" height="44" rx="6" fill="#0D160D" stroke="#1A3A1A" strokeWidth="0.7"/>
          <text x={82 + i*71} y="44" fill={kpi.color} fontSize="12">{kpi.icon}</text>
          <text x={82 + i*71} y="56" fill="#fff" fontSize="7" fontWeight="bold">{kpi.value}</text>
          <text x={82 + i*71} y="65" fill="#3A6A3A" fontSize="4">{kpi.label}</text>
          <text x={133 + i*71} y="44" textAnchor="end" fill={kpi.color} fontSize="5">{kpi.change}</text>
        </g>
      ))}
      <rect x="72" y="76" width="178" height="90" rx="8" fill="#0D160D" stroke="#1A3A1A" strokeWidth="0.7"/>
      <text x="82" y="90" fill="#fff" fontSize="6" fontWeight="bold">Revenus mensuels</text>
      {[40,65,50,80,55,90,75,95,60,85,70,100].map((h, i) => (
        <g key={i}>
          <rect x={84 + i*12} y={155 - h*0.7} width="8" height={h*0.7} rx="2"
            fill={i===11?'#D4A520':'#1B4A1B'} opacity={i===11?1:0.7}/>
        </g>
      ))}
      <line x1="82" y1="156" x2="244" y2="156" stroke="#1A3A1A" strokeWidth="0.7"/>
      {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => (
        <text key={i} x={88 + i*12} y="163" textAnchor="middle" fill="#2D4A2D" fontSize="4">{m}</text>
      ))}
      <rect x="254" y="76" width="100" height="90" rx="8" fill="#0D160D" stroke="#1A3A1A" strokeWidth="0.7"/>
      <text x="264" y="90" fill="#fff" fontSize="6" fontWeight="bold">Clients récents</text>
      {[
        {name:'Aminata Diallo', plan:'Pro', color:'#D4A520'},
        {name:'Moussa Traoré', plan:'Business', color:'#16A34A'},
        {name:'Fatou Bah', plan:'Starter', color:'#06B6D4'},
        {name:'Ibrahim Koné', plan:'Pro', color:'#D4A520'},
      ].map((c, i) => (
        <g key={i}>
          <circle cx="266" cy={100 + i*16} r="5" fill={`${c.color}30`} stroke={c.color} strokeWidth="0.8"/>
          <text x="266" y={103 + i*16} textAnchor="middle" fill={c.color} fontSize="4">{c.name[0]}</text>
          <text x="275" y={103 + i*16} fill="#C0D0C0" fontSize="5">{c.name}</text>
          <rect x="322" y={97 + i*16} width="26" height="8" rx="3" fill={`${c.color}20`} stroke={c.color} strokeWidth="0.5"/>
          <text x="335" y={103 + i*16} textAnchor="middle" fill={c.color} fontSize="4">{c.plan}</text>
        </g>
      ))}
      <rect x="72" y="170" width="282" height="54" rx="8" fill="#0D160D" stroke="#1A3A1A" strokeWidth="0.7"/>
      <text x="82" y="184" fill="#fff" fontSize="6" fontWeight="bold">Activité en temps réel</text>
      {[
        {txt:'Nouveau client inscrit — Dakar', time:'il y a 2 min', color:'#16A34A'},
        {txt:'Facture payée — 45 000 FCFA', time:'il y a 8 min', color:'#D4A520'},
        {txt:'Support résolu — Ticket #247', time:'il y a 15 min', color:'#06B6D4'},
      ].map((a, i) => (
        <g key={i}>
          <circle cx="82" cy={193 + i*12} r="3" fill={a.color}/>
          <text x="90" y={197 + i*12} fill="#A0C0A0" fontSize="5">{a.txt}</text>
          <text x="348" y={197 + i*12} textAnchor="end" fill="#3A6A3A" fontSize="4">{a.time}</text>
        </g>
      ))}
    </svg>
  )
}

function MbalaxMockup() {
  return (
    <svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="mbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#080010"/><stop offset="100%" stopColor="#100020"/>
        </linearGradient>
        <linearGradient id="mpurple" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#A855F7"/>
        </linearGradient>
      </defs>
      <rect width="360" height="230" fill="url(#mbg)" rx="10"/>
      <rect x="0" y="0" width="75" height="230" rx="10" fill="#060010"/>
      <rect x="65" y="0" width="10" height="230" fill="#060010"/>
      <text x="37" y="20" textAnchor="middle" fill="#A855F7" fontSize="9" fontWeight="bold">🎵</text>
      <text x="37" y="30" textAnchor="middle" fill="#D4A520" fontSize="5" fontWeight="bold">MBALAX</text>
      <text x="37" y="37" textAnchor="middle" fill="#7C3AED" fontSize="4">HUB</text>
      <line x1="8" y1="42" x2="64" y2="42" stroke="#200040" strokeWidth="0.8"/>
      {[
        {icon:'🏠', label:'Accueil'},
        {icon:'🔍', label:'Explorer'},
        {icon:'📚', label:'Playlists'},
        {icon:'⭐', label:'Artistes'},
        {icon:'💿', label:'Albums'},
        {icon:'❤️', label:'Favoris'},
      ].map((item, i) => (
        <g key={i}>
          <text x="37" y={57 + i*28} textAnchor="middle" fontSize="12">{item.icon}</text>
          <text x="37" y={68 + i*28} textAnchor="middle" fill={i===0?'#A855F7':'#4A2A6A'} fontSize="4">{item.label}</text>
        </g>
      ))}
      <rect x="75" y="0" width="285" height="22" fill="#0A0018"/>
      <text x="85" y="15" fill="#fff" fontSize="7" fontWeight="bold">Découvrir le Mbalax 🥁</text>
      <rect x="220" y="5" width="100" height="13" rx="6" fill="#160030"/>
      <text x="270" y="14" textAnchor="middle" fill="#4A2A6A" fontSize="5">🔍 Rechercher...</text>
      <rect x="75" y="22" width="285" height="65" fill="#100020"/>
      <rect x="75" y="22" width="285" height="65" fill="#1A0035" opacity="0.8"/>
      {[0,1,2,3].map(i => (
        <circle key={i} cx={90 + i*80} cy="54" r="30" fill="none" stroke="#7C3AED" strokeWidth="0.5" opacity="0.2"/>
      ))}
      <circle cx="140" cy="54" r="24" fill="#160030" stroke="#A855F7" strokeWidth="1.5"/>
      <text x="140" y="58" textAnchor="middle" fill="#D4A520" fontSize="12" fontWeight="bold">YN</text>
      <text x="175" y="42" fill="#fff" fontSize="9" fontWeight="bold">Youssou N&apos;Dour</text>
      <text x="175" y="53" fill="#A855F7" fontSize="6">Légende du Mbalax</text>
      <text x="175" y="62" fill="#4A2A6A" fontSize="5">12.4M auditeurs • 847 titres</text>
      <rect x="175" y="67" width="50" height="12" rx="5" fill="url(#mpurple)"/>
      <text x="200" y="76" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="bold">▶ Écouter</text>
      <rect x="230" y="67" width="40" height="12" rx="5" fill="#160030" stroke="#7C3AED" strokeWidth="0.7"/>
      <text x="250" y="76" textAnchor="middle" fill="#A855F7" fontSize="5">+ Suivre</text>
      <rect x="75" y="87" width="140" height="105" rx="8" fill="#0C0018" stroke="#2A0050" strokeWidth="0.7"/>
      <text x="85" y="100" fill="#A855F7" fontSize="5" fontWeight="bold">EN COURS</text>
      <rect x="85" y="104" width="50" height="50" rx="6" fill="#1A0035"/>
      <circle cx="110" cy="129" r="18" fill="#200040" stroke="#A855F7" strokeWidth="1"/>
      <circle cx="110" cy="129" r="6" fill="#A855F7" opacity="0.6"/>
      <text x="110" y="133" textAnchor="middle" fill="#D4A520" fontSize="8">🥁</text>
      <text x="145" y="118" fill="#fff" fontSize="6" fontWeight="bold">Set Xol Yi</text>
      <text x="145" y="128" fill="#6A4A8A" fontSize="5">Youssou N&apos;Dour</text>
      <text x="145" y="138" fill="#4A2A6A" fontSize="4">Album: Joko</text>
      {[4,8,12,6,10,14,7,11,5,9,13,6,10,4,8,12].map((h, i) => (
        <rect key={i} x={85 + i*7} y={160 - h} width="4" height={h*2}
          rx="2" fill={i<6?'#A855F7':'#2A0050'} opacity={i<6?0.9:0.5}/>
      ))}
      <rect x="85" y="174" width="120" height="3" rx="1.5" fill="#200040"/>
      <rect x="85" y="174" width="45" height="3" rx="1.5" fill="url(#mpurple)"/>
      <text x="85" y="184" fill="#4A2A6A" fontSize="4">1:42</text>
      <text x="204" y="184" textAnchor="end" fill="#4A2A6A" fontSize="4">4:15</text>
      <text x="100" y="193" textAnchor="middle" fill="#6A4A8A" fontSize="10">⏮</text>
      <circle cx="120" cy="189" r="10" fill="url(#mpurple)"/>
      <text x="120" y="193" textAnchor="middle" fill="#fff" fontSize="10">▶</text>
      <text x="140" y="193" textAnchor="middle" fill="#6A4A8A" fontSize="10">⏭</text>
      <rect x="220" y="87" width="140" height="105" rx="8" fill="#0C0018" stroke="#2A0050" strokeWidth="0.7"/>
      <text x="230" y="100" fill="#A855F7" fontSize="5" fontWeight="bold">PLAYLIST POPULAIRE</text>
      {[
        ['Birima', 'Y. N\'Dour', '3:45'],
        ['Immigrés', 'Y. N\'Dour', '5:12'],
        ['Djamil', 'Wally Seck', '4:28'],
        ['Lay', 'Pape Diouf', '3:55'],
        ['Xarit', 'Omar Pène', '4:10'],
      ].map((track, i) => (
        <g key={i}>
          <rect x="224" y={106 + i*18} width="132" height="15" rx="4"
            fill={i===0?'#1A0035':'transparent'} stroke={i===0?'#7C3AED':'transparent'} strokeWidth="0.5"/>
          <text x="230" y={117 + i*18} fill={i===0?'#A855F7':'#6A4A8A'} fontSize="4">{i+1}.</text>
          <text x="238" y={117 + i*18} fill={i===0?'#fff':'#8A6AAA'} fontSize="5">{track[0]}</text>
          <text x="290" y={117 + i*18} fill="#4A2A6A" fontSize="4">{track[1]}</text>
          <text x="348" y={117 + i*18} textAnchor="end" fill="#4A2A6A" fontSize="4">{track[2]}</text>
        </g>
      ))}
      <text x="290" y="195" textAnchor="middle" fill="#A855F7" fontSize="5">Voir tout →</text>
    </svg>
  )
}

// ── Mockup map ────────────────────────────────────────────────────────────────

const MOCKUP_MAP: Record<string, React.FC> = {
  afrowear: AfroWearMockup,
  sneakers: SneakersMockup,
  accessories: AccessoriesMockup,
  sunuapp: SunuAppMockup,
  fitdakar: FitDakarMockup,
  academy: AcademyMockup,
  teranga: TerangaMockup,
  ia: IaMockup,
  saas: SaasMockup,
  mbalax: MbalaxMockup,
}

// ── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ value, color, animated = false }: { value: number; color: string; animated?: boolean }) {
  return (
    <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: color }}
      />
      {animated && (
        <motion.div
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-y-0 w-12 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
        />
      )}
    </div>
  )
}

// ── Delivered card — clean, minimal ──────────────────────────────────────────

function DeliveredCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const MockupComponent = MOCKUP_MAP[project.id]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="relative rounded-2xl overflow-hidden group"
      style={{
        background: '#FFFFFF',
        border: '1px solid #F1F5F9',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
    >
      {/* Mockup preview */}
      <div className="relative overflow-hidden" style={{ height: 186 }}>
        {MockupComponent && <MockupComponent />}

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(4px)' }}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white"
            style={{
              background: project.color,
              boxShadow: `0 4px 16px ${project.color}30`,
            }}
          >
            <FiExternalLink size={14} />
            {project.linkLabel}
          </a>
        </motion.div>

        {/* Badges */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-semibold"
          style={{ background: 'rgba(255,255,255,0.95)', color: '#16A34A', border: '1px solid rgba(22,163,74,0.18)' }}
        >
          <FiCheck size={9} /> Livré
        </div>
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-medium"
          style={{ background: 'rgba(255,255,255,0.95)', color: project.color, border: `1px solid ${project.color}20` }}
        >
          {project.category}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-space-grotesk text-base font-bold text-slate-900 mb-0.5">{project.title}</h3>
        <p className="text-xs mb-3 font-medium" style={{ color: project.color }}>{project.subtitle}</p>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">{project.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.features.map(f => (
            <span key={f} className="text-[10px] px-2 py-0.5 rounded-md"
              style={{ background: `${project.color}08`, color: project.color, border: `1px solid ${project.color}12` }}>
              ✓ {f}
            </span>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md"
              style={{ background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-250"
          style={{
            background: `${project.color}08`,
            color: project.color,
            border: `1px solid ${project.color}15`,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${project.color}14` }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${project.color}08` }}
        >
          <FiExternalLink size={11} /> {project.linkLabel}
        </a>
      </div>
    </motion.div>
  )
}

// ── In-progress card (UNCHANGED) ─────────────────────────────────────────────

function InProgressCard({ project, index }: { project: Project; index: number }) {
  const MockupComponent = MOCKUP_MAP[project.id]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: `1px solid #E2E8F0`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Mockup */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        {MockupComponent && <MockupComponent />}
        {/* "In progress" overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(248,250,252,0.75)', backdropFilter: 'blur(2px)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl"
          >
            🚀
          </motion.div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}30` }}
          >
            <FiClock size={11} />
            En cours de développement
          </div>
          {/* Global progress */}
          <div className="w-48">
            <div className="flex justify-between text-[10px] mb-1">
              <span style={{ color: project.color }}>Progression globale</span>
              <span style={{ color: project.color }} className="font-bold">{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress} color={project.color} animated />
          </div>
        </div>

        {/* Category badge */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-medium"
          style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}
        >
          {project.category}
        </div>
      </div>

      {/* Card info */}
      <div className="p-5">
        <h3 className="font-space-grotesk text-base font-bold text-slate-900 mb-1">{project.title}</h3>
        <p className="text-xs mb-3 font-medium" style={{ color: project.color }}>{project.subtitle}</p>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">{project.description}</p>

        {/* Sub-projects */}
        {project.subProjects && (
          <div className="space-y-2.5 mb-4">
            {project.subProjects.map(sub => (
              <div key={sub.name}>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-500">{sub.name}</span>
                  <span className="font-bold" style={{ color: sub.color }}>{sub.progress}%</span>
                </div>
                <ProgressBar value={sub.progress} color={sub.color} animated />
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded"
              style={{ background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

const FILTERS = ['Tous', 'Livrés', 'En cours']

export default function Projects() {
  const [filter, setFilter] = useState('Tous')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const delivered = PROJECTS.filter(p => p.status === 'delivered')
  const inProgress = PROJECTS.filter(p => p.status === 'in-progress')
  const shown = filter === 'Livrés' ? delivered : filter === 'En cours' ? inProgress : PROJECTS

  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-white">
      {/* Subtle top gradient */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.12), transparent)' }} />

      <div ref={ref} className="container-custom">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.4em] uppercase font-medium mb-4" style={{ color: '#2563EB' }}>
            Mon travail
          </p>
          <h2 className="font-space-grotesk text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
            Projets{' '}
            <span style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Premium
            </span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm mb-10">
            Des réalisations concrètes — de l&apos;idée au produit fini, chaque projet reflète l&apos;excellence digitale.
          </p>

          {/* Filters */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl" style={{ background: '#F1F5F9' }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: filter === f ? '#FFFFFF' : 'transparent',
                  color: filter === f ? '#1E293B' : '#64748B',
                  boxShadow: filter === f ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  fontWeight: filter === f ? 600 : 400,
                }}
              >
                {f}
                {f === 'Livrés' && <span className="ml-1.5 text-[10px] opacity-60">{delivered.length}</span>}
                {f === 'En cours' && <span className="ml-1.5 text-[10px] opacity-60">{inProgress.length}</span>}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {shown.map((project, idx) =>
              project.status === 'delivered'
                ? <DeliveredCard key={project.id} project={project} index={idx} />
                : <InProgressCard key={project.id} project={project} index={idx} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 text-sm mb-5">
            Vous avez un projet ambitieux en tête ?
          </p>
          <a
            href="https://wa.me/212773591012"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FiArrowRight size={16} />
            Démarrer mon projet
          </a>
        </motion.div>
      </div>
    </section>
  )
}
