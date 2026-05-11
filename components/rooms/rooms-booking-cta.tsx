"use client"

import { useState } from "react"
import { CalendarIcon, Users, Sparkles, ShieldCheck, Gift, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const benefits = [
  {
    icon: ShieldCheck,
    text: "Tarif direct Ayadina",
  },
  {
    icon: Gift,
    text: "Petit-déjeuner inclus",
  },
  {
    icon: Clock,
    text: "Contact direct",
  },
]

export function RoomsBookingCta() {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")
  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86_400_000).toISOString().split("T")[0]
    : undefined

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults: guests,
    })
    window.location.href = `/comparer?${params.toString()}`
  }

  return (
    <section id="reservation" className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Meilleures conditions en direct
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Réservez votre séjour
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Réservez directement sur notre site et bénéficiez d&apos;avantages 
              exclusifs non disponibles sur les plateformes de réservation.
            </p>
          </div>

          {/* Booking Form Card */}
          <div className="bg-card shadow-lg p-8 md:p-10">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Check-in */}
                <div>
                  <label 
                    htmlFor="checkin" 
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Arrivée
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="date"
                      id="checkin"
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value)
                        if (checkOut && checkOut <= e.target.value) setCheckOut("")
                      }}
                      className={cn(
                        "w-full pl-10 pr-4 py-3 border border-border bg-background",
                        "text-foreground placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                        "transition-colors"
                      )}
                      required
                    />
                  </div>
                </div>

                {/* Check-out */}
                <div>
                  <label 
                    htmlFor="checkout" 
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Départ
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="date"
                      id="checkout"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={minCheckOut}
                      className={cn(
                        "w-full pl-10 pr-4 py-3 border border-border bg-background",
                        "text-foreground placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                        "transition-colors"
                      )}
                      required
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label 
                    htmlFor="guests" 
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Voyageurs
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <select
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className={cn(
                        "w-full pl-10 pr-4 py-3 border border-border bg-background appearance-none",
                        "text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                        "transition-colors"
                      )}
                    >
                      <option value="1">1 adulte</option>
                      <option value="2">2 adultes</option>
                      <option value="3">3 adultes</option>
                    </select>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Prix comparés pour une chambre. Si vous voyagez à plusieurs, vous pourrez sélectionner plusieurs chambres sur notre moteur de réservation à l&apos;étape suivante.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-none py-6 text-base tracking-wide"
              >
                Vérifier les disponibilités
              </Button>
            </form>

            {/* Benefits */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex flex-wrap justify-center gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <benefit.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional info */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Besoin d&apos;aide ? Appelez-nous au{" "}
            <a 
              href="tel:+212524383881" 
              className="text-primary hover:underline"
            >
              +212 524 38 38 81
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
