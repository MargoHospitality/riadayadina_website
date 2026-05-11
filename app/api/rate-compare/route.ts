import { NextResponse } from "next/server"
import { inferCurrencyFromCountry, isValidBookingSearch, normalizeBookingCurrency, normalizeBookingLanguage } from "@/lib/booking-engine"
import { getCloudbedsAvailability } from "@/lib/cloudbeds-availability"
import { getRateComparison, type RateComparison } from "@/lib/rate-compare"

export const dynamic = "force-dynamic"

type Search = {
  checkIn?: string
  checkOut?: string
  adults?: string
  currency?: string
  language?: string
}

const CACHE_TTL_MS = 5 * 60 * 1000
const cache = new Map<string, { expiresAt: number; value: RateComparison }>()

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(request) })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search: Search = {
    checkIn: searchParams.get("checkIn") || undefined,
    checkOut: searchParams.get("checkOut") || undefined,
    adults: searchParams.get("adults") || "2",
    currency: normalizeBookingCurrency(searchParams.get("currency") || inferCurrencyFromRequest(request)),
    language: normalizeBookingLanguage(searchParams.get("language") || request.headers.get("accept-language") || undefined),
  }

  if (!isValidBookingSearch(search)) {
    return NextResponse.json({ error: "Invalid booking search" }, { status: 400, headers: getCorsHeaders(request) })
  }

  const cacheKey = `${search.checkIn}:${search.checkOut}:${search.adults || 2}:${search.currency}:${search.language}`
  const cached = cache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now()) {
    return json(cached.value, "HIT", request)
  }

  const availability = await getCloudbedsAvailability(search)

  const comparison: RateComparison =
    availability.status === "no_availability"
      ? {
          status: "no_availability",
          offers: [],
          source: "DataForSEO Google Hotels",
          checkedAt: availability.checkedAt,
          message: availability.message,
          availability,
        }
      : {
          ...(await getRateComparison(search)),
          availability,
        }

  if (isCacheableComparison(comparison)) {
    cache.set(cacheKey, { expiresAt: Date.now() + CACHE_TTL_MS, value: comparison })
  }

  return json(comparison, "MISS", request)
}

function isCacheableComparison(comparison: RateComparison) {
  return comparison.status !== "error" && comparison.status !== "timeout" && comparison.status !== "unconfigured"
}

function inferCurrencyFromRequest(request: Request) {
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    undefined

  return inferCurrencyFromCountry(country)
}

function json(value: RateComparison, cacheStatus: "HIT" | "MISS", request: Request) {
  return NextResponse.json(value, {
    headers: {
      ...getCorsHeaders(request),
      "Cache-Control": "private, max-age=300",
      "X-Margo-Cache": cacheStatus,
    },
  })
}

function getCorsHeaders(request: Request) {
  const origin = request.headers.get("origin") || ""
  const allowedOrigin =
    origin === "https://hotels.cloudbeds.com" || origin.endsWith(".cloudbeds.com") || origin.includes("riad-ayadina")
      ? origin
      : "https://hotels.cloudbeds.com"

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  }
}
