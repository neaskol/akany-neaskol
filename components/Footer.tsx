import Link from 'next/link'
import Wordmark from './Wordmark'

const ArrowIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
    <path d="M2 8 L8 2 M4 2 H8 V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const COLUMNS = [
  {
    title: "L'asso",
    items: [
      { label: 'Notre histoire', href: '/association' },
      { label: 'Mission', href: '/association#mission' },
      { label: 'Équipe', href: '/association#equipe' },
      { label: 'Statuts', href: '/association#statuts' },
    ],
  },
  {
    title: 'Activités',
    items: [
      { label: 'Veillées', href: '/spirituel' },
      { label: 'Retraites', href: '/spirituel#retraites' },
      { label: 'Solidarité', href: '/social-culturel' },
      { label: 'Ateliers', href: '/social-culturel#ateliers' },
    ],
  },
  {
    title: 'Contact',
    items: [
      { label: 'Ankadivato', href: '/contact' },
      { label: 'Antananarivo', href: '/contact' },
      { label: 'Nous écrire', href: '/contact' },
      { label: 'Faire un don', href: '/contact' },
    ],
  },
]

// TODO: ajouter les vrais liens réseaux sociaux quand les comptes seront créés
// const SOCIALS = ['IG', 'TW', 'LI', 'YT', 'TK']

export default function Footer() {
  return (
    <footer style={{ background: 'var(--forest-800)', color: 'var(--paper)', paddingTop: 80 }}>
      <div className="shell">
        {/* Colonnes */}
        <div
          className="responsive-footer-grid"
          style={{
            gap: 40,
            paddingBottom: 56,
            borderBottom: '1px solid var(--paper-alpha-10)',
          }}
        >
          {/* Colonne logo */}
          <div>
            <Wordmark color="var(--paper)" />
            <p
              style={{
                marginTop: 22,
                color: 'var(--forest-100)',
                fontSize: 14,
                lineHeight: 1.6,
                maxWidth: 300,
              }}
            >
              Association chrétienne fondée à Antananarivo — spirituel, social et culturel au
              service des jeunes et de la société.
            </p>
            <Link href="/contact?sujet=Rejoindre%20l%27association" className="btn btn-primary" style={{ marginTop: 24 }}>
              Adhérer
              <span className="arrow">
                <ArrowIcon />
              </span>
            </Link>
            {/* Réseaux sociaux — à activer quand les comptes seront créés */}
          </div>

          {/* Colonnes de liens */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="eyebrow on-dark" style={{ marginBottom: 20 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      style={{
                        color: 'var(--paper)',
                        fontFamily: 'var(--serif)',
                        fontSize: 20,
                        fontStyle: 'italic',
                        paddingBlock: '8px',
                        display: 'inline-block',
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Barre basse */}
        <div
          className="footer-bottom"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '28px 0',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'var(--forest-100)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span>© 2026 Akany Neaskol · Antananarivo</span>
          <div style={{ display: 'flex', gap: 28 }}>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/accessibilite">Accessibilité</Link>
          </div>
        </div>
      </div>

      {/* Grand wordmark de bas de page */}
      <div
        style={{
          background: 'var(--lemon-500)',
          color: 'var(--ink-900)',
          overflow: 'hidden',
          paddingTop: 20,
        }}
      >
        <div style={{ textAlign: 'center', padding: '0 20px' }}>
          <div
            className="display"
            style={{
              fontSize: 'clamp(100px, 22vw, 360px)',
              lineHeight: 0.85,
              marginBottom: -20,
            }}
          >
            Akany<span className="it">+</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
