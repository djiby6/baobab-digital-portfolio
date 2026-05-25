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

const BASE_URL = 'https://baobab-digital.vercel.app'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563EB',
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Baobab Digital | Djibril Ndiaye — Développeur Full Stack & Créateur SaaS',
    template: '%s | Baobab Digital',
  },
  description:
    'Djibril Ndiaye — Développeur Full Stack, Créateur SaaS et Designer UI/UX basé en Afrique. Création de sites web, applications mobiles, plateformes SaaS et solutions IA sur mesure.',
  keywords: [
    'développeur full stack',
    'développeur web Sénégal',
    'SaaS Afrique',
    'UI/UX designer',
    'Baobab Digital',
    'Djibril Ndiaye',
    'Next.js',
    'React',
    'React Native',
    'développement web Dakar',
    'application mobile Afrique',
    'création site web',
    'intelligence artificielle',
    'freelance développeur',
    'portfolio développeur',
  ],
  authors: [{ name: 'Djibril Ndiaye', url: 'mailto:marketingdj12@gmail.com' }],
  creator: 'Djibril Ndiaye',
  publisher: 'Baobab Digital',
  category: 'technology',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    siteName: 'Baobab Digital',
    title: 'Baobab Digital | Solutions Digitales Premium pour l\'Afrique',
    description:
      'Djibril Ndiaye transforme vos idées en produits digitaux premium — sites web, apps mobiles, SaaS et IA. Basé en Afrique, actif dans le monde entier.',
    images: [
      {
        url: '/images/baobab-logo.png',
        width: 1200,
        height: 630,
        alt: 'Baobab Digital — Solutions Digitales Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baobab Digital | Solutions Digitales Premium',
    description:
      'Développeur Full Stack & Créateur SaaS. Sites web, apps mobiles, IA. Basé en Afrique, actif partout.',
    creator: '@djibrilndiaye',
    images: ['/images/baobab-logo.png'],
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
  verification: {
    google: '',
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
        'Développeur Full Stack spécialisé en React, Next.js, Node.js. Créateur de produits SaaS et applications mobiles pour le marché africain et international.',
      knowsAbout: ['React', 'Next.js', 'Node.js', 'React Native', 'UI/UX Design', 'SaaS', 'Intelligence Artificielle'],
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
      logo: `${BASE_URL}/images/baobab-logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+212773591012',
        contactType: 'customer service',
        availableLanguage: ['French', 'English', 'Wolof'],
      },
      sameAs: [
        'https://wa.me/212773591012',
        'mailto:marketingdj12@gmail.com',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Baobab Digital',
      description: 'Portfolio et agence digitale — Solutions digitales premium pour l\'Afrique',
      publisher: { '@id': `${BASE_URL}/#organization` },
      inLanguage: 'fr-FR',
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
        <link rel="icon" href="/images/baobab-logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/baobab-logo.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
