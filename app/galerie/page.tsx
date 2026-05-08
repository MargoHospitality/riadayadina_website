"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageGalleryModal } from "@/components/image-gallery-modal"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { cn } from "@/lib/utils"

// Gallery categories with images and descriptions for decision-making
const galleryCategories = [
  {
    id: "riad",
    name: "Riad & patios",
    description: "Patios arborés, salons et architecture traditionnelle",
    cta: { label: "Découvrir le Riad", href: "/le-riad" },
    images: [
      { src: "/images/ayadina/gallery-patio-jour-04.jpg", alt: "Patio principal du Riad Ayadina" },
      { src: "/images/ayadina/patio-tableolivier-jour-01.jpg", alt: "Patio et table sous l'olivier" },
      { src: "/images/ayadina/gallery-patio-nuit-02.jpg", alt: "Patio illuminé de nuit" },
      { src: "/images/ayadina/gallery-salon-jour-02.jpg", alt: "Salon traditionnel du riad" },
      { src: "/images/ayadina/gallery-salon-marocain-01.jpg", alt: "Salon marocain" },
      { src: "/images/ayadina/cactus-01.jpg", alt: "Détail extérieur du riad" },
    ],
  },
  {
    id: "chambres",
    name: "Chambres supérieures",
    description: "Aida, Adelina et Alicia — 17 à 22m²",
    cta: { label: "Voir les chambres", href: "/chambres-suites" },
    images: [
      { src: "/images/ayadina/adelina-chambre-04.jpg", alt: "Chambre Adelina" },
      { src: "/images/ayadina/aida-chambre-02.jpg", alt: "Chambre Aida" },
      { src: "/images/ayadina/alicia-chambre-07.jpg", alt: "Chambre Alicia" },
      { src: "/images/ayadina/aida-patiobalcon-01.jpg", alt: "Balcon de la chambre Aida" },
      { src: "/images/ayadina/adelina-salon-01.jpg", alt: "Salon de la chambre Adelina" },
      { src: "/images/ayadina/alicia-sallebain-01.jpg", alt: "Salle de bain Alicia" },
    ],
  },
  {
    id: "suites",
    name: "Suites junior",
    description: "Six suites avec salons privatifs — 24 à 36m²",
    cta: { label: "Voir les suites", href: "/chambres-suites" },
    images: [
      { src: "/images/ayadina/ambrosia-chambre-06.jpg", alt: "Suite Ambrosia" },
      { src: "/images/ayadina/ahisia-chambre-07.jpg", alt: "Suite Ahisia" },
      { src: "/images/ayadina/antinea-chambre-05.jpg", alt: "Suite Antinea" },
      { src: "/images/ayadina/antiqua-chambre-04.jpg", alt: "Suite Antiqua" },
      { src: "/images/ayadina/atina-chambre-01.jpg", alt: "Suite Atina" },
      { src: "/images/ayadina/atina-sallebain-01.jpg", alt: "Salle de bain de suite" },
    ],
  },
  {
    id: "spa-piscine",
    name: "Spa & piscine",
    description: "Hammam, massages, piscine chauffée et solarium",
    cta: { label: "Découvrir le Spa", href: "/spa" },
    images: [
      { src: "/images/ayadina/piscine-jour-01.jpg", alt: "Piscine chauffée du rooftop" },
      { src: "/images/ayadina/gallery-piscine-jour-02.jpg", alt: "Terrasse piscine" },
      { src: "/images/ayadina/gallery-hammam-riad-102.jpg", alt: "Hammam traditionnel" },
      { src: "/images/ayadina-home/riad-103.jpg", alt: "Les Bains d'Ayadina" },
      { src: "/images/ayadina/gallery-sallemassages-01.jpg", alt: "Salle de massage" },
    ],
  },
  {
    id: "restaurant",
    name: "Restaurant & bar",
    description: "Patio, bibliothèque bar, terrasse et petit-déjeuner",
    cta: { label: "Voir la carte", href: "/restaurant" },
    images: [
      { src: "/images/ayadina/patio-fontaine-nuit-01.jpg", alt: "Patio restaurant de nuit" },
      { src: "/images/ayadina/bibliothequebar-plafond-jour-02.jpg", alt: "Bibliothèque bar" },
      { src: "/images/ayadina/gallery-bibliothequebar-jour-01.jpg", alt: "Bar lounge" },
      { src: "/images/ayadina/gallery-terrasse-tablecentrale-nuit-01.jpg", alt: "Table centrale sur la terrasse" },
      { src: "/images/ayadina/gallery-terrasse-jour-01.jpg", alt: "Terrasse de jour" },
      { src: "/images/ayadina/gallery-petitdejeuner-terrasse-03.jpg", alt: "Petit-déjeuner en terrasse" },
    ],
  },
]

