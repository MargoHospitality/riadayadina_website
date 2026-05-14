"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageGalleryModalProps {
  images: { src: string; alt: string }[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
  title?: string
}

export function ImageGalleryModal({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  title,
}: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
      if (e.key !== "Tab") return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, goToPrevious, goToNext])

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      document.body.style.overflow = "hidden"
      window.setTimeout(() => closeButtonRef.current?.focus(), 0)
    } else {
      document.body.style.overflow = ""
      previousFocusRef.current?.focus()
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={title || "Galerie photo"} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/10 h-12 w-12"
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Fermer</span>
      </Button>

      {/* Title */}
      {title && (
        <div className="absolute top-4 left-4 z-10">
          <h3 className="text-white font-serif text-xl">{title}</h3>
          <p className="text-white/60 text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      )}

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 h-14 w-14"
      >
        <ChevronLeft className="h-8 w-8" />
        <span className="sr-only">Image précédente</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 h-14 w-14"
      >
        <ChevronRight className="h-8 w-8" />
        <span className="sr-only">Image suivante</span>
      </Button>

      {/* Main image */}
      <div className="relative w-full h-full max-w-6xl max-h-[80vh] mx-auto px-16">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Afficher l’image ${index + 1} : ${image.alt}`}
            aria-current={currentIndex === index ? "true" : undefined}
            className={cn(
              "relative w-16 h-16 flex-shrink-0 overflow-hidden transition-all duration-200",
              currentIndex === index
                ? "ring-2 ring-white opacity-100"
                : "opacity-50 hover:opacity-75"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
