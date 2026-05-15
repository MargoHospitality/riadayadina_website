import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingPopupButton } from "@/components/booking-popup-button"
import { TestimonialsSection } from "@/components/testimonials-section"
import { createPageMetadata } from "@/lib/i18n/metadata"

export const metadata: Metadata = createPageMetadata("offers", "en")

const benefits = ["Official Ayadina direct rate", "No prepayment", "Flexible cancellation", "Direct contact with the riad", "Welcome cocktail", "Spa discount according to stay conditions", "Airport transfer according to length of stay"]
export default function EnglishOffersPage() { return <><Header locale="en" /><main><section className="py-28 bg-primary text-primary-foreground"><div className="container mx-auto px-4 max-w-4xl"><p className="uppercase tracking-[0.2em] text-sm opacity-70 mb-5">Direct offers</p><h1 className="font-serif text-5xl md:text-6xl mb-6">Book on the official website and keep the direct line open.</h1><p className="text-lg opacity-85 mb-8">The official Ayadina booking engine gives you simple conditions, direct contact and thoughtful benefits reserved for guests who book direct.</p><BookingPopupButton variant="secondary">Check direct rates</BookingPopupButton></div></section><section className="py-20"><div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">{benefits.map((benefit) => <div key={benefit} className="border border-border/50 p-6 bg-card"><p className="font-medium">{benefit}</p></div>)}</div></section><section className="pb-20"><div className="container mx-auto px-4 max-w-3xl text-center"><h2 className="font-serif text-4xl mb-4">Simple, official, direct.</h2><p className="text-muted-foreground mb-8">For special occasions, transfers, spa treatments or restaurant bookings, the riad team can help before you arrive.</p><BookingPopupButton>Book direct</BookingPopupButton></div></section><TestimonialsSection locale="en" /></main><Footer locale="en" /></> }
