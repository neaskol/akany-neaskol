import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Reveal from '@/components/Reveal'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import { PILLAR_LABELS } from '@/lib/pillarColors'
import { SEED_TESTIMONIALS, SEED_EVENTS } from '@/lib/seed'
import { getPayloadClient, withTimeout } from '@/lib/payload'

interface PayloadTestimonial {
  slug: string
  name: string
  age?: number | null
  role?: string | null
  place?: string | null
  pillar: string
  quote: string
  portrait?: unknown
}

interface PayloadEvent {
  id: string
  title: string
  date: string
  pillar: string
  place?: string | null
}

export const metadata: Metadata = {
  title: 'Akany Neaskol — Vivre sa foi, bâtir ensemble la société',
}

// Revalider toutes les heures (les événements / témoignages changent peu)
export const revalidate = 3600

async function getTestimonials(): Promise<PayloadTestimonial[]> {
  try {
    const payload = await getPayloadClient()
    const result = await withTimeout(
      payload.find({
        collection: 'testimonials',
        where: { _status: { equals: 'published' } },
        limit: 4,
      }),
      5000,
      'payload:find-home-testimonials',
    )
    if (result.docs.length > 0) {
      return result.docs.map((d) => ({
        slug: d.slug as string,
        name: d.name as string,
        age: (d.age as number | null) ?? null,
        role: (d.role as string | null) ?? null,
        place: (d.place as string | null) ?? null,
        pillar: d.pillar as string,
        quote: d.quote as string,
        portrait: d.portrait ?? null,
      }))
    }
  } catch (err) {
    console.error('[payload:testimonials]', err)
  }
  return SEED_TESTIMONIALS
}

async function getEvents(): Promise<PayloadEvent[]> {
  try {
    const payload = await getPayloadClient()
    const result = await withTimeout(
      payload.find({
        collection: 'events',
        sort: 'date',
        limit: 3,
      }),
      5000,
      'payload:find-home-events',
    )
    if (result.docs.length > 0) return result.docs as unknown as PayloadEvent[]
  } catch (err) {
    console.error('[payload:events]', err)
  }
  return SEED_EVENTS
}

const MARQUEE_WORDS = ['Prier', 'Rassembler', 'Servir', 'Écouter', 'Éduquer']

const PILLARS = [
  { n: '01', key: 'spirituel', label: 'Spirituel', body: 'Vivre et approfondir la foi chrétienne, ensemble.', color: 'var(--lemon-500)' },
  { n: '02', key: 'social', label: 'Social', body: 'Venir en aide aux plus démunis, défendre les droits.', color: 'var(--flame-500)' },
  { n: '03', key: 'culturel', label: 'Culturel', body: 'Tisser des liens entre quartiers et générations.', color: 'var(--forest-800)' },
]

function formatEventDate(dateStr: string) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
  } catch {
    return dateStr
  }
}

