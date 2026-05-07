import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Download, 
  Phone, 
  Droplets, 
  Sparkles, 
  Heart,
  Clock,
  Users,
  Leaf
} from "lucide-react"

export const metadata = {
  title: "Spa & Bien-être | Riad Ayadina & Spa",
  description: "Les Bains d'Ayadina : 250m² dédiés à votre bien-être. Hammam traditionnel, massages, soins du visage et du corps au cœur de la médina de Marrakech.",
}

const spaHighlights = [
  {
    icon: Droplets,
    title: "Hammam Traditionnel",
    description: "Rituel ancestral au savon noir et gant kessa"
  },
  {
    icon: Sparkles,
    title: "Soins Signature",
    description: "Rituels exclusifs aux produits marocains"
  },
  {
    icon: Heart,
    title: "Massages",
    description: "Relaxants, tonifiants ou à la bougie"
  },
  {
    icon: Leaf,
    title: "Soins Visage",
    description: "Par Natus Marrakech, cosmétique naturelle"
  },
]

const rituals = [
  {
    name: "Escapade Marocaine",
    duration: "90 min",
    description: "Gommage traditionnel au hammam suivi d'un massage relaxant de 60 minutes. L'essentiel du bien-être marocain.",
    forTwo: true,
  },
  {
    name: "Rituel Sultan",
    duration: "120 min",
    description: "Gommage Sultan au romarin, enveloppement au ghassoul et lavande, massage à la bougie verveine, thé à la menthe.",
    forTwo: true,
  },
  {
    name: "Rituel Visage & Corps",
    duration: "120 min",
    description: "L'expérience complète : gommage au hammam, massage 60 minutes et soin du visage Natus 30 minutes.",
    forTwo: true,
  },
]

export default function SpaPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/spa-massage.jpg"
              alt="Massage relaxant au Spa Ayadina"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </div>
          <div className="relative z-10 text-center px-4">
            <p className="text-white/80 text-sm uppercase tracking-[0.3em] mb-4">
              Les Bains d&apos;Ayadina
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Spa & Bien-être
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              250m² dédiés à votre sérénité
            </p>
          </div>
        </section>

        {/* Intro + Highlights */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Un sanctuaire de bien-être
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Au cœur du Riad Ayadina, découvrez un espace entièrement dédié à la détente 
                et au ressourcement. Notre spa de 250m² perpétue les rituels ancestraux 
                du hammam marocain, sublimés par des soins contemporains aux produits naturels.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {spaHighlights.map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 border border-primary/20 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hammam Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div>
                <p className="text-primary-foreground/60 text-sm uppercase tracking-[0.2em] mb-4">
                  Tradition ancestrale
                </p>
                <h2 className="font-serif text-3xl md:text-4xl mb-6">
                  Le Hammam
                </h2>
                <div className="space-y-4 text-primary-foreground/80 mb-8">
                  <p>
                    Vivez l&apos;authentique rituel du hammam marocain dans notre espace dédié. 
                    Le savon noir enrichi aux huiles essentielles prépare votre peau, 
                    le gant kessa exfolie en douceur, l&apos;enveloppement au ghassoul purifie en profondeur.
                  </p>
                  <p>
                    Nos thérapeutes perpétuent les gestes transmis de génération en génération, 
                    pour une expérience qui va bien au-delà du simple soin : un voyage sensoriel 
                    aux parfums de rose, de romarin et de lavande.
                  </p>
                </div>

                {/* Gommages */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/10">
                    <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Gommage Traditionnel</p>
                      <p className="text-sm text-primary-foreground/70">
                        Savon noir, gant kessa, ghassoul à l&apos;eau de rose, shampoing aux œufs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/10">
                    <Sparkles className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Gommage Sultan</p>
                      <p className="text-sm text-primary-foreground/70">
                        Savon noir au romarin, ghassoul à la lavande, hydratation à l&apos;huile d&apos;amande douce
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/spa-hammam.jpg"
                  alt="Hammam traditionnel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Rituals Section */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">
                Expériences signature
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Nos Rituels
              </h2>
              <p className="text-muted-foreground text-lg">
                Des parcours de soins complets, pensés pour une immersion totale. 
                Chaque rituel peut être vécu seul ou en duo.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {rituals.map((ritual, index) => (
                <div 
                  key={index} 
                  className="bg-card p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{ritual.duration}</span>
                    {ritual.forTwo && (
                      <>
                        <Users className="h-4 w-4 text-primary ml-2" />
                        <span className="text-sm text-muted-foreground">Solo ou Duo</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{ritual.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {ritual.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="aspect-[4/3] relative order-2 lg:order-1">
                <Image
                  src="/images/hammam-spa.jpg"
                  alt="Soins esthétiques"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">
                  Beauté & Esthétique
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  Soins complémentaires
                </h2>
                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>
                    Complétez votre expérience bien-être par nos soins esthétiques : 
                    manucure et pédicure orientales, épilations, soins du visage par 
                    Natus Marrakech avec des produits 100% naturels et locaux.
                  </p>
                  <p>
                    Nos soins du visage utilisent les trésors de la nature marocaine : 
                    huile d&apos;argan, eau de rose, miel... Pour une peau éclatante et ressourcée.
                  </p>
                </div>

                {/* Services list */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Manucure orientale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Pédicure orientale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Soins visage Natus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Épilations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Massage relaxant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Massage à la bougie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Download & Reservation */}
        <section className="py-20 md:py-28 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Réservez votre moment de détente
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Nous vous recommandons de réserver vos soins 24 heures à l&apos;avance 
                auprès de la réception pour garantir votre créneau.
              </p>

              {/* Download Card */}
              <div className="bg-card p-8 shadow-sm mb-8">
                <Download className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-2">
                  Notre carte des soins
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Découvrez l&apos;ensemble de nos soins, rituels et tarifs
                </p>
                <Button 
                  asChild
                  variant="outline" 
                  className="rounded-none px-8 py-5"
                >
                  <a href="/documents/carte-spa-ayadina.pdf" download>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger la carte du Spa (PDF)
                  </a>
                </Button>
              </div>

              {/* Contact */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="rounded-none px-8 py-6 text-base">
                  <a href="tel:+212524383881">
                    <Phone className="h-4 w-4 mr-2" />
                    +212 524 38 38 81
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="rounded-none px-8 py-6 text-base border-primary/20"
                >
                  <a 
                    href="https://wa.me/212524383881?text=Bonjour, je souhaiterais réserver un soin au spa."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Réserver via WhatsApp
                  </a>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-8">
                Le port du maillot ou du slip est obligatoire lors des soins.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
