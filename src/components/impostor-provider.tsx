import { cache, createContext, useContext, useEffect, useState } from "react"

export const ImpostorStep = {
  GAME_SETTINGS: "GAME_SETTINGS",
  SEE_KEYWORD: "SEE_KEYWORD",
  PLAY: "PLAY",
}

interface ImpostorKeyword {
  keyword: string
  category: string
}

export interface ImpostorContextType {
  step: string
  setStep: (step: string) => void
  players: string[]
  addPlayer: (name: string) => void
  removePlayer: (name: string) => void
  setPlayers: (players: string[]) => void
  keyword: string | null
  firstPlayer: string | null
  randomizePlayer: () => void
  impostor: string | null
  randomizeImpostor: () => void
  randomizeKeyword: () => void
}

const ImpostorContext = createContext<ImpostorContextType>(
  {} as ImpostorContextType
)

const fetchKeywords = cache(async () => {
  const response = await fetch(
    "https://gist.githubusercontent.com/AugustoHTPereira/6a94759bf29c2a2ba266b42685b1144c/raw/9cbbcd7851a17129b1a3a4bf715ef66db4c06d17/keywords.json"
  ).then((response) => response.json())

  return response as ImpostorKeyword[]
})

export function ImpostorProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(ImpostorStep.GAME_SETTINGS)
  const [players, setPlayers] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("players") || "[]")
  )
  const [keyword, setKeyword] = useState<string | null>(null)
  const [firstPlayer, setFirstPlayer] = useState<string | null>(null)
  const [impostor, setImpostor] = useState<string | null>(null)
  const [keywords, setKeywords] = useState<ImpostorKeyword[]>([])

  useEffect(() => {
    async function handleFetchKeywords() {
      setKeywords(await fetchKeywords())
    }

    if (!keywords.length) {
      handleFetchKeywords()
    }
  }, [keyword])

  function handleAddPlayer(name: string) {
    setPlayers((prev) => [...prev, name])
  }

  function handleRemovePlayer(name: string) {
    setPlayers((prev) => prev.filter((player) => player !== name))
  }

  function handleSetPlayers(names: string[]) {
    setPlayers(names)
  }

  function handleRandomizePlayer() {
    if (players.length === 0) return

    const randomIndex = Math.floor(Math.random() * players.length)
    setFirstPlayer(players[randomIndex])
  }

  function handleRandomizeImpostor() {
    if (players.length === 0) return

    const randomIndex = Math.floor(Math.random() * players.length)
    setImpostor(players[randomIndex])
  }

  async function handleRandomizeKeyword() {
    if (keywords.length === 0) return

    const randomIndex = Math.floor(Math.random() * keywords.length)
    setKeyword(keywords[randomIndex].keyword)
  }

  return (
    <ImpostorContext.Provider
      value={{
        step,
        setStep,
        players,
        addPlayer: handleAddPlayer,
        removePlayer: handleRemovePlayer,
        setPlayers: handleSetPlayers,
        keyword,
        firstPlayer,
        randomizePlayer: handleRandomizePlayer,
        impostor,
        randomizeImpostor: handleRandomizeImpostor,
        randomizeKeyword: handleRandomizeKeyword,
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
