import type { Metadata } from 'next'
import { Suspense } from 'react'
import Nav from '@/components/Nav'
import Reveal from '@/components/Reveal'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Contacter Akany Neaskol — association chrétienne à Ankadivato, Antananarivo. Écrire un message, rejoindre l'association ou en savoir plus.",
}

export default function ContactPage() {
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
        <div className="shell" style={{ position: 'relative' }}>
          <div className="eyebrow on-dark" style={{ marginBottom: 24 }}>Contact</div>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', color: 'var(--paper)' }}>
            Parlons-<span className="it">nous.</span>
          </h1>
          <p style={{ marginTop: 24, fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1.4, color: 'var(--forest-100)', maxWidth: 520 }}>
            {"Une question, un projet, ou simplement l'envie de rejoindre Neaskol — nous lisons chaque message et répondons sous 48h."}
          </p>
        </div>
      </section>

      {/* Formulaire + infos */}
      <section style={{ background: 'var(--paper)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <div className="responsive-2col" style={{ gap: 72, alignItems: 'start' }}>
            {/* Formulaire */}
            <Reveal>
              <Suspense>
                <ContactForm />
              </Suspense>
            </Reveal>

            {/* Infos contact */}
            <Reveal delay={120}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 16 }}>Notre adresse</div>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.4, color: 'var(--ink-900)' }}>
                    Ankadivato<br />
                    <span style={{ fontStyle: 'italic' }}>Antananarivo, Madagascar</span>
                  </p>
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 16 }}>Veillées</div>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1.5, color: 'var(--ink-700)' }}>
                    Chaque <strong>jeudi soir à 18h30</strong><br />
                    à Ankadivato — entrée libre.
                  </p>
                </div>

                {/* Carte OpenStreetMap */}
                <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--line)' }}>
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=47.52%2C-18.92%2C47.54%2C-18.90&layer=mapnik&marker=-18.91%2C47.53"
                    width="100%"
                    height="300"
                    style={{ display: 'block', border: 0 }}
                    title="Carte Ankadivato, Antananarivo"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
