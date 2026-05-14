"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useBookingModal } from "@/components/booking-modal-provider"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle,
  MessageCircle,
  Car,
  Plane
} from "lucide-react"

const CONTACT_EMAIL = "booking@riadayadinamarrakech.net"

export default function ContactPage() {
  const { openBookingModal } = useBookingModal()
  const [formState, setFormState] = useState<"idle" | "sent">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = formData.subject.trim() || "Demande de contact - Riad Ayadina"
    const body = [
      `Nom : ${formData.name}`,
      `Email : ${formData.email}`,
      formData.phone ? `Téléphone : ${formData.phone}` : undefined,
      "",
      formData.message,
    ].filter(Boolean).join("\n")

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setFormState("sent")
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero - Full width map with overlay */}
        <section className="relative h-[50vh] min-h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d850!2d-7.9910599518011445!3d31.643761241168207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee43a9d5b5e7%3A0xriadayadina!2sRiad%20Ayadina%20%26%20Spa!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale"
            title="Carte d’accès au Riad Ayadina à Marrakech"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-sm uppercase tracking-[0.3em] mb-4 text-white/80">
                Nous contacter
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
                Contact et accès
              </h1>
              <p className="text-white/80 text-lg max-w-xl mx-auto">
                Notre équipe vous répond pour une réservation, un transfert ou une demande particulière
              </p>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA - Principal */}
        <section className="relative z-10 -mt-16 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <a 
                href={buildWhatsAppUrl("Bonjour, je souhaiterais des informations sur le Riad Ayadina.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#25D366] text-white p-6 md:p-8 shadow-2xl hover:bg-[#22c55e] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 flex items-center justify-center">
                    <MessageCircle className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-1">Nous contacter sur WhatsApp</h3>
                    <p className="text-white/80 text-sm">Réponse rapide garantie</p>
                  </div>
                </div>
                <div className="hidden md:block text-white/60 group-hover:translate-x-1 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {/* Phone */}
              <a 
                href="tel:+212524383881"
                className="bg-card p-6 border border-border/50 hover:border-accent/30 transition-all text-center group"
              >
                <Phone className="h-6 w-6 text-primary mx-auto mb-3" />
                <h3 className="font-medium text-foreground mb-1">Téléphone</h3>
                <p className="text-primary text-sm">+212 524 38 38 81</p>
              </a>

              {/* Email */}
              <a 
                href={`mailto:${CONTACT_EMAIL}`}
                className="bg-card p-6 border border-border/50 hover:border-accent/30 transition-all text-center group"
              >
                <Mail className="h-6 w-6 text-primary mx-auto mb-3" />
                <h3 className="font-medium text-foreground mb-1">Email</h3>
                <p className="text-primary text-sm">{CONTACT_EMAIL}</p>
              </a>

              {/* Hours */}
              <div className="bg-card p-6 border border-border/50 text-center">
                <Clock className="h-6 w-6 text-primary mx-auto mb-3" />
                <h3 className="font-medium text-foreground mb-1">Horaires</h3>
                <p className="text-muted-foreground text-sm">Tous les jours 8h-22h</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Form + Info */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              
              {/* Contact Form */}
              <div>
                <h2 className="font-serif text-3xl text-foreground mb-4">
                  Écrivez-nous directement
                </h2>
                <p className="text-muted-foreground mb-8">
                  Une question, une demande spéciale, un événement à organiser ? 
                  Nous vous répondons dans les plus brefs délais.
                </p>

                {formState === "sent" ? (
                  <div className="bg-card p-12 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-3">
                      Email préparé
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Votre email est prêt à être envoyé depuis votre messagerie. Si elle ne s&apos;est pas ouverte, écrivez-nous directement à {CONTACT_EMAIL}.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setFormState("idle")
                        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
                      }}
                      className="rounded-none"
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-card p-8 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                          Nom complet *
                        </label>
                        <Input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="rounded-none border-border"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="rounded-none border-border"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-2">
                          Téléphone
                        </label>
                        <Input
                          id="contact-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="rounded-none border-border"
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-2">
                          Sujet *
                        </label>
                        <Input
                          id="contact-subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="rounded-none border-border"
                          placeholder="Réservation, événement..."
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="rounded-none border-border resize-none"
                        placeholder="Décrivez votre demande..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full rounded-none py-6 text-base"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Préparer l&apos;email
                    </Button>
                  </form>
                )}
              </div>

              {/* Info Side */}
              <div>
                <h2 className="font-serif text-3xl text-foreground mb-4">
                  Informations pratiques
                </h2>
                <p className="text-muted-foreground mb-8">
                  Tout ce qu&apos;il faut savoir pour nous rejoindre au cœur de la médina.
                </p>

                {/* Address Card */}
                <div className="bg-card p-6 shadow-lg mb-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Adresse</h3>
                      <p className="text-muted-foreground">
                        35 Zaouia El Abassia<br />
                        Kaa El Machraa, Bab El Khemis<br />
                        Médina, Marrakech 40000, Maroc
                      </p>
                    </div>
                  </div>
                </div>

                {/* Access Card */}
                <div className="bg-card p-6 shadow-lg mb-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Accès voiture</h3>
                      <p className="text-muted-foreground">
                        Accès direct en voiture jusqu&apos;à la porte du riad. 
                        À 10m de Bab El Ayadi. Parking surveillé à proximité.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Airport Card */}
                <div className="bg-card p-6 shadow-lg mb-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Plane className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Depuis l&apos;aéroport</h3>
                      <p className="text-muted-foreground">
                        20 minutes de l&apos;aéroport Marrakech-Menara (RAK).
                        Transfert privé disponible sur demande.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="bg-card p-6 shadow-lg">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Horaires</h3>
                      <p className="text-muted-foreground mb-2">
                        Arrivée : à partir de 14h<br />
                        Départ : jusqu&apos;à 12h
                      </p>
                      <p className="text-sm text-primary">
                        Arrivée anticipée et départ tardif sur demande
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Réservez en direct, profitez pleinement
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto text-sm">
              Tarif direct Ayadina, annulation flexible, pas de prépaiement, transfert selon durée du séjour, -10% sur le spa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => openBookingModal()}
                size="lg"
                className="rounded-none px-10 py-6 bg-white text-primary hover:bg-white/90"
              >
                Réserver en direct
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-none px-10 py-6 border border-white/30 text-white bg-transparent hover:bg-white/10"
              >
                <Link href="/offres">
                  Voir nos offres
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
