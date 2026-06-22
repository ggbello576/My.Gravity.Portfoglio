export type Language = 'it' | 'en'

export type Translation = {
  loader: string
  nav: { about: string; work: string; services: string; contact: string; menu: string; close: string; language: string }
  hero: { eyebrow: string; title: string; copy: string; scroll: string }
  about: { label: string; title: string; body: string }
  work: {
    label: string
    title: string
    danielaSubtitle: string
    danielaDescription: string
    confidentialOne: string
    confidentialTwo: string
    status: string
  }
  services: { label: string; title: string; items: string[] }
  contact: { label: string; title: string; copy: string; button: string }
  footer: { copyright: string; credits: string; model: string; by: string; via: string; license: string; socialLabel: string }
  meta: { title: string; description: string }
}

export const translations: Record<Language, Translation> = {
  it: {
    loader: 'INIZIALIZZAZIONE GRAVITÀ',
    nav: { about: 'Chi sono', work: 'Lavori', services: 'Servizi', contact: 'Contatti', menu: 'Menu', close: 'Chiudi', language: 'Seleziona lingua' },
    hero: {
      eyebrow: 'GABRIELE GENTILE / DIGITAL EXPERIENCE',
      title: 'Le idee hanno gravità.',
      copy: 'Creo identità ed esperienze digitali capaci di attirare attenzione, raccontare valore e lasciare un segno.',
      scroll: 'Scorri per entrare',
    },
    about: {
      label: '01 / Chi sono',
      title: 'Creo esperienze digitali che attirano le persone.',
      body: 'Unisco direzione creativa, identità visiva e interazione per trasformare un’idea in un’esperienza digitale riconoscibile, coinvolgente e coerente.',
    },
    work: {
      label: '02 / Lavori in corso',
      title: 'In orbita.',
      danielaSubtitle: 'Brand identity / Web experience',
      danielaDescription: 'Un’identità digitale delicata e contemporanea, progettata per valorizzare composizioni floreali, atmosfera e cura artigianale.',
      confidentialOne: 'Progetto riservato 01',
      confidentialTwo: 'Progetto riservato 02',
      status: 'In sviluppo',
    },
    services: {
      label: '03 / Competenze',
      title: 'Ciò che porto a fuoco.',
      items: ['Direzione creativa', 'Esperienze web', 'Identità di brand', 'Prodotti digitali'],
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
    },
    meta: {
      title: 'Gabriele Gentile — Developer & Digital Designer',
      description: 'Portfolio ufficiale di Gabriele Gentile, developer e digital designer. Progetti web, esperienze digitali, lavori selezionati e contatti.',
    },
  },
  en: {
    loader: 'INITIALIZING GRAVITY',
    nav: { about: 'About', work: 'Work', services: 'Services', contact: 'Contact', menu: 'Menu', close: 'Close', language: 'Select language' },
    hero: {
      eyebrow: 'GABRIELE GENTILE / DIGITAL EXPERIENCE',
      title: 'Ideas have gravity.',
      copy: 'I create digital identities and experiences designed to attract attention, communicate value and leave a lasting impression.',
      scroll: 'Scroll to enter',
    },
    about: {
      label: '01 / About',
      title: 'I create digital experiences that pull people in.',
      body: 'I combine creative direction, visual identity and interaction to transform an idea into a distinctive, engaging and coherent digital experience.',
    },
    work: {
      label: '02 / Work in progress',
      title: 'In orbit.',
      danielaSubtitle: 'Brand identity / Web experience',
      danielaDescription: 'A delicate and contemporary digital identity designed to highlight floral compositions, atmosphere and handcrafted care.',
      confidentialOne: 'Confidential project 01',
      confidentialTwo: 'Confidential project 02',
      status: 'In development',
    },
    services: {
      label: '03 / Capabilities',
      title: 'What I bring into focus.',
      items: ['Creative Direction', 'Web Experience', 'Brand Identity', 'Digital Products'],
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
    },
    meta: {
      title: 'Gabriele Gentile — Developer & Digital Designer',
      description: 'Portfolio ufficiale di Gabriele Gentile, developer e digital designer. Progetti web, esperienze digitali, lavori selezionati e contatti.',
    },
  },
}
