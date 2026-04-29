import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Pakalpojumi', href: '#pakalpojumi' },
  { label: 'Par mums', href: '#par-mums' },
  { label: 'Kontakti', href: '#kontakti' },
]

const RENTAL_LINKS = [
  { label: 'Skaņas tehnika', href: '/services/skana' },
  { label: 'Gaismu tehnika', href: '/services/gaismas' },
  { label: 'Video tehnika', href: '/services/video' },
  { label: 'Skatuves tehnika', href: '/services/skatuve' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }

  const location = useLocation()
  const isServiceRoute = location.pathname.startsWith('/services/')

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(8, 8, 8, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}>
        <nav style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 2rem',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}>
          <Link to="/" onClick={() => { handleLinkClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img
              src="/logo.png"
              alt="Skana.lv — Skaņas tehnika"
              style={{ height: 40, width: 'auto' }}
            />
          </Link>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            flex: 1,
            justifyContent: 'center',
          }} className="desktop-nav">
            {NAV_LINKS.map(link => {
              const target = isServiceRoute && link.href.startsWith('#') ? `/${link.href}` : link.href
              return link.href.startsWith('#') && isServiceRoute ? (
                <Link
                  key={link.label}
                  to={target}
                  onClick={handleLinkClick}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'color var(--transition)',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={target}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'color var(--transition)',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                  {link.label}
                </a>
              )
            })}

            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: dropdownOpen ? 'var(--green-light)' : 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                letterSpacing: '0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'color var(--transition)',
              }}
              aria-label="Tehnika un aprīkojuma pakalpojumi"
              aria-expanded={dropdownOpen}
              >
                Tehnika
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s',
                }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: 2,
                  background: 'var(--bg-raised)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  minWidth: 180,
                  animation: 'fadeIn 0.15s ease',
                }}>
                  {RENTAL_LINKS.map(link => (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={handleLinkClick}
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        padding: '0.6rem 0.875rem',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'all var(--transition)',
                        letterSpacing: '0.02em',
                      }}
                      onMouseEnter={e => {
                        e.target.style.color = 'var(--text-primary)'
                        e.target.style.background = 'var(--bg-hover)'
                      }}
                      onMouseLeave={e => {
                        e.target.style.color = 'var(--text-secondary)'
                        e.target.style.background = 'transparent'
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {isServiceRoute ? (
            <Link
              to="/#kontakti"
              className="desktop-nav"
              onClick={handleLinkClick}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: '#080808',
                background: 'var(--green)',
                textDecoration: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-sm)',
                letterSpacing: '0.03em',
                transition: 'background var(--transition)',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => e.target.style.background = 'var(--green-light)'}
              onMouseLeave={e => e.target.style.background = 'var(--green)'}
            >
              Sazināties
            </Link>
          ) : (
            <a
              href="#kontakti"
              className="desktop-nav"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: '#080808',
                background: 'var(--green)',
                textDecoration: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-sm)',
                letterSpacing: '0.03em',
                transition: 'background var(--transition)',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => e.target.style.background = 'var(--green-light)'}
              onMouseLeave={e => e.target.style.background = 'var(--green)'}
            >
              Sazināties
            </a>
          )}

          <button
            className="mobile-nav"
            onClick={() => setMobileOpen(v => !v)}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '0.5rem 0.7rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
            aria-label="Izvēlne"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </nav>

        {mobileOpen && (
          <div style={{
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border)',
            padding: '1rem 2rem 1.5rem',
            animation: 'fadeIn 0.2s ease',
          }}>
            {[...NAV_LINKS, ...RENTAL_LINKS].map(link => {
              if (link.href.startsWith('/services')) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={handleLinkClick}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--border)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {link.label}
                  </Link>
                )
              }

              const target = isServiceRoute && link.href.startsWith('#') ? `/${link.href}` : link.href
              return link.href.startsWith('#') && isServiceRoute ? (
                <Link
                  key={link.label}
                  to={target}
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid var(--border)',
                    letterSpacing: '0.03em',
                  }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={target}
                  onClick={handleLinkClick}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid var(--border)',
                    letterSpacing: '0.03em',
                  }}
                >
                  {link.label}
                </a>
              )
            })}
            {isServiceRoute ? (
              <Link
                to="/#kontakti"
                onClick={handleLinkClick}
                style={{
                  display: 'block',
                  marginTop: '1rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#080808',
                  background: 'var(--green)',
                  textDecoration: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  letterSpacing: '0.03em',
                }}
              >
                Sazināties
              </Link>
            ) : (
              <a
                href="#kontakti"
                onClick={handleLinkClick}
                style={{
                  display: 'block',
                  marginTop: '1rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#080808',
                  background: 'var(--green)',
                  textDecoration: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  letterSpacing: '0.03em',
                }}
              >
                Sazināties
              </a>
            )}
          </div>
        )}
      </header>

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-nav { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: block !important; }
        }
      `}</style>
    </>
  )
}
