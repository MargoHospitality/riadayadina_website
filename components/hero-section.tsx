"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-patio.jpg"
          alt="Patio principal du Riad Ayadina"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content - Minimal & Elegant */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Simple tagline */}
          <p className="text-white/70 text-sm uppercase tracking-[0.4em] mb-8">
            Riad Boutique & Spa — Marrakech
          </p>
          
          {/* Main title - clean & impactful */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 leading-[1.05]">
            Ayadina
          </h1>
          
          {/* Subtle descriptor */}
          <p className="text-white/80 text-lg md:text-xl font-light tracking-wide mb-12 max-w-xl mx-auto">
            1200m² de sérénité au cœur de la médina
          </p>

          {/* Single elegant CTA */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="rounded-none px-12 py-7 text-base tracking-widest uppercase bg-white text-foreground hover:bg-white/90"
            >
              <Link href="#booking">
                Réserver
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom bar - subtle info */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-20 pb-8 transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm tracking-wide">
            Transfert aéroport offert dès 2 nuitées en direct
          </p>
          <div className="flex items-center gap-8 text-white/60 text-sm">
            <span>Spa 250m²</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Piscine chauffée</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Licence alcool</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
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
