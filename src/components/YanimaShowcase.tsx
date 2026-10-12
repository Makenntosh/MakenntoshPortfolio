import type { CaseAsset, ShowcaseOptions } from "./case-study/types"
import "./yanima-showcase.css"

export function PhoneMockup({
  asset,
  priority = false,
  onError,
}: {
  asset: CaseAsset
  priority?: boolean
  onError?: () => void
}) {
  return (
    <span className="yanima-phone">
      <span className="yanima-phone-screen">
        <img
          src={asset.src}
          alt={asset.alt ?? asset.title}
          width={asset.width}
          height={asset.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onError={onError}
        />
      </span>
    </span>
  )
}

export function BrowserMockup({
  asset,
  priority = false,
  onError,
}: {
  asset: CaseAsset
  priority?: boolean
  onError?: () => void
}) {
  return (
    <span className="yanima-browser">
      <span className="yanima-browser-bar" aria-hidden="true">
        <span className="yanima-browser-dots">● ● ●</span>
        <span>{asset.address ?? "yanima.space"}</span>
        <span>↗</span>
      </span>
      <span
        className="yanima-browser-screen"
        style={{
          aspectRatio: `${asset.width} / ${Math.min(asset.height, asset.width * 0.625)}`,
        }}
      >
        <img
          src={asset.src}
          alt={asset.alt ?? asset.title}
          width={asset.width}
          height={asset.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onError={onError}
        />
      </span>
    </span>
  )
}

export default function YanimaShowcase({
  assets,
  onOpen,
  priority = false,
  brand = "YANIMA",
  label,
  tagline,
  variant = "yanima",
}: {
  assets: CaseAsset[]
  onOpen: (id: string) => void
  priority?: boolean
} & ShowcaseOptions) {
  const hasWeb = assets.some((asset) => asset.presentation === "browser")
  return (
    <div
      className={`yanima-showcase ${hasWeb ? "yanima-showcase-web" : ""} ${
        variant === "medway" ? "medway-showcase" : ""
      }`}
    >
      <div className="yanima-showcase-label">
        <span>{brand}</span>
        <span>
          {label ?? (hasWeb ? "WEB & MOBILE EXPERIENCE" : "MOBILE EXPERIENCE")}
        </span>
      </div>
      <div className="yanima-showcase-devices">
        {assets.map((asset) => (
          <button
            key={asset.id}
            className={`yanima-showcase-device ${
              asset.presentation === "browser"
                ? "yanima-showcase-desktop"
                : "yanima-showcase-phone"
            }`}
            onClick={() => onOpen(asset.id)}
            aria-label={`Открыть изображение: ${asset.title}`}
          >
            {asset.presentation === "browser" ? (
              <BrowserMockup asset={asset} priority={priority} />
            ) : (
              <PhoneMockup asset={asset} priority={priority} />
            )}
          </button>
        ))}
      </div>
      <div className="yanima-showcase-footer">
        <span>
          {tagline ??
            (hasWeb ? "Один мир. Любой экран." : "Аниме всегда рядом.")}
        </span>
        <span>Открыть экраны ↗</span>
      </div>
    </div>
  )
}
