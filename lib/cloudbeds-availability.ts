import { BookingSearch } from "@/lib/booking-engine"
import { propertyConfig } from "@/lib/property-config"

export type CloudbedsRoomAvailability = {
  roomTypeId: string
  name: string
  roomsAvailable: number
  minRate?: number
  currency?: string
}

export type CloudbedsAvailability = {
  status: "available" | "no_availability" | "unconfigured" | "timeout" | "error"
  rooms: CloudbedsRoomAvailability[]
  checkedAt: string
  latencyMs?: number
  message?: string
}

const CLOUDBEDS_ENDPOINT = "https://api.cloudbeds.com/api/v1.3/getAvailableRoomTypes"
const TIMEOUT_MS = 4_000

function getCloudbedsApiKey() {
  return process.env.CLOUDBEDS_API_KEY || process.env.CLOUDBEDS_WRITE_API_KEY || process.env.CLOUDBEDS_ACCESS_TOKEN || null
}

export async function getCloudbedsAvailability(search: BookingSearch): Promise<CloudbedsAvailability> {
  const apiKey = getCloudbedsApiKey()
  const checkedAt = new Date().toISOString()

  if (!apiKey) {
    return {
      status: "unconfigured",
      rooms: [],
      checkedAt,
      message: "La vérification Cloudbeds n'est pas configurée sur cet environnement.",
    }
  }

  const controller = new AbortController()
  const startedAt = Date.now()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const params = new URLSearchParams({
      propertyIDs: propertyConfig.cloudbedsPropertyId,
      startDate: search.checkIn,
      endDate: search.checkOut,
      rooms: "1",
      adults: String(search.adults || 2),
      children: "0",
      currency: search.currency || propertyConfig.defaultCurrency,
      detailedRates: "false",
      pageSize: "50",
    })

    const response = await fetch(`${CLOUDBEDS_ENDPOINT}?${params.toString()}`, {
      headers: {
        "x-api-key": apiKey,
        "X-PROPERTY-ID": propertyConfig.cloudbedsPropertyId,
      },
      cache: "no-store",
      signal: controller.signal,
    })
    const latencyMs = Date.now() - startedAt

    if (!response.ok) {
      return {
        status: "error",
        rooms: [],
        checkedAt,
        latencyMs,
        message: `Cloudbeds a répondu ${response.status}.`,
      }
    }

    const payload: unknown = await response.json()
    if (!isRecord(payload) || payload.success !== true) {
      return {
        status: "error",
        rooms: [],
        checkedAt,
        latencyMs,
        message: getMessage(payload) || "Cloudbeds n'a pas confirmé la disponibilité.",
      }
    }

    const rooms = collectRooms(payload)
    const hasAvailability = rooms.some((room) => room.roomsAvailable > 0)

    return {
      status: hasAvailability ? "available" : "no_availability",
      rooms,
      checkedAt,
      latencyMs,
      message: hasAvailability ? undefined : "Aucune chambre disponible en ligne sur Cloudbeds pour ces dates.",
    }
  } catch (error) {
    return {
      status: error instanceof Error && error.name === "AbortError" ? "timeout" : "error",
      rooms: [],
      checkedAt,
      latencyMs: Date.now() - startedAt,
      message:
        error instanceof Error && error.name === "AbortError"
          ? "Cloudbeds a dépassé le délai maximal prévu."
          : "Vérification Cloudbeds momentanément indisponible.",
    }
  } finally {
    clearTimeout(timeout)
  }
}

function collectRooms(payload: Record<string, unknown>) {
  const roomsByType = new Map<string, CloudbedsRoomAvailability>()
  const properties = Array.isArray(payload.data) ? payload.data : []

  for (const property of properties) {
    if (!isRecord(property)) continue
    const currency = getCurrencyCode(property.propertyCurrency)
    const propertyRooms = Array.isArray(property.propertyRooms) ? property.propertyRooms : []

    for (const value of propertyRooms) {
      if (!isRecord(value)) continue

      const roomTypeId = toStringValue(value.roomTypeID) || toStringValue(value.roomTypeName)
      const name = toStringValue(value.roomTypeName) || "Chambre"
      const roomsAvailable = toNumber(value.roomsAvailable) || 0
      const roomRate = toNumber(value.roomRate)
      if (!roomTypeId) continue

      const previous = roomsByType.get(roomTypeId)
      roomsByType.set(roomTypeId, {
        roomTypeId,
        name,
        roomsAvailable: Math.max(previous?.roomsAvailable || 0, roomsAvailable),
        minRate: getLowestDefined(previous?.minRate, roomRate),
        currency: previous?.currency || currency,
      })
    }
  }

  return [...roomsByType.values()].sort((a, b) => a.name.localeCompare(b.name))
}

function getLowestDefined(a: number | undefined, b: number | undefined) {
  if (a === undefined) return b
  if (b === undefined) return a
  return Math.min(a, b)
}

function getCurrencyCode(value: unknown) {
  if (isRecord(value) && typeof value.currencyCode === "string") return value.currencyCode
  if (Array.isArray(value)) {
    const first = value.find(isRecord)
    if (first && typeof first.currencyCode === "string") return first.currencyCode
  }
  return undefined
}

function getMessage(payload: unknown) {
  if (!isRecord(payload)) return undefined
  if (typeof payload.message === "string") return payload.message
  if (typeof payload.title === "string") return payload.title
  if (typeof payload.error === "string") return payload.error
  return undefined
}

function toStringValue(value: unknown) {
  return typeof value === "string" ? value : undefined
}

function toNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}
