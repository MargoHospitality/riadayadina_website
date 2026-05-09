"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useBookingModal } from "@/components/booking-modal-provider"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { openBookingModal } = useBookingModal()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-[85vh] md:h-screen min-h-[550px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/ayadina-home/patio-jour-04.jpg"
          alt="Patio principal du Riad Ayadina"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ objectPosition: "50% 45%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
      </div>

      {/* Content - Minimal & Elegant */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Simple tagline */}
          <p className="text-white/70 text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-8">
            Riad Boutique & Spa — Marrakech
          </p>
          
          {/* Main title - clean & impactful */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-4 md:mb-6 leading-[1.05]">
            Riad Ayadina
          </h1>
          
          {/* Subtle descriptor */}
          <p className="text-white/80 text-base md:text-xl font-light tracking-wide mb-6 md:mb-12 max-w-xl mx-auto">
            1200m² de sérénité au cœur de la médina
          </p>

          {/* CTA premium */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              onClick={() => openBookingModal()}
              size="lg"
              className="rounded-none px-8 md:px-12 py-5 md:py-7 text-sm md:text-base tracking-widest uppercase bg-white text-foreground hover:bg-white/90"
            >
              Réserver en direct
            </Button>
            
            {/* Reassurance line */}
            <p className="text-white/60 text-xs md:text-sm mt-4 md:mt-6 tracking-wide px-4">
              Meilleur tarif garanti · Transfert offert dès 2 nuitées
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar - subtle amenities */}
      <div 
        className={`absolute bottom-0 left-0 right-0 py-3 md:py-6 transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-4 md:gap-12 text-white/50 text-[10px] md:text-sm tracking-wider uppercase">
            <span>Spa 250m²</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Piscine chauffée</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/30" />
            <span className="hidden md:inline">Restaurant & Bar</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div 
        className={`hidden md:block absolute bottom-24 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronDown className="h-6 w-6 text-white/50 animate-bounce" />
      </div>
    </section>
  )
}
