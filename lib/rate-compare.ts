import { BookingSearch } from "@/lib/booking-engine"

export type RateOffer = {
  title: string
  price: number
  currency: string
  domain?: string
  url?: string
  conditions?: string
  officialSite?: boolean
  freeCancellationUntil?: string | null
}

export type RateComparison = {
  status: "available" | "unconfigured" | "timeout" | "error" | "empty"
  directOffer?: RateOffer
  offers: RateOffer[]
  source: "DataForSEO Google Hotels"
  checkedAt?: string
  message?: string
}

const DATAFORSEO_ENDPOINT = "https://api.dataforseo.com/v3/business_data/google/hotel_info/live/advanced"
const DEFAULT_LOCATION_CODE = 1009979 // Marrakesh,Morocco in DataForSEO business_data/google locations.
const MAX_OFFERS = 6
const TIMEOUT_MS = 8_000

export async function getRateComparison(search: BookingSearch): Promise<RateComparison> {
  const authorization = getDataForSeoAuthorization()
  const hotelIdentifier = process.env.DATAFORSEO_HOTEL_IDENTIFIER

  if (!authorization || !hotelIdentifier) {
    return {
      status: "unconfigured",
      offers: [],
      source: "DataForSEO Google Hotels",
      message: "La comparaison Google Hotels n'est pas encore activée sur cet environnement.",
    }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(DATAFORSEO_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          hotel_identifier: hotelIdentifier,
          ...getDataForSeoLocation(),
          language_code: process.env.DATAFORSEO_LANGUAGE_CODE || "fr",
          check_in: search.checkIn,
          check_out: search.checkOut,
          adults: Number(search.adults || 2),
          currency: process.env.DATAFORSEO_CURRENCY || "MAD",
        },
      ]),
      cache: "no-store",
      signal: controller.signal,
    })

    if (!response.ok) {
      return {
        status: "error",
        offers: [],
        source: "DataForSEO Google Hotels",
        message: `DataForSEO a répondu ${response.status}.`,
      }
    }

    const payload: unknown = await response.json()
    const { directOffer, externalOffers } = collectOffers(payload)
    const hasOffers = Boolean(directOffer) || externalOffers.length > 0

    return {
      status: hasOffers ? "available" : "empty",
      directOffer,
      offers: externalOffers,
      source: "DataForSEO Google Hotels",
      checkedAt: new Date().toISOString(),
      message: hasOffers ? undefined : "Google Hotels n'a pas renvoyé d'offres exploitables pour ces dates.",
    }
  } catch (error) {
    return {
      status: error instanceof Error && error.name === "AbortError" ? "timeout" : "error",
      offers: [],
      source: "DataForSEO Google Hotels",
      message:
        error instanceof Error && error.name === "AbortError"
          ? "La comparaison externe a dépassé le délai maximal prévu."
          : "Comparaison externe momentanément indisponible.",
    }
  } finally {
    clearTimeout(timeout)
  }
}

function getDataForSeoAuthorization() {
  const basicAuth = process.env.DATAFORSEO_BASIC_AUTH?.replace(/^Basic\s+/i, "").trim()
  if (basicAuth) return `Basic ${basicAuth}`

  const login = process.env.DATAFORSEO_LOGIN
  const password = process.env.DATAFORSEO_PASSWORD
  if (!login || !password) return null

  return `Basic ${Buffer.from(`${login}:${password}`).toString("base64")}`
}

function getDataForSeoLocation() {
  const locationCode = Number(process.env.DATAFORSEO_LOCATION_CODE || DEFAULT_LOCATION_CODE)
  if (Number.isFinite(locationCode)) return { location_code: locationCode }

  return { location_name: process.env.DATAFORSEO_LOCATION_NAME || "Marrakesh,Morocco" }
}

function collectOffers(payload: unknown) {
  const directOffers = new Map<string, RateOffer>()
  const externalOffers = new Map<string, RateOffer>()

  for (const value of getPriceItems(payload)) {
    const price = value.price
    const currency = value.currency
    const title = value.title

    if (typeof price !== "number" || typeof currency !== "string" || typeof title !== "string") continue

    const domain = typeof value.domain === "string" ? value.domain : undefined
    const url = typeof value.url === "string" ? value.url : undefined
    const officialSite = value.official_site === true
    const offer: RateOffer = {
      title,
      price,
      currency,
      domain,
      url,
      conditions: officialSite ? "Flexible, sans prépaiement" : "Non remboursable",
      officialSite,
      freeCancellationUntil:
        typeof value.free_cancellation_until === "string" || value.free_cancellation_until === null
          ? value.free_cancellation_until
          : undefined,
    }

    const key = `${normalizeOfferTitle(offer.title)}-${offer.price}-${offer.currency}`
    const target = officialSite ? directOffers : externalOffers
    const previous = target.get(key)

    if (!previous || isBetterOfferRecord(offer, previous)) target.set(key, offer)
  }

  return {
    directOffer: [...directOffers.values()].sort((a, b) => a.price - b.price)[0],
    externalOffers: [...externalOffers.values()].sort((a, b) => a.price - b.price).slice(0, MAX_OFFERS),
  }
}

function normalizeOfferTitle(title: string) {
  return title.trim().toLowerCase().replace(/\s+/g, " ")
}

function isBetterOfferRecord(next: RateOffer, previous: RateOffer) {
  if (!previous.url && next.url) return true
  if (previous.domain === "google.co.ma" && next.domain && next.domain !== "google.co.ma") return true
  return false
}

function getPriceItems(payload: unknown): Record<string, unknown>[] {
  const items: Record<string, unknown>[] = []

  walk(payload, (value) => {
    if (!isRecord(value)) return
    if (value.type === "hotel_info_price" && typeof value.title === "string") items.push(value)
  })

  return items
}

function walk(value: unknown, visit: (value: unknown) => void) {
  visit(value)

  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit)
    return
  }

  if (!isRecord(value)) return

  for (const item of Object.values(value)) walk(item, visit)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}
