import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createPageMetadata } from "@/lib/i18n/metadata"

export const metadata: Metadata = createPageMetadata("gallery", "en")
const images = ["/images/ayadina/gallery-patio-jour-04.jpg", "/images/ayadina/gallery-salon-jour-02.jpg", "/images/ayadina/gallery-piscine-toit-01.jpg", "/images/ayadina/adelina-chambre-04.jpg", "/images/ayadina/spa-soins-complementaires.jpg", "/images/ayadina/restaurant-table-patio-01.jpg"]
export default function EnglishGalleryPage() { return <><Header locale="en" /><main><section className="py-28 bg-secondary/40"><div className="container mx-auto px-4 max-w-3xl"><p className="uppercase tracking-[0.2em] text-sm text-muted-foreground mb-4">Photo gallery</p><h1 className="font-serif text-5xl md:text-6xl mb-6">Patios, rooms, spa, rooftop pool and restaurant.</h1><p className="text-muted-foreground">A first glimpse of the spaces and atmosphere at Riad Ayadina & Spa.</p></div></section><section className="py-20"><div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">{images.map((src, index) => <Image key={src} src={src} alt={`Riad Ayadina gallery image ${index + 1}`} width={800} height={650} className="h-80 w-full object-cover" />)}</div></section></main><Footer locale="en" /></> }
