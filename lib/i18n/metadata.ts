import type { Metadata } from "next"
import { getLocalizedPath, type Locale, type RouteKey } from "./routing"

const baseUrl = "https://www.riadayadinamarrakech.net"
const ogImage = "/images/ayadina-home/patio-jour-04.jpg"

const pageMeta: Record<RouteKey, Record<Locale, { title: string; description: string }>> = {
  home: {
    fr: {
      title: "Riad Ayadina & Spa | Riad boutique à Marrakech",
      description:
        "Une adresse paisible au cœur de la médina de Marrakech : spa de 250 m², piscine chauffée sur le toit, restaurant, bar et réservation directe.",
    },
    en: {
      title: "Riad Ayadina & Spa | Boutique riad in Marrakech",
      description:
        "A peaceful riad in the heart of the Marrakech Medina: 250 m² spa, heated rooftop pool, restaurant, licensed bar and direct booking.",
    },
  },
  riad: {
    fr: { title: "Le Riad | Riad Ayadina Marrakech", description: "Découvrez le Riad Ayadina : patios arborés, piscine chauffée sur le toit, accès voiture et atmosphère paisible dans la médina." },
    en: { title: "The Riad | Riad Ayadina Marrakech", description: "Discover Riad Ayadina: leafy patios, heated rooftop pool, car access and a calm atmosphere in the Medina." },
  },
  rooms: {
    fr: { title: "Chambres et suites | Riad Ayadina Marrakech", description: "Chambres doubles supérieures et suites junior du Riad Ayadina à Marrakech : confort, patios, petit-déjeuner inclus et réservation directe." },
    en: { title: "Rooms & suites | Riad Ayadina Marrakech", description: "Superior Double Rooms and Junior Suites at Riad Ayadina Marrakech: comfort, patios, breakfast included and direct booking." },
  },
  offers: {
    fr: { title: "Offres en direct | Riad Ayadina Marrakech", description: "Réservez en direct au Riad Ayadina et profitez des avantages officiels : meilleur contact, attentions selon durée de séjour et moteur sécurisé." },
    en: { title: "Direct offers | Riad Ayadina Marrakech", description: "Book direct with Riad Ayadina and enjoy official benefits: direct contact, thoughtful extras by length of stay and a secure booking engine." },
  },
  spa: {
    fr: { title: "Spa Marrakech | Hammam & massages au Riad Ayadina", description: "Les Bains d’Ayadina, spa de 250 m² à Marrakech : hammam traditionnel, massages, soins du visage et rituels marocains." },
    en: { title: "Spa in Marrakech | Hammam & massages at Riad Ayadina", description: "Les Bains d’Ayadina, a 250 m² spa in Marrakech: traditional hammam, massages, facials and Moroccan rituals." },
  },
  restaurant: {
    fr: { title: "Restaurant & bar à Marrakech | Riad Ayadina", description: "Restaurant franco-marocain au Riad Ayadina à Marrakech : terrasse sur le toit, patios, bar autorisé, vins, cocktails et réservation de table." },
    en: { title: "Restaurant & licensed bar in Marrakech | Riad Ayadina", description: "French-Moroccan dining at Riad Ayadina Marrakech: rooftop terrace, patios, licensed bar, wines, cocktails and table booking." },
  },
  gallery: {
    fr: { title: "Galerie photos | Riad Ayadina Marrakech", description: "Patios, chambres, spa, piscine sur le toit, restaurant et détails du Riad Ayadina à Marrakech en images." },
    en: { title: "Photo gallery | Riad Ayadina Marrakech", description: "Patios, rooms, spa, rooftop pool, restaurant and details of Riad Ayadina Marrakech in pictures." },
  },
  contact: {
    fr: { title: "Contact & accès | Riad Ayadina Marrakech", description: "Contactez le Riad Ayadina à Marrakech pour une réservation, un transfert, un événement ou une demande spéciale. Accès voiture possible." },
    en: { title: "Contact & access | Riad Ayadina Marrakech", description: "Contact Riad Ayadina Marrakech for a booking, transfer, event or special request. Car access available." },
  },
  comparer: {
    fr: { title: "Comparer les tarifs | Réservation directe Riad Ayadina", description: "Comparez les tarifs publics et l’offre officielle du Riad Ayadina pour vos dates." },
    en: { title: "Compare rates | Direct booking Riad Ayadina", description: "Compare public rates and Riad Ayadina’s official offer for your dates." },
  },
}

export function createPageMetadata(key: RouteKey, locale: Locale): Metadata {
  const meta = pageMeta[key][locale]
  const canonical = getLocalizedPath(key, locale)
  const frPath = getLocalizedPath(key, "fr")
  const enPath = getLocalizedPath(key, "en")
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        fr: frPath,
        en: enPath,
        "x-default": "/",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: "Riad Ayadina & Spa",
      type: "website",
      locale: locale === "en" ? "en_GB" : "fr_FR",
      alternateLocale: [locale === "en" ? "fr_FR" : "en_GB"],
      images: [{ url: ogImage, width: 1200, height: 800, alt: "Riad Ayadina patio in Marrakech" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  }
}
