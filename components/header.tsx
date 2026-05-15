"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookingModal } from "@/components/booking-modal-provider"
import { getDictionary } from "@/lib/i18n/dictionary"
import { getLocalizedPath, switchLocalePath, type Locale, type RouteKey } from "@/lib/i18n/routing"
import { cn } from "@/lib/utils"

const navigation: { key: RouteKey; labelKey: keyof ReturnType<typeof getDictionary>["nav"] }[] = [
  { key: "home", labelKey: "home" },
  { key: "riad", labelKey: "riad" },
  { key: "rooms", labelKey: "rooms" },
  { key: "restaurant", labelKey: "restaurant" },
  { key: "spa", labelKey: "spa" },
  { key: "gallery", labelKey: "gallery" },
  { key: "offers", labelKey: "offers" },
  { key: "contact", labelKey: "contact" },
]

interface HeaderProps {
  locale?: Locale
}

export function Header({ locale = "fr" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { openBookingModal } = useBookingModal()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dict = getDictionary(locale)
  const targetLocale: Locale = locale === "fr" ? "en" : "fr"
  const switchedPath = switchLocalePath(pathname || getLocalizedPath("home", locale), targetLocale)
  const languageSwitchHref = searchParams.size > 0 ? `${switchedPath}?${searchParams.toString()}` : switchedPath
  const mobileNavigationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false)
      if (event.key !== "Tab") return

      const focusable = mobileNavigationRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    window.setTimeout(() => mobileNavigationRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])')?.focus(), 0)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-2"
          : "bg-gradient-to-b from-black/30 to-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={getLocalizedPath("home", locale)} className="flex items-center">
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
                  : "block h-20 md:h-24 lg:h-24 xl:h-28"
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
                  ? "block h-20 md:h-24 lg:h-24 xl:h-28"
                  : "hidden"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={getLocalizedPath(item.key, locale)}
                className={cn(
                  "text-sm tracking-wide transition-colors duration-300 hover:opacity-70",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                {dict.nav[item.labelKey]}
              </Link>
            ))}
          </nav>

          <Link
            href={languageSwitchHref}
            className={cn(
              "hidden xl:inline-flex text-xs uppercase tracking-[0.18em] transition-colors hover:opacity-70",
              isScrolled ? "text-muted-foreground" : "text-white/80"
            )}
            aria-label={dict.nav.languageLabel}
          >
            {dict.nav.switchTo}
          </Link>

          {/* CTA */}
          <div className="hidden xl:flex items-center">
            <Button
              onClick={() => openBookingModal()}
              className={cn(
                "rounded-none px-6 py-5 text-sm tracking-wide transition-all duration-300",
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-white text-foreground hover:bg-white/90"
              )}
            >
              {dict.nav.book}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "relative z-[62] xl:hidden p-2 transition-colors duration-300",
              isMobileMenuOpen || isScrolled ? "text-foreground" : "text-white"
            )}
            aria-label={isMobileMenuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        ref={mobileNavigationRef}
        className={cn(
          "xl:hidden fixed inset-0 top-0 z-[61] bg-background/98 pt-28 backdrop-blur-lg transition-all duration-300",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-6 overflow-y-auto pb-20">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={getLocalizedPath(item.key, locale)}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-2xl text-foreground hover:text-primary transition-colors"
            >
              {dict.nav[item.labelKey]}
            </Link>
          ))}
          <Link
            href={languageSwitchHref}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
            aria-label={dict.nav.languageLabel}
          >
            {dict.nav.switchTo}
          </Link>
          <Button
            onClick={() => {
              setIsMobileMenuOpen(false)
              openBookingModal()
            }}
            className="rounded-none px-8 py-6 text-base mt-8"
          >
            {dict.nav.bookNow}
          </Button>
        </nav>
      </div>
    </header>
  )
}
