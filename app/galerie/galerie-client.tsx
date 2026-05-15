"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageGalleryModal } from "@/components/image-gallery-modal"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { useBookingModal } from "@/components/booking-modal-provider"
import { cn } from "@/lib/utils"
import { getLocalizedPath, type Locale } from "@/lib/i18n/routing"

const images = {
  riad: [
    { src: "/images/ayadina/gallery-patio-jour-04.jpg", altFr: "Patio principal du Riad Ayadina", altEn: "Main patio at Riad Ayadina" },
    { src: "/images/ayadina/patio-tableolivier-jour-01.jpg", altFr: "Patio et table sous l'olivier", altEn: "Patio table under the olive tree" },
    { src: "/images/ayadina/gallery-patio-nuit-02.jpg", altFr: "Patio illuminé de nuit", altEn: "Patio lit at night" },
    { src: "/images/ayadina/gallery-salon-jour-02.jpg", altFr: "Salon traditionnel du riad", altEn: "Traditional riad lounge" },
    { src: "/images/ayadina/gallery-salon-marocain-01.jpg", altFr: "Salon marocain", altEn: "Moroccan sitting room" },
    { src: "/images/ayadina/cactus-01.jpg", altFr: "Détail extérieur du riad", altEn: "Exterior detail of the riad" },
  ],
  chambres: [
    { src: "/images/ayadina/adelina-chambre-04.jpg", altFr: "Chambre Adelina", altEn: "Adelina room" },
    { src: "/images/ayadina/aida-chambre-02.jpg", altFr: "Chambre Aida", altEn: "Aida room" },
    { src: "/images/ayadina/alicia-chambre-07.jpg", altFr: "Chambre Alicia", altEn: "Alicia room" },
    { src: "/images/ayadina/aida-patiobalcon-01.jpg", altFr: "Balcon de la chambre Aida", altEn: "Aida room patio balcony" },
    { src: "/images/ayadina/adelina-salon-01.jpg", altFr: "Salon de la chambre Adelina", altEn: "Adelina sitting area" },
    { src: "/images/ayadina/alicia-sallebain-01.jpg", altFr: "Salle de bain Alicia", altEn: "Alicia bathroom" },
  ],
  suites: [
    { src: "/images/ayadina/ambrosia-chambre-06.jpg", altFr: "Suite Ambrosia", altEn: "Ambrosia suite" },
    { src: "/images/ayadina/ahisia-chambre-07.jpg", altFr: "Suite Ahisia", altEn: "Ahisia suite" },
    { src: "/images/ayadina/antinea-chambre-05.jpg", altFr: "Suite Antinea", altEn: "Antinea suite" },
    { src: "/images/ayadina/antiqua-chambre-04.jpg", altFr: "Suite Antiqua", altEn: "Antiqua suite" },
    { src: "/images/ayadina/atina-chambre-01.jpg", altFr: "Suite Atina", altEn: "Atina suite" },
    { src: "/images/ayadina/atina-sallebain-01.jpg", altFr: "Salle de bain de suite", altEn: "Suite bathroom" },
  ],
  spaPiscine: [
    { src: "/images/ayadina/piscine-jour-01.jpg", altFr: "Piscine chauffée sur le toit", altEn: "Heated rooftop pool" },
    { src: "/images/ayadina/gallery-piscine-jour-02.jpg", altFr: "Terrasse piscine", altEn: "Pool terrace" },
    { src: "/images/ayadina/gallery-hammam-riad-102.jpg", altFr: "Hammam traditionnel", altEn: "Traditional hammam" },
    { src: "/images/ayadina-home/riad-103.jpg", altFr: "Les Bains d'Ayadina", altEn: "Les Bains d'Ayadina spa" },
    { src: "/images/ayadina/gallery-sallemassages-01.jpg", altFr: "Salle de massage", altEn: "Massage room" },
  ],
  restaurant: [
    { src: "/images/ayadina/patio-fontaine-nuit-01.jpg", altFr: "Patio restaurant de nuit", altEn: "Restaurant patio at night" },
    { src: "/images/ayadina/bibliothequebar-plafond-jour-02.jpg", altFr: "Bibliothèque bar", altEn: "Library bar" },
    { src: "/images/ayadina/gallery-bibliothequebar-jour-01.jpg", altFr: "Bar lounge", altEn: "Bar lounge" },
    { src: "/images/ayadina/gallery-terrasse-tablecentrale-nuit-01.jpg", altFr: "Table centrale sur la terrasse", altEn: "Central table on the terrace" },
    { src: "/images/ayadina/gallery-terrasse-jour-01.jpg", altFr: "Terrasse de jour", altEn: "Daytime terrace" },
    { src: "/images/ayadina/gallery-petitdejeuner-terrasse-03.jpg", altFr: "Petit-déjeuner en terrasse", altEn: "Breakfast on the terrace" },
  ],
} as const

