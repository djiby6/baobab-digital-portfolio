'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export const NAV_SECTIONS = ['hero', 'about', 'skills', 'services', 'projects', 'contact'] as const
export type NavSection = (typeof NAV_SECTIONS)[number]

const NAVBAR_HEIGHT = 80
const SCROLL_DONE_DELAY = 900

export function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState<NavSection>('hero')
  const activeSectionRef = useRef<NavSection>('hero')
  const isProgrammatic = useRef(false)
  const programmaticTimer = useRef<ReturnType<typeof setTimeout>>()

  const scrollToSection = useCallback((target: string, pushHistory = true) => {
    const id = target.replace('#', '') as NavSection
    const el = document.getElementById(id)
    if (!el) return

    isProgrammatic.current = true
    if (programmaticTimer.current) clearTimeout(programmaticTimer.current)

    // Scroll with navbar offset
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
    window.scrollTo({ top, behavior: 'smooth' })

    activeSectionRef.current = id
    setActiveSection(id)

    if (pushHistory) {
      window.history.pushState({ section: id }, '', `#${id}`)
    } else {
      window.history.replaceState({ section: id }, '', `#${id}`)
    }

    programmaticTimer.current = setTimeout(() => {
      isProgrammatic.current = false
    }, SCROLL_DONE_DELAY)
  }, [])

  useEffect(() => {
    // Initialise history with the current section
    const hash = window.location.hash.replace('#', '')
    const initial: NavSection = NAV_SECTIONS.includes(hash as NavSection)
      ? (hash as NavSection)
      : 'hero'

    activeSectionRef.current = initial
    setActiveSection(initial)
    window.history.replaceState({ section: initial }, '', `#${initial}`)

    // If a deep-link hash exists, scroll there after loader
    if (initial !== 'hero') {
      const el = document.getElementById(initial)
      if (el) {
        isProgrammatic.current = true
        setTimeout(() => {
          const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
          window.scrollTo({ top, behavior: 'smooth' })
          programmaticTimer.current = setTimeout(() => { isProgrammatic.current = false }, SCROLL_DONE_DELAY)
        }, 250)
      }
    }

    // Passive scroll → replaceState (no new history entry)
    const handleScroll = () => {
      if (isProgrammatic.current) return

      const trigger = window.scrollY + window.innerHeight * 0.4

      let current: NavSection = 'hero'
      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= trigger) current = id
      }

      if (current !== activeSectionRef.current) {
        activeSectionRef.current = current
        setActiveSection(current)
        window.history.replaceState({ section: current }, '', `#${current}`)
      }
    }

    // Back / Forward button → scroll to the restored section
    const handlePopState = (e: PopStateEvent) => {
      const section = e.state?.section as NavSection | undefined
      if (section && NAV_SECTIONS.includes(section)) {
        const el = document.getElementById(section)
        if (el) {
          isProgrammatic.current = true
          const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
          window.scrollTo({ top, behavior: 'smooth' })
          activeSectionRef.current = section
          setActiveSection(section)
          programmaticTimer.current = setTimeout(() => {
            isProgrammatic.current = false
          }, SCROLL_DONE_DELAY)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('popstate', handlePopState)
      if (programmaticTimer.current) clearTimeout(programmaticTimer.current)
    }
  }, [])

  return { activeSection, scrollToSection }
}
