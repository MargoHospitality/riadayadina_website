"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingWidget } from "@/components/booking-widget"
import { TestimonialsSection } from "@/components/testimonials-section"
import { useBookingModal } from "@/components/booking-modal-provider"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
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
  Star,
  CalendarCheck,
  CreditCard
} from "lucide-react"

const offers = [
  {
    nights: 2,
    title: "Séjour Patio",
    subtitle: "À partir de 2 nuitées",
    description: "Les attentions directes pour profiter d'Ayadina dès les premières nuits",
    benefits: [
      { icon: BadgePercent, text: "Tarif direct Ayadina", highlight: true },
      { icon: CalendarCheck, text: "Annulation flexible", highlight: true },
      { icon: CreditCard, text: "Pas de prépaiement", highlight: true },
      { icon: Sparkles, text: "Surclassement offert (selon disponibilité)" },
      { icon: Car, text: "Transfert aéroport aller" },
      { icon: Gift, text: "-10% sur les soins au Spa" },
      { icon: Wine, text: "Cocktail de bienvenue" },
      { icon: Clock, text: "Arrivée anticipée selon disponibilité" },
    ],
  },
  {
    nights: 3,
    title: "Séjour Ayadina",
    subtitle: "À partir de 3 nuitées",
    description: "Le séjour le plus complet, avec transfert aller-retour inclus",
    benefits: [
      { icon: BadgePercent, text: "Tarif direct Ayadina", highlight: true },
      { icon: CalendarCheck, text: "Annulation flexible", highlight: true },
      { icon: CreditCard, text: "Pas de prépaiement", highlight: true },
      { icon: Sparkles, text: "Surclassement offert (selon disponibilité)" },
      { icon: Car, text: "Transfert aéroport aller-retour" },
      { icon: Gift, text: "-10% sur les soins au Spa" },
      { icon: Wine, text: "Cocktail de bienvenue" },
      { icon: Clock, text: "Arrivée anticipée selon disponibilité" },
    ],
    featured: true,
  },
]

const whyDirect = [
  {
    icon: ShieldCheck,
    title: "Tarif direct officiel",
    description: "Vous réservez sur le moteur officiel du Riad Ayadina",
  },
  {
    icon: Gift,
    title: "Avantages exclusifs",
    description: "Transferts, surclassements, réductions spa... uniquement en direct",
  },
  {
    icon: Star,
    title: "Flexibilité maximale",
    description: "Annulation flexible et pas de prépaiement",
  },
]

export default function OffresPage() {
  const { openBookingModal } = useBookingModal()
  
  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/ayadina/piscine-jour-01.jpg"
              alt="Piscine sur le toit du Riad Ayadina"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              style={{ objectPosition: "45% 50%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <p className="text-white/80 text-sm uppercase tracking-[0.3em] mb-4">
              Réservation directe
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Vos privilèges en direct
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Les attentions réservées aux réservations faites sur le site officiel
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
                Pourquoi passer par le site officiel ?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                En réservant directement sur le site officiel, vous gardez un contact direct avec le riad
                et profitez d&apos;attentions réservées aux hôtes Ayadina.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Transferts aéroport, surclassements, réductions au spa, cocktails de bienvenue... 
                <span className="text-primary font-medium"> Ces attentions sont réservées aux hôtes qui réservent auprès de nous.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Offers Cards - Editorial Style */}
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {offers.map((offer, index) => (
                <div 
                  key={index}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    offer.featured 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-card border border-border/50 hover:border-accent/30"
                  }`}
                >
                  {/* Featured badge */}
                  {offer.featured && (
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 text-xs uppercase tracking-wider">
                      Recommandé
                    </div>
                  )}
                  
                  {/* Header */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-baseline justify-between mb-6">
                      <div>
                        <p className={`text-xs uppercase tracking-wider mb-1 ${offer.featured ? "text-white/60" : "text-muted-foreground"}`}>
                          {offer.subtitle}
                        </p>
                        <h3 className="font-serif text-2xl md:text-3xl">{offer.title}</h3>
                      </div>
                      <span className={`font-serif text-4xl ${offer.featured ? "text-accent" : "text-accent/60"}`}>
                        {offer.nights}
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-6 ${offer.featured ? "text-white/80" : "text-muted-foreground"}`}>
                      {offer.description}
                    </p>
                  
                    {/* Benefits - Cleaner dots */}
                    <div className="space-y-3 mb-8">
                      {offer.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            offer.featured 
                              ? benefit.highlight ? "bg-accent" : "bg-white/40"
                              : benefit.highlight ? "bg-accent" : "bg-accent/40"
                          }`} />
                          <span className={`text-sm ${
                            benefit.highlight 
                              ? "font-medium" 
                              : offer.featured ? "text-white/80" : ""
                          }`}>
                            {benefit.text}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      onClick={() => openBookingModal()}
                      className={`w-full rounded-none py-5 ${
                        offer.featured 
                          ? "bg-white text-primary hover:bg-white/90" 
                          : "border-foreground/15 hover:bg-foreground/5 hover:border-accent/40"
                      }`}
                      variant={offer.featured ? "default" : "outline"}
                    >
                      Réserver en direct
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
                Comparez librement
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                Agences en ligne ou site officiel
              </h2>
              <p className="text-muted-foreground mb-8">
                Comparez librement, puis réservez sur le moteur officiel pour bénéficier
                des attentions de la maison et d&apos;un contact sans intermédiaire.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => openBookingModal()} className="rounded-none px-8 py-6">
                  Vérifier les disponibilités
                </Button>
                <Button asChild variant="outline" className="rounded-none px-8 py-6">
                  <a
                    href={buildWhatsAppUrl("Bonjour, je souhaiterais comparer les offres directes du Riad Ayadina.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Écrire sur WhatsApp
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
                * Les surclassements et arrivées anticipées sont soumis à disponibilité le jour de l&apos;arrivée. 
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
