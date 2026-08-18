export type Language = 'it' | 'en'

export type Translation = {
  loader: string
  nav: { about: string; work: string; services: string; contact: string; menu: string; close: string; language: string; primary: string }
  hero: { eyebrow: string; title: string; copy: string; scroll: string }
  about: { label: string; title: string; body: string }
  work: {
    label: string
    title: string
    arviontSubtitle: string
    arviontDescription: string
    arviontLinkLabel: string
    weClubsSubtitle: string
    weClubsDescription: string
    confidentialTwo: string
    status: string
  }
  services: { label: string; title: string; items: string[] }
  contact: { label: string; title: string; copy: string; button: string }
  footer: {
    copyright: string
    credits: string
    model: string
    by: string
    via: string
    license: string
    socialLabel: string
    instagramLabel: string
    curriculumLabel: string
    linkedinLabel: string
    githubLabel: string
    emailLabel: string
  }
  meta: { title: string; description: string; locale: string; alternateLocale: string; imageAlt: string }
}

export const translations: Record<Language, Translation> = {
  it: {
    loader: 'INIZIALIZZAZIONE GRAVITÀ',
    nav: { about: 'Cosa faccio', work: 'Lavori', services: 'Servizi', contact: 'Contatti', menu: 'Menu', close: 'Chiudi', language: 'Seleziona lingua', primary: 'Navigazione principale' },
    hero: {
      eyebrow: 'GABRIELE GENTILE — DEVELOPER & DIGITAL DESIGNER',
      title: 'Le idee hanno gravità.',
      copy: 'Sviluppo siti web, applicazioni e software gestionali, trasformando esigenze concrete in soluzioni semplici e funzionali.',
      scroll: 'Scorri per entrare',
    },
    about: {
      label: '01 / Cosa faccio',
      title: 'Porto le idee\ndall’orbita\nalla realtà.',
      body: 'Sono Gabriele Gentile, developer e digital designer. Studio informatica e trasformo esigenze concrete in siti web, applicazioni, software gestionali ed esperienze digitali semplici e funzionali, continuando a crescere attraverso progetti reali.',
    },
    work: {
      label: '02 / Lavori in corso',
      title: 'In orbita.',
      arviontSubtitle: 'Co-founder / Developer',
      arviontDescription: 'Co-founder e developer di Arviont Studio, uno studio digitale dedicato alla creazione di identità, siti web ed esperienze digitali.',
      arviontLinkLabel: 'Visita il sito di Arviont Studio',
      weClubsSubtitle: 'Social app / Nightlife experience',
      weClubsDescription: 'Un’applicazione dedicata a locali, eventi e vita sociale, progettata per connettere persone, serate e luoghi in un’unica esperienza digitale.',
      confidentialTwo: 'Progetto riservato 02',
      status: 'In sviluppo',
    },
    services: {
      label: '03 / Competenze',
      title: 'Idee che\ndiventano\ncodice.',
      items: ['Siti e applicazioni web', 'Software gestionali', 'Backend e database', 'Soluzioni su misura'],
    },
    contact: {
      label: '04 / Contatti',
      title: 'Creiamo qualcosa con gravità.',
      copy: 'Hai un progetto in mente o vuoi semplicemente iniziare una conversazione?',
      button: 'Parliamone',
    },
    footer: {
      copyright: 'Gabriele Gentile',
      credits: 'Crediti 3D',
      model: 'Modello “Blackhole”',
      by: 'di',
      via: 'tramite Sketchfab, utilizzato secondo la relativa',
      license: 'licenza Creative Commons con attribuzione',
      socialLabel: 'Social e contatti',
      instagramLabel: 'Profilo Instagram ufficiale di Gabriele Gentile — si apre in una nuova scheda',
      curriculumLabel: 'Apri il curriculum di Gabriele Gentile in una nuova scheda',
      linkedinLabel: 'Profilo LinkedIn ufficiale di Gabriele Gentile — si apre in una nuova scheda',
      githubLabel: 'Profilo GitHub ufficiale di Gabriele Gentile — si apre in una nuova scheda',
      emailLabel: 'Invia un’email a Gabriele Gentile',
    },
    meta: {
      title: 'Gabriele Gentile — Developer & Digital Designer',
      description: 'Portfolio ufficiale di Gabriele Gentile, developer e digital designer. Siti web, applicazioni, software e progetti digitali selezionati.',
      locale: 'it_IT',
      alternateLocale: 'en_US',
      imageAlt: 'Logo Gabriele Gentile Developer su sfondo nero',
    },
  },
  en: {
    loader: 'INITIALIZING GRAVITY',
    nav: { about: 'What I do', work: 'Work', services: 'Services', contact: 'Contact', menu: 'Menu', close: 'Close', language: 'Select language', primary: 'Primary navigation' },
    hero: {
      eyebrow: 'GABRIELE GENTILE — DEVELOPER & DIGITAL DESIGNER',
      title: 'Ideas have gravity.',
      copy: 'I develop websites, applications and management software, turning real needs into simple, functional solutions.',
      scroll: 'Scroll to enter',
    },
    about: {
      label: '01 / What I do',
      title: 'I bring ideas\nfrom orbit\ninto reality.',
      body: 'I’m Gabriele Gentile, a developer and digital designer. I study computer science and turn real needs into websites, applications, management software and clear, functional digital experiences while continuing to grow through real projects.',
    },
    work: {
      label: '02 / Work in progress',
      title: 'In orbit.',
      arviontSubtitle: 'Co-founder / Developer',
      arviontDescription: 'Co-founder and developer at Arviont Studio, a digital studio focused on creating identities, websites and digital experiences.',
      arviontLinkLabel: 'Visit the Arviont Studio website',
      weClubsSubtitle: 'Social app / Nightlife experience',
      weClubsDescription: 'An application dedicated to venues, events and social life, designed to connect people, nights and places in one digital experience.',
      confidentialTwo: 'Confidential project 02',
      status: 'In development',
    },
    services: {
      label: '03 / Capabilities',
      title: 'Ideas that\nbecome\ncode.',
      items: ['Websites and web applications', 'Management software', 'Backend and databases', 'Tailored solutions'],
    },
    contact: {
      label: '04 / Contact',
      title: 'Let’s create something with gravity.',
      copy: 'Have a project in mind, or simply want to start a conversation?',
      button: 'Let’s talk',
    },
    footer: {
      copyright: 'Gabriele Gentile',
      credits: '3D Credits',
      model: '“Blackhole” model',
      by: 'by',
      via: 'via Sketchfab, used under its applicable',
      license: 'Creative Commons attribution license',
      socialLabel: 'Social and contact links',
      instagramLabel: 'Gabriele Gentile’s official Instagram profile — opens in a new tab',
      curriculumLabel: 'Open Gabriele Gentile’s résumé in a new tab',
      linkedinLabel: 'Gabriele Gentile’s official LinkedIn profile — opens in a new tab',
      githubLabel: 'Gabriele Gentile’s official GitHub profile — opens in a new tab',
      emailLabel: 'Send an email to Gabriele Gentile',
    },
    meta: {
      title: 'Gabriele Gentile — Developer & Digital Designer',
      description: 'Official portfolio of Gabriele Gentile, developer and digital designer. Websites, applications, software and selected digital projects.',
      locale: 'en_US',
      alternateLocale: 'it_IT',
      imageAlt: 'Gabriele Gentile Developer logo on a black background',
    },
  },
}
