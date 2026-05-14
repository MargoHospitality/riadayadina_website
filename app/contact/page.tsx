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
    siteName: "Riad Ayadina & Spa",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/images/ayadina-home/patio-jour-04.jpg",
        width: 1200,
        height: 800,
        alt: "Patio principal du Riad Ayadina à Marrakech",
      },
    ],
  },
}

export default function ContactPage() {
  return <ContactClient />
}
