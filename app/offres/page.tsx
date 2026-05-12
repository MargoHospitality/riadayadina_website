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
  },
}

export default function OffresPage() {
  return <OffresClient />
}
