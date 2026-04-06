import { RiArrowRightLine } from "@remixicon/react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useImpostor } from "./impostor-provider"
import { useEffect, useState } from "react"

export function AddPlayersSection() {
  const [playersInput, setPlayersInput] = useState<string>("")
  const { setPlayers, nextStep, players } = useImpostor()

  useEffect(() => {
    setPlayersInput(players.join("\n"))
  }, [players])

  function handleAddPlayers() {
    const players = playersInput
      .split("\n")
      .map((line) =>
        line
          .trim()
          .split(",")
          .map((name) => name.trim())
      )
      .flat()
      .filter((name) => name.length > 0)

    console.log(players)

    if (players.length < 3) {
      alert("Please add at least 3 players to start the game.")
      return
    }

    setPlayers(players)
    nextStep()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium">Add players</h2>
        <p>Add at least 3 players to start the game</p>
      </div>
      <Textarea
        value={playersInput}
        onChange={(e) => setPlayersInput(e.target.value)}
        placeholder="Digite os nomes dos jogadores, separados por vírgula"
      />

      <Button
        className="w-full"
        onClick={handleAddPlayers}
        disabled={playersInput.trim().length === 0}
      >
        Add players <RiArrowRightLine />
      </Button>
    </div>
  )
}
