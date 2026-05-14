import { Star } from "lucide-react"
import { getGoogleReviews } from "@/lib/google-reviews"

interface TestimonialsSectionProps {
  limit?: number
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

export async function TestimonialsSection({ limit = 3 }: TestimonialsSectionProps) {
  const { summary, reviews } = await getGoogleReviews(limit)

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">
            {summary.eyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            {summary.title}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <StarRating rating={Number.parseFloat(summary.ratingLabel.replace(",", ".")) || 5} size="h-5 w-5" />
            <span className="text-foreground font-medium">{summary.ratingLabel}</span>
            <span className="text-muted-foreground">sur {summary.reviewCountLabel}</span>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground/80">
            Source : {summary.sourcesLabel}
          </p>
        </div>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="bg-card border border-border p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <StarRating rating={review.rating} />
                  <a
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary underline-offset-4 hover:underline"
                  >
                    Google
                  </a>
                </div>

                <blockquote className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                <div className="border-t border-border pt-4">
                  <p className="font-medium text-foreground">{review.authorLabel}</p>
                  <p className="text-sm text-muted-foreground">{review.dateLabel}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              Les avis Google seront affichés ici dès que la connexion à Google Places sera active.
            </p>
          </div>
        )}

        {/* Source link */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Retrouvez tous nos avis sur{" "}
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
