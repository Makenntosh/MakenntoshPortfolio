export type Service = {
  numeral: string
  label: string
  desc: string
}

export const SERVICES: Service[] = [
  {
    numeral: 'I',
    label: 'Продукт Дизайн',
    desc: 'Исследования, прототипы, UX-аудит и готовый к производству UI — с нуля до запуска.',
  },
  {
    numeral: 'II',
    label: 'UI / UX Дизайн',
    desc: 'Дизайн-системы в Figma, интерактивные прототипы и интерфейсы, ориентированные на конверсию.',
  },
  {
    numeral: 'III',
    label: 'Frontend Разработка',
    desc: 'React, NextJs, TypeScript, Tailwind — production-ready код по вашим макетам или с нуля.',
  },
  {
    numeral: 'IV',
    label: 'Лендинги',
    desc: 'Быстрые, красивые страницы для маркетинговых кампаний и лидогенерации.',
  },
]
