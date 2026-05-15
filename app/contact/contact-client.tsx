"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useBookingModal } from "@/components/booking-modal-provider"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { getLocalizedPath, type Locale } from "@/lib/i18n/routing"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, Car, Plane, type LucideIcon } from "lucide-react"

const CONTACT_EMAIL = "booking@riadayadinamarrakech.net"

const copy = {
  fr: {
    mapTitle: "Carte d’accès au Riad Ayadina à Marrakech",
    eyebrow: "Nous contacter",
    title: "Contact et accès",
    subtitle: "Notre équipe vous répond pour une réservation, un transfert ou une demande particulière",
    whatsappMessage: "Bonjour, je souhaiterais des informations sur le Riad Ayadina.",
    whatsappTitle: "Nous contacter sur WhatsApp",
    whatsappText: "Réponse rapide garantie",
    phone: "Téléphone",
    email: "Email",
    hours: "Horaires",
    hoursValue: "Tous les jours 8h-22h",
    formTitle: "Écrivez-nous directement",
    formIntro: "Une question, une demande spéciale, un événement à organiser ? Nous vous répondons dans les plus brefs délais.",
    defaultSubject: "Demande de contact - Riad Ayadina",
    preparedTitle: "Email préparé",
    preparedText: `Votre email est prêt à être envoyé depuis votre messagerie. Si elle ne s'est pas ouverte, écrivez-nous directement à ${CONTACT_EMAIL}.`,
    another: "Envoyer un autre message",
    labels: { name: "Nom complet *", email: "Email *", phone: "Téléphone", subject: "Sujet *", message: "Message *" },
    placeholders: { name: "Votre nom", email: "votre@email.com", phone: "+33 6 12 34 56 78", subject: "Réservation, événement...", message: "Décrivez votre demande..." },
    mailLabels: { name: "Nom", email: "Email", phone: "Téléphone" },
    submit: "Préparer l'email",
    infoTitle: "Informations pratiques",
    infoIntro: "Tout ce qu'il faut savoir pour nous rejoindre au cœur de la médina.",
    addressTitle: "Adresse",
    address: <>35 Zaouia El Abassia<br />Kaa El Machraa, Bab El Khemis<br />Médina, Marrakech 40000, Maroc</>,
    carTitle: "Accès voiture",
    carText: "Accès direct en voiture jusqu'à la porte du riad. À 10m de Bab El Ayadi. Parking surveillé à proximité.",
    airportTitle: "Depuis l'aéroport",
    airportText: "20 minutes de l'aéroport Marrakech-Menara (RAK). Transfert privé disponible sur demande.",
    stayHoursTitle: "Horaires",
    stayHours: <>Arrivée : à partir de 14h<br />Départ : jusqu&apos;à 12h</>,
    stayHoursNote: "Arrivée anticipée et départ tardif sur demande",
    ctaTitle: "Réservez en direct, profitez pleinement",
    ctaText: "Tarif direct Ayadina, annulation flexible, pas de prépaiement, transfert selon durée du séjour, -10% sur le spa.",
    book: "Réserver en direct",
    offers: "Voir nos offres",
  },
  en: {
    mapTitle: "Access map for Riad Ayadina in Marrakech",
    eyebrow: "Contact us",
    title: "Contact and access",
    subtitle: "Our team will reply for bookings, transfers, restaurant tables, spa treatments or special requests",
    whatsappMessage: "Hello, I would like information about Riad Ayadina.",
    whatsappTitle: "Contact us on WhatsApp",
    whatsappText: "Fast reply guaranteed",
    phone: "Phone",
    email: "Email",
    hours: "Opening hours",
    hoursValue: "Every day 8am-10pm",
    formTitle: "Write to us directly",
    formIntro: "A question, special request or event to organise? We will reply as quickly as possible.",
    defaultSubject: "Contact request - Riad Ayadina",
    preparedTitle: "Email prepared",
    preparedText: `Your email is ready to send from your mail app. If it did not open, write to us directly at ${CONTACT_EMAIL}.`,
    another: "Send another message",
    labels: { name: "Full name *", email: "Email *", phone: "Phone", subject: "Subject *", message: "Message *" },
    placeholders: { name: "Your name", email: "you@email.com", phone: "+44 7000 000000", subject: "Booking, event...", message: "Tell us about your request..." },
    mailLabels: { name: "Name", email: "Email", phone: "Phone" },
    submit: "Prepare email",
    infoTitle: "Practical information",
    infoIntro: "Everything you need to know to reach us in the heart of the Medina.",
    addressTitle: "Address",
    address: <>35 Zaouia El Abassia<br />Kaa El Machraa, Bab El Khemis<br />Medina, Marrakech 40000, Morocco</>,
    carTitle: "Car access",
    carText: "Direct car access to the riad door. Just 10 m from Bab El Ayadi, with guarded parking nearby.",
    airportTitle: "From the airport",
    airportText: "20 minutes from Marrakech-Menara Airport (RAK). Private transfers available on request.",
    stayHoursTitle: "Check-in / check-out",
    stayHours: <>Check-in: from 2pm<br />Check-out: until 12 noon</>,
    stayHoursNote: "Early check-in and late check-out on request",
    ctaTitle: "Book direct and enjoy the full Ayadina experience",
    ctaText: "Ayadina direct rate, flexible cancellation, no prepayment, transfer depending on length of stay and 10% off spa treatments.",
    book: "Book direct",
    offers: "View direct offers",
  },
} as const

