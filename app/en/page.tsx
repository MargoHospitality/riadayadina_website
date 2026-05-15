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

export const metadata: Metadata = createPageMetadata("home", "en")

export default function EnglishHomePage() {
  return (
    <main className="min-h-screen">
      <Header locale="en" />
      <HeroSection locale="en" />
      <StorytellingSection locale="en" />
      <DirectBookingBanner locale="en" />
      <RoomsSection locale="en" />
      <ExperiencesSection locale="en" />
      <BookingWidget locale="en" />
      <TestimonialsSection locale="en" />
      <Footer locale="en" />
    </main>
  )
}
