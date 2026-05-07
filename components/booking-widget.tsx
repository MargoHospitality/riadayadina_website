"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Users, ShieldCheck, Plane, Percent } from "lucide-react"

export function BookingWidget() {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")

  return (
    <section id="booking" className="py-20 md:py-32 bg-secondary">
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
              En réservant directement sur notre site, vous bénéficiez du meilleur tarif garanti et d&apos;avantages exclusifs
            </p>
          </div>

          {/* Booking Form */}
          <div className="bg-card shadow-lg p-6 md:p-10">
            {/* Benefits reminder */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Meilleur tarif garanti</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Plane className="h-5 w-5 text-primary" />
                <span>Transfert aéroport offert</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Percent className="h-5 w-5 text-primary" />
                <span>-10% sur le Spa</span>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Check-in */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Arrivée
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Check-out */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Départ
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Voyageurs
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                    >
                      <option value="1">1 adulte</option>
                      <option value="2">2 adultes</option>
                      <option value="3">3 adultes</option>
                      <option value="4">4 adultes</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-none py-7 text-base tracking-wide"
              >
                Vérifier les disponibilités
              </Button>
            </form>

            {/* Direct booking note */}
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Réservation sécurisée • Confirmation immédiate • Support disponible 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
