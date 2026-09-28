import { useState } from 'react'
import { C, F } from '../tokens'

type Props = {
  label: string
  active: boolean
  onClick: () => void
}

export function FilterBtn({ label, active, onClick }: Props) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 18px',
        border: `1px solid ${active ? C.gold : hovered ? C.border : 'rgba(196,147,63,0.12)'}`,
        borderRadius: '1px',
        background: active ? C.gold : 'transparent',
        color: active ? C.bg : hovered ? C.goldLt : C.muted,
        fontFamily: F.cinzel,
        fontSize: '10px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.25s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </button>
  )
}
