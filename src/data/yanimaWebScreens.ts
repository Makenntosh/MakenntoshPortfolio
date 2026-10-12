import manifest from "./yanimaWebManifest.json"
import type { CaseAsset } from "../components/case-study/types"

const base = `${import.meta.env.BASE_URL}yanima/web/`

export const yanimaWebAssets: CaseAsset[] = manifest.map((asset) => ({
  ...asset,
  title: `Yanima · ${asset.title}`,
  material: asset.presentation === "sheet" ? "Дизайн-система" : "Веб-интерфейс",
  presentation: asset.presentation as "browser" | "sheet",
  src: `${base}${asset.id}-preview.webp`,
  fullSrc: `${base}${asset.id}-detail.webp`,
  originalSrc: `${import.meta.env.BASE_URL}${(asset.originalPath ?? `web_version/${asset.file}`).split("/").map(encodeURIComponent).join("/")}`,
  ratioLabel: `${asset.width}:${asset.height}`,
  alt: asset.caption,
}))

export const yanimaWebScreens = yanimaWebAssets.filter(
  (asset) => asset.presentation === "browser",
)
export const yanimaSystemSheets = yanimaWebAssets.filter(
  (asset) => asset.presentation === "sheet",
)
