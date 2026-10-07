from pathlib import Path
from PIL import Image
import json, warnings
warnings.simplefilter('ignore', Image.DecompressionBombWarning)
root=Path(__file__).resolve().parents[1]
source=root/'public/web_version'
out=root/'public/yanima/web'
out.mkdir(parents=True,exist_ok=True)
# Stable IDs follow the actual uploaded scenarios.
entries=[
('web-home','Главная.png','Главная','Главная · Рекомендации, новые эпизоды и популярное'),
('search','Поиск.png','Поиск и фильтры','Поиск · Каталог и расширенные параметры'),
('filters','Поиск-1.png','Фильтры и сортировка','Каталог · Раскрытая сортировка выдачи'),
('web-releases','Раскрытый список.png','Популярное','Каталог · Подробная сетка релизов'),
('anime','Страница аниме.png','Страница аниме','Тайтл · Информация, кадры и связанные аниме'),
('player','Пллер.png','Плеер','Плеер · Управление воспроизведением и настройки'),
('web-player-vignette','Пллер (Виньетка).png','Просмотр аниме','Просмотр · Виньетка и элементы управления'),
('web-player-voice','Пллер (выбор озвучки).png','Выбор озвучки','Плеер · Доступные варианты озвучки'),
('player-states','Пллер (ошибка).png','Ошибка плеера','Плеер · Сообщение об ошибке сети'),
('web-player-moment','Пллер (Момент).png','Момент просмотра','Плеер · Действия во время просмотра'),
('seasons-desktop','Пллер (сезоны и эпизоды).png','Сезоны и эпизоды','Просмотр · Сезоны и горизонтальные списки эпизодов'),
('player-episodes','Пллер (сезоны и эпизоды grid + поиск).png','Поиск эпизода','Просмотр · Сетка эпизодов и поиск'),
('web-episodes-scrolled','Пллер (Проскролено. Сезоны и эпизоды grid + поиск).png','Длинный список эпизодов','Просмотр · Сетка после прокрутки'),
('web-watch-together','Пллер (совместный просмотр).png','Совместный просмотр','Совместный просмотр · Участники комнаты'),
('web-watch-chat','Пллер (совместный просмотр; открыт чат).png','Чат комнаты','Совместный просмотр · Открытый чат'),
('web-watch-notifications','Пллер (Уведомления из чата).png','Уведомления чата','Совместный просмотр · Новое сообщение'),
('web-watch-sync','Пллер (Синхронизация отключена).png','Синхронизация','Совместный просмотр · Синхронизация отключена'),
('calendar','Расписание все (выбрано).png','Расписание','Расписание · Все дни недели'),
('web-calendar-day','Расписание выбранный день.png','Выбранный день','Расписание · Релизы выбранного дня'),
('web-profile','Профиль.png','Профиль','Профиль · История, статистика и комментарии'),
('web-profile-alternate','Профиль-1.png','Оформление профиля','Профиль · Другой баннер и аватар'),
('web-profile-lists','Профиль (списки).png','Списки профиля','Профиль · Личная коллекция аниме'),
('web-profile-reply','Профиль (ответ на комментарии + лайк, дизлайк).png','Ответы и реакции','Профиль · Ответ на комментарий и реакции'),
('settings-main','Настройки (Основные параметры).png','Основные настройки','Настройки · Аккаунт и связанные сервисы'),
('settings-customization','Настройки (Настройки профиля).png','Настройки профиля','Настройки · Аватар и выбор баннера'),
('web-settings-banner','Настройки (Настройки профиля)-1.png','Оформление аккаунта','Настройки · Превью баннера профиля'),
('web-settings-notifications','Настройки (Уведомления).png','Настройки уведомлений','Настройки · Общие уведомления и подписки'),
('web-auth','Auth.png','Вход в Yanima','Авторизация · Выбор способа входа'),
('web-auth-options','Auth-1.png','Выбор аккаунта','Авторизация · Выбор аккаунта для регистрации'),
('web-auth-enabled','авторизация с активными соглашениями.png','Соглашения приняты','Авторизация · Активные способы входа'),
('web-auth-disabled','авторизация с неактивными соглашениями.png','Соглашения не приняты','Авторизация · Неактивные способы входа'),
('web-subscription','Подписка.png','Yanima Space','Подписка · Возможности и подключение Space Y'),
]
manifest=[]
for id,file,title,caption in entries:
 with Image.open(source/file) as original:
  original.load()
  sizes={}
  for suffix,width in [('preview',1600),('detail',2560)]:
   width=min(width,original.width)
   im=original.resize((width,round(original.height*width/original.width)),Image.Resampling.LANCZOS)
   if im.mode not in ['RGB','RGBA']: im=im.convert('RGB')
   im.save(out/f'{id}-{suffix}.webp',quality=88,method=4)
   sizes[suffix]=[im.width,im.height]
  manifest.append({'id':id,'file':file,'title':title,'caption':caption,'width':sizes['detail'][0],'height':sizes['detail'][1],'presentation':'browser'})
  print(id,flush=True)
ds=[('system-foundations','Основы визуального языка','Дизайн-система · Палитра и типографика',0,3300),('system-core','Общее ядро','Дизайн-система · Кнопки, иконки, рейтинги и карточки',3300,5600),('system-web','Компоненты Web','Дизайн-система · Навигация, баннеры, поля и плеер',5600,15420),('system-mobile','Компоненты Mobile','Дизайн-система · Компактные варианты компонентов',15420,18260),('system-tv','Направление TV','Дизайн-система · Предложение для TV и состояния фокуса',18260,20850),('system-definitions','Семейства и варианты','Дизайн-система · Основные определения компонентов',20850,27674)]
file='Yanima — каталог дизайн-системы.png'
with Image.open(source/file) as original:
 for id,title,caption,y1,y2 in ds:
  crop=original.crop((0,y1,original.width,y2))
  for suffix,width in [('preview',1000),('detail',1400)]:
   im=crop.resize((width,round(crop.height*width/crop.width)),Image.Resampling.LANCZOS)
   im.save(out/f'{id}-{suffix}.webp',quality=90,method=4)
  manifest.append({'id':id,'file':file,'title':title,'caption':caption,'width':1400,'height':round(crop.height/2),'presentation':'sheet'})
(root/'src/data/yanimaWebManifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('Total preview MB:',sum(p.stat().st_size for p in out.glob('*-preview.webp'))/1024/1024)
print('Total detail MB:',sum(p.stat().st_size for p in out.glob('*-detail.webp'))/1024/1024)
