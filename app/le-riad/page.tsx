import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingWidget } from "@/components/booking-widget"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Button } from "@/components/ui/button"
import {
  Waves,
  Mountain,
  Car,
  TreePalm,
  Users,
  Building2,
  Sun,
  Utensils,
  Phone,
  MapPin,
  ThermometerSun
} from "lucide-react"

export const metadata: Metadata = {
  title: "Le Riad Ayadina | Riad avec piscine à Marrakech",
  description:
    "Découvrez le Riad Ayadina, maison de 1 200 m² dans la médina de Marrakech avec trois patios, piscine chauffée sur le toit, accès voiture et vue sur l’Atlas.",
  alternates: {
    canonical: "/le-riad",
  },
  openGraph: {
    title: "Le Riad Ayadina | Riad avec piscine à Marrakech",
    description:
      "Trois patios, une piscine chauffée sur le toit, un accès voiture rare en médina et le calme d’une maison marocaine.",
    url: "/le-riad",
  },
}

export default function LeRiadPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero - Pool focus */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end">
          <div className="absolute inset-0">
            <Image
              src="/images/ayadina/patio-jour-01.jpg"
              alt="Patio du Riad Ayadina"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              style={{ objectPosition: "50% 46%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <div className="relative z-10 container mx-auto px-4 pb-16">
            <p className="text-white/80 text-sm uppercase tracking-[0.2em] mb-4">
              Bienvenue à Ayadina
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 max-w-3xl">
              Un grand riad paisible au cœur de la médina
            </h1>
            <p className="text-white/90 text-lg max-w-xl">
              1 200 m² de calme, adossés aux remparts de Marrakech
            </p>
          </div>
        </section>

        {/* Key figures */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <span className="block font-serif text-4xl md:text-5xl mb-2">1200</span>
                <span className="text-sm uppercase tracking-wider text-primary-foreground/70">m² de propriété</span>
              </div>
              <div>
                <span className="block font-serif text-4xl md:text-5xl mb-2">3</span>
                <span className="text-sm uppercase tracking-wider text-primary-foreground/70">patios arborés</span>
              </div>
              <div>
                <span className="block font-serif text-4xl md:text-5xl mb-2">9</span>
                <span className="text-sm uppercase tracking-wider text-primary-foreground/70">chambres singulières</span>
              </div>
              <div>
                <span className="block font-serif text-4xl md:text-5xl mb-2">250</span>
                <span className="text-sm uppercase tracking-wider text-primary-foreground/70">m² de spa</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pool & Terrace - Main feature */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Waves className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Terrasse Solarium
                  </p>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  Une piscine chauffée avec vue sur l&apos;Atlas
                </h2>
                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>
                    Perchée sur le toit du riad, notre piscine de 7 m x 3 m vous offre un panorama
                    ouvert sur les montagnes de l&apos;Atlas et les toits de la médina.
                    Chauffée toute l&apos;année, elle vous invite à la détente quelle que soit la saison.
                  </p>
                  <p>
                    Le jet de massage intégré soulage vos tensions tandis que vous contemplez
                    le coucher de soleil sur Marrakech. Un moment suspendu, loin de l&apos;effervescence
                    des souks.
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <ThermometerSun className="h-5 w-5 text-primary" />
                    <span className="text-sm">Chauffée toute l&apos;année</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mountain className="h-5 w-5 text-primary" />
                    <span className="text-sm">Vue Atlas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Waves className="h-5 w-5 text-primary" />
                    <span className="text-sm">Jet de massage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Utensils className="h-5 w-5 text-primary" />
                    <span className="text-sm">Service restauration</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/images/ayadina/piscine-jour-01.jpg"
                    alt="Piscine chauffée sur le toit"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{ objectPosition: "45% 50%" }}
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 shadow-xl hidden md:block">
                  <span className="block font-serif text-3xl">7 x 3 m</span>
                  <span className="text-sm">Piscine chauffée</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Patios */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image first on desktop */}
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/images/ayadina/patio-tableolivier-jour-01.jpg"
                    alt="Architecture intérieure et patio du riad"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{ objectPosition: "50% 50%" }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TreePalm className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Architecture
                  </p>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  Trois patios, trois atmosphères
                </h2>
                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>
                    Le riad s&apos;articule autour de trois patios luxuriants. L&apos;eau murmure dans
                    les fontaines, le soleil joue sur les zelliges centenaires, les orangers
                    embaument l&apos;air de leur parfum délicat. Ici, les heures ralentissent naturellement.
                  </p>
                  <p>
                    Le premier patio vous accueille sous les bougainvilliers pour un
                    petit-déjeuner ensoleillé. Le second, plus intime, invite à la lecture
                    à l&apos;ombre des jasmins. Le troisième, rafraîchissant, devient le refuge
                    idéal pour le thé de l&apos;après-midi.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Sun className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Petit-déjeuner servi au patio ou au bord de la piscine selon vos envies
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Car Access - Key differentiator */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Accès privilégié
                  </p>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  Arrivez en voiture jusqu&apos;à notre porte
                </h2>
                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>
                    Contrairement à la plupart des riads de la médina, Ayadina bénéficie d&apos;un
                    accès direct en voiture. Situé à seulement 10 mètres de Bab El Ayadi,
                    votre taxi vous dépose directement devant notre porte.
                  </p>
                  <p>
                    L’arrivée se fait simplement, sans traversée prolongée de la médina avec les bagages. Un parking
                    surveillé à proximité permet également de stationner votre véhicule de
                    location en toute sécurité.
                  </p>
                </div>

                {/* Location info */}
                <div className="bg-muted/50 p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">35 Zaouia El Abassia</p>
                      <p className="text-sm text-muted-foreground">
                        Kaa El Machraa, Bab El Khemis - Médina Nord
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    10 min à pied des Jardins Majorelle
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/ayadina/cactus-01.jpg"
                  alt="Accès privilégié au Riad Ayadina"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectPosition: "50% 52%" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Privatization */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Privatisez le riad pour votre événement
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Mariages, anniversaires, réunions d&apos;entreprise ou retrouvailles entre amis...
                Ayadina se privatise entièrement pour accueillir vos moments les plus précieux.
                Jusqu&apos;à 21 convives hébergés et une configuration adaptée à votre réception.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-primary-foreground/10 p-6">
                  <Building2 className="h-6 w-6 mx-auto mb-3" />
                  <p className="font-medium">Salle de réunion</p>
                  <p className="text-sm text-primary-foreground/70">15 personnes</p>
                </div>
                <div className="bg-primary-foreground/10 p-6">
                  <Users className="h-6 w-6 mx-auto mb-3" />
                  <p className="font-medium">Capacité hébergement</p>
                  <p className="text-sm text-primary-foreground/70">21 personnes</p>
                </div>
                <div className="bg-primary-foreground/10 p-6">
                  <Utensils className="h-6 w-6 mx-auto mb-3" />
                  <p className="font-medium">Événements</p>
                  <p className="text-sm text-primary-foreground/70">Sur mesure</p>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="rounded-none px-10 py-7 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <a href="tel:+212524383881">
                  <Phone className="h-5 w-5 mr-2" />
                  Nous contacter pour un événement
                </a>
              </Button>
            </div>
          </div>
        </section>

        <BookingWidget />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
