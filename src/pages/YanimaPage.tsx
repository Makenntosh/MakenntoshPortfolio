import CaseStudyPage from "../components/case-study/CaseStudyPage"
import { yanimaCaseStudy } from "../data/yanimaCaseStudy"

export default function YanimaPage({ onBack }: { onBack: () => void }) {
  return <CaseStudyPage study={yanimaCaseStudy} onBack={onBack} />
}
