import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/i18n/metadata"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TestimonialsSection } from "@/components/testimonials-section"
import OffresClient from "@/app/offres/offres-client"

export const metadata: Metadata = createPageMetadata("offers", "en")

export default function EnglishOffersPage() {
  return (
    <>
      <Header locale="en" />
      <OffresClient locale="en" testimonials={<TestimonialsSection locale="en" />} />
      <Footer locale="en" />
    </>
  )
}
