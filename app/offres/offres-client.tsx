"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookingWidget } from "@/components/booking-widget"
import { useBookingModal } from "@/components/booking-modal-provider"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import type { Locale } from "@/lib/i18n/routing"
import type { ReactNode } from "react"
import { Gift, Car, Sparkles, Clock, Wine, ShieldCheck, BadgePercent, Star, CalendarCheck, CreditCard } from "lucide-react"

const copy = {
  fr: {
    heroAlt: "Piscine sur le toit du Riad Ayadina",
    heroEyebrow: "Réservation directe",
    heroTitle: "Vos privilèges en direct",
    heroText: "Les attentions réservées aux réservations faites sur le site officiel",
    introTitle: "Pourquoi passer par le site officiel ?",
    intro1: "En réservant directement sur le site officiel, vous gardez un contact direct avec le riad et profitez d'attentions réservées aux hôtes Ayadina.",
    intro2: "Transferts aéroport, surclassements, réductions au spa, cocktails de bienvenue...",
    introHighlight: " Ces attentions sont réservées aux hôtes qui réservent auprès de nous.",
    recommended: "Recommandé",
    bookCta: "Réserver en direct",
    compareEyebrow: "Comparez librement",
    compareTitle: "Agences en ligne ou site officiel",
    compareText: "Comparez librement, puis réservez sur le moteur officiel pour bénéficier des attentions de la maison et d'un contact sans intermédiaire.",
    availability: "Vérifier les disponibilités",
    whatsapp: "Écrire sur WhatsApp",
    whatsappMessage: "Bonjour, je souhaiterais comparer les offres directes du Riad Ayadina.",
    finePrint: "* Les surclassements et arrivées anticipées sont soumis à disponibilité le jour de l'arrivée. Le transfert aéroport est valable pour l'aéroport de Marrakech-Ménara uniquement. La réduction spa est applicable sur les soins à la carte, non cumulable avec d'autres offres. Offres valables pour toute réservation effectuée directement auprès du Riad Ayadina.",
    whyDirect: [
      { icon: ShieldCheck, title: "Tarif direct officiel", description: "Vous réservez sur le moteur officiel du Riad Ayadina" },
      { icon: Gift, title: "Avantages exclusifs", description: "Transferts, surclassements, réductions spa... uniquement en direct" },
      { icon: Star, title: "Flexibilité maximale", description: "Annulation flexible et pas de prépaiement" },
    ],
    offers: [
      {
        nights: 2,
        title: "Escapade",
        subtitle: "À partir de 2 nuitées",
        description: "Les attentions directes pour une escapade Ayadina dès 2 nuits",
        benefits: [
          { icon: BadgePercent, text: "Tarif direct Ayadina", highlight: true },
          { icon: CalendarCheck, text: "Annulation flexible", highlight: true },
          { icon: CreditCard, text: "Pas de prépaiement", highlight: true },
          { icon: Sparkles, text: "Surclassement et arrivée anticipée selon disponibilité" },
          { icon: Car, text: "Transfert aéroport aller" },
          { icon: Gift, text: "-10% sur les soins au Spa" },
          { icon: Wine, text: "Cocktail de bienvenue" },
          { icon: Clock, text: "Arrivée anticipée selon disponibilité" },
        ],
      },
      {
        nights: 3,
        title: "Immersion",
        subtitle: "À partir de 3 nuitées",
        description: "L’expérience directe la plus complète, avec transfert aller-retour inclus",
        featured: true,
        benefits: [
          { icon: BadgePercent, text: "Tarif direct Ayadina", highlight: true },
          { icon: CalendarCheck, text: "Annulation flexible", highlight: true },
          { icon: CreditCard, text: "Pas de prépaiement", highlight: true },
          { icon: Sparkles, text: "Surclassement et arrivée anticipée selon disponibilité" },
          { icon: Car, text: "Transfert aéroport aller-retour" },
          { icon: Gift, text: "-10% sur les soins au Spa" },
          { icon: Wine, text: "Cocktail de bienvenue" },
          { icon: Clock, text: "Arrivée anticipée selon disponibilité" },
        ],
      },
    ],
  },
  en: {
    heroAlt: "Rooftop pool at Riad Ayadina",
    heroEyebrow: "Direct booking",
    heroTitle: "Your direct-booking privileges",
    heroText: "Thoughtful extras reserved for bookings made on the official website",
    introTitle: "Why book on the official website?",
    intro1: "When you book directly on the official website, you keep a direct line with the riad team and enjoy privileges reserved for Ayadina guests.",
    intro2: "Airport transfers, upgrades, spa discounts, welcome cocktails...",
    introHighlight: " These attentions are reserved for guests who book with us directly.",
    recommended: "Recommended",
    bookCta: "Book direct",
    compareEyebrow: "Compare freely",
    compareTitle: "Online agencies or the official website",
    compareText: "Compare freely, then book on the official engine to receive the house benefits and a direct contact with no intermediary.",
    availability: "Check availability",
    whatsapp: "Message on WhatsApp",
    whatsappMessage: "Hello, I would like to compare Riad Ayadina direct offers.",
    finePrint: "* Upgrades and early check-ins are subject to availability on the day of arrival. Airport transfers apply to Marrakech-Menara Airport only. The spa discount applies to à la carte treatments and cannot be combined with other offers. Offers are valid for bookings made directly with Riad Ayadina.",
    whyDirect: [
      { icon: ShieldCheck, title: "Official direct rate", description: "You book on Riad Ayadina’s official booking engine" },
      { icon: Gift, title: "Exclusive benefits", description: "Transfers, upgrades and spa discounts available only direct" },
      { icon: Star, title: "Maximum flexibility", description: "Flexible cancellation and no prepayment" },
    ],
    offers: [
      {
        nights: 2,
        title: "Getaway",
        subtitle: "From 2 nights",
        description: "Direct-booking attentions for a short Ayadina escape",
        benefits: [
          { icon: BadgePercent, text: "Official Ayadina direct rate", highlight: true },
          { icon: CalendarCheck, text: "Flexible cancellation", highlight: true },
          { icon: CreditCard, text: "No prepayment", highlight: true },
          { icon: Sparkles, text: "Upgrade and early check-in subject to availability" },
          { icon: Car, text: "One-way airport transfer" },
          { icon: Gift, text: "10% off spa treatments" },
          { icon: Wine, text: "Welcome cocktail" },
          { icon: Clock, text: "Early check-in subject to availability" },
        ],
      },
      {
        nights: 3,
        title: "Immersion",
        subtitle: "From 3 nights",
        description: "The most complete immersion, including return airport transfer",
        featured: true,
        benefits: [
          { icon: BadgePercent, text: "Official Ayadina direct rate", highlight: true },
          { icon: CalendarCheck, text: "Flexible cancellation", highlight: true },
          { icon: CreditCard, text: "No prepayment", highlight: true },
          { icon: Sparkles, text: "Upgrade and early check-in subject to availability" },
          { icon: Car, text: "Return airport transfer" },
          { icon: Gift, text: "10% off spa treatments" },
          { icon: Wine, text: "Welcome cocktail" },
          { icon: Clock, text: "Early check-in subject to availability" },
        ],
      },
    ],
  },
} as const

