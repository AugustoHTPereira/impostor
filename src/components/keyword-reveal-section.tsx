import { useState } from "react"
import { ImpostorStep, useImpostor } from "./impostor-provider"
import { Button } from "./ui/button"
import { RiArrowRightLine } from "@remixicon/react"
import { FlipCard } from "./flip-card"

export function KeywordRevealSection() {
  const { players, setStep, keyword, impostor } = useImpostor()
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const currentPlayer = players[currentPlayerIndex]

  function handleNextPlayer() {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
    }
  }

  function handleNextStep() {
    setStep(ImpostorStep.PLAY)
  }

  return (
    <div className="text-center">
      <h2 className="mb-2 text-center text-xl font-medium">
        Revelar a palavra
      </h2>

      <p className="mb-6 text-center text-xs text-muted-foreground">
        Passe o aparelho na ordem correta para revelar a palavra
      </p>

      <FlipCard className="min-h-[200px]">
        <div className="flex min-h-[200px] flex-col items-center justify-center space-y-2 rounded-md border p-6 py-12 shadow transition hover:bg-foreground/5">
          <h2 className="text-2xl font-bold">{currentPlayer}</h2>
          <p className="text-xs text-muted-foreground">
            Clique para revelar a palavra
          </p>
        </div>

        {impostor === currentPlayer ? (
          <div className="flex min-h-[200px] flex-col items-center justify-center space-y-2 rounded-md border bg-accent p-6 py-12 shadow transition">
            <p className="text-xs text-muted-foreground">a palavra é</p>
            <h2 className="text-2xl font-bold">{keyword}</h2>
          </div>
        ) : (
          <div className="flex min-h-[200px] flex-col items-center justify-center space-y-2 rounded-md border bg-accent p-6 py-12 shadow transition">
            <p className="text-xs text-muted-foreground">a palavra é</p>
            <h2 className="text-2xl font-bold">{keyword}</h2>
          </div>
        )}
      </FlipCard>

      {currentPlayerIndex < players.length - 1 ? (
        <Button className="mt-4 w-full" size="lg" onClick={handleNextPlayer}>
          Próximo jogador <RiArrowRightLine />
        </Button>
      ) : (
        <Button
          className="mt-4 w-full bg-green-600 text-white hover:bg-green-700"
          size="lg"
          onClick={handleNextStep}
        >
          Iniciar partida <RiArrowRightLine />
        </Button>
      )}
    </div>
  )
}
