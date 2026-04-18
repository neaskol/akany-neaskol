import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Akany Neaskol — Association chrétienne · Antananarivo'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0E3E3A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'serif',
        }}
      >
        {/* Top — label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#EEF24C',
            }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#D8E6E3',
            }}
          >
            Antananarivo · Fondée 2010
          </span>
        </div>

        {/* Center — wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div
            style={{
              fontSize: 120,
              fontWeight: 400,
              lineHeight: 0.88,
              color: '#FBFAF5',
              letterSpacing: '-0.02em',
            }}
          >
            Akany
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 400,
              lineHeight: 0.88,
              color: '#EEF24C',
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
            }}
          >
            Neaskol+
          </div>
        </div>

        {/* Bottom — tagline + pillars */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              fontFamily: 'serif',
              fontSize: 22,
              color: '#D8E6E3',
              lineHeight: 1.4,
              maxWidth: 500,
            }}
          >
            Association chrétienne — spirituel, social et culturel au service des jeunes.
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: 'Spirituel', color: '#EEF24C' },
              { label: 'Social', color: '#F46A2D' },
              { label: 'Culturel', color: '#F5EFCE' },
            ].map((p) => (
              <div
                key={p.label}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: p.color,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'serif',
                    fontStyle: 'italic',
                    fontSize: 18,
                    color: '#FBFAF5',
                  }}
                >
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
