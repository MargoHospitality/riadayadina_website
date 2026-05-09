import { Suspense } from "react"
import { Header } from "@/components/header"
import { CompareClient } from "./comparer-client"

export const dynamic = "force-dynamic"

export default function ComparePage() {
  return (
    <Suspense fallback={<ComparePageFallback />}>
      <CompareClient />
    </Suspense>
  )
}

function ComparePageFallback() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 md:pt-40 pb-16">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <p className="text-primary text-xs uppercase tracking-[0.2em] mb-6">Étape 1/2 · Vérification en cours</p>
          <h1 className="font-serif text-2xl md:text-4xl text-foreground mb-4">
            Nous préparons la comparaison de vos tarifs.
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            La recherche des prix publics démarre dans quelques instants.
          </p>
        </div>
      </section>
    </main>
  )
}