// Flatten all images for the modal
const allImages = galleryCategories.flatMap(cat => cat.images)

// Masonry-style grid pattern
const getGridSpan = (index: number) => {
  const patterns = [
    "col-span-2 row-span-2", // Large
    "col-span-1 row-span-1", // Small
    "col-span-1 row-span-2", // Tall
    "col-span-1 row-span-1", // Small
    "col-span-2 row-span-1", // Wide
    "col-span-1 row-span-1", // Small
    "col-span-1 row-span-1", // Small
    "col-span-1 row-span-2", // Tall
    "col-span-2 row-span-1", // Wide
    "col-span-1 row-span-1", // Small
  ]
  return patterns[index % patterns.length]
}

export default function GaleriePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const filteredImages = selectedCategory 
    ? galleryCategories.find(cat => cat.id === selectedCategory)?.images || []
    : allImages

  const openGallery = (index: number) => {
    setGalleryIndex(index)
    setGalleryOpen(true)
  }

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/ayadina/gallery-patio-jour-04.jpg"
              alt="Galerie Riad Ayadina"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              style={{ objectPosition: "50% 45%" }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <AnimateOnScroll animation="fade-up">
              <p className="text-white/80 text-sm uppercase tracking-[0.3em] mb-4">
                Découvrez
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                Notre Galerie
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Plongez dans l&apos;univers d&apos;Ayadina à travers nos espaces
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "px-4 py-2 text-sm transition-all duration-300",
                  selectedCategory === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                Tout voir
              </button>
              {galleryCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 text-sm transition-all duration-300 flex flex-col items-center",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <span>{category.name}</span>
                  <span className={cn(
                    "text-[10px] hidden md:block",
                    selectedCategory === category.id ? "text-primary-foreground/70" : "text-muted-foreground/60"
                  )}>
                    {category.images.length} photos
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Category Info Bar - when filtered */}
        {selectedCategory && (
          <section className="bg-secondary/50 py-6">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div>
                  <h2 className="font-serif text-xl text-foreground">
                    {galleryCategories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {galleryCategories.find(c => c.id === selectedCategory)?.description}
                  </p>
                </div>
                <a 
                  href={galleryCategories.find(c => c.id === selectedCategory)?.cta.href}
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
                >
                  {galleryCategories.find(c => c.id === selectedCategory)?.cta.label}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Gallery Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            {selectedCategory ? (
              // Single category view - simple grid
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <button
                    key={`${selectedCategory}-${image.src}`}
                    onClick={() => openGallery(index)}
                    className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              // All images - masonry-style grid
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                {allImages.map((image, index) => (
                  <AnimateOnScroll 
                    key={index} 
                    animation="fade-up" 
                    delay={index * 30}
                    className={getGridSpan(index)}
                  >
                    <button
                      onClick={() => openGallery(index)}
                      className="group relative w-full h-full overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                        </div>
                      </div>
                      {/* Category label on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium">{image.alt}</p>
                      </div>
                    </button>
                  </AnimateOnScroll>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <AnimateOnScroll animation="fade-up">
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                Envie de vivre l&apos;expérience ?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Les photos ne racontent qu&apos;une partie de l&apos;histoire. 
                Venez découvrir Ayadina par vous-même.
              </p>
              <a 
                href="/#booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-medium hover:bg-white/90 transition-colors"
              >
                Réserver en direct
              </a>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      {/* Gallery Modal */}
      <ImageGalleryModal
        images={filteredImages}
        initialIndex={galleryIndex}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      <Footer />
    </>
  )
}
