"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Check, ExternalLink, Shield, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { buildBookingEngineUrl, getNightCount, isValidBookingSearch } from "@/lib/booking-engine"
import { getRateComparisonSync, type RateOffer } from "@/lib/rate-compare"

export default function ComparePage() {
  const searchParams = useSearchParams()
  const search = {
    checkIn: searchParams.get("checkIn") || undefined,
    checkOut: searchParams.get("checkOut") || undefined,
    adults: searchParams.get("adults") || "2",
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

  const comparison = getRateComparisonSync(search)
  const bookingUrl = buildBookingEngineUrl(search)
  const nights = getNightCount(search.checkIn!, search.checkOut!)
  const referenceOffer = chooseReferenceOffer(comparison.offers)
  const directOffer = comparison.directOffer
  const savingsPerNight = directOffer && referenceOffer ? Math.max(referenceOffer.price - directOffer.price, 0) : 0
  const totalSavings = savingsPerNight * nights
  const perks = getDirectPerks(nights)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-28 md:pt-32 pb-8 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/patio-fontaine.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-2">Comparaison des tarifs</p>
            
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground">
                  Votre séjour du {formatLongDate(search.checkIn!)} au {formatLongDate(search.checkOut!)}
                </h1>
                <Link 
                  href="/#booking" 
                  className="inline-flex items-center gap-1.5 text-xs text-primary-foreground/50 hover:text-primary-foreground border border-primary-foreground/20 hover:border-primary-foreground/40 px-3 py-1.5 transition-colors"
                >
                  Modifier
                </Link>
              </div>
              <div className="flex items-center gap-6 text-primary-foreground">
                <div className="text-center">
                  <p className="font-serif text-4xl lg:text-5xl">{nights}</p>
                  <p className="text-sm text-primary-foreground/60">nuit{nights > 1 ? "s" : ""}</p>
                </div>
                <div className="w-px h-12 bg-primary-foreground/20" />
                <div className="text-center">
                  <p className="font-serif text-4xl lg:text-5xl">{search.adults}</p>
                  <p className="text-sm text-primary-foreground/60">adulte{Number(search.adults) > 1 ? "s" : ""}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Full Width */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Price Cards Grid */}
            <div className="grid lg:grid-cols-5 gap-6 mb-10">
              
              {/* Direct Offer - Takes 3 columns */}
              <div className="lg:col-span-3 bg-card border-2 border-accent shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs uppercase tracking-wider px-3 py-1.5 font-medium">
                  Meilleur choix
                </div>
                
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 relative rounded-sm overflow-hidden flex-shrink-0">
                      <Image
                        src="/images/logo-ayadina.png"
                        alt="Riad Ayadina"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Site officiel</p>
                      <h2 className="font-serif text-2xl text-foreground">Riad Ayadina & Spa</h2>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">Réservation directe</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mb-6 pb-6 border-b border-border">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Prix par nuit</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-4xl md:text-5xl text-foreground">
                          {directOffer ? formatMoney(directOffer.price, directOffer.currency) : "—"}
                        </span>
                      </div>
                      {totalSavings > 0 && (
                        <p className="text-accent font-medium mt-2">
                          Économie de {formatMoney(totalSavings, directOffer?.currency || "EUR")} sur votre séjour
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Total estimé</p>
                      <p className="font-serif text-2xl text-foreground">
                        {directOffer ? formatMoney(directOffer.price * nights, directOffer.currency) : "—"}
                      </p>
                    </div>
                  </div>

                  {/* Perks */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-4 w-4 text-accent" />
                      <p className="text-sm font-medium text-foreground">Avantages exclusifs réservation directe</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {perks.map((perk, index) => (
                        <PerkItem key={index}>{perk}</PerkItem>
                      ))}
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 p-4 bg-secondary/50 rounded-sm">
                    <Shield className="h-5 w-5 text-accent flex-shrink-0" />
                    <p>
                      <span className="font-medium text-foreground">Annulation flexible</span> · 
                      Aucun prépaiement requis · Confirmation immédiate
                    </p>
                  </div>

                  {/* CTA */}
                  <Button asChild size="lg" className="w-full rounded-none py-7 text-base tracking-wide">
                    <a href={bookingUrl} target="_blank" rel="noreferrer">
                      Réserver au meilleur prix
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* OTA Offers - Takes 2 columns */}
              <div className="lg:col-span-2 space-y-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider px-1">Comparaison OTA</p>
                
                {referenceOffer ? (
                  <>
                    <OTACard offer={referenceOffer} nights={nights} isMain />
                    {comparison.offers
                      .filter(o => o.title !== referenceOffer.title)
                      .slice(0, 2)
                      .map((offer, index) => (
                        <OTACard key={index} offer={offer} nights={nights} />
                      ))}
                  </>
                ) : (
                  <div className="bg-muted/30 border border-border p-6 text-center">
                    <p className="text-muted-foreground">Aucune offre OTA disponible pour ces dates.</p>
                  </div>
                )}

                <p className="text-xs text-muted-foreground text-center pt-2">
                  Source : Google Hotels · Tarifs indicatifs
                </p>
              </div>
            </div>

            {/* Trust Section */}
            <div className="grid md:grid-cols-3 gap-6 py-8 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Paiement sécurisé</p>
                  <p className="text-sm text-muted-foreground">Directement sur notre moteur officiel</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Confirmation instantanée</p>
                  <p className="text-sm text-muted-foreground">Email de confirmation immédiat</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Accueil personnalisé</p>
                  <p className="text-sm text-muted-foreground">Thé de bienvenue et accompagnement</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

function OTACard({ offer, nights, isMain = false }: { offer: RateOffer; nights: number; isMain?: boolean }) {
  return (
    <div className={`bg-muted/30 border border-border p-4 ${isMain ? "" : "opacity-70"}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-muted-foreground">{offer.title}</p>
        {isMain && (
          <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5">Non remboursable</span>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="font-serif text-2xl text-muted-foreground">{formatMoney(offer.price, offer.currency)}</span>
          <span className="text-muted-foreground/60 text-sm ml-1">/ nuit</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Total : {formatMoney(offer.price * nights, offer.currency)}
        </p>
      </div>
    </div>
  )
}

function PerkItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Check className="h-4 w-4 text-accent shrink-0" />
      <span className="text-foreground">{children}</span>
    </div>
  )
}

function chooseReferenceOffer(offers: RateOffer[]) {
  if (offers.length === 0) return undefined
  const sorted = [...offers].sort((a, b) => a.price - b.price)
  const best = sorted[0]
  const booking = sorted.find((offer) => /booking\.com/i.test(offer.title) || /booking\.com/i.test(offer.domain || ""))
  if (booking && booking.price <= best.price + 10) return booking
  return best
}

function getDirectPerks(nights: number) {
  if (nights >= 3) {
    return [
      "Meilleur tarif garanti",
      "Transfert aéroport A/R offert",
      "-10% sur les soins Spa",
      "Cocktail de bienvenue",
      "Surclassement si disponible",
      "Early check-in si disponible",
    ]
  }
  if (nights >= 2) {
    return [
      "Tarif exclusif direct",
      "Transfert aéroport aller",
      "-10% sur les soins Spa",
      "Cocktail de bienvenue",
    ]
  }
  return [
    "Conditions flexibles",
    "Sans prépaiement",
    "Contact direct",
  ]
}

function formatLongDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" }).format(new Date(`${value}T00:00:00`))
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}
