import { useState } from 'react'
import { C, F } from '../tokens'
import { PROJECTS, FILTER_OPTIONS, filterProjects, type FilterOption } from '../data/projects'
import { SectionLabel } from '../ui/SectionLabel'
import { FilterBtn } from '../ui/FilterBtn'
import { Arch } from '../ui/Arch'

type Props = {
  onOpen: (id: number) => void
}

export function ProjectsGrid({ onOpen }: Props) {
  const [filter, setFilter] = useState<FilterOption>('Все')
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const gridProjects = filterProjects(
    PROJECTS.filter((p) => !p.featured),
    filter,
  )

  return (
    <section id="projects" style={{ padding: 'clamp(64px,8vw,96px) clamp(24px,4vw,60px)', borderTop: `1px solid ${C.border}`, position: 'relative' }}>
      <div style={{ position: 'absolute', right: 'clamp(24px,4vw,60px)', top: 0, fontFamily: F.cinzelDec, fontSize: 'clamp(100px,14vw,200px)', fontWeight: 900, color: 'rgba(196,147,63,0.035)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>II</div>

      <SectionLabel la="Opera Omnia" ru="Все проекты" />

      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '52px' }}>
        {FILTER_OPTIONS.map((f) => (
          <FilterBtn key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      {gridProjects.length === 0 ? (
        <p style={{ textAlign: 'center', fontFamily: F.cinzel, fontSize: '11px', letterSpacing: '0.25em', color: C.muted, padding: '64px 0' }}>
          — NIHIL INVENTUM —
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: C.border }}>
          {gridProjects.map((p) => {
            const isHovered = hoveredId === p.id
            return (
              <article
                key={p.id}
                style={{ background: isHovered ? C.card : C.surf, transition: 'background 0.3s', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onOpen(p.id)}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: C.card }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: isHovered ? 0.62 : 0.45, transition: 'opacity 0.35s, transform 0.5s', transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.surf} 0%, transparent 60%)` }} />
                  {isHovered && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }} />}
                  <span style={{ position: 'absolute', top: '14px', right: '14px', fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.2em', color: C.muted }}>{p.year}</span>
                </div>

                {/* Content */}
                <div style={{ padding: '22px 22px 26px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Arch width={36} height={18} color={isHovered ? C.gold : C.border} />
                  <h3 style={{ fontFamily: F.playfair, fontSize: '21px', fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>{p.title}</h3>
                  <p style={{ fontFamily: F.inter, fontSize: '14px', color: C.muted, lineHeight: 1.65, margin: 0, fontWeight: 300, flex: 1 }}>{p.brief}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {p.tags.map((tag) => (
                      <span key={tag} style={{ padding: '2px 8px', border: `1px solid ${C.border}`, fontFamily: F.cinzel, fontSize: '8px', letterSpacing: '0.18em', color: C.muted, textTransform: 'uppercase' }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.18em', color: isHovered ? C.gold : C.muted, marginTop: '6px', transition: 'color 0.25s' }}>
                    Открыть кейс →
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