export default function ContactPage({ locale = "fr" }: { locale?: Locale }) {
  const { openBookingModal } = useBookingModal()
  const [formState, setFormState] = useState<"idle" | "sent">("idle")
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const t = copy[locale]

  const resetForm = () => setFormData({ name: "", email: "", phone: "", subject: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = formData.subject.trim() || t.defaultSubject
    const body = [
      `${t.mailLabels.name} : ${formData.name}`,
      `${t.mailLabels.email} : ${formData.email}`,
      formData.phone ? `${t.mailLabels.phone} : ${formData.phone}` : undefined,
      "",
      formData.message,
    ].filter(Boolean).join("\n")

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setFormState("sent")
  }

  return (
    <>
      <Header locale={locale} />
      <main>
        <section className="relative h-[50vh] min-h-[400px]">
          <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d850!2d-7.9910599518011445!3d31.643761241168207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee43a9d5b5e7%3A0xriadayadina!2sRiad%20Ayadina%20%26%20Spa!5e0!3m2!1s${locale}!2sma!4v1700000000000!5m2!1s${locale}!2sma`} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="grayscale" title={t.mapTitle} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <p className="text-sm uppercase tracking-[0.3em] mb-4 text-white/80">{t.eyebrow}</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">{t.title}</h1>
              <p className="text-white/80 text-lg max-w-xl mx-auto">{t.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-8 pb-12">
          <div className="container mx-auto px-4 text-center">
            <a
              href={buildWhatsAppUrl(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#25D366]/35 bg-card/95 px-5 py-3 text-sm text-foreground shadow-lg backdrop-blur transition-all hover:-translate-y-0.5 hover:border-[#25D366]/60 hover:shadow-xl"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/12 text-[#128C4A]">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span className="text-left">
                <span className="block font-medium">WhatsApp</span>
                <span className="block text-xs text-muted-foreground">{t.whatsappText}</span>
              </span>
            </a>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4"><div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <a href="tel:+212524383881" className="bg-card p-6 border border-border/50 hover:border-accent/30 transition-all text-center group"><Phone className="h-6 w-6 text-primary mx-auto mb-3" /><h3 className="font-medium text-foreground mb-1">{t.phone}</h3><p className="text-primary text-sm">+212 524 38 38 81</p></a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="bg-card p-6 border border-border/50 hover:border-accent/30 transition-all text-center group"><Mail className="h-6 w-6 text-primary mx-auto mb-3" /><h3 className="font-medium text-foreground mb-1">{t.email}</h3><p className="text-primary text-sm">{CONTACT_EMAIL}</p></a>
            <div className="bg-card p-6 border border-border/50 text-center"><Clock className="h-6 w-6 text-primary mx-auto mb-3" /><h3 className="font-medium text-foreground mb-1">{t.hours}</h3><p className="text-muted-foreground text-sm">{t.hoursValue}</p></div>
          </div></div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4"><div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <h2 className="font-serif text-3xl text-foreground mb-4">{t.formTitle}</h2>
              <p className="text-muted-foreground mb-8">{t.formIntro}</p>
              {formState === "sent" ? (
                <div className="bg-card p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="h-10 w-10 text-green-600" /></div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">{t.preparedTitle}</h3>
                  <p className="text-muted-foreground mb-6">{t.preparedText}</p>
                  <Button variant="outline" onClick={() => { setFormState("idle"); resetForm() }} className="rounded-none">{t.another}</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card p-8 shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Field id="contact-name" label={t.labels.name}><Input id="contact-name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="rounded-none border-border" placeholder={t.placeholders.name} /></Field>
                    <Field id="contact-email" label={t.labels.email}><Input id="contact-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-none border-border" placeholder={t.placeholders.email} /></Field>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Field id="contact-phone" label={t.labels.phone}><Input id="contact-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="rounded-none border-border" placeholder={t.placeholders.phone} /></Field>
                    <Field id="contact-subject" label={t.labels.subject}><Input id="contact-subject" type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="rounded-none border-border" placeholder={t.placeholders.subject} /></Field>
                  </div>
                  <div className="mb-6"><label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">{t.labels.message}</label><Textarea id="contact-message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="rounded-none border-border resize-none" placeholder={t.placeholders.message} /></div>
                  <Button type="submit" className="w-full rounded-none py-6 text-base"><Send className="h-4 w-4 mr-2" />{t.submit}</Button>
                </form>
              )}
            </div>

            <div>
              <h2 className="font-serif text-3xl text-foreground mb-4">{t.infoTitle}</h2>
              <p className="text-muted-foreground mb-8">{t.infoIntro}</p>
              <InfoCard icon={MapPin} title={t.addressTitle}>{t.address}</InfoCard>
              <InfoCard icon={Car} title={t.carTitle}>{t.carText}</InfoCard>
              <InfoCard icon={Plane} title={t.airportTitle}>{t.airportText}</InfoCard>
              <InfoCard icon={Clock} title={t.stayHoursTitle} last><p className="text-muted-foreground mb-2">{t.stayHours}</p><p className="text-sm text-primary">{t.stayHoursNote}</p></InfoCard>
            </div>
          </div></div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">{t.ctaTitle}</h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto text-sm">{t.ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => openBookingModal()} size="lg" className="rounded-none px-10 py-6 bg-white text-primary hover:bg-white/90">{t.book}</Button>
              <Button asChild size="lg" className="rounded-none px-10 py-6 border border-white/30 text-white bg-transparent hover:bg-white/10"><Link href={getLocalizedPath("offers", locale)}>{t.offers}</Link></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return <div><label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">{label}</label>{children}</div>
}

function InfoCard({ icon: Icon, title, children, last = false }: { icon: LucideIcon; title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`bg-card p-6 shadow-lg ${last ? "" : "mb-6"}`}>
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0"><Icon className="h-6 w-6 text-primary" /></div>
        <div><h3 className="font-medium text-foreground mb-1">{title}</h3><div className="text-muted-foreground">{children}</div></div>
      </div>
    </div>
  )
}
