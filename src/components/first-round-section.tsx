import { useState } from "react"
import { useImpostor } from "./impostor-provider"
import { Button } from "./ui/button"
import { RiArrowRightLine } from "@remixicon/react"

export function FirstRoundSection() {
  const { players, impostorPlayer, nextStep } = useImpostor()
  const [playerIndex, setPlayerIndex] = useState(0)
  const [reveal, setReveal] = useState(false)

  function handleNextPlayer() {
    setReveal(false)
    const nextIndex = (playerIndex + 1) % players.length
    if (nextIndex === 0) {
      nextStep()
      return
    }

    setPlayerIndex(nextIndex)
  }

  function handleRevealKeyword() {
    setReveal(true)
  }

  const isImpostor = players[playerIndex] === impostorPlayer

  return (
    <div className="group space-y-4" data-impostor={isImpostor && reveal}>
      <div className="space-y-1">
        <h2 className="text-2xl font-medium">First round</h2>
        <p>See the keyword!</p>
      </div>

      <div className="space-y-4 rounded-md border p-4 text-center group-data-[impostor=true]:border-2 group-data-[impostor=true]:border-red-700 group-data-[impostor=true]:bg-red-500 group-data-[impostor=true]:text-white">
        <p className="text-2xl font-medium group-data-[impostor=true]:text-white">
          Player {players[playerIndex]}
        </p>

        {reveal && (
          <p className="text-2xl font-bold">
            {isImpostor ? "You are the impostor!" : "The keyword is: abacaxi"}
          </p>
        )}

        {!reveal && (
          <Button onClick={handleRevealKeyword}>
            Reveal the keyword <RiArrowRightLine />
          </Button>
        )}

        {reveal && (
          <Button onClick={handleNextPlayer}>
            Next player <RiArrowRightLine />
          </Button>
        )}
      </div>
    </div>
  )
}
