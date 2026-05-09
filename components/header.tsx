"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Home, Building2, Bed, UtensilsCrossed, Sparkles, Image as ImageIcon, Tag, Phone, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookingModal } from "@/components/booking-modal-provider"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Le Riad", href: "/le-riad", icon: Building2 },
  { name: "Chambres & Suites", href: "/chambres-suites", icon: Bed },
  { name: "Restaurant", href: "/restaurant", icon: UtensilsCrossed },
  { name: "Spa", href: "/spa", icon: Sparkles },
  { name: "Galerie", href: "/galerie", icon: ImageIcon },
  { name: "Nos Offres", href: "/offres", icon: Tag },
  { name: "Contact", href: "/contact", icon: Phone },
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
    <>
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
                  : "block h-12 md:h-20 lg:h-24"
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
                  ? "block h-12 md:h-20 lg:h-24" 
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

      </header>

      {/* Mobile Menu - Bottom Sheet (Outside header to avoid positioning issues) */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-[100] animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Bottom Sheet */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[101] bg-background rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Header with centered logo */}
            <div className="flex items-center justify-center px-5 py-4 border-b border-border relative">
              <Image
                src="/images/logo-ayadina.png"
                alt="Riad Ayadina & Spa"
                width={280}
                height={80}
                className="h-20 w-auto"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* CTA at top */}
            <div className="px-4 py-3 border-b border-border">
              <Button 
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openBookingModal()
                }}
                className="w-full rounded-none py-4 text-sm tracking-wide"
              >
                Réserver en direct
              </Button>
            </div>
            
            {/* Navigation list */}
            <nav className="max-h-[60vh] overflow-y-auto">
              {navigation.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-5 py-4 border-b border-border/50 transition-colors",
                      index === 0 
                        ? "bg-accent/20" 
                        : "hover:bg-secondary/50"
                    )}
                  >
                    <Icon className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="flex-1 text-sm text-foreground">{item.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                )
              })}
            </nav>
            
            {/* Safe area for iOS */}
            <div className="h-6 bg-background" />
          </div>
        </>
      )}
    </>
  )
}
