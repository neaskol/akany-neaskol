import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
}

export default function ConfidentialitePage() {
  return (
    <>
      <section
        style={{
          position: 'relative',
          background: 'var(--forest-800)',
          color: 'var(--paper)',
          padding: '120px 0 64px',
          overflow: 'hidden',
        }}
      >
        <Nav dark />
        <div className="shell" style={{ position: 'relative' }}>
          <div className="eyebrow on-dark" style={{ marginBottom: 24 }}>Légal</div>
          <h1 className="display" style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
            <span className="it">Confidentialité.</span>
          </h1>
        </div>
      </section>

      <section style={{ background: 'var(--paper)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 48 }}>

            <LegalBlock title="Données collectées">
              <p>
                Ce site collecte uniquement les données que vous saisissez volontairement dans le
                formulaire de contact : nom, adresse email, sujet et message.
              </p>
              <p style={{ marginTop: 12 }}>
                Aucun cookie de traçage, aucune analytics tiers ne sont utilisés sur ce site.
              </p>
            </LegalBlock>

            <LegalBlock title="Finalité">
              <p>
                {"Les données collectées servent exclusivement à traiter votre demande de contact et à vous répondre. Elles ne font l'objet d'aucune cession ou vente à des tiers."}
              </p>
            </LegalBlock>

            <LegalBlock title="Conservation">
              <p>
                Vos données sont conservées le temps nécessaire au traitement de votre demande, et
                supprimées sur simple demande.
              </p>
            </LegalBlock>

            <LegalBlock title="Vos droits">
              <p>
                {"Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données personnelles."}
              </p>
              <p style={{ marginTop: 12 }}>
                Pour exercer ces droits : <Link href="/contact" style={{ color: 'var(--flame-500)' }}>nous contacter</Link>.
              </p>
            </LegalBlock>

            <LegalBlock title="Services tiers">
              <p>
                {"Ce site utilise "}
                <strong>Resend</strong>
                {" pour l'envoi d'emails ("}
                <a href="https://resend.com/privacy" style={{ color: 'var(--flame-500)' }}>politique de confidentialité Resend</a>
                {") et "}
                <strong>Vercel</strong>
                {" pour l'hébergement ("}
                <a href="https://vercel.com/legal/privacy-policy" style={{ color: 'var(--flame-500)' }}>politique de confidentialité Vercel</a>
                ).
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
