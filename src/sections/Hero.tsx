import { C, F } from '../tokens'
import { Ornament } from '../ui/Ornament'

export function Hero() {
  return (
    <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      <img
        src="https://images.unsplash.com/photo-1671393332989-fb0ea854a6ed?w=1600&h=1100&fit=crop&auto=format"
        alt="Готический собор в тумане"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 60% 40%, transparent 30%, ${C.bg} 80%), linear-gradient(to top, ${C.bg} 0%, transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${C.bg} 0%, transparent 50%)` }} />

      {/* Watermark */}
      <div style={{ position: 'absolute', right: 'clamp(24px,6vw,80px)', top: '50%', transform: 'translateY(-50%)', fontFamily: F.cinzelDec, fontSize: 'clamp(160px,22vw,320px)', fontWeight: 900, color: 'rgba(196,147,63,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
        I
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(100px,14vh,160px) clamp(24px,4vw,60px) clamp(72px,10vh,120px)', maxWidth: '860px' }}>
        {/* Role badges */}
        <div style={{ marginBottom: '32px' }}>
          <Ornament />
          <div style={{ display: 'flex', gap: '16px', marginTop: '14px', flexWrap: 'wrap' }}>
            {['Product Designer', 'UI / UX Designer', 'Frontend Developer'].map((role) => (
              <span key={role} style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.gold, opacity: 0.85 }}>{role}</span>
            ))}
          </div>
        </div>

        <h1 style={{ fontFamily: F.cinzelDec, fontSize: 'clamp(52px,8vw,110px)', fontWeight: 900, letterSpacing: '0.05em', color: C.text, margin: '0 0 12px', lineHeight: 0.92 }}>
          Проектирую.<br />
          <span style={{ color: C.gold }}>Создаю.</span><br />
          Запускаю.
        </h1>

        <div style={{ fontFamily: F.cinzel, fontSize: 'clamp(9px,1vw,11px)', letterSpacing: '0.35em', color: C.dim, margin: '20px 0 36px' }}>
          ─── DESIGNVM · CODICEMQVE · FACIO ───
        </div>

        <p style={{ fontFamily: F.inter, fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.75, color: C.muted, maxWidth: '480px', margin: '0 0 48px', fontWeight: 300 }}>
          Дизайн и разработка цифровых продуктов — от стартап-платформ до коммерческих сайтов. Сейчас — дизайн и фронтенд в Yanima, аниме-кинотеатр с 4K.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <HeroBtn href="#projects" primary>Посмотреть работы</HeroBtn>
          <HeroBtn href="#contact">Написать мне</HeroBtn>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 'clamp(28px,5vw,64px)', marginTop: '72px', paddingTop: '36px', borderTop: `1px solid ${C.border}` }}>
          {[['20+', 'Проектов сдано'], ['3+', 'Года опыта'], ['2', 'Активных продукта']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: F.cinzelDec, fontSize: 'clamp(26px,3vw,42px)', fontWeight: 900, color: C.gold, lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.dim, marginTop: '6px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroBtn({ href, children, primary }: { href: string; children: string; primary?: boolean }) {
  return (
    <a
      href={href}
      style={{
        padding: '14px 32px',
        background: primary ? C.gold : 'transparent',
        color: primary ? C.bg : C.muted,
        border: primary ? 'none' : `1px solid ${C.border}`,
        fontFamily: F.cinzel,
        fontSize: '9px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'opacity 0.2s',
        display: 'inline-block',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.78')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {children}
    </a>
  )
}
