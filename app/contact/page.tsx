import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/i18n/metadata"
import ContactClient from "./contact-client"

export const metadata: Metadata = createPageMetadata("contact", "fr")

export default function ContactPage() {
  return <ContactClient />
}
