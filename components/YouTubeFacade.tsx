'use client'

import { useState } from 'react'

interface Props {
  videoId: string
  title: string
  style?: React.CSSProperties
}

export default function YouTubeFacade({ videoId, title, style }: Props) {
  const [active, setActive] = useState(false)

  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&autoplay=1`

  const wrapStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    aspectRatio: '16/9',
    border: 0,
    borderRadius: 'inherit',
    overflow: 'hidden',
    ...style,
  }

  if (active) {
    return (
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ ...wrapStyle, display: 'block' }}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Lire le témoignage : ${title}`}
      style={{
        ...wrapStyle,
        cursor: 'pointer',
        position: 'relative',
        backgroundImage: `url(${thumb})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 0,
      }}
    >
      {/* Voile sombre léger */}
      <span aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.25)',
        transition: 'background .2s ease',
      }} />
      {/* Bouton play aux couleurs brand */}
      <span aria-hidden style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          width: 64, height: 64,
          borderRadius: '50%',
          background: 'var(--lemon-500)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
          transition: 'transform .15s ease',
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <path d="M7 4.5L18 11L7 17.5V4.5Z" fill="var(--ink-900)" />
          </svg>
        </span>
      </span>
    </button>
  )
}
