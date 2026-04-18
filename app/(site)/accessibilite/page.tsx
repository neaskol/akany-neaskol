import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Accessibilité',
}

export default function AccessibilitePage() {
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
            <span className="it">Accessibilité.</span>
          </h1>
        </div>
      </section>

      <section style={{ background: 'var(--paper)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 48 }}>

            <LegalBlock title="Engagement">
              <p>
                {"Akany Neaskol s'engage à rendre son site accessible au plus grand nombre, conformément aux recommandations WCAG 2.1."}
              </p>
            </LegalBlock>

            <LegalBlock title="État de conformité">
              <p>
                Ce site est <strong>partiellement conforme</strong> aux critères WCAG 2.1 niveau AA.
                Des améliorations sont en cours sur les points suivants :
              </p>
              <ul style={{ marginTop: 12, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li>Contraste des éléments décoratifs</li>
                <li>{"Alternatives textuelles des images (en attente des photos définitives)"}</li>
              </ul>
            </LegalBlock>

            <LegalBlock title="Fonctionnalités d'accessibilité">
              <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li>Lien d&apos;évitement &quot;Aller au contenu principal&quot; en début de page</li>
                <li>Navigation clavier complète (Tab, Entrée, touches fléchées sur le carousel)</li>
                <li>Indicateurs de focus visibles sur tous les éléments interactifs</li>
                <li>Animations désactivées si <code>prefers-reduced-motion</code> est actif</li>
                <li>Structure sémantique HTML (nav, main, article, blockquote…)</li>
                <li>Langue de la page déclarée (<code>lang=&quot;fr&quot;</code>)</li>
              </ul>
            </LegalBlock>

            <LegalBlock title="Contact">
              <p>
                {"Si vous rencontrez un obstacle à l'accessibilité sur ce site, vous pouvez nous le signaler via notre "}
                <Link href="/contact" style={{ color: 'var(--flame-500)' }}>formulaire de contact</Link>
                . Nous nous engageons à répondre dans les 48h.
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
