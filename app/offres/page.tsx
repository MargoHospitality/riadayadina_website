"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingWidget } from "@/components/booking-widget"
import { TestimonialsSection } from "@/components/testimonials-section"
import { 
  Check, 
  Gift, 
  Car, 
  Sparkles, 
  Clock, 
  Wine,
  ArrowRight,
  ShieldCheck,
  BadgePercent,
  Star
} from "lucide-react"

const offers = [
  {
    nights: 2,
    title: "Escapade",
    subtitle: "À partir de 2 nuitées",
    description: "L'essentiel pour une première découverte d'Ayadina",
    benefits: [
      { icon: BadgePercent, text: "Tarif préférentiel exclusif", highlight: true },
      { icon: Sparkles, text: "Surclassement offert (selon disponibilité)" },
      { icon: Car, text: "Transfert aéroport aller" },
      { icon: Gift, text: "-10% sur les soins au Spa" },
      { icon: Wine, text: "Cocktail de bienvenue" },
      { icon: Clock, text: "Early check-in (selon disponibilité)" },
    ],
  },
  {
    nights: 3,
    title: "Immersion",
    subtitle: "À partir de 3 nuitées",
    description: "L'expérience complète pour profiter pleinement du riad",
    benefits: [
      { icon: BadgePercent, text: "Meilleur tarif garanti", highlight: true },
      { icon: Sparkles, text: "Surclassement offert (selon disponibilité)" },
      { icon: Car, text: "Transfert aéroport aller ET retour" },
      { icon: Gift, text: "-10% sur les soins au Spa" },
      { icon: Wine, text: "Cocktail de bienvenue" },
      { icon: Clock, text: "Early check-in (selon disponibilité)" },
    ],
    featured: true,
  },
]

const whyDirect = [
  {
    icon: ShieldCheck,
    title: "Prix le plus bas garanti",
    description: "Nous nous alignons sur tout tarif inférieur trouvé ailleurs",
  },
  {
    icon: Gift,
    title: "Avantages exclusifs",
    description: "Transferts, surclassements, réductions spa... uniquement en direct",
  },
  {
    icon: Star,
    title: "Flexibilité maximale",
    description: "Modification et annulation facilitées, sans intermédiaire",
  },
]

export default function OffresPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/piscine-rooftop.jpg"
              alt="Piscine rooftop Riad Ayadina"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <p className="text-white/80 text-sm uppercase tracking-[0.3em] mb-4">
              Réservation directe
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Nos offres exclusives
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Des avantages que vous ne trouverez nulle part ailleurs
            </p>
          </div>
        </section>

        {/* Why Book Direct - Bandeau */}
        <section className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              {whyDirect.map((item, index) => (
                <div key={index} className="flex items-center gap-4 text-center md:text-left">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-primary-foreground/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Pourquoi réserver en direct ?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Sur les plateformes de réservation, nous reversons jusqu&apos;à 20% de commission. 
                En réservant directement chez nous, nous partageons cette économie avec vous 
                sous forme d&apos;avantages concrets.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Transferts aéroport, surclassements, réductions au spa, cocktails de bienvenue... 
                <span className="text-primary font-medium"> Ces privilèges sont réservés à nos clients directs.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Offers Cards */}
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {offers.map((offer, index) => (
                <div 
                  key={index}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    offer.featured 
                      ? "bg-primary text-primary-foreground ring-4 ring-accent" 
                      : "bg-card border border-border"
                  }`}
                >
                  {/* Featured badge */}
                  {offer.featured && (
                    <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-xs font-medium uppercase tracking-wider">
                      Recommandé
                    </div>
                  )}
                  
                  {/* Header */}
                  <div className={`p-8 pb-6 ${offer.featured ? "border-b border-white/20" : "border-b border-border"}`}>
                    <p className={`text-sm uppercase tracking-wider mb-2 ${offer.featured ? "text-white/70" : "text-muted-foreground"}`}>
                      {offer.subtitle}
                    </p>
                    <h3 className="font-serif text-3xl mb-2">{offer.title}</h3>
                    <p className={`text-sm ${offer.featured ? "text-white/80" : "text-muted-foreground"}`}>
                      {offer.description}
                    </p>
                  </div>
                  
                  {/* Benefits */}
                  <div className="p-8 pt-6">
                    <ul className="space-y-4">
                      {offer.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            offer.featured 
                              ? benefit.highlight ? "bg-accent text-accent-foreground" : "bg-white/10"
                              : benefit.highlight ? "bg-primary/10 text-primary" : "bg-muted"
                          }`}>
                            <benefit.icon className="h-4 w-4" />
                          </div>
                          <span className={`text-sm pt-1.5 ${
                            benefit.highlight 
                              ? offer.featured ? "font-medium" : "font-medium text-primary"
                              : ""
                          }`}>
                            {benefit.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      asChild
                      size="lg"
                      className={`w-full mt-8 rounded-none py-6 ${
                        offer.featured 
                          ? "bg-white text-primary hover:bg-white/90" 
                          : ""
                      }`}
                    >
                      <Link href="#booking">
                        Réserver maintenant
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison note */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Comparez par vous-même
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                Booking.com, Expedia, Hotels.com...
              </h2>
              <p className="text-muted-foreground mb-8">
                Consultez les plateformes si vous le souhaitez. Puis revenez ici et profitez 
                du même prix — voire moins — avec tous les avantages en plus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="rounded-none px-8 py-6">
                  <Link href="#booking">
                    Vérifier les disponibilités
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-none px-8 py-6">
                  <a href="tel:+212524383881">
                    Appeler : +212 524 38 38 81
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <BookingWidget />
        <TestimonialsSection />

        {/* Fine print */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs text-muted-foreground text-center">
                * Les surclassements et early check-in sont soumis à disponibilité le jour de l&apos;arrivée. 
                Le transfert aéroport est valable pour l&apos;aéroport de Marrakech-Ménara uniquement. 
                La réduction spa est applicable sur les soins à la carte, non cumulable avec d&apos;autres offres. 
                Offres valables pour toute réservation effectuée directement auprès du Riad Ayadina.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
