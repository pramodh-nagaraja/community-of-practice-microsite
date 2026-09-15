import { useEffect, useRef } from 'react'

export default function FDETeaserPage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const videoSrc = `${import.meta.env.BASE_URL}fde-teaser.mp4`

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0614',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* Header */}
      <div style={{ marginBottom: '28px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: '#a78bfa', marginBottom: '12px',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: '#a78bfa',
            display: 'inline-block', animation: 'pulse 2s ease-in-out infinite',
          }} />
          Something exciting is coming
        </div>
        <h1 style={{ color: '#f1f0ff', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
          Watch the Teaser
        </h1>
      </div>

      {/* Video */}
      <div style={{
        width: '100%', maxWidth: '900px',
        borderRadius: '16px', overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(167,139,250,0.25)',
        background: '#000',
      }}>
        <video
          ref={videoRef}
          controls
          playsInline
          autoPlay
          style={{ width: '100%', display: 'block', maxHeight: '75vh', background: '#000' }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Footer link back */}
      <a
        href="#/"
        style={{
          marginTop: '28px', color: '#a78bfa', fontSize: '0.9rem',
          textDecoration: 'none', fontWeight: 600,
        }}
      >
        ← Back to Communities Hub
      </a>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
