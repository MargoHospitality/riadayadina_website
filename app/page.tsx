import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DirectBookingBanner } from "@/components/direct-booking-banner"
import { AboutSection } from "@/components/about-section"
import { RoomsSection } from "@/components/rooms-section"
import { ExperiencesSection } from "@/components/experiences-section"
import { BookingWidget } from "@/components/booking-widget"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <DirectBookingBanner />
      <RoomsSection />
      <ExperiencesSection />
      <BookingWidget />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
