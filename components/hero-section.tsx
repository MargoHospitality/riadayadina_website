"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useBookingModal } from "@/components/booking-modal-provider"
import type { Locale } from "@/lib/i18n/routing"
import { ChevronDown } from "lucide-react"

const copy = {
  fr: {
    imageAlt: "Patio principal du Riad Ayadina",
    eyebrow: "Riad boutique et spa à Marrakech",
    subtitle: "1 200 m² de calme au cœur de la médina",
    cta: "Réserver en direct",
    reassurance: "Confirmation rapide · Cocktail de bienvenue · Privilèges dès 2 nuits",
    amenities: ["Spa 250 m²", "Piscine chauffée", "Restaurant et bar"],
  },
  en: {
    imageAlt: "Main patio at Riad Ayadina",
    eyebrow: "Boutique riad and spa in Marrakech",
    subtitle: "1,200 m² of calm in the heart of the Medina",
    cta: "Book direct",
    reassurance: "Fast confirmation · Welcome cocktail · Privileges from 2 nights",
    amenities: ["250 m² spa", "Heated pool", "Restaurant and licensed bar"],
  },
} as const

export function HeroSection({ locale = "fr" }: { locale?: Locale }) {
  const [isVisible, setIsVisible] = useState(false)
  const { openBookingModal } = useBookingModal()
  const t = copy[locale]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/ayadina-home/patio-jour-04.jpg"
          alt={t.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ objectPosition: "50% 45%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white/70 text-sm uppercase tracking-[0.4em] mb-8">
            {t.eyebrow}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 leading-[1.05]">
            Riad Ayadina
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light tracking-wide mb-12 max-w-xl mx-auto">
            {t.subtitle}
          </p>

          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              onClick={() => openBookingModal()}
              size="lg"
              className="rounded-none px-12 py-7 text-base tracking-widest uppercase bg-white text-foreground hover:bg-white/90"
            >
              {t.cta}
            </Button>
            <p className="text-white/60 text-sm mt-6 tracking-wide">
              {t.reassurance}
            </p>
          </div>
        </div>
      </div>

      <div 
        className={`absolute bottom-0 left-0 right-0 py-6 transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-6 md:gap-12 text-white/50 text-xs md:text-sm tracking-wider uppercase">
            <span>{t.amenities[0]}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{t.amenities[1]}</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/30" />
            <span className="hidden md:inline">{t.amenities[2]}</span>
          </div>
        </div>
      </div>

      <div 
        className={`absolute bottom-24 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronDown className="h-6 w-6 text-white/50 animate-bounce" />
      </div>
    </section>
  )
}
