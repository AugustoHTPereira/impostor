import { cn, useDisclosure } from "@/lib/utils"
import type React from "react"
import { useEffect, type ReactNode } from "react"

interface FlipCardProps {
  children: [ReactNode, ReactNode]
  open?: boolean
}

export function FlipCard({
  children,
  open,
  className,
  ...props
}: FlipCardProps & React.ComponentProps<"div">) {
  const { isOpen, toggle, close, open: openDisclosure } = useDisclosure()
  const [front, back] = children

  useEffect(() => {
    if (open) {
      openDisclosure()
    }
  }, [open])

  function handleToggle() {
    if (!isOpen) {
      toggle()
      setTimeout(() => {
        close()
      }, 2000)
    } else {
      close()
    }
  }

  return (
    <div
      onClick={handleToggle}
      className={cn("h-full w-full cursor-pointer", className)}
      style={{
        perspective: "1000px",
      }}
      {...props}
    >
      <div
        className="relative h-full w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isOpen ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute h-full w-full cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          {front}
        </div>

        <div
          className="absolute h-full w-full cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </div>
    </div>
  )
}