export default async function HomePage() {
  const [testimonials, events] = await Promise.all([getTestimonials(), getEvents()])
  const yearsActive = new Date().getFullYear() - 2010

  return (
    <>
      {/* ── 01 Hero ─────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          background: 'var(--forest-800)',
          color: 'var(--paper)',
          minHeight: 780,
          padding: '120px 0 40px',
          overflow: 'hidden',
        }}
      >
        <Nav dark />

        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(ellipse at 70% 45%, rgba(238,242,76,.08) 0%, transparent 45%),
              radial-gradient(ellipse at 20% 80%, rgba(244,106,45,.06) 0%, transparent 50%)
            `,
          }}
        />

        <div className="shell" style={{ position: 'relative' }}>
          <div
            className="responsive-hero-grid"
            style={{
              gap: 56,
              alignItems: 'end',
              minHeight: 560,
            }}
          >
            {/* Gauche : headline */}
            <div>
              <div className="eyebrow on-dark" style={{ marginBottom: 28 }}>
                Antananarivo · Fondée 2010 · Officialisée 2026
              </div>
              <h1
                className="display"
                style={{ fontSize: 'clamp(64px, 9vw, 148px)', color: 'var(--paper)' }}
              >
                Vivre sa foi,
                <br />
                <span style={{ color: 'var(--lemon-500)' }}>bâtir</span>{' '}
                <span className="it" style={{ color: 'var(--lemon-500)' }}>ensemble</span>
                <br />
                la <span className="it">société.</span>
              </h1>

              <div style={{ display: 'flex', gap: 40, marginTop: 44, flexWrap: 'wrap' }}>
                {PILLARS.map((p) => (
                  <div key={p.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: p.color,
                        display: 'inline-block',
                      }}
                    />
                    <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22 }}>
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Droite : portrait + carte */}
            <div style={{ position: 'relative', alignSelf: 'stretch' }}>
              <ImagePlaceholder
                label="[portrait · membre · 900×1200]"
                variant="dark"
                grain
                style={{
                  position: 'absolute',
                  right: 0,
                  top: -40,
                  bottom: 0,
                  width: '100%',
                  borderRadius: 'var(--radius-lg)',
                  aspectRatio: '3/4',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: -60,
                  bottom: 24,
                  maxWidth: 320,
                  background: 'var(--cream-500)',
                  color: 'var(--ink-900)',
                  borderRadius: 'var(--radius-md)',
                  padding: 22,
                  boxShadow: '0 20px 40px rgba(0,0,0,.25)',
                }}
              >
                <div className="eyebrow" style={{ marginBottom: 12 }}>À propos</div>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                  {"Akany Neaskol "}
                  <span style={{ fontStyle: 'italic' }}>rassemble</span>
                  {" les jeunes chrétiens d'Antananarivo — pour grandir dans la foi et s'engager pleinement dans la société."}
                </p>
                <Link href="/association" className="btn btn-dark" style={{ marginTop: 18 }}>
                  En savoir plus
                  <span className="arrow">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <path d="M2 8 L8 2 M4 2 H8 V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* TODO: ajouter la section partenaires une fois les vrais noms disponibles */}
      </section>

      {/* ── 02 Marquee ──────────────────────────────── */}
      <section
        style={{
          background: 'var(--lemon-500)',
          color: 'var(--ink-900)',
          padding: '22px 0',
          overflow: 'hidden',
          borderTop: '1px solid var(--ink-900)',
          borderBottom: '1px solid var(--ink-900)',
        }}
      >
        <div className="ticker-track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="display" style={{ fontSize: 72, whiteSpace: 'nowrap', padding: '0 24px' }}>
              {w} <span className="it" style={{ marginLeft: 8 }}>—</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── 03 Témoignages ──────────────────────────── */}
      <section style={{ background: 'var(--cream-300)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <div className="responsive-2col" style={{ gap: 60, alignItems: 'end', marginBottom: 48 }}>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 20 }}>Témoignages · Qui sommes-nous</div>
              <h2 className="display" style={{ fontSize: 'clamp(56px, 7vw, 112px)', color: 'var(--ink-900)' }}>
                La voix <span className="it">des</span>
                <br />
                <span className="it">jeunes</span>, au cœur.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.35, color: 'var(--ink-700)', maxWidth: 460 }}>
                Née à Ankadivato en 2010, Akany Neaskol réunit des jeunes chrétiens qui veulent
                grandir dans la foi et prendre leurs responsabilités dans la société.{' '}
                <span style={{ fontStyle: 'italic' }}>Voici leurs mots.</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <TestimonialsCarousel testimonials={testimonials} />
          </Reveal>

          {/* Piliers */}
          <Reveal delay={280}>
            <div
              className="responsive-3col"
              style={{
                marginTop: 72,
                borderTop: '1px solid var(--line)',
                borderBottom: '1px solid var(--line)',
              }}
            >
              {PILLARS.map((p, i) => (
                <div
                  key={p.key}
                  style={{
                    padding: '32px 28px',
                    borderLeft: i > 0 ? '1px solid var(--line)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 14, height: 14, borderRadius: '50%', background: p.color }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-500)' }}>
                      — {p.n}
                    </span>
                  </div>
                  <h3 className="display" style={{ fontSize: 44, color: 'var(--ink-900)' }}>{p.label}</h3>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--ink-700)', lineHeight: 1.35, maxWidth: 320 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 Mission ──────────────────────────────── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <div className="responsive-2col" style={{ gap: 24 }}>
            <Reveal>
              <div
                style={{
                  background: 'var(--cream-300)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 36,
                  height: '100%',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div className="eyebrow" style={{ marginBottom: 16 }}>Notre mission · Depuis 2010</div>
                <h3 className="display" style={{ fontSize: 52, color: 'var(--ink-900)' }}>
                  Tisser des<br />
                  <span className="it">liens</span> vivants
                </h3>
                <p style={{ marginTop: 20, color: 'var(--ink-500)', fontSize: 14, lineHeight: 1.6, maxWidth: 360 }}>
                  {"Akany Neaskol réunit les citoyens autour d'activités variées — entre générations, entre quartiers — tout en venant en aide aux plus démunis et en défendant les droits des groupes fragilisés."}
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                  <Link href="/contact?sujet=Rejoindre%20l%27association" className="btn btn-flame">
                    Nous rejoindre
                    <span className="arrow">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                        <path d="M5 2 V8 M2 5 L5 8 L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </Link>
                  <Link href="/association" className="btn btn-ghost" style={{ color: 'var(--ink-900)', borderColor: 'var(--ink-900)' }}>
                    Nos actions
                  </Link>
                </div>
                <div
                  style={{
                    marginTop: 44,
                    padding: '20px 22px',
                    background: 'var(--paper)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    border: '1px solid var(--line)',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    {['var(--forest-700)', 'var(--flame-500)', 'var(--cream-500)', 'var(--lemon-500)'].map((c, i) => (
                      <div
                        key={i}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: c,
                          border: '2px solid var(--paper)',
                          marginLeft: i === 0 ? 0 : -12,
                        }}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="display" style={{ fontSize: 36, lineHeight: 1 }}>
                      {yearsActive}<span style={{ color: 'var(--flame-500)' }}>+</span>
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-500)', marginTop: 4 }}>
                      années à Ankadivato
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="grain"
                style={{
                  position: 'relative',
                  background: 'var(--flame-500)',
                  color: 'var(--paper)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 40,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  minHeight: 520,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', opacity: 0.8 }}>
                      Antananarivo · 2026
                    </div>
                    <div className="display" style={{ fontSize: 96, marginTop: 6 }}>+</div>
                  </div>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: 'var(--ink-900)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--lemon-500)',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                      <path d="M4 14 L14 4 M6 4 H14 V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Magazine cover */}
                <div
                  style={{
                    alignSelf: 'center',
                    width: '62%',
                    aspectRatio: '3/4',
                    background: 'var(--cream-300)',
                    borderRadius: 6,
                    boxShadow: '0 30px 60px rgba(0,0,0,.3), -2px 0 0 rgba(0,0,0,.15)',
                    padding: 20,
                    color: 'var(--ink-900)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,.04) 0 1px, transparent 1px 8px)',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em' }}>AKANY · NEASKOL</div>
                    <div className="display" style={{ fontSize: 40, marginTop: 14, lineHeight: 0.95 }}>
                      Foi &<br /><span className="it">fraternité</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, opacity: 0.6 }}>[photo · rassemblement]</div>
                </div>

                <div className="display" style={{ fontSize: 34, marginTop: 'auto' }}>
                  Spirituel · <span className="it">Social · Culturel</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 05 Agenda ───────────────────────────────── */}
      <section style={{ background: 'var(--paper)', padding: '20px 0 var(--section-y)' }}>
        <div className="shell">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 48,
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Agenda</div>
              <h2 className="display" style={{ fontSize: 'clamp(52px, 6.5vw, 96px)', color: 'var(--ink-900)' }}>
                Prochains <span className="it">rendez-vous</span>
              </h2>
            </div>
          </div>

          <div className="responsive-3col" style={{ gap: 20 }}>
            {events.map((e: PayloadEvent, i: number) => {
              const dark = i === 1
              return (
                <Reveal key={e.id} delay={i * 80}>
                  <article
                    style={{
                      background: dark ? 'var(--forest-800)' : 'var(--cream-300)',
                      color: dark ? 'var(--paper)' : 'var(--ink-900)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 24,
                      border: '1px solid var(--line)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 20,
                      height: '100%',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: 10,
                          textTransform: 'uppercase',
                          letterSpacing: '0.18em',
                          padding: '6px 10px',
                          borderRadius: 999,
                          background: dark ? 'rgba(255,255,255,.1)' : 'var(--paper)',
                          border: '1px solid ' + (dark ? 'rgba(255,255,255,.15)' : 'var(--line)'),
                        }}
                      >
                        {PILLAR_LABELS[e.pillar] ?? e.pillar}
                      </span>
                      <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, opacity: 0.8 }}>
                        {formatEventDate(e.date)}
                      </span>
                    </div>

                    <ImagePlaceholder
                      label={`[photo · événement ${i + 1}]`}
                      variant={dark ? 'dark' : 'default'}
                      style={{ borderRadius: 'var(--radius-md)', aspectRatio: '4/3' }}
                    />

                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                      {e.title}
                    </h3>
                    <div style={{ fontSize: 13, opacity: 0.7, marginTop: 'auto' }}>{e.place}</div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
