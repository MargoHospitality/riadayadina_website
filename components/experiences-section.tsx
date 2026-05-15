"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getLocalizedPath, type Locale } from "@/lib/i18n/routing"

const copy = {
  fr: {
    eyebrow: "Le riad, côté détente",
    title: "Les moments qui rythment le séjour",
    intro: "Au fil du séjour : un spa de 250 m², une table franco-marocaine, un bar autorisé en médina et les attentions de la maison.",
    discover: "Découvrir",
    spaCta: "Réserver un soin",
    restaurantCta: "Réserver une table",
    experiences: [
      {
        title: "Piscine et terrasse solarium",
        subtitle: "Vue panoramique sur l'Atlas",
        description: "Sur le toit du riad, une piscine chauffée de 7 m x 3 m avec jet de massage vous attend. Transats, parasols et vue imprenable sur les montagnes de l'Atlas. Petit-déjeuner, déjeuner léger et cocktails servis au bord de l'eau.",
        image: "/images/ayadina-home/piscine-jour-01.jpg",
        objectPosition: "45% 50%",
        highlight: "Piscine chauffée",
        route: "riad" as const,
      },
      {
        title: "Les Bains d'Ayadina",
        subtitle: "Spa et bien-être",
        description: "250 m² dédiés à votre bien-être : hammam traditionnel, sauna, jacuzzi et deux salles de massage. Soins du corps, gommages au savon noir, massages relaxants à l'huile d'argan et soins esthétiques.",
        image: "/images/ayadina-home/riad-103.jpg",
        objectPosition: "55% 50%",
        highlight: "Spa de 250 m²",
        route: "spa" as const,
      },
      {
        title: "Restaurant et bar",
        subtitle: "Bar autorisé",
        description: "Une table franco-marocaine au calme de la médina, prolongée par un véritable bar pour l’apéritif ou le dernier verre. Cuisine marocaine et française soignée, carte des vins, cocktails maison et espace cigares.",
        image: "/images/ayadina-home/bibliotheque-bar-jour-03.jpg",
        objectPosition: "55% 50%",
        highlight: "Bar autorisé",
        route: "restaurant" as const,
      },
      {
        title: "Petit-déjeuner marocain",
        subtitle: "Inclus avec votre séjour",
        description: "Commencez la journée par un festin de saveurs authentiques : msemen, beghrir, crêpes mille trous, confitures maison, huile d'argan, miel, fruits frais et thé à la menthe.",
        image: "/images/ayadina-home/petitdejeuner-terrasse-02.jpg",
        objectPosition: "45% 60%",
        highlight: "Inclus",
        route: null,
      },
    ],
  },
  en: {
    eyebrow: "The relaxed side of the riad",
    title: "Moments that shape your stay",
    intro: "During your stay: a 250 m² spa, French-Moroccan dining, a rare licensed bar in the Medina and the warm attentions of the house.",
    discover: "Discover",
    spaCta: "Book a treatment",
    restaurantCta: "Book a table",
    experiences: [
      {
        title: "Pool and solarium terrace",
        subtitle: "Panoramic Atlas views",
        description: "On the rooftop, a heated 7 m x 3 m pool with massage jet awaits. Sun loungers, parasols, open Atlas views, and breakfast, light lunches or cocktails served by the water.",
        image: "/images/ayadina-home/piscine-jour-01.jpg",
        objectPosition: "45% 50%",
        highlight: "Heated pool",
        route: "riad" as const,
      },
      {
        title: "Les Bains d'Ayadina",
        subtitle: "Spa and wellbeing",
        description: "250 m² devoted to wellbeing: traditional hammam, sauna, jacuzzi and two massage rooms. Body treatments, black-soap exfoliation, argan-oil massages and beauty care.",
        image: "/images/ayadina-home/riad-103.jpg",
        objectPosition: "55% 50%",
        highlight: "250 m² spa",
        route: "spa" as const,
      },
      {
        title: "Restaurant and licensed bar",
        subtitle: "A rare licensed bar",
        description: "French-Moroccan dining in the calm of the Medina, extended by a true bar for aperitifs or a last drink. Wines, house cocktails, cigars and carefully prepared Moroccan and French classics.",
        image: "/images/ayadina-home/bibliotheque-bar-jour-03.jpg",
        objectPosition: "55% 50%",
        highlight: "Licensed bar",
        route: "restaurant" as const,
      },
      {
        title: "Moroccan breakfast",
        subtitle: "Included with your stay",
        description: "Start the day with local flavours: msemen, beghrir, homemade jams, argan oil, honey, fresh fruit and mint tea.",
        image: "/images/ayadina-home/petitdejeuner-terrasse-02.jpg",
        objectPosition: "45% 60%",
        highlight: "Included",
        route: null,
      },
    ],
  },
} as const

export function ExperiencesSection({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale]

  return (
    <section id="experiences" className="py-14 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">{t.eyebrow}</p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-6">{t.title}</h2>
          <p className="text-muted-foreground text-lg">{t.intro}</p>
        </div>

        <div className="space-y-16">
          {t.experiences.map((experience, index) => (
            <div key={experience.title} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
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

              <div className={`${index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
                <div className={`flex items-center gap-4 mb-4 ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
                  <span className="inline-block bg-accent/20 text-accent-foreground px-3 py-1 text-xs uppercase tracking-wider font-medium">{experience.highlight}</span>
                </div>
                <p className="text-sm text-primary font-medium mb-2">{experience.subtitle}</p>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4">{experience.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{experience.description}</p>
                {experience.route && (
                  <Button asChild variant="outline" className="rounded-none px-6 py-4 border-foreground/20 hover:bg-foreground/5 hover:border-accent/40 transition-all">
                    <Link href={getLocalizedPath(experience.route, locale)}>
                      {experience.route === "spa" ? t.spaCta : experience.route === "restaurant" ? t.restaurantCta : t.discover}
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
