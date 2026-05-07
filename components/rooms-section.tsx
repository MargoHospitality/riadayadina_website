"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Maximize, Coffee, Wifi, Bath, Snowflake } from "lucide-react"

const rooms = [
  {
    name: "Chambre Double Supérieure",
    description: "Trois chambres élégantes de 17 à 22m² décorées avec soin : Alicia, Aïda et Adelina. Chacune offre un univers unique alliant confort moderne et artisanat marocain traditionnel.",
    image: "/images/suite-amour.jpg",
    size: "17-22",
    capacity: "2",
    features: ["Lit double", "Salle de bain privée", "Climatisation", "Wifi gratuit"],
    count: 3,
  },
  {
    name: "Suite Junior",
    description: "Six suites spacieuses de 24 à 36m² : Antinea, Antigua, Ambrosia, Atina, Ahisa et Adine. Des espaces généreux avec salon privatif pour un séjour d'exception.",
    image: "/images/suite-sultane.jpg",
    size: "24-36",
    capacity: "2-3",
    features: ["Lit king-size", "Salon privé", "Baignoire ou douche", "Climatisation"],
    count: 6,
  },
]

export function RoomsSection() {
  return (
    <section id="chambres" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">
            Chambres & Suites
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            9 chambres d&apos;exception
          </h2>
          <p className="text-muted-foreground text-lg">
            Chaque chambre porte un nom commençant par la lettre A, signature d&apos;Ayadina. Des espaces uniques alliant artisanat marocain et confort contemporain.
          </p>
        </div>

        {/* Rooms Grid - 2 columns for 2 categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="group bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Room Count Badge */}
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2">
                  <span className="block font-serif text-xl">{room.count}</span>
                  <span className="text-xs uppercase tracking-wider">{room.count > 1 ? 'chambres' : 'chambre'}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-2xl text-foreground mb-3">
                  {room.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {room.description}
                </p>

                {/* Room Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{room.capacity} pers.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="h-4 w-4" />
                    <span>{room.size}m²</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coffee className="h-4 w-4" />
                    <span>Petit-déj. inclus</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-4 w-4" />
                    <span>Wifi</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Button
                    asChild
                    className="flex-1 rounded-none py-5"
                  >
                    <Link href="#booking">
                      Vérifier les disponibilités
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-none px-4 py-5 border-foreground/20"
                  >
                    <Link href="/chambres-suites">
                      Détails
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-none px-10 py-7 text-base tracking-wide border-foreground/20 hover:bg-foreground/5"
          >
            <Link href="/nos-chambres">
              Voir toutes nos suites
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
