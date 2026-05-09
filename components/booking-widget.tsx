"use client"

import { Button } from "@/components/ui/button"
import { useBookingModal } from "@/components/booking-modal-provider"
import { ShieldCheck, Plane, Percent } from "lucide-react"

export function BookingWidget() {
  const { openBookingModal } = useBookingModal()

  return (
    <section id="booking" className="py-10 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-12">
            <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] mb-2 md:mb-4">
              Réservation directe
            </p>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-foreground mb-3 md:mb-6">
              Réservez votre séjour
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
              Meilleur tarif garanti et avantages exclusifs en réservant ici
            </p>
          </div>

          {/* CTA Card */}
          <div className="bg-card shadow-lg p-4 md:p-10">
            {/* Benefits reminder */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-4 md:mb-8 pb-4 md:pb-8 border-b border-border">
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                <span>Meilleur tarif</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                <Plane className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                <span>Transfert offert</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                <Percent className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                <span>-10% Spa</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => openBookingModal()}
              size="lg"
              className="w-full rounded-none py-5 md:py-7 text-sm md:text-base tracking-wide"
            >
              Réserver en direct
            </Button>

            {/* Direct booking note */}
            <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-border text-center">
              <p className="text-xs md:text-sm text-muted-foreground">
                Réservation sécurisée • Confirmation immédiate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
