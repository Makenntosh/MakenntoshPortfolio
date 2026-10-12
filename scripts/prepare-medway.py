"""Prepare deterministic WebP previews from the supplied MedWay screenshots.
Requires Pillow. Originals stay untouched in public/MedWay.
"""
from pathlib import Path
from PIL import Image
import json

root = Path(__file__).resolve().parents[1]
source = root / 'public/MedWay'
out = root / 'public/medway'
out.mkdir(parents=True, exist_ok=True)
manifest = []

def export(image, id, file, title, caption, presentation, address=None):
    dimensions = {}
    for suffix, limit in [('preview', 1200), ('detail', 1440)]:
        width = min(limit, image.width)
        im = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        im.save(out / f'{id}-{suffix}.webp', quality=92, method=4)
        dimensions[suffix] = (im.width, im.height)
    asset = dict(id=id, file=file, title=title, caption=caption,
                 width=dimensions['detail'][0], height=dimensions['detail'][1], presentation=presentation)
    if address:
        asset['address'] = address
    manifest.append(asset)

with Image.open(source / 'MedWay.png') as desktop:
    export(desktop, 'medway-desktop', 'MedWay.png', 'Полный desktop-макет', 'Desktop · Полная страница MedWay', 'browser', 'med-way.moscow')
    for id, title, caption, y1, y2 in [
        ('medway-about', 'О клинике', 'О клинике · Фотография и ключевые преимущества', 842, 1582),
        ('medway-services', 'Популярные услуги', 'Услуги · Карточки направлений и стоимости', 1582, 2332),
        ('medway-explanation', 'Информационный блок', 'Информационный блок · Тёмная панель и карточки', 2332, 3239),
        ('medway-benefits', 'Преимущества', 'Преимущества · Сетка карточек с иконками', 3239, 4142),
        ('medway-reviews', 'Отзывы', 'Отзывы · Карточки историй и оценки', 4142, 4796),
        ('medway-prices', 'Прайс-лист', 'Прайс-лист · Список услуг и стоимость', 4796, 5625),
        ('medway-documents', 'Документы', 'Документы · Лицензии в макете сайта', 5625, 6427),
        ('medway-contact', 'Контакты', 'Контакты · Телефон, адрес и область карты', 6427, 7109),
    ]:
        export(desktop.crop((0, y1, desktop.width, y2)), id, 'MedWay.png', title, caption, 'browser', 'med-way.moscow')
    cover = desktop.crop((0, 0, desktop.width, 900))
    cover.resize((1200, 750), Image.Resampling.LANCZOS).save(out / 'cover.webp', quality=92, method=4)

with Image.open(source / 'MedWay - mobile.png') as original:
    # The supplied export has 36 px black gutters outside the 400 px viewport.
    mobile = original.crop((36, 0, 436, original.height))
    export(mobile, 'medway-mobile', 'MedWay - mobile.png', 'Полный mobile-макет', 'Mobile · Полная страница на узком экране', 'phone')
    for id, title, caption, y1, y2 in [
        ('medway-mobile-services', 'Услуги на телефоне', 'Mobile · Вертикальная последовательность карточек', 2082, 4179),
        ('medway-mobile-benefits', 'Преимущества на телефоне', 'Mobile · Карточки преимуществ в одну колонку', 6064, 8087),
        ('medway-mobile-contact', 'Контакты на телефоне', 'Mobile · Контактная информация и область карты', 11986, 12873),
    ]:
        export(mobile.crop((0, y1, mobile.width, y2)), id, 'MedWay - mobile.png', title, caption, 'phone')

(root / 'src/data/medwayManifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(f'{len(manifest)} assets; previews {sum(p.stat().st_size for p in out.glob("*-preview.webp")) / 1024:.0f} KB')
