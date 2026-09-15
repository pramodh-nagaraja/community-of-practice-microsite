import { useEffect, useRef } from 'react'

export default function FDETeaserPage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Build video URL relative to the page base (works on Azure root and GitHub Pages sub-path)
  const videoSrc = new URL('fde-teaser.mp4', window.location.href.split('#')[0]).href

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const go = (hash: string) => { window.location.hash = hash }

  return (
    <div className="fde-root">
      {/* Header */}
      <header className="fde-header">
        <div className="fde-header-inner">
          <div className="fde-brand">
            <div className="fde-logo-acc" aria-label="Accenture">
              <svg viewBox="0 0 22 20" fill="none" aria-hidden="true">
                <path d="M4 2 L17 10 L4 18" stroke="white" strokeWidth="3.8"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="fde-brand-name">Accenture</span>
            <div className="fde-brand-rule" />
            <span className="fde-brand-client">QBE Account Technology</span>
          </div>
          <button className="fde-back-btn" onClick={() => go('#/')}>
            ← Communities Hub
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="fde-hero">
        <div className="fde-hero-glow" aria-hidden="true" />
        <div className="fde-hero-inner">
          <span className="fde-eyebrow">
            <span className="fde-eyebrow-dot" />
            Something exciting is coming
          </span>
          <h1 className="fde-title">FDE Program</h1>
          <p className="fde-subtitle">
            Hi Team, we have something exciting in the works and wanted to share
            a little teaser before the big reveal!
          </p>
        </div>
      </section>

      {/* Video */}
      <section className="fde-video-section">
        <div className="fde-video-wrap">
          <video
            ref={videoRef}
            className="fde-video"
            controls
            playsInline
            autoPlay
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
        <p className="fde-closing">
          More details coming very soon — watch this space!
        </p>
      </section>

      <style>{`
        .fde-root {
          min-height: 100vh;
          background: #0a0614;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          color: #f1f0ff;
        }

        /* Header */
        .fde-header {
          position: sticky; top: 0; z-index: 100;
          background: rgba(10,6,20,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(167,139,250,0.12);
        }
        .fde-header-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .fde-brand { display: flex; align-items: center; gap: 10px; }
        .fde-logo-acc {
          width: 28px; height: 28px; border-radius: 6px;
          background: #7C3AED;
          display: flex; align-items: center; justify-content: center;
        }
        .fde-logo-acc svg { width: 14px; height: 14px; }
        .fde-brand-name { font-weight: 700; font-size: 0.95rem; color: #fff; }
        .fde-brand-rule {
          width: 1px; height: 18px;
          background: rgba(255,255,255,0.2);
        }
        .fde-brand-client { font-size: 0.82rem; color: #a78bfa; font-weight: 500; }
        .fde-back-btn {
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(167,139,250,0.3);
          color: #c4b5fd; font-size: 0.85rem; font-weight: 600;
          padding: 8px 16px; border-radius: 8px; cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          font-family: inherit;
        }
        .fde-back-btn:hover {
          background: rgba(124,58,237,0.3);
          border-color: #a78bfa;
        }

        /* Hero */
        .fde-hero {
          position: relative; overflow: hidden;
          padding: 80px 24px 60px;
          text-align: center;
        }
        .fde-hero-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 80% at 50% 0%, rgba(124,58,237,0.3) 0%, transparent 70%);
          pointer-events: none;
        }
        .fde-hero-inner { position: relative; max-width: 700px; margin: 0 auto; }
        .fde-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #a78bfa; margin-bottom: 20px;
        }
        .fde-eyebrow-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #a78bfa;
          animation: fdePulse 2s ease-in-out infinite;
        }
        .fde-title {
          font-size: clamp(2.4rem, 6vw, 3.6rem);
          font-weight: 800; letter-spacing: -0.02em;
          background: linear-gradient(135deg, #fff 0%, #c4b5fd 60%, #a78bfa 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 20px;
        }
        .fde-subtitle {
          font-size: 1.1rem; color: #c4b5fd; line-height: 1.7; margin: 0;
        }

        /* Video section */
        .fde-video-section {
          padding: 0 24px 80px;
          display: flex; flex-direction: column; align-items: center; gap: 32px;
        }
        .fde-video-wrap {
          width: 100%; max-width: 900px;
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.2);
          background: #000;
        }
        .fde-video {
          width: 100%; display: block;
          max-height: 70vh; background: #000;
        }
        .fde-closing {
          font-size: 1rem; color: #a78bfa;
          font-weight: 500; letter-spacing: 0.02em;
          margin: 0;
        }

        @keyframes fdePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #a78bfa; }
          50%       { opacity: 0.5; box-shadow: 0 0 14px #a78bfa; }
        }

        @media (max-width: 600px) {
          .fde-brand-client { display: none; }
          .fde-hero { padding: 60px 16px 40px; }
          .fde-video-section { padding: 0 16px 60px; }
        }
      `}</style>
    </div>
  )
}
