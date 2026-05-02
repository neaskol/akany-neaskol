'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

export default function HeroAnimation() {
  useGSAP(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const eyebrow = hero.querySelector<HTMLElement>('.eyebrow')
    const h1 = hero.querySelector<HTMLElement>('h1')
    const pillars = hero.querySelectorAll<HTMLElement>('.hero-pillars > *')
    const portrait = hero.querySelector<HTMLElement>('.hero-portrait-col')
    const card = hero.querySelector<HTMLElement>('.hero-float-card')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(eyebrow, { autoAlpha: 0, y: 10, duration: 0.55 }, 0.15)
    tl.from(h1, { autoAlpha: 0, y: 56, duration: 0.95 }, 0.3)
    tl.from([...pillars], { autoAlpha: 0, x: -14, stagger: 0.1, duration: 0.5 }, 0.75)
    tl.from(portrait, { autoAlpha: 0, x: 44, duration: 1.1 }, 0.25)
    tl.from(card, { autoAlpha: 0, y: 32, duration: 0.85, ease: 'back.out(1.3)' }, 0.7)
  })

  return null
}
