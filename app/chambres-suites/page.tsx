import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RoomsHero } from "@/components/rooms/rooms-hero"
import { RoomCategory } from "@/components/rooms/room-category"
import { BookingWidget } from "@/components/booking-widget"
import { TestimonialsSection } from "@/components/testimonials-section"

const chambresDoubles = {
  title: "Chambres Doubles Supérieures",
  subtitle: "L'élégance marocaine dans un écrin de confort",
  description: "Trois chambres de caractère, chacune avec sa personnalité unique. Un cocon de 17 à 22m² où l'artisanat marocain traditionnel rencontre le raffinement contemporain. L'endroit idéal pour un séjour en couple ou en solo.",
  forWho: "Idéal pour : couples en escapade romantique, voyageurs solo",
  roomCount: 3,
  surfaceRange: "17-22m²",
  features: [
    "Lit double confort",
    "Salle de bain privative",
    "Climatisation réversible",
    "Wifi haut débit",
    "Coffre-fort",
    "Produits d'accueil premium",
    "Service en chambre",
    "Petit-déjeuner inclus",
  ],
  images: [
    { src: "/images/chambre-alicia.jpg", alt: "Chambre Double - Vue lit et décoration" },
    { src: "/images/chambre-aida.jpg", alt: "Chambre Double - Ambiance et détails" },
    { src: "/images/salle-de-bain.jpg", alt: "Salle de bain privative" },
    { src: "/images/hero-patio.jpg", alt: "Vue sur le patio depuis la chambre" },
    { src: "/images/chambre-alicia.jpg", alt: "Chambre Double - Détails décoratifs" },
    { src: "/images/chambre-aida.jpg", alt: "Chambre Double - Espace de vie" },
  ],
}

const suitesJunior = {
  title: "Suites Junior",
  subtitle: "L'espace et le luxe pour un séjour d'exception",
  description: "Six suites spacieuses de 24 à 36m² avec salon privatif. Des espaces généreux pensés pour les voyageurs exigeants, où chaque détail invite à la contemplation et au repos absolu.",
  forWho: "Idéal pour : séjours spa, couples, familles, longs séjours",
  roomCount: 6,
  surfaceRange: "24-36m²",
  features: [
    "Lit king-size",
    "Salon privé",
    "Baignoire ou douche à l'italienne",
    "Climatisation réversible",
    "Wifi haut débit",
    "Coffre-fort",
    "Minibar",
    "Produits d'accueil premium",
    "Peignoirs et chaussons",
    "Petit-déjeuner inclus",
  ],
  images: [
    { src: "/images/suite-antinea.jpg", alt: "Suite Junior - Chambre principale" },
    { src: "/images/suite-antigua.jpg", alt: "Suite Junior - Espace salon" },
    { src: "/images/salle-de-bain.jpg", alt: "Suite Junior - Salle de bain" },
    { src: "/images/rooftop-terrace.jpg", alt: "Vue depuis la terrasse" },
    { src: "/images/suite-antinea.jpg", alt: "Suite Junior - Détails luxueux" },
    { src: "/images/suite-antigua.jpg", alt: "Suite Junior - Décoration" },
    { src: "/images/hero-patio.jpg", alt: "Vue sur le patio" },
  ],
}

export default function ChambresEtSuitesPage() {
  return (
    <>
      <Header />
      <main>
        <RoomsHero />
        
        <RoomCategory 
          {...chambresDoubles} 
          variant="light"
        />
        
        <RoomCategory 
          {...suitesJunior} 
          variant="dark"
        />
        
        <BookingWidget />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
