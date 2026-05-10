"use client"

import { useState, useEffect, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Check, CheckCircle2, Clock, ExternalLink, Search, Shield, ShieldCheck, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { BookingDateModal } from "@/components/booking-date-modal"
import { trackDirectBookingEvent } from "@/lib/analytics"
import { buildBookingEngineUrl, getNightCount, isValidBookingSearch } from "@/lib/booking-engine"
import type { RateComparison, RateOffer } from "@/lib/rate-compare"
import { cn } from "@/lib/utils"

const loadingSteps = [
  { id: 1, label: "Recherche de l'offre officielle Ayadina" },
  { id: 2, label: "Lecture des prix Booking.com et OTA" },
  { id: 3, label: "Vérification des conditions directes" },
]

export function CompareClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [showFallback, setShowFallback] = useState(false)
  const [comparisonResult, setComparisonResult] = useState<RateComparison | null>(null)
  
  const searchParams = useSearchParams()
  const search = {
    checkIn: searchParams.get("checkIn") || undefined,
    checkOut: searchParams.get("checkOut") || undefined,
    adults: searchParams.get("adults") || "2",
  }

  useEffect(() => {
    if (!isValidBookingSearch(search)) return

    const controller = new AbortController()
    const searchNights = getNightCount(search.checkIn!, search.checkOut!)
    setIsLoading(true)
    setComparisonResult(null)
    setCurrentStep(1)
    setShowFallback(false)
    trackDirectBookingEvent("rate_compare_search", {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adults: String(search.adults || 2),
    })

    const step2Timer = setTimeout(() => setCurrentStep(2), 1200)
    const step3Timer = setTimeout(() => setCurrentStep(3), 2800)
    const fallbackTimer = setTimeout(() => setShowFallback(true), 5000)

    const params = new URLSearchParams({
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adults: String(search.adults || 2),
    })

    fetch(`/api/rate-compare?${params.toString()}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Rate comparison failed with ${response.status}`)
        return (await response.json()) as RateComparison
      })
      .then((comparison) => {
        setCurrentStep(3)
        setComparisonResult(comparison)
        trackComparisonResult(comparison, searchNights)
        setIsLoading(false)
      })
      .catch((error) => {
        if (error instanceof Error && error.name === "AbortError") return
        setComparisonResult({
          status: "error",
          offers: [],
          source: "DataForSEO Google Hotels",
          message: "Comparaison momentanément indisponible. Vous pouvez continuer vers la réservation officielle.",
        })
        trackDirectBookingEvent("rate_compare_unavailable", {
          checkIn: search.checkIn,
          checkOut: search.checkOut,
          adults: String(search.adults || 2),
          reason: "client_error",
        })
        setIsLoading(false)
      })

    return () => {
      controller.abort()
      clearTimeout(step2Timer)
      clearTimeout(step3Timer)
      clearTimeout(fallbackTimer)
    }
  }, [search.checkIn, search.checkOut, search.adults])

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

  const nights = getNightCount(search.checkIn!, search.checkOut!)
  const bookingUrl = buildBookingEngineUrl(search)

  // Loading State
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />

        <section className="pt-32 md:pt-40 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              {/* Step indicator */}
              <div className="inline-flex items-center gap-2 text-xs text-primary uppercase tracking-[0.2em] mb-6">
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-medium">1</span>
                <span className="text-primary/60">/</span>
                <span className="text-primary/40">2</span>
                <span className="mx-2 text-primary/40">·</span>
                <span className="text-primary/80">Vérification en cours</span>
              </div>

              {/* Main title */}
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-balance">
                Nous vérifions les meilleurs prix pour vos dates.
              </h1>

              {/* Subtitle */}
              <p className="text-muted-foreground text-sm md:text-base mb-10 max-w-md mx-auto">
                Comparaison en temps réel entre l&apos;offre officielle Ayadina et les prix publics observés sur Google Hotels.
              </p>

              {/* Date summary card */}
              <div className="bg-secondary/50 border border-border/50 p-5 mb-8">
                <div className="flex items-center justify-center gap-6 md:gap-10">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Arrivée</p>
                    <p className="font-serif text-lg text-foreground">{formatLongDate(search.checkIn!)}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-px bg-accent" />
                    <span className="text-xs text-accent font-medium">{nights} nuit{nights > 1 ? "s" : ""}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Départ</p>
                    <p className="font-serif text-lg text-foreground">{formatLongDate(search.checkOut!)}</p>
                  </div>
                  <div className="h-8 w-px bg-border mx-2 hidden sm:block" />
                  <div className="text-center hidden sm:block">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Voyageurs</p>
                    <p className="font-serif text-lg text-foreground">{search.adults} personne{Number(search.adults) > 1 ? "s" : ""}</p>
                  </div>
                </div>
              </div>

              {/* Loading checklist */}
              <div className="bg-card border border-primary/20 p-6 mb-8 shadow-sm">
                <div className="space-y-4">
                  {loadingSteps.map((step) => {
                    const isComplete = currentStep > step.id
                    const isActive = currentStep === step.id

                    return (
                      <div
                        key={step.id}
                        className={cn(
                          "flex items-center gap-3 transition-all duration-500",
                          isComplete ? "opacity-100" : isActive ? "opacity-100" : "opacity-40"
                        )}
                      >
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500",
                            isComplete
                              ? "bg-primary text-primary-foreground"
                              : isActive
                              ? "bg-primary/20 text-primary"
                              : "bg-primary/10 text-primary/40"
                          )}
                        >
                          {isComplete ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : isActive ? (
                            <Search className="h-3 w-3 animate-pulse" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-sm transition-colors duration-300",
                            isComplete ? "text-foreground" : isActive ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {step.label}
                        </span>
                        {isActive && (
                          <div className="ml-auto flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Progress bar */}
                <div className="mt-6 h-1.5 bg-primary/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${(currentStep / loadingSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Reassurance text */}
              <p className="text-xs text-muted-foreground mb-6">
                Cela prend généralement quelques secondes.
              </p>

              {/* Fallback CTA - appears after 5 seconds */}
              <div
                className={cn(
                  "transition-all duration-500",
                  showFallback ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                )}
              >
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Continuer directement vers la réservation officielle
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  // Results State
  const comparison = comparisonResult ?? createUnavailableComparison()
  const referenceOffer = chooseReferenceOffer(comparison.offers)
  const directOffer = comparison.directOffer
  const hasNoAvailability = comparison.status === "no_availability"
  const hasLivePrices = comparison.status === "available" && Boolean(directOffer)
  const sameCurrency = Boolean(directOffer && referenceOffer && directOffer.currency === referenceOffer.currency)
  const otaBeatsDirect = Boolean(sameCurrency && directOffer && referenceOffer && referenceOffer.price < directOffer.price)
  const showPriceComparison = hasLivePrices && !otaBeatsDirect
  const savingsPerNight = showPriceComparison && directOffer && referenceOffer ? Math.max(referenceOffer.price - directOffer.price, 0) : 0
  const totalSavings = savingsPerNight * nights
  const perks = getDirectPerks(nights)
  const contactUrl = buildContactUrl(search)

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
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-primary-foreground/50 hover:text-primary-foreground border border-primary-foreground/20 hover:border-primary-foreground/40 px-3 py-1.5 transition-colors"
                >
                  Modifier
                </button>
              </div>
              <div className="flex items-center gap-6 text-primary-foreground">
                <div className="text-center">
                  <p className="font-serif text-4xl lg:text-5xl">{nights}</p>
                  <p className="text-sm text-primary-foreground/60">nuit{nights > 1 ? "s" : ""}</p>
                </div>
                <div className="w-px h-12 bg-primary-foreground/20" />
                <div className="text-center">
                  <p className="font-serif text-4xl lg:text-5xl">{search.adults}</p>
                  <p className="text-sm text-primary-foreground/60">personne{Number(search.adults) > 1 ? "s" : ""}</p>
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
            
            {hasNoAvailability && (
              <div className="bg-card border border-accent/40 shadow-sm p-6 md:p-8 mb-8">
                <div className="max-w-3xl">
                  <p className="text-accent text-sm uppercase tracking-[0.2em] mb-3">Disponibilité en ligne</p>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Aucune chambre disponible en ligne pour ces dates.</h2>
                  <p className="text-muted-foreground mb-6">
                    Le moteur officiel Cloudbeds ne remonte pas de disponibilité pour ce séjour. Le plus utile est de vérifier directement avec le riad : il peut rester une option manuelle, une libération récente ou une alternative de dates.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="rounded-none px-8 py-6">
                      <Link
                        href={contactUrl}
                        onClick={() => trackDirectBookingEvent("rate_compare_click_contact", { checkIn: search.checkIn, checkOut: search.checkOut, reason: "no_availability" })}
                      >
                        Vérifier avec le riad
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-none px-8 py-6 bg-transparent">
                      <Link
                        href={`${contactUrl}&intent=waitlist`}
                        onClick={() => trackDirectBookingEvent("rate_compare_click_contact", { checkIn: search.checkIn, checkOut: search.checkOut, reason: "waitlist" })}
                      >
                        Être prévenu si une chambre se libère
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {!hasLivePrices && !hasNoAvailability && (
              <div className="mb-6 border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
                <p className="font-medium mb-1">Comparaison des prix momentanément indisponible.</p>
                <p className="text-muted-foreground">
                  {comparison.message || "Les tarifs Google Hotels ne sont pas remontés pour ces dates."} Vous pouvez continuer vers le moteur officiel Cloudbeds pour consulter le tarif en direct.
                </p>
              </div>
            )}

            {!hasNoAvailability && (
              <>
            {/* Price Cards Grid */}
            <div className="grid lg:grid-cols-5 gap-6 mb-10">
              
              {/* Direct Offer - Takes 3 columns */}
              <div className="lg:col-span-3 bg-card border-2 border-accent shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
                
                <div className="p-6 md:p-8">
                  {/* Header with badge on separate row on mobile */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 md:w-16 md:h-16 relative rounded-sm overflow-hidden flex-shrink-0">
                        <Image
                          src="/images/logo-ayadina.png"
                          alt="Riad Ayadina"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Site officiel</p>
                        <h2 className="font-serif text-xl md:text-2xl text-foreground">Riad Ayadina & Spa</h2>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">Réservation directe</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-accent text-accent-foreground text-xs uppercase tracking-wider px-3 py-1.5 font-medium self-start">
                      {totalSavings > 0 ? "Meilleur prix direct" : "Officiel"}
                    </div>
                  </div>

                  <div className="flex items-end justify-between mb-6 pb-6 border-b border-border">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Prix par nuit</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-4xl md:text-5xl text-foreground">
                          {directOffer ? formatMoney(directOffer.price, directOffer.currency) : "À vérifier"}
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
                        {directOffer ? formatMoney(directOffer.price * nights, directOffer.currency) : "Sur Cloudbeds"}
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
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackDirectBookingEvent("rate_compare_click_cloudbeds", { checkIn: search.checkIn, checkOut: search.checkOut, adults: String(search.adults || 2), outcome: getComparisonOutcome(comparison) })}
                    >
                      {totalSavings > 0 ? "Réserver au meilleur prix" : hasLivePrices ? "Réserver en direct" : "Voir le tarif officiel"}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* OTA Offers - Takes 2 columns */}
              <div className="lg:col-span-2 space-y-4">
                {otaBeatsDirect ? (
                  <div className="bg-primary text-primary-foreground p-6">
                    <p className="text-accent text-xs uppercase tracking-[0.2em] mb-3">Réserver en direct</p>
                    <h3 className="font-serif text-2xl mb-4">Le prix n&apos;est pas le seul critère utile pour ce séjour.</h3>
                    <p className="text-primary-foreground/75 text-sm mb-5">
                      Pour ces dates, nous mettons en avant les avantages inclus en direct plutôt qu&apos;un comparatif de prix moins lisible.
                    </p>
                    <div className="space-y-2">
                      {perks.slice(0, 4).map((perk) => (
                        <div key={perk} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-accent shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
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
                        <p className="text-muted-foreground">
                          {comparison.status === "empty"
                            ? "Aucune offre OTA disponible pour ces dates."
                            : "Comparaison OTA indisponible pour le moment."}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground text-center pt-2">
                      Source : Google Hotels · Tarifs indicatifs
                    </p>
                  </>
                )}
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
              </>
            )}

          </div>
        </div>
      </section>

      {/* Date Modal */}
      <BookingDateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCheckIn={search.checkIn}
        defaultCheckOut={search.checkOut}
        defaultAdults={Number(search.adults)}
      />
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

function buildContactUrl(search: { checkIn?: string; checkOut?: string; adults?: string }) {
  const params = new URLSearchParams({
    intent: "availability_check",
    checkIn: search.checkIn || "",
    checkOut: search.checkOut || "",
    adults: String(search.adults || 2),
  })

  return `/contact?${params.toString()}`
}

function trackComparisonResult(comparison: RateComparison, nights: number) {
  const referenceOffer = chooseReferenceOffer(comparison.offers)
  const directOffer = comparison.directOffer
  const base = {
    status: comparison.status,
    nights,
    cloudbedsAvailability: comparison.availability?.status,
    cloudbedsLatencyMs: comparison.availability?.latencyMs,
    offerCount: comparison.offers.length,
  }

  if (comparison.status === "no_availability") {
    trackDirectBookingEvent("rate_compare_no_availability", base)
    return
  }

  if (!directOffer) {
    trackDirectBookingEvent("rate_compare_unavailable", base)
    return
  }

  if (referenceOffer && directOffer.currency === referenceOffer.currency && referenceOffer.price < directOffer.price) {
    trackDirectBookingEvent("rate_compare_ota_cheaper_hidden", {
      ...base,
      directPrice: directOffer.price,
      otaPrice: referenceOffer.price,
      currency: directOffer.currency,
    })
    return
  }

  trackDirectBookingEvent("rate_compare_direct_cheaper", {
    ...base,
    directPrice: directOffer.price,
    otaPrice: referenceOffer?.price,
    currency: directOffer.currency,
  })
}

function getComparisonOutcome(comparison: RateComparison) {
  const referenceOffer = chooseReferenceOffer(comparison.offers)
  if (comparison.status === "no_availability") return "no_availability"
  if (!comparison.directOffer) return "unavailable"
  if (referenceOffer && comparison.directOffer.currency === referenceOffer.currency && referenceOffer.price < comparison.directOffer.price) {
    return "ota_cheaper_hidden"
  }
  return "direct_cheaper_or_equal"
}

function createUnavailableComparison(): RateComparison {
  return {
    status: "error",
    offers: [],
    source: "DataForSEO Google Hotels",
    message: "Comparaison momentanément indisponible.",
  }
}
