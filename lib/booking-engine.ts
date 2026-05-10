import { propertyConfig } from "@/lib/property-config"

export type BookingSearch = {
  checkIn: string
  checkOut: string
  adults?: string | number
  currency?: string
  language?: string
}

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/
const supportedCurrencies = new Set(["MAD", "EUR", "USD", "GBP", "CAD", "CHF", "AED", "SAR"])
const supportedLanguages = new Set(["fr", "en", "es", "de", "it", "pt", "nl", "ar"])

const countryCurrency: Record<string, string> = {
  MA: "MAD",
  FR: "EUR",
  BE: "EUR",
  ES: "EUR",
  IT: "EUR",
  DE: "EUR",
  NL: "EUR",
  PT: "EUR",
  IE: "EUR",
  AT: "EUR",
  LU: "EUR",
  MC: "EUR",
  US: "USD",
  CA: "CAD",
  GB: "GBP",
  CH: "CHF",
  AE: "AED",
  SA: "SAR",
}

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
  const currency = normalizeBookingCurrency(search.currency || inferCurrencyFromBrowser())
  const language = normalizeBookingLanguage(search.language || propertyConfig.defaultLanguage)

  applyCloudbedsLanguagePath(url, language)

  const bookingParams = new URLSearchParams({
    checkin: search.checkIn,
    checkout: search.checkOut,
    adults: String(search.adults || 2),
    guests: String(search.adults || 2),
    currency: currency.toLowerCase(),
    language,
  })

  bookingParams.forEach((value, key) => url.searchParams.set(key, value))

  // Cloudbeds Booking Engine Plus also reads booking context from the URL hash on initial load.
  url.hash = bookingParams.toString()

  return url.toString()
}

export function normalizeBookingCurrency(value: string | undefined) {
  const currency = value?.trim().toUpperCase()
  if (currency && supportedCurrencies.has(currency)) return currency
  return propertyConfig.defaultCurrency.toUpperCase()
}

export function normalizeBookingLanguage(value: string | undefined) {
  const language = value?.trim().toLowerCase().split(/[-_]/)[0]
  if (language && supportedLanguages.has(language)) return language
  return propertyConfig.defaultLanguage.toLowerCase()
}

export function inferCurrencyFromCountry(country: string | undefined) {
  return normalizeBookingCurrency(countryCurrency[country?.trim().toUpperCase() || ""])
}

export function inferCurrencyFromLocale(locale: string | undefined) {
  const region = getLocaleRegion(locale)
  return region ? inferCurrencyFromCountry(region) : normalizeBookingCurrency(undefined)
}

function inferCurrencyFromBrowser() {
  if (typeof navigator === "undefined") return propertyConfig.defaultCurrency
  const locales = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const locale of locales) {
    const currency = inferCurrencyFromLocale(locale)
    if (currency !== propertyConfig.defaultCurrency.toUpperCase()) return currency
  }
  return propertyConfig.defaultCurrency
}

function getLocaleRegion(locale: string | undefined) {
  if (!locale) return undefined
  try {
    return new Intl.Locale(locale).region
  } catch {
    const match = locale.match(/[-_]([A-Za-z]{2})$/)
    return match?.[1]
  }
}

function applyCloudbedsLanguagePath(url: URL, language: string) {
  if (url.hostname !== "hotels.cloudbeds.com") return

  const segments = url.pathname.split("/").filter(Boolean)
  const reservationIndex = segments.indexOf("reservation")
  if (reservationIndex === -1) return

  const bookingEngineId = segments[reservationIndex + 1] || propertyConfig.bookingEngineId
  url.pathname = `/${language}/reservation/${bookingEngineId}`
}
