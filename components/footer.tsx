"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, Car } from "lucide-react"
import { useBookingModal } from "@/components/booking-modal-provider"

const footerLinks = {
  decouvrir: [
    { name: "Le Riad", href: "/le-riad" },
    { name: "Chambres & Suites", href: "/chambres-suites" },
    { name: "Restaurant & Bar", href: "/restaurant" },
    { name: "Spa & Bien-être", href: "/spa" },
    { name: "Galerie", href: "/galerie" },
  ],
  reserver: [
    { name: "Nos Offres Exclusives", href: "/offres" },
    { name: "Nous contacter", href: "/contact" },
  ],
}

// Tripadvisor icon component
function TripadvisorIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm7 0c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
      <circle cx="10.5" cy="13" r="1.5" />
      <circle cx="17.5" cy="13" r="1.5" />
      <path d="M12 6c-2.67 0-5.07.94-7 2.5h2.5c1.17-.63 2.5-1 3.5-1s2.33.37 3.5 1H19c-1.93-1.56-4.33-2.5-7-2.5z" />
    </svg>
  )
}

// Google icon component
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

export function Footer() {
  const { openBookingModal } = useBookingModal()
  
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Contact - Takes more space */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-ayadina-outline.png"
                alt="Riad Ayadina & Spa"
                width={200}
                height={60}
                className="h-16 md:h-20 w-auto"
              />
            </Link>
            
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
              1200m² de sérénité au coeur de la médina de Marrakech. 
              Spa, piscine chauffée sur le toit, restaurant avec licence alcool.
            </p>

            {/* Contact rapide - WhatsApp en premier */}
            <div className="space-y-3 mb-8">
              <a
                href="https://wa.me/212524383881"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-accent transition-colors group"
              >
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-sm font-medium">WhatsApp</span>
                  <span className="text-xs text-white/50 block">Réponse rapide</span>
                </div>
              </a>
              
              <a
                href="tel:+212524383881"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-sm">+212 524 38 38 81</span>
              </a>
              
              <a
                href="mailto:contact@riadayadina.com"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-sm">contact@riadayadina.com</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2">
              <a
                href="https://www.instagram.com/riadayadina/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/RiadAyadina.Spa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.tripadvisor.com/Hotel_Review-g293734-d585332-Reviews-Riad_Ayadina_et_SPa-Marrakech_Marrakech_Safi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Tripadvisor"
              >
                <TripadvisorIcon className="h-4 w-4" />
              </a>
              <a
                href="https://g.page/riad-ayadina-spa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Google"
              >
                <GoogleIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Découvrir */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">Découvrir</h3>
            <ul className="space-y-3">
              {footerLinks.decouvrir.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réserver */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">Réserver</h3>
            <ul className="space-y-3">
              {footerLinks.reserver.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => openBookingModal()}
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Réserver en direct
                </button>
              </li>
            </ul>
          </div>

          {/* Adresse & Accès */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">Nous trouver</h3>
            
            <div className="space-y-4">
              <a
                href="https://maps.google.com/?q=35+Zaouia+El+Abassia+Marrakech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  35 Zaouia El Abassia<br />
                  Bab El Khemis, Médina<br />
                  Marrakech 40000
                </span>
              </a>
              
              <div className="flex items-start gap-3 text-white/60">
                <Car className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  Accès voiture direct<br />
                  <span className="text-white/40">à 10m de Bab El Ayadi</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Margo + Legal */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Margo */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/margo-hospitality-white.png"
                alt="Margo Hospitality"
                width={100}
                height={25}
                className="h-5 w-auto opacity-60"
              />
              <span className="text-white/40 text-xs">
                Membre du réseau Margo Hospitality
              </span>
            </div>
            
            {/* Legal */}
            <div className="flex items-center gap-6 text-xs text-white/40">
              <Link href="/mentions-legales" className="hover:text-white/60 transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="hover:text-white/60 transition-colors">
                Confidentialité
              </Link>
              <span>© 2025 Riad Ayadina</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
