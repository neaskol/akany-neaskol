import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Reveal from '@/components/Reveal'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import { PILLAR_COLORS, PILLAR_LABELS } from '@/lib/pillarColors'
import { SEED_TESTIMONIALS } from '@/lib/seed'
import { getPayloadClient, withTimeout } from '@/lib/payload'

export const revalidate = 3600

interface TestimonialDetail {
  slug: string
  name: string
  age?: number | null
  role?: string | null
  place?: string | null
  pillar: string
  since?: string | null
  quote: string
  story: string[]
  portrait?: unknown
}

async function getTestimonial(slug: string): Promise<TestimonialDetail | null> {
  try {
    const payload = await getPayloadClient()
    const result = await withTimeout(
      payload.find({
        collection: 'testimonials',
        where: {
          slug: { equals: slug },
          _status: { equals: 'published' },
        },
        limit: 1,
      }),
      5000,
      'payload:find-testimonial-detail',
    )
    if (result.docs.length > 0) {
      const d = result.docs[0]
      return {
        slug: d.slug as string,
        name: d.name as string,
        age: (d.age as number | null) ?? null,
        role: (d.role as string | null) ?? null,
        place: (d.place as string | null) ?? null,
        pillar: d.pillar as string,
        since: (d.since as string | null) ?? null,
        quote: d.quote as string,
        story: (d.story as Array<{ paragraph: string }> | null)
          ?.map((s) => s.paragraph)
          .filter(Boolean) ?? [],
        portrait: d.portrait ?? null,
      }
    }
  } catch (err) {
    console.error('[payload:testimonial]', err)
  }

  return SEED_TESTIMONIALS.find((t) => t.slug === slug) ?? null
}

async function getAllSlugs() {
  try {
    const payload = await getPayloadClient()
    const result = await withTimeout(
      payload.find({
        collection: 'testimonials',
        where: { _status: { equals: 'published' } },
        select: { slug: true },
      }),
      5000,
      'payload:find-testimonial-slugs',
    )
    return result.docs.map((d) => ({ slug: d.slug as string }))
  } catch (err) {
    console.error('[payload:slugs]', err)
  }
  return SEED_TESTIMONIALS.map((t) => ({ slug: t.slug }))
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const t = await getTestimonial(slug)
  if (!t) return {}
  return {
    title: `Témoignage de ${t.name}`,
    description: t.quote,
  }
}

export default async function TemoignagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = await getTestimonial(slug)
  if (!t) notFound()

  const color = PILLAR_COLORS[t.pillar] ?? 'var(--lemon-500)'
  const metaLine = [t.role, t.place].filter(Boolean).join(' · ')

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
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(ellipse at 60% 50%, ${color.replace('var(--lemon-500)', 'rgba(238,242,76,.08)').replace('var(--flame-500)', 'rgba(244,106,45,.08)').replace('var(--cream-500)', 'rgba(245,239,206,.06)')} 0%, transparent 50%)` }} />
        <div className="shell" style={{ position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <Link href="/temoignages" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--forest-100)', opacity: 0.7 }}>
              ← Témoignages
            </Link>
            <span style={{ color: 'var(--forest-100)', opacity: 0.4 }}>/</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color }}>
              {t.name}
            </span>
          </div>

          <div className="responsive-detail-grid" style={{ gap: 56, alignItems: 'end' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: color }} />
                <span className="eyebrow on-dark">{PILLAR_LABELS[t.pillar]}</span>
              </div>
              <h1 className="display" style={{ fontSize: 'clamp(52px, 7vw, 100px)', color: 'var(--paper)' }}>
                {t.name},<br />
                <span className="it">{t.age ? `${t.age} ans.` : 'Membre.'}</span>
              </h1>
              {metaLine ? (
                <div style={{ marginTop: 20, fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--forest-100)' }}>
                  {metaLine}
                </div>
              ) : null}
              {t.since && (
                <div style={{ marginTop: 8, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--forest-100)', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                  Membre depuis {t.since}
                </div>
              )}
            </div>
            <ImagePlaceholder
              label={`[portrait · ${t.name} · 900×1200]`}
              variant="dark"
              grain
              style={{ borderRadius: 'var(--radius-lg)', aspectRatio: '3/4' }}
            />
          </div>
        </div>
      </section>

      {/* Citation */}
      <section style={{ background: 'var(--cream-300)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <Reveal>
            <blockquote style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
              <div className="display h-fluid-72" style={{ fontStyle: 'italic', color, lineHeight: 1, marginBottom: 16 }}>&ldquo;</div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3.5vw, 40px)', lineHeight: 1.25, letterSpacing: '-0.01em', color: 'var(--ink-900)' }}>
                {t.quote}
              </p>
              <div className="display h-fluid-72" style={{ fontStyle: 'italic', color, lineHeight: 1, marginTop: 16 }}>&rdquo;</div>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Témoignage complet */}
      <section style={{ background: 'var(--paper)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 32 }}>Son témoignage</div>
            </Reveal>
            {t.story.map((paragraph: string, i: number) => (
              <Reveal key={i} delay={i * 80}>
                <p style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 20,
                  lineHeight: 1.65,
                  color: 'var(--ink-700)',
                  marginBottom: 28,
                }}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Retour */}
      <section style={{ background: 'var(--cream-300)', padding: '48px 0' }}>
        <div className="shell">
          <div className="cta-row">
            <Link href="/temoignages" className="btn btn-ghost" style={{ color: 'var(--ink-900)', borderColor: 'var(--line)' }}>
              ← Tous les témoignages
            </Link>
            <Link href="/contact?sujet=Rejoindre%20l%27association" className="btn btn-flame">
              Rejoindre Neaskol
              <span className="arrow">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M2 8 L8 2 M4 2 H8 V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
