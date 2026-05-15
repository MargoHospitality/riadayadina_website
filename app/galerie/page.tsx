import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/i18n/metadata"
import GalerieClient from "./galerie-client"

export const metadata: Metadata = createPageMetadata("gallery", "fr")

export default function GaleriePage() {
  return <GalerieClient />
}
