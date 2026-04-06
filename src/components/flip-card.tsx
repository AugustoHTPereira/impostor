import { cn, useDisclosure } from "@/lib/utils"
import type React from "react"
import { useEffect, useState, type ReactNode } from "react"

interface FlipCardProps {
  children: [ReactNode, ReactNode]
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function FlipCard({
  children,
  open,
  className,
  onOpenChange,
  ...props
}: FlipCardProps & React.ComponentProps<"div">) {
  const { isOpen, toggle, close, open: openDisclosure } = useDisclosure()
  const [front, back] = children
  const [interval, updateInterval] = useState<number | null>(null)

  useEffect(() => {
    if (open) {
      openDisclosure()
    }
  }, [open])

  useEffect(() => {
    onOpenChange?.(isOpen)
  }, [isOpen])

  function handleToggle() {
    if (!isOpen) {
      toggle()
      updateInterval(
        setTimeout(() => {
          close()
        }, 2000)
      )
    } else {
      close()
      if (interval) clearInterval(interval)
      updateInterval(null)
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
