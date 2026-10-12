import { createContext, useContext, useState, type ReactNode } from "react"
import type { CaseAsset, ShowcaseOptions } from "./types"
import YanimaShowcase, { PhoneMockup, BrowserMockup } from "../YanimaShowcase"

export const CaseGalleryContext = createContext<{
  assets: Record<string, CaseAsset>
  onOpen: (id: string) => void
}>({ assets: {}, onOpen: () => {} })

export function CaseCaption({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    <div className="case-caption">
      {title && <strong>{title}</strong>}
      <p>{children}</p>
    </div>
  )
}

export function CaseMedia({
  id,
  priority = false,
}: {
  id: string
  priority?: boolean
}) {
  const { assets, onOpen } = useContext(CaseGalleryContext)
  const asset = assets[id]
  const [failed, setFailed] = useState(false)
  if (!asset) return null
  const style = {
    aspectRatio:
      asset.presentation === "browser"
        ? undefined
        : asset.presentation === "sheet"
          ? "16 / 10"
          : asset.presentation === "phone"
            ? "440 / 956"
            : `${asset.width} / ${asset.height}`,
  }
  const contents =
    asset.src && !failed ? (
      <>
        {asset.presentation === "phone" ? (
          <PhoneMockup
            asset={asset}
            priority={priority}
            onError={() => setFailed(true)}
          />
        ) : asset.presentation === "browser" ? (
          <BrowserMockup
            asset={asset}
            priority={priority}
            onError={() => setFailed(true)}
          />
        ) : (
          <img
            src={asset.src}
            alt={asset.alt ?? asset.title}
            width={asset.width}
            height={asset.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            style={{
              objectFit:
                asset.presentation === "sheet"
                  ? "cover"
                  : (asset.fit ?? "contain"),
              objectPosition:
                asset.presentation === "sheet" ? "top" : asset.position,
            }}
            onError={() => setFailed(true)}
          />
        )}
        <span className="case-zoom" aria-hidden="true">
          ↗ Открыть
        </span>
      </>
    ) : (
      <div className="case-placeholder" style={style}>
        <span className="case-placeholder-mark" aria-hidden="true">
          ✦
        </span>
        <span className="case-eyebrow">
          {failed ? "Материал недоступен" : "Место для материала"}
        </span>
        <strong>{asset.title}</strong>
        <span>
          {asset.ratioLabel} <span aria-hidden="true">·</span> {asset.material}
        </span>
      </div>
    )
  return (
    <figure
      className={`case-media ${
        asset.presentation === "phone" ||
        (!asset.presentation && asset.height > asset.width * 1.7)
          ? "case-media-phone"
          : ""
      }`}
    >
      {asset.src && !failed ? (
        <button
          className={`case-image-button ${
            asset.presentation === "phone"
              ? "case-phone-button"
              : asset.presentation === "browser"
                ? "case-browser-button"
                : asset.presentation === "sheet"
                  ? "case-sheet-button"
                  : ""
          }`}
          style={style}
          onClick={() => onOpen(id)}
          aria-label={`Открыть изображение: ${asset.title}`}
        >
          {contents}
        </button>
      ) : (
        contents
      )}
      {asset.caption && <figcaption>{asset.caption}</figcaption>}
    </figure>
  )
}

export function CaseShowcase({
  assets: ids,
  options,
}: {
  assets: string[]
  options?: ShowcaseOptions
}) {
  const { assets, onOpen } = useContext(CaseGalleryContext)
  return (
    <YanimaShowcase
      {...options}
      assets={ids.map((id) => assets[id]).filter((asset) => asset?.src)}
      onOpen={onOpen}
      priority
    />
  )
}

export default function CaseImageFull({
  assets,
  priority = false,
}: {
  assets: string[]
  priority?: boolean
}) {
  return (
    <div className="case-image-full">
      {assets.map((id) => (
        <CaseMedia key={id} id={id} priority={priority} />
      ))}
    </div>
  )
}
export function CaseImagePair({
  assets,
  split = "even",
}: {
  assets: string[]
  split?: "even" | "wide"
}) {
  return (
    <div
      className={`case-image-pair ${
        split === "wide" ? "case-image-pair-wide" : ""
      }`}
    >
      {assets.map((id) => (
        <CaseMedia key={id} id={id} />
      ))}
    </div>
  )
}
export function CaseImageTriplet({ assets }: { assets: string[] }) {
  return (
    <div className="case-image-triplet">
      {assets.map((id) => (
        <CaseMedia key={id} id={id} />
      ))}
    </div>
  )
}
export function CaseMobileRow({ assets }: { assets: string[] }) {
  return (
    <div
      className="case-mobile-row"
      style={{ "--phone-count": assets.length } as React.CSSProperties}
    >
      {assets.map((id) => (
        <CaseMedia key={id} id={id} />
      ))}
    </div>
  )
}
export function CaseImageDetail({ assets }: { assets: string[] }) {
  return (
    <div className="case-image-detail">
      {assets.map((id) => (
        <CaseMedia key={id} id={id} />
      ))}
    </div>
  )
}
