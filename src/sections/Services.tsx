import { useState } from 'react'
import { C, F } from '../tokens'
import { SERVICES } from '../data/services'
import { SectionLabel } from '../ui/SectionLabel'

export function Services() {
  return (
    <section id="services" style={{ padding: 'clamp(64px,8vw,96px) clamp(24px,4vw,60px)', borderTop: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '50%', top: '-60px', transform: 'translateX(-50%)', fontFamily: F.cinzelDec, fontSize: 'clamp(120px,16vw,220px)', fontWeight: 900, color: 'rgba(196,147,63,0.035)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap' }}>III</div>

      <SectionLabel la="Artes Meae" ru="Услуги" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1px', background: C.border }}>
        {SERVICES.map((s) => (
          <ServicePillar key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}

function ServicePillar({ numeral, label, desc }: { numeral: string; label: string; desc: string }) {
  const [h, setH] = useState(false)
  return (
    <div
      style={{
        background: h ? C.card : C.surf,
        padding: 'clamp(32px,4vw,48px) clamp(24px,3vw,36px)',
        borderTop: `2px solid ${h ? C.gold : C.border}`,
        transition: 'background 0.25s, border-color 0.25s',
        cursor: 'default',
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {/* Capital */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ height: '1px', background: h ? C.borderHi : C.border, transition: 'background 0.25s' }} />
        <div style={{ height: '1px', width: '60%', background: h ? C.borderHi : C.border, transition: 'background 0.25s' }} />
      </div>

      <div style={{ fontFamily: F.cinzelDec, fontSize: 'clamp(28px,3vw,38px)', fontWeight: 900, color: h ? C.gold : 'rgba(196,147,63,0.35)', lineHeight: 1, transition: 'color 0.25s' }}>
        {numeral}
      </div>

      <h3 style={{ fontFamily: F.cinzel, fontSize: '12px', fontWeight: 700, color: C.text, margin: 0, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</h3>
      <p style={{ fontFamily: F.inter, fontSize: '14px', color: C.muted, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{desc}</p>

      {/* Base */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ height: '1px', width: '60%', background: h ? C.borderHi : C.border, transition: 'background 0.25s' }} />
        <div style={{ height: '1px', background: h ? C.borderHi : C.border, transition: 'background 0.25s' }} />
      </div>
    </div>
  )
}
