import { useState } from "react"
import { ImpostorStep, useImpostor } from "./impostor-provider"
import { Button } from "./ui/button"
import { RiArrowRightLine } from "@remixicon/react"
import { FlipCard } from "./flip-card"
import ImpostorImage from "@/assets/impostor.png"

export function KeywordRevealSection() {
  const { players, setStep, keyword, impostor } = useImpostor()
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const currentPlayer = players[currentPlayerIndex]
  const [isCardOpen, setCardOpen] = useState<boolean>(false)

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

      <FlipCard className="min-h-[300px]" onOpenChange={setCardOpen}>
        <div className="flex min-h-[300px] flex-col items-center justify-center space-y-2 rounded-md border p-6 py-12 shadow transition hover:bg-foreground/5">
          <h2 className="text-2xl font-bold">{currentPlayer}</h2>
          <p className="text-sm text-muted-foreground">
            Clique para revelar a palavra
          </p>
        </div>

        {impostor === currentPlayer ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center space-y-2 rounded-md border bg-red-500 p-6 py-12 shadow transition">
            <p className="text-sm text-white">você é o</p>
            <img src={ImpostorImage} width={100} height={100} />
            <h2 className="text-2xl font-bold">impostor</h2>
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-md border bg-accent p-6 py-12 shadow transition">
            <p className="text-sm text-white">você é um jogador</p>
            <p className="text-sm font-medium">a palavra é</p>
            <h2 className="text-2xl font-bold">{keyword}</h2>
          </div>
        )}
      </FlipCard>

      {currentPlayerIndex < players.length - 1 ? (
        <Button
          className="mt-4 w-full"
          size="lg"
          onClick={handleNextPlayer}
          disabled={isCardOpen}
        >
          Próximo jogador <RiArrowRightLine />
        </Button>
      ) : (
        <Button
          className="mt-4 w-full bg-green-600 text-white hover:bg-green-700"
          size="lg"
          onClick={handleNextStep}
          disabled={isCardOpen}
        >
          Iniciar partida <RiArrowRightLine />
        </Button>
      )}
    </div>
  )
}
