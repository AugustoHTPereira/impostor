import { useState } from "react"
import { ImpostorStep, useImpostor } from "./impostor-provider"
import { Button } from "./ui/button"
import { RiArrowRightLine } from "@remixicon/react"

export function KeywordRevealSection() {
  const { players, setStep } = useImpostor()

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  const currentPlayer = players[currentPlayerIndex]

  function handleNextPlayer() {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
    }
  }

  function handleRevealKeyword() {
    alert(`Revelando palavra-chave para ${currentPlayer}`)
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

      <div
        className="cursor-pointer space-y-12 rounded-md border p-6 py-12 shadow transition hover:bg-foreground/5"
        onClick={handleRevealKeyword}
      >
        <h2 className="text-2xl font-bold">{currentPlayer}</h2>
        <p className="text-xs text-muted-foreground">
          Clique para revelar a palavra
        </p>
      </div>

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
