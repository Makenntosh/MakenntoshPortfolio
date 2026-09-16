import { C, F } from '../tokens'
import { SectionLabel } from '../ui/SectionLabel'
import { Ornament } from '../ui/Ornament'
import { GoldBarEl } from '../ui/GoldBar'

const STACK = ['Figma', 'React', 'TypeScript', 'Tailwind', 'Next.js', 'Framer', 'Vite', 'Node.js']

export function About() {
  return (
    <section id="about" style={{ padding: 'clamp(64px,8vw,96px) clamp(24px,4vw,60px)', borderTop: `1px solid ${C.border}`, position: 'relative' }}>
      <div style={{ position: 'absolute', right: 'clamp(24px,4vw,60px)', top: 0, fontFamily: F.cinzelDec, fontSize: 'clamp(100px,14vw,200px)', fontWeight: 900, color: 'rgba(196,147,63,0.035)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>IV</div>

      <SectionLabel la="De Me" ru="Обо мне" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontFamily: F.playfair, fontStyle: 'italic', fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, color: C.text, margin: '0 0 28px', lineHeight: 1.2 }}>
            "Делаю вещи,<br />которыми приятно пользоваться."
          </h2>

          <div style={{ marginBottom: '24px' }}><Ornament dim /></div>

          <p style={{ fontFamily: F.inter, fontSize: '16px', lineHeight: 1.8, color: C.muted, margin: '0 0 16px', fontWeight: 300 }}>
            Продакт-дизайнер и фронтенд-разработчик с опытом 3+ года. Запускал коммерческие сайты, SaaS-продукты и мобильные приложения. Сейчас строю AnimaX — стриминг аниме с нативным 4K.
          </p>
          <p style={{ fontFamily: F.inter, fontSize: '16px', lineHeight: 1.8, color: C.muted, margin: '0 0 36px', fontWeight: 300 }}>
            Каждый проект веду от начала до конца: исследование пользователей, прототипы в Figma, дизайн-системы и React-реализация.
          </p>

          <div style={{ marginBottom: '32px' }}><Ornament dim /></div>

          <div>
            <div style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.28em', color: C.dim, textTransform: 'uppercase', marginBottom: '14px' }}>
              Instrumenta · Стек
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {STACK.map((t) => (
                <span key={t} style={{ padding: '4px 10px', border: `1px solid ${C.border}`, fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.15em', color: C.dim }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ border: `1px solid ${C.border}`, overflow: 'hidden' }}>
            <GoldBarEl />
            <img
              src="https://images.unsplash.com/photo-1603644448048-28a7e5122f0a?w=700&h=500&fit=crop&auto=format"
              alt="Неоклассические колонны"
              loading="lazy"
              style={{ width: '100%', height: 'clamp(280px,32vw,420px)', objectFit: 'cover', display: 'block', opacity: 0.55 }}
            />
            <GoldBarEl />
          </div>
          {/* Badge */}
          <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', background: C.gold, padding: '18px 24px', border: `1px solid ${C.card}` }}>
            <div style={{ fontFamily: F.cinzelDec, fontSize: '20px', fontWeight: 900, color: C.bg, lineHeight: 1 }}>Фриланс</div>
            <div style={{ fontFamily: F.cinzel, fontSize: '8px', letterSpacing: '0.22em', color: 'rgba(12,10,7,0.6)', marginTop: '4px', textTransform: 'uppercase' }}>+ Стартап</div>
          </div>
        </div>
      </div>
    </section>
  )
}
