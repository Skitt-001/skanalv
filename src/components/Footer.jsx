export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border)',
      padding: '3rem 2rem 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <img
              src="/logo.png"
              alt="Skana.lv"
              style={{ height: 36, width: 'auto', marginBottom: '1rem', filter: 'brightness(1)' }}
            />
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: 240,
            }}>
              Profesionāla skaņas, gaismu un skatuves tehnikas noma un konsultācijas visā Latvijā.
            </p>
          </div>

          {/* Pakalpojumi */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
            }}>
              Pakalpojumi
            </h4>
            {['Apskaņošana', 'Gaismu tehnika', 'Video', 'Skatuves konstrukcijas', 'Konsultācijas'].map(item => (
              <a
                key={item}
                href="#pakalpojumi"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  marginBottom: '0.5rem',
                  transition: 'color var(--transition)',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Kontakti */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
            }}>
              Kontakti
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="mailto:info@skana.lv" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color var(--transition)',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--green-light)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                info@skana.lv
              </a>
              <a href="https://skana.lv" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
              }}>
                skana.lv
              </a>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
              }}>
                Latvija
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}>
            © {year} Skana.lv. Visas tiesības aizsargātas.
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[''].map(item => (
              <a key={item} href="#" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color var(--transition)',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
