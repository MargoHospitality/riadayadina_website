"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="le-riad" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Grid */}
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/hero-patio.jpg"
                  alt="Patio central du Riad Ayadina"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/breakfast-moroccan.jpg"
                  alt="Petit-déjeuner marocain"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
            <div className="pt-8 space-y-4">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/hammam-spa.jpg"
                  alt="Hammam et Spa"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/rooftop-terrace.jpg"
                  alt="Terrasse panoramique"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-primary/30 -z-10" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">
              Bienvenue au Riad Ayadina
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              1200m² de sérénité
              <br />
              <span className="italic font-light text-primary">au cœur de la médina</span>
            </h2>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Adossé aux remparts de la médina nord, à 10 minutes à pied des Jardins Majorelle, le Riad Ayadina vous accueille dans un univers d&apos;exception. Accessible en voiture jusqu&apos;à la porte, notre demeure de 1200m² déploie trois patios majestueux autour de neuf chambres uniques.
              </p>
              <p>
                Piscine chauffée sur terrasse solarium avec vue sur l&apos;Atlas, spa de 250m² avec hammam, sauna et jacuzzi, restaurant avec licence alcool - une rareté en médina. Chaque détail a été pensé pour votre confort et votre plaisir.
              </p>
              <p>
                Que vous veniez pour une escapade romantique, un événement privatisé ou simplement pour vous ressourcer, notre équipe se dévoue pour faire de votre séjour un moment inoubliable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="rounded-none px-8 py-6 text-base tracking-wide"
              >
                <Link href="#chambres">
                  Nos chambres & suites
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none px-8 py-6 text-base tracking-wide border-foreground/20 hover:bg-foreground/5"
              >
                <Link href="#spa">
                  Découvrir le Spa
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
