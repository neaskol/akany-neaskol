'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Wordmark from './Wordmark'

const NAV_ITEMS = [
  { label: "L'association", href: '/association' },
  { label: 'Spirituel', href: '/spirituel' },
  { label: 'Social & Culturel', href: '/social-culturel' },
  { label: 'Témoignages', href: '/temoignages' },
]

const ArrowIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
    <path d="M2 8 L8 2 M4 2 H8 V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function Nav({ dark = true }: { dark?: boolean }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const dialogId = useId()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const textColor = dark ? 'var(--paper)' : 'var(--ink-900)'

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <nav
        style={{
          position: 'absolute',
          top: 28,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <div
          className="shell"
          style={{ display: 'flex', alignItems: 'center', gap: 24 }}
        >
          <Wordmark color={textColor} />

          {/* Pill nav — desktop uniquement */}
          <div
            className="nav-pill"
            style={{
              marginLeft: 'auto',
              alignItems: 'center',
              gap: 4,
              background: dark ? 'var(--glass-light-08)' : 'var(--glass-dark-06)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${dark ? 'var(--glass-light-12)' : 'var(--glass-dark-14)'}`,
              borderRadius: 999,
              padding: 6,
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    background: isActive
                      ? dark
                        ? 'var(--glass-light-14)'
                        : 'var(--ink-900)'
                      : 'transparent',
                    color: isActive && !dark ? 'var(--paper)' : textColor,
                    padding: '10px 16px',
                    borderRadius: 999,
                    fontFamily: 'var(--sans)',
                    fontSize: 13,
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <Link href="/contact" className="btn btn-primary nav-contact">
            Contact
            <span className="arrow">
              <ArrowIcon />
            </span>
          </Link>

          {/* Hamburger — mobile uniquement */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls={dialogId}
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: `1px solid ${dark ? 'var(--glass-light-20)' : 'var(--glass-dark-12)'}`,
              background: dark ? 'var(--glass-light-08)' : 'var(--glass-dark-04)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              padding: 0,
            }}
          >
            <span style={{
              display: 'block', width: 18, height: 1.5,
              background: textColor,
              transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              transition: 'transform 0.2s',
            }} />
            <span style={{
              display: 'block', width: 18, height: 1.5,
              background: textColor,
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.2s',
            }} />
            <span style={{
              display: 'block', width: 18, height: 1.5,
              background: textColor,
              transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              transition: 'transform 0.2s',
            }} />
          </button>
        </div>
      </nav>

      {/* Overlay menu mobile */}
      {menuOpen && (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="safe-overlay-pad"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'var(--forest-900)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header overlay */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Wordmark color="var(--paper)" />
            <button
              ref={closeButtonRef}
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '1px solid var(--glass-light-20)',
                background: 'var(--glass-light-08)',
                cursor: 'pointer',
                color: 'var(--paper)',
                fontSize: 20,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              ×
            </button>
          </div>

          {/* Liens */}
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, overflowY: 'auto' }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? 'page' : undefined}
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(40px, 10vw, 64px)',
                  color: pathname === item.href ? 'var(--lemon-500)' : 'var(--paper)',
                  lineHeight: 1.1,
                  display: 'block',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--glass-light-08)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA bas */}
          <div style={{ paddingTop: 24 }}>
            <Link
              href="/contact"
              className="btn btn-primary"
              onClick={() => setMenuOpen(false)}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Nous contacter
              <span className="arrow"><ArrowIcon /></span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
