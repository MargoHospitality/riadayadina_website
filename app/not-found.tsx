import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/patio-arbore.jpg"
          alt="Patio du Riad Ayadina"
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
          <Link href="/" className="inline-block mb-12">
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
            Page introuvable
          </h2>
          
          <p className="text-muted-foreground mb-10">
            Il semble que vous vous soyez perdu dans les ruelles de la médina. 
            Laissez-nous vous guider vers le riad.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="rounded-none px-8 py-6">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Retour à l&apos;accueil
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-none px-8 py-6">
              <Link href="/contact">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Nous contacter
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
