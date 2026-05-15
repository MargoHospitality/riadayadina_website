import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingPopupButton } from "@/components/booking-popup-button"
import { TestimonialsSection } from "@/components/testimonials-section"
import { createPageMetadata } from "@/lib/i18n/metadata"

export const metadata: Metadata = createPageMetadata("home", "en")

export default function EnglishHomePage() {
  return (
    <main className="min-h-screen">
      <Header locale="en" />
      <section className="relative min-h-[82vh] flex items-end">
        <Image src="/images/ayadina-home/patio-jour-04.jpg" alt="Riad Ayadina patio in Marrakech" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        <div className="relative z-10 container mx-auto px-4 pb-20 text-white">
          <p className="uppercase tracking-[0.25em] text-sm text-white/80 mb-5">Riad Ayadina & Spa · Marrakech Medina</p>
          <h1 className="font-serif text-5xl md:text-7xl max-w-4xl mb-6">A peaceful boutique riad with spa, rooftop pool and licensed bar.</h1>
          <p className="text-lg md:text-xl max-w-2xl text-white/90 mb-8">1,200 m² of calm near Bab El Khemis, with direct car access, nine rooms and suites, a 250 m² spa and warm Moroccan hospitality.</p>
          <div className="flex flex-col sm:flex-row gap-3"><BookingPopupButton size="lg">Book direct</BookingPopupButton><Link href="/en/rooms-suites" className="inline-flex items-center justify-center border border-white/50 px-6 py-3 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Explore rooms</Link></div>
        </div>
      </section>
      <section className="py-20 bg-secondary/40"><div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center"><div><p className="font-serif text-5xl text-primary mb-2">9</p><p className="uppercase tracking-wider text-sm">rooms & suites</p></div><div><p className="font-serif text-5xl text-primary mb-2">250</p><p className="uppercase tracking-wider text-sm">m² spa</p></div><div><p className="font-serif text-5xl text-primary mb-2">7×3m</p><p className="uppercase tracking-wider text-sm">heated rooftop pool</p></div></div></section>
      <section className="py-20"><div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center"><Image src="/images/ayadina/patio-tableolivier-jour-01.jpg" alt="Breakfast patio at Riad Ayadina" width={900} height={650} className="object-cover w-full" /><div><p className="uppercase tracking-[0.2em] text-sm text-muted-foreground mb-4">The spirit of Ayadina</p><h2 className="font-serif text-4xl mb-6">A generous riad made for slowing down.</h2><p className="text-muted-foreground mb-4">Past the entrance, Marrakech softens. Three leafy patios, a rooftop pool, quiet lounges and attentive service create an easy base for discovering the Medina.</p><p className="text-muted-foreground mb-8">Book direct for clear contact with the riad team, flexible cancellation and no prepayment on the official booking engine.</p><Link href="/en/the-riad" className="text-primary underline underline-offset-4">Discover the riad</Link></div></div></section>
      <TestimonialsSection locale="en" />
      <Footer locale="en" />
    </main>
  )
}
