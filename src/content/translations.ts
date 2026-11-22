export type Language = 'it' | 'en'

export type Project = {
  number: string
  title: string
  category: string
  description: string
  status?: string
  url?: string
  linkLabel?: string
  children?: Project[]
}

export type Translation = {
  loader: string
  nav: { about: string; work: string; services: string; contact: string; menu: string; close: string; language: string; primary: string }
  hero: { eyebrow: string; title: string; copy: string; scroll: string }
  about: { label: string; title: string; body: string }
  work: {
    label: string
    title: string
    folderOpen: string
    folderClose: string
    projects: Project[]
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
    socialLinks: { instagram: string; curriculum: string; linkedin: string; github: string; email: string }
  }
  meta: { title: string; description: string; locale: string; alternateLocale: string; imageAlt: string }
}

export const translations: Record<Language, Translation> = {
  it: {
    loader: 'INIZIALIZZAZIONE GRAVITÀ',
    nav: { about: 'Cosa faccio', work: 'Lavori', services: 'Servizi', contact: 'Contatti', menu: 'Menu', close: 'Chiudi', language: 'Seleziona lingua', primary: 'Navigazione principale' },
    hero: {
      eyebrow: 'GABRIELE GENTILE — SVILUPPATORE & DESIGNER DIGITALE',
      title: 'Le idee hanno gravità.',
      copy: 'Sviluppo siti web, applicazioni e software gestionali, trasformando esigenze concrete in soluzioni semplici e funzionali.',
      scroll: 'Scorri per entrare',
    },
    about: {
      label: '01 / Cosa faccio',
      title: 'Porto le idee\ndall’orbita\nalla realtà.',
      body: 'Sono Gabriele Gentile, studente di Informatica e sviluppatore. Realizzo web app full-stack, software gestionali su PostgreSQL e hardware embedded basato su ESP32, crescendo attraverso progetti reali.',
    },
    work: {
      label: '02 / Lavori in corso',
      title: 'In orbita.',
      folderOpen: 'APRI CARTELLA',
      folderClose: 'CHIUDI CARTELLA',
      projects: [
        {
          number: '01',
          title: 'CAPRI-ZERO',
          category: 'HARDWARE EMBEDDED / RF & CYBERSECURITY',
          description: 'Multi-tool RF portatile open-hardware basato su ESP32-S3 e CC1101 con firmware custom in C/C++.',
          url: 'https://github.com/ggbello576',
          linkLabel: 'Visita il profilo GitHub di Gabriele Gentile — si apre in una nuova scheda',
        },
        {
          number: '02',
          title: 'PIATTAFORMA GESTIONALE SALONE',
          category: 'WEB APP FULL-STACK / POSTGRESQL & NODE.JS',
          description: 'Software gestionale full-stack sviluppato da zero con PostgreSQL e Node.js per un salone a Pisa.',
          url: 'http://23.88.111.244/login?ritorno=%2F',
          linkLabel: 'Apri la piattaforma gestionale del salone — si apre in una nuova scheda',
        },
        {
          number: '03',
          title: 'SITI WEB & ESPERIENZE DIGITALI',
          category: 'WEB DESIGN / ARCHIVIO SVILUPPO (06 PROGETTI)',
          description: 'Raccolta selezionata di siti web e identità digitali progettati e sviluppati per studi e attività locali.',
          children: [
            {
              number: '03.1',
              title: 'ARVIONT STUDIO',
              category: 'CO-FONDATORE / SVILUPPATORE',
              description: 'Co-fondatore e sviluppatore di Arviont Studio, studio digitale dedicato alla creazione di identità, siti web ed esperienze digitali.',
              url: 'https://arviontstudio.com/',
              linkLabel: 'Visita il sito di Arviont Studio — si apre in una nuova scheda',
            },
            {
              number: '03.2',
              title: 'ROBERTA RABAZZI HAIR STUDIO',
              category: 'WEB DESIGN / SVILUPPO',
              description: 'Sito web e presenza digitale per uno studio di acconciatura indipendente a Piombino.',
              url: 'https://rrhairstudio.com/',
              linkLabel: 'Visita il sito di Roberta Rabazzi Hair Studio — si apre in una nuova scheda',
            },
            {
              number: '03.3',
              title: 'SALVOSHOOTS',
              category: 'FOTOGRAFIA / PORTFOLIO',
              description: 'Portfolio fotografico editoriale per Salvatore Maniaci, incentrato sulla sequenza delle immagini e sulla narrazione visiva.',
              url: 'https://salvoshoots.com/',
              linkLabel: 'Visita il portfolio fotografico SalvoShoots — si apre in una nuova scheda',
            },
            {
              number: '03.4',
              title: 'LA ROCCHETTA',
              category: 'OSPITALITÀ / ESPERIENZA WEB',
              description: 'Esperienza digitale per un ristorante di Piombino affacciato su Piazza Bovio e sul litorale tirrenico.',
              url: 'https://larocchettaristorante.com/',
              linkLabel: 'Visita il sito de La Rocchetta — si apre in una nuova scheda',
            },
            {
              number: '03.5',
              title: 'ANTELIA TATTOO',
              category: 'STUDIO DI TATUAGGI / PORTFOLIO',
              description: 'Sito web e portfolio editoriale per uno studio di tatuaggi a Piombino, costruito attorno al lavoro e all’identità di Antelia.',
              url: 'https://anteliatattoo.com/',
              linkLabel: 'Visita il sito di Antelia Tattoo — si apre in una nuova scheda',
            },
            {
              number: '03.6',
              title: 'DANIELA PIGHETTI',
              category: 'DESIGN FLOREALE / ESPERIENZA WEB',
              description: 'Esperienza digitale dedicata al design floreale, ai matrimoni e alle atmosfere curate per gli eventi.',
              status: 'IN SVILUPPO',
            },
          ],
        },
      ],
    },
    services: {
      label: '03 / Competenze',
      title: 'Idee che\ndiventano\ncodice.',
      items: ['Applicazioni web full-stack', 'Software gestionali & SaaS', 'Sistemi backend & database', 'Hardware embedded & sistemi RF'],
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
      model: 'Modello “Buco nero”',
      by: 'di',
      via: 'tramite Sketchfab, utilizzato secondo la relativa',
      license: 'licenza Creative Commons con attribuzione',
      socialLabel: 'Social e contatti',
      instagramLabel: 'Profilo Instagram ufficiale di Gabriele Gentile — si apre in una nuova scheda',
      curriculumLabel: 'Apri il curriculum di Gabriele Gentile in una nuova scheda',
      linkedinLabel: 'Profilo LinkedIn ufficiale di Gabriele Gentile — si apre in una nuova scheda',
      githubLabel: 'Profilo GitHub ufficiale di Gabriele Gentile — si apre in una nuova scheda',
      emailLabel: 'Invia un’email a Gabriele Gentile',
      socialLinks: { instagram: 'Instagram', curriculum: 'CURRICULUM', linkedin: 'LinkedIn', github: 'GitHub', email: 'Email' },
    },
    meta: {
      title: 'Gabriele Gentile — Sviluppatore & Designer Digitale',
      description: 'Portfolio ufficiale di Gabriele Gentile, sviluppatore e designer digitale. Siti web, applicazioni, software e progetti digitali selezionati.',
      locale: 'it_IT',
      alternateLocale: 'en_US',
      imageAlt: 'Logo Gabriele Gentile Sviluppatore su sfondo nero',
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
      body: "I'm Gabriele Gentile, a Computer Science student and developer. I build full-stack web apps, PostgreSQL management software, and ESP32-based embedded hardware, growing through real-world engineering projects.",
    },
    work: {
      label: '02 / Work in progress',
      title: 'In orbit.',
      folderOpen: 'OPEN FOLDER',
      folderClose: 'CLOSE FOLDER',
      projects: [
        {
          number: '01',
          title: 'CAPRI-ZERO',
          category: 'EMBEDDED HARDWARE / RF & CYBERSECURITY',
          description: 'Open-hardware portable RF multi-tool built on ESP32-S3 and CC1101 with custom C/C++ firmware.',
          url: 'https://github.com/ggbello576',
          linkLabel: 'Visit Gabriele Gentile’s GitHub profile — opens in a new tab',
        },
        {
          number: '02',
          title: 'SALON MANAGEMENT PLATFORM',
          category: 'FULL-STACK WEB APP / POSTGRESQL & NODE.JS',
          description: 'Custom full-stack management software built from scratch with PostgreSQL and Node.js for a Pisa salon.',
          url: 'http://23.88.111.244/login?ritorno=%2F',
          linkLabel: 'Open the Salon Management Platform — opens in a new tab',
        },
        {
          number: '03',
          title: 'CLIENT WEBSITES & DIGITAL EXPERIENCES',
          category: 'WEB DESIGN / DEVELOPMENT ARCHIVE (06 PROJECTS)',
          description: 'Curated archive of custom websites and digital identities designed and built for studios and local businesses.',
          children: [
            {
              number: '03.1',
              title: 'ARVIONT STUDIO',
              category: 'CO-FOUNDER / DEVELOPER',
              description: 'Co-founder and developer at Arviont Studio, a digital studio focused on creating identities, websites and digital experiences.',
              url: 'https://arviontstudio.com/',
              linkLabel: 'Visit the Arviont Studio website — opens in a new tab',
            },
            {
              number: '03.2',
              title: 'ROBERTA RABAZZI HAIR STUDIO',
              category: 'WEB DESIGN / DEVELOPMENT',
              description: 'Website and digital presence for an independent hair studio in Piombino.',
              url: 'https://rrhairstudio.com/',
              linkLabel: 'Visit the Roberta Rabazzi Hair Studio website — opens in a new tab',
            },
            {
              number: '03.3',
              title: 'SALVOSHOOTS',
              category: 'PHOTOGRAPHY / PORTFOLIO',
              description: 'Editorial photography portfolio for Salvatore Maniaci, focused on image sequencing and visual storytelling.',
              url: 'https://salvoshoots.com/',
              linkLabel: 'Visit the SalvoShoots photography portfolio — opens in a new tab',
            },
            {
              number: '03.4',
              title: 'LA ROCCHETTA',
              category: 'HOSPITALITY / WEB EXPERIENCE',
              description: 'Digital experience for a restaurant in Piombino overlooking Piazza Bovio and the Tyrrhenian coast.',
              url: 'https://larocchettaristorante.com/',
              linkLabel: 'Visit the La Rocchetta website — opens in a new tab',
            },
            {
              number: '03.5',
              title: 'ANTELIA TATTOO',
              category: 'TATTOO STUDIO / PORTFOLIO',
              description: 'Website and editorial portfolio for a tattoo studio in Piombino, built around Antelia’s work and identity.',
              url: 'https://anteliatattoo.com/',
              linkLabel: 'Visit the Antelia Tattoo website — opens in a new tab',
            },
            {
              number: '03.6',
              title: 'DANIELA PIGHETTI',
              category: 'FLORAL DESIGN / WEB EXPERIENCE',
              description: 'Digital experience focused on floral design, weddings and curated event atmospheres.',
              status: 'IN DEVELOPMENT',
            },
          ],
        },
      ],
    },
    services: {
      label: '03 / Capabilities',
      title: 'Ideas that\nbecome\ncode.',
      items: ['FULL-STACK WEB APPLICATIONS', 'MANAGEMENT SOFTWARE & SAAS', 'BACKEND SYSTEMS & DATABASES', 'EMBEDDED HARDWARE & RF SYSTEMS'],
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
      socialLinks: { instagram: 'Instagram', curriculum: 'CURRICULUM', linkedin: 'LinkedIn', github: 'GitHub', email: 'Email' },
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
