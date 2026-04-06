import { useEffect } from "react"
import { useImpostor } from "./impostor-provider"
import { Button } from "./ui/button"
import { RiArrowRightLine, RiRefreshLine } from "@remixicon/react"

export function PlayerSortingSection() {
  const { startGame, randomizeFirstPlayer, firstPlayer } = useImpostor()

  useEffect(() => {
    randomizeFirstPlayer()
  }, [])

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium">Player sorting</h2>
      </div>

      <div className="space-y-2">
        {firstPlayer && (
          <div className="rounded border bg-secondary p-4 text-center">
            <p className="mb-4 text-2xl font-bold">{firstPlayer}</p>
            <p className="text-sm text-muted-foreground">
              The game must be started with player {firstPlayer}
            </p>
          </div>
        )}
      </div>

      <Button className="w-full" onClick={startGame}>
        Start the game <RiArrowRightLine />
      </Button>

      <Button
        className="w-full"
        variant="outline"
        onClick={randomizeFirstPlayer}
      >
        Sort again <RiRefreshLine />
      </Button>
    </div>
  )
}
