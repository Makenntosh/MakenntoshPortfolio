import manifest from "./medwayManifest.json"
import type { CaseAsset } from "../components/case-study/types"

export const medwayAssetList: CaseAsset[] = manifest.map((asset) => ({
  ...asset,
  title: `MedWay · ${asset.title}`,
  material: asset.presentation === "phone" ? "Мобильный макет" : "Веб-макет",
  presentation: asset.presentation as "browser" | "phone",
  src: `${import.meta.env.BASE_URL}medway/${asset.id}-preview.webp`,
  fullSrc: `${import.meta.env.BASE_URL}medway/${asset.id}-detail.webp`,
  originalSrc: `${import.meta.env.BASE_URL}MedWay/${encodeURIComponent(asset.file)}`,
  ratioLabel: `${asset.width}:${asset.height}`,
  alt: asset.caption,
}))

export const medwayAssets = Object.fromEntries(
  medwayAssetList.map((asset) => [asset.id, asset]),
)
