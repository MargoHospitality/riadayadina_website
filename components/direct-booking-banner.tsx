"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Plane, 
  ArrowUpCircle, 
  Percent, 
  GlassWater,
  Clock,
  Check
} from "lucide-react"

const offers = [
  {
    nights: "2",
    title: "Escapade",
    benefits: [
      { icon: Percent, text: "Tarif préférentiel" },
      { icon: ArrowUpCircle, text: "Surclassement si disponible" },
      { icon: Plane, text: "Transfert aéroport aller" },
      { icon: Percent, text: "-10% sur les soins Spa" },
      { icon: GlassWater, text: "Cocktail de bienvenue" },
      { icon: Clock, text: "Early check-in si disponible" },
    ],
  },
  {
    nights: "3",
    title: "Immersion",
    featured: true,
    benefits: [
      { icon: Percent, text: "Tarif préférentiel" },
      { icon: ArrowUpCircle, text: "Surclassement si disponible" },
      { icon: Plane, text: "Transfert aéroport aller-retour" },
      { icon: Percent, text: "-10% sur les soins Spa" },
      { icon: GlassWater, text: "Cocktail de bienvenue" },
      { icon: Clock, text: "Early check-in si disponible" },
    ],
  },
]

export function DirectBookingBanner() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">
            Exclusivités réservation directe
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Pourquoi réserver chez nous ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            En réservant directement, vous bénéficiez d&apos;avantages exclusifs 
            que vous ne trouverez sur aucune plateforme.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`relative p-8 md:p-10 transition-all ${
                offer.featured 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card border border-border"
              }`}
            >
              {offer.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 text-xs uppercase tracking-wider font-medium">
                  Recommandé
                </div>
              )}
              
              <div className="text-center mb-8">
                <p className={`text-sm uppercase tracking-wider mb-2 ${
                  offer.featured ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  À partir de
                </p>
                <p className="font-serif text-5xl md:text-6xl mb-2">
                  {offer.nights}
                  <span className={`text-2xl ml-1 ${
                    offer.featured ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    nuitées
                  </span>
                </p>
                <p className={`font-serif text-xl ${
                  offer.featured ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {offer.title}
                </p>
              </div>

              <ul className="space-y-4">
                {offer.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className={`h-5 w-5 flex-shrink-0 ${
                      offer.featured ? "text-accent" : "text-primary"
                    }`} />
                    <span className={`text-sm ${
                      offer.featured ? "text-primary-foreground/90" : "text-foreground"
                    }`}>
                      {benefit.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="rounded-none px-10 py-7 text-base tracking-wide"
          >
            <Link href="/offres">
              Voir toutes nos offres
            </Link>
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            ou appelez-nous au{" "}
            <a href="tel:+212524383881" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
              +212 524 38 38 81
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
