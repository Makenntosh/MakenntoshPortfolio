import { useState } from 'react'
import { C, F } from '../tokens'

type Props = {
  label: string
  href: string
}

export function NavLink({ label, href }: Props) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      style={{
        fontFamily: F.cinzel,
        fontSize: '10px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: hovered ? C.goldLt : C.dim,
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  )
}
