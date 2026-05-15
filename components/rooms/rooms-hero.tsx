import Image from "next/image"
import type { Locale } from "@/lib/i18n/routing"

const copy = {
  fr: {
    alt: "Chambre Adelina du Riad Ayadina",
    eyebrow: "Nos hébergements",
    title: "Chambres et suites",
    text: "Neuf chambres, chacune nommée d’un A. Zellige, bois peint, tissus choisis : l’artisanat marocain y trouve un confort simple et actuel.",
  },
  en: {
    alt: "Adelina room at Riad Ayadina",
    eyebrow: "Our accommodation",
    title: "Rooms & suites",
    text: "Nine rooms, each named with an A. Zellige, painted wood and carefully chosen fabrics bring Moroccan craft into simple, contemporary comfort.",
  },
} as const

export function RoomsHero({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale]

  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/ayadina/rooms-hero-adelina-chambre-04.jpg"
          alt={t.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ objectPosition: "50% 48%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="text-white/80 text-sm uppercase tracking-[0.3em] mb-4">{t.eyebrow}</p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance">{t.title}</h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto text-pretty">{t.text}</p>
      </div>
    </section>
  )
}
