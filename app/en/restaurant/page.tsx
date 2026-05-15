import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BookingPopupButton } from "@/components/booking-popup-button"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { createPageMetadata } from "@/lib/i18n/metadata"
import { Wine, UtensilsCrossed, Sparkles, ChevronDown, Clock, MapPin, GlassWater, Cigarette, type LucideIcon } from "lucide-react"

const RESTAURANT_MENU_URL = "/docs/carte-menus-vins-cocktails-2025.pdf"

export const metadata: Metadata = createPageMetadata("restaurant", "en")

export default function EnglishRestaurantPage() {
  return (
    <>
      <Header locale="en" />
      <main className="bg-background">
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/restaurant-terrasse.jpg" alt="Riad Ayadina rooftop restaurant" fill className="object-cover" priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">Restaurant and bar</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">French-Moroccan dining in the calm of the Medina</p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"><ChevronDown className="h-8 w-8 text-white/60" /></div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 bg-primary/10 flex items-center justify-center"><UtensilsCrossed className="h-6 w-6 text-primary" /></div><span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Dining</span></div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">French-Moroccan cuisine<br /><span className="text-primary italic">generous and carefully prepared</span></h2>
              <div className="space-y-4 text-muted-foreground mb-8"><p>Our chef invites you on a culinary journey between France and Morocco. Slow-cooked tajines with ancestral flavours — chicken with olives and preserved lemon, lamb with prunes and almonds — sit alongside French classics such as pepper-sauce entrecôte and salmon with béarnaise.</p><p>Friday royal couscous, crisp saffron pastilla, grilled prawns with lemon... Every dish tells a story, prepared with fresh market produce and the know-how of our team.</p></div>
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /><div><p className="text-sm text-muted-foreground">Service</p><p className="font-medium text-foreground">12pm - 3pm / 7pm - 10:30pm</p></div></div>
                <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /><div><p className="text-sm text-muted-foreground">Location</p><p className="font-medium text-foreground">Rooftop terrace and patios</p></div></div>
              </div>
              <Button asChild className="rounded-none px-8 py-6"><a href={RESTAURANT_MENU_URL} target="_blank" rel="noopener noreferrer" type="application/pdf">View menu PDF, 3.7 MB, new tab</a></Button>
            </div>
            <div className="aspect-[4/5] relative"><Image src="/images/ayadina/patio-fontaine-nuit-01.jpg" alt="Dining in the Riad Ayadina patio" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectPosition: "50% 58%" }} /></div>
          </div></div>
        </section>

        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] relative"><Image src="/images/ayadina/bibliothequebar-plafond-jour-02.jpg" alt="Riad Ayadina bar lounge" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /></div>
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-6 py-3 shadow-xl"><span className="text-sm font-medium uppercase tracking-wider">Licensed bar</span></div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 bg-primary-foreground/10 flex items-center justify-center"><Wine className="h-6 w-6 text-primary-foreground" /></div><span className="text-sm uppercase tracking-[0.2em] text-primary-foreground/70">Bar and lounge</span></div>
              <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-6">A rare privilege<br /><span className="text-accent italic">in the Medina</span></h2>
              <div className="space-y-4 text-primary-foreground/80 mb-8"><p>Ayadina is one of the few Medina addresses with a licensed bar. It means you can enjoy an aperitif at sunset on the terrace, with Marrakech rooftops and the Atlas as a backdrop.</p><p>Moroccan wines from Meknès and Boulaouane, Mumm and Veuve Clicquot champagnes, signature cocktails — from a classic Mojito to a refreshing Spritz — whisky, cognac and a selection of Cuban cigars for aficionados.</p></div>
              <div className="space-y-3 mb-8">
                <Offer icon={Wine} title="Wine cellar" text="Whites, rosés and reds — Morocco & France" />
                <Offer icon={GlassWater} title="Cocktails with or without alcohol" text="House creations and timeless classics" />
                <Offer icon={Cigarette} title="Cigar cellar" text="Cuban and Dominican selection" />
              </div>
              <Button asChild className="rounded-none px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90"><a href={RESTAURANT_MENU_URL} target="_blank" rel="noopener noreferrer" type="application/pdf">View menu PDF, 3.7 MB, new tab</a></Button>
            </div>
          </div></div>
        </section>

        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4"><div className="max-w-3xl mx-auto text-center">
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Book your table</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Our restaurant welcomes riad guests and outside visitors. Dinner and private events are best booked in advance.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-card p-5 text-center"><Clock className="h-5 w-5 text-primary mx-auto mb-2" /><p className="text-sm text-muted-foreground">Lunch 12pm-3pm</p><p className="text-sm text-muted-foreground">Dinner 7pm-10:30pm</p></div>
              <div className="bg-card p-5 text-center"><MapPin className="h-5 w-5 text-primary mx-auto mb-2" /><p className="text-sm text-muted-foreground">Rooftop terrace</p><p className="text-sm text-muted-foreground">Atlas views</p></div>
              <div className="bg-card p-5 text-center"><Sparkles className="h-5 w-5 text-primary mx-auto mb-2" /><p className="text-sm text-muted-foreground">Private hire</p><p className="text-sm text-muted-foreground">Events and groups</p></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-none px-10 py-6"><a href={buildWhatsAppUrl("Hello, I would like to book a table at the restaurant.")} target="_blank" rel="noopener noreferrer">Book a table</a></Button>
              <BookingPopupButton size="lg" variant="outline" className="rounded-none px-10 py-6">Book direct</BookingPopupButton>
            </div>
            <p className="text-xs text-muted-foreground mt-6">Fast reply by WhatsApp</p>
          </div></div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  )
}

function Offer({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return <div className="flex items-center gap-4 p-4 bg-primary-foreground/5 border border-primary-foreground/10"><Icon className="h-5 w-5 text-accent flex-shrink-0" /><div><span className="block text-primary-foreground font-medium">{title}</span><span className="text-sm text-primary-foreground/60">{text}</span></div></div>
}
