"use client"

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

export default function LeRiadPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero - Pool focus */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end">
          <div className="absolute inset-0">
            <Image
              src="/images/piscine-rooftop.jpg"
              alt="Piscine chauffée sur le toit avec vue sur l'Atlas"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <div className="relative z-10 container mx-auto px-4 pb-16">
            <p className="text-white/80 text-sm uppercase tracking-[0.2em] mb-4">
              Bienvenue à Ayadina
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 max-w-3xl">
              Un riad d&apos;exception au cœur de la médina
            </h1>
            <p className="text-white/90 text-lg max-w-xl">
              1200m² de sérénité adossés aux remparts de Marrakech
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
                <span className="text-sm uppercase tracking-wider text-primary-foreground/70">chambres uniques</span>
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
                    Perchée sur le toit du riad, notre piscine de 7m x 3m vous offre un panorama 
                    exceptionnel sur les montagnes de l&apos;Atlas et les toits de la médina. 
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
                    src="/images/piscine-rooftop.jpg"
                    alt="Piscine chauffée sur le toit"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 shadow-xl hidden md:block">
                  <span className="block font-serif text-3xl">7x3m</span>
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
                    src="/images/patio-arbore.jpg"
                    alt="Patio arboré du riad"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
                  Trois patios, trois ambiances
                </h2>
                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>
                    Le riad s&apos;organise autour de trois patios luxuriants, véritables poumons 
                    verts au cœur de la demeure. Orangers, bougainvilliers et jasmin embaument 
                    l&apos;air et créent une atmosphère de jardin secret.
                  </p>
                  <p>
                    Chaque patio a sa personnalité : l&apos;un invite à la lecture à l&apos;ombre 
                    des arbres, l&apos;autre accueille vos petits-déjeuners au soleil, 
                    le troisième offre un coin de fraîcheur pour le thé de l&apos;après-midi.
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
                    Fini les longues marches dans les ruelles avec vos valises. Un parking 
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
                  src="/images/acces-voiture.jpg"
                  alt="Entrée du riad accessible en voiture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
                Jusqu&apos;à 18 convives hébergés et capacité événementielle modulable.
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
                  <p className="text-sm text-primary-foreground/70">18 personnes</p>
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