const categoryCopy = {
  fr: [
    { id: "riad", name: "Riad et patios", description: "Patios arborés, salons et architecture traditionnelle", route: "riad", cta: "Découvrir le Riad", imageKey: "riad" },
    { id: "chambres", name: "Chambres supérieures", description: "Aida, Adelina et Alicia — 17 à 22m²", route: "rooms", cta: "Voir les chambres", imageKey: "chambres" },
    { id: "suites", name: "Suites junior", description: "Six suites avec salons privatifs — 24 à 36m²", route: "rooms", cta: "Voir les suites", imageKey: "suites" },
    { id: "spa-piscine", name: "Spa et piscine", description: "Hammam, massages, piscine chauffée et solarium", route: "spa", cta: "Découvrir le Spa", imageKey: "spaPiscine" },
    { id: "restaurant", name: "Restaurant et bar", description: "Patio, bibliothèque bar, terrasse et petit-déjeuner", route: "restaurant", cta: "Voir la carte", imageKey: "restaurant" },
  ],
  en: [
    { id: "riad", name: "Riad and patios", description: "Leafy patios, lounges and traditional architecture", route: "riad", cta: "Discover the riad", imageKey: "riad" },
    { id: "chambres", name: "Superior rooms", description: "Aida, Adelina and Alicia — 17 to 22 m²", route: "rooms", cta: "View the rooms", imageKey: "chambres" },
    { id: "suites", name: "Junior suites", description: "Six suites with private sitting areas — 24 to 36 m²", route: "rooms", cta: "View the suites", imageKey: "suites" },
    { id: "spa-piscine", name: "Spa and pool", description: "Hammam, massages, heated pool and solarium", route: "spa", cta: "Discover the spa", imageKey: "spaPiscine" },
    { id: "restaurant", name: "Restaurant and bar", description: "Patio, library bar, terrace and breakfast", route: "restaurant", cta: "See the menu", imageKey: "restaurant" },
  ],
} as const

const copy = {
  fr: {
    heroAlt: "Galerie Riad Ayadina",
    eyebrow: "Découvrez",
    title: "Galerie",
    intro: "Patios, chambres, spa, terrasse : découvrez les lieux avant votre arrivée.",
    allPhotos: "Toutes les photos",
    photoCount: "photos",
    ctaTitle: "Envie de voir le riad en vrai ?",
    ctaText: "Les photos donnent le ton ; le calme du lieu se découvre sur place. Venez découvrir Ayadina par vous-même.",
    cta: "Réserver en direct",
  },
  en: {
    heroAlt: "Riad Ayadina gallery",
    eyebrow: "Discover",
    title: "Gallery",
    intro: "Patios, rooms, spa and terrace: explore the riad before you arrive.",
    allPhotos: "All photos",
    photoCount: "photos",
    ctaTitle: "Want to see the riad for real?",
    ctaText: "The photos set the tone; the calm of the house is best discovered in person. Come and experience Ayadina for yourself.",
    cta: "Book direct",
  },
} as const

