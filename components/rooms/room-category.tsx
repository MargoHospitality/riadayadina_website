"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Images, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageGalleryModal } from "@/components/image-gallery-modal"
import { cn } from "@/lib/utils"

interface RoomCategoryProps {
  title: string
  subtitle: string
  description: string
  forWho?: string
  roomCount: number
  surfaceRange: string
  features: string[]
  images: { src: string; alt: string }[]
  variant?: "light" | "dark"
}

export function RoomCategory({
  title,
  subtitle,
  description,
  forWho,
  roomCount,
  surfaceRange,
  features,
  images,
  variant = "light",
}: RoomCategoryProps) {
  const [galleryOpen, setGalleryOpen] = useState(false)

  const isDark = variant === "dark"

  return (
    <>
      <section
        className={cn(
          "py-20 md:py-28 overflow-hidden",
          isDark ? "bg-primary text-primary-foreground" : "bg-background"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className={cn(isDark && "lg:order-2")}>
              {/* Badge */}
              <div className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider mb-6",
                isDark ? "bg-accent/20 text-accent" : "bg-primary/10 text-primary"
              )}>
                <span>{roomCount} chambres</span>
                <span className="opacity-50">•</span>
                <span>{surfaceRange}</span>
              </div>

              {/* Title */}
              <h2 className={cn(
                "font-serif text-3xl md:text-4xl lg:text-5xl mb-4",
                isDark ? "text-primary-foreground" : "text-foreground"
              )}>
                {title}
              </h2>
              
              <p className={cn(
                "text-lg mb-2",
                isDark ? "text-accent" : "text-primary"
              )}>
                {subtitle}
              </p>

              <p className={cn(
                "text-base leading-relaxed mb-4",
                isDark ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {description}
              </p>

              {forWho && (
                <p className={cn(
                  "text-sm italic mb-8 pb-6 border-b",
                  isDark ? "text-accent border-white/10" : "text-accent border-border/50"
                )}>
                  {forWho}
                </p>
              )}

              {/* Features */}
              <div className="mb-8">
                <h3 className={cn(
                  "text-xs uppercase tracking-[0.2em] mb-4",
                  isDark ? "text-primary-foreground/50" : "text-muted-foreground"
                )}>
                  Équipements & Services
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2.5">
                      <div className={cn(
                        "flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center",
                        isDark ? "bg-accent" : "bg-primary"
                      )}>
                        <Check className={cn(
                          "h-2.5 w-2.5",
                          isDark ? "text-accent-foreground" : "text-primary-foreground"
                        )} />
                      </div>
                      <span className={cn(
                        "text-sm",
                        isDark ? "text-primary-foreground/80" : "text-foreground"
                      )}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Button
                asChild
                size="lg"
                className={cn(
                  "rounded-none px-8 py-6 text-base tracking-wide group",
                  isDark
                    ? "bg-white text-primary hover:bg-white/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <a href="#booking">
                  Réserver en direct
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            {/* Right: Bento Gallery */}
            <div className={cn(isDark && "lg:order-1")}>
              <button
                onClick={() => setGalleryOpen(true)}
                className="group relative w-full cursor-pointer"
                aria-label={`Voir la galerie des ${title}`}
              >
                {/* Bento Grid Layout */}
                <div className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-3">
                  {/* Main large image */}
                  <div className="col-span-2 row-span-2 relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={images[0]?.src || "/images/placeholder.jpg"}
                      alt={images[0]?.alt || title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 66vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  
                  {/* Top right image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={images[1]?.src || "/images/placeholder.jpg"}
                      alt={images[1]?.alt || title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 33vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  
                  {/* Bottom right image with overlay */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={images[2]?.src || "/images/placeholder.jpg"}
                      alt={images[2]?.alt || title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 33vw, 16vw"
                    />
                    {/* Gallery indicator overlay */}
                    <div className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center transition-all duration-300",
                      "bg-black/40 group-hover:bg-black/60"
                    )}>
                      <Images className="h-6 w-6 md:h-8 md:w-8 text-white mb-1 md:mb-2" />
                      <span className="text-white text-xs md:text-sm font-medium">
                        +{images.length} photos
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className={cn(
                  "absolute -inset-2 md:-inset-3 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                  isDark ? "border-accent/50" : "border-primary/30"
                )} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <ImageGalleryModal
        images={images}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title={title}
      />
    </>
  )
}
