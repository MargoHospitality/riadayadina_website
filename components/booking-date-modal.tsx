"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import type { DateRange } from "react-day-picker"
import { enGB, fr } from "date-fns/locale"
import { X, Calendar as CalendarIcon, Users, ShieldCheck, Sparkles, Gift, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { getDictionary } from "@/lib/i18n/dictionary"
import { getBookingLanguage, getIntlLocale, type Locale } from "@/lib/i18n/routing"
import { cn } from "@/lib/utils"

interface BookingSearchSelection {
  checkIn: string
  checkOut: string
  adults: string
}

interface BookingDateModalProps {
  isOpen: boolean
  onClose: () => void
  defaultCheckIn?: string
  defaultCheckOut?: string
  defaultAdults?: number
  onSearchSubmit?: (search: BookingSearchSelection) => void
  locale?: Locale
}

function createDisplayDate(locale: Locale) {
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function parseIsoDate(value: string) {
  const [year, month, day] = value.split("-").map(Number)
  if (!year || !month || !day) return undefined
  return new Date(year, month - 1, day)
}

function formatIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatDisplayDate(value: string, locale: Locale) {
  const date = parseIsoDate(value)
  return date ? createDisplayDate(locale).format(date) : value
}

function getTodayDate() {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

export function BookingDateModal({
  isOpen,
  onClose,
  defaultCheckIn = "",
  defaultCheckOut = "",
  defaultAdults = 2,
  onSearchSubmit,
  locale = "fr",
}: BookingDateModalProps) {
  const router = useRouter()
  const pathname = usePathname()
  const dict = getDictionary(locale)
  const calendarLocale = locale === "en" ? enGB : fr
  const [checkIn, setCheckIn] = useState(defaultCheckIn)
  const [checkOut, setCheckOut] = useState(defaultCheckOut)
  const [adults, setAdults] = useState(defaultAdults)
  const [error, setError] = useState("")
  const [isNavigating, setIsNavigating] = useState(false)
  const [navigatingFromPath, setNavigatingFromPath] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const todayDate = getTodayDate()
  const [calendarMonth, setCalendarMonth] = useState(() => parseIsoDate(defaultCheckIn) || getTodayDate())
  const selectedCheckIn = checkIn ? parseIsoDate(checkIn) : undefined
  const selectedCheckOut = checkOut ? parseIsoDate(checkOut) : undefined

  const selectedRange: DateRange | undefined = selectedCheckIn
    ? { from: selectedCheckIn, to: selectedCheckOut }
    : undefined

  // Calculate nights
  const nights = selectedCheckIn && selectedCheckOut
    ? Math.ceil((selectedCheckOut.getTime() - selectedCheckIn.getTime()) / 86400000)
    : 0

  // Reset modal state from current defaults on each open to avoid stale dates.
  useEffect(() => {
    if (!isOpen) return
    setCheckIn(defaultCheckIn)
    setCheckOut(defaultCheckOut)
    setAdults(defaultAdults)
    setCalendarMonth(parseIsoDate(defaultCheckIn) || getTodayDate())
    setError("")
  }, [isOpen, defaultCheckIn, defaultCheckOut, defaultAdults])

  // Prevent background interaction and restore focus when the modal closes.
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setIsNavigating(false)
      setNavigatingFromPath(null)
      document.body.style.overflow = "hidden"
      window.setTimeout(() => closeButtonRef.current?.focus(), 0)
    } else {
      document.body.style.overflow = ""
      previousFocusRef.current?.focus()
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (isNavigating && (pathname === "/comparer" || pathname === "/en/compare" || pathname === "/compare") && navigatingFromPath !== pathname) {
      onClose()
    }
  }, [isNavigating, navigatingFromPath, pathname, onClose])

  // Handle escape and keep keyboard focus inside the modal.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key !== "Tab") return

      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!checkIn || !checkOut) {
      setError(dict.booking.missingDates)
      return
    }

    const checkInDate = parseIsoDate(checkIn)
    const checkOutDate = parseIsoDate(checkOut)

    if (!checkInDate || !checkOutDate) {
      setError(dict.booking.invalidDate)
      return
    }

    if (checkOutDate <= checkInDate) {
      setError(dict.booking.checkoutAfter)
      return
    }

    const target = {
      checkIn,
      checkOut,
      adults: String(adults),
    }
    setNavigatingFromPath(pathname)
    setIsNavigating(true)

    if (onSearchSubmit) {
      onSearchSubmit(target)
      return
    }

    router.push(`${locale === "en" ? "/en/compare" : "/comparer"}?checkIn=${target.checkIn}&checkOut=${target.checkOut}&adults=${target.adults}&language=${getBookingLanguage(locale)}`)

    if (pathname === "/comparer" || pathname === "/en/compare" || pathname === "/compare") {
      window.setTimeout(onClose, 250)
    }
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setError("")

    if (!range?.from) {
      setCheckIn("")
      setCheckOut("")
      return
    }

    const nextCheckIn = formatIsoDate(range.from)
    setCheckIn(nextCheckIn)
    setCalendarMonth(range.from)

    if (range.to) {
      setCheckOut(formatIsoDate(range.to))
    } else if (checkOut && parseIsoDate(checkOut)! <= range.from) {
      setCheckOut("")
    }
  }

  const resetDates = () => {
    setError("")
    setCheckIn("")
    setCheckOut("")
    setCalendarMonth(getTodayDate())
  }

  if (!isOpen) return null

  if (isNavigating) {
    return (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-background px-6">
        <div className="max-w-xl text-center">
          <p className="mb-4 text-accent text-sm uppercase tracking-[0.25em]">{dict.booking.loadingEyebrow}</p>
          <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            {dict.booking.loadingTitle}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {dict.booking.loadingText}
          </p>
          <div className="mx-auto mb-6 h-1.5 max-w-xs overflow-hidden rounded-full bg-primary/10">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
          </div>
          <p className="text-xs text-muted-foreground">
            {dict.booking.arrival} {formatDisplayDate(checkIn, locale)} · {dict.booking.departure} {formatDisplayDate(checkOut, locale)}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[2000] transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 pointer-events-none">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          aria-describedby={error ? "booking-modal-error" : undefined}
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
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            <div>
              <h2 id="booking-modal-title" className="font-serif text-xl md:text-2xl">
                {dict.booking.title}
              </h2>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                ))}
                <span className="text-xs text-primary-foreground/60 ml-1.5">{dict.booking.hotel}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Date range calendar */}
            <div className="mb-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/50 border border-border/50 p-4">
                  <span className="block text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                    {dict.booking.arrival}
                  </span>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-accent" />
                    <span className="text-sm text-foreground">
                      {checkIn ? formatDisplayDate(checkIn, locale) : dict.booking.choose}
                    </span>
                  </div>
                </div>
                <div className="bg-secondary/50 border border-border/50 p-4">
                  <span className="block text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                    {dict.booking.departure}
                  </span>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-accent" />
                    <span className="text-sm text-foreground">
                      {checkOut ? formatDisplayDate(checkOut, locale) : dict.booking.choose}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-border/50 bg-background p-2">
                <div className="flex items-center justify-between px-2 pt-1">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {dict.booking.calendar}
                  </span>
                  {(checkIn || checkOut) && (
                    <button
                      type="button"
                      onClick={resetDates}
                      className="border border-border/70 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      {dict.booking.restart}
                    </button>
                  )}
                </div>
                <Calendar
                  mode="range"
                  min={1}
                  selected={selectedRange}
                  month={calendarMonth}
                  onMonthChange={setCalendarMonth}
                  onSelect={handleDateRangeChange}
                  disabled={{ before: todayDate }}
                  locale={calendarLocale}
                  className="mx-auto p-1 sm:p-3 [--cell-size:--spacing(9)] sm:[--cell-size:--spacing(10)]"
                  classNames={{
                    caption_label: "font-serif text-base text-foreground",
                    day: "rounded-none",
                  }}
                />
                <p className="px-2 pb-1 text-center text-[11px] text-muted-foreground">
                  {dict.booking.selectDates}
                </p>
              </div>
            </div>

            {/* Adults and Nights summary */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-secondary/50 border border-border/50 p-4">
                <label htmlFor="booking-adults" className="block text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                  {dict.booking.travelers}
                </label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  <select
                    id="booking-adults"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="flex-1 bg-transparent text-foreground text-sm focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value={1}>{`1 ${dict.booking.person}`}</option>
                    <option value={2}>{`2 ${dict.booking.people}`}</option>
                    <option value={3}>{`3 ${dict.booking.people}`}</option>
                  </select>
                </div>
              </div>
              {nights > 0 && (
                <div className="bg-accent/10 border border-accent/30 p-4 flex items-center justify-center">
                  <span className="font-serif text-2xl text-accent">{nights}</span>
                  <span className="text-sm text-muted-foreground ml-2">{nights > 1 ? dict.booking.nights : dict.booking.night}</span>
                </div>
              )}
            </div>

            <div className="mb-6 border border-accent/25 bg-accent/5 px-4 py-3">
              <div className="flex items-start gap-3">
                <span className="shrink-0 bg-accent text-accent-foreground px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider">
                  {dict.booking.oneRoom}
                </span>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {dict.booking.roomNote}
                </p>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p id="booking-modal-error" aria-live="polite" className="text-sm text-red-600 bg-red-50 px-4 py-2 border border-red-200 mb-4">
                {error}
              </p>
            )}

            {/* Benefit row */}
            <div className="border-t border-b border-border py-4 mb-6">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  <span className="text-[10px] text-muted-foreground">{dict.booking.directContact}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="text-[10px] text-muted-foreground">{locale === "en" ? "Quick confirmation" : "Confirmation rapide"}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Gift className="h-4 w-4 text-accent" />
                  <span className="text-[10px] text-muted-foreground">{locale === "en" ? "2+ night benefits" : "Avantages 2+ nuits"}</span>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-none py-6 text-base tracking-wide group"
            >
              {dict.booking.submit}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Trust text */}
            <p className="text-[10px] text-center text-muted-foreground mt-4">
              {locale === "en" ? "We compare the direct rate with Google Hotels, then you book on the secure official website." : "Nous comparons le tarif direct avec Google Hotels, puis vous réservez sur le site officiel sécurisé."}
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
