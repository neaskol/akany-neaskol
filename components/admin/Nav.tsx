import type { ServerProps } from 'payload'
import NavLinks from './NavLinks'

const IconHome = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>
  </svg>
)
const IconVoices = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 15a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-6l-4 3v-3H6z"/>
  </svg>
)
const IconPages = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h9l5 5v13H6z"/><path d="M14 3v6h6"/><path d="M9 13h7M9 17h5"/>
  </svg>
)
const IconMedia = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m21 15-5-5-8 8"/>
  </svg>
)
const IconInbox = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13h5l1.5 3h3L15 13h5"/><path d="M4 13 6 6h12l2 7v6H4z"/>
  </svg>
)
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15c2.8 0 5 2 5 5"/>
  </svg>
)
const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>
  </svg>
)

export default async function Nav({ user, payload }: ServerProps) {
  let pageCount = 0
  let testimonialCount = 0
  let messageCount = 0

  if (payload) {
    try {
      const [pages, testimonials, messages] = await Promise.all([
        payload.count({ collection: 'pages', overrideAccess: true }),
        payload.count({ collection: 'testimonials', overrideAccess: true }),
        payload.count({
          collection: 'contact-submissions',
          overrideAccess: true,
          where: { read: { equals: false } },
        }),
      ])
      pageCount = pages.totalDocs
      testimonialCount = testimonials.totalDocs
      messageCount = messages.totalDocs
    } catch {}
  }

  const displayName = (user as any)?.name || (user as any)?.email?.split('@')[0] || 'Admin'
  const email = (user as any)?.email || ''
  const initials = displayName.slice(0, 2).toUpperCase()

  const groups = [
    {
      section: 'Général',
      items: [
        { label: "Vue d'ensemble", href: '/admin', icon: <IconHome /> },
      ],
    },
    {
      section: 'Contenus',
      items: [
        { label: 'Pages du site', href: '/admin/collections/pages', icon: <IconPages />, count: pageCount },
        { label: 'Témoignages', href: '/admin/collections/testimonials', icon: <IconVoices />, count: testimonialCount },
        { label: 'Médiathèque', href: '/admin/collections/media', icon: <IconMedia /> },
      ],
    },
    {
      section: 'Communication',
      items: [
        { label: 'Messages reçus', href: '/admin/collections/contact-submissions', icon: <IconInbox />, count: messageCount },
      ],
    },
    {
      section: 'Système',
      items: [
        { label: 'Utilisateurs', href: '/admin/collections/users', icon: <IconUsers /> },
        { label: 'Paramètres', href: '/admin/globals', icon: <IconSettings /> },
      ],
    },
  ]

  return (
    <aside className="na-sidebar">
      <a href="/admin" className="na-brand">
        <span className="na-dot" />
        <span className="na-wm">
          <span className="na-it">N</span>easkol
        </span>
        <span className="na-tag">Admin</span>
      </a>

      <NavLinks groups={groups} />

      <div className="na-footer">
        <div className="na-avatar">{initials}</div>
        <div className="na-who">
          <b>{displayName}</b>
          <small>{email}</small>
        </div>
      </div>
    </aside>
  )
}
