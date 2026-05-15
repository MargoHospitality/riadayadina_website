import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { createPageMetadata } from "@/lib/i18n/metadata"
import { Droplets, Sparkles, Heart, Clock, Users, Leaf, type LucideIcon } from "lucide-react"

const SPA_MENU_URL = "/docs/brochure-spa-2025.pdf"

export const metadata: Metadata = createPageMetadata("spa", "en")

const spaHighlights = [
  { icon: Droplets, title: "Traditional hammam", description: "An ancestral ritual with black soap and kessa glove" },
  { icon: Sparkles, title: "House rituals", description: "Treatments inspired by Moroccan wellbeing rituals" },
  { icon: Heart, title: "Massages", description: "Relaxing, toning or candle massages" },
  { icon: Leaf, title: "Facials", description: "By Natus Marrakech, natural cosmetics" },
]

const rituals = [
  { name: "Moroccan Escape", duration: "90 min", description: "Traditional hammam exfoliation followed by a 60-minute relaxing massage. The essence of Moroccan wellbeing.", forTwo: true },
  { name: "Sultan Ritual", duration: "120 min", description: "Rosemary Sultan scrub, ghassoul and lavender wrap, verbena candle massage and mint tea.", forTwo: true },
  { name: "Face & Body Ritual", duration: "120 min", description: "The complete experience: hammam exfoliation, 60-minute massage and 30-minute Natus facial.", forTwo: true },
]

export default function EnglishSpaPage() {
  return (
    <>
      <Header locale="en" />
      <main>
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image src="/images/spa-massage.jpg" alt="Relaxing massage at Spa Ayadina" fill className="object-cover" priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </div>
          <div className="relative z-10 text-center px-4">
            <p className="text-white/80 text-sm uppercase tracking-[0.3em] mb-4">Les Bains d&apos;Ayadina</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">Spa, hammam and massages</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">250 m² devoted to your serenity</p>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Les Bains d’Ayadina, in the calm of the riad</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">At the heart of Riad Ayadina, discover a space entirely dedicated to rest and renewal. Our 250 m² spa continues the ancestral rituals of the Moroccan hammam, elevated by contemporary treatments with natural products.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {spaHighlights.map((item) => <Highlight key={item.title} {...item} />)}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-primary-foreground/60 text-sm uppercase tracking-[0.2em] mb-4">Ancestral tradition</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">The Hammam</h2>
              <div className="space-y-4 text-primary-foreground/80 mb-8"><p>Experience the authentic Moroccan hammam ritual in our dedicated space. Black soap enriched with essential oils prepares the skin, the kessa glove exfoliates gently, and ghassoul wraps purify deeply.</p><p>Our therapists preserve gestures passed down through generations, creating an experience that goes beyond a treatment: a sensory journey scented with rose, rosemary and lavender.</p></div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/10"><Clock className="h-5 w-5 mt-0.5 flex-shrink-0" /><div><p className="font-medium">Traditional exfoliation</p><p className="text-sm text-primary-foreground/70">Black soap, kessa glove, rose-water ghassoul and egg shampoo</p></div></div>
                <div className="flex items-start gap-4 p-4 bg-white/10"><Sparkles className="h-5 w-5 mt-0.5 flex-shrink-0" /><div><p className="font-medium">Sultan exfoliation</p><p className="text-sm text-primary-foreground/70">Rosemary black soap, lavender ghassoul and sweet almond oil hydration</p></div></div>
              </div>
            </div>
            <div className="aspect-[4/5] relative"><Image src="/images/ayadina-home/riad-103.jpg" alt="Traditional hammam" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectPosition: "55% 50%" }} /></div>
          </div></div>
        </section>

        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">House rituals</p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Our Rituals</h2>
              <p className="text-muted-foreground text-lg">Complete treatment journeys designed for total immersion. Each ritual can be enjoyed alone or as a duo.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {rituals.map((ritual) => (
                <div key={ritual.name} className="bg-card p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4"><Clock className="h-4 w-4 text-primary" /><span className="text-sm text-muted-foreground">{ritual.duration}</span>{ritual.forTwo && <><Users className="h-4 w-4 text-primary ml-2" /><span className="text-sm text-muted-foreground">Solo or duo</span></>}</div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{ritual.name}</h3><p className="text-muted-foreground text-sm leading-relaxed">{ritual.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="aspect-[4/3] relative order-2 lg:order-1"><Image src="/images/ayadina/spa-soins-complementaires.jpg" alt="Spa Ayadina treatment room" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /></div>
            <div className="order-1 lg:order-2">
              <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">Beauty and facials</p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Additional treatments</h2>
              <div className="space-y-4 text-muted-foreground mb-8"><p>Complete your wellbeing experience with oriental manicures and pedicures, waxing, and Natus Marrakech facials made with 100% natural local products.</p><p>Our facials use Moroccan natural treasures — argan oil, rose water, honey — to leave skin soft, luminous and soothed.</p></div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {["Oriental manicure", "Oriental pedicure", "Natus facials", "Waxing", "Relaxing massage", "Candle massage"].map((service) => <div key={service} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /><span>{service}</span></div>)}
              </div>
            </div>
          </div></div>
        </section>

        <section className="py-20 md:py-28 bg-accent/10">
          <div className="container mx-auto px-4"><div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Book your moment of relaxation</h2>
            <p className="text-muted-foreground text-lg mb-8">We recommend booking treatments 24 hours in advance with reception to secure your preferred time.</p>
            <div className="bg-card p-8 shadow-sm mb-8"><h3 className="font-serif text-xl text-foreground mb-2">Treatment menu</h3><p className="text-muted-foreground text-sm mb-6">Reception will confirm available treatments, durations and rates for your chosen time.</p><Button asChild variant="outline" className="rounded-none px-8 py-5"><a href={SPA_MENU_URL} target="_blank" rel="noopener noreferrer" type="application/pdf">View treatment menu PDF, 2.7 MB, new tab</a></Button></div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4"><Button asChild className="rounded-none px-8 py-6 text-base"><a href={buildWhatsAppUrl("Hello, I would like to book a spa treatment.")} target="_blank" rel="noopener noreferrer">Book a treatment</a></Button></div>
            <p className="text-sm text-muted-foreground mt-8">For your comfort, swimwear or underwear is requested during treatments.</p>
          </div></div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  )
}

function Highlight({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return <div className="text-center group"><div className="w-16 h-16 mx-auto mb-4 border border-primary/20 flex items-center justify-center group-hover:bg-primary/5 transition-colors"><Icon className="h-7 w-7 text-primary" /></div><h3 className="font-serif text-lg text-foreground mb-2">{title}</h3><p className="text-sm text-muted-foreground">{description}</p></div>
}
