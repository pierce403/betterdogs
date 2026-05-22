import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 45%, #38BDF8 100%)',
          color: '#ffffff',
          padding: '64px',
          fontFamily: 'Inter, ui-sans-serif, system-ui'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            border: '2px solid rgba(255,255,255,0.25)',
            borderRadius: '24px',
            padding: '48px',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: 36, opacity: 0.9 }}>🐾 BetterDogs</div>
            <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, maxWidth: '900px' }}>
              Better training outcomes for every dog.
            </div>
          </div>

          <div style={{ fontSize: 30, opacity: 0.92 }}>
            Case tracking • Progress timelines • Owner-ready results
          </div>
        </div>
      </div>
    ),
    size
  );
}
