import type { ServerProps } from 'payload'
import Link from 'next/link'

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
)
const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="m14 6 4 4"/>
  </svg>
)
const IconHist = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 5v4h4"/><path d="M12 8v5l3 2"/>
  </svg>
)
const IconInbox = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13h5l1.5 3h3L15 13h5"/><path d="M4 13 6 6h12l2 7v6H4z"/>
  </svg>
)
const IconMedia = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m21 15-5-5-8 8"/>
  </svg>
)

function timeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 60) return `il y a ${mins}min`
  if (hours < 24) return `il y a ${hours}h`
  if (days === 1) return 'hier'
  return `il y a ${days} jours`
}

export default async function Dashboard({ user, payload }: ServerProps) {
  const displayName = (user as any)?.name || (user as any)?.email?.split('@')[0] || 'vous'
  const firstName = displayName.split(' ')[0]

  let pages: any[] = []
  let messages: any[] = []
  let pageCount = 0
  let testimonialCount = 0
  let messageCount = 0

  if (payload) {
    try {
      const [pagesRes, messagesRes, testimonials] = await Promise.all([
        payload.find({ collection: 'pages', limit: 10, sort: '-updatedAt', overrideAccess: true }),
        payload.find({ collection: 'contact-submissions', limit: 3, sort: '-createdAt', overrideAccess: true }),
        payload.count({ collection: 'testimonials', overrideAccess: true }),
      ])
      pages = pagesRes.docs
      messages = messagesRes.docs
      pageCount = pagesRes.totalDocs
      testimonialCount = testimonials.totalDocs
      messageCount = (await payload.count({
        collection: 'contact-submissions',
        overrideAccess: true,
        where: { read: { equals: false } },
      })).totalDocs
    } catch {}
  }

  const stats = [
    { label: 'Pages publiées', value: String(pageCount), delta: 'Total des pages', accent: 'var(--na-ok)' },
    { label: 'Témoignages', value: String(testimonialCount), delta: 'Publiés', accent: 'var(--flame-500)' },
    { label: 'Messages non lus', value: String(messageCount), delta: 'En attente', accent: 'var(--lemon-500)' },
    { label: 'Visiteurs · 30j', value: '—', delta: 'Non disponible', accent: 'var(--forest-800)' },
  ]

  return (
    <div className="na-shell">
      {/* Header */}
      <div className="na-page-header">
        <div>
          <h1 className="na-page-title">
            Bonjour, <em>{firstName}</em>.
          </h1>
          <p className="na-page-sub">
            Voici ce qui s'est passé sur le site ces derniers jours, et les contenus qui pourraient avoir besoin de votre attention.
          </p>
        </div>
        <div className="na-actions">
          <a className="na-btn" href="/admin/collections/pages">
            <IconHist /> Historique
          </a>
          <a className="na-btn flame" href="/admin/collections/testimonials/create">
            <IconPlus /> Nouveau témoignage
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="na-stats">
        {stats.map((s, i) => (
          <div key={i} className="na-stat">
            <span className="na-stat-accent" style={{ background: s.accent }} />
            <span className="na-stat-label">{s.label}</span>
            <span className="na-stat-value">{s.value}</span>
            <span className="na-stat-delta">↗ {s.delta}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="na-content-row">
        {/* Main column */}
        <div className="na-col-main">
          {/* Pages table */}
          <div className="na-card">
            <div className="na-card-head">
              <h3>Pages du site</h3>
              <a className="na-btn sm" href="/admin/collections/pages">Gérer →</a>
            </div>
            <table className="na-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Statut</th>
                  <th>Mise à jour</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pages.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: 'var(--na-ink-3)', fontFamily: 'var(--na-mono)', fontSize: 12, padding: '28px 14px' }}>
                      Aucune page pour l'instant
                    </td>
                  </tr>
                )}
                {pages.map((p: any) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontFamily: 'var(--na-serif)', fontSize: 20, fontStyle: 'italic' }}>{p.title}</div>
                      <div style={{ fontFamily: 'var(--na-mono)', fontSize: 11, color: 'var(--na-ink-3)', marginTop: 2 }}>/{p.slug}</div>
                    </td>
                    <td>
                      {p._status === 'published' ? (
                        <span className="na-badge ok"><span className="na-badge-dot" />En ligne</span>
                      ) : (
                        <span className="na-badge draft"><span className="na-badge-dot" />Brouillon</span>
                      )}
                    </td>
                    <td style={{ fontFamily: 'var(--na-mono)', fontSize: 12, color: 'var(--na-ink-3)' }}>
                      {p.updatedAt ? timeAgo(new Date(p.updatedAt)) : '—'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <a className="na-btn sm" href={`/admin/collections/pages/${p.id}`}>
                        <IconEdit /> Éditer
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Activity */}
          <div className="na-card">
            <div className="na-card-head">
              <h3>Activité récente</h3>
              <a className="na-btn sm ghost" href="/admin/collections/contact-submissions">Tout voir →</a>
            </div>
            <div className="na-activity">
              {messages.length === 0 ? (
                <div style={{ padding: '20px 0', color: 'var(--na-ink-3)', fontFamily: 'var(--na-mono)', fontSize: 12 }}>
                  Aucune activité récente
                </div>
              ) : messages.map((m: any, i: number) => (
                <div key={i} className="na-activity-item">
                  <div className="na-activity-mark">{(m.name || 'A').charAt(0)}</div>
                  <div className="na-activity-body">
                    <div className="na-activity-title">
                      <b>{m.name}</b> a envoyé un message via <span>{m.subject || 'Formulaire contact'}</span>
                    </div>
                    <time className="na-activity-time">{m.createdAt ? timeAgo(new Date(m.createdAt)) : ''}</time>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side column */}
        <div className="na-col-side">
          {/* Quick actions */}
          <div className="na-card">
            <div className="na-card-head"><h3>Actions rapides</h3></div>
            <div className="na-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a className="na-btn" href="/admin/collections/testimonials/create">
                <IconPlus /> Nouveau témoignage
              </a>
              <a className="na-btn" href="/admin/collections/pages">
                <IconEdit /> Gérer les pages
              </a>
              <a className="na-btn" href="/admin/collections/contact-submissions">
                <IconInbox /> Consulter les messages
              </a>
              <a className="na-btn" href="/admin/collections/media/create">
                <IconMedia /> Téléverser des médias
              </a>
            </div>
          </div>

          {/* Latest messages */}
          <div className="na-card">
            <div className="na-card-head">
              <h3>Derniers messages</h3>
              <a className="na-btn sm ghost" href="/admin/collections/contact-submissions">Boîte →</a>
            </div>
            <div className="na-activity">
              {messages.length === 0 ? (
                <div style={{ padding: '20px 0', color: 'var(--na-ink-3)', fontFamily: 'var(--na-mono)', fontSize: 12 }}>
                  Aucun message reçu
                </div>
              ) : messages.map((m: any, i: number) => (
                <div key={i} className="na-activity-item">
                  <div className="na-activity-mark">{(m.name || 'A').charAt(0)}</div>
                  <div className="na-activity-body">
                    <div className="na-activity-title"><b>{m.name}</b></div>
                    <div className="na-msg-preview">{m.message}</div>
                    <time className="na-activity-time">{m.createdAt ? timeAgo(new Date(m.createdAt)) : ''}</time>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
