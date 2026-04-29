const STEPS = [
  {
    num: '01',
    title: 'Konsultācija',
    desc: 'Pastāstiet par savu pasākumu — vietu, auditoriju un viziju. Iesakām piemērotāko tehnisko risinājumu.',
  },
  {
    num: '02',
    title: 'Plānošana',
    desc: 'Izstrādājam detalizētu tehnisko plānu un piedāvājumu. Pēc vajadzības apmeklējam norises vietu.',
  },
  {
    num: '03',
    title: 'Sagatavošana',
    desc: 'Pārbaudām un sagatavojam visu aprīkojumu. Piegādājam laikā, uzstādām un testējam uz vietas.',
  },
  {
    num: '04',
    title: 'Izpilde',
    desc: 'Mūsu tehniķi nodrošina pilnu pasākuma atbalstu — no sound check līdz aprīkojuma savākšanai.',
  },
]

export default function About() {
  return (
    <>
      {/* Divider line */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, var(--border-hover), transparent)',
        maxWidth: 1200,
        margin: '0 auto 0',
      }} />

      {/* About */}
      <section id="par-mums" style={{
        padding: '6rem 2rem',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* Text side */}
          <div>
            <div className="section-tag">Par mums</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}>
              Pieredze, kas<br />skan cauri gadiem.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '1.25rem',
            }}>
              Stabilitāte, attieksme un pieredze.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}>
              Mūsu noliktavā ir viss tehniski nepieciešamais, lai īstenotu lielisku ideju norisi.
              Mums ir svarīgi, lai tehniskais nodrošinājums būtu drošs, kvalitatīvs un baudāms.

            </p>
                        <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}>
              Skana.lv dibinātājs un vadītājs ir Dainis Kažoks, kurš personīgi uzrauga visus procesus un joprojām rūpējas par ikkatra klienta vēlmju piepildījumu.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}>
              Darbojamies un augam kopš 2004. gada.
            </p>
            

            {/* Value props */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { icon: '✓', text: 'Profesionāla aparatūra no vadošiem ražotājiem' },
                { icon: '✓', text: 'Pieredzējuši tehniķi un skaņu inženieri' },
                { icon: '✓', text: 'Darbs visā Latvijas teritorijā' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{
                    flexShrink: 0,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'var(--green-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--green)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    marginTop: 2,
                  }}>
                    {item.icon}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Process steps */}
          <div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '1.5rem',
            }}>
              Kā mēs strādājam
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    position: 'relative',
                  }}
                >
                  {/* Connector line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'var(--bg-raised)',
                      border: '1px solid var(--border-hover)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      color: 'var(--green)',
                      flexShrink: 0,
                    }}>
                      {step.num}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: 'var(--border)', minHeight: 24 }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < STEPS.length - 1 ? '1.75rem' : 0 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      marginBottom: '0.35rem',
                      marginTop: '0.5rem',
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, var(--border-hover), transparent)',
        maxWidth: 1200,
        margin: '0 auto',
      }} />
    </>
  )
}
