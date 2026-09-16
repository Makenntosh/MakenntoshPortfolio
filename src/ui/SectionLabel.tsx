import { C, F } from '../tokens'
import { Ornament } from './Ornament'

type Props = {
  ru: string
  la?: string
}

export function SectionLabel({ ru, la }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '52px' }}>
      <Ornament />
      <span style={{ fontFamily: F.cinzel, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.gold, textAlign: 'center', display: 'block' }}>
        {la ? `${la} · ` : ''}{ru}
      </span>
      <Ornament />
    </div>
  )
}
