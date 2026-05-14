import type { Metadata } from "next"
import GalerieClient from "./galerie-client"

export const metadata: Metadata = {
  title: "Galerie photos | Riad Ayadina Marrakech",
  description:
    "Découvrez en images le Riad Ayadina à Marrakech : patios, chambres, suites junior, spa, piscine chauffée, restaurant, bar et terrasse.",
  alternates: {
    canonical: "/galerie",
  },
  openGraph: {
    title: "Galerie photos | Riad Ayadina Marrakech",
    description:
      "Patios, chambres, spa, piscine sur le toit, restaurant et terrasse : découvrez les lieux avant votre arrivée au Riad Ayadina.",
    url: "/galerie",
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

export default function GaleriePage() {
  return <GalerieClient />
}
