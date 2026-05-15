import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RoomsHero } from "@/components/rooms/rooms-hero"
import { RoomCategory } from "@/components/rooms/room-category"
import { BookingWidget } from "@/components/booking-widget"
import { TestimonialsSection } from "@/components/testimonials-section"
import { createPageMetadata } from "@/lib/i18n/metadata"

export const metadata: Metadata = createPageMetadata("rooms", "en")

const superiorRooms = {
  title: "Superior Double Rooms",
  subtitle: "Moroccan elegance in a comfortable cocoon",
  description: "Three characterful rooms, each with its own personality. A 17 to 22 m² retreat where Moroccan craftsmanship meets simple, contemporary comfort — ideal for a couple’s escape or a solo stay.",
  forWho: "Ideal for: couples on a romantic break, solo travellers",
  roomCount: 3,
  surfaceRange: "17 to 22 m²",
  features: [
    "Comfortable double bed",
    "Private bathroom",
    "Reversible air conditioning",
    "High-speed Wi-Fi",
    "Safe",
    "Quality welcome amenities",
    "Room service",
    "Breakfast included",
  ],
  images: [
    { src: "/images/ayadina/chambres-suites/chambres/01-aida-chambre-02.jpg", alt: "Aida room" },
    { src: "/images/ayadina/chambres-suites/chambres/02-aida-chambre-01.jpg", alt: "Aida room overview" },
    { src: "/images/ayadina/chambres-suites/chambres/03-aida-patiobalcon-01.jpg", alt: "Aida patio balcony" },
    { src: "/images/ayadina/chambres-suites/chambres/04-aida-sallebain-01.jpg", alt: "Aida bathroom" },
    { src: "/images/ayadina/chambres-suites/chambres/05-adelina-chambre-03.jpg", alt: "Adelina room" },
    { src: "/images/ayadina/chambres-suites/chambres/06-adelina-chambre-04.jpg", alt: "Adelina bed and decor" },
    { src: "/images/ayadina/chambres-suites/chambres/07-adelina-salon-01.jpg", alt: "Adelina sitting area" },
    { src: "/images/ayadina/chambres-suites/chambres/08-adelina-sallebain-02.jpg", alt: "Adelina bathroom" },
    { src: "/images/ayadina/chambres-suites/chambres/09-alicia-chambre-01.jpg", alt: "Alicia room" },
    { src: "/images/ayadina/chambres-suites/chambres/10-alicia-chambre-07.jpg", alt: "Alicia sleeping area" },
    { src: "/images/ayadina/chambres-suites/chambres/11-alicia-chambre-05.jpg", alt: "Alicia decorative details" },
    { src: "/images/ayadina/chambres-suites/chambres/12-alicia-sallebain-01.jpg", alt: "Alicia bathroom" },
  ],
}

const juniorSuites = {
  title: "Junior Suites",
  subtitle: "More space to savour the riad",
  description: "Six spacious suites of 24 to 36 m² with private sitting areas. Generous rooms for slowing down, reading, resting and enjoying the quiet rhythm of the riad.",
  forWho: "Ideal for: spa stays, couples, families, longer stays",
  roomCount: 6,
  surfaceRange: "24 to 36 m²",
  features: [
    "King-size bed",
    "Private sitting area",
    "Bathtub or walk-in shower",
    "Reversible air conditioning",
    "High-speed Wi-Fi",
    "Safe",
    "Minibar",
    "Quality welcome amenities",
    "Bathrobes and slippers",
    "Breakfast included",
  ],
  images: [
    { src: "/images/ayadina/chambres-suites/suites/01-ahisia-chambre-07.jpg", alt: "Ahisia suite bedroom" },
    { src: "/images/ayadina/chambres-suites/suites/02-ahisia-chambre-01.jpg", alt: "Ahisia suite overview" },
    { src: "/images/ayadina/chambres-suites/suites/03-ambrosia-chambre-01.jpg", alt: "Ambrosia suite" },
    { src: "/images/ayadina/chambres-suites/suites/04-ambrosia-chambre-06.jpg", alt: "Ambrosia main bedroom" },
    { src: "/images/ayadina/chambres-suites/suites/05-ambrosia-chambre-08.jpg", alt: "Ambrosia details" },
    { src: "/images/ayadina/chambres-suites/suites/06-ambrosia-sallebain-01.jpg", alt: "Ambrosia bathroom" },
    { src: "/images/ayadina/chambres-suites/suites/07-adelina-salon-01.jpg", alt: "Private sitting area in a Junior Suite" },
    { src: "/images/ayadina/chambres-suites/suites/08-antinea-chambre-05.jpg", alt: "Antinea suite bedroom" },
    { src: "/images/ayadina/chambres-suites/suites/09-antinea-chambre-08.jpg", alt: "Antinea details" },
    { src: "/images/ayadina/chambres-suites/suites/10-antiqua-chambre-02.jpg", alt: "Antiqua suite bedroom" },
    { src: "/images/ayadina/chambres-suites/suites/11-antiqua-chambre-04.jpg", alt: "Antiqua decor" },
    { src: "/images/ayadina/chambres-suites/suites/12-antiqua-sallebain-02.jpg", alt: "Antiqua bathroom" },
    { src: "/images/ayadina/chambres-suites/suites/13-atina-chambre-01.jpg", alt: "Atina suite bedroom" },
    { src: "/images/ayadina/chambres-suites/suites/14-atina-sallebain-01.jpg", alt: "Atina bathroom" },
  ],
}

export default function EnglishRoomsPage() {
  return (
    <>
      <Header locale="en" />
      <main>
        <RoomsHero locale="en" />
        <RoomCategory {...superiorRooms} variant="light" locale="en" />
        <RoomCategory {...juniorSuites} variant="dark" locale="en" />
        <BookingWidget locale="en" />
        <TestimonialsSection locale="en" />
      </main>
      <Footer locale="en" />
    </>
  )
}
