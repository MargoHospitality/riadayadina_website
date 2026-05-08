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
    { src: "/images/ayadina/chambres-suites/chambres/01-aida-chambre-02.jpg", alt: "Aida - chambre" },
    { src: "/images/ayadina/chambres-suites/chambres/02-aida-chambre-01.jpg", alt: "Aida - vue générale" },
    { src: "/images/ayadina/chambres-suites/chambres/03-aida-patiobalcon-01.jpg", alt: "Aida - balcon sur patio" },
    { src: "/images/ayadina/chambres-suites/chambres/04-aida-sallebain-01.jpg", alt: "Aida - salle de bain" },
    { src: "/images/ayadina/chambres-suites/chambres/05-adelina-chambre-03.jpg", alt: "Adelina - chambre" },
    { src: "/images/ayadina/chambres-suites/chambres/06-adelina-chambre-04.jpg", alt: "Adelina - lit et décoration" },
    { src: "/images/ayadina/chambres-suites/chambres/07-adelina-salon-01.jpg", alt: "Adelina - salon" },
    { src: "/images/ayadina/chambres-suites/chambres/08-adelina-sallebain-02.jpg", alt: "Adelina - salle de bain" },
    { src: "/images/ayadina/chambres-suites/chambres/09-alicia-chambre-01.jpg", alt: "Alicia - chambre" },
    { src: "/images/ayadina/chambres-suites/chambres/10-alicia-chambre-07.jpg", alt: "Alicia - espace nuit" },
    { src: "/images/ayadina/chambres-suites/chambres/11-alicia-chambre-05.jpg", alt: "Alicia - détails décoratifs" },
    { src: "/images/ayadina/chambres-suites/chambres/12-alicia-sallebain-01.jpg", alt: "Alicia - salle de bain" },
  ],}

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
    { src: "/images/ayadina/chambres-suites/suites/01-ahisia-chambre-07.jpg", alt: "Ahisia - chambre" },
    { src: "/images/ayadina/chambres-suites/suites/02-ahisia-chambre-01.jpg", alt: "Ahisia - vue générale" },
    { src: "/images/ayadina/chambres-suites/suites/03-ambrosia-chambre-01.jpg", alt: "Ambrosia - chambre" },
    { src: "/images/ayadina/chambres-suites/suites/04-ambrosia-chambre-06.jpg", alt: "Ambrosia - chambre principale" },
    { src: "/images/ayadina/chambres-suites/suites/05-ambrosia-chambre-08.jpg", alt: "Ambrosia - détails" },
    { src: "/images/ayadina/chambres-suites/suites/06-ambrosia-sallebain-01.jpg", alt: "Ambrosia - salle de bain" },
    { src: "/images/ayadina/chambres-suites/suites/07-adelina-salon-01.jpg", alt: "Suite - salon" },
    { src: "/images/ayadina/chambres-suites/suites/08-antinea-chambre-05.jpg", alt: "Antinea - chambre" },
    { src: "/images/ayadina/chambres-suites/suites/09-antinea-chambre-08.jpg", alt: "Antinea - détails" },
    { src: "/images/ayadina/chambres-suites/suites/10-antiqua-chambre-02.jpg", alt: "Antiqua - chambre" },
    { src: "/images/ayadina/chambres-suites/suites/11-antiqua-chambre-04.jpg", alt: "Antiqua - décoration" },
    { src: "/images/ayadina/chambres-suites/suites/12-antiqua-sallebain-02.jpg", alt: "Antiqua - salle de bain" },
    { src: "/images/ayadina/chambres-suites/suites/13-atina-chambre-01.jpg", alt: "Atina - chambre" },
    { src: "/images/ayadina/chambres-suites/suites/14-atina-sallebain-01.jpg", alt: "Atina - salle de bain" },
  ],}

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
