import { defaultGoogleReviewSummary, type GuestReview, type ReviewsData } from "@/data/reviews"

const GOOGLE_PLACE_DETAILS_ENDPOINT = "https://places.googleapis.com/v1/places"
const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 24

interface GoogleLocalizedText {
  text?: string
  languageCode?: string
}

interface GoogleAuthorAttribution {
  displayName?: string
  uri?: string
}

interface GoogleReview {
  name?: string
  relativePublishTimeDescription?: string
  rating?: number
  text?: GoogleLocalizedText
  originalText?: GoogleLocalizedText
  authorAttribution?: GoogleAuthorAttribution
  publishTime?: string
}

interface GooglePlaceDetails {
  id?: string
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  reviews?: GoogleReview[]
}

function formatRating(rating?: number) {
  if (typeof rating !== "number") return defaultGoogleReviewSummary.ratingLabel
  return `${rating.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}/5`
}

function formatReviewCount(count?: number) {
  if (typeof count !== "number") return defaultGoogleReviewSummary.reviewCountLabel
  return `${count.toLocaleString("fr-FR")} avis Google`
}

function normalizeReview(review: GoogleReview): GuestReview | null {
  const quote = review.text?.text || review.originalText?.text
  if (!quote) return null

  return {
    id: review.name || `${review.authorAttribution?.displayName ?? "google"}-${review.publishTime ?? quote}`,
    sourceUrl: review.authorAttribution?.uri || defaultGoogleReviewSummary.googleMapsUrl,
    authorLabel: review.authorAttribution?.displayName || "Hôte Google",
    dateLabel: review.relativePublishTimeDescription || "Avis Google",
    quote,
    rating: typeof review.rating === "number" ? review.rating : 5,
  }
}

export async function getGoogleReviews(limit = 3): Promise<ReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return { summary: defaultGoogleReviewSummary, reviews: [] }
  }

  try {
    const response = await fetch(
      `${GOOGLE_PLACE_DETAILS_ENDPOINT}/${placeId}?languageCode=fr`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": [
            "id",
            "rating",
            "userRatingCount",
            "googleMapsUri",
            "reviews.name",
            "reviews.relativePublishTimeDescription",
            "reviews.rating",
            "reviews.text",
            "reviews.originalText",
            "reviews.authorAttribution.displayName",
            "reviews.authorAttribution.uri",
            "reviews.publishTime",
          ].join(","),
        },
        next: { revalidate: REVIEWS_REVALIDATE_SECONDS },
      }
    )

    if (!response.ok) {
      console.warn("Google Places reviews fetch failed", response.status, await response.text())
      return { summary: defaultGoogleReviewSummary, reviews: [] }
    }

    const place = (await response.json()) as GooglePlaceDetails
    const googleMapsUrl = place.googleMapsUri || defaultGoogleReviewSummary.googleMapsUrl
    const reviews = (place.reviews ?? [])
      .map(normalizeReview)
      .filter((review): review is GuestReview => Boolean(review))
      .slice(0, limit)

    return {
      summary: {
        ...defaultGoogleReviewSummary,
        ratingLabel: formatRating(place.rating),
        ratingValue: typeof place.rating === "number" ? place.rating : defaultGoogleReviewSummary.ratingValue,
        reviewCountLabel: formatReviewCount(place.userRatingCount),
        reviewCount: place.userRatingCount,
        googleMapsUrl,
        isLive: true,
      },
      reviews,
    }
  } catch (error) {
    console.warn("Google Places reviews fetch errored", error)
    return { summary: defaultGoogleReviewSummary, reviews: [] }
  }
}
