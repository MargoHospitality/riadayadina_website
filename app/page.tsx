import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/i18n/metadata"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StorytellingSection } from "@/components/storytelling-section"
import { DirectBookingBanner } from "@/components/direct-booking-banner"
import { RoomsSection } from "@/components/rooms-section"
import { ExperiencesSection } from "@/components/experiences-section"
import { BookingWidget } from "@/components/booking-widget"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = createPageMetadata("home", "fr")

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header locale="fr" />
      <HeroSection />
      <StorytellingSection />
      <DirectBookingBanner />
      <RoomsSection />
      <ExperiencesSection />
      <BookingWidget />
      <TestimonialsSection locale="fr" />
      <Footer locale="fr" />
    </main>
  )
}
