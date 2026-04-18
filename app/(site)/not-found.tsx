import Link from 'next/link'
import Nav from '@/components/Nav'

export default function NotFound() {
  return (
    <>
      <section
        style={{
          position: 'relative',
          background: 'var(--forest-800)',
          color: 'var(--paper)',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Nav dark />
        <div
          className="shell"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 120,
            paddingBottom: 80,
          }}
        >
          <div className="eyebrow on-dark" style={{ marginBottom: 24 }}>Erreur 404</div>
          <h1
            className="display"
            style={{ fontSize: 'clamp(80px, 14vw, 200px)', color: 'var(--lemon-500)', lineHeight: 0.85 }}
          >
            Page<br />
            <span className="it">introuvable.</span>
          </h1>
          <p
            style={{
              marginTop: 40,
              fontFamily: 'var(--serif)',
              fontSize: 22,
              color: 'var(--forest-100)',
              maxWidth: 480,
              lineHeight: 1.4,
            }}
          >
            {"Cette page n'existe pas ou a été déplacée. Revenez à l'accueil pour continuer."}
          </p>
          <div style={{ marginTop: 40 }}>
            <Link href="/" className="btn btn-primary">
              {"Retour à l'accueil"}
              <span className="arrow">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M2 8 L8 2 M4 2 H8 V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
