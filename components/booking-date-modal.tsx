"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X, Calendar, Users, ShieldCheck, Sparkles, Gift, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BookingDateModalProps {
  isOpen: boolean
  onClose: () => void
  defaultCheckIn?: string
  defaultCheckOut?: string
  defaultAdults?: number
}

export function BookingDateModal({
  isOpen,
  onClose,
  defaultCheckIn = "",
  defaultCheckOut = "",
  defaultAdults = 2,
}: BookingDateModalProps) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState(defaultCheckIn)
  const [checkOut, setCheckOut] = useState(defaultCheckOut)
  const [adults, setAdults] = useState(defaultAdults)
  const [error, setError] = useState("")

  // Calculate nights
  const nights = checkIn && checkOut 
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
    : 0

  // Update state when defaults change
  useEffect(() => {
    if (defaultCheckIn) setCheckIn(defaultCheckIn)
    if (defaultCheckOut) setCheckOut(defaultCheckOut)
    if (defaultAdults) setAdults(defaultAdults)
  }, [defaultCheckIn, defaultCheckOut, defaultAdults])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!checkIn || !checkOut) {
      setError("Veuillez sélectionner vos dates d'arrivée et de départ.")
      return
    }

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    if (checkOutDate <= checkInDate) {
      setError("La date de départ doit être après la date d'arrivée.")
      return
    }

    onClose()
    router.push(`/comparer?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}`)
  }

  const today = new Date().toISOString().split("T")[0]
  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split("T")[0]
    : today

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
        <div
          className={cn(
            "bg-card w-full max-w-lg pointer-events-auto shadow-2xl overflow-hidden",
            "max-h-[90vh] overflow-y-auto",
            "animate-in fade-in-0 zoom-in-95 duration-300"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Premium Header with Logo */}
          <div className="bg-primary text-primary-foreground px-6 py-5 relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 relative flex-shrink-0">
                <Image
                  src="/images/logo-ayadina-white.png"
                  alt="Riad Ayadina"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="font-serif text-xl md:text-2xl">
                  Réservez en direct
                </h2>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                  ))}
                  <span className="text-xs text-primary-foreground/60 ml-1.5">Riad Ayadina & Spa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Date inputs in elegant boxes */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-secondary/50 border border-border/50 p-4">
                <label className="block text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                  Arrivée
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={today}
                    className="flex-1 bg-transparent text-foreground text-sm focus:outline-none cursor-pointer"
                    required
                  />
                </div>
              </div>
              <div className="bg-secondary/50 border border-border/50 p-4">
                <label className="block text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                  Départ
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={minCheckOut}
                    className="flex-1 bg-transparent text-foreground text-sm focus:outline-none cursor-pointer"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Adults and Nights summary */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-secondary/50 border border-border/50 p-4">
                <label className="block text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                  Voyageurs
                </label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="flex-1 bg-transparent text-foreground text-sm focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value={1}>1 personne</option>
                    <option value={2}>2 personnes</option>
                    <option value={3}>3 personnes</option>
                    <option value={4}>4 personnes</option>
                  </select>
                </div>
              </div>
              {nights > 0 && (
                <div className="bg-accent/10 border border-accent/30 p-4 flex items-center justify-center">
                  <span className="font-serif text-2xl text-accent">{nights}</span>
                  <span className="text-sm text-muted-foreground ml-2">nuit{nights > 1 ? "s" : ""}</span>
                </div>
              )}
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-2 border border-red-200 mb-4">
                {error}
              </p>
            )}

            {/* Benefit row */}
            <div className="border-t border-b border-border py-4 mb-6">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  <span className="text-[10px] text-muted-foreground">Annulation flexible</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="text-[10px] text-muted-foreground">Sans prépaiement</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Gift className="h-4 w-4 text-accent" />
                  <span className="text-[10px] text-muted-foreground">Avantages 2+ nuits</span>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-none py-6 text-base tracking-wide group"
            >
              Comparer les tarifs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Trust text */}
            <p className="text-[10px] text-center text-muted-foreground mt-4">
              Nous comparons le tarif direct avec Google Hotels, puis vous réservez sur le site officiel sécurisé.
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
