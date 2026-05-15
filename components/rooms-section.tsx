"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { getLocalizedPath, type Locale } from "@/lib/i18n/routing"

const roomsByLocale = {
  fr: [
    {
      name: "Chambres Doubles Supérieures",
      ambiance: "Cocon intime et raffiné",
      description: "Trois alcôves de charme, chacune décorée avec soin. Parfaites pour une escapade romantique ou un voyageur solo en quête de tranquillité.",
      image: "/images/ayadina-home/adelina-chambre-04.jpg",
      objectPosition: "50% 50%",
      size: "17 à 22 m²",
      capacity: "2 personnes",
      forWho: "Couples · Solo",
      count: 3,
      countLabel: "chambres",
    },
    {
      name: "Suites Junior",
      ambiance: "Espace et lumière",
      description: "Six suites généreuses avec salon privatif. L'espace idéal pour savourer pleinement l'atmosphère du riad, entre repos et moments de vie.",
      image: "/images/ayadina-home/ambrosia-chambre-06.jpg",
      objectPosition: "55% 50%",
      size: "24 à 36 m²",
      capacity: "2-3 personnes",
      forWho: "Couples · Familles · Séjours longs",
      count: 6,
      countLabel: "suites",
    },
  ],
  en: [
    {
      name: "Superior Double Rooms",
      ambiance: "Intimate and refined cocoons",
      description: "Three charming rooms, each with its own character. Ideal for a romantic escape or a solo stay in search of calm.",
      image: "/images/ayadina-home/adelina-chambre-04.jpg",
      objectPosition: "50% 50%",
      size: "17 to 22 m²",
      capacity: "2 guests",
      forWho: "Couples · Solo travellers",
      count: 3,
      countLabel: "rooms",
    },
    {
      name: "Junior Suites",
      ambiance: "Space and light",
      description: "Six generous suites with private sitting areas. A slower, roomier way to enjoy the riad atmosphere.",
      image: "/images/ayadina-home/ambrosia-chambre-06.jpg",
      objectPosition: "55% 50%",
      size: "24 to 36 m²",
      capacity: "2-3 guests",
      forWho: "Couples · Families · Longer stays",
      count: 6,
      countLabel: "suites",
    },
  ],
} as const

const copy = {
  fr: {
    eyebrow: "Chambres et suites",
    title: "9 chambres, 9 atmosphères",
    intro: "Chaque chambre porte un nom commençant par A, signature d'Ayadina. Des espaces où l'artisanat marocain dialogue avec le confort contemporain.",
    breakfast: "Petit-déjeuner inclus",
    cta: "Découvrir les chambres",
    detail: "Voir toutes nos chambres en détail",
  },
  en: {
    eyebrow: "Rooms & suites",
    title: "9 rooms, 9 atmospheres",
    intro: "Each room carries a name beginning with A, Ayadina’s signature. Moroccan craft, chosen fabrics and contemporary comfort meet in calm, personal spaces.",
    breakfast: "Breakfast included",
    cta: "Explore rooms",
    detail: "See every room in detail",
  },
} as const

export function RoomsSection({ locale = "fr" }: { locale?: Locale }) {
  const rooms = roomsByLocale[locale]
  const t = copy[locale]
  const roomsPath = getLocalizedPath("rooms", locale)

  return (
    <section id="chambres" className="py-16 md:py-24 bg-secondary/40">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-up" className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-accent text-sm uppercase tracking-[0.25em] mb-3">{t.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground">{t.intro}</p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {rooms.map((room, index) => (
            <AnimateOnScroll key={room.name} animation="fade-up" delay={index * 150}>
              <div className="group bg-card overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectPosition: room.objectPosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5">
                    <span className="text-xs uppercase tracking-wider text-foreground">{room.count} {room.countLabel}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/80 text-xs tracking-wide">{room.forWho}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">{room.name}</h3>
                    <p className="text-accent text-sm italic">{room.ambiance}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{room.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 pb-6 border-b border-border/50">
                    <span>{room.size}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{room.capacity}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{t.breakfast}</span>
                  </div>
                  <Button asChild variant="outline" className="w-full rounded-none py-5 border-foreground/15 hover:bg-foreground/5 hover:border-accent/40 transition-all">
                    <Link href={roomsPath}>{t.cta}</Link>
                  </Button>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href={roomsPath} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <span className="border-b border-transparent group-hover:border-foreground/30 transition-all">{t.detail}</span>
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
