import {
  ImpostorProvider,
  ImpostorStep,
  useImpostor,
} from "./components/impostor-provider"
import { AddPlayersSection } from "./components/add-players-section"
import { GameSettingsSection } from "./components/game-settings-section"
import { PlayerSortingSection } from "./components/player-sorting-section"
import { PlayingSection } from "./components/playing-section"
import { FirstRoundSection } from "./components/first-round-section"

export function SectionSwitcher() {
  const { step } = useImpostor()

  switch (step) {
    case ImpostorStep.ADD_PLAYERS:
      return <AddPlayersSection />

    case ImpostorStep.GAME_SETTINGS:
      return <GameSettingsSection />

    case ImpostorStep.SORTING:
      return <PlayerSortingSection />

    case ImpostorStep.SEE_FIRST_KEYWORD:
      return <FirstRoundSection />

    case ImpostorStep.PLAYING:
      return <PlayingSection />
    default:
      return null
  }
}

export function App() {
  return (
    <div className="p-4">
      <ImpostorProvider>
        <SectionSwitcher />
      </ImpostorProvider>
    </div>
  )
}

export default App
