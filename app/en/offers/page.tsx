import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/i18n/metadata"
import OffresClient from "@/app/offres/offres-client"

export const metadata: Metadata = createPageMetadata("offers", "en")

export default function EnglishOffersPage() {
  return <OffresClient locale="en" />
}
