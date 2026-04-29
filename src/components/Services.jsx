import { Link } from 'react-router-dom'
import { SERVICES } from '../data/services'

function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: 'var(--bg-surface)',
          border: `1px solid ${service.accent || 'var(--border)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          cursor: 'pointer',
          transition: 'all var(--transition)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 220,
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--border-hover)'
          e.currentTarget.style.background = 'var(--bg-raised)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = service.accent || 'var(--border)'
          e.currentTarget.style.background = 'var(--bg-surface)'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: service.accent,
        }} />

        <div style={{
          width: 44,
          height: 44,
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-hover)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: service.accent,
          marginBottom: '1.25rem',
          flexShrink: 0,
        }}>
          {service.icon}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'var(--text-primary)',
          marginBottom: '0.4rem',
          letterSpacing: '-0.01em',
        }}>
          {service.title}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1.25rem',
          flexGrow: 1,
        }}>
          {service.short}
        </p>

        <div style={{
          marginTop: 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          color: service.accent,
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.85rem',
        }}>
          Skatīt aprīkojumu →
        </div>
      </div>
    </Link>
  )
}

export default function Services() {
  return (
    <section id="pakalpojumi" style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: '3.5rem' }}>
        <div className="section-tag">Pakalpojumi</div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          lineHeight: 1.1,
        }}>
          Viss nepieciešamais<br />vienuviet.
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          maxWidth: 500,
          lineHeight: 1.7,
        }}>
          No skatuves konstrukcijām līdz skaņas inženierijai — katrs pakalpojums tagad atver atsevišķu lappusi ar aprīkojuma kategorijām un cita veida aprīkojuma saistītajiem risinājumiem.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem',
      }}>
        {SERVICES.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}
