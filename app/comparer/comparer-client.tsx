"use client"

import { useState, useEffect, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingDateModal } from "@/components/booking-date-modal"
import { trackDirectBookingEvent } from "@/lib/analytics"
import { buildBookingEngineUrl, getNightCount, isValidBookingSearch, normalizeBookingCurrency, normalizeBookingLanguage } from "@/lib/booking-engine"
import type { RateComparison, RateOffer } from "@/lib/rate-compare"
import { cn } from "@/lib/utils"
import { CreditCard, MailCheck, HandHeart } from "lucide-react"

const loadingSteps = [
  { id: 1, label: "Recherche de l'offre officielle Ayadina" },
  { id: 2, label: "Lecture des prix des agences en ligne" },
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
    currency: searchParams.get("currency") ? normalizeBookingCurrency(searchParams.get("currency") || undefined) : undefined,
    language: normalizeBookingLanguage(searchParams.get("language") || "fr"),
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
      currency: search.currency,
      language: search.language,
    })

    const step2Timer = setTimeout(() => setCurrentStep(2), 1200)
    const step3Timer = setTimeout(() => setCurrentStep(3), 2800)
    const fallbackTimer = setTimeout(() => setShowFallback(true), 5000)

    const params = new URLSearchParams({
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adults: String(search.adults || 2),
      language: search.language,
    })
    if (search.currency) params.set("currency", search.currency)

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
          message: "Comparaison agence en ligne indisponible pour le moment.",
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
  }, [search.checkIn, search.checkOut, search.adults, search.currency, search.language])

  if (!isValidBookingSearch(search)) {
    return (
      <>
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
        <Footer />
      </>
    )
  }

  const nights = getNightCount(search.checkIn!, search.checkOut!)
  const loadingBookingUrl = buildBookingEngineUrl(search)

  // Loading State
  if (isLoading) {
    return (
      <>
        <main className="min-h-screen bg-background">
          <Header />

        <section className="pt-32 md:pt-40 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              {/* Main title */}
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-balance">
                Nous vérifions les meilleurs prix pour vos dates.
              </h1>

              {/* Subtitle */}
              <p className="text-muted-foreground text-sm md:text-base mb-10 max-w-md mx-auto">
                Comparaison en temps réel entre l&apos;offre officielle Ayadina et les prix publics observés sur les agences en ligne.
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
                      <p
                        key={step.id}
                        className={cn(
                          "text-sm transition-colors duration-300",
                          isComplete || isActive ? "text-foreground" : "text-muted-foreground/60"
                        )}
                      >
                        {step.label}
                      </p>
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
                  href={loadingBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
                >
                  Continuer directement vers la réservation officielle
                </a>
              </div>
            </div>
          </div>
        </section>
        </main>
        <Footer />
      </>
    )
  }

  // Results State
  const comparison = comparisonResult ?? createUnavailableComparison()
  const referenceOffer = chooseReferenceOffer(comparison.offers)
  const cloudbedsFallbackOffer = getCloudbedsFallbackOffer(comparison, nights)
  const directOffer = comparison.directOffer ?? cloudbedsFallbackOffer
  const usesCloudbedsFallback = !comparison.directOffer && Boolean(cloudbedsFallbackOffer)
  const hasNoAvailability = comparison.status === "no_availability"
  const hasLivePrices = comparison.status === "available" && Boolean(directOffer)
  const sameCurrency = Boolean(directOffer && referenceOffer && directOffer.currency === referenceOffer.currency)
  const otaBeatsDirect = Boolean(sameCurrency && directOffer && referenceOffer && referenceOffer.price < directOffer.price)
  const shouldShowDirectPrice = hasLivePrices && !otaBeatsDirect && !usesCloudbedsFallback
  const showPriceComparison = shouldShowDirectPrice
  const savingsPerNight = showPriceComparison && directOffer && referenceOffer ? Math.max(referenceOffer.price - directOffer.price, 0) : 0
  const totalSavings = savingsPerNight * nights
  const directOfferBundle = getDirectOfferBundle(nights)
  const perks = directOfferBundle.perks
  const bookingUrl = buildBookingEngineUrl({ ...search, currency: getResolvedCurrency(comparison, search.currency) })
  const reservationEmailUrl = buildReservationEmailUrl(search)

  return (
    <>
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
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Nous n&apos;avons plus de disponibilité en ligne pour ces dates.</h2>
                  <p className="text-muted-foreground mb-6">
                    Pour votre séjour du {formatLongDate(search.checkIn!)} au {formatLongDate(search.checkOut!)}, aucune chambre n&apos;est disponible à la réservation en ligne actuellement. Vous pouvez écrire au service réservation si vous souhaitez une confirmation directe ou proposer d&apos;autres dates.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="rounded-none px-8 py-6">
                      <a
                        href={reservationEmailUrl}
                        onClick={() => trackDirectBookingEvent("rate_compare_click_contact", { checkIn: search.checkIn, checkOut: search.checkOut, reason: "no_availability_email" })}
                      >
                        Écrire au service réservation
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {!hasLivePrices && !hasNoAvailability && (
              <div className="mb-6 border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
                <p className="font-medium mb-1">La comparaison avec les agences en ligne n&apos;est pas disponible pour le moment.</p>
                <p className="text-muted-foreground">
                  Vous pouvez continuer vers la réservation directe Riad Ayadina & Spa. Les tarifs officiels, disponibilités et conditions détaillées seront affichés avant confirmation.
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
                        <p className="text-xs text-muted-foreground mt-1">Réservation directe</p>
                      </div>
                    </div>
                    <div className="bg-accent text-accent-foreground text-xs uppercase tracking-wider px-3 py-1.5 font-medium self-start">
                      {totalSavings > 0 ? "Meilleur prix direct" : shouldShowDirectPrice ? "Officiel" : "Avantages directs"}
                    </div>
                  </div>

                  {shouldShowDirectPrice ? (
                    <div className="flex items-end justify-between mb-6 pb-6 border-b border-border">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Prix par nuit</p>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-4xl md:text-5xl text-foreground">
                            {directOffer ? formatMoney(directOffer.price, directOffer.currency) : "Sur Cloudbeds"}
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
                  ) : (
                    <div className="mb-6 pb-6 border-b border-border">
                      <p className="text-sm text-muted-foreground mb-2">Réservation officielle</p>
                      <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                        Les avantages directs restent réservés aux clients du site officiel.
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Les tarifs, disponibilités et conditions finales seront affichés sur le moteur sécurisé Ayadina avant confirmation. Nous n&apos;affichons pas de comparaison prix lorsqu&apos;une agence est moins chère ou lorsque la comparaison n&apos;est pas strictement comparable.
                      </p>
                    </div>
                  )}

                  {/* Perks */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-foreground mb-4">{directOfferBundle.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {perks.map((perk, index) => (
                        <PerkBadge key={index}>{perk}</PerkBadge>
                      ))}
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="text-sm text-muted-foreground mb-6 p-4 bg-secondary/50 rounded-sm">
                    <p>Réservation Directe “Riad Ayadina & Spa” · Conditions détaillées affichées avant confirmation · Confirmation immédiate</p>
                  </div>

                  {/* CTA */}
                  <Button asChild size="lg" className="w-full rounded-none py-7 text-base tracking-wide">
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackDirectBookingEvent("rate_compare_click_cloudbeds", { checkIn: search.checkIn, checkOut: search.checkOut, adults: String(search.adults || 2), outcome: getComparisonOutcome(comparison) })}
                    >
                      {totalSavings > 0 ? "Réserver au meilleur prix" : shouldShowDirectPrice ? "Réserver en direct" : "Voir les disponibilités officielles"}
                    </a>
                  </Button>
                </div>
              </div>

              {/* OTA Offers - Takes 2 columns */}
              <div className="lg:col-span-2 space-y-4">
                {otaBeatsDirect || usesCloudbedsFallback ? (
                  <div className="bg-primary text-primary-foreground p-6">
                    <p className="text-accent text-xs uppercase tracking-[0.2em] mb-3">Réserver en direct</p>
                    <h3 className="font-serif text-2xl mb-2">Profitez toujours d&apos;avantages exclusifs en réservant sur notre site.</h3>
                    <p className="text-sm text-primary-foreground/70 mb-5">{directOfferBundle.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {perks.slice(0, 4).map((perk) => (
                        <PerkBadge key={perk} variant="dark">{perk}</PerkBadge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider px-1">Comparaison “agence en ligne”</p>
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
                            ? "Aucune offre d’agence en ligne disponible pour ces dates."
                            : "Comparaison agence en ligne indisponible pour le moment."}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground text-center pt-2">
                      Source : agences en ligne · Tarifs indicatifs
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Trust Section */}
            <div className="grid md:grid-cols-3 gap-6 py-8 border-t border-border">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <CreditCard className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-foreground">Pas de prépaiement</p>
                  <p className="text-sm text-muted-foreground">Nous prenons juste une empreinte de carte bancaire</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <MailCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-foreground">Confirmation instantanée</p>
                  <p className="text-sm text-muted-foreground">Email de confirmation immédiat</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <HandHeart className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-foreground">Accueil personnalisé</p>
                  <p className="text-sm text-muted-foreground">Pour tous nos clients directs</p>
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
      <Footer />
    </>
  )
}

function getResolvedCurrency(comparison: RateComparison, fallback?: string) {
  return comparison.directOffer?.currency || comparison.availability?.rooms.find((room) => room.currency)?.currency || fallback
}

function OTACard({ offer, nights, isMain = false }: { offer: RateOffer; nights: number; isMain?: boolean }) {
  return (
    <div className={`bg-muted/30 border border-border p-4 ${isMain ? "" : "opacity-70"}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-muted-foreground">{offer.title}</p>
        {isMain && (
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5">Offre observée</span>
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

function PerkBadge({ children, variant = "light" }: { children: ReactNode; variant?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border bg-transparent px-3 py-1.5 text-xs font-medium leading-none",
        variant === "dark"
          ? "border-primary-foreground/30 text-primary-foreground"
          : "border-accent/35 text-foreground"
      )}
    >
      {children}
    </span>
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

function getCloudbedsFallbackOffer(comparison: RateComparison, nights: number): RateOffer | undefined {
  if (comparison.directOffer || comparison.availability?.status !== "available") return undefined

  const pricedRooms = comparison.availability.rooms.filter(
    (room) => typeof room.minRate === "number" && Number.isFinite(room.minRate)
  )
  const bestRoom = pricedRooms.sort((a, b) => (a.minRate || 0) - (b.minRate || 0))[0]
  if (!bestRoom?.minRate) return undefined

  return {
    title: "Riad Ayadina & Spa",
    price: bestRoom.minRate / Math.max(nights, 1),
    currency: bestRoom.currency || "MAD",
    conditions: "Tarif officiel Cloudbeds",
    officialSite: true,
  }
}

function getDirectOfferBundle(nights: number) {
  if (nights >= 3) {
    return {
      label: "Package Immersion (3 nuits et plus)",
      perks: getImmersionPackagePerks(),
    }
  }

  if (nights >= 2) {
    return {
      label: "Package Escapade (2 nuits)",
      perks: getEscapadePackagePerks(),
    }
  }

  return {
    label: "Offre Spéciale Directe",
    perks: ["Annulation flexible", "Pas de prépaiement", "-10% sur les soins Spa", "Surclassement & early check-in selon disponibilité"],
  }
}

function getImmersionPackagePerks() {
  return [
    "Transfert aéroport A/R",
    "Annulation flexible",
    "Pas de prépaiement",
    "-10% sur les soins Spa",
    "Cocktail de bienvenue",
    "Surclassement & early check-in selon disponibilité",
  ]
}

function getEscapadePackagePerks() {
  return [
    "Transfert aéroport aller",
    "Annulation flexible",
    "Pas de prépaiement",
    "-10% sur les soins Spa",
    "Cocktail de bienvenue",
    "Surclassement & early check-in selon disponibilité",
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

function buildReservationEmailUrl(search: { checkIn?: string; checkOut?: string; adults?: string }) {
  const subject = "Demande de disponibilité - Riad Ayadina"
  const body = [
    "Bonjour,",
    "",
    "Je souhaite vérifier les disponibilités pour le séjour suivant :",
    `- Arrivée : ${search.checkIn || ""}`,
    `- Départ : ${search.checkOut || ""}`,
    `- Voyageurs : ${search.adults || 2}`,
    "",
    "Merci par avance.",
  ].join("\n")

  return `mailto:booking@riadayadinamarrakech.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
    message: "Comparaison agence en ligne indisponible pour le moment.",
  }
}
