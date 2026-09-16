export const C = {
  bg:       '#0C0A07',
  surf:     '#141209',
  card:     '#1C1810',
  gold:     '#C4933F',
  goldLt:   '#E8C06A',
  crimson:  '#8B2E1A',
  text:     '#EDE4CE',
  muted:    'rgba(237,228,206,0.62)',
  dim:      'rgba(237,228,206,0.32)',
  border:   'rgba(196,147,63,0.22)',
  borderHi: 'rgba(196,147,63,0.55)',
} as const

export const F = {
  cinzel:    '"Cinzel", serif',
  cinzelDec: '"Cinzel Decorative", serif',
  playfair:  '"Playfair Display", serif',
  inter:     '"Inter", sans-serif',
} as const

export const GoldBar = `linear-gradient(to right, transparent, ${C.gold}, transparent)`
