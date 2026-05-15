"use client"

import { Button } from "@/components/ui/button"
import { useBookingModal } from "@/components/booking-modal-provider"
import type { Locale } from "@/lib/i18n/routing"
import { ShieldCheck, Plane, Percent, CalendarCheck, CreditCard } from "lucide-react"

const copy = {
  fr: {
    eyebrow: "Réservation directe",
    title: "Réservez votre séjour",
    intro: "En réservant directement sur notre site, vous bénéficiez du tarif officiel Ayadina et d'attentions réservées aux hôtes du site officiel",
    cta: "Réserver en direct",
    note: "Réservation sécurisée • Confirmation immédiate • Contact direct avec le riad",
    benefits: ["Tarif direct Ayadina", "Annulation flexible", "Pas de prépaiement", "Transfert offert selon durée", "-10% sur les soins spa"],
  },
  en: {
    eyebrow: "Direct booking",
    title: "Book your stay",
    intro: "Book directly on the official website for Ayadina’s direct rate and thoughtful benefits reserved for official-site guests.",
    cta: "Book direct",
    note: "Secure booking • Immediate confirmation • Direct contact with the riad",
    benefits: ["Ayadina direct rate", "Flexible cancellation", "No prepayment", "Transfer included by stay length", "10% off spa treatments"],
  },
} as const

const icons = [ShieldCheck, CalendarCheck, CreditCard, Plane, Percent]

export function BookingWidget({ locale = "fr" }: { locale?: Locale }) {
  const { openBookingModal } = useBookingModal()
  const t = copy[locale]

  return (
    <section id="booking" className="py-14 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">{t.eyebrow}</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">{t.title}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.intro}</p>
          </div>

          <div className="bg-card shadow-lg p-6 md:p-10">
            <div className="flex flex-wrap justify-center gap-6 mb-8 pb-8 border-b border-border">
              {t.benefits.map((benefit, index) => {
                const Icon = icons[index]
                return (
                  <div key={benefit} className="flex items-center gap-2 text-sm">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{benefit}</span>
                  </div>
                )
              })}
            </div>

            <Button onClick={() => openBookingModal()} size="lg" className="w-full rounded-none py-7 text-base tracking-wide">
              {t.cta}
            </Button>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">{t.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
