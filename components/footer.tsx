"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react"

const footerLinks = {
  riad: [
    { name: "Le Riad", href: "/le-riad" },
    { name: "Chambres & Suites", href: "/chambres-suites" },
    { name: "Restaurant", href: "/restaurant" },
    { name: "Spa", href: "/spa" },
    { name: "Nos Offres", href: "/offres" },
  ],
  partenaires: [
    { name: "Margo Hospitality", href: "https://margohospitality.com", external: true },
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

export function Footer() {
  return (
    <footer id="contact" className="bg-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-ayadina-outline.png"
                alt="Riad Ayadina & Spa"
                width={280}
                height={80}
                className="h-20 md:h-24 lg:h-28 w-auto"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              1200m² de sérénité au cœur de la médina. Spa, piscine chauffée, restaurant avec licence alcool. Un havre de paix d&apos;exception.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/riadayadina/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/RiadAyadina.Spa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.tripadvisor.com/Hotel_Review-g293734-d585332-Reviews-Riad_Ayadina_et_SPa-Marrakech_Marrakech_Safi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Tripadvisor"
              >
                <TripadvisorIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links - Le Riad */}
          <div>
            <h3 className="font-serif text-lg mb-6">Le Riad</h3>
            <ul className="space-y-3">
              {footerLinks.riad.map((link) => (
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

          {/* Links - Partenaires */}
          <div>
            <h3 className="font-serif text-lg mb-6">Nos Partenaires</h3>
            <ul className="space-y-3">
              {footerLinks.partenaires.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=35+Zaouia+El+Abassia+Marrakech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>
                    35 Zaouia El Abassia<br />
                    Kaa El Machraa, Bab El Khemis<br />
                    Médina, Marrakech 40000
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+212524383881"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span>+212 524 38 38 81</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@riadayadina.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span>contact@riadayadina.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 text-sm text-white">
            <Image
              src="/images/margo-hospitality-white.png"
              alt="Margo Hospitality"
              width={120}
              height={30}
              className="h-6 w-auto"
            />
            <p className="text-white/70">
              Riad Ayadina est membre de Margo Hospitality - Réseau de Boutique Hôtels et Riads au Maroc
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
