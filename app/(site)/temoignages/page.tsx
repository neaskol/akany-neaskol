import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Reveal from '@/components/Reveal'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import { PILLAR_COLORS, PILLAR_LABELS } from '@/lib/pillarColors'
import { SEED_TESTIMONIALS } from '@/lib/seed'
import { getPayloadClient, withTimeout } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Témoignages',
  description: "Les témoignages des membres d'Akany Neaskol — spirituel, social et culturel.",
}

export const revalidate = 3600

interface TestimonialItem {
  slug: string
  name: string
  age?: number | null
  role?: string | null
  place?: string | null
  pillar: string
  since?: string | null
  quote: string
}

const FILTERS = [
  { label: 'Tous', value: '' },
  { label: 'Spirituel', value: 'spirituel' },
  { label: 'Social', value: 'social' },
  { label: 'Culturel', value: 'culturel' },
]

async function getTestimonials(pilier?: string): Promise<TestimonialItem[]> {
  try {
    const payload = await getPayloadClient()
    const result = await withTimeout(
      payload.find({
        collection: 'testimonials',
        where: {
          _status: { equals: 'published' },
          ...(pilier ? { pillar: { equals: pilier } } : {}),
        },
        limit: 100,
      }),
      5000,
      'payload:find-testimonials-list',
    )
    if (result.docs.length > 0) {
      return result.docs.map((d) => ({
        slug: d.slug as string,
        name: d.name as string,
        age: (d.age as number | null) ?? null,
        role: (d.role as string | null) ?? null,
        place: (d.place as string | null) ?? null,
        pillar: d.pillar as string,
        since: (d.since as string | null) ?? null,
        quote: d.quote as string,
      }))
    }
  } catch (err) {
    console.error('[payload:testimonials]', err)
  }
  const seed = SEED_TESTIMONIALS
  return pilier ? seed.filter((t) => t.pillar === pilier) : seed
}

export default async function TemoignagesPage({
  searchParams,
}: {
  searchParams: Promise<{ pilier?: string }>
}) {
  const { pilier } = await searchParams
  const testimonials = await getTestimonials(pilier)

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          background: 'var(--cream-300)',
          color: 'var(--ink-900)',
          minHeight: 400,
          padding: '120px 0 56px',
        }}
      >
        <Nav dark={false} />
        <div className="shell" style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>Témoignages</div>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', color: 'var(--ink-900)' }}>
            Ils parlent<br />
            <span className="it">pour nous.</span>
          </h1>
        </div>
      </section>

      {/* Filtres + grille */}
      <section style={{ background: 'var(--paper)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          {/* Filtres — liens navigables, URL shareable */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}>
            {FILTERS.map((f) => {
              const isActive = (pilier ?? '') === f.value
              return (
                <Link
                  key={f.value}
                  href={f.value ? `?pilier=${f.value}` : '/temoignages'}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid ' + (isActive ? 'var(--ink-900)' : 'var(--line)'),
                    background: isActive ? 'var(--ink-900)' : 'transparent',
                    color: isActive ? 'var(--paper)' : 'var(--ink-700)',
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  {f.label}
                </Link>
              )
            })}
          </div>

          {/* Grille */}
          {testimonials.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-300)', fontFamily: 'var(--serif)', fontSize: 20, fontStyle: 'italic' }}>
              {"Aucun témoignage dans cette catégorie pour l'instant."}
            </div>
          ) : (
            <div className="responsive-2col" style={{ gap: 24 }}>
              {testimonials.map((t, i) => {
                const color = PILLAR_COLORS[t.pillar] ?? 'var(--lemon-500)'
                const metaLine = [t.role, t.place].filter(Boolean).join(' · ')
                return (
                  <Reveal key={t.slug} delay={i * 60}>
                    <Link
                      href={`/temoignages/${t.slug}`}
                      style={{
                        display: 'block',
                        background: 'var(--cream-300)',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        border: '1px solid var(--line)',
                      }}
                    >
                      <ImagePlaceholder
                        label={`[portrait · ${t.name} · 800×600]`}
                        style={{ aspectRatio: '4/3' }}
                      />
                      <div style={{ padding: 28 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                          <span style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-500)' }}>
                            {PILLAR_LABELS[t.pillar]}
                          </span>
                        </div>
                        <div style={{ fontFamily: 'var(--serif)', fontSize: 26, fontStyle: 'italic', marginBottom: 6 }}>
                          {t.name}{t.age ? `, ${t.age} ans` : ''}
                        </div>
                        {metaLine ? (
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-500)', marginBottom: t.since ? 4 : 16 }}>
                            {metaLine}
                          </div>
                        ) : null}
                        {t.since && (
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-300)', marginBottom: 16 }}>
                            Membre depuis {t.since}
                          </div>
                        )}
                        <p style={{ fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.45, color: 'var(--ink-700)' }}>
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <div style={{ marginTop: 20, fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--flame-500)' }}>
                          Lire le témoignage →
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
