import { useState, useEffect, useRef } from 'react'
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

  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)')
    const close = () => setMenuOpen(false)
    media.addEventListener('change', close)
    return () => media.removeEventListener('change', close)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    fn()
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      aria-label="Основная навигация"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false)
      }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 clamp(24px,4vw,60px)',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled || menuOpen ? 'rgba(12,10,7,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
        transition: 'all 0.4s ease',
      }}
    >
      <a href="#" onClick={() => setMenuOpen(false)} style={{ fontFamily: F.cinzelDec, fontSize: '18px', fontWeight: 900, letterSpacing: '0.1em', color: C.gold, textDecoration: 'none' }}>
        MAKEnntosh
      </a>

      <button
        ref={toggleRef}
        type="button"
        className="nav-toggle"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? 'Закрыть ×' : 'Меню ☰'}
      </button>
      <div
        id="primary-navigation"
        className={menuOpen ? 'nav-links is-open' : 'nav-links'}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('a')) setMenuOpen(false)
        }}
      >
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
