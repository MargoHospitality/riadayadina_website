"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { useBookingModal } from "@/components/booking-modal-provider"

export function DirectBookingBanner() {
  const { openBookingModal } = useBookingModal()
  
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header - Editorial style */}
        <AnimateOnScroll animation="fade-up" className="text-center mb-12 md:mb-16">
          <p className="text-accent text-sm uppercase tracking-[0.25em] mb-3">
            Privilèges réservation directe
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Ce que vous gagnez en réservant ici
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Sur les plateformes, nous reversons jusqu&apos;à 20% de commission. 
            En direct, ces économies deviennent vos avantages.
          </p>
        </AnimateOnScroll>

        {/* Two editorial cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Card 1 - Escapade */}
          <AnimateOnScroll animation="fade-up" delay={100}>
            <div className="group bg-card border border-border/50 hover:border-accent/30 transition-all duration-300 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">À partir de 2 nuitées</p>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground">Escapade</h3>
                  </div>
                  <span className="font-serif text-4xl text-accent/60">2</span>
                </div>
                
                <div className="space-y-3 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Tarif préférentiel exclusif</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    <span>Transfert aéroport aller</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    <span>-10% sur les soins Spa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    <span>Cocktail de bienvenue</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                    <span className="text-muted-foreground/70">Surclassement & early check-in si dispo.</span>
                  </div>
                </div>

                <Button
                  onClick={() => openBookingModal()}
                  variant="outline"
                  className="w-full rounded-none py-5 border-foreground/20 hover:bg-foreground/5 hover:border-accent/50 transition-all"
                >
                  Réserver en direct
                </Button>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card 2 - Immersion (Featured) */}
          <AnimateOnScroll animation="fade-up" delay={200}>
            <div className="group relative bg-primary text-primary-foreground overflow-hidden">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>
              
              {/* Recommended badge */}
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 text-xs uppercase tracking-wider">
                Recommandé
              </div>

              <div className="relative p-6 md:p-8">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-primary-foreground/60 mb-1">À partir de 3 nuitées</p>
                    <h3 className="font-serif text-2xl md:text-3xl">Immersion</h3>
                  </div>
                  <span className="font-serif text-4xl text-accent">3</span>
                </div>
                
                <div className="space-y-3 text-sm text-primary-foreground/90 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="font-medium">Meilleur tarif garanti</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="font-medium">Transfert aéroport aller-retour</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40" />
                    <span>-10% sur les soins Spa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40" />
                    <span>Cocktail de bienvenue</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/30" />
                    <span className="text-primary-foreground/70">Surclassement & early check-in si dispo.</span>
                  </div>
                </div>

                <Button
                  onClick={() => openBookingModal()}
                  className="w-full rounded-none py-5 bg-white text-primary hover:bg-white/90 transition-all"
                >
                  Réserver en direct
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Link to full offers page */}
        <div className="text-center mt-10">
          <Link 
            href="/offres" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="border-b border-transparent group-hover:border-foreground/30 transition-all">
              Voir le détail de nos offres
            </span>
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
