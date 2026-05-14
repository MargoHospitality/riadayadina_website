"use client"

import type { ComponentProps, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { useBookingModal } from "@/components/booking-modal-provider"

type BookingPopupButtonProps = Omit<ComponentProps<typeof Button>, "onClick" | "asChild"> & {
  children: ReactNode
}

export function BookingPopupButton({ children, ...props }: BookingPopupButtonProps) {
  const { openBookingModal } = useBookingModal()

  return (
    <Button {...props} onClick={() => openBookingModal()}>
      {children}
    </Button>
  )
}
