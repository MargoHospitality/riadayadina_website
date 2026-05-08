"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Search, CheckCircle2, Clock, ShieldCheck, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { buildBookingEngineUrl } from "@/lib/booking-engine"

const steps = [
  { id: 1, label: "Recherche de l'offre officielle Ayadina" },
  { id: 2, label: "Lecture des prix Booking.com et OTA" },
  { id: 3, label: "Vérification des conditions directes" },
]

export default function ComparerLoading() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showFallback, setShowFallback] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    // Progress through steps
    const stepTimers = [
      setTimeout(() => setCurrentStep(2), 1500),
      setTimeout(() => setCurrentStep(3), 3500),
    ]

    // Show fallback CTA after 5 seconds
    const fallbackTimer = setTimeout(() => setShowFallback(true), 5000)

    // Track elapsed time
    const interval = setInterval(() => {
      setElapsedTime((t) => t + 1)
    }, 1000)

    return () => {
      stepTimers.forEach(clearTimeout)
      clearTimeout(fallbackTimer)
      clearInterval(interval)
    }
  }, [])

  // Mock dates for display (in real usage these come from URL params)
  const mockDates = {
    checkIn: "2026-06-15",
    checkOut: "2026-06-17",
    adults: 2,
  }

  const nights = 2

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 md:pt-40 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            {/* Step indicator */}
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-[0.2em] mb-6">
              <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-medium">1</span>
              <span>/</span>
              <span className="text-muted-foreground/50">2</span>
              <span className="mx-2">·</span>
              <span>Vérification en cours</span>
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
                  <p className="font-serif text-lg text-foreground">15 juin</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-xs text-accent font-medium">{nights} nuits</span>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Départ</p>
                  <p className="font-serif text-lg text-foreground">17 juin</p>
                </div>
                <div className="h-8 w-px bg-border mx-2 hidden sm:block" />
                <div className="text-center hidden sm:block">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Voyageurs</p>
                  <p className="font-serif text-lg text-foreground">2 adultes</p>
                </div>
              </div>
            </div>

            {/* Loading checklist */}
            <div className="bg-card border border-border/50 p-6 mb-8">
              <div className="space-y-4">
                {steps.map((step) => {
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
                            ? "bg-accent text-accent-foreground"
                            : isActive
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
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
              <div className="mt-6 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-1000 ease-out"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Reassurance text */}
            <p className="text-xs text-muted-foreground mb-6">
              {elapsedTime < 5
                ? "Cela prend généralement quelques secondes."
                : "La comparaison prend plus longtemps que prévu..."}
            </p>

            {/* Fallback CTA - appears after 5 seconds */}
            <div
              className={cn(
                "transition-all duration-500",
                showFallback ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              )}
            >
              <a
                href={buildBookingEngineUrl(mockDates)}
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
      </main>
    </div>
  )
}
