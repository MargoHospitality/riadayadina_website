export const propertyConfig = {
  name: "Riad Ayadina & Spa",
  cloudbedsPropertyId: process.env.CLOUDBEDS_PROPERTY_ID || "319793",
  bookingEngineId: process.env.NEXT_PUBLIC_BOOKING_ENGINE_ID || "9mPc6B",
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || "https://hotels.cloudbeds.com/reservation/9mPc6B",
  defaultCurrency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || "MAD",
  defaultLanguage: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || "fr",
  contactPath: "/contact",
  directBenefits: {
    twoNights: [
      "Transfert aéroport aller offert",
      "Annulation flexible",
      "Pas de prépaiement",
      "-10% sur les soins Spa",
      "Cocktail de bienvenue",
      "Contact direct avec le riad",
    ],
    threeNights: [
      "Transfert aéroport A/R offert",
      "Annulation flexible",
      "Pas de prépaiement",
      "-10% sur les soins Spa",
      "Cocktail de bienvenue",
      "Surclassement & early check-in selon disponibilité",
    ],
  },
} as const
