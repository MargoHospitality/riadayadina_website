import type { Metadata } from "next"
import { headers } from "next/headers"
import { createPageMetadata } from "@/lib/i18n/metadata"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CompareClient } from "./comparer-client"
import type { Locale } from "@/lib/i18n/routing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...createPageMetadata("comparer", "fr"),
  robots: { index: false, follow: true },
}

export default async function ComparePage() {
  const locale = ((await headers()).get("x-ayadina-locale") === "en" ? "en" : "fr") as Locale

  return (
    <Suspense fallback={<ComparePageFallback locale={locale} />}>
      <CompareClient />
    </Suspense>
  )
}

export function ComparePageFallback({ locale = "fr" }: { locale?: Locale }) {
  const copy = {
    fr: {
      eyebrow: "Étape 1/2 · Vérification en cours",
      title: "Nous préparons la comparaison de vos tarifs.",
      text: "La recherche des prix publics démarre dans quelques instants.",
    },
    en: {
      eyebrow: "Step 1/2 · Checking rates",
      title: "We are preparing your rate comparison.",
      text: "The public-rate search will start in a moment.",
    },
  }[locale]

  return (
    <>
      <main className="min-h-screen bg-background">
        <Header locale={locale} />
        <section className="pt-32 md:pt-40 pb-16">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-6">{copy.eyebrow}</p>
            <h1 className="font-serif text-2xl md:text-4xl text-foreground mb-4">
              {copy.title}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {copy.text}
            </p>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
