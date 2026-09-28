import { C, F } from '../tokens'
import { Ornament } from '../ui/Ornament'

export function Footer() {
  return (
    <footer style={{ padding: '32px clamp(24px,4vw,60px)', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
      <span style={{ fontFamily: F.cinzelDec, fontSize: '18px', fontWeight: 900, color: C.gold, letterSpacing: '0.1em' }}>MAKEnntosh</span>
      <div style={{ textAlign: 'center', flex: 1, padding: '0 24px' }}>
        <Ornament dim />
        <div style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.22em', color: C.muted, textTransform: 'uppercase', marginTop: '8px' }}>
          Продакт Дизайнер &amp; Frontend Разработчик · Anno Domini {new Date().getFullYear()}
        </div>
      </div>
      <span style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.15em', color: C.muted }}>Factum cum React</span>
    </footer>
  )
}
