import { useState } from 'react'
import { C, F } from '../tokens'
import { PROJECTS } from '../data/projects'
import { SectionLabel } from '../ui/SectionLabel'
import { Ornament } from '../ui/Ornament'
import { Arch } from '../ui/Arch'
import { GoldBarEl } from '../ui/GoldBar'


type Props = {
  onOpen: (id: number) => void
}

export function FeaturedProject({ onOpen }: Props) {
  const p = PROJECTS.find((x) => x.featured)!
  return (
    <section style={{ padding: 'clamp(72px,8vw,100px) clamp(24px,4vw,60px)', borderTop: `1px solid ${C.border}` }}>
      <SectionLabel la="Opus Praeclarum" ru="Главный проект" />

      <div style={{ background: C.surf, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        <GoldBarEl />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {/* Image */}
          <div style={{ position: 'relative', minHeight: '380px', background: C.card, overflow: 'hidden' }}>
            <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.5, position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 50%, ${C.surf}), linear-gradient(to top, ${C.surf} 0%, transparent 60%)` }} />
            <div style={{ position: 'absolute', top: '28px', left: '28px', padding: '5px 14px', border: `1px solid rgba(139,46,26,0.7)`, color: '#C4624E', fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.25em', background: 'rgba(139,46,26,0.15)' }}>
              IV·K · PLATFORM
            </div>
          </div>

          {/* Text */}
          <div style={{ padding: 'clamp(36px,5vw,60px) clamp(28px,4vw,52px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '22px' }}>
            <div>
              <Arch width={56} height={28} color={C.border} />
              <div style={{ marginTop: '14px', fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.3em', color: C.muted }}>{p.year}</div>
            </div>

            <h2 style={{ fontFamily: F.cinzelDec, fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, color: C.text, margin: 0, letterSpacing: '0.04em', lineHeight: 1.05 }}>
              {p.title}
            </h2>

            <Ornament dim />

            <p style={{ fontFamily: F.inter, fontSize: '15px', lineHeight: 1.75, color: C.muted, margin: 0, fontWeight: 300 }}>
              {p.brief}
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {p.tags.map((tag) => (
                <span key={tag} style={{ padding: '3px 10px', border: `1px solid ${C.borderHi}`, fontFamily: F.cinzel, fontSize: '8px', letterSpacing: '0.2em', color: C.gold, textTransform: 'uppercase' }}>{tag}</span>
              ))}
            </div>

            <OpenBtn onClick={() => onOpen(p.id)} />
          </div>
        </div>
        <GoldBarEl />
      </div>
    </section>
  )
}

function OpenBtn({ onClick }: { onClick: () => void }) {
  const [h, setH] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: '12px 28px',
        background: h ? C.gold : 'transparent',
        color: h ? C.bg : C.gold,
        border: `1px solid ${C.borderHi}`,
        fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.22em',
        textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.25s',
        alignSelf: 'flex-start',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      Открыть кейс <span style={{ fontSize: '14px' }}>→</span>
    </button>
  )
}
