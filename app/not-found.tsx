"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

const copy = {
  fr: {
    imageAlt: "Patio du Riad Ayadina",
    title: "Page introuvable",
    text: "Il semble que vous vous soyez perdu dans les ruelles de la médina. Laissez-nous vous guider vers le riad.",
    home: "Retour à l'accueil",
    contact: "Nous contacter",
    homeHref: "/",
    contactHref: "/contact",
  },
  en: {
    imageAlt: "Riad Ayadina patio",
    title: "Page not found",
    text: "It looks like you took a wrong turn in the Medina. Let us guide you back to the riad.",
    home: "Back to home",
    contact: "Contact us",
    homeHref: "/en",
    contactHref: "/en/contact",
  },
} as const

export default function NotFound() {
  const pathname = usePathname()
  const locale = pathname?.startsWith("/en") ? "en" : "fr"
  const t = copy[locale]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/patio-arbore.jpg"
          alt={t.imageAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-lg">
          {/* Logo */}
          <Link href={t.homeHref} className="inline-block mb-12">
            <Image
              src="/images/logo-ayadina.png"
              alt="Riad Ayadina"
              width={200}
              height={60}
              className="h-16 w-auto mx-auto"
            />
          </Link>

          {/* 404 */}
          <h1 className="font-serif text-8xl md:text-9xl text-primary mb-4">404</h1>
          
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            {t.title}
          </h2>
          
          <p className="text-muted-foreground mb-10">
            {t.text}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="rounded-none px-8 py-6">
              <Link href={t.homeHref}>
                <Home className="mr-2 h-4 w-4" />
                {t.home}
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-none px-8 py-6">
              <Link href={t.contactHref}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.contact}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="relative z-10 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Riad Ayadina & Spa - Marrakech
        </p>
      </div>
    </div>
  )
}
