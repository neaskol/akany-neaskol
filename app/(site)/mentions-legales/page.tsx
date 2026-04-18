import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Mentions légales',
}

export default function MentionsLegalesPage() {
  return (
    <>
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
          <div className="eyebrow on-dark" style={{ marginBottom: 24 }}>Légal</div>
          <h1 className="display" style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
            Mentions <span className="it">légales.</span>
          </h1>
        </div>
      </section>

      <section style={{ background: 'var(--paper)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 48 }}>

            <LegalBlock title="Éditeur">
              <p>Association Akany Neaskol</p>
              <p>Ankadivato, Antananarivo, Madagascar</p>
              <p>Responsable de publication : [Nom du président]</p>
              {/* TODO: ajouter numéro d'enregistrement une fois l'association officialisée */}
            </LegalBlock>

            <LegalBlock title="Hébergement">
              <p>Vercel Inc.</p>
              <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              <p><a href="https://vercel.com" style={{ color: 'var(--flame-500)' }}>vercel.com</a></p>
            </LegalBlock>

            <LegalBlock title="Propriété intellectuelle">
              <p>
                {"L'ensemble des contenus présents sur ce site (textes, images, logos) est la propriété exclusive d'Akany Neaskol, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable."}
              </p>
            </LegalBlock>

            <LegalBlock title="Données personnelles">
              <p>
                {"Les données collectées via le formulaire de contact (nom, email, message) sont utilisées uniquement pour répondre à votre demande. Elles ne sont pas transmises à des tiers. Conformément à la réglementation applicable, vous disposez d'un droit d'accès, de rectification et de suppression de vos données."}
              </p>
              <p style={{ marginTop: 12 }}>
                Pour exercer ce droit : <Link href="/contact" style={{ color: 'var(--flame-500)' }}>nous contacter</Link>.
              </p>
            </LegalBlock>

          </div>
        </div>
      </section>
    </>
  )
}

function LegalBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: 32 }}>
      <h2 className="display" style={{ fontSize: 32, color: 'var(--ink-900)', marginBottom: 20 }}>
        {title}
      </h2>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.7, color: 'var(--ink-700)' }}>
        {children}
      </div>
    </div>
  )
}
