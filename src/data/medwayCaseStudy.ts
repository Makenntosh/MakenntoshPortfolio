import type { CaseBlock, CaseStudy } from "../components/case-study/types"
import { PROJECTS } from "./projects"
import { medwayAssets } from "./medwayAssets"
import { medwayDesignSystem } from "./medwayDesignSystem"

const project = PROJECTS.find((project) => project.id === 3)!
const media = (
  layout: Extract<CaseBlock, { type: "media" }>["layout"],
  ...assets: string[]
): CaseBlock => ({ type: "media", layout, assets })

export const medwayCaseStudy: CaseStudy = {
  title: "MedWay",
  subtitle: "Healthcare website / Product Design / Frontend / Desktop & Mobile",
  year: project.year,
  website: project.website,
  seo: {
    title: "MedWay — дизайн и разработка сайта | Никита Гололобов",
    description:
      "Кейс MedWay: дизайн и разработка адаптивного сайта клиники, desktop- и mobile-макеты, визуальная система и интерфейсные компоненты.",
  },
  overview: {
    description:
      "MedWay — сайт клиники, где информация об услугах, преимуществах, документах и способах связи складывается в спокойный, последовательный рассказ. Я разработал дизайн и адаптивный frontend на React и TypeScript.",
    metadata: [
      { label: "Роль", value: "Product Designer / Frontend Developer" },
      {
        label: "Задачи",
        value: "Структура страницы, UI, адаптивный дизайн, frontend",
      },
      { label: "Платформы", value: "Desktop / Mobile Web" },
      { label: "Инструменты", value: "Figma, React, TypeScript" },
    ],
    hero: "medway-desktop",
    showcase: ["medway-desktop", "medway-mobile"],
    showcaseOptions: {
      brand: "MEDWAY",
      label: "HEALTHCARE / RESPONSIVE WEB",
      tagline: "Доверие начинается с ясности.",
      variant: "medway",
    },
    screenSummary: "Desktop + Mobile · Полные макеты и детали интерфейса",
    shortcuts: [
      { target: "desktop", label: "Веб-макет ↓" },
      { target: "design-system", label: "Дизайн-система ↓" },
      { target: "mobile", label: "Мобильная версия ↓" },
    ],
  },
  assets: medwayAssets,
  navigation: [
    { label: "О проекте", target: "overview", sections: ["overview"] },
    { label: "Задача", target: "challenge", sections: ["challenge"] },
    { label: "Desktop", target: "desktop", sections: ["desktop"] },
    { label: "Детали", target: "details", sections: ["details"] },
    { label: "Mobile", target: "mobile", sections: ["mobile"] },
    { label: "Система", target: "design-system", sections: ["design-system"] },
    { label: "Результат", target: "result", sections: ["result"] },
  ],
  sections: [
    {
      id: "challenge",
      number: "02",
      eyebrow: "Context / product challenge",
      title: "Спокойствие, ясность, доверие",
      description: project.challenge,
      blocks: [
        {
          type: "cards",
          variant: "principles",
          items: [
            {
              title: "Понятное предложение",
              text: "Первый экран объясняет направление клиники и делает способ связи заметным. Дополнительная информация поддерживает основной сценарий.",
            },
            {
              title: "Последовательный рассказ",
              text: "О клинике, услуги, преимущества, отзывы, прайс-лист, документы и контакты раскрываются по мере просмотра страницы.",
            },
            {
              title: "Два масштаба интерфейса",
              text: "Desktop использует просторные сетки, а мобильный макет сохраняет порядок разделов и удобные зоны действий в одну колонку.",
            },
          ],
        },
        {
          type: "flow",
          compact: true,
          label: "Структура знакомства с клиникой",
          steps: [
            "Предложение",
            "Услуги",
            "Преимущества",
            "Документы",
            "Контакты",
          ],
        },
      ],
    },
    {
      id: "desktop",
      number: "03",
      eyebrow: "Desktop / complete layout",
      title: "Страница как единая история",
      description:
        "Тёмный первый экран задаёт визуальный акцент. Дальше белые и светло-серые поверхности чередуются, отделяя смысловые блоки и сохраняя читаемый ритм длинной страницы.",
      blocks: [
        media("full", "medway-desktop"),
        {
          type: "caption",
          title: "Полный desktop-макет · 1440 × 7479",
          text: "Нажмите на мокап, чтобы открыть страницу в режиме чтения и прокрутить её целиком. Исходный PNG доступен по ссылке «Оригинал».",
        },
        media("pair", "medway-about", "medway-services"),
        {
          type: "caption",
          title: "Контекст / выбор услуги",
          text: "Фотография клиники и короткие преимущества создают контекст. Карточки услуг объединяют метку, название, стоимость и переход к подробностям.",
        },
      ],
    },
    {
      id: "details",
      number: "04",
      eyebrow: "Interface details / content hierarchy",
      title: "Содержание поддерживает решение",
      description:
        "Для разных типов информации используются повторяющиеся формы: карточки, строки списка, числовые акценты и выделенные панели. Это делает большой объём содержания визуально последовательным.",
      blocks: [
        media("pair", "medway-explanation", "medway-benefits"),
        {
          type: "caption",
          title: "Тёмная панель / светлая сетка",
          text: "Важный информационный блок выделен контрастной поверхностью. Преимущества используют одинаковые карточки с иконкой, заголовком и коротким пояснением.",
        },
        media("pair", "medway-reviews", "medway-prices"),
        {
          type: "caption",
          title: "Отзывы / прайс-лист",
          text: "Отзывы собраны в отдельные карточки. Прайс-лист остаётся компактным: название услуги слева, стоимость справа.",
        },
        media("pair", "medway-documents", "medway-contact"),
        {
          type: "caption",
          title: "Документы / контакты",
          text: "Заключительные разделы дают доступ к документам, телефону и адресу. Область карты сохранена в том виде, в котором она показана в исходном макете.",
        },
      ],
    },
    {
      id: "mobile",
      number: "05",
      eyebrow: "Responsive / mobile web",
      title: "Тот же ритм на маленьком экране",
      description:
        "Мобильный макет перестраивает сетки в вертикальную последовательность. Крупное предложение, кнопки связи, карточки услуг и контактные данные сохраняют заметность на узком экране.",
      blocks: [
        {
          type: "media",
          layout: "pair",
          split: "wide",
          assets: ["medway-desktop", "medway-mobile"],
        },
        {
          type: "caption",
          title: "Desktop → Mobile",
          text: "Полные версии можно открыть и прокрутить. В мобильном превью убраны внешние чёрные поля экспорта; оригинал сохранён без изменений.",
        },
        media(
          "mobile",
          "medway-mobile-services",
          "medway-mobile-benefits",
          "medway-mobile-contact",
        ),
      ],
    },
    {
      id: "design-system",
      number: "06",
      eyebrow: "Foundations / reconstructed from layouts",
      title: "Визуальный язык в системе",
      description:
        "Выделил повторяющиеся решения из двух макетов и оформил их в компактную дизайн-систему. Цвета, шрифтовая пара, интервалы, форма и компоненты связывают светлые разделы с тёмными акцентными блоками.",
      blocks: [{ type: "design-system", system: medwayDesignSystem }],
    },
    {
      id: "result",
      number: "07",
      eyebrow: "Design → frontend / outcome",
      title: "От макета к адаптивному сайту",
      description: project.result,
      blocks: [
        {
          type: "results",
          items: [
            "Разработан дизайн длинной страницы с последовательной структурой разделов.",
            "Подготовлены отдельные desktop- и mobile-макеты.",
            "Сайт реализован на React и TypeScript.",
            "Для кейса собрана визуальная система по макетам: палитра, типографика, геометрия и компоненты.",
          ],
        },
      ],
    },
  ],
}
