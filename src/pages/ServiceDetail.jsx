import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { SERVICES } from '../data/services'

const CATEGORY_LABELS = {
  sound: 'Skaņas sistēmas',
  microphones: 'Mikrofoni',
  mixers: 'Skaņas pultis',
  instruments: 'Mūzikas instrumenti',
  wireless: 'Bezvadu sistēmas',
  djEquipment: 'DJ aparatūra',
  audioAccessories: 'Audio palīglīdzekļi',
  lighting: 'Pamatgaismas',
  controllers: 'Gaismu vadība',
  trussing: 'Statīvi un fermas',
  ledLights: 'LED gaismas',
  accessories: 'Palīglīdzekļi',
  screens: 'TV ekrāni un LED sienas',
  projectors: 'Projektori',
  stands: 'Statīvi',
  screensAccessories: 'Projekcijas ekrāni',
  stage: 'Skatuves podesti un konstrukcijas',
  djTables: 'DJ darba galdi',
  all: 'Pilns nomas klāsts',
}

export default function ServiceDetail() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const service = SERVICES.find(item => item.id === serviceId)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [serviceId])

  if (!service) {
    return (
      <main style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: 'var(--green)', fontWeight: 700, marginBottom: '0.75rem' }}>
            Pakalpojums nav atrasts
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>
            Atpakaļ uz pakalpojumiem
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem' }}>
            Izvēlies kādu no pakalpojumiem sākumlapā.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            padding: '0.9rem 1.6rem',
            background: 'var(--green)',
            color: '#080808',
            border: 'none',
            borderRadius: '999px',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          Skatīt pakalpojumus
        </button>
      </main>
    )
  }

  const relatedServices = SERVICES.filter(item => item.id !== service.id)

  return (
    <main style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ color: service.accent || 'var(--text-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
            Noma / {service.title}
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', margin: 0, lineHeight: 1.05 }}>
          {service.title}
        </h1>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 760, marginTop: '1.3rem', whiteSpace: 'pre-line' }}>
          {service.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          {service.items?.map(item => (
            <div key={item} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1rem' }}>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>{item}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              padding: '0.9rem 1.6rem',
              background: 'var(--green)',
              border: 'none',
              borderRadius: '999px',
              color: '#080808',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Atpakaļ uz pakalpojumiem
          </button>
          <button
            type="button"
            onClick={() => {
              const target = document.getElementById('related-services')
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            style={{
              padding: '0.9rem 1.6rem',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '999px',
              color: 'var(--text-secondary)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Pārējie pakalpojumi
          </button>
        </div>
      </section>

      {service.equipment && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1rem' }}>Aprīkojums</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Šeit atradīsi konkrēta pakalpojuma aprīkojuma kategorijas un galvenos vienumus.
          </p>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {Object.entries(service.equipment).map(([category, items]) => (
              <div key={category} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  {CATEGORY_LABELS[category] || category}
                </h3>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {items.map((item, index) => (
                    <li key={`${category}-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="related-services" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '1.5rem', padding: '2rem', display: 'grid', gap: '1rem' }}>
        <div>
          <p style={{ margin: 0, color: 'var(--green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
            Saistītie pakalpojumi
          </p>
          <h2 style={{ margin: '0.75rem 0 0', fontFamily: 'var(--font-display)', fontSize: '1.75rem' }}>
            Apskati arī citus risinājumus
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
          {relatedServices.map(item => (
            <Link
              key={item.id}
              to={`/services/${item.id}`}
              style={{
                display: 'block',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '1rem',
                color: 'var(--text-primary)',
                textDecoration: 'none',
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{item.title}</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.short}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
