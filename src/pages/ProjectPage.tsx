import { useState, useEffect } from 'react'
import { C, F, GoldBar } from '../tokens'
import { PROJECTS } from '../data/projects'
import { Ornament } from '../ui/Ornament'
import { GoldBarEl } from '../ui/GoldBar'

type Props = {
  projectId: number
  onBack: () => void
}

export function ProjectPage({ projectId, onBack }: Props) {
  const project = PROJECTS.find((p) => p.id === projectId)
  const [lightbox, setLightbox] = useState<string | null>(null)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [projectId])

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg }}>
        <p style={{ fontFamily: F.cinzel, color: C.muted }}>Проект не найден</p>
      </div>
    )
  }

  const [main, ...rest] = project.gallery

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: F.inter, minHeight: '100vh' }}>

      {/* ── TOP BAR ── */}
      <div className="project-topbar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(24px,4vw,60px)',
        background: 'rgba(12,10,7,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <BackBtn onBack={onBack} />
        <span style={{ fontFamily: F.cinzelDec, fontSize: '15px', fontWeight: 900, color: C.gold, letterSpacing: '0.1em' }}>MAKEnntosh</span>
        <span style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.22em', color: C.muted, textTransform: 'uppercase' }}>
          {project.type === 'startup' ? 'Стартап' : project.type === 'design' ? 'Дизайн' : project.type === 'dev' ? 'Frontend' : 'Фриланс'}
        </span>
      </div>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: 'clamp(420px,60vh,680px)', overflow: 'hidden', background: C.card }}>
        <img
          src={main}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.45 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.bg} 0%, rgba(12,10,7,0.4) 50%, transparent 100%)` }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${C.bg} 0%, transparent 40%)` }} />

        {/* Watermark */}
        <div style={{ position: 'absolute', right: 'clamp(24px,5vw,60px)', bottom: '20px', fontFamily: F.cinzelDec, fontSize: 'clamp(80px,12vw,160px)', fontWeight: 900, color: 'rgba(196,147,63,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
          {project.id.toString().padStart(2, '0')}
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(28px,4vw,52px) clamp(24px,4vw,60px)' }}>
          <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{ padding: '3px 10px', border: `1px solid ${C.borderHi}`, fontFamily: F.cinzel, fontSize: '8px', letterSpacing: '0.2em', color: C.gold, textTransform: 'uppercase' }}>{tag}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: F.cinzelDec, fontSize: 'clamp(36px,6vw,80px)', fontWeight: 900, color: C.text, margin: '0 0 8px', letterSpacing: '0.04em', lineHeight: 1 }}>
            {project.title}
          </h1>
          <p style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.28em', color: C.muted }}>{project.year}</p>
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      <section style={{ padding: 'clamp(56px,7vw,80px) clamp(24px,4vw,60px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(36px,6vw,80px)', maxWidth: '1100px' }}>
          {/* Brief */}
          <div>
            <div style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.28em', color: C.gold, textTransform: 'uppercase', marginBottom: '16px' }}>О проекте</div>
            <p style={{ fontFamily: F.inter, fontSize: '17px', lineHeight: 1.82, color: C.muted, margin: 0, fontWeight: 300 }}>{project.brief}</p>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Перейти на сайт ${project.title} (в новой вкладке)`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  marginTop: '24px', padding: '14px 24px',
                  border: `1px solid ${C.gold}`, color: C.gold,
                  fontFamily: F.cinzel, fontSize: '10px', letterSpacing: '0.18em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  transition: 'background 0.25s, color 0.25s',
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = C.gold
                  event.currentTarget.style.color = C.bg
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = 'transparent'
                  event.currentTarget.style.color = C.gold
                }}
              >
                Перейти на сайт <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          {/* Challenge + Result */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <div style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.28em', color: C.gold, textTransform: 'uppercase', marginBottom: '12px' }}>Задача</div>
              <p style={{ fontFamily: F.inter, fontSize: '15px', lineHeight: 1.78, color: C.muted, margin: 0, fontWeight: 300 }}>{project.challenge}</p>
            </div>
            <div>
              <div style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.28em', color: C.gold, textTransform: 'uppercase', marginBottom: '12px' }}>Результат</div>
              <p style={{ fontFamily: F.inter, fontSize: '15px', lineHeight: 1.78, color: C.muted, margin: 0, fontWeight: 300 }}>{project.result}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ padding: '0 clamp(24px,4vw,60px)' }}>
        <div style={{ height: '2px', background: GoldBar }} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
          <span style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.3em', color: C.muted, textTransform: 'uppercase' }}>Скриншоты · Gallery</span>
        </div>
        <div style={{ height: '2px', background: GoldBar }} />
      </div>

      {/* ── GALLERY ── */}
      <section style={{ padding: 'clamp(40px,6vw,64px) clamp(24px,4vw,60px)' }}>
        {/* Main screenshot — full width */}
        <GalleryImage src={main} alt={`${project.title} — главный скриншот`} onExpand={setLightbox} fullWidth />

        {/* Rest in grid */}
        {rest.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: rest.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginTop: '12px' }}>
            {rest.map((src, i) => (
              <GalleryImage key={i} src={src} alt={`${project.title} — скриншот ${i + 2}`} onExpand={setLightbox} />
            ))}
          </div>
        )}

        <p style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.18em', color: C.muted, textAlign: 'center', marginTop: '20px', textTransform: 'uppercase' }}>
          ✦ Кликните по изображению для увеличения ✦
        </p>
      </section>

      {/* ── BACK ── */}
      <div style={{ padding: 'clamp(32px,5vw,56px) clamp(24px,4vw,60px)', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'center' }}>
        <Ornament />
      </div>
      <div style={{ padding: '0 clamp(24px,4vw,60px) clamp(56px,7vw,80px)', display: 'flex', justifyContent: 'center' }}>
        <BackBtn onBack={onBack} large />
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(12,10,7,0.97)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out',
          }}
          onClick={() => setLightbox(null)}
        >
          {/* Gold border frame */}
          <div style={{ position: 'relative', maxWidth: '94vw', maxHeight: '90vh' }}>
            <GoldBarEl />
            <img
              src={lightbox.startsWith('http') ? lightbox.replace(/w=\d+/, 'w=1600').replace(/h=\d+/, 'h=1000') : lightbox}
              alt="Увеличенный скриншот"
              style={{ display: 'block', maxWidth: '94vw', maxHeight: 'calc(90vh - 4px)', objectFit: 'contain' }}
              onClick={(e) => e.stopPropagation()}
            />
            <GoldBarEl />
          </div>
          {/* Close hint */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: '24px', right: '24px',
              background: 'transparent', border: `1px solid ${C.border}`,
              color: C.muted, fontFamily: F.cinzel, fontSize: '9px',
              letterSpacing: '0.22em', padding: '6px 14px', cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted }}
          >
            ESC · Закрыть
          </button>
        </div>
      )}
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function GalleryImage({ src, alt, onExpand, fullWidth }: { src: string; alt: string; onExpand: (src: string) => void; fullWidth?: boolean }) {
  const [h, setH] = useState(false)
  return (
    <div
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'zoom-in',
        border: `1px solid ${h ? C.borderHi : C.border}`,
        transition: 'border-color 0.25s',
        background: C.card,
        marginBottom: fullWidth ? '0' : undefined,
        height: fullWidth ? 'clamp(280px,42vw,560px)' : 'clamp(200px,24vw,340px)',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={() => onExpand(src)}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: h ? 0.85 : 0.65, transition: 'opacity 0.35s, transform 0.5s', transform: h ? 'scale(1.03)' : 'scale(1)' }}
      />
      {/* Zoom icon */}
      {h && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.22em', color: C.gold, textTransform: 'uppercase', background: 'rgba(12,10,7,0.7)', padding: '8px 16px', border: `1px solid ${C.border}` }}>
          Увеличить ✦
        </div>
      )}
    </div>
  )
}

function BackBtn({ onBack, large }: { onBack: () => void; large?: boolean }) {
  const [h, setH] = useState(false)
  return (
    <button
      onClick={onBack}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: large ? '14px 36px' : '7px 18px',
        background: h ? C.gold : 'transparent',
        color: h ? C.bg : C.gold,
        border: `1px solid ${h ? C.gold : C.borderHi}`,
        fontFamily: F.cinzel,
        fontSize: large ? '10px' : '9px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.25s',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      ← {large ? 'Вернуться ко всем работам' : 'Все проекты'}
    </button>
  )
}
