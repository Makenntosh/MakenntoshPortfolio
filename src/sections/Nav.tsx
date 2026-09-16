import { useState, useEffect } from 'react'
import { C, F } from '../tokens'
import { NavLink } from '../ui/NavLink'

const NAV_LINKS = [
  { label: 'Проекты',   href: '#projects'  },
  { label: 'Услуги',    href: '#services'  },
  { label: 'Обо мне',  href: '#about'     },
  { label: 'Контакты', href: '#contact'   },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 clamp(24px,4vw,60px)',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(12,10,7,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
        transition: 'all 0.4s ease',
      }}
    >
      <a href="#" style={{ fontFamily: F.cinzelDec, fontSize: '18px', fontWeight: 900, letterSpacing: '0.1em', color: C.gold, textDecoration: 'none' }}>
        A · V
      </a>

      <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
        {NAV_LINKS.map((l) => (
          <NavLink key={l.href} label={l.label} href={l.href} />
        ))}
        <HireBtn />
      </div>
    </nav>
  )
}

function HireBtn() {
  const [h, setH] = useState(false)
  return (
    <a
      href="#contact"
      style={{
        padding: '7px 20px',
        border: `1px solid ${C.gold}`,
        color: h ? C.bg : C.gold,
        background: h ? C.gold : 'transparent',
        fontFamily: F.cinzel,
        fontSize: '9px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'all 0.25s',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      Нанять меня
    </a>
  )
}
