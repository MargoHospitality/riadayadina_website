"use client"

import Image from "next/image"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import type { Locale } from "@/lib/i18n/routing"

const copy = {
  fr: {
    imageAlt: "Patio arboré du Riad Ayadina",
    eyebrow: "L'esprit Ayadina",
    title: <>Le calme retrouvé,<br /><span className="italic text-primary/80">au cœur de la médina</span></>,
    paragraphs: [
      "Passée la porte d'entrée, le tumulte de Marrakech s'efface. Trois patios plantés d'orangers et de jasmins dessinent un parcours de fraîcheur et de silence. L'eau murmure, la lumière joue sur le zellige.",
      "Ici, on prend le temps. Un thé à la menthe sur la terrasse, un massage au hammam, un dîner aux chandelles sous les étoiles. Ayadina est une maison de riad : une parenthèse de calme au cœur de Marrakech.",
    ],
    stats: [
      ["1 200 m²", "de sérénité"],
      ["3", "patios arborés"],
      ["9", "chambres singulières"],
    ],
  },
  en: {
    imageAlt: "Leafy patio at Riad Ayadina",
    eyebrow: "The spirit of Ayadina",
    title: <>A calmer rhythm,<br /><span className="italic text-primary/80">inside the Medina</span></>,
    paragraphs: [
      "Beyond the entrance, Marrakech softens. Three patios planted with orange trees and jasmine create a cool, quiet path through the house. Water murmurs, light moves across the zellige tiles.",
      "Here, time opens up: mint tea on the terrace, a hammam massage, dinner by candlelight under the stars. Ayadina is a riad made for slowing down in the heart of Marrakech.",
    ],
    stats: [
      ["1,200 m²", "of serenity"],
      ["3", "leafy patios"],
      ["9", "distinct rooms"],
    ],
  },
} as const

export function StorytellingSection({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale]

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <AnimateOnScroll animation="fade-right">
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src="/images/ayadina-home/patio-jour-02.jpg"
                  alt={t.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectPosition: "50% 50%" }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-accent/20 -z-10" />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-left" className="lg:py-8">
            <div className="max-w-lg">
              <p className="text-accent text-sm uppercase tracking-[0.25em] mb-4">
                {t.eyebrow}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-6 leading-snug">
                {t.title}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {t.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-border/50">
                {t.stats.map(([value, label], index) => (
                  <div key={value} className="contents">
                    {index > 0 && <div className="w-px h-10 bg-border/50" />}
                    <div>
                      <p className="font-serif text-2xl text-foreground">{value}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
