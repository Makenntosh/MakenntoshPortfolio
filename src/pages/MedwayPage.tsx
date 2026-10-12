import CaseStudyPage from "../components/case-study/CaseStudyPage"
import { medwayCaseStudy } from "../data/medwayCaseStudy"

export default function MedwayPage({ onBack }: { onBack: () => void }) {
  return <CaseStudyPage study={medwayCaseStudy} onBack={onBack} />
}
