import { NextResponse } from "next/server"
import { isValidBookingSearch } from "@/lib/booking-engine"
import { getRateComparison } from "@/lib/rate-compare"

export const dynamic = "force-dynamic"

type Search = {
  checkIn?: string
  checkOut?: string
  adults?: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search: Search = {
    checkIn: searchParams.get("checkIn") || undefined,
    checkOut: searchParams.get("checkOut") || undefined,
    adults: searchParams.get("adults") || "2",
  }

  if (!isValidBookingSearch(search)) {
    return NextResponse.json({ error: "Invalid booking search" }, { status: 400 })
  }

  const comparison = await getRateComparison(search)

  return NextResponse.json(comparison, {
    headers: {
      "Cache-Control": "private, max-age=0, no-store",
    },
  })
}
