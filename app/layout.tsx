import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Geist, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: '400',
})

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBFAF5' },
    { media: '(prefers-color-scheme: dark)', color: '#0E3E3A' },
  ],
}

export const metadata: Metadata = {
  title: {
    default: 'Akany Neaskol — Association chrétienne · Antananarivo',
    template: '%s — Akany Neaskol',
  },
  description:
    'Association chrétienne fondée à Antananarivo en 2010. Spirituel, social et culturel au service des jeunes et de la société malgache.',
  openGraph: {
    siteName: 'Akany Neaskol',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}
