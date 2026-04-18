'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { PILLAR_COLORS } from '@/lib/pillarColors'
import ImagePlaceholder from './ImagePlaceholder'

interface Testimonial {
  slug: string
  name: string
  age?: number | null
  role?: string | null
  pillar: string
  quote: string
  portrait?: unknown
}

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const [active, setActive] = useState(0)
  const length = testimonials.length
  const prev = useCallback(() => setActive((a) => (a - 1 + length) % length), [length])
  const next = useCallback(() => setActive((a) => (a + 1) % length), [length])

  if (length === 0) {
    return null
  }

  const currentIndex = active % length
  const t = testimonials[currentIndex]
  const color = PILLAR_COLORS[t.pillar] ?? 'var(--lemon-500)'
  const roleLine = [t.role].filter(Boolean).join(' · ')

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <>
      {/* Stage principal */}
      <div
        role="region"
        aria-label="Carrousel de témoignages"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="responsive-stage"
        style={{
          gap: 28,
          background: 'var(--forest-800)',
          color: 'var(--paper)',
          borderRadius: 'var(--radius-lg)',
          padding: 48,
          position: 'relative',
          overflow: 'hidden',
          minHeight: 480,
          outline: 'none',
        }}
      >
        {/* Guillemet géant */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -60,
            left: 24,
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 360,
            lineHeight: 1,
            color,
            opacity: 0.2,
            transition: 'color .5s ease',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          &ldquo;
        </div>

        {/* Côté gauche : citation */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32 }}>
          <div>
              <div className="eyebrow on-dark" style={{ marginBottom: 28 }}>
              Témoignage {currentIndex + 1} / {length}
            </div>
            <blockquote
              key={active}
              cite={`/temoignages/${t.slug}`}
              aria-live="polite"
              aria-atomic="true"
              className="quote-animate"
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(28px, 3vw, 42px)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                color: 'var(--paper)',
              }}
            >
              <span style={{ color, marginRight: 6 }}>—</span>
              {t.quote}
            </blockquote>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 26, fontStyle: 'italic' }}>
                {t.name}{t.age ? `, ${t.age} ans` : ''}
              </div>
              {roleLine ? (
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--forest-100)', marginTop: 6 }}>
                  {roleLine}
                </div>
              ) : null}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={prev}
                style={{
                  width: 52, height: 52, borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,.2)',
                  background: 'transparent', color: 'var(--paper)',
                  fontSize: 18, cursor: 'pointer',
                }}
                aria-label="Témoignage précédent"
              >←</button>
              <button
                type="button"
                onClick={next}
                style={{
                  width: 52, height: 52, borderRadius: '50%',
                  border: 0,
                  background: color, color: 'var(--ink-900)',
                  fontSize: 18, cursor: 'pointer',
                  transition: 'background .3s ease',
                }}
                aria-label="Témoignage suivant"
              >→</button>
            </div>
          </div>
        </div>

        {/* Portrait */}
        <ImagePlaceholder
          label={`[portrait · ${t.name}]`}
          variant="dark"
          grain
          style={{ borderRadius: 'var(--radius-md)', alignSelf: 'stretch' }}
        />
      </div>

      {/* Vignettes */}
      <div
        className="responsive-thumbs"
        style={{
          gap: 12,
          marginTop: 16,
        }}
      >
        {testimonials.map((tm, i) => {
          const c = PILLAR_COLORS[tm.pillar] ?? 'var(--lemon-500)'
          const metaLine = [tm.role].filter(Boolean).join(' · ')
          return (
            <button
              type="button"
              key={tm.slug}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              style={{
                background: active === i ? 'var(--forest-800)' : 'var(--cream-500)',
                color: active === i ? 'var(--paper)' : 'var(--ink-900)',
                border: '1px solid ' + (active === i ? 'var(--forest-800)' : 'var(--line)'),
                borderRadius: 'var(--radius-md)',
                padding: '16px 18px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all .25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontFamily: 'var(--sans)',
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: c, flexShrink: 0 }} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 17, lineHeight: 1.1 }}>
                  {tm.name}{tm.age ? `, ${tm.age} ans` : ''}
                </span>
                {metaLine ? (
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {metaLine}
                  </span>
                ) : null}
              </span>
            </button>
          )
        })}
      </div>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Link
          href="/temoignages"
          className="btn btn-ghost"
          style={{ color: 'var(--ink-900)', borderColor: 'var(--line)' }}
        >
          Tous les témoignages →
        </Link>
      </div>
    </>
  )
}