function getGalleryCategories(locale: Locale) {
  return categoryCopy[locale].map((category) => ({
    ...category,
    href: getLocalizedPath(category.route, locale),
    images: images[category.imageKey].map((image) => ({
      src: image.src,
      alt: locale === "en" ? image.altEn : image.altFr,
    })),
  }))
}

const getGridSpan = (index: number) => {
  const patterns = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
  ]
  return patterns[index % patterns.length]
}

export default function GaleriePage({ locale = "fr" }: { locale?: Locale }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const { openBookingModal } = useBookingModal()
  const t = copy[locale]
  const galleryCategories = useMemo(() => getGalleryCategories(locale), [locale])
  const allImages = useMemo(() => galleryCategories.flatMap(cat => cat.images), [galleryCategories])
  const activeCategory = selectedCategory ? galleryCategories.find(cat => cat.id === selectedCategory) : undefined
  const filteredImages = activeCategory ? activeCategory.images : allImages

  const openGallery = (index: number) => {
    setGalleryIndex(index)
    setGalleryOpen(true)
  }

  return (
    <>
      <Header locale={locale} />
      <main className="bg-background">
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/ayadina/gallery-patio-jour-04.jpg" alt={t.heroAlt} fill className="object-cover" priority sizes="100vw" style={{ objectPosition: "50% 45%" }} />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <AnimateOnScroll animation="fade-up">
              <p className="text-white/80 text-sm uppercase tracking-[0.3em] mb-4">{t.eyebrow}</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">{t.title}</h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">{t.intro}</p>
            </AnimateOnScroll>
          </div>
        </section>

        <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
              <button onClick={() => setSelectedCategory(null)} aria-pressed={selectedCategory === null} className={cn("px-4 py-2 text-sm transition-all duration-300", selectedCategory === null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}>
                {t.allPhotos}
              </button>
              {galleryCategories.map((category) => (
                <button key={category.id} onClick={() => setSelectedCategory(category.id)} aria-pressed={selectedCategory === category.id} className={cn("px-4 py-2 text-sm transition-all duration-300 flex flex-col items-center", selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}>
                  <span>{category.name}</span>
                  <span className={cn("text-[10px] hidden md:block", selectedCategory === category.id ? "text-primary-foreground/70" : "text-muted-foreground/60")}>{category.images.length} {t.photoCount}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {activeCategory && (
          <section className="bg-secondary/50 py-6">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div>
                  <h2 className="font-serif text-xl text-foreground">{activeCategory.name}</h2>
                  <p className="text-sm text-muted-foreground">{activeCategory.description}</p>
                </div>
                <Link href={activeCategory.href} className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">
                  {activeCategory.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            {selectedCategory ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <button key={`${selectedCategory}-${image.src}`} onClick={() => openGallery(index)} className="group relative aspect-[4/3] overflow-hidden cursor-pointer">
                    <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"><svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg></div></div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                {allImages.map((image, index) => (
                  <AnimateOnScroll key={`${image.src}-${index}`} animation="fade-up" delay={index * 30} className={getGridSpan(index)}>
                    <button onClick={() => openGallery(index)} className="group relative w-full h-full overflow-hidden cursor-pointer">
                      <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"><svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg></div></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"><p className="text-white text-sm font-medium">{image.alt}</p></div>
                    </button>
                  </AnimateOnScroll>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <AnimateOnScroll animation="fade-up">
              <h2 className="font-serif text-2xl md:text-3xl mb-4">{t.ctaTitle}</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">{t.ctaText}</p>
              <button onClick={() => openBookingModal()} className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-medium hover:bg-white/90 transition-colors">
                {t.cta}
              </button>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <ImageGalleryModal images={filteredImages} initialIndex={galleryIndex} isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
      <Footer locale={locale} />
    </>
  )
}
