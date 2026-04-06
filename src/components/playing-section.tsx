import { RiArrowRightLine } from "@remixicon/react"
import { useImpostor } from "./impostor-provider"
import { Button } from "./ui/button"

export function PlayingSection() {
  const { players, impostorPlayer, keyword, nextRound } = useImpostor()

  function handleRevealImpostor() {
    const isConfirmed = window.confirm(`The impostor was ${impostorPlayer}`)
    if (isConfirmed) {
      nextRound()
      return
    }
  }

  function handleSeeKeyword(player: string) {
    if (player == impostorPlayer) {
      alert("You are the impostor! Try to guess the keyword!")
      return
    }

    alert(`The keyword is: ${keyword}`)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium">Playing</h2>
        <p>Enjoy the game!</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {players.map((player) => (
          <div
            key={player}
            className="rounded-md border p-4 text-center"
            onClick={() => handleSeeKeyword(player)}
          >
            <p>{player}</p>

            <p className="text-sm text-muted-foreground">
              Click to see the keyword
            </p>
          </div>
        ))}
      </div>

      <Button
        className="w-full"
        variant="outline"
        onClick={handleRevealImpostor}
      >
        Reveal impostor
      </Button>

      <Button className="w-full" onClick={nextRound}>
        Start next round <RiArrowRightLine />
      </Button>
    </div>
  )
}
