"use client"

import { useState, useEffect, useMemo, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingDateModal } from "@/components/booking-date-modal"
import { trackDirectBookingEvent } from "@/lib/analytics"
import { buildBookingEngineUrl, getNightCount, isValidBookingSearch, normalizeBookingCurrency, normalizeBookingLanguage } from "@/lib/booking-engine"
import type { RateComparison, RateOffer } from "@/lib/rate-compare"
import { cn } from "@/lib/utils"
import { CreditCard, MailCheck, HandHeart } from "lucide-react"

const compareCopy = {
  fr: {
    loadingSteps: [
      "Recherche de l'offre officielle Ayadina",
      "Lecture des prix des agences en ligne",
      "Vérification des conditions directes",
    ],
    invalidEyebrow: "Réservation directe",
    invalidTitle: "Choisissez vos dates",
    invalidText: "Indiquez une date d'arrivée et une date de départ pour vérifier l'offre directe.",
    backToBooking: "Retour au moteur",
    loadingTitle: "Nous vérifions les meilleurs prix pour vos dates.",
    loadingText: "Comparaison en temps réel entre l'offre officielle Ayadina et les prix publics observés sur les agences en ligne.",
    arrival: "Arrivée",
    departure: "Départ",
    travelers: "Voyageurs",
    night: "nuit",
    nights: "nuits",
    person: "personne",
    people: "personnes",
    usuallySeconds: "Cela prend généralement quelques secondes.",
    continueOfficial: "Continuer directement vers la réservation officielle",
    heroEyebrow: "Comparaison des tarifs",
    stayFromTo: (from: string, to: string) => `Votre séjour du ${from} au ${to}`,
    edit: "Modifier",
    onlineAvailability: "Disponibilité en ligne",
    noAvailabilityTitle: "Nous n'avons plus de disponibilité en ligne pour ces dates.",
    noAvailabilityText: (from: string, to: string) =>
      `Pour votre séjour du ${from} au ${to}, aucune chambre n'est disponible à la réservation en ligne actuellement. Vous pouvez écrire au service réservation si vous souhaitez une confirmation directe ou proposer d'autres dates.`,
    writeReservation: "Écrire au service réservation",
    compareUnavailableTitle: "La comparaison avec les agences en ligne n'est pas disponible pour le moment.",
    compareUnavailableText: "Vous pouvez continuer vers la réservation directe Riad Ayadina & Spa. Les tarifs officiels, disponibilités et conditions détaillées seront affichés avant confirmation.",
    officialSite: "Site officiel",
    directBooking: "Réservation directe",
    bestDirectPrice: "Meilleur prix direct",
    official: "Officiel",
    directBenefits: "Avantages directs",
    nightlyPrice: "Prix par nuit",
    totalEstimate: "Total estimé",
    cloudbedsPrice: "Sur Cloudbeds",
    savingsStay: (amount: string) => `Économie de ${amount}`,
    onYourStay: "sur votre séjour",
    officialBooking: "Réservation officielle",
    benefitsTitle: "Les avantages directs restent réservés aux clients du site officiel.",
    benefitsText: "Les tarifs, disponibilités et conditions finales seront affichés sur le moteur sécurisé Ayadina avant confirmation. Nous n'affichons pas de comparaison prix lorsqu'une agence est moins chère ou lorsque la comparaison n'est pas strictement comparable.",
    conditions: "Réservation directe “Riad Ayadina & Spa” · Conditions détaillées affichées avant confirmation · Confirmation immédiate",
    bookBest: "Réserver au meilleur prix",
    bookDirect: "Réserver en direct",
    seeOfficialAvailability: "Voir les disponibilités officielles",
    otaComparison: "Comparaison “agence en ligne”",
    noOtaOffer: "Aucune offre d'agence en ligne disponible pour ces dates.",
    otaUnavailable: "Comparaison agence en ligne indisponible pour le moment.",
    source: "Source : agences en ligne · Tarifs indicatifs",
    nonRefundable: "Non remboursable",
    observedOffer: "Offre observée",
    perNight: "/ nuit",
    total: "Total",
    noPrepayment: "Pas de prépaiement",
    noPrepaymentText: "Nous prenons juste une empreinte de carte bancaire",
    instantConfirmation: "Confirmation instantanée",
    instantConfirmationText: "Email de confirmation immédiat",
    personalWelcome: "Accueil personnalisé",
    personalWelcomeText: "Pour tous nos clients directs",
    packages: {
      immersion: "Privilèges Immersion (3 nuits et plus)",
      escapade: "Privilèges Escapade (2 nuits)",
      direct: "Offre Spéciale Directe",
    },
    perks: {
      airportReturn: "Transfert aéroport A/R",
      airportOneWay: "Transfert aéroport aller",
      flexible: "Annulation flexible",
      noPrepayment: "Pas de prépaiement",
      spaDiscount: "-10% sur les soins spa",
      cocktail: "Cocktail de bienvenue",
      upgrade: "Surclassement et arrivée anticipée selon disponibilité",
    },
  },
  en: {
    loadingSteps: [
      "Checking Ayadina’s official offer",
      "Reading online agency rates",
      "Verifying direct-booking conditions",
    ],
    invalidEyebrow: "Direct booking",
    invalidTitle: "Choose your dates",
    invalidText: "Enter an arrival and departure date to check the direct offer.",
    backToBooking: "Back to booking",
    loadingTitle: "We are checking the best rates for your dates.",
    loadingText: "Real-time comparison between Ayadina’s official offer and public rates found on online travel agencies.",
    arrival: "Arrival",
    departure: "Departure",
    travelers: "Guests",
    night: "night",
    nights: "nights",
    person: "guest",
    people: "guests",
    usuallySeconds: "This usually takes a few seconds.",
    continueOfficial: "Continue directly to the official booking engine",
    heroEyebrow: "Rate comparison",
    stayFromTo: (from: string, to: string) => `Your stay from ${from} to ${to}`,
    edit: "Edit",
    onlineAvailability: "Online availability",
    noAvailabilityTitle: "No rooms are currently available online for these dates.",
    noAvailabilityText: (from: string, to: string) =>
      `For your stay from ${from} to ${to}, no room is currently available through online booking. You can contact reservations directly if you would like a manual confirmation or alternative dates.`,
    writeReservation: "Contact reservations",
    compareUnavailableTitle: "Online agency comparison is not available right now.",
    compareUnavailableText: "You can continue to Riad Ayadina & Spa’s official booking engine. Official rates, availability and detailed conditions will be shown before confirmation.",
    officialSite: "Official site",
    directBooking: "Direct booking",
    bestDirectPrice: "Best direct rate",
    official: "Official",
    directBenefits: "Direct benefits",
    nightlyPrice: "Price per night",
    totalEstimate: "Estimated total",
    cloudbedsPrice: "On Cloudbeds",
    savingsStay: (amount: string) => `Save ${amount}`,
    onYourStay: "on your stay",
    officialBooking: "Official booking",
    benefitsTitle: "Direct benefits remain reserved for guests booking on the official site.",
    benefitsText: "Final rates, availability and conditions will be shown on Ayadina’s secure booking engine before confirmation. We do not display a price comparison when an agency is cheaper or when rates are not strictly comparable.",
    conditions: "Direct booking “Riad Ayadina & Spa” · Detailed conditions shown before confirmation · Instant confirmation",
    bookBest: "Book the best direct rate",
    bookDirect: "Book direct",
    seeOfficialAvailability: "See official availability",
    otaComparison: "Online agency comparison",
    noOtaOffer: "No online agency offer is available for these dates.",
    otaUnavailable: "Online agency comparison is not available right now.",
    source: "Source: online agencies · Indicative rates",
    nonRefundable: "Non-refundable",
    observedOffer: "Observed offer",
    perNight: "/ night",
    total: "Total",
    noPrepayment: "No prepayment",
    noPrepaymentText: "Only a card imprint is required",
    instantConfirmation: "Instant confirmation",
    instantConfirmationText: "Immediate confirmation email",
    personalWelcome: "Personalized welcome",
    personalWelcomeText: "For all direct guests",
    packages: {
      immersion: "Immersion privileges (3 nights or more)",
      escapade: "Getaway privileges (2 nights)",
      direct: "Special direct offer",
    },
    perks: {
      airportReturn: "Return airport transfer",
      airportOneWay: "One-way airport transfer",
      flexible: "Flexible cancellation",
      noPrepayment: "No prepayment",
      spaDiscount: "-10% on spa treatments",
      cocktail: "Welcome cocktail",
      upgrade: "Upgrade and early check-in subject to availability",
    },
  },
} as const

