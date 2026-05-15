import { defaultGoogleReviewSummary, type GuestReview, type ReviewsData } from "@/data/reviews"
import { getDictionary } from "@/lib/i18n/dictionary"
import { getIntlLocale, type Locale } from "@/lib/i18n/routing"

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

function formatRating(rating: number | undefined, locale: Locale) {
  if (typeof rating !== "number") return defaultGoogleReviewSummary.ratingLabel
  return `${rating.toLocaleString(getIntlLocale(locale), { maximumFractionDigits: 1 })}/5`
}

function formatReviewCount(count: number | undefined, locale: Locale) {
  const dict = getDictionary(locale)
  if (typeof count !== "number") return defaultGoogleReviewSummary.reviewCountLabel
  return `${count.toLocaleString(getIntlLocale(locale))} ${dict.reviews.reviewCountSuffix}`
}

function normalizeReview(review: GoogleReview, locale: Locale): GuestReview | null {
  const quote = review.text?.text || review.originalText?.text
  const rating = typeof review.rating === "number" ? review.rating : null
  if (!quote || rating === null || rating < 4) return null

  return {
    id: review.name || `${review.authorAttribution?.displayName ?? "google"}-${review.publishTime ?? quote}`,
    sourceUrl: review.authorAttribution?.uri || defaultGoogleReviewSummary.googleMapsUrl,
    authorLabel: review.authorAttribution?.displayName || getDictionary(locale).reviews.guest,
    dateLabel: review.relativePublishTimeDescription || getDictionary(locale).reviews.reviewLabel,
    quote,
    rating,
  }
}

export async function getGoogleReviews(limit = 3, locale: Locale = "fr"): Promise<ReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return { summary: defaultGoogleReviewSummary, reviews: [] }
  }

  try {
    const response = await fetch(
      `${GOOGLE_PLACE_DETAILS_ENDPOINT}/${placeId}?languageCode=${locale}`,
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
      .map((review) => normalizeReview(review, locale))
      .filter((review): review is GuestReview => Boolean(review))
      .slice(0, limit)

    return {
      summary: {
        ...defaultGoogleReviewSummary,
        ratingLabel: formatRating(place.rating, locale),
        ratingValue: typeof place.rating === "number" ? place.rating : defaultGoogleReviewSummary.ratingValue,
        reviewCountLabel: formatReviewCount(place.userRatingCount, locale),
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
