import { propertyConfig } from "@/lib/property-config"

export type BookingSearch = {
  checkIn: string
  checkOut: string
  adults?: string | number
}

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/

export function isIsoDate(value: string | undefined): value is string {
  return Boolean(value && isoDatePattern.test(value) && !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime()))
}

export function isValidBookingSearch(search: Partial<BookingSearch>): search is BookingSearch {
  if (!isIsoDate(search.checkIn) || !isIsoDate(search.checkOut)) return false
  return getNightCount(search.checkIn, search.checkOut) > 0
}

export function getNightCount(checkIn: string, checkOut: string) {
  const arrival = new Date(`${checkIn}T00:00:00Z`).getTime()
  const departure = new Date(`${checkOut}T00:00:00Z`).getTime()

  return Math.round((departure - arrival) / 86_400_000)
}

export function buildBookingEngineUrl(search: BookingSearch) {
  const url = new URL(propertyConfig.bookingEngineUrl)
  const currency = propertyConfig.defaultCurrency.toLowerCase()
  url.searchParams.set("currency", currency)

  const bookingParams = new URLSearchParams({
    checkin: search.checkIn,
    checkout: search.checkOut,
    adults: String(search.adults || 2),
    currency,
  })

  // Cloudbeds Booking Engine Plus reads booking context from the URL hash on initial load.
  url.hash = bookingParams.toString()

  return url.toString()
}
