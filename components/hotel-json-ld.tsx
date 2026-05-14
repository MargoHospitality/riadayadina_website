const hotelJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Riad Ayadina & Spa",
  url: "https://www.riadayadinamarrakech.net",
  telephone: "+212524383881",
  image: "https://www.riadayadinamarrakech.net/images/ayadina-home/patio-jour-04.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "35 Zaouia El Abassia, Kaa El Machraa, Bab El Khemis",
    addressLocality: "Marrakech",
    postalCode: "40000",
    addressCountry: "MA",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
    { "@type": "LocationFeatureSpecification", name: "Hammam", value: true },
    { "@type": "LocationFeatureSpecification", name: "Piscine chauffée sur le toit", value: true },
    { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
    { "@type": "LocationFeatureSpecification", name: "Bar", value: true },
    { "@type": "LocationFeatureSpecification", name: "Accès voiture", value: true },
  ],
  sameAs: [
    "https://www.instagram.com/riadayadina/",
    "https://www.facebook.com/RiadAyadina.Spa",
    "https://www.tripadvisor.com/Hotel_Review-g293734-d585332-Reviews-Riad_Ayadina_et_SPa-Marrakech_Marrakech_Safi.html",
    "https://g.page/riad-ayadina-spa",
  ],
}

export function HotelJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }}
    />
  )
}
