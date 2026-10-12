import { useState, type CSSProperties } from "react"
import type { DesignSystemSpec } from "./types"
import "./design-system.css"

const states = [
  { id: "default", label: "Обычное" },
  { id: "hover", label: "Наведение" },
  { id: "focus", label: "Фокус" },
  { id: "disabled", label: "Недоступно" },
] as const

function DemoIcon({ name }: { name: "phone" | "shield" | "clock" | "check" }) {
  const paths = {
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9 8 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2c-4-2-5-3-7-7l2-2-2-5Z" />
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 4-5 7-8 9-3-2-8-5-8-9V6l8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

export default function CaseDesignSystem({
  system,
}: {
  system: DesignSystemSpec
}) {
  const [state, setState] = useState<typeof states[number]["id"]>("default")
  const [density, setDensity] = useState<"desktop" | "mobile">("desktop")
  const style = {
    "--ds-heading-font": `"${system.fonts.heading}", serif`,
    "--ds-body-font": `"${system.fonts.body}", sans-serif`,
    "--ds-primary": system.colors.find((color) => color.name === "Teal")?.value,
    "--ds-navy": system.colors.find((color) => color.name === "Navy")?.value,
  } as CSSProperties

  return (
    <div className="design-system" style={style}>
      <div className="ds-cover">
        <div>
          <span className="ds-kicker">VISUAL SYSTEM / RECONSTRUCTED</span>
          <h3>
            {system.brand}
            <span>Design System</span>
          </h3>
        </div>
        <div className="ds-mark" aria-hidden="true">
          +
        </div>
        <p>{system.note}</p>
      </div>

      <section className="ds-section" aria-label="Цветовая палитра">
        <div className="ds-heading">
          <span>01</span>
          <h4>Палитра</h4>
          <p>Тёмная основа. Светлые поверхности. Бирюзовый акцент.</p>
        </div>
        <div className="ds-colors">
          {system.colors.map((color) => (
            <div key={color.name} className="ds-swatch">
              <div style={{ background: color.value }} />
              <strong>{color.name}</strong>
              <code>{color.value}</code>
              <p>{color.role}</p>
            </div>
          ))}
        </div>
        <div className="ds-gradient">
          <span>Navy → Ocean</span>
          <span>Первый экран / информационные панели</span>
        </div>
      </section>

      <section className="ds-section" aria-label="Типографика">
        <div className="ds-heading">
          <span>02</span>
          <h4>Типографика</h4>
          <p>
            {system.fonts.heading} / {system.fonts.body}
          </p>
        </div>
        <div
          className="ds-size-switch"
          role="group"
          aria-label="Размеры типографики"
        >
          <button
            type="button"
            aria-pressed={density === "desktop"}
            onClick={() => setDensity("desktop")}
          >
            Desktop
          </button>
          <button
            type="button"
            aria-pressed={density === "mobile"}
            onClick={() => setDensity("mobile")}
          >
            Mobile
          </button>
        </div>
        <div className="ds-type-scale">
          {system.typography.map((type) => (
            <div key={type.label} className="ds-type-row">
              <div>
                <strong>{type.label}</strong>
                <code>
                  {density === "desktop" ? type.size : type.mobileSize} px /{" "}
                  {type.lineHeight} / {type.weight}
                </code>
              </div>
              <p
                style={
                  {
                    "--ds-type-size": `${
                      density === "desktop" ? type.size : type.mobileSize
                    }px`,
                    fontFamily:
                      type.kind === "heading"
                        ? "var(--ds-heading-font)"
                        : "var(--ds-body-font)",
                    fontWeight: type.weight,
                    lineHeight: type.lineHeight,
                  } as CSSProperties
                }
              >
                {type.text}
              </p>
            </div>
          ))}
        </div>
        <p className="ds-note">
          Шрифтовая пара воспроизводит характер макетов: заголовки с засечками и
          нейтральный текст интерфейса.
        </p>
      </section>

      <section className="ds-section" aria-label="Сетка, интервалы и форма">
        <div className="ds-heading">
          <span>03</span>
          <h4>Пространство и форма</h4>
          <p>Ритм на основе 4 px</p>
        </div>
        <div className="ds-grid-demo" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="ds-grid-labels">
          <span>
            Desktop · 12 колонок / контейнер {system.containerWidth} px
          </span>
          <span>Mobile · 1 колонка / поля {system.mobileInset} px</span>
        </div>
        <div className="ds-space-scale">
          {system.spacing.map((size) => (
            <div key={size}>
              <span style={{ height: size }} />
              <code>{size}</code>
            </div>
          ))}
        </div>
        <div className="ds-radius-scale">
          {system.radii.map((radius) => (
            <div key={radius} style={{ borderRadius: radius }}>
              <code>R{radius}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section" aria-label="Кнопки и состояния">
        <div className="ds-heading">
          <span>04</span>
          <h4>Действия и состояния</h4>
          <p>Primary / Secondary / Text</p>
        </div>
        <div
          className="ds-state-switch"
          role="group"
          aria-label="Состояние образцов кнопок"
        >
          {states.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={state === item.id}
              onClick={() => setState(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={`ds-button-samples ds-sample-${state}`}>
          <div>
            <button
              type="button"
              className="ds-button ds-primary"
              disabled={state === "disabled"}
              aria-label="Образец основной кнопки"
            >
              <DemoIcon name="phone" />
              Связаться с клиникой
            </button>
            <code>Primary / Teal</code>
          </div>
          <div className="ds-dark-sample">
            <button
              type="button"
              className="ds-button ds-secondary"
              disabled={state === "disabled"}
              aria-label="Образец вторичной кнопки"
            >
              Наши услуги
            </button>
            <code>Secondary / On dark</code>
          </div>
          <div>
            <button
              type="button"
              className="ds-button ds-text"
              disabled={state === "disabled"}
              aria-label="Образец текстовой кнопки"
            >
              Подробнее <span aria-hidden="true">→</span>
            </button>
            <code>Text / Arrow</code>
          </div>
        </div>
        <p className="ds-note">
          Наведение, фокус и недоступность дополняют видимые в макетах обычные
          состояния. Это предложенные правила поведения компонентов.
        </p>
      </section>

      <section className="ds-section" aria-label="Карточки и паттерны">
        <div className="ds-heading">
          <span>05</span>
          <h4>Компоненты в контексте</h4>
          <p>Одна геометрия — несколько задач</p>
        </div>
        <div className="ds-component-grid">
          <article className="ds-service-card">
            <span className="ds-tag">Направление</span>
            <h5>Название услуги</h5>
            <strong>от 3 500 ₽</strong>
            <p>
              Короткое описание: что входит в услугу и как получить подробную
              информацию.
            </p>
            <span className="ds-card-link">Подробнее →</span>
          </article>
          <article className="ds-benefit-card">
            <span className="ds-icon">
              <DemoIcon name="shield" />
            </span>
            <span className="ds-card-index">01</span>
            <h5>Заголовок преимущества</h5>
            <p>
              Иконка, короткий заголовок и пояснение формируют понятную иерархию
              карточки.
            </p>
          </article>
          <article className="ds-stat-card">
            <strong>
              20<span>+</span>
            </strong>
            <p>Числовой акцент</p>
            <span>Подпись в тёмном блоке</span>
          </article>
        </div>
        <div className="ds-detail-patterns">
          <div>
            <span className="ds-detail-label">Иконки / 20–24 px</span>
            <div className="ds-icons">
              {(["phone", "shield", "clock", "check"] as const).map((name) => (
                <span key={name} className="ds-icon">
                  <DemoIcon name={name} />
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="ds-detail-label">Метка раздела</span>
            <span className="ds-section-label">О клинике</span>
          </div>
          <div>
            <span className="ds-detail-label">Строка прайс-листа</span>
            <div className="ds-price-row">
              <span>Название услуги</span>
              <strong>от 3 500 ₽</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
