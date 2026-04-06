import { GameSettingsSection } from "./components/game-settings-section"
import {
  ImpostorProvider,
  ImpostorStep,
  useImpostor,
} from "./components/impostor-provider"
import { KeywordRevealSection } from "./components/keyword-reveal-section"
import { PlaySection } from "./components/play-section"

export function SectionSwitcher() {
  const { step } = useImpostor()

  switch (step) {
    case ImpostorStep.GAME_SETTINGS:
      return <GameSettingsSection />

    case ImpostorStep.SEE_KEYWORD:
      return <KeywordRevealSection />

    case ImpostorStep.PLAY:
      return <PlaySection />

    default:
      return null
  }
}

export function App() {
  return (
    <div className="px-4 py-6">
      <ImpostorProvider>
        <SectionSwitcher />
      </ImpostorProvider>
    </div>
  )
}

export default App
