"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  Wine, 
  UtensilsCrossed, 
  Sparkles, 
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  Download,
  GlassWater,
  Cigarette
} from "lucide-react"

export default function RestaurantPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/restaurant-terrasse.jpg"
              alt="Restaurant terrasse Riad Ayadina"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Restaurant & Bar
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Une expérience gastronomique unique au cœur de la médina
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/60" />
          </div>
        </section>

        {/* Restaurant Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <UtensilsCrossed className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Gastronomie
                  </span>
                </div>
                
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  Cuisine franco-marocaine
                  <br />
                  <span className="text-primary italic">d&apos;exception</span>
                </h2>
                
                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>
                    Notre chef vous invite à un voyage culinaire entre la France et le Maroc. 
                    Des tajines mijotés aux saveurs ancestrales - poulet aux olives et citron confit, 
                    agneau aux pruneaux et amandes - aux classiques français comme l&apos;entrecôte 
                    sauce au poivre ou le pavé de saumon béarnaise.
                  </p>
                  <p>
                    Couscous royal servi le vendredi, pastilla croustillante au safran, 
                    gambas grillées au citron... Chaque plat raconte une histoire, 
                    préparé avec des produits frais du marché et le savoir-faire de notre équipe.
                  </p>
                </div>

                {/* Service Info */}
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Service</p>
                      <p className="font-medium text-foreground">12h - 15h / 19h - 22h30</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Lieu</p>
                      <p className="font-medium text-foreground">Terrasse rooftop & Patios</p>
                    </div>
                  </div>
                </div>

                <Button asChild className="rounded-none px-8 py-6">
                  <a href="/menus/carte-restaurant-2025.pdf" download>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger la carte
                  </a>
                </Button>
              </div>

              {/* Image */}
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/plat-tajine.jpg"
                  alt="Tajine traditionnel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bar Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <div className="relative order-2 lg:order-1">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/images/bar-lounge.jpg"
                    alt="Bar lounge du Riad Ayadina"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-6 py-3 shadow-xl">
                  <span className="text-sm font-medium uppercase tracking-wider">Licence Alcool</span>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-foreground/10 flex items-center justify-center">
                    <Wine className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-sm uppercase tracking-[0.2em] text-primary-foreground/70">
                    Bar & Lounge
                  </span>
                </div>
                
                <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-6">
                  Un privilège rare
                  <br />
                  <span className="text-accent italic">en médina</span>
                </h2>
                
                <div className="space-y-4 text-primary-foreground/80 mb-8">
                  <p>
                    Ayadina fait partie des très rares établissements de la médina à détenir 
                    une licence alcool. Un privilège qui vous permet de profiter d&apos;un 
                    apéritif au coucher du soleil sur notre terrasse, avec vue sur les toits 
                    de Marrakech et l&apos;Atlas en toile de fond.
                  </p>
                  <p>
                    Vins marocains des terroirs de Meknès et Boulaouane, champagnes Mumm et 
                    Veuve Clicquot, cocktails signature - du Mojito classique au Spritz rafraîchissant - 
                    whisky, cognac et une sélection de cigares cubains pour les amateurs.
                  </p>
                </div>

                {/* Offerings */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-primary-foreground/5 border border-primary-foreground/10">
                    <Wine className="h-5 w-5 text-accent flex-shrink-0" />
                    <div>
                      <span className="block text-primary-foreground font-medium">Cave à vins</span>
                      <span className="text-sm text-primary-foreground/60">Blancs, rosés, rouges - Maroc & France</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-primary-foreground/5 border border-primary-foreground/10">
                    <GlassWater className="h-5 w-5 text-accent flex-shrink-0" />
                    <div>
                      <span className="block text-primary-foreground font-medium">Cocktails & Mocktails</span>
                      <span className="text-sm text-primary-foreground/60">Créations maison & grands classiques</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-primary-foreground/5 border border-primary-foreground/10">
                    <Cigarette className="h-5 w-5 text-accent flex-shrink-0" />
                    <div>
                      <span className="block text-primary-foreground font-medium">Cave à cigares</span>
                      <span className="text-sm text-primary-foreground/60">Sélection cubaine & dominicaine</span>
                    </div>
                  </div>
                </div>

                <Button 
                  asChild 
                  className="rounded-none px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <a href="/menus/carte-vins-cocktails-2025.pdf" download>
                    <Download className="h-4 w-4 mr-2" />
                    Carte des vins & cocktails
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Réservez votre table
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Notre restaurant est ouvert aux clients du riad et aux visiteurs extérieurs. 
                Réservation conseillée pour le dîner et les événements privatisés.
              </p>

              {/* Info cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="bg-card p-5 text-center">
                  <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Déjeuner 12h-15h</p>
                  <p className="text-sm text-muted-foreground">Dîner 19h-22h30</p>
                </div>
                <div className="bg-card p-5 text-center">
                  <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Terrasse rooftop</p>
                  <p className="text-sm text-muted-foreground">Vue sur l&apos;Atlas</p>
                </div>
                <div className="bg-card p-5 text-center">
                  <Sparkles className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Privatisation</p>
                  <p className="text-sm text-muted-foreground">Événements & groupes</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-none px-10 py-6">
                  <a 
                    href="https://wa.me/212524383881?text=Bonjour, je souhaiterais réserver une table au restaurant."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Réserver une table
                  </a>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="rounded-none px-10 py-6"
                >
                  <Link href="/#booking">
                    Réserver en direct
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                WhatsApp disponible sur ce numéro
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
