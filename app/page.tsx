import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StorytellingSection } from "@/components/storytelling-section"
import { DirectBookingBanner } from "@/components/direct-booking-banner"
import { RoomsSection } from "@/components/rooms-section"
import { ExperiencesSection } from "@/components/experiences-section"
import { BookingWidget } from "@/components/booking-widget"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Riad Ayadina & Spa | Riad boutique à Marrakech",
  description:
    "Séjournez au Riad Ayadina & Spa, riad boutique dans la médina de Marrakech avec spa de 250 m², piscine chauffée, restaurant, bar et réservation directe.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Riad Ayadina & Spa | Riad boutique à Marrakech",
    description:
      "Un riad boutique au calme de la médina, avec spa, piscine chauffée sur le toit, restaurant et bar.",
    url: "/",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <StorytellingSection />
      <DirectBookingBanner />
      <RoomsSection />
      <ExperiencesSection />
      <BookingWidget />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
