import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { C, F } from "../../tokens"
import { Ornament } from "../../ui/Ornament"
import { GoldBarEl } from "../../ui/GoldBar"
import CaseBlocks from "./CaseBlocks"
import CaseImageFull, { CaseGalleryContext, CaseShowcase } from "./CaseGallery"
import CaseLightbox from "./CaseLightbox"
import CaseSectionIntro from "./CaseSectionIntro"
import type { CaseStudy } from "./types"
import "./case-study.css"

function screenCountLabel(count: number) {
  const lastTwo = count % 100
  const last = count % 10
  const word =
    lastTwo >= 11 && lastTwo <= 14
      ? "экранов"
      : last === 1
        ? "экран"
        : last >= 2 && last <= 4
          ? "экрана"
          : "экранов"
  return `${count} ${word}`
}

function useCaseMetadata(seo: CaseStudy["seo"]) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = seo.title
    const restored = [
      ["name", "description", seo.description],
      ["property", "og:title", seo.title],
      ["property", "og:description", seo.description],
    ].map(([attribute, name, content]) => {
      const existing = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${name}"]`,
      )
      const meta = existing ?? document.createElement("meta")
      const previous = meta.getAttribute("content")
      if (!existing) {
        meta.setAttribute(attribute, name)
        document.head.append(meta)
      }
      meta.setAttribute("content", content)
      return () => {
        if (!existing) meta.remove()
        else if (previous === null) meta.removeAttribute("content")
        else meta.setAttribute("content", previous)
      }
    })
    return () => {
      document.title = previousTitle
      restored.forEach((restore) => restore())
    }
  }, [seo])
}

export default function CaseStudyPage({
  study,
  onBack,
}: {
  study: CaseStudy
  onBack: () => void
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [active, setActive] = useState(0)
  const mobileImageCount = Object.values(study.assets).filter(
    (asset) => asset.presentation === "phone" && asset.src,
  ).length
  const webImageCount = Object.values(study.assets).filter(
    (asset) => asset.presentation === "browser" && asset.src,
  ).length
  useCaseMetadata(study.seo)
  const images = useMemo(() => {
    // The gallery follows reading order, includes only real assets and deduplicates repeated IDs.
    const ids = [...(study.overview.showcase ?? []), study.overview.hero]
    study.sections.forEach((section) =>
      section.blocks.forEach((block) => {
        if ("assets" in block) ids.push(...block.assets)
        if (block.type === "kit")
          ids.push(
            ...block.items.map((item) => item.asset),
            ...block.states.map((state) => state.asset),
          )
      }),
    )
    return [...new Set(ids)]
      .map((id) => study.assets[id])
      .filter((asset) => asset?.src)
  }, [study])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
    let frame = 0
    const update = () => {
      frame = 0
      let current = 0
      study.navigation.forEach((chapter, index) => {
        if (
          (document.getElementById(chapter.target)?.getBoundingClientRect()
            .top ?? Infinity) <= 180
        )
          current = index
      })
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [study])

  const theme = {
    "--case-bg": C.bg,
    "--case-surface": C.surf,
    "--case-card": C.card,
    "--case-gold": C.gold,
    "--case-text": C.text,
    "--case-muted": C.muted,
    "--case-border": C.border,
    "--case-border-hi": C.borderHi,
    "--case-body-font": F.inter,
    "--case-title-font": F.playfair,
    "--case-label-font": F.cinzel,
    "--case-display-font": F.cinzelDec,
  } as CSSProperties

  return (
    <CaseGalleryContext.Provider
      value={{
        assets: study.assets,
        onOpen: (id) => {
          const index = images.findIndex((asset) => asset.id === id)
          if (index >= 0) setOpenIndex(index)
        },
      }}
    >
      <div className="case-study" style={theme}>
        <div className="case-topbar">
          <button className="case-back" onClick={onBack}>
            ← <span>Все проекты</span>
          </button>
          <span className="case-wordmark">MAKEnntosh</span>
          <span className="case-topbar-label">Product Design Case Study</span>
        </div>
        <nav className="case-navigation" aria-label="Главы кейса">
          <div>
            {study.navigation.map((chapter, index) => (
              <button
                key={chapter.target}
                aria-current={active === index ? "location" : undefined}
                onClick={() =>
                  document.getElementById(chapter.target)?.scrollIntoView({
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "instant"
                      : "smooth",
                  })
                }
              >
                <span>{String(index + 1).padStart(2, "0")}</span>{" "}
                {chapter.label}
              </button>
            ))}
          </div>
        </nav>
        <main className="case-content">
          <section
            id="overview"
            className="case-overview case-section"
            aria-labelledby="case-study-title"
          >
            <div className="case-overview-heading">
              <CaseSectionIntro
                number="01"
                eyebrow="Overview / О проекте"
                title={study.title}
                hero
              />
              <span className="case-year">{study.year}</span>
            </div>
            <p id="case-overview-title" className="case-subtitle">
              {study.subtitle}
            </p>
            <div className="case-overview-info">
              <div>
                <p className="case-body">{study.overview.description}</p>
                {study.website && (
                  <a
                    className="case-website"
                    href={study.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Перейти на сайт <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
              <dl className="case-metadata">
                {study.overview.metadata.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <GoldBarEl />
            {study.overview.showcase ? (
              <>
                <CaseShowcase
                  assets={study.overview.showcase}
                  options={study.overview.showcaseOptions}
                />
                <div className="case-mobile-shortcut">
                  <span>
                    {study.overview.screenSummary ??
                      `Web · ${screenCountLabel(webImageCount)} / Mobile · ${screenCountLabel(mobileImageCount)}`}
                  </span>
                  <div className="case-shortcut-links">
                    {(
                      study.overview.shortcuts ?? [
                        { target: "discovery", label: "Веб-версия ↓" },
                        { target: "design-system", label: "Дизайн-система ↓" },
                        { target: "mobile", label: "Мобильное приложение ↓" },
                      ]
                    ).map((link) => (
                      <button
                        key={link.target}
                        onClick={() =>
                          document.getElementById(link.target)?.scrollIntoView({
                            behavior: window.matchMedia(
                              "(prefers-reduced-motion: reduce)",
                            ).matches
                              ? "instant"
                              : "smooth",
                          })
                        }
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <CaseImageFull assets={[study.overview.hero]} priority />
            )}
          </section>
          {study.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="case-section"
              aria-label={`(${section.number}) ${section.title}`}
            >
              <CaseSectionIntro
                number={section.number}
                eyebrow={section.eyebrow}
                title={section.title}
                description={section.description}
              />
              <CaseBlocks blocks={section.blocks} />
            </section>
          ))}
          <footer className="case-footer">
            <Ornament />
            <p>
              {study.title} <span aria-hidden="true">✦</span> Product Design /
              Web & Mobile
            </p>
            <button className="case-back" onClick={onBack}>
              ← Вернуться ко всем работам
            </button>
          </footer>
        </main>
        {openIndex !== null && (
          <CaseLightbox
            images={images}
            initialIndex={openIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </div>
    </CaseGalleryContext.Provider>
  )
}
