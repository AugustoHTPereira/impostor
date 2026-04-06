import { useEffect, useRef, useState } from "react"
import { ImpostorStep, useImpostor } from "./impostor-provider"
import { Button } from "./ui/button"
import { RiArrowRightLine, RiEyeLine } from "@remixicon/react"
import ImpostorImage from "@/assets/impostor.png"
import ImpostorAudio from "@/assets/impostor-audio.mp3"
import { FlipCard } from "./flip-card"

export function PlaySection() {
  const audio = useRef(new Audio(ImpostorAudio))
  const { keyword, firstPlayer, players, impostor, setStep } = useImpostor()
  const [reveal, setReveal] = useState<boolean>(false)

  function handleRevealClick() {
    setReveal(true)
  }

  function handleNextRoundClick() {
    setStep(ImpostorStep.GAME_SETTINGS)
  }

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audio.current.play()
      } catch (error) {
        console.warn(
          "A reprodução automática foi bloqueada pelo navegador. " +
            "O áudio só tocará após uma interação do usuário com a página."
        )
      }
    }

    playAudio()

    return () => {
      audio.current.pause()
      audio.current.currentTime = 0
    }
  }, [])

  if (!reveal)
    return (
      <div className="space-y-6 text-center">
        <h2 className="mb-2 text-center text-xl font-medium">O jogo começou</h2>

        <p className="text-xs text-muted-foreground">
          O jogo começou, <b>{firstPlayer}</b> é o primeiro jogador.
          <br />
          Clique sobre o nome do jogador para visualizar a palavra novamente.
        </p>

        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
          {players.map((player) => (
            <FlipCard key={player} className="group min-h-[200px]">
              <div className="flex h-full flex-col items-center justify-between rounded-md border bg-secondary p-4">
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md border bg-accent font-bold group-data-[impostor=true]:bg-red-600">
                    {player[0]}
                  </div>

                  <p className="text-sm font-medium">{player}</p>
                </div>

                <p className="text-xs text-muted-foreground">
                  clique para revelar a palavra
                </p>
              </div>

              {player === impostor ? (
                <div className="flex h-full flex-col items-center justify-center rounded-md border bg-red-500 p-4">
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground text-white">
                      você é o
                    </p>
                    <h2 className="text-xl font-bold">Impostor</h2>
                  </div>

                  <div>
                    <img
                      src={ImpostorImage}
                      alt="Impostor"
                      width={100}
                      height={100}
                    />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground text-white">
                      descubra a palavra e infiltre-se
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center rounded-md border bg-accent p-4">
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground text-white">
                      você é
                    </p>
                    <h2 className="text-xl font-bold">jogador</h2>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground text-white">
                      a palavra é
                    </p>
                    <h2 className="mt-1 rounded-md border bg-secondary px-4 py-2 text-2xl font-bold">
                      {keyword}
                    </h2>
                  </div>
                </div>
              )}
            </FlipCard>
          ))}
        </div>

        {!reveal && (
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleRevealClick}
          >
            Revelar impostor <RiEyeLine />
          </Button>
        )}
      </div>
    )
  else
    return (
      <div>
        <div className="flex h-full flex-col items-center justify-center rounded-md border bg-secondary p-4 py-12">
          <div>
            <img src={ImpostorImage} alt="Impostor" width={100} height={100} />
          </div>

          <div className="mb-4 text-center">
            <p className="text-sm text-muted-foreground">o impostor é</p>
            <h2 className="text-3xl font-bold text-red-500">{impostor}</h2>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">a palavra era</p>
            <h2 className="text-2xl font-bold">{keyword}</h2>
          </div>
        </div>

        <Button
          className="mt-6 h-12 w-full"
          size="lg"
          onClick={handleNextRoundClick}
        >
          Nova partida <RiArrowRightLine />
        </Button>
      </div>
    )
}
