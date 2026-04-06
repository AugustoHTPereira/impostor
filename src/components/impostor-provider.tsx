import { createContext, useContext, useEffect, useState } from "react"

export const ImpostorStep = {
  ADD_PLAYERS: "ADD_PLAYERS",
  GAME_SETTINGS: "GAME_SETTINGS",
  SORTING: "SORTING",
  SEE_FIRST_KEYWORD: "SEE_FIRST_KEYWORD",
  PLAYING: "PLAYING",
}

const STEP_ORDER = [
  ImpostorStep.ADD_PLAYERS,
  ImpostorStep.GAME_SETTINGS,
  ImpostorStep.SORTING,
  ImpostorStep.SEE_FIRST_KEYWORD,
  ImpostorStep.PLAYING,
]

export interface ImpostorContextType {
  players: string[]
  addPlayer: (name: string) => void
  removePlayer: (name: string) => void
  setPlayers: (players: string[]) => void
  step: string
  setStep: (step: string) => void
  nextStep: () => void
  prevStep: () => void
  firstPlayer: string | null
  keyword: string | null
  randomizeFirstPlayer: () => void
  impostorPlayer: string | null
  startGame: () => void
  nextRound: () => void
}

const ImpostorContext = createContext<ImpostorContextType>(
  {} as ImpostorContextType
)

export function ImpostorProvider({ children }: { children: React.ReactNode }) {
  const [players, setPlayers] = useState<string[]>([])
  const [step, setStep] = useState<string>(ImpostorStep.ADD_PLAYERS)
  const [firstPlayer, setFirstPlayer] = useState<string | null>(null)
  const [keyword, setKeyword] = useState<string | null>(null)
  const [impostorPlayer, setImpostorPlayer] = useState<string | null>(null)

  function addPlayer(name: string) {
    setPlayers((prev) => [...prev, name])
    localStorage.setItem("players", JSON.stringify([...players, name]))
  }

  function removePlayer(name: string) {
    setPlayers((prev) => prev.filter((player) => player !== name))
    localStorage.setItem(
      "players",
      JSON.stringify([...players.filter((player) => player !== name)])
    )
  }

  function handleSetPlayers(players: string[]) {
    setPlayers(players)
    localStorage.setItem("players", JSON.stringify(players))
  }

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players")
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers))
    }
  }, [])

  function handleNextStep() {
    const currentIndex = STEP_ORDER.indexOf(step)
    if (currentIndex < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[currentIndex + 1])
    }
  }

  function handlePrevStep() {
    const currentIndex = STEP_ORDER.indexOf(step)
    if (currentIndex > 0) {
      setStep(STEP_ORDER[currentIndex - 1])
    }
  }

  function handleRandomizeFirstPlayer() {
    const player = players[Math.floor(Math.random() * players.length)]
    setFirstPlayer(player)
  }

  function handleStartGame() {
    setImpostorPlayer(players[Math.floor(Math.random() * players.length)])
    setKeyword("abacaxi")
    handleNextStep()
  }

  function handleNextRound() {
    setImpostorPlayer(null)
    setKeyword(null)
    setStep(ImpostorStep.SORTING)
  }

  return (
    <ImpostorContext.Provider
      value={{
        players,
        addPlayer,
        removePlayer,
        setPlayers: handleSetPlayers,
        step,
        setStep,
        nextStep: handleNextStep,
        prevStep: handlePrevStep,
        firstPlayer,
        randomizeFirstPlayer: handleRandomizeFirstPlayer,
        keyword,
        impostorPlayer,
        startGame: handleStartGame,
        nextRound: handleNextRound,
      }}
    >
      {children}
    </ImpostorContext.Provider>
  )
}

export function useImpostor() {
  const context = useContext(ImpostorContext)
  if (!context) {
    throw new Error("useImpostor must be used within an ImpostorProvider")
  }

  return context
}
