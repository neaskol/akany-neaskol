import Link from 'next/link'

export default function Wordmark({ color = 'var(--paper)' }: { color?: string }) {
  return (
    <Link
      href="/"
      aria-label="Akany Neaskol — accueil"
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 2,
        color,
        fontFamily: 'var(--sans)',
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: '-0.02em',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          fontSize: 28,
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        Akany
      </span>
      <span style={{ opacity: 0.6, margin: '0 4px' }}>·</span>
      <span>Neaskol</span>
      <span style={{ color: 'var(--lemon-500)', marginLeft: 2 }}>+</span>
    </Link>
  )
}
