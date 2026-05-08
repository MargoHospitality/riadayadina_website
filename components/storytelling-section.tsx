"use client"

import Image from "next/image"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export function StorytellingSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image with subtle detail */}
          <AnimateOnScroll animation="fade-right">
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src="/images/patio-arbore.jpg"
                  alt="Patio arboré du Riad Ayadina"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-accent/20 -z-10" />
            </div>
          </AnimateOnScroll>

          {/* Text - sensorial, atmospheric */}
          <AnimateOnScroll animation="fade-left" className="lg:py-8">
            <div className="max-w-lg">
              <p className="text-accent text-sm uppercase tracking-[0.25em] mb-4">
                L&apos;esprit Ayadina
              </p>
              
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-6 leading-snug">
                Le calme retrouvé,<br />
                <span className="italic text-primary/80">au cœur de la médina</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Passée la porte d&apos;entrée, le tumulte de Marrakech s&apos;efface. 
                  Trois patios plantés d&apos;orangers et de jasmins dessinent un parcours 
                  de fraîcheur et de silence. L&apos;eau murmure, la lumière joue sur le zellige.
                </p>
                <p>
                  Ici, on prend le temps. Un thé à la menthe sur la terrasse, 
                  un massage au hammam, un dîner aux chandelles sous les étoiles. 
                  Ayadina n&apos;est pas un hôtel — c&apos;est une parenthèse.
                </p>
              </div>

              {/* Subtle stats */}
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-border/50">
                <div>
                  <p className="font-serif text-2xl text-foreground">1200m²</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">de sérénité</p>
                </div>
                <div className="w-px h-10 bg-border/50" />
                <div>
                  <p className="font-serif text-2xl text-foreground">3</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">patios arborés</p>
                </div>
                <div className="w-px h-10 bg-border/50" />
                <div>
                  <p className="font-serif text-2xl text-foreground">9</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">chambres uniques</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
