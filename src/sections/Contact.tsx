import { useState } from 'react'
import { C, F } from '../tokens'
import { SectionLabel } from '../ui/SectionLabel'
import { Ornament } from '../ui/Ornament'

const CONTACTS = [
  { label: 'Email',    value: 'hello@designer.dev',      href: 'mailto:hello@designer.dev' },
  { label: 'Telegram', value: '@designer_dev',           href: 'https://t.me/designer_dev'  },
  { label: 'Behance',  value: 'behance.net/designer',    href: '#'                          },
  { label: 'GitHub',   value: 'github.com/designer',     href: '#'                          },
]

export function Contact() {
  return (
    <section id="contact" style={{ padding: 'clamp(72px,10vw,120px) clamp(24px,4vw,60px)', borderTop: `1px solid ${C.border}`, position: 'relative' }}>
      <div style={{ position: 'absolute', left: 'clamp(24px,4vw,60px)', top: 0, fontFamily: F.cinzelDec, fontSize: 'clamp(100px,14vw,200px)', fontWeight: 900, color: 'rgba(196,147,63,0.035)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>V</div>

      <SectionLabel la="Epistola" ru="Контакты" />

      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: F.cinzelDec, fontSize: 'clamp(32px,5vw,60px)', fontWeight: 900, color: C.text, margin: '0 0 20px', letterSpacing: '0.04em', lineHeight: 1, textAlign: 'center' }}>
          Collaboremus.
        </h2>
        <p style={{ fontFamily: F.inter, fontWeight: 300, fontSize: '17px', color: C.muted, lineHeight: 1.8, textAlign: 'center', margin: '0 0 52px' }}>
          Открыт для фриланс-проектов, долгосрочного сотрудничества и интересных стартапов. Отвечаю в течение 24 часов.
        </p>

        <Ornament />

        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column' }}>
          {CONTACTS.map((c) => (
            <ContactRow key={c.label} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactRow({ label, value, href }: { label: string; value: string; href: string }) {
  const [h, setH] = useState(false)
  return (
    <a
      href={href}
      style={{ display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none', padding: '18px 0', borderBottom: `1px solid ${C.border}` }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <span style={{ fontFamily: F.cinzel, fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.dim, width: '80px', flexShrink: 0 }}>{label}</span>
      <span style={{ fontFamily: F.inter, fontSize: '17px', color: h ? C.goldLt : C.muted, transition: 'color 0.2s', fontWeight: 400 }}>{value}</span>
      <span style={{ marginLeft: 'auto', color: h ? C.gold : C.dim, transition: 'color 0.2s, transform 0.2s', transform: h ? 'translateX(4px)' : 'translateX(0)', display: 'inline-block', fontSize: '16px' }}>→</span>
    </a>
  )
}
