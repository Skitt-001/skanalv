import { useState, useEffect } from 'react'

const GALLERY_IMAGES = [
    {
    id: 'image-1',
    name: 'IMG_2628',
    width: 800,
    height: 600,
    isVertical: true,
  },
  {
    id: 'image-2',
    name: 'IMG_2839',
    width: 800,
    height: 600,
  },
  {
    id: 'image-3',
    name: 'IMG_3147',
    width: 800,
    height: 600,
  },
  {
    id: 'image-4',
    name: 'IMG_3524',
    width: 800,
    height: 600,
  },
  {
    id: 'image-5',
    name: 'IMG_3559',
    width: 800,
    height: 600,
  },
  {
    id: 'image-6',
    name: 'IMG_4201',
    width: 800,
    height: 600,
  },
  {
    id: 'image-7',
    name: 'IMG_4484',
    width: 800,
    height: 600,
  },
  {
    id: 'image-8',
    name: 'IMG_4794',
    width: 800,
    height: 600,
  },
  {
    id: 'image-9',
    name: 'IMG_4814',
    width: 800,
    height: 600,
  },
  {
    id: 'image-10',
    name: 'IMG_4984',
    width: 800,
    height: 600,
  },
    {
    id: 'image-11',
    name: 'IMG_5056',
    width: 800,
    height: 600,
  },
  {
    id: 'image-12',
    name: 'IMG_5707',
    width: 800,
    height: 600,
  },
    {
    id: 'image-13',
    name: 'IMG_6166',
    width: 800,
    height: 600,
  },
  {
    id: 'image-14',
    name: 'IMG_6474',
    width: 800,
    height: 600,
    isVertical: true,
  },
  {
    id: 'image-15',
    name: 'IMG_6525',
    width: 800,
    height: 600,
  },
  {
    id: 'image-16',
    name: 'IMG_7172',
    width: 800,
    height: 600,
  },
  {
    id: 'image-17',
    name: 'IMG_7207',
    width: 800,
    height: 600,
    isVertical: true,
  },
  {
    id: 'image-18',
    name: 'IMG_E6503',
    width: 800,
    height: 600,
  },
  {
    id: 'image-19',
    name: 'IMG_E6594',
    width: 800,
    height: 600,
  },
  {
    id: 'image-20',
    name: 'IMG_E9003',
    width: 800,
    height: 600,
    isVertical: true,
  },
  {
    id: 'image-21',
    name: 'MGXI6214',
    width: 800,
    height: 600,
    isVertical: true,
  },
]

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    function onKeyDown(event) {
      if (activeIndex === null) return
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current === null ? null : (current + 1) % GALLERY_IMAGES.length))
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => {
          if (current === null) return null
          return (current - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        })
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex])

  function openLightbox(index) {
    setActiveIndex(index)
  }

  function closeLightbox() {
    setActiveIndex(null)
  }

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null) return null
      return (current - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    })
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null) return null
      return (current + 1) % GALLERY_IMAGES.length
    })
  }

  return (
    <section id="galerija" style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div style={{ maxWidth: 640 }}>
          <div className="section-tag">Galerija</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}>
            Galerija
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
          }}>
            Bijušie pasākumi
          </p>
        </div>
      </div>

      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          alignItems: 'stretch',
        }}>
          {(isExpanded ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, isMobile ? 3 : 6)).map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => openLightbox(index)}
              aria-label={`Open image ${index + 1}`}
              style={{
                border: 'none',
                padding: 0,
                background: 'none',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <div style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-hover)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%',
              }}>
                <div style={{ width: '100%', minHeight: image.isVertical ? 160 : 220, overflow: 'hidden' }}>
                  <picture>
                    <source
                      srcSet={`/gallery/${image.name}-sm.avif 480w, /gallery/${image.name}-md.avif 768w, /gallery/${image.name}-lg.avif 1200w`}
                      type="image/avif"
                    />
                    <source
                      srcSet={`/gallery/${image.name}-sm.webp 480w, /gallery/${image.name}-md.webp 768w, /gallery/${image.name}-lg.webp 1200w`}
                      type="image/webp"
                    />
                    <img
                      src={`/gallery/${image.name}-md.jpg`}
                      srcSet={`/gallery/${image.name}-sm.jpg 480w, /gallery/${image.name}-md.jpg 768w, /gallery/${image.name}-lg.jpg 1200w`}
                      alt=""
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </picture>
                </div>

              </div>
            </button>
          ))}
        </div>

        {/* Toggle button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--bg-raised)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all var(--transition)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'var(--green-dim)';
              e.target.style.borderColor = 'var(--green)';
              e.target.style.color = 'var(--green)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'var(--bg-raised)';
              e.target.style.borderColor = 'var(--border)';
              e.target.style.color = 'var(--text-primary)';
            }}
          >
            {isExpanded ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
                Rādīt mazāk
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
                Rādīt vairāk ({GALLERY_IMAGES.length - (isMobile ? 3 : 6)} bildes)
              </>
            )}
          </button>
        </div>
      </div>

      {activeIndex !== null && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          background: 'rgba(0, 0, 0, 0.88)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
          onClick={closeLightbox}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1200,
            maxHeight: 'calc(100vh - 3rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous image"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                width: 48,
                height: 48,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              ‹
            </button>
            <div style={{
              width: '100%',
              maxHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <picture>
                <source
                  srcSet={`/gallery/${GALLERY_IMAGES[activeIndex].name}-md.avif, /gallery/${GALLERY_IMAGES[activeIndex].name}-lg.avif 1200w`}
                  type="image/avif"
                />
                <source
                  srcSet={`/gallery/${GALLERY_IMAGES[activeIndex].name}-md.webp, /gallery/${GALLERY_IMAGES[activeIndex].name}-lg.webp 1200w`}
                  type="image/webp"
                />
                <img
                  src={`/gallery/${GALLERY_IMAGES[activeIndex].name}-lg.jpg`}
                  alt=""
                  width={GALLERY_IMAGES[activeIndex].width}
                  height={GALLERY_IMAGES[activeIndex].height}
                  style={{
                    width: '100%',
                    maxHeight: 'calc(100vh - 10rem)',
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-lg)',
                  }}
                />
              </picture>
              <div style={{
                width: '100%',
                maxWidth: 920,
                textAlign: 'center',
                color: 'var(--text-primary)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  margin: 0,
                }}>{GALLERY_IMAGES[activeIndex].alt}</p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}>{GALLERY_IMAGES[activeIndex].caption}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next image"
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                width: 48,
                height: 48,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              ›
            </button>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image gallery"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                border: 'none',
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                width: 40,
                height: 40,
                borderRadius: '50%',
                cursor: 'pointer',
                margin: 8,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

