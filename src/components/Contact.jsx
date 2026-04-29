import { useState } from 'react'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', services: [], honeypot: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [captchaToken, setCaptchaToken] = useState(null)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleServiceChange = e => {
    const { value, checked } = e.target
    setForm(f => ({
      ...f,
      services: checked
        ? [...f.services, value]
        : f.services.filter(s => s !== value)
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    // Rate limiting: prevent submissions faster than every 5 seconds
    const now = Date.now()
    if (now - lastSubmitTime < 5000) {
      setError('Lūdzu, pagaidiet pirms atkārtotas nosūtīšanas.')
      return
    }

    // Honeypot check: if filled, it's likely a bot
    if (form.honeypot) {
      setError('Ziņa netika nosūtīta.')
      return
    }

    if (!captchaToken) {
      setError('Lūdzu, apstipriniet, ka neesat robots.')
      return
    }

    setLoading(true)
    setLastSubmitTime(now)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,           // {{name}}
          email: form.email,         // {{email}}
          phone: form.phone,         // {{phone}}
          service: form.services.join(', '),     // {{service}}
          message: form.message,     // {{message}}
          'g-recaptcha-response': captchaToken, // priekš spam
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)
    } catch (err) {
      setError('Kļūda nosūtot ziņu. Lūdzu mēģiniet vēlreiz.')
      console.error('EmailJS error:', err)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--bg-raised)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    padding: '0.875rem 1rem',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color var(--transition)',
    boxSizing: 'border-box',
  }

  return (
    <section id="kontakti" style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
      <div className="section-tag">Kontakti</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        marginTop: '1rem',
        alignItems: 'start',
      }}>

        {/* Left info */}
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}>
            Sāciet plānot savu<br />pasākumu šodien.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}>
            Aizpildiet formu vai sazinieties tieši. Mēs atbildēsim 24 stundu laikā ar piemērotāko risinājumu jūsu pasākumam.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                ),
                label: 'Tālrunis',
                value: '+371 26186868',
                href: 'tel:+37126186868',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
                label: 'E-pasts',
                value: 'info@skana.lv',
                href: 'mailto:info@skana.lv',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: 'Atrašanās vieta',
                value: 'Vietalvas iela 1, Riga, Latvija',
                href: 'https://www.google.com/maps/search/Vietalvas+iela+1,+Riga,+Latvia',
              },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--green-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--green)',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: 2,
                  }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      transition: 'color var(--transition)',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--green-light)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-primary)',
            marginTop: '2rem',
            fontStyle: 'italic',
            fontWeight: 500,
          }}>
            Pirms dodies pie mums- lūdzu saskaņo ierašanās laiku!
          </p>
          
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'var(--bg-raised)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
          }}>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
            }}>
              Rekvizīti
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              <div><strong style={{ color: 'var(--text-primary)' }}>Eselve SIA</strong></div>
              <div>Reģistrācijas numurs: <strong style={{ color: 'var(--text-primary)' }}>40103940029</strong></div>
              <div>Adrese: <strong style={{ color: 'var(--text-primary)' }}>Tērbatas 55, Rīga, LV-1001</strong></div>
              <div>Banka: <strong style={{ color: 'var(--text-primary)' }}>A/S "Swedbank"</strong></div>
              <div>SWIFT: <strong style={{ color: 'var(--text-primary)' }}>HABALV22</strong></div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', animation: 'fadeUp 0.4s ease' }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--green-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}>
                Paldies! Ziņa nosūtīta.
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}>
                Mēs sazināsimies ar jums 24 stundu laikā.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Honeypot field - hidden from users but visible to bots */}
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />
              {error && (
                <div style={{
                  padding: '0.75rem',
                  background: 'rgba(220, 38, 38, 0.1)',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginBottom: '1rem',
                }}>
                  {error}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: 6,
                  }}>Vārds *</label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jūsu vārds"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--green)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div>
                  <label style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: 6,
                  }}>Tālrunis</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+371 XXXX XXXX"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--green)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: 6,
                }}>E-pasts *</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="epasts@example.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--green)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: 6,
                }}>Pakalpojumi</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { value: 'skana', label: 'Apskaņošana' },
                    { value: 'gaismas', label: 'Gaismu tehnika' },
                    { value: 'video', label: 'Video' },
                    { value: 'skatuve', label: 'Skatuves konstrukcijas' },
                    { value: 'konsultacijas', label: 'Tehniskās konsultācijas' },
                    { value: 'noma', label: 'Aparatūras noma' },
                  ].map(service => (
                    <label key={service.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        name="services"
                        value={service.value}
                        checked={form.services.includes(service.value)}
                        onChange={handleServiceChange}
                        style={{ accentColor: 'var(--green)' }}
                      />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {service.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              
                <label style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: 6,
                }}>Ziņojums *</label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Pastāstiet par savu pasākumu — vietu, datumu, auditorijas lielumu..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                  onFocus={e => e.target.style.borderColor = 'var(--green)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                ></textarea>
              {import.meta.env.VITE_RECAPTCHA_SITE_KEY && (
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={setCaptchaToken}
                />
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  background: loading ? 'var(--text-muted)' : 'var(--green)',
                  color: '#080808',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  letterSpacing: '0.03em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--green-light)' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--green)' }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: 16, height: 16,
                      border: '2px solid #08080840',
                      borderTopColor: '#080808',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    Sūta...
                  </>
                ) : (
                  'Nosūtīt pieprasījumu'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
