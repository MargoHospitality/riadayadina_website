"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { useBookingModal } from "@/components/booking-modal-provider"
import { getLocalizedPath, type Locale } from "@/lib/i18n/routing"

const copy = {
  fr: {
    eyebrow: "Privilèges réservation directe",
    title: "Les attentions réservées aux hôtes en direct",
    intro: "En réservant sur le site officiel, votre séjour inclut des attentions réservées aux hôtes Ayadina.",
    recommended: "Recommandé",
    cta: "Réserver en direct",
    link: "Voir le détail de nos offres",
    cards: [
      {
        nights: "2",
        subtitle: "À partir de 2 nuitées",
        title: "Escapade",
        benefits: [
          ["Tarif direct Ayadina", true],
          ["Annulation flexible", true],
          ["Pas de prépaiement", true],
          ["Transfert aéroport aller", false],
          ["-10% sur les soins spa", false],
          ["Cocktail de bienvenue", false],
          ["Surclassement et arrivée anticipée selon disponibilité", false],
        ],
      },
      {
        nights: "3",
        subtitle: "À partir de 3 nuitées",
        title: "Immersion",
        benefits: [
          ["Tarif direct Ayadina", true],
          ["Annulation flexible", true],
          ["Pas de prépaiement", true],
          ["Transfert aéroport aller-retour", true],
          ["-10% sur les soins spa", false],
          ["Cocktail de bienvenue", false],
          ["Surclassement et arrivée anticipée selon disponibilité", false],
        ],
      },
    ],
  },
  en: {
    eyebrow: "Direct booking privileges",
    title: "Thoughtful extras for guests who book direct",
    intro: "Book on the official website to keep a direct line with the riad team and enjoy Ayadina-only benefits.",
    recommended: "Recommended",
    cta: "Book direct",
    link: "See all direct offers",
    cards: [
      {
        nights: "2",
        subtitle: "From 2 nights",
        title: "Getaway",
        benefits: [
          ["Official Ayadina direct rate", true],
          ["Flexible cancellation", true],
          ["No prepayment", true],
          ["One-way airport transfer", false],
          ["10% off spa treatments", false],
          ["Welcome cocktail", false],
          ["Upgrade and early check-in subject to availability", false],
        ],
      },
      {
        nights: "3",
        subtitle: "From 3 nights",
        title: "Immersion",
        benefits: [
          ["Official Ayadina direct rate", true],
          ["Flexible cancellation", true],
          ["No prepayment", true],
          ["Return airport transfer", true],
          ["10% off spa treatments", false],
          ["Welcome cocktail", false],
          ["Upgrade and early check-in subject to availability", false],
        ],
      },
    ],
  },
} as const

export function DirectBookingBanner({ locale = "fr" }: { locale?: Locale }) {
  const { openBookingModal } = useBookingModal()
  const t = copy[locale]
  
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-up" className="text-center mb-12 md:mb-16">
          <p className="text-accent text-sm uppercase tracking-[0.25em] mb-3">{t.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.intro}</p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {t.cards.map((card, index) => {
            const featured = index === 1
            return (
              <AnimateOnScroll key={card.title} animation="fade-up" delay={(index + 1) * 100}>
                <div className={featured ? "group relative bg-primary text-primary-foreground overflow-hidden" : "group bg-card border border-border/50 hover:border-accent/30 transition-all duration-300 overflow-hidden"}>
                  {featured && (
                    <>
                      <div className="absolute inset-0 opacity-5"><div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} /></div>
                      <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 text-xs uppercase tracking-wider">{t.recommended}</div>
                    </>
                  )}
                  <div className="relative p-6 md:p-8">
                    <div className="flex items-baseline justify-between mb-6">
                      <div>
                        <p className={featured ? "text-xs uppercase tracking-wider text-primary-foreground/60 mb-1" : "text-xs uppercase tracking-wider text-muted-foreground mb-1"}>{card.subtitle}</p>
                        <h3 className="font-serif text-2xl md:text-3xl">{card.title}</h3>
                      </div>
                      <span className={featured ? "font-serif text-4xl text-accent" : "font-serif text-4xl text-accent/60"}>{card.nights}</span>
                    </div>
                    <div className={featured ? "space-y-3 text-sm text-primary-foreground/90 mb-6" : "space-y-3 text-sm text-muted-foreground mb-6"}>
                      {card.benefits.map(([benefit, highlight]) => (
                        <div key={benefit} className="flex items-center gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full ${featured ? (highlight ? "bg-accent" : "bg-primary-foreground/40") : (highlight ? "bg-accent" : "bg-accent/60")}`} />
                          <span className={highlight ? "font-medium" : featured ? "text-primary-foreground/80" : "text-muted-foreground/80"}>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      onClick={() => openBookingModal()}
                      variant={featured ? "default" : "outline"}
                      className={featured ? "w-full rounded-none py-5 bg-white text-primary hover:bg-white/90 transition-all" : "w-full rounded-none py-5 border-foreground/20 hover:bg-foreground/5 hover:border-accent/50 transition-all"}
                    >
                      {t.cta}
                    </Button>
                  </div>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link href={getLocalizedPath("offers", locale)} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <span className="border-b border-transparent group-hover:border-foreground/30 transition-all">{t.link}</span>
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
