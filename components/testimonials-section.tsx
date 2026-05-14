"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sophie & Marc",
    location: "France",
    date: "2025",
    rating: 5,
    text: "Un véritable coup de cœur ! Le spa est absolument divin, et pouvoir déguster un verre de vin sur la terrasse sur le toit après une journée dans la médina, c'est un luxe rare à Marrakech.",
  },
  {
    name: "Elena",
    location: "Espagne",
    date: "2025",
    rating: 5,
    text: "Christine et son équipe sont aux petits soins. Le petit-déjeuner est un festin, les chambres sont magnifiques et le fait de pouvoir arriver en voiture jusqu'au riad est un vrai plus.",
  },
  {
    name: "Thomas",
    location: "Belgique",
    date: "2024",
    rating: 5,
    text: "Ayadina est notre adresse secrète à Marrakech. Le hammam traditionnel suivi d'un massage, puis un cocktail au bar... On y retourne chaque année !",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">
            Témoignages
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Ce que disent nos hôtes
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-foreground font-medium">9.0/10</span>
            <span className="text-muted-foreground">sur 411 avis vérifiés</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-medium text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location} • {testimonial.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* TripAdvisor/Google Badge */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Retrouvez tous nos avis sur{" "}
            <a href="https://www.tripadvisor.com/Hotel_Review-g293734-d585332-Reviews-Riad_Ayadina_et_SPa-Marrakech_Marrakech_Safi.html" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">TripAdvisor</a>
            {" "}et{" "}
            <a href="https://g.page/riad-ayadina-spa" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">Google</a>
          </p>
        </div>
      </div>
    </section>
  )
}
