import type { Metadata } from "next"
import ContactClient from "./contact-client"

export const metadata: Metadata = {
  title: "Contact & accès | Riad Ayadina Marrakech",
  description:
    "Contactez le Riad Ayadina & Spa à Marrakech : adresse dans la médina, accès voiture, parking à proximité, WhatsApp, téléphone, email et transfert aéroport.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & accès | Riad Ayadina Marrakech",
    description:
      "Adresse, WhatsApp, téléphone et informations d’accès pour rejoindre le Riad Ayadina dans la médina de Marrakech.",
    url: "/contact",
  },
}

export default function ContactPage() {
  return <ContactClient />
}
