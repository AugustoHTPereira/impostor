import { RiAddLine, RiCheckLine, RiDeleteBin2Line } from "@remixicon/react"
import { ImpostorStep, useImpostor } from "./impostor-provider"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { Input } from "./ui/input"
import keywords from "@/assets/keywords.json"
import {
  CollapseSection,
  CollapseSectionContent,
  CollapseSectionHeader,
  CollapseSectionTitle,
} from "./collapse-section"

type SelectableCategory = {
  category: string
  selected: boolean
}

export function GameSettingsSection() {
  const {
    players,
    addPlayer,
    setPlayers,
    removePlayer,
    setStep,
    randomizeKeyword,
    randomizeImpostor,
    randomizePlayer,
  } = useImpostor()
  const [newPlayerName, setNewPlayerName] = useState("")
  const [playersName, setPlayersName] = useState("")
  const [categories, setCategories] = useState<SelectableCategory[]>(() =>
    [...new Set(keywords.map((x) => x.category))].map((category) => ({
      category,
      selected: true,
    }))
  )

  function handleSetPlayers() {
    const names = playersName
      .split(/[\n,]+/)
      .map((name) => name.trim())
      .filter(Boolean)

    setPlayers(names)
    setPlayersName("")
  }

  function handleAddPlayer() {
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName.trim())
      setNewPlayerName("")
    }
  }

  function handleCategoryClick(category: string) {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.category === category ? { ...cat, selected: !cat.selected } : cat
      )
    )
  }

  function handleStartGame() {
    randomizeKeyword()
    randomizeImpostor()
    randomizePlayer()

    setStep(ImpostorStep.SEE_KEYWORD)
  }

  return (
    <div>
      <h2 className="mb-6 text-center text-xl font-medium">
        Configurações do Jogo
      </h2>

      <div className="space-y-4">
        <CollapseSection>
          <CollapseSectionHeader>
            <CollapseSectionTitle>Jogadores</CollapseSectionTitle>
            <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-accent text-center text-xs font-medium">
              {players.length}
            </div>
          </CollapseSectionHeader>

          <CollapseSectionContent>
            <div className="space-y-2">
              {!!players.length && (
                <div className="divide-y rounded-md border">
                  {players.map((player) => (
                    <div
                      key={player}
                      className="flex items-center justify-between p-1 pl-2"
                    >
                      <span className="text-sm font-medium">{player}</span>
                      <Button
                        onClick={() => removePlayer(player)}
                        variant="destructive"
                        size="icon-sm"
                        className="rounded-full"
                      >
                        <RiDeleteBin2Line />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {!!players.length ? (
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Nome do jogador"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                  />

                  <Button onClick={handleAddPlayer}>
                    <RiAddLine />
                  </Button>
                </div>
              ) : (
                <div>
                  <Textarea
                    value={playersName}
                    onChange={(e) => setPlayersName(e.target.value)}
                    className="mb-1"
                  />

                  <p className="text-xs text-muted-foreground">
                    Escreva os nomes dos jogadores por linha ou separados por
                    vírgula
                  </p>

                  <Button
                    className="mt-4 w-full"
                    onClick={handleSetPlayers}
                    disabled={!playersName.trim()}
                  >
                    Adicionar jogadores
                  </Button>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Adicione pelo menos 3 jogadores
              </p>
            </div>
          </CollapseSectionContent>
        </CollapseSection>

        <CollapseSection>
          <CollapseSectionHeader>
            <h2>Categorias</h2>
            <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-accent text-center text-xs font-medium">
              {categories.length}
            </div>
          </CollapseSectionHeader>

          <CollapseSectionContent>
            <div className="divide-y">
              {categories.map(({ category, selected }) => (
                <div key={category} className="py-1">
                  <input
                    type="checkbox"
                    id={category}
                    name={category}
                    checked={selected}
                    onChange={() => handleCategoryClick(category)}
                    className="hidden"
                  />
                  <label
                    htmlFor={category}
                    className="flex w-full items-center justify-between gap-2"
                  >
                    {category}
                    {selected && <RiCheckLine size="16" />}
                  </label>
                </div>
              ))}
            </div>
          </CollapseSectionContent>
        </CollapseSection>

        <div>
          <Button
            className="w-full"
            size="lg"
            disabled={
              players.length < 3 || !categories.some((cat) => cat.selected)
            }
            onClick={handleStartGame}
          >
            Iniciar partida <RiCheckLine />
          </Button>
        </div>
      </div>
    </div>
  )
}
