import { C } from '../tokens'

export function Ornament({ dim = false }: { dim?: boolean }) {
  const color = dim ? C.dim : C.border
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color }}>
      <div style={{ flex: 1, height: '1px', background: color }} />
      <span style={{ fontSize: '10px' }}>✦</span>
      <div style={{ flex: 1, height: '1px', background: color }} />
    </div>
  )
}
