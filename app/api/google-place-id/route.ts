import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const PLACE_SEARCH_QUERY = "Riad Ayadina & Spa Marrakech Morocco"

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "missing_google_places_api_key" }, { status: 503 })
  }

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": [
        "places.id",
        "places.displayName",
        "places.formattedAddress",
        "places.location",
        "places.googleMapsUri",
        "places.rating",
        "places.userRatingCount",
      ].join(","),
    },
    body: JSON.stringify({
      textQuery: PLACE_SEARCH_QUERY,
      languageCode: "fr",
      regionCode: "MA",
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: "google_places_search_failed", status: response.status, body: await response.text() },
      { status: 502 }
    )
  }

  const data = await response.json()

  return NextResponse.json({ query: PLACE_SEARCH_QUERY, ...data })
}
