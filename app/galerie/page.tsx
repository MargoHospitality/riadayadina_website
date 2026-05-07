"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageGalleryModal } from "@/components/image-gallery-modal"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { cn } from "@/lib/utils"

// Gallery categories with images
const galleryCategories = [
  {
    id: "riad",
    name: "Le Riad",
    images: [
      { src: "/images/patio-arbore.jpg", alt: "Patio arboré" },
      { src: "/images/acces-voiture.jpg", alt: "Entrée du riad" },
      { src: "/images/hero-riad.jpg", alt: "Vue du riad" },
    ],
  },
  {
    id: "piscine",
    name: "Piscine & Terrasse",
    images: [
      { src: "/images/piscine-rooftop.jpg", alt: "Piscine sur le toit" },
      { src: "/images/rooftop-terrace.jpg", alt: "Terrasse rooftop" },
    ],
  },
  {
    id: "chambres",
    name: "Chambres & Suites",
    images: [
      { src: "/images/chambre-alicia.jpg", alt: "Chambre Double Supérieure" },
      { src: "/images/chambre-aida.jpg", alt: "Chambre Double Supérieure" },
      { src: "/images/suite-antinea.jpg", alt: "Suite Junior" },
      { src: "/images/suite-antigua.jpg", alt: "Suite Junior" },
      { src: "/images/salle-de-bain.jpg", alt: "Salle de bain" },
    ],
  },
  {
    id: "spa",
    name: "Spa & Bien-être",
    images: [
      { src: "/images/hammam-spa.jpg", alt: "Hammam traditionnel" },
      { src: "/images/spa-hammam.jpg", alt: "Espace détente" },
      { src: "/images/spa-massage.jpg", alt: "Salle de massage" },
    ],
  },
  {
    id: "restaurant",
    name: "Restaurant & Bar",
    images: [
      { src: "/images/restaurant-terrasse.jpg", alt: "Restaurant terrasse" },
      { src: "/images/bar-lounge.jpg", alt: "Bar lounge" },
      { src: "/images/plat-tajine.jpg", alt: "Cuisine marocaine" },
      { src: "/images/breakfast-moroccan.jpg", alt: "Petit-déjeuner marocain" },
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
              src="/images/patio-arbore.jpg"
              alt="Galerie Riad Ayadina"
              fill
              className="object-cover"
              priority
              sizes="100vw"
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
            <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
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
                    "px-4 py-2 text-sm transition-all duration-300",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            {selectedCategory ? (
              // Single category view - simple grid
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <AnimateOnScroll key={index} animation="fade-up" delay={index * 50}>
                    <button
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
                  </AnimateOnScroll>
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
                href="/chambres-suites"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-medium hover:bg-white/90 transition-colors"
              >
                Réserver votre séjour
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
