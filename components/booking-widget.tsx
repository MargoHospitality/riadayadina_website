"use client"

import { Button } from "@/components/ui/button"
import { useBookingModal } from "@/components/booking-modal-provider"
import { ShieldCheck, Plane, Percent } from "lucide-react"

export function BookingWidget() {
  const { openBookingModal } = useBookingModal()

  return (
    <section id="booking" className="py-14 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">
              Réservation directe
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Réservez votre séjour
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              En réservant directement sur notre site, vous bénéficiez du tarif officiel Ayadina et d&apos;avantages exclusifs
            </p>
          </div>

          {/* CTA Card */}
          <div className="bg-card shadow-lg p-6 md:p-10">
            {/* Benefits reminder */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Tarif direct Ayadina</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Plane className="h-5 w-5 text-primary" />
                <span>Transfert offert selon durée</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Percent className="h-5 w-5 text-primary" />
                <span>-10% sur le Spa</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => openBookingModal()}
              size="lg"
              className="w-full rounded-none py-7 text-base tracking-wide"
            >
              Réserver en direct
            </Button>

            {/* Direct booking note */}
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Réservation sécurisée • Confirmation immédiate • Contact direct avec le riad
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
