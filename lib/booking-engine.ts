// Booking engine utilities for Riad Ayadina

export interface BookingSearch {
  checkIn: string | undefined
  checkOut: string | undefined
  adults: string
}

export function isValidBookingSearch(search: BookingSearch): boolean {
  if (!search.checkIn || !search.checkOut) return false
  
  const checkIn = new Date(search.checkIn)
  const checkOut = new Date(search.checkOut)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return checkIn >= today && checkOut > checkIn
}

export function getNightCount(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function buildBookingEngineUrl(search: BookingSearch): string {
  // Build URL for the official Riad Ayadina booking engine
  const baseUrl = "https://direct-book.com/properties/riadayadinadirect"
  const params = new URLSearchParams({
    checkInDate: search.checkIn || "",
    checkOutDate: search.checkOut || "",
    adults: search.adults || "2",
    locale: "fr",
  })
  return `${baseUrl}?${params.toString()}`
}
