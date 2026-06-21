import { useLayoutEffect, useState } from 'react'
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

function App() {
  const reducedMotion = useReducedMotion()
  const webGLSupported = useWebGLSupport()
  const [ready, setReady] = useState(!webGLSupported)
  const { language, setLanguage, translation } = useLanguage()

  useLayoutEffect(() => {
    if (!ready) return

    document.body.classList.remove('is-loading')
    const lenis = new Lenis({
      duration: reducedMotion ? 0 : 1.15,
      smoothWheel: !reducedMotion,
      wheelMultiplier: 0.85,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: ({ progress }) => {
          scrollStore.progress = progress
          document.documentElement.style.setProperty('--page-progress', progress.toFixed(4))
        },
      })

      if (!reducedMotion) {
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

    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      context.revert()
      lenis.destroy()
      gsap.ticker.remove(tick)
      window.removeEventListener('load', refresh)
      scrollStore.progress = 0
    }
  }, [ready, reducedMotion])

  return (
    <>
      {!ready && <Loader label={translation.loader} onComplete={() => setReady(true)} />}
      <div className="experience-layer" aria-hidden="true">
        {webGLSupported ? <ExperienceCanvas reducedMotion={reducedMotion} /> : <SceneFallback />}
      </div>
      <div className="event-horizon" aria-hidden="true" />
      <Navigation language={language} onLanguageChange={setLanguage} translation={translation.nav} />
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
