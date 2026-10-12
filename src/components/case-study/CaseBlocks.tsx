import CaseImageFull, {
  CaseCaption,
  CaseImageDetail,
  CaseImagePair,
  CaseImageTriplet,
  CaseMedia,
  CaseMobileRow,
} from "./CaseGallery"
import CaseProcess, { CaseArchitecture } from "./CaseProcess"
import type { CaseBlock } from "./types"
import CaseDesignSystem from "./CaseDesignSystem"

export default function CaseBlocks({ blocks }: { blocks: CaseBlock[] }) {
  return (
    <div className="case-blocks">
      {blocks.map((block, index) => (
        <CaseBlockView key={index} block={block} />
      ))}
    </div>
  )
}

function CaseBlockView({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "design-system":
      return <CaseDesignSystem system={block.system} />
    case "text":
      return <p className="case-body case-body-narrow">{block.text}</p>
    case "heading":
      return <h3 className="case-next-heading">{block.text}</h3>
    case "caption":
      return <CaseCaption title={block.title}>{block.text}</CaseCaption>
    case "media": {
      switch (block.layout) {
        case "full":
          return <CaseImageFull assets={block.assets} />
        case "pair":
          return <CaseImagePair assets={block.assets} split={block.split} />
        case "triplet":
          return <CaseImageTriplet assets={block.assets} />
        case "mobile":
          return <CaseMobileRow assets={block.assets} />
        case "detail":
          return <CaseImageDetail assets={block.assets} />
      }
    }
    case "flow":
      return <CaseProcess {...block} />
    case "architecture":
      return <CaseArchitecture {...block} />
    case "cards":
      return (
        <div
          className={`case-cards case-cards-${block.variant ?? "annotations"}`}
        >
          {block.items.map((item, index) => (
            <article key={item.title}>
              <span className="case-card-number">
                {item.label ?? String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      )
    case "kit":
      return (
        <div className="case-kit">
          <div className="case-kit-grid">
            {block.items.map((item) => (
              <div key={item.asset}>
                <h3>{item.title}</h3>
                <CaseMedia id={item.asset} />
              </div>
            ))}
          </div>
          <h3 className="case-kit-state-heading">Component states</h3>
          <div className="case-kit-states">
            {block.states.map((state) => (
              <div key={state.asset}>
                <h4>{state.title}</h4>
                <CaseMedia id={state.asset} />
              </div>
            ))}
          </div>
        </div>
      )
    case "direction":
      return (
        <div className="case-direction">
          <div className="case-palette">
            {block.palette.map((color) => (
              <div key={color.name}>
                <div style={{ background: color.value }} />
                <span>{color.name}</span>
                <code>{color.value}</code>
              </div>
            ))}
          </div>
          <CaseImageTriplet assets={block.assets} />
        </div>
      )
    case "comparison":
      return (
        <div className="case-comparison">
          <div className="case-comparison-grid">
            {block.assets.map((asset, index) => (
              <div key={asset}>
                <h3>
                  {block.labels[index]}
                  {index === 0 && <span aria-hidden="true">→</span>}
                </h3>
                <CaseMedia id={asset} />
              </div>
            ))}
          </div>
          <div className="case-stacks">
            {block.stacks.map((stack) => (
              <div key={stack.title}>
                <span className="case-eyebrow">{stack.title}</span>
                <p>{stack.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      )
    case "results":
      return (
        <ul className="case-results">
          {block.items.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>
      )
  }
}
