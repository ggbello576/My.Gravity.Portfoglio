import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { ExperienceCanvas } from './components/experience/ExperienceCanvas'
import { SceneFallback } from './components/experience/SceneFallback'
import { Footer } from './components/layout/Footer'
import { Loader } from './components/layout/Loader'
import { Navigation } from './components/layout/Navigation'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { HeroSection } from './components/sections/HeroSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useLanguage } from './hooks/useLanguage'
import { useWebGLSupport } from './hooks/useWebGLSupport'
import { scrollStore } from './lib/scrollStore'
import './styles/global.css'
import './styles/experience.css'
import './styles/sections.css'

gsap.registerPlugin(ScrollTrigger)

function getSectionScrollTop(hash: string) {
  const section = document.querySelector<HTMLElement>(hash)
  if (!section) return null

  if (hash === '#home') return 0

  const sectionTop = window.scrollY + section.getBoundingClientRect().top
  const centeredOffset = Math.max(0, (section.offsetHeight - window.innerHeight) / 2)
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight

  return Math.min(sectionTop + centeredOffset, maxScroll)
}

function App() {
  const reducedMotion = useReducedMotion()
  const webGLSupported = useWebGLSupport()
  const [ready, setReady] = useState(!webGLSupported)
  const { language, setLanguage, translation } = useLanguage()
  const lenisRef = useRef<Lenis | null>(null)

  const navigateToSection = (hash: string) => {
    const scrollTop = getSectionScrollTop(hash)
    if (scrollTop === null) return

    if (window.location.hash !== hash) window.history.pushState(null, '', hash)

    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(scrollTop, reducedMotion ? { immediate: true } : { duration: 1.15 })
    } else {
      window.scrollTo({ top: scrollTop, behavior: reducedMotion ? 'auto' : 'smooth' })
    }
  }

  useLayoutEffect(() => {
    if (!ready) return

    document.body.classList.remove('is-loading')
    const nativeTouchScroll = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const lenis = nativeTouchScroll ? null : new Lenis({
      duration: reducedMotion ? 0 : 1.15,
      smoothWheel: !reducedMotion,
      wheelMultiplier: 0.85,
    })
    lenisRef.current = lenis
    let tick: ((time: number) => void) | null = null

    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
      lenis.on('scroll', ScrollTrigger.update)
      tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    const progressElement = document.querySelector<HTMLElement>('.scroll-progress span')
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: ({ progress }) => {
          scrollStore.progress = progress
          if (progressElement) progressElement.style.transform = `scaleY(${progress.toFixed(4)})`
        },
      })

      if (!reducedMotion && !nativeTouchScroll) {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 54 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: { trigger: element, start: 'top 82%', end: 'top 48%', scrub: 0.7 },
            },
          )
        })

        gsap.fromTo(
          '.project-card',
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.12,
            scrollTrigger: { trigger: '#work', start: 'top 65%', end: 'center 50%', scrub: 0.7 },
          },
        )

        gsap.fromTo(
          '.service-row',
          { autoAlpha: 0.22, x: -24 },
          {
            autoAlpha: 1,
            x: 0,
            stagger: 0.1,
            scrollTrigger: { trigger: '#services', start: 'top 65%', end: 'bottom 75%', scrub: 0.75 },
          },
        )

        gsap.to('.hero-content', {
          autoAlpha: 0,
          y: -80,
          scrollTrigger: { trigger: '#home', start: 'top top', end: '65% top', scrub: true },
        })

        gsap.fromTo(
          '.event-horizon',
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: { trigger: '#contact', start: '-75% top', end: '-10% top', scrub: true },
          },
        )
      }
    })

    let active = true
    const scrollToCurrentHash = (immediate = false) => {
      if (!window.location.hash) return
      const scrollTop = getSectionScrollTop(window.location.hash)
      if (scrollTop === null) return
      if (lenis) {
        lenis.scrollTo(scrollTop, immediate || reducedMotion ? { immediate: true } : { duration: 1.15 })
      } else {
        window.scrollTo({ top: scrollTop, behavior: immediate || reducedMotion ? 'auto' : 'smooth' })
      }
    }
    const refresh = () => {
      if (!active) return
      ScrollTrigger.refresh()
    }
    const refreshAndCorrectHash = () => {
      if (!active) return
      refresh()
      window.requestAnimationFrame(() => scrollToCurrentHash(true))
    }
    const handleHashChange = () => scrollToCurrentHash()

    document.fonts.ready.then(refreshAndCorrectHash)
    window.addEventListener('load', refresh)
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      active = false
      context.revert()
      lenis?.destroy()
      lenisRef.current = null
      if (tick) gsap.ticker.remove(tick)
      window.removeEventListener('load', refresh)
      window.removeEventListener('hashchange', handleHashChange)
      scrollStore.progress = 0
      if (progressElement) progressElement.style.transform = 'scaleY(0)'
    }
  }, [ready, reducedMotion])

  return (
    <>
      {!ready && <Loader label={translation.loader} onComplete={() => setReady(true)} />}
      <div className="experience-layer" aria-hidden="true">
        {webGLSupported ? <ExperienceCanvas reducedMotion={reducedMotion} /> : <SceneFallback />}
      </div>
      <div className="event-horizon" aria-hidden="true" />
      <Navigation language={language} onLanguageChange={setLanguage} onNavigate={navigateToSection} translation={translation.nav} />
      <ScrollProgress />
      <main>
        <HeroSection translation={translation.hero} />
        <AboutSection translation={translation.about} />
        <ProjectsSection translation={translation.work} />
        <ServicesSection translation={translation.services} />
        <ContactSection translation={translation.contact} />
      </main>
      <Footer translation={translation.footer} />
    </>
  )
}

export default App
