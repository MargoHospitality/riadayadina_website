export type ReviewSource = "Booking.com" | "TripAdvisor" | "Google"

export interface GuestReview {
  id: string
  source: ReviewSource
  sourceUrl: string
  authorLabel: string
  location?: string
  dateLabel: string
  quote: string
  theme: string
  featured?: boolean
}

export const reviewSummary = {
  eyebrow: "Témoignages",
  title: "Ce que disent nos hôtes",
  ratingLabel: "9.0/10",
  reviewCountLabel: "411 avis vérifiés",
  sourcesLabel: "Booking.com, TripAdvisor et Google",
  sourceLinks: [
    {
      label: "TripAdvisor",
      href: "https://www.tripadvisor.com/Hotel_Review-g293734-d585332-Reviews-Riad_Ayadina_et_SPa-Marrakech_Marrakech_Safi.html",
    },
    {
      label: "Google",
      href: "https://g.page/riad-ayadina-spa",
    },
  ],
}

export const guestReviews: GuestReview[] = [
  {
    id: "tripadvisor-spa-piscine",
    source: "TripAdvisor",
    sourceUrl: "https://www.tripadvisor.fr/Hotel_Review-g293734-d585332-Reviews-Riad_Ayadina_Spa-Marrakech_Marrakech_Safi.html",
    authorLabel: "Hôte TripAdvisor",
    location: "France",
    dateLabel: "Avis public",
    theme: "Spa & piscine",
    featured: true,
    quote:
      "Très bon séjour au Riad Ayadina, piscine et spa, avec hammam, gommage et massage très agréables.",
  },
  {
    id: "booking-diner-riads",
    source: "Booking.com",
    sourceUrl: "https://www.booking.com/reviews/ma/hotel/riad-ayadina.fr.html",
    authorLabel: "Hôte Booking.com",
    dateLabel: "Avis public",
    theme: "Restaurant & atmosphère",
    featured: true,
    quote:
      "Le dîner est très agréable. Le lieu est magnifique, on s’y sent bien tout de suite.",
  },
  {
    id: "tripadvisor-room-rooftop",
    source: "TripAdvisor",
    sourceUrl: "https://www.tripadvisor.com/Hotel_Review-g293734-d585332-Reviews-Riad_Ayadina_et_SPa-Marrakech_Marrakech_Safi.html",
    authorLabel: "Hôte TripAdvisor",
    dateLabel: "Avis public",
    theme: "Chambres & rooftop",
    featured: true,
    quote:
      "Amazing stay: room spacious and beautifully decorated, breakfast on the rooftop terrace, dinner in the courtyard, and a very relaxing spa experience.",
  },
]

export function getFeaturedReviews(limit = 3) {
  return guestReviews.filter((review) => review.featured).slice(0, limit)
}
