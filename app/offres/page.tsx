import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/i18n/metadata"
import OffresClient from "./offres-client"

export const metadata: Metadata = createPageMetadata("offers", "fr")

export default function OffresPage() {
  return <OffresClient />
}
