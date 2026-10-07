import type { CaseBlock } from "./types"

export default function CaseProcess({
  steps,
  branches,
  branchAt,
  compact,
  label,
}: Extract<CaseBlock, { type: "flow" }>) {
  return (
    <div
      className={`case-process ${compact ? "case-process-compact" : ""}`}
      role="group"
      aria-label={label}
    >
      <span className="case-eyebrow">{label}</span>
      <ol className="case-flow">
        {steps.map((step, index) => (
          <li
            key={step}
            className={index === branchAt ? "case-flow-junction" : ""}
          >
            <div className="case-flow-node">
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{step}</strong>
            </div>
            {branches && index === branchAt && (
              <div className="case-flow-branches">
                <span className="case-eyebrow">Со страницы аниме</span>
                <ul>
                  {branches.map((branch) => (
                    <li key={branch}>{branch}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function CaseArchitecture({
  root,
  groups,
}: Extract<CaseBlock, { type: "architecture" }>) {
  return (
    <div
      className="case-architecture"
      role="group"
      aria-label={`Карта разделов ${root}`}
    >
      <div className="case-architecture-root">
        {root}
        <span aria-hidden="true">✦</span>
      </div>
      <div className="case-architecture-groups">
        {groups.map((group) => (
          <div key={group.title} className="case-architecture-group">
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
