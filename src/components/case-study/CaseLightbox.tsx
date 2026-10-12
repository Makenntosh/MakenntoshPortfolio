import { useEffect, useRef, useState } from "react"
import type { CaseAsset } from "./types"

const startsInReadingMode = (asset: CaseAsset) =>
  !!asset.presentation && asset.height > asset.width * 5

export default function CaseLightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: CaseAsset[]
  initialIndex: number
  onClose: () => void
}) {
  const [index, setIndex] = useState(initialIndex)
  const [reading, setReading] = useState(() =>
    startsInReadingMode(images[initialIndex]),
  )
  const dialog = useRef<HTMLDialogElement>(null)
  const viewer = useRef<HTMLDivElement>(null)
  const touchStart = useRef<number | null>(null)
  const image = images[index]
  const move = (direction: number) => {
    const next = (index + direction + images.length) % images.length
    setReading(startsInReadingMode(images[next]))
    setIndex(next)
  }

  useEffect(() => {
    viewer.current?.scrollTo(0, 0)
  }, [index])

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    const modal = dialog.current!
    modal.showModal()
    document.body.style.overflow = "hidden"
    return () => {
      modal.close()
      document.body.style.overflow = previousOverflow
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={dialog}
      className="case-lightbox"
      aria-modal="true"
      aria-labelledby="case-lightbox-title"
      aria-describedby="case-lightbox-count"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            "button:not(:disabled), a[href], [tabindex='0']",
          )
          const first = controls[0]
          const last = controls[controls.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault()
          move(event.key === "ArrowRight" ? 1 : -1)
        }
      }}
    >
      <div className="case-lightbox-toolbar">
        <span id="case-lightbox-count" aria-live="polite">
          {index + 1} / {images.length}
        </span>
        {image.presentation && (
          <button
            type="button"
            aria-pressed={reading}
            onClick={() => setReading((current) => !current)}
          >
            {reading
              ? "Весь экран"
              : image.presentation === "phone"
                ? "Читать экран"
                : "Рассмотреть"}
          </button>
        )}
        <a
          href={image.originalSrc ?? image.fullSrc ?? image.src}
          target="_blank"
          rel="noopener noreferrer"
        >
          Оригинал ↗
        </a>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Закрыть просмотр"
        >
          Esc · Закрыть ×
        </button>
      </div>
      <div
        ref={viewer}
        className={`case-lightbox-viewer ${
          reading
            ? `case-lightbox-reading ${
                image.presentation !== "phone"
                  ? "case-lightbox-reading-wide"
                  : ""
              }`
            : ""
        }`}
        tabIndex={reading ? 0 : undefined}
        aria-label={
          reading ? "Экран приложения — прокрутите для просмотра" : undefined
        }
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
        onTouchStart={(event) => {
          touchStart.current =
            !reading && event.touches.length === 1
              ? event.touches[0].clientX
              : null
        }}
        onTouchMove={(event) => {
          if (event.touches.length > 1) touchStart.current = null
        }}
        onTouchEnd={(event) => {
          if (touchStart.current !== null) {
            const distance =
              event.changedTouches[0].clientX - touchStart.current
            if (Math.abs(distance) > 60) move(distance < 0 ? 1 : -1)
          }
          touchStart.current = null
        }}
      >
        <img
          key={image.id}
          src={image.fullSrc ?? image.src}
          alt={image.alt ?? image.title}
        />
      </div>
      <div className="case-lightbox-footer">
        <button
          type="button"
          aria-label="Предыдущее изображение"
          onClick={() => move(-1)}
          disabled={images.length < 2}
        >
          ←
        </button>
        <div>
          <p id="case-lightbox-title">{image.title}</p>
          <span>
            {reading
              ? "Прокрутите, чтобы рассмотреть весь экран"
              : "← → Переключение · На телефоне — свайп"}
          </span>
        </div>
        <button
          type="button"
          aria-label="Следующее изображение"
          onClick={() => move(1)}
          disabled={images.length < 2}
        >
          →
        </button>
      </div>
    </dialog>
  )
}
