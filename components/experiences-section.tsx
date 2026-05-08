"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const experiences = [
  {
    title: "Piscine & Terrasse Solarium",
    subtitle: "Vue panoramique sur l'Atlas",
    description: "Sur le toit du riad, une piscine chauffée de 7m x 3m avec jet de massage vous attend. Transats, parasols et vue imprenable sur les montagnes de l'Atlas. Petit-déjeuner, déjeuner léger et cocktails servis au bord de l'eau.",
    image: "/images/ayadina-home/piscine-jour-01.jpg",
    objectPosition: "45% 50%",
    highlight: "Piscine chauffée",
    link: "/le-riad",
  },
  {
    title: "Les Bains d'Ayadina",
    subtitle: "Spa & Bien-être",
    description: "250m² dédiés à votre bien-être : hammam traditionnel, sauna, jacuzzi et deux salles de massage. Soins du corps, gommages au savon noir, massages relaxants à l'huile d'argan et soins esthétiques.",
    image: "/images/ayadina-home/riad-103.jpg",
    objectPosition: "55% 50%",
    highlight: "Spa de 250m²",
    link: "/spa",
  },
  {
    title: "Restaurant & Bar",
    subtitle: "Licence alcool",
    description: "Une expérience gastronomique unique en médina avec notre licence alcool. Cuisine marocaine et française raffinée, carte des vins, cocktails signature et espace cigares. Service sur la terrasse rooftop avec vue panoramique.",
    image: "/images/ayadina-home/bibliotheque-bar-jour-03.jpg",
    objectPosition: "55% 50%",
    highlight: "Licence alcool",
    link: "/restaurant",
  },
  {
    title: "Petit-déjeuner marocain",
    subtitle: "Inclus avec votre séjour",
    description: "Commencez la journée par un festin de saveurs authentiques : msemen, beghrir, crêpes mille trous, confitures maison, huile d'argan, miel, fruits frais et thé à la menthe.",
    image: "/images/ayadina-home/petitdejeuner-terrasse-02.jpg",
    objectPosition: "45% 60%",
    highlight: "Inclus",
    link: null,
  },
]

export function ExperiencesSection() {
  return (
    <section id="experiences" className="py-14 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">
            Vivez l&apos;exception
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Des expériences uniques
          </h2>
          <p className="text-muted-foreground text-lg">
            Au-delà de l&apos;hébergement, Ayadina vous propose un spa haut de gamme, un restaurant avec licence alcool et des attentions exclusives.
          </p>
        </div>

        {/* Experiences */}
        <div className="space-y-16">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative aspect-[4/3] overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectPosition: experience.objectPosition }}
                />
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
                <div className={`flex items-center gap-4 mb-4 ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
                  <span className="inline-block bg-accent/20 text-accent-foreground px-3 py-1 text-xs uppercase tracking-wider font-medium">
                    {experience.highlight}
                  </span>
                </div>
                <p className="text-sm text-primary font-medium mb-2">{experience.subtitle}</p>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                  {experience.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {experience.description}
                </p>
                {experience.link && (
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-none px-6 py-4 border-foreground/20 hover:bg-foreground/5 hover:border-accent/40 transition-all"
                  >
                    <Link href={experience.link}>
                      {experience.link === "/spa" ? "Réserver un soin" : experience.link === "/restaurant" ? "Réserver une table" : "Découvrir"}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
