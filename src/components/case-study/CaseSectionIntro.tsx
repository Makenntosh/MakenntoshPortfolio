export default function CaseSectionIntro({
  number,
  eyebrow,
  title,
  description,
  hero = false,
}: {
  number: string
  eyebrow: string
  title: string
  description?: string
  hero?: boolean
}) {
  return (
    <header
      className={`case-section-intro ${hero ? "case-section-intro-hero" : ""}`}
    >
      <div className="case-chapter-label">
        <span className="case-chapter-number">({number})</span>
        <span className="case-eyebrow">{eyebrow}</span>
      </div>
      {hero ? <h1 id="case-study-title">{title}</h1> : <h2>{title}</h2>}
      {description && <p className="case-body">{description}</p>}
    </header>
  )
}