export default function OffresPage({ locale = "fr", testimonials }: { locale?: Locale; testimonials?: ReactNode }) {
  const { openBookingModal } = useBookingModal()
  const t = copy[locale]
  
  return (
    <main className="bg-background">
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/ayadina/piscine-jour-01.jpg" alt={t.heroAlt} fill className="object-cover" priority sizes="100vw" style={{ objectPosition: "45% 50%" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <p className="text-white/80 text-sm uppercase tracking-[0.3em] mb-4">{t.heroEyebrow}</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">{t.heroTitle}</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">{t.heroText}</p>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              {t.whyDirect.map((item) => (
                <div key={item.title} className="flex w-full max-w-sm items-center gap-4 text-left md:w-auto md:max-w-none">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"><item.icon className="h-6 w-6" /></div>
                  <div><p className="font-medium">{item.title}</p><p className="text-sm text-primary-foreground/70">{item.description}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-5">{t.introTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t.intro1}</p>
              <p className="text-muted-foreground leading-relaxed">{t.intro2}<span className="text-primary font-medium">{t.introHighlight}</span></p>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {t.offers.map((offer) => {
                const featured = "featured" in offer && offer.featured === true
                return (
                  <div key={offer.title} className={`relative overflow-hidden transition-all duration-300 ${featured ? "bg-primary text-primary-foreground" : "bg-card border border-border/50 hover:border-accent/30"}`}>
                    {featured && <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 text-xs uppercase tracking-wider">{t.recommended}</div>}
                    <div className="p-6 md:p-8">
                      <div className="flex items-baseline justify-between mb-6">
                        <div><p className={`text-xs uppercase tracking-wider mb-1 ${featured ? "text-white/60" : "text-muted-foreground"}`}>{offer.subtitle}</p><h3 className="font-serif text-xl md:text-2xl">{offer.title}</h3></div>
                        <span className={`font-serif text-4xl ${featured ? "text-accent" : "text-accent/60"}`}>{offer.nights}</span>
                      </div>
                      <p className={`text-sm mb-6 ${featured ? "text-white/80" : "text-muted-foreground"}`}>{offer.description}</p>
                      <div className="space-y-3 mb-8">
                        {offer.benefits.map((benefit) => {
                          const highlighted = "highlight" in benefit && benefit.highlight === true
                          return (
                            <div key={benefit.text} className="flex items-center gap-3">
                              <span className={`w-1.5 h-1.5 rounded-full ${featured ? highlighted ? "bg-accent" : "bg-white/40" : highlighted ? "bg-accent" : "bg-accent/40"}`} />
                              <span className={`text-sm ${highlighted ? "font-medium" : featured ? "text-white/80" : ""}`}>{benefit.text}</span>
                            </div>
                          )
                        })}
                      </div>
                      <Button type="button" onClick={() => openBookingModal()} className={`w-full rounded-none py-5 ${featured ? "bg-white text-primary hover:bg-white/90" : "border-foreground/15 hover:bg-foreground/5 hover:border-accent/40"}`} variant={featured ? "default" : "outline"}>
                        {t.bookCta}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">{t.compareEyebrow}</p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">{t.compareTitle}</h2>
              <p className="text-muted-foreground mb-8">{t.compareText}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button type="button" onClick={() => openBookingModal()} className="rounded-none px-8 py-6">{t.availability}</Button>
                <Button asChild variant="outline" className="rounded-none px-8 py-6">
                  <a href={buildWhatsAppUrl(t.whatsappMessage)} target="_blank" rel="noopener noreferrer">{t.whatsapp}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <BookingWidget locale={locale} />
        {testimonials}

        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-4"><div className="max-w-3xl mx-auto"><p className="text-xs text-muted-foreground text-center">{t.finePrint}</p></div></div>
        </section>
    </main>
  )
}
