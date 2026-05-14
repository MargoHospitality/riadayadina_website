import { Star } from "lucide-react"
import { getFeaturedReviews, reviewSummary } from "@/data/reviews"

interface TestimonialsSectionProps {
  limit?: number
}

export function TestimonialsSection({ limit = 3 }: TestimonialsSectionProps) {
  const reviews = getFeaturedReviews(limit)

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">
            {reviewSummary.eyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            {reviewSummary.title}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <div className="flex" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-foreground font-medium">{reviewSummary.ratingLabel}</span>
            <span className="text-muted-foreground">sur {reviewSummary.reviewCountLabel}</span>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground/80">
            Sources : {reviewSummary.sourcesLabel}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-card border border-border p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {review.theme}
                </span>
                <a
                  href={review.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary underline-offset-4 hover:underline"
                >
                  {review.source}
                </a>
              </div>

              <blockquote className="text-foreground mb-6 leading-relaxed">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              <div className="border-t border-border pt-4">
                <p className="font-medium text-foreground">{review.authorLabel}</p>
                <p className="text-sm text-muted-foreground">
                  {[review.location, review.dateLabel].filter(Boolean).join(" • ")}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Source links */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Retrouvez tous nos avis sur{" "}
            {reviewSummary.sourceLinks.map((source, index) => (
              <span key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:no-underline"
                >
                  {source.label}
                </a>
                {index < reviewSummary.sourceLinks.length - 1 ? " et " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
