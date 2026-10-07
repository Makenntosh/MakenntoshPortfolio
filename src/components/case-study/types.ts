export type CaseAsset = {
  id: string
  title: string
  material: string
  width: number
  height: number
  ratioLabel: string
  src?: string
  fullSrc?: string
  originalSrc?: string
  alt?: string
  caption?: string
  fit?: "contain" | "cover"
  position?: string
  presentation?: "phone" | "browser" | "sheet"
}

export type CaseCard = {
  title: string
  text: string
  label?: string
}
export type CaseBlock = {
  type: "text"
  text: string
} | {
  type: "heading"
  text: string
} | {
  type: "caption"
  title?: string
  text: string
} | {
  type: "media"
  layout: "full" | "pair" | "triplet" | "mobile" | "detail"
  assets: string[]
  split?: "even" | "wide"
} | {
  type: "cards"
  variant?: "observations" | "principles" | "testing"
  items: CaseCard[]
} | {
  type: "flow"
  steps: string[]
  branches?: string[]
  branchAt?: number
  compact?: boolean
  label: string
} | {
  type: "architecture"
  root: string
  groups: {
    title: string
    items: string[]
  }[]
} | {
  type: "kit"
  items: {
    title: string
    asset: string
  }[]
  states: {
    title: string
    asset: string
  }[]
} | {
  type: "direction"
  palette: {
    name: string
    value: string
  }[]
  assets: string[]
} | {
  type: "comparison"
  labels: [string, string]
  assets: [string, string]
  stacks: {
    title: string
    items: string[]
  }[]
} | {
  type: "results"
  items: string[]
}

export type CaseSection = {
  id: string
  number: string
  eyebrow: string
  title: string
  description?: string
  blocks: CaseBlock[]
}

export type CaseStudy = {
  title: string
  subtitle: string
  year: string
  website?: string
  seo: {
    title: string
    description: string
  }
  overview: {
    description: string
    metadata: {
      label: string
      value: string
    }[]
    hero: string
    showcase?: string[]
  }
  navigation: {
    label: string
    target: string
    sections: string[]
  }[]
  assets: Record<string, CaseAsset>
  sections: CaseSection[]
}
