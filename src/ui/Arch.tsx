import { C } from '../tokens'

type Props = {
  color?: string
  width?: number
  height?: number
}

export function Arch({ color = C.border, width = 80, height = 40 }: Props) {
  const r = width / 2
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ display: 'block' }}>
      <path
        d={`M 0 ${height} L 0 ${r} Q ${r} 0 ${width} ${r} L ${width} ${height}`}
        stroke={color}
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}
