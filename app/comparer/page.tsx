import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, Check, ExternalLink, Plane, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { buildBookingEngineUrl, getNightCount, isValidBookingSearch } from "@/lib/booking-engine"
import { getRateComparison, type RateOffer } from "@/lib/rate-compare"

export const dynamic = "force-dynamic"

type ComparePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams
  const search = {
    checkIn: single(params.checkIn),
    checkOut: single(params.checkOut),
    adults: single(params.adults) || "2",
  }

  if (!isValidBookingSearch(search)) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <p className="text-accent text-sm uppercase tracking-[0.25em] mb-4">Réservation directe</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Choisissez vos dates</h1>
            <p className="text-muted-foreground mb-8">
              Indiquez une date d&apos;arrivée et une date de départ pour vérifier l&apos;offre directe.
            </p>
            <Button asChild className="rounded-none px-8 py-6">
              <Link href="/#booking">Retour au moteur</Link>
            </Button>
          </div>
        </section>
      </main>
    )
  }

  const comparison = await getRateComparison(search)
  const bookingUrl = buildBookingEngineUrl(search)
  const nights = getNightCount(search.checkIn!, search.checkOut!)
  const referenceOffer = chooseReferenceOffer(comparison.offers)
  const directOffer = comparison.directOffer
  const savingsPerNight = directOffer && referenceOffer ? Math.max(referenceOffer.price - directOffer.price, 0) : 0
  const totalSavings = savingsPerNight * nights
  const perks = getDirectPerks(nights)

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Header />

      <section className="pt-24 pb-8 md:pt-28 md:pb-12 min-h-[calc(100vh-80px)] flex items-center">
        <div className="container mx-auto px-4 w-full">
          
          {/* Back link */}
          <Link 
            href="/#booking" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Modifier mes dates
          </Link>

          {/* Boarding Pass Card */}
          <div className="max-w-3xl mx-auto">
            
            {/* Main Card - Premium Boarding Pass Style */}
            <div className="bg-white shadow-xl overflow-hidden">
              
              {/* Header Strip */}
              <div className="bg-[#1a1a2e] text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wider">Vérification Google Hotels</p>
                    <p className="text-sm font-medium">Le direct est la meilleure option</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-white/50">Étape 1/2</p>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 md:p-8">
                
                {/* Trip Summary - Boarding Pass Style */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-dashed border-border">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Arrivée</p>
                    <p className="font-serif text-2xl md:text-3xl text-foreground">{formatShortDate(search.checkIn!)}</p>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center px-4">
                    <div className="flex items-center gap-2 text-muted-foreground/40">
                      <div className="h-px w-8 md:w-16 bg-current" />
                      <Plane className="h-4 w-4 rotate-90" />
                      <div className="h-px w-8 md:w-16 bg-current" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Départ</p>
                    <p className="font-serif text-2xl md:text-3xl text-foreground">{formatShortDate(search.checkOut!)}</p>
                  </div>
                  
                  <div className="ml-6 pl-6 border-l border-border text-center hidden sm:block">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Séjour</p>
                    <p className="font-serif text-2xl md:text-3xl text-foreground">{nights}</p>
                    <p className="text-xs text-muted-foreground">nuit{nights > 1 ? "s" : ""}</p>
                  </div>
                </div>

                {/* Price Comparison */}
                {directOffer && referenceOffer ? (
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {/* Direct Price - Highlighted */}
                    <div className="bg-[#1a1a2e] text-white p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] uppercase tracking-wider px-3 py-1">
                        Recommandé
                      </div>
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Riad Ayadina · Direct</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-3xl md:text-4xl">{formatMoney(directOffer.price, directOffer.currency)}</span>
                        <span className="text-white/50 text-sm">/ nuit</span>
                      </div>
                      <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5" />
                        Flexible · Sans prépaiement
                      </p>
                    </div>

                    {/* OTA Reference Price */}
                    <div className="bg-muted/50 border border-border p-5">
                      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">{referenceOffer.title}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-3xl md:text-4xl text-muted-foreground">{formatMoney(referenceOffer.price, referenceOffer.currency)}</span>
                        <span className="text-muted-foreground/50 text-sm">/ nuit</span>
                      </div>
                      <p className="text-red-600/70 text-sm mt-2">
                        Non remboursable · Prépaiement
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/50 border border-border p-5 mb-6 text-center">
                    <p className="text-muted-foreground">{comparison.message || "Comparaison en cours..."}</p>
                  </div>
                )}

                {/* Savings Badge */}
                {totalSavings > 0 ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 mb-6 text-center">
                    <p className="text-emerald-800 font-medium">
                      Économie estimée : <span className="font-serif text-lg">{formatMoney(totalSavings, directOffer?.currency || "EUR")}</span>
                      <span className="text-emerald-600/70 font-normal"> sur {nights} nuit{nights > 1 ? "s" : ""}</span>
                    </p>
                  </div>
                ) : directOffer && referenceOffer ? (
                  <div className="bg-amber-50 border border-amber-200 p-4 mb-6 text-center">
                    <p className="text-amber-800">
                      Prix équivalent — <span className="font-medium">conditions directes plus flexibles</span>
                    </p>
                  </div>
                ) : null}

                {/* Perks Grid */}
                <div className="bg-[#FAF8F5] p-5 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Inclus avec la réservation directe</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {perks.map((perk, index) => (
                      <PerkItem key={index}>{perk}</PerkItem>
                    ))}
                  </div>
                  {nights === 1 && (
                    <p className="text-xs text-muted-foreground mt-4 italic">
                      Les avantages gratuits commencent à partir de 2 nuits.
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Button asChild size="lg" className="w-full rounded-none py-7 text-base tracking-wide bg-[#1a1a2e] hover:bg-[#2a2a3e]">
                  <a href={bookingUrl} target="_blank" rel="noreferrer">
                    Continuer vers la réservation officielle
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Étape suivante : choisir votre chambre et finaliser la réservation.
                </p>
              </div>

              {/* Footer Strip */}
              <div className="bg-muted/30 border-t border-border px-6 py-3 flex items-center justify-between text-xs text-muted-foreground">
                <p>Source : Google Hotels · Temps réel</p>
                {comparison.offers.length > 0 && (
                  <p className="hidden sm:block">
                    {comparison.offers.slice(0, 2).map(o => o.title).join(" · ")}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

function PerkItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
      <span className="text-foreground">{children}</span>
    </div>
  )
}

function chooseReferenceOffer(offers: RateOffer[]) {
  if (offers.length === 0) return undefined

  const sorted = [...offers].sort((a, b) => a.price - b.price)
  const best = sorted[0]
  const booking = sorted.find((offer) => /booking\.com/i.test(offer.title) || /booking\.com/i.test(offer.domain || ""))

  // If Booking.com is effectively equivalent to the lowest OTA, use it as the visitor-facing reference.
  if (booking && booking.price <= best.price + 10) return booking

  return best
}

function getDirectPerks(nights: number) {
  if (nights >= 3) {
    return [
      "Meilleur tarif direct garanti",
      "Transfert aéroport aller-retour",
      "-10% sur les soins Spa",
      "Cocktail de bienvenue",
      "Surclassement selon disponibilité",
      "Early check-in selon disponibilité",
    ]
  }

  if (nights >= 2) {
    return [
      "Tarif préférentiel exclusif",
      "Transfert aéroport aller",
      "-10% sur les soins Spa",
      "Cocktail de bienvenue",
      "Surclassement selon disponibilité",
    ]
  }

  return [
    "Conditions flexibles",
    "Aucun prépaiement imposé",
    "Contact direct avec le riad",
  ]
}

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" }).format(new Date(`${value}T00:00:00`))
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}
