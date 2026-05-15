"use client"

import { useState, useEffect, useRef, type MouseEvent } from "react"
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
  const currentFlag = locale === "fr" ? "🇫🇷" : "🇬🇧"
  const targetFlag = targetLocale === "fr" ? "🇫🇷" : "🇬🇧"
  const currentLanguageLabel = locale === "fr" ? "Français" : "English"
  const targetLanguageLabel = targetLocale === "fr" ? "Français" : "English"
  const mobileNavigationRef = useRef<HTMLDivElement>(null)
  const isComparePath = pathname === "/comparer" || pathname === "/en/compare" || pathname === "/compare"
  const isOffersPath = pathname === "/offres" || pathname === "/en/offers"

  const handleHeaderNavigation = (event: MouseEvent<HTMLElement>) => {
    if (!isComparePath) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const target = event.target instanceof HTMLElement ? event.target.closest<HTMLAnchorElement>("a[href]") : null
    if (!target || !event.currentTarget.contains(target)) return
    if (target.target && target.target !== "_self") return

    const href = target.getAttribute("href")
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return

    // The compare page can keep long-running client work active; use a browser navigation
    // there so header links cannot be swallowed by client-side routing state.
    event.preventDefault()
    window.location.assign(href)
  }

  const handleBookingClick = () => {
    openBookingModal()
  }

  const handleBookingPointerDown = () => {
    if (isOffersPath) openBookingModal()
  }

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
        'a[href], button:not([disabled]):not([tabindex="-1"])'
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
    window.setTimeout(() => mobileNavigationRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled]):not([tabindex="-1"])')?.focus(), 0)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMobileMenuOpen])

  return (
    <header
      onClickCapture={handleHeaderNavigation}
      className={cn(
        "fixed top-0 left-0 right-0 z-[3000] pointer-events-auto transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-2"
          : "bg-gradient-to-b from-black/30 to-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href={getLocalizedPath("home", locale)} className="flex items-center">
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
              sizes="(max-width: 768px) 160px, 220px"
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
              sizes="(max-width: 768px) 160px, 220px"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="relative z-10 hidden xl:flex items-center gap-6">
            {navigation.map((item) => (
              <a
                key={item.key}
                href={getLocalizedPath(item.key, locale)}
                className={cn(
                  "text-sm tracking-wide transition-colors duration-300 hover:opacity-70",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                {dict.nav[item.labelKey]}
              </a>
            ))}
          </nav>

          <a
            href={languageSwitchHref}
            className={cn(
              "relative z-10",
              "hidden xl:inline-flex h-8 w-8 items-center justify-center rounded-full border text-base leading-none shadow-sm transition-all hover:scale-105",
              isScrolled ? "border-border bg-background/80 text-foreground" : "border-white/30 bg-white/10 text-white"
            )}
            aria-label={`${dict.nav.languageLabel} · ${targetLanguageLabel}`}
            title={targetLanguageLabel}
          >
            <span aria-hidden="true">{targetFlag}</span>
          </a>

          {/* CTA */}
          <div className="relative z-10 hidden xl:flex items-center">
            <Button
              type="button"
              onPointerDown={handleBookingPointerDown}
              onClick={handleBookingClick}
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
              "relative z-[3002] xl:hidden p-2 transition-all duration-300",
              isMobileMenuOpen ? "pointer-events-none opacity-0" : isScrolled ? "text-foreground" : "text-white"
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
      {isMobileMenuOpen && (
      <div
        id="mobile-navigation"
        ref={mobileNavigationRef}
        className="xl:hidden fixed inset-0 z-[3001]"
      >
        <button
          type="button"
          tabIndex={-1}
          className="absolute inset-0 bg-primary/25 backdrop-blur-[2px]"
          aria-label={dict.nav.closeMenu}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <nav
          className="absolute right-3 top-3 flex w-[88vw] max-w-[390px] flex-col overflow-hidden border border-border/70 bg-background shadow-2xl"
          style={{ height: "calc(100svh - 1.5rem)" }}
        >
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Menu</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2" aria-label={dict.nav.languageLabel}>
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent/50 bg-accent/10 text-base"
                  title={currentLanguageLabel}
                  aria-label={currentLanguageLabel}
                >
                  {currentFlag}
                </span>
                <a
                  href={languageSwitchHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-base transition-all hover:border-accent hover:bg-accent/10"
                  aria-label={`${dict.nav.languageLabel} · ${targetLanguageLabel}`}
                  title={targetLanguageLabel}
                >
                  {targetFlag}
                </a>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                aria-label={dict.nav.closeMenu}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="divide-y divide-border/60">
              {navigation.map((item) => (
                <a
                  key={item.key}
                  href={getLocalizedPath(item.key, locale)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center justify-between py-3.5 font-serif text-xl text-foreground transition-colors hover:text-primary"
                >
                  <span>{dict.nav[item.labelKey]}</span>
                  <span className="text-xs text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-border/70 bg-secondary/35 p-5">
            <Button
              type="button"
              onPointerDown={handleBookingPointerDown}
              onClick={() => {
                setIsMobileMenuOpen(false)
                handleBookingClick()
              }}
              className="w-full rounded-none py-5 text-sm tracking-wide"
            >
              {dict.nav.bookNow}
            </Button>
          </div>
        </nav>
      </div>
      )}
    </header>
  )
}
