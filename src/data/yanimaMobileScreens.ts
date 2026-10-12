import type { CaseAsset } from "../components/case-study/types"

// Keep original exports available in the viewer; public URLs respect Vite's base.
const screen = (
  id: string,
  file: string,
  title: string,
  caption: string,
  height = 956,
  width = 440,
): CaseAsset => ({
  id,
  title: `Yanima · ${title}`,
  material: "Мобильное приложение",
  src: `${import.meta.env.BASE_URL}${file.split("/").map(encodeURIComponent).join("/")}`,
  width,
  height,
  ratioLabel: `${width}:${height}`,
  alt: `Мобильное приложение Yanima — ${caption.toLowerCase()}`,
  caption,
  presentation: "phone",
})

export const yanimaMobileScreens: CaseAsset[] = [
  screen(
    "mobile-home",
    "Главная 3.jpg",
    "Главная",
    "Главная · Новые эпизоды и недавние релизы",
  ),
  screen(
    "mobile-catalog",
    "Обзор.jpg",
    "Обзор",
    "Обзор · Популярное и быстрый доступ к разделам",
  ),
  screen(
    "mobile-search",
    "Поиск.jpg",
    "Поиск",
    "Поиск · Результаты и ввод названия",
  ),
  screen(
    "mobile-search-empty",
    "Поиск-1.jpg",
    "Пустая выдача",
    "Поиск · Состояние без результатов",
  ),
  screen(
    "mobile-search-keyboard",
    "Поиск-2.jpg",
    "Поиск с клавиатурой",
    "Поиск · Пустая выдача при вводе",
  ),
  screen(
    "mobile-list",
    "Лист 1 версия.jpg",
    "Список релизов",
    "Релизы · Список с описаниями",
  ),
  screen(
    "mobile-grid",
    "Лист 2 версия.jpg",
    "Сетка релизов",
    "Релизы · Компактная сетка постеров",
  ),
  screen(
    "mobile-filters",
    "Фильтры-2.jpg",
    "Фильтры",
    "Фильтры · Параметры поиска",
    961,
  ),
  screen(
    "mobile-genres",
    "yanima/photo_2_2026-10-12_17-09-17.jpg",
    "Выбор жанров",
    "Фильтры · Поиск и выбор нескольких жанров",
    2560,
    1026,
  ),
  screen(
    "mobile-filter-types",
    "Фильтры.jpg",
    "Тип аниме",
    "Фильтры · Раскрытый список форматов",
    961,
  ),
  screen(
    "mobile-anime",
    "Страница аниме 1.1.jpg",
    "Страница аниме",
    "Тайтл · Описание, эпизоды и связанные аниме",
    1722,
  ),
  screen(
    "mobile-anime-discussion",
    "yanima/photo_2026-10-12_17-25-54.jpg",
    "Обсуждение тайтла",
    "Тайтл · Кадры и комментарии",
    1873,
  ),
  screen(
    "mobile-anime-save",
    "Страница аниме 1.1-1.jpg",
    "Сохранение тайтла",
    "Тайтл · Выбор статуса просмотра",
    1722,
  ),
  screen(
    "seasons-mobile",
    "yanima/photo_2026-10-12_17-24-19 (2).jpg",
    "Сезоны и эпизоды",
    "Просмотр · Выбор сезона и эпизода",
    970,
  ),
  screen(
    "mobile-calendar",
    "Расписание.jpg",
    "Расписание",
    "Расписание · Релизы по дням недели",
  ),
  screen(
    "mobile-bookmarks",
    "Закладки.jpg",
    "Закладки",
    "Закладки · Коллекции и сортировка",
  ),
  screen(
    "mobile-profile",
    "Профиль.jpg",
    "Профиль",
    "Профиль · Статистика и история просмотра",
    1460,
  ),
  screen(
    "mobile-profile-empty",
    "Профиль-1.jpg",
    "Профиль без комментариев",
    "Профиль · Пустое состояние комментариев",
    1522,
  ),
  screen(
    "settings-mobile",
    "Настройки.jpg",
    "Настройки",
    "Настройки · Аккаунт и подключённые сервисы",
    1569,
  ),
]

export const yanimaShowcaseIds = [
  "mobile-catalog",
  "mobile-home",
  "mobile-anime",
]
export const yanimaShowcaseScreens = yanimaShowcaseIds.map(
  (id) => yanimaMobileScreens.find((screen) => screen.id === id)!,
)
