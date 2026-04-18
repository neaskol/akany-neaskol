import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Reveal from '@/components/Reveal'
import ImagePlaceholder from '@/components/ImagePlaceholder'

export const metadata: Metadata = {
  title: "L'association",
  description: "Née à Ankadivato en 2010, Akany Neaskol réunit des jeunes chrétiens d'Antananarivo autour de trois piliers : spirituel, social et culturel.",
}

export const revalidate = 3600

const TIMELINE = [
  { year: '2010', label: 'Premières veillées', desc: 'Naissance informelle à Ankadivato, autour des veillées de prière du jeudi soir.' },
  { year: '2015', label: 'Expansion sociale', desc: "Lancement des distributions solidaires dans les quartiers défavorisés d'Antananarivo." },
  { year: '2020', label: 'Dimension culturelle', desc: 'Création des ateliers culturels du samedi — chant, artisanat, langue malgache.' },
  { year: '2026', label: 'Officialisation', desc: "Reconnaissance officielle de l'association. Nouveau chapitre, mêmes valeurs." },
]

const VALUES = [
  { icon: '✦', label: 'Foi vécue', body: "La foi n'est pas une affaire du dimanche. Elle se vit au quotidien, dans les relations et l'engagement." },
  { icon: '✦', label: 'Fraternité', body: "Jeunes et moins jeunes, Antananarivo est une famille. Neaskol tisse des liens entre générations." },
  { icon: '✦', label: 'Service', body: "Servir les plus démunis n'est pas de la charité — c'est une rencontre, une réciprocité." },
  { icon: '✦', label: 'Ouverture', body: "Officialiser, c'est ouvrir. Permettre à d'autres jeunes de trouver ce lieu que nous avons eu la chance de trouver." },
]

export default function AssociationPage() {
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
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 60% 50%, rgba(238,242,76,.07) 0%, transparent 50%)' }} />
        <div className="shell" style={{ position: 'relative' }}>
          <div className="eyebrow on-dark" style={{ marginBottom: 28 }}>Antananarivo · Fondée 2010</div>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 128px)', color: 'var(--paper)', maxWidth: 900 }}>
            Une <span className="it">famille</span> au cœur<br />
            de la <span style={{ color: 'var(--lemon-500)' }}>cité.</span>
          </h1>
          <p style={{ marginTop: 32, fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.4, color: 'var(--forest-100)', maxWidth: 560 }}>
            Née à Ankadivato en 2010, Akany Neaskol rassemble des jeunes chrétiens autour de trois
            piliers — spirituel, social et culturel — pour grandir ensemble et servir la société.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: 'var(--cream-300)', padding: 'var(--section-y) 0' }} id="mission">
        <div className="shell">
          <div className="responsive-2col" style={{ gap: 72, alignItems: 'center' }}>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 20 }}>Notre mission</div>
              <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', color: 'var(--ink-900)' }}>
                Tisser des <span className="it">liens</span><br />vivants.
              </h2>
              <p style={{ marginTop: 28, fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1.5, color: 'var(--ink-700)' }}>
                {"Akany Neaskol réunit les citoyens autour d'activités variées — entre générations, entre quartiers — tout en venant en aide aux plus démunis et en défendant les droits des groupes fragilisés."}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ImagePlaceholder
                label="[photo · rassemblement · Ankadivato]"
                style={{ borderRadius: 'var(--radius-lg)', aspectRatio: '4/3' }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: 'var(--paper)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Notre histoire</div>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', color: 'var(--ink-900)', marginBottom: 64 }}>
              {new Date().getFullYear() - 2010} ans <span className="it">d&apos;engagement.</span>
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 80}>
                <div
                  className="timeline-row"
                  style={{
                    gap: 40,
                    padding: '28px 0',
                    borderBottom: '1px solid var(--line)',
                    alignItems: 'start',
                  }}
                >
                  <div className="display h-fluid-44" style={{ color: 'var(--flame-500)' }}>{item.year}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{item.label}</div>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--ink-700)', lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe / Bureau — section masquée jusqu'à peuplement de la collection Team */}
      {/* TODO: connecter la collection Team de Payload et retirer ce commentaire */}

      {/* Valeurs */}
      <section style={{ background: 'var(--cream-300)', padding: 'var(--section-y) 0' }}>
        <div className="shell">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Nos valeurs</div>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 80px)', marginBottom: 56, color: 'var(--ink-900)' }}>
              Ce qui nous <span className="it">unit.</span>
            </h2>
          </Reveal>
          <div className="responsive-2col" style={{ gap: 20 }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.label} delay={i * 60}>
                <div style={{ background: 'var(--paper)', borderRadius: 'var(--radius-lg)', padding: '32px 36px', border: '1px solid var(--line)' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--flame-500)', marginBottom: 16 }}>{v.icon}</div>
                  <h3 className="display h-fluid-36" style={{ color: 'var(--ink-900)', marginBottom: 12 }}>{v.label}</h3>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.5, color: 'var(--ink-700)' }}>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
