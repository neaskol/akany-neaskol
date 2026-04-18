import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Reveal from '@/components/Reveal'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Spirituel',
  description: "Les activités spirituelles d'Akany Neaskol : veillées de prière, retraites et formation chrétienne pour les jeunes d'Antananarivo.",
}

export const revalidate = 3600

const ACTIVITIES = [
  {
    tag: '01',
    title: 'Veillées du jeudi',
    body: "Chaque jeudi soir à Ankadivato, nous nous réunissons pour prier ensemble, partager la Parole et témoigner. Un rendez-vous ouvert à tous, depuis 2010.",
    freq: 'Tous les jeudis · 18h30',
    image: '[photo · veillée de prière]',
  },
  {
    tag: '02',
    title: 'Retraites spirituelles',
    body: "Deux fois par an, nous organisons des retraites en dehors d'Antananarivo — un temps de ressourcement, de silence et de discernement pour les membres engagés.",
    freq: '2× / an · Week-end',
    image: '[photo · retraite en nature]',
  },
  {
    tag: '03',
    title: 'Formation chrétienne',
    body: "Des cycles de formation sur la foi catholique, l'Évangile et la doctrine sociale de l'Église. Accessibles à tous les niveaux, animés par des membres formés.",
    freq: 'Samedi matin · mensuel',
    image: '[photo · formation · groupe]',
  },
]

export default function SpirituelPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="hero-pad"
        style={{
          position: 'relative',
          background: 'var(--forest-800)',
          color: 'var(--paper)',
          overflow: 'hidden',
        }}
      >
        <Nav dark />
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 60%, rgba(238,242,76,.1) 0%, transparent 50%)' }} />
        <div className="shell" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--lemon-500)' }} />
            <span className="eyebrow on-dark">Pilier · Spirituel</span>
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 128px)', color: 'var(--paper)', maxWidth: 800 }}>
            Vivre sa <span style={{ color: 'var(--lemon-500)' }}>foi,</span><br />
            <span className="it">ensemble.</span>
          </h1>
          <p style={{ marginTop: 32, fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.4, color: 'var(--forest-100)', maxWidth: 560 }}>
            {"La foi n'est pas une affaire du dimanche. Chez Neaskol, nous la vivons au quotidien — dans la prière partagée, le discernement et l'engagement concret."}
          </p>
        </div>
      </section>

      {/* Activités */}
      <section style={{ background: 'var(--paper)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Nos activités</div>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', color: 'var(--ink-900)', marginBottom: 56 }}>
              Des espaces pour <span className="it">grandir.</span>
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {ACTIVITIES.map((a, i) => (
              <Reveal key={a.tag} delay={i * 80}>
                <div
                  className="responsive-split-card"
                  style={{
                    gap: 48,
                    alignItems: 'center',
                    background: 'var(--cream-300)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 40,
                    border: '1px solid var(--line)',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-500)', marginBottom: 16 }}>— {a.tag}</div>
                    <h3 className="display h-fluid-44" style={{ color: 'var(--ink-900)', marginBottom: 20 }}>{a.title}</h3>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: 19, lineHeight: 1.5, color: 'var(--ink-700)' }}>{a.body}</p>
                    <div style={{ marginTop: 20, fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--flame-500)' }}>
                      {a.freq}
                    </div>
                  </div>
                  <ImagePlaceholder
                    label={a.image}
                    style={{ borderRadius: 'var(--radius-md)', aspectRatio: '4/3' }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--lemon-500)', color: 'var(--ink-900)', padding: 'var(--section-y) 0' }}>
        <div className="shell" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="display" style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
              Viens <span className="it">prier</span> avec nous.
            </h2>
            <p style={{ marginTop: 24, fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--ink-700)', maxWidth: 480, margin: '24px auto 0' }}>
              {"La prochaine veillée a lieu ce jeudi soir à Ankadivato. Pas besoin de s'inscrire — tu es le bienvenu."}
            </p>
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 16 }}>
              <Link href="/contact?sujet=Participer%20%C3%A0%20une%20veill%C3%A9e" className="btn btn-dark">
                Nous contacter
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
