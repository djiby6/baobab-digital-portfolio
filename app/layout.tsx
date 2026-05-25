import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

const BASE_URL = 'https://baobab-digital-portfolio.vercel.app'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563EB',
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Baobab Digital | Développement Web, SaaS & IA en Afrique',
    template: '%s | Baobab Digital',
  },
  description:
    'Baobab Digital crée des sites web modernes, applications mobiles, SaaS et solutions IA pour entreprises, startups et entrepreneurs africains. Basé au Sénégal, actif dans toute l\'Afrique et au Maroc.',
  keywords: [
    'développeur web Sénégal',
    'création site web Afrique',
    'SaaS Afrique',
    'développeur Next.js',
    'applications mobiles Sénégal',
    'agence digitale Afrique',
    'développeur full stack Maroc',
    'UI UX Afrique',
    'Baobab Digital',
    'Djibril Ndiaye',
    'développement web Dakar',
    'React Next.js Afrique',
    'intelligence artificielle Sénégal',
    'freelance développeur Afrique',
    'startup digitale Afrique',
    'agence web Dakar',
    'développeur React Sénégal',
    'site web premium Afrique',
  ],
  authors: [{ name: 'Djibril Ndiaye', url: BASE_URL }],
  creator: 'Djibril Ndiaye',
  publisher: 'Baobab Digital',
  category: 'technology',
  applicationName: 'Baobab Digital',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: BASE_URL,
    languages: {
      'fr-FR': BASE_URL,
      'fr-SN': BASE_URL,
      'fr-MA': BASE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    siteName: 'Baobab Digital',
    title: 'Baobab Digital | Développement Web, SaaS & IA en Afrique',
    description:
      'Baobab Digital crée des sites web modernes, applications mobiles, SaaS et solutions IA pour startups et entreprises africaines. Djibril Ndiaye — Développeur Full Stack basé en Afrique.',
    images: [
      {
        url: '/images/baobab-logo.png',
        width: 1200,
        height: 630,
        alt: 'Baobab Digital — Développement Web, SaaS & IA en Afrique',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@baobabdigital',
    creator: '@djibrilndiaye',
    title: 'Baobab Digital | Développement Web, SaaS & IA en Afrique',
    description:
      'Sites web, apps mobiles, SaaS et IA pour startups africaines. Basé au Sénégal, actif partout en Afrique.',
    images: [
      {
        url: '/images/baobab-logo.png',
        alt: 'Baobab Digital — Agence Digitale Afrique',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/baobab-logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/baobab-logo.png' },
    ],
    shortcut: '/images/baobab-logo.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'Djibril Ndiaye',
      url: BASE_URL,
      email: 'marketingdj12@gmail.com',
      telephone: '+212773591012',
      jobTitle: 'Développeur Full Stack & Créateur SaaS',
      description:
        'Développeur Full Stack spécialisé React, Next.js, Node.js. Créateur de produits SaaS et applications mobiles pour le marché africain et international.',
      knowsAbout: [
        'React', 'Next.js', 'Node.js', 'React Native',
        'UI/UX Design', 'SaaS', 'Intelligence Artificielle',
        'TypeScript', 'MongoDB', 'PostgreSQL',
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'SN',
        addressRegion: 'Dakar',
      },
      sameAs: [
        'https://www.linkedin.com/in/djibril-ndiaye-53b377411',
        'https://www.instagram.com/baobabdigitalwebsaas',
        'https://www.behance.net/djibrilndiaye3',
        'https://www.tiktok.com/@baobabdigital1',
        'https://www.facebook.com/profile.php?id=61590459927081',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Baobab Digital',
        url: BASE_URL,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Baobab Digital',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/baobab-logo.png`,
        width: 180,
        height: 80,
      },
      description: 'Agence digitale africaine spécialisée en développement web, applications mobiles, SaaS et intelligence artificielle.',
      foundingDate: '2022',
      areaServed: ['SN', 'MA', 'CI', 'ML', 'BF', 'TG', 'BJ', 'CM'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+212773591012',
        email: 'marketingdj12@gmail.com',
        contactType: 'customer service',
        availableLanguage: ['French', 'English', 'Wolof'],
      },
      sameAs: [
        'https://www.linkedin.com/in/djibril-ndiaye-53b377411',
        'https://www.instagram.com/baobabdigitalwebsaas',
        'https://www.facebook.com/profile.php?id=61590459927081',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Baobab Digital',
      description: 'Portfolio & agence digitale — Développement web, SaaS et IA pour l\'Afrique',
      publisher: { '@id': `${BASE_URL}/#organization` },
      inLanguage: 'fr-FR',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/#contact`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${BASE_URL}/#service`,
      name: 'Baobab Digital — Services',
      url: BASE_URL,
      provider: { '@id': `${BASE_URL}/#organization` },
      serviceType: [
        'Développement Web',
        'Applications Mobiles',
        'Développement SaaS',
        'Design UI/UX',
        'Intelligence Artificielle',
        'SEO & Marketing Digital',
      ],
      areaServed: 'Africa',
      priceRange: '$$',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="geo.region" content="SN" />
        <meta name="geo.placename" content="Dakar, Sénégal" />
        <meta name="geo.position" content="14.6928;-17.4467" />
        <meta name="ICBM" content="14.6928, -17.4467" />
        <meta name="language" content="French" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#F8FAFC] text-slate-900 antialiased overflow-x-hidden font-inter">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
