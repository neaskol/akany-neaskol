import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Reveal from '@/components/Reveal'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social & Culturel',
  description: "Les actions sociales et culturelles d'Akany Neaskol : distributions solidaires, ateliers culturels et rencontres intergénérationnelles à Antananarivo.",
}

export const revalidate = 3600

const SOCIAL_ACTIONS = [
  {
    tag: 'Social · 01',
    title: 'Distributions solidaires',
    body: "Chaque mois, nous organisons des distributions de vivres et de matériel scolaire dans les quartiers défavorisés d'Antananarivo — Isotry, Anosibe, Andohatapenaka.",
    color: 'var(--flame-500)',
    image: '[photo · action solidaire · distribution]',
  },
  {
    tag: 'Social · 02',
    title: "Groupes d'écoute",
    body: "Des espaces de parole pour les jeunes en difficulté — scolaire, familiale ou personnelle. Animés par des membres formés à l'accompagnement, en toute confidentialité.",
    color: 'var(--flame-500)',
    image: '[photo · groupe d\'écoute]',
  },
]

const CULTURAL_ACTIONS = [
  {
    tag: 'Culturel · 01',
    title: 'Ateliers du samedi',
    body: "Chant, artisanat traditionnel, langue malgache, art contemporain : chaque samedi matin, un atelier différent pour explorer la culture malgache ensemble.",
    color: 'var(--forest-800)',
    image: '[photo · atelier culturel · samedi]',
  },
  {
    tag: 'Culturel · 02',
    title: 'Concerts & témoignages',
    body: "Deux à trois fois par an, une soirée de concerts, témoignages et partage ouverte à tous les jeunes d'Antananarivo — un moment de joie et de rencontre.",
    color: 'var(--forest-800)',
    image: '[photo · concert · salle paroissiale]',
  },
]

function ActionCard({ item, accent }: { item: typeof SOCIAL_ACTIONS[0]; accent: string }) {
  return (
    <div
      className="responsive-split-card"
      style={{
        gap: 40,
        alignItems: 'center',
        background: 'var(--cream-300)',
        borderRadius: 'var(--radius-lg)',
        padding: 40,
        border: '1px solid var(--line)',
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, marginBottom: 16 }}>{item.tag}</div>
        <h3 className="display h-fluid-44" style={{ color: 'var(--ink-900)', marginBottom: 20 }}>{item.title}</h3>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 19, lineHeight: 1.5, color: 'var(--ink-700)' }}>{item.body}</p>
      </div>
      <ImagePlaceholder label={item.image} style={{ borderRadius: 'var(--radius-md)', aspectRatio: '4/3' }} />
    </div>
  )
}

export default function SocialCulturelPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="hero-pad"
        style={{
          position: 'relative',
          background: 'var(--flame-500)',
          color: 'var(--paper)',
          overflow: 'hidden',
        }}
      >
        <Nav dark />
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 70% 40%, rgba(255,255,255,.1) 0%, transparent 50%)' }} />
        <div className="shell" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--flame-100)' }} />
            <span className="eyebrow on-dark">Piliers · Social & Culturel</span>
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', color: 'var(--paper)', maxWidth: 900 }}>
            Servir. <span className="it">Rencontrer.</span><br />
            <span style={{ color: 'var(--ink-900)' }}>Tisser.</span>
          </h1>
          <p style={{ marginTop: 32, fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.4, color: 'rgba(255,255,255,.85)', maxWidth: 560 }}>
            {"À Neaskol, aider les autres n'est pas de la charité descendante. C'est une rencontre, une réciprocité — et une manière de construire la ville ensemble."}
          </p>
        </div>
      </section>

      {/* Actions sociales */}
      <section style={{ background: 'var(--paper)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <Reveal>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--flame-500)' }} />
              <span className="eyebrow">Pilier Social</span>
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', color: 'var(--ink-900)', marginBottom: 56 }}>
              Venir en <span className="it">aide.</span>
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SOCIAL_ACTIONS.map((a, i) => (
              <Reveal key={a.tag} delay={i * 80}>
                <ActionCard item={a} accent="var(--flame-500)" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Actions culturelles */}
      <section style={{ background: 'var(--cream-300)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <Reveal>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--forest-800)' }} />
              <span className="eyebrow">Pilier Culturel</span>
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', color: 'var(--ink-900)', marginBottom: 56 }}>
              Tisser des <span className="it">liens.</span>
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {CULTURAL_ACTIONS.map((a, i) => (
              <Reveal key={a.tag} delay={i * 80}>
                <ActionCard item={a} accent="var(--forest-600)" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--ink-900)', color: 'var(--paper)', padding: 'var(--section-y) 0' }}>
        <div className="shell" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="display" style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}>
              Rejoins <span style={{ color: 'var(--flame-500)' }}>l&apos;action.</span>
            </h2>
            <p style={{ marginTop: 24, fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--forest-100)', maxWidth: 480, margin: '24px auto 0' }}>
              Bénévole, participant ou simplement curieux — il y a une place pour toi chez Neaskol.
            </p>
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 16 }}>
              <Link href="/contact?sujet=Rejoindre%20l%27association" className="btn btn-primary">
                Nous rejoindre
                <span className="arrow">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M2 8 L8 2 M4 2 H8 V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
