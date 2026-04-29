export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 72,
      }}
    >
      {/* Background grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        zIndex: 0,
      }} />

      {/* Green radial glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-10%',
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(45,158,71,0.12) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Blue radial glow */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-5%',
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(14,165,201,0.08) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 1,
        width: '100%',
      }}>
        <div style={{ maxWidth: 780 }}>
          <div className="section-tag animate-fade-up">
            Skana.lv — Profesionāla tehnika
          </div>

          <h1
            className="animate-fade-up-delay-1"
            style={{
              fontFamily: "'Barlow Condensed', var(--font-display)",
              fontWeight: 700,
              fontSize: 'clamp(3.2rem, 8vw, 7rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
            }}
          >
            Skaņa un gaisma{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--green-light) 0%, var(--blue-light) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              jūsu pasākumam.
            </span>
          </h1>

          <p
            className="animate-fade-up-delay-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: 560,
              marginBottom: '2.5rem',
            }}
          >
            Profesionāla skaņas aparatūras, gaismu tehnikas, video un skatuves
            konstrukciju noma. Konsultācijas no idejas līdz realizācijai.
          </p>

          <div
            className="animate-fade-up-delay-3"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a
              href="#kontakti"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: '#080808',
                background: 'var(--green)',
                textDecoration: 'none',
                padding: '0.875rem 2rem',
                borderRadius: 'var(--radius-sm)',
                letterSpacing: '0.03em',
                transition: 'background var(--transition)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--green-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--green)'}
            >
              Saņemt piedāvājumu
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#pakalpojumi"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                background: 'transparent',
                textDecoration: 'none',
                padding: '0.875rem 2rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-hover)',
                letterSpacing: '0.03em',
                transition: 'border-color var(--transition)',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
            >
              Pakalpojumi
            </a>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '3rem',
              marginTop: '4rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { num: '15+', label: 'Gadu pieredze' },
              { num: '500+', label: 'Pasākumi izpildīti' },
              { num: '100%', label: 'TÜV sertificēts' },
            ].map(stat => (
              <div key={stat.num}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '2rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>
                  {stat.num}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginTop: 4,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, var(--border-hover), transparent)',
      }} />
    </section>
  )
}
