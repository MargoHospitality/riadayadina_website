import type { Metadata } from "next"
import OffresClient from "./offres-client"

export const metadata: Metadata = {
  title: "Offres directes | Riad Ayadina Marrakech",
  description:
    "Réservez en direct au Riad Ayadina Marrakech et profitez d’attentions réservées aux hôtes du site officiel : annulation flexible, transfert selon durée, spa à -10 % et cocktail de bienvenue.",
  alternates: {
    canonical: "/offres",
  },
  openGraph: {
    title: "Offres directes | Riad Ayadina Marrakech",
    description:
      "Les privilèges de la réservation directe au Riad Ayadina : contact sans intermédiaire, attentions maison et conditions officielles.",
    url: "/offres",
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

export default function OffresPage() {
  return <OffresClient />
}
