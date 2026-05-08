"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Calendar, Users, ShieldCheck, Sparkles, Gift } from "lucide-react"
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

  // Update state when defaults change (for prefill from comparison page)
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

    // Close modal and navigate
    onClose()
    router.push(`/comparer?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}`)
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0]

  // Get minimum checkout date (day after checkin)
  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split("T")[0]
    : today

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
        <div
          className={cn(
            "bg-card w-full max-w-xl pointer-events-auto shadow-2xl",
            "max-h-[90vh] overflow-y-auto",
            // Mobile: bottom sheet style
            "md:rounded-none md:max-h-none",
            "animate-in fade-in-0 zoom-in-95 duration-300"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-start justify-between">
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-foreground">
                Préparer votre séjour
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Choisissez vos dates, nous vérifions ensuite l&apos;offre directe et les prix publics observés.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 -m-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-5">
              {/* Date inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    <Calendar className="inline h-3 w-3 mr-1.5" />
                    Arrivée
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={today}
                    className="w-full px-4 py-3 bg-secondary border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    <Calendar className="inline h-3 w-3 mr-1.5" />
                    Départ
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={minCheckOut}
                    className="w-full px-4 py-3 bg-secondary border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    required
                  />
                </div>
              </div>

              {/* Adults select */}
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  <Users className="inline h-3 w-3 mr-1.5" />
                  Voyageurs
                </label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-secondary border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none cursor-pointer"
                >
                  <option value={1}>1 adulte</option>
                  <option value={2}>2 adultes</option>
                  <option value={3}>3 adultes</option>
                  <option value={4}>4 adultes</option>
                </select>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-2 border border-red-200">
                  {error}
                </p>
              )}
            </div>

            {/* Benefit chips */}
            <div className="flex flex-wrap gap-2 mt-6 mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5">
                <ShieldCheck className="h-3 w-3 text-accent" />
                Flexible en direct
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5">
                <Sparkles className="h-3 w-3 text-accent" />
                Sans prépaiement
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5">
                <Gift className="h-3 w-3 text-accent" />
                Avantages dès 2 nuits
              </span>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-none py-6 text-base tracking-wide"
            >
              Comparer les offres directes
            </Button>

            {/* Secondary text */}
            <p className="text-xs text-center text-muted-foreground mt-4">
              Étape suivante : comparaison Google Hotels puis réservation officielle sécurisée.
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
