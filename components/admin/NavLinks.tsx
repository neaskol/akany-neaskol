'use client'

import { usePathname } from 'next/navigation'

type NavItem = {
  label: string
  href: string
  icon: React.ReactNode
  count?: number
}
type NavGroup = {
  section: string
  items: NavItem[]
}

export default function NavLinks({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname()

  return (
    <nav className="na-nav">
      {groups.map((g, i) => (
        <div key={i}>
          <div className="na-section">{g.section}</div>
          {g.items.map((item, j) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <a key={j} href={item.href} className={`na-link${isActive ? ' active' : ''}`}>
                <span className="na-icon">{item.icon}</span>
                <span>{item.label}</span>
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="na-count">{item.count}</span>
                )}
              </a>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
