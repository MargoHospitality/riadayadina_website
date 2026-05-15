import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/i18n/metadata"
import ContactClient from "@/app/contact/contact-client"

export const metadata: Metadata = createPageMetadata("contact", "en")

export default function EnglishContactPage() {
  return <ContactClient locale="en" />
}