export function CompareClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [showFallback, setShowFallback] = useState(false)
  const [comparisonResult, setComparisonResult] = useState<RateComparison | null>(null)
  
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const pathLocale = pathname?.startsWith("/en") || pathname === "/compare" ? "en" : "fr"
  const urlSearch = useMemo(() => ({
    checkIn: searchParams.get("checkIn") || searchParams.get("checkin") || undefined,
    checkOut: searchParams.get("checkOut") || searchParams.get("checkout") || undefined,
    adults: searchParams.get("adults") || searchParams.get("guests") || "2",
    currency: searchParams.get("currency") ? normalizeBookingCurrency(searchParams.get("currency") || undefined) : undefined,
    language: normalizeBookingLanguage(searchParams.get("language") || pathLocale),
  }), [pathLocale, searchParams])
  const [submittedSearch, setSubmittedSearch] = useState<typeof urlSearch | null>(null)
  const search = useMemo(() => submittedSearch ?? urlSearch, [submittedSearch, urlSearch])
  const locale = search.language === "en" ? "en" : "fr"
  const t = compareCopy[locale]
  const loadingSteps = t.loadingSteps.map((label, index) => ({ id: index + 1, label }))

  useEffect(() => {
    setSubmittedSearch(null)
  }, [urlSearch.checkIn, urlSearch.checkOut, urlSearch.adults, urlSearch.currency, urlSearch.language])

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
  }, [search])

  const handleDateSearchSubmit = (nextSearch: { checkIn: string; checkOut: string; adults: string }) => {
    const next = {
      ...search,
      ...nextSearch,
    }
    const params = new URLSearchParams({
      checkIn: next.checkIn,
      checkOut: next.checkOut,
      adults: next.adults,
      language: next.language,
    })
    if (next.currency) params.set("currency", next.currency)

    setCurrentStep(1)
    setShowFallback(false)
    setComparisonResult(null)
    setIsLoading(true)
    setSubmittedSearch(next)
    setIsModalOpen(false)
    window.history.pushState(null, "", `${locale === "en" ? "/en/compare" : "/comparer"}?${params.toString()}`)
  }

  if (!isValidBookingSearch(search)) {
    return (
      <>
        <main className="min-h-screen bg-background">
          <Header locale={locale} />
          <section className="pt-32 pb-16">
            <div className="container mx-auto px-4 max-w-2xl text-center">
              <p className="text-accent text-sm uppercase tracking-[0.25em] mb-4">{t.invalidEyebrow}</p>
              <h1 className="font-serif text-3xl md:text-4xl mb-6">{t.invalidTitle}</h1>
              <p className="text-muted-foreground mb-8">
                {t.invalidText}
              </p>
              <Button asChild className="rounded-none px-8 py-6">
                <Link href={locale === "en" ? "/en#booking" : "/#booking"}>{t.backToBooking}</Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer locale={locale} />
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
          <Header locale={locale} />

        <section className="pt-32 md:pt-40 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              {/* Main title */}
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-balance">
                {t.loadingTitle}
              </h1>

              {/* Subtitle */}
              <p className="text-muted-foreground text-sm md:text-base mb-10 max-w-md mx-auto">
                {t.loadingText}
              </p>

              {/* Date summary card */}
              <div className="bg-secondary/50 border border-border/50 p-5 mb-8">
                <div className="flex items-center justify-center gap-6 md:gap-10">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.arrival}</p>
                    <p className="font-serif text-lg text-foreground">{formatLongDate(search.checkIn!, locale)}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-px bg-accent" />
                    <span className="text-xs text-accent font-medium">{nights} {nights > 1 ? t.nights : t.night}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.departure}</p>
                    <p className="font-serif text-lg text-foreground">{formatLongDate(search.checkOut!, locale)}</p>
                  </div>
                  <div className="h-8 w-px bg-border mx-2 hidden sm:block" />
                  <div className="text-center hidden sm:block">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.travelers}</p>
                    <p className="font-serif text-lg text-foreground">{search.adults} {Number(search.adults) > 1 ? t.people : t.person}</p>
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
                {t.usuallySeconds}
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
                  {t.continueOfficial}
                </a>
              </div>
            </div>
          </div>
        </section>
        </main>
        <Footer locale={locale} />
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
  const hasLivePrices = !hasNoAvailability && Boolean(directOffer)
  const sameCurrency = Boolean(directOffer && referenceOffer && directOffer.currency === referenceOffer.currency)
  const otaBeatsDirect = Boolean(sameCurrency && directOffer && referenceOffer && referenceOffer.price < directOffer.price)
  const shouldShowDirectPrice = hasLivePrices && !otaBeatsDirect && !usesCloudbedsFallback
  const showPriceComparison = shouldShowDirectPrice
  const savingsPerNight = showPriceComparison && directOffer && referenceOffer ? Math.max(referenceOffer.price - directOffer.price, 0) : 0
  const totalSavings = savingsPerNight * nights
  const directOfferBundle = getDirectOfferBundle(nights, t)
  const perks = directOfferBundle.perks
  const bookingUrl = buildBookingEngineUrl({ ...search, currency: getResolvedCurrency(comparison, search.currency) })
  const reservationEmailUrl = buildReservationEmailUrl(search)

  return (
    <>
      <main className="min-h-screen bg-background">
        <Header locale={locale} />

      {/* Hero Banner */}
      <section className="relative pt-28 md:pt-32 pb-8 bg-primary overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(195,164,108,0.16),transparent_28%)]" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-2">{t.heroEyebrow}</p>
            
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-foreground">
                  {t.stayFromTo(formatLongDate(search.checkIn!, locale), formatLongDate(search.checkOut!, locale))}
                </h1>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-primary-foreground/50 hover:text-primary-foreground border border-primary-foreground/20 hover:border-primary-foreground/40 px-3 py-1.5 transition-colors"
                >
                  {t.edit}
                </button>
              </div>
              <div className="flex items-center gap-6 text-primary-foreground">
                <div className="text-center">
                  <p className="font-serif text-3xl lg:text-4xl">{nights}</p>
                  <p className="text-sm text-primary-foreground/60">{nights > 1 ? t.nights : t.night}</p>
                </div>
                <div className="w-px h-12 bg-primary-foreground/20" />
                <div className="text-center">
                  <p className="font-serif text-3xl lg:text-4xl">{search.adults}</p>
                  <p className="text-sm text-primary-foreground/60">{Number(search.adults) > 1 ? t.people : t.person}</p>
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
                  <p className="text-accent text-sm uppercase tracking-[0.2em] mb-3">{t.onlineAvailability}</p>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">{t.noAvailabilityTitle}</h2>
                  <p className="text-muted-foreground mb-6">
                    {t.noAvailabilityText(formatLongDate(search.checkIn!, locale), formatLongDate(search.checkOut!, locale))}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="rounded-none px-8 py-6">
                      <a
                        href={reservationEmailUrl}
                        onClick={() => trackDirectBookingEvent("rate_compare_click_contact", { checkIn: search.checkIn, checkOut: search.checkOut, reason: "no_availability_email" })}
                      >
                        {t.writeReservation}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {!hasLivePrices && !hasNoAvailability && (
              <div className="mb-6 border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
                <p className="font-medium mb-1">{t.compareUnavailableTitle}</p>
                <p className="text-muted-foreground">
                  {t.compareUnavailableText}
                </p>
              </div>
            )}

            {!hasNoAvailability && (
              <>
            {/* Price Cards Grid */}
            <div className="grid lg:grid-cols-5 gap-6 mb-10">
              
              {/* Direct Offer - Takes 3 columns */}
              <div className="order-2 lg:order-1 lg:col-span-3 bg-card border-2 border-accent shadow-lg relative overflow-hidden">
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
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.officialSite}</p>
                        <h2 className="font-serif text-xl md:text-2xl text-foreground">Riad Ayadina & Spa</h2>
                        <p className="text-xs text-muted-foreground mt-1">{t.directBooking}</p>
                      </div>
                    </div>
                    <div className="bg-accent text-accent-foreground text-xs uppercase tracking-wider px-3 py-1.5 font-medium self-start">
                      {totalSavings > 0 ? t.bestDirectPrice : shouldShowDirectPrice ? t.official : t.directBenefits}
                    </div>
                  </div>

                  {shouldShowDirectPrice ? (
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:gap-4 mb-6 pb-6 border-b border-border">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">{t.nightlyPrice}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-3xl md:text-4xl text-foreground">
                            {directOffer ? formatMoney(directOffer.price, directOffer.currency, locale) : t.cloudbedsPrice}
                          </span>
                        </div>
                        {totalSavings > 0 && (
                          <p className="text-accent font-medium mt-2 leading-tight">
                            <span className="block">{t.savingsStay(formatMoney(totalSavings, directOffer?.currency || "EUR", locale))}</span>
                            <span className="block">{t.onYourStay}</span>
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm text-muted-foreground mb-1">{t.totalEstimate}</p>
                        <p className="font-serif text-2xl text-foreground">
                          {directOffer ? formatMoney(directOffer.price * nights, directOffer.currency, locale) : t.cloudbedsPrice}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 pb-6 border-b border-border">
                      <p className="text-sm text-muted-foreground mb-2">{t.officialBooking}</p>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                        {t.benefitsTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t.benefitsText}
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
                    <p>{t.conditions}</p>
                  </div>

                  {/* CTA */}
                  <Button asChild size="lg" className="w-full rounded-none py-7 text-base tracking-wide">
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackDirectBookingEvent("rate_compare_click_cloudbeds", { checkIn: search.checkIn, checkOut: search.checkOut, adults: String(search.adults || 2), outcome: getComparisonOutcome(comparison) })}
                    >
                      {totalSavings > 0 ? t.bookBest : shouldShowDirectPrice ? t.bookDirect : t.seeOfficialAvailability}
                    </a>
                  </Button>
                </div>
              </div>

              {/* OTA Offers - Takes 2 columns */}
              <div className="order-1 lg:order-2 lg:col-span-2 space-y-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider px-1">{t.otaComparison}</p>
                {referenceOffer ? (
                  <>
                    <OTACard offer={referenceOffer} nights={nights} locale={locale} copy={t} isMain />
                    {comparison.offers
                      .filter(o => o.title !== referenceOffer.title)
                      .slice(0, 2)
                      .map((offer, index) => (
                        <OTACard key={index} offer={offer} nights={nights} locale={locale} copy={t} />
                      ))}
                  </>
                ) : (
                  <div className="bg-muted/30 border border-border p-6 text-center">
                    <p className="text-muted-foreground">
                      {comparison.status === "empty"
                        ? t.noOtaOffer
                        : t.otaUnavailable}
                    </p>
                  </div>
                )}

                <p className="text-xs text-muted-foreground text-center pt-2">
                  {t.source}
                </p>
              </div>
            </div>

            {/* Trust Section */}
            <div className="grid md:grid-cols-3 gap-6 py-8 border-t border-border">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <CreditCard className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-foreground">{t.noPrepayment}</p>
                  <p className="text-sm text-muted-foreground">{t.noPrepaymentText}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <MailCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-foreground">{t.instantConfirmation}</p>
                  <p className="text-sm text-muted-foreground">{t.instantConfirmationText}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <HandHeart className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-foreground">{t.personalWelcome}</p>
                  <p className="text-sm text-muted-foreground">{t.personalWelcomeText}</p>
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
        onSearchSubmit={handleDateSearchSubmit}
        locale={locale}
      />
      </main>
      <Footer locale={locale} />
    </>
  )
}

function getResolvedCurrency(comparison: RateComparison, fallback?: string) {
  return comparison.directOffer?.currency || comparison.availability?.rooms.find((room) => room.currency)?.currency || fallback
}

function OTACard({
  offer,
  nights,
  locale,
  copy,
  isMain = false,
}: {
  offer: RateOffer
  nights: number
  locale: "fr" | "en"
  copy: (typeof compareCopy)["fr"] | (typeof compareCopy)["en"]
  isMain?: boolean
}) {
  return (
    <div className={`bg-muted/30 border border-border p-4 ${isMain ? "" : "opacity-70"}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-muted-foreground">{offer.title}</p>
        {isMain && (
          <div className="flex flex-wrap justify-end gap-1.5">
            <span className="border border-red-200/70 bg-red-50/80 px-2 py-0.5 text-[11px] font-medium text-red-700">
              {copy.nonRefundable}
            </span>
            <span className="bg-muted px-2 py-0.5 text-xs text-muted-foreground">{copy.observedOffer}</span>
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="font-serif text-2xl text-muted-foreground">{formatMoney(offer.price, offer.currency, locale)}</span>
          <span className="text-muted-foreground/60 text-sm ml-1">{copy.perNight}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {copy.total} : {formatMoney(offer.price * nights, offer.currency, locale)}
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

function getDirectOfferBundle(nights: number, copy: (typeof compareCopy)["fr"] | (typeof compareCopy)["en"]) {
  if (nights >= 3) {
    return {
      label: copy.packages.immersion,
      perks: [
        copy.perks.airportReturn,
        copy.perks.flexible,
        copy.perks.noPrepayment,
        copy.perks.spaDiscount,
        copy.perks.cocktail,
        copy.perks.upgrade,
      ],
    }
  }

  if (nights >= 2) {
    return {
      label: copy.packages.escapade,
      perks: [
        copy.perks.airportOneWay,
        copy.perks.flexible,
        copy.perks.noPrepayment,
        copy.perks.spaDiscount,
        copy.perks.cocktail,
        copy.perks.upgrade,
      ],
    }
  }

  return {
    label: copy.packages.direct,
    perks: [copy.perks.flexible, copy.perks.noPrepayment, copy.perks.spaDiscount, copy.perks.upgrade],
  }
}

function formatLongDate(value: string, locale: "fr" | "en" = "fr") {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long" }).format(new Date(`${value}T00:00:00`))
}

function formatMoney(value: number, currency: string, locale: "fr" | "en" = "fr") {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

function buildReservationEmailUrl(search: { checkIn?: string; checkOut?: string; adults?: string; language?: string }) {
  const isEnglish = search.language === "en"
  const subject = isEnglish ? "Availability request - Riad Ayadina" : "Demande de disponibilité - Riad Ayadina"
  const body = (isEnglish
    ? [
        "Hello,",
        "",
        "I would like to check availability for the following stay:",
        `- Arrival: ${search.checkIn || ""}`,
        `- Departure: ${search.checkOut || ""}`,
        `- Guests: ${search.adults || 2}`,
        "",
        "Thank you.",
      ]
    : [
        "Bonjour,",
        "",
        "Je souhaite vérifier les disponibilités pour le séjour suivant :",
        `- Arrivée : ${search.checkIn || ""}`,
        `- Départ : ${search.checkOut || ""}`,
        `- Voyageurs : ${search.adults || 2}`,
        "",
        "Merci par avance.",
      ]).join("\n")

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
