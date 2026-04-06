import { clsx, type ClassValue } from "clsx"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useDisclosure(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function toggle() {
    setIsOpen((prev) => !prev)
  }

  return { isOpen, open, close, toggle }
}
