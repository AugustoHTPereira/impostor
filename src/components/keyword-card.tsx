import { useDisclosure } from "@/lib/utils"
import type { PropsWithChildren } from "react"

export function KeywordCard({
  front,
  back,
  ...props
}: React.ComponentProps<"div"> & {
  front: React.ReactNode
  back: React.ReactNode
}) {
  const { isOpen, toggle } = useDisclosure()

  return (
    <div
      data-open={isOpen}
      onClick={toggle}
      className="group cursor-pointer [perspective:1000px]"
      {...props}
    >
      <div className="relative flex flex-col items-center justify-center rounded-md border p-4 transition-all duration-500 [transform-style:preserve-3d]">
        {!isOpen ? front : back}
      </div>
    </div>
  )
}

export function KeywordCardFront({
  children,
  ...props
}: PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div className="" {...props}>
      {children}
    </div>
  )
}

export function KeywordCardBack({
  children,
  ...props
}: PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div className="[transform:rotateY(180deg)]" {...props}>
      {children}
    </div>
  )
}
