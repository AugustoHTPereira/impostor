import { RiArrowRightLine } from "@remixicon/react"
import { Button } from "./ui/button"
import { useImpostor } from "./impostor-provider"

export function GameSettingsSection() {
  const { nextStep } = useImpostor()

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium">Game settings</h2>
        <p>Configure your game settings</p>
      </div>

      <Button className="w-full" onClick={nextStep}>
        Next <RiArrowRightLine />
      </Button>
    </div>
  )
}
