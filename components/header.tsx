"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookingModal } from "@/components/booking-modal-provider"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Le Riad", href: "/le-riad" },
  { name: "Chambres & Suites", href: "/chambres-suites" },
  { name: "Restaurant", href: "/restaurant" },
  { name: "Spa", href: "/spa" },
  { name: "Galerie", href: "/galerie" },
  { name: "Nos Offres", href: "/offres" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { openBookingModal } = useBookingModal()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-2"
          : "bg-gradient-to-b from-black/30 to-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* B&W logo for hero (before scroll) */}
            <Image
              src="/images/logo-ayadina-nb.png"
              alt="Riad Ayadina & Spa"
              width={280}
              height={80}
              className={cn(
                "w-auto transition-all duration-300",
                isScrolled 
                  ? "hidden" 
                  : "block h-20 md:h-24 lg:h-28"
              )}
              priority
            />
            {/* Color logo for scrolled header */}
            <Image
              src="/images/logo-ayadina.png"
              alt="Riad Ayadina & Spa"
              width={280}
              height={80}
              className={cn(
                "w-auto transition-all duration-300",
                isScrolled 
                  ? "block h-20 md:h-24 lg:h-28" 
                  : "hidden"
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm tracking-wide transition-colors duration-300 hover:opacity-70",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Button 
              onClick={() => openBookingModal()}
              className={cn(
                "rounded-none px-6 py-5 text-sm tracking-wide transition-all duration-300",
                isScrolled 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-white text-foreground hover:bg-white/90"
              )}
            >
              Réserver
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-white"
            )}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[72px] bg-background/98 backdrop-blur-lg transition-all duration-300",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 pb-20">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-2xl text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button 
            onClick={() => {
              setIsMobileMenuOpen(false)
              openBookingModal()
            }}
            className="rounded-none px-8 py-6 text-base mt-8"
          >
            Réserver maintenant
          </Button>
        </nav>
      </div>
    </header>
  )
}
