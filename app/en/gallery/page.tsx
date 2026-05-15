import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/i18n/metadata"
import GalerieClient from "@/app/galerie/galerie-client"

export const metadata: Metadata = createPageMetadata("gallery", "en")

export default function EnglishGalleryPage() {
  return <GalerieClient locale="en" />
}
