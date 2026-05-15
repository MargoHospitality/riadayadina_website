import { Star } from "lucide-react"
import { getDictionary } from "@/lib/i18n/dictionary"
import type { Locale } from "@/lib/i18n/routing"
import { getGoogleReviews } from "@/lib/google-reviews"

interface TestimonialsSectionProps {
  limit?: number
  locale?: Locale
}

function StarRating({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  const roundedRating = Math.round(rating)

  return (
    <div className="flex" aria-label={`${rating}/5`}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`${size} ${index < roundedRating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  )
}

export async function TestimonialsSection({ limit = 3, locale = "fr" }: TestimonialsSectionProps) {
  const dict = getDictionary(locale)
  const { summary, reviews } = await getGoogleReviews(limit, locale)
  const ratingSeparator = locale === "fr" ? "," : "."
  const ratingParts = summary.ratingValue.toLocaleString(locale === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: 1 }).split(ratingSeparator)

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">
            {dict.reviews.eyebrow}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8">
            {dict.reviews.title}
          </h2>

          <a
            href={summary.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto mb-5 inline-flex items-center gap-5 border border-accent/25 bg-card px-6 py-5 text-left shadow-sm transition-all hover:border-accent/50 hover:shadow-md"
            aria-label={locale === "fr" ? `Voir les avis Google du Riad Ayadina, note moyenne ${summary.ratingLabel}` : `View Riad Ayadina Google reviews, average rating ${summary.ratingLabel}`}
          >
            <span className="flex items-end font-serif text-5xl leading-none text-foreground">
              {ratingParts[0]}
              {ratingParts[1] && <span className="text-3xl text-accent">{ratingSeparator}{ratingParts[1]}</span>}
              <span className="mb-1 ml-1 text-base font-sans text-muted-foreground">/5</span>
            </span>
            <span className="h-12 w-px bg-border" aria-hidden="true" />
            <span>
              <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {dict.common.googleRating}
              </span>
              <StarRating rating={summary.ratingValue} size="h-4 w-4" />
              <span className="mt-1 block text-sm text-muted-foreground group-hover:text-foreground">
                {summary.reviewCountLabel}
              </span>
            </span>
          </a>

          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground/80">
            {dict.common.source} : {summary.sourcesLabel} · {dict.common.dailyRefresh}
          </p>
        </div>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex h-full flex-col bg-card border border-border p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <StarRating rating={review.rating} />
                  <a
                    href={summary.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary underline-offset-4 hover:underline"
                  >
                    Google
                  </a>
                </div>

                <blockquote className="relative mb-6 min-h-[9rem] flex-1 overflow-hidden text-foreground leading-relaxed">
                  <span
                    className="block"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 6,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    &ldquo;{review.quote}&rdquo;
                  </span>
                </blockquote>

                <div className="border-t border-border pt-4">
                  <p className="font-medium text-foreground">{review.authorLabel}</p>
                  <p className="text-sm text-muted-foreground">{review.dateLabel}</p>
                  <details className="group mt-3">
                    <summary
                      className="cursor-pointer list-none text-sm text-primary underline-offset-4 hover:underline"
                      aria-label={locale === "fr" ? `Lire l’avis complet de ${review.authorLabel}` : `Read ${review.authorLabel}’s full review`}
                    >
                      {dict.common.completeReview}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      “{review.quote}”
                    </p>
                  </details>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              {dict.common.reviewsLoadingFallback}
            </p>
          </div>
        )}

        {/* Source link */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            {dict.common.reviewsIntro}{" "}
            <a
              href={summary.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              Google
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
