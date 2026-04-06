import { useDisclosure } from "@/lib/utils"
import { createContext, useContext, type PropsWithChildren } from "react"
import { Button } from "./ui/button"
import { RiArrowDownSLine } from "@remixicon/react"

const Context = createContext({
  isOpen: false,
  toggle: () => {},
})

export function useCollapseSection() {
  return useContext(Context)
}

export function CollapseSection({ children }: PropsWithChildren) {
  const { isOpen, toggle } = useDisclosure()

  const state = {
    isOpen,
    toggle,
  }

  return (
    <Context.Provider value={state}>
      <div className="group rounded-md border py-4" data-open={isOpen}>
        {children}
      </div>
    </Context.Provider>
  )
}

export function CollapseSectionHeader({
  children,
  asChild = false,
  ...props
}: PropsWithChildren & React.ComponentProps<"div"> & { asChild?: boolean }) {
  const { toggle } = useCollapseSection()

  return asChild ? (
    children
  ) : (
    <div className="flex items-center justify-between gap-2 px-4" {...props}>
      <div className="flex w-full items-center justify-between gap-2">
        {children}
      </div>
      <Button onClick={toggle} variant="ghost" size="icon-sm">
        <RiArrowDownSLine className="transition group-data-[open=true]:rotate-180" />
      </Button>
    </div>
  )
}

export function CollapseSectionTitle({ children }: PropsWithChildren) {
  return <h2 className="font-medium">{children}</h2>
}

export function CollapseSectionContent({
  children,
  ...props
}: PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div
      className="overflow-hidden transition group-data-[open=false]:pointer-events-none group-data-[open=false]:hidden"
      {...props}
    >
      <div className="mt-2 px-4">{children}</div>
    </div>
  )
}
