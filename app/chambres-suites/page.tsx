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
    { src: "/images/ayadina/adelina-chambre-04.jpg", alt: "Chambre Adelina - lit et décoration" },
    { src: "/images/ayadina/aida-chambre-02.jpg", alt: "Chambre Aida - ambiance et détails" },
    { src: "/images/ayadina/alicia-chambre-07.jpg", alt: "Chambre Alicia - espace nuit" },
    { src: "/images/ayadina/aida-patiobalcon-01.jpg", alt: "Chambre Aida - balcon sur patio" },
    { src: "/images/ayadina/adelina-salon-01.jpg", alt: "Chambre Adelina - salon" },
    { src: "/images/ayadina/alicia-sallebain-01.jpg", alt: "Salle de bain privative" },
    { src: "/images/ayadina/aida-chambre-01.jpg", alt: "Chambre Aida - vue générale" },
    { src: "/images/ayadina/alicia-chambre-01.jpg", alt: "Chambre Alicia - détails décoratifs" },
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
    { src: "/images/ayadina/ambrosia-chambre-06.jpg", alt: "Suite Ambrosia - chambre principale" },
    { src: "/images/ayadina/ahisia-chambre-07.jpg", alt: "Suite Ahisia - espace nuit" },
    { src: "/images/ayadina/antiqua-chambre-04.jpg", alt: "Suite Antiqua - décoration" },
    { src: "/images/ayadina/antinea-chambre-05.jpg", alt: "Suite Antinea - ambiance" },
    { src: "/images/ayadina/ambrosia-chambre-08.jpg", alt: "Suite Ambrosia - détails" },
    { src: "/images/ayadina/antiqua-chambre-02.jpg", alt: "Suite Antiqua - espace nuit" },
    { src: "/images/ayadina/atina-chambre-01.jpg", alt: "Suite Atina - chambre" },
    { src: "/images/ayadina/atina-sallebain-01.jpg", alt: "Suite Atina - salle de bain" },
    { src: "/images/ayadina/ahisia-chambre-01.jpg", alt: "Suite Ahisia - vue générale" },
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
