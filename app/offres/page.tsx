import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/i18n/metadata"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TestimonialsSection } from "@/components/testimonials-section"
import OffresClient from "./offres-client"

export const metadata: Metadata = createPageMetadata("offers", "fr")

export default function OffresPage() {
  return (
    <>
      <Header locale="fr" />
      <OffresClient testimonials={<TestimonialsSection locale="fr" />} />
      <Footer locale="fr" />
    </>
  )
}
