import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingWidget } from "@/components/booking-widget"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Button } from "@/components/ui/button"
import { createPageMetadata } from "@/lib/i18n/metadata"
import { Waves, Mountain, Car, TreePalm, Users, Building2, Sun, Utensils, Phone, MapPin, ThermometerSun } from "lucide-react"

export const metadata: Metadata = createPageMetadata("riad", "en")

export default function EnglishRiadPage() {
  return (
    <>
      <Header locale="en" />
      <main>
        <section className="relative h-[70vh] min-h-[500px] flex items-end">
          <div className="absolute inset-0">
            <Image src="/images/ayadina/patio-jour-01.jpg" alt="Patio at Riad Ayadina" fill className="object-cover" priority sizes="100vw" style={{ objectPosition: "50% 46%" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <div className="relative z-10 container mx-auto px-4 pb-16">
            <p className="text-white/80 text-sm uppercase tracking-[0.2em] mb-4">Welcome to Ayadina</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 max-w-3xl">A spacious, peaceful riad in the heart of the Medina</h1>
            <p className="text-white/90 text-lg max-w-xl">1,200 m² of calm against the ramparts of Marrakech</p>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div><span className="block font-serif text-3xl md:text-4xl mb-2">1200</span><span className="text-sm uppercase tracking-wider text-primary-foreground/70">m² property</span></div>
              <div><span className="block font-serif text-3xl md:text-4xl mb-2">3</span><span className="text-sm uppercase tracking-wider text-primary-foreground/70">leafy patios</span></div>
              <div><span className="block font-serif text-3xl md:text-4xl mb-2">9</span><span className="text-sm uppercase tracking-wider text-primary-foreground/70">distinct rooms</span></div>
              <div><span className="block font-serif text-3xl md:text-4xl mb-2">250</span><span className="text-sm uppercase tracking-wider text-primary-foreground/70">m² spa</span></div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><Waves className="h-6 w-6 text-primary" /></div><p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Solarium terrace</p></div>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">A heated pool with views towards the Atlas</h2>
              <div className="space-y-4 text-muted-foreground mb-8"><p>Set on the rooftop, our 7 m x 3 m pool opens onto the Atlas Mountains and the roofs of the Medina. Heated all year, it invites you to unwind in every season.</p><p>The integrated massage jet eases tired muscles while Marrakech shifts into sunset. A suspended moment, far from the energy of the souks.</p></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3"><ThermometerSun className="h-5 w-5 text-primary" /><span className="text-sm">Heated all year</span></div>
                <div className="flex items-center gap-3"><Mountain className="h-5 w-5 text-primary" /><span className="text-sm">Atlas views</span></div>
                <div className="flex items-center gap-3"><Waves className="h-5 w-5 text-primary" /><span className="text-sm">Massage jet</span></div>
                <div className="flex items-center gap-3"><Utensils className="h-5 w-5 text-primary" /><span className="text-sm">Food and drink service</span></div>
              </div>
            </div>
            <div className="relative"><div className="aspect-[4/5] relative"><Image src="/images/ayadina/piscine-jour-01.jpg" alt="Heated rooftop pool" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectPosition: "45% 50%" }} /></div><div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 shadow-xl hidden md:block"><span className="block font-serif text-2xl">7 x 3 m</span><span className="text-sm">Heated pool</span></div></div>
          </div></div>
        </section>

        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1"><div className="aspect-[4/5] relative"><Image src="/images/ayadina/patio-tableolivier-jour-01.jpg" alt="Interior architecture and patio" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /></div></div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><TreePalm className="h-6 w-6 text-primary" /></div><p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Architecture</p></div>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Three patios, three atmospheres</h2>
              <div className="space-y-4 text-muted-foreground mb-8"><p>The riad is arranged around three lush patios. Fountains murmur, sunlight plays across age-old zellige, and orange trees perfume the air. Here, the day naturally slows down.</p><p>The first patio welcomes sunny breakfasts under bougainvillea. The second, more intimate, invites reading in jasmine shade. The third becomes a cool refuge for afternoon tea.</p></div>
              <div className="flex items-center gap-3"><Sun className="h-5 w-5 text-primary" /><span className="text-muted-foreground">Breakfast served in the patio or by the pool, as you wish</span></div>
            </div>
          </div></div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><Car className="h-6 w-6 text-primary" /></div><p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Privileged access</p></div>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Arrive by car at our door</h2>
              <div className="space-y-4 text-muted-foreground mb-8"><p>Unlike most riads in the Medina, Ayadina benefits from direct car access. Just 10 metres from Bab El Ayadi, your taxi can drop you at the riad entrance.</p><p>Arrival is simple, with no long walk through the Medina carrying luggage. Guarded parking nearby also makes rental cars easy to manage.</p></div>
              <div className="bg-muted/50 p-6 space-y-3"><div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><div><p className="font-medium text-foreground">35 Zaouia El Abassia</p><p className="text-sm text-muted-foreground">Kaa El Machraa, Bab El Khemis - Northern Medina</p></div></div><p className="text-sm text-muted-foreground pl-8">10 minutes on foot from Jardin Majorelle</p></div>
            </div>
            <div className="aspect-[4/5] relative"><Image src="/images/ayadina/cactus-01.jpg" alt="Privileged access to Riad Ayadina" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectPosition: "50% 52%" }} /></div>
          </div></div>
        </section>

        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4"><div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6"><div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center"><Users className="h-6 w-6" /></div></div>
            <h2 className="font-serif text-2xl md:text-3xl mb-6">Privatise the riad for your event</h2>
            <p className="text-primary-foreground/80 text-lg mb-8">Weddings, birthdays, business meetings or reunions with friends: Ayadina can be fully privatised for your most meaningful moments, with accommodation for up to 21 guests and a layout adapted to your reception.</p>
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-primary-foreground/10 p-6"><Building2 className="h-6 w-6 mx-auto mb-3" /><p className="font-medium">Meeting room</p><p className="text-sm text-primary-foreground/70">15 people</p></div>
              <div className="bg-primary-foreground/10 p-6"><Users className="h-6 w-6 mx-auto mb-3" /><p className="font-medium">Accommodation</p><p className="text-sm text-primary-foreground/70">21 guests</p></div>
              <div className="bg-primary-foreground/10 p-6"><Utensils className="h-6 w-6 mx-auto mb-3" /><p className="font-medium">Events</p><p className="text-sm text-primary-foreground/70">Tailor-made</p></div>
            </div>
            <Button asChild size="lg" className="rounded-none px-10 py-7 bg-primary-foreground text-primary hover:bg-primary-foreground/90"><a href="tel:+212524383881"><Phone className="h-5 w-5 mr-2" />Contact us for an event</a></Button>
          </div></div>
        </section>

        <BookingWidget locale="en" />
        <TestimonialsSection locale="en" />
      </main>
      <Footer locale="en" />
    </>
  )
}
