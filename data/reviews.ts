export interface GuestReview {
  id: string
  sourceUrl: string
  authorLabel: string
  dateLabel: string
  quote: string
  rating: number
}

export interface ReviewSummary {
  eyebrow: string
  title: string
  ratingLabel: string
  ratingValue: number
  reviewCountLabel: string
  reviewCount?: number
  sourcesLabel: string
  googleMapsUrl: string
  isLive: boolean
}

export interface ReviewsData {
  summary: ReviewSummary
  reviews: GuestReview[]
}

export const defaultGoogleReviewSummary: ReviewSummary = {
  eyebrow: "Témoignages",
  title: "Ce que disent nos hôtes",
  ratingLabel: "4,5/5",
  ratingValue: 4.5,
  reviewCountLabel: "avis Google",
  sourcesLabel: "Google",
  googleMapsUrl: "https://g.page/riad-ayadina-spa",
  isLive: false,
}
