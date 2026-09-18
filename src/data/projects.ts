import yanimaImg       from '../imports/image.png'
import mdrImg           from '../imports/MDR.png'
import perfumeModeImg   from '../imports/Perfume_mode.png'
import trackerImg       from '../imports/_________________.png'
import medwayImg        from '../imports/image-1.png'
import vremyaImg        from '../imports/image-2.png'

export type ProjectType = 'startup' | 'freelance' | 'design' | 'dev'

export type Project = {
  id: number
  title: string
  year: string
  type: ProjectType
  tags: string[]
  image: string
  gallery: string[]
  brief: string
  challenge: string
  result: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Yanima',
    year: 'MMXXIV – н.в.',
    type: 'startup',
    tags: ['Product Design', 'Frontend', 'Mobile', 'UI/UX'],
    image: yanimaImg,
    gallery: [yanimaImg, yanimaImg, yanimaImg],
    brief:
      'Современная платформа для просмотра аниме. Курировал всю визуальную часть от идеи до выпуска и продолжаю работу по сей день. Разработал сайт с адаптивом, мобильное приложение и административную панель. Проводил UX-интервью и опросы пользователей для улучшения продукта.',
    challenge:
      'Создать цельный визуальный язык для аниме-платформы, конкурирующей с крупными сервисами. Выстроить удобную навигацию по большому каталогу с персонализацией и сохранить узнаваемость бренда на всех платформах — web, mobile, admin.',
    result:
      'Платформа запущена и показывает сильные результаты. Пользователи отмечают интуитивность интерфейса. Продукт продолжает развиваться — регулярно выходят новые фичи по результатам UX-исследований.',
    featured: true,
  },
  {
    id: 2,
    title: 'Harsa Media Group',
    year: 'MMXXIV',
    type: 'design',
    tags: ['UI/UX', 'Web Design', 'Figma'],
    image: 'HMG_Preview.png',
    gallery: [
      'HMG_Preview.png',
    ],
    brief:
      'Разработал дизайн сайта для профессиональной съёмочной команды, специализирующейся на монтаже, режиссуре и видеосъёмке.',
    challenge:
      'Передать профессионализм и творческую экспертизу студии через строгий, кинематографичный визуальный язык. Сформировать доверие потенциальных клиентов с первого экрана.',
    result:
      'Готовый дизайн-макет сайта в Figma передан клиенту. Визуальный язык отражает высокий уровень производства и насмотренность команды.',
  },
  {
    id: 3,
    title: 'MedWay',
    year: 'MMXXIV',
    type: 'dev',
    tags: ['Frontend', 'Product Design', 'React', 'TypeScript'],
    image: 'MedWay_preview.png',
    gallery: [
        'MedWay_Preview.png'
    ],
    brief:
      'Дизайн и готовый лендинг под ключ для наркологической клиники. React + TypeScript, адаптивная вёрстка, акцент на доверии и анонимности.',
    challenge:
      'Вызвать доверие в чувствительной теме. Выстроить визуальную иерархию так, чтобы ключевые аргументы — анонимность, лицензия, статистика — считывались за секунды. Избежать клинической холодности и агрессивной рекламности.',
    result:
      'Лендинг сдан клиенту и работает. Структура страницы с цифрами (2 400+ пациентов, 93% ремиссия) и чёткими призывами к действию обеспечивает конверсию в звонки.',
  },
  {
    id: 4,
    title: 'Время заботы',
    year: 'MMXXIV',
    type: 'freelance',
    tags: ['Frontend', 'Product Design', 'HTML / CSS'],
    image: 'VremyaZaboty_Preview.png',
    gallery: [
        'VremyaZaboty_Preview.png'
    ],
    brief:
      'Дизайн и готовый лендинг под ключ для пансионата для пожилых людей. HTML, CSS, адаптивная вёрстка. Тёплый, доверительный визуал.',
    challenge:
      'Аудитория — взрослые дети, выбирающие уход для родителей. Нужно было передать тепло, безопасность и домашнюю атмосферу через интерфейс, избегая казённого медицинского стиля.',
    result:
      'Сайт запущен. Мягкая цветовая палитра, живые фотографии пансионата и читаемые блоки преимуществ создают нужное эмоциональное впечатление.',
  },
  {
    id: 5,
    title: 'Perfume Mode',
    year: 'MMXXIII',
    type: 'design',
    tags: ['Product Design', 'UI/UX', 'E-Commerce'],
    image: perfumeModeImg,
    gallery: [perfumeModeImg],
    brief:
      'Разработал дизайн интернет-магазина для премиального парфюмерного бренда. Редакционная фотография, крупная типографика, ощущение роскоши на каждом экране.',
    challenge:
      'Создать ощущение элитности и исключительности через интерфейс. Найти баланс между красивой имиджевой подачей и удобством выбора и покупки товара.',
    result:
      'Готовый дизайн-макет магазина. Визуальный язык — "editorial luxury" — соответствует позиционированию и выделяет бренд среди конкурентов.',
  },
  {
    id: 6,
    title: 'Трекер активности',
    year: 'MMXXIII',
    type: 'design',
    tags: ['Product Design', 'Mobile UI', 'Дизайн-система'],
    image: 'Traker_Preview.png',
    gallery: [
        'Traker_Preview.png'
    ],
    brief:
      'Разработал дизайн-систему для мобильного трекера активности — 20+ экранов. Тёмная тема, кольца прогресса, дашборд здоровья.',
    challenge:
      'Сделать ежедневный трекинг активности мотивирующим и наглядным. Разработать масштабируемую дизайн-систему, которая покрывает все состояния и экраны приложения.',
    result:
      'Готовая дизайн-система из 20+ экранов. Консистентный визуальный язык на тёмной подложке с фиолетовыми акцентами и кольцами прогресса.',
  },
  {
    id: 7,
    title: 'MDR Drones',
    year: 'MMXXIII',
    type: 'design',
    tags: ['Product Design', 'UI/UX', 'E-Commerce'],
    image: mdrImg,
    gallery: [mdrImg],
    brief:
      'Разработал дизайн интернет-магазина дронов. Тёмная тема, 3D-визуализация моделей, каталог из 53+ позиций.',
    challenge:
      'Сложный технический продукт подать визуально выигрышно. Сделать каталог с большим числом моделей удобным для навигации, не теряя в эстетике.',
    result:
      'Готовый дизайн-макет с главной страницей, каталогом и продуктовыми карточками. Тёмный, технологичный стиль подчёркивает инженерное превосходство продукта.',
  },
]

export const FILTER_OPTIONS = ['Все', 'Стартап', 'Дизайн', 'Frontend', 'Фриланс'] as const
export type FilterOption = (typeof FILTER_OPTIONS)[number]

export function filterProjects(projects: Project[], filter: FilterOption): Project[] {
  if (filter === 'Все') return projects
  const map: Record<FilterOption, ProjectType | null> = {
    'Все':      null,
    'Стартап':  'startup',
    'Дизайн':   'design',
    'Frontend': 'dev',
    'Фриланс':  'freelance',
  }
  return projects.filter((p) => p.type === map[filter])
}
