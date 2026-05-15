"use client"

import dynamic from "next/dynamic"
import { createContext, useContext, useState, type ReactNode } from "react"
import type { Locale } from "@/lib/i18n/routing"

interface BookingModalContextType {
  openBookingModal: (defaults?: {
    checkIn?: string
    checkOut?: string
    adults?: number
  }) => void
}

const BookingModalContext = createContext<BookingModalContextType | null>(null)

const BookingDateModal = dynamic(
  () => import("./booking-date-modal").then((module) => module.BookingDateModal),
  { ssr: false }
)

export function useBookingModal() {
  const context = useContext(BookingModalContext)
  if (!context) {
    throw new Error("useBookingModal must be used within BookingModalProvider")
  }
  return context
}

export function BookingModalProvider({ children, locale = "fr" }: { children: ReactNode; locale?: Locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const [defaults, setDefaults] = useState<{
    checkIn?: string
    checkOut?: string
    adults?: number
  }>({})

  const openBookingModal = (newDefaults?: typeof defaults) => {
    if (newDefaults) setDefaults(newDefaults)
    setIsOpen(true)
  }

  return (
    <BookingModalContext.Provider value={{ openBookingModal }}>
      {children}
      {isOpen && (
        <BookingDateModal
          locale={locale}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false)
            setDefaults({})
          }}
          defaultCheckIn={defaults.checkIn}
          defaultCheckOut={defaults.checkOut}
          defaultAdults={defaults.adults}
        />
      )}
    </BookingModalContext.Provider>
  )
}
