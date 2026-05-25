'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Loader      = dynamic(() => import('@/components/Loader'),      { ssr: false })
const Navbar      = dynamic(() => import('@/components/Navbar'),      { ssr: false })
const Hero        = dynamic(() => import('@/components/Hero'),        { ssr: false })
const About       = dynamic(() => import('@/components/About'),       { ssr: false })
const Skills      = dynamic(() => import('@/components/Skills'),      { ssr: false })
const Services    = dynamic(() => import('@/components/Services'),    { ssr: false })
const Projects    = dynamic(() => import('@/components/Projects'),    { ssr: false })
const Testimonials= dynamic(() => import('@/components/Testimonials'),{ ssr: false })
const Contact     = dynamic(() => import('@/components/Contact'),     { ssr: false })
const Footer      = dynamic(() => import('@/components/Footer'),      { ssr: false })
const ScrollToTop    = dynamic(() => import('@/components/ScrollToTop'),    { ssr: false })
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false })
const WhyMe          = dynamic(() => import('@/components/WhyMe'),          { ssr: false })

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-[#F8FAFC] flex items-center justify-center">
        <div style={{
          background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2rem',
          fontWeight: 900,
          letterSpacing: '0.3em',
        }}>
          BAOBAB
        </div>
      </div>
    )
  }

  if (loading) {
    return <Loader />
  }

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <WhyMe />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </main>
  )
}
