import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Politique de confidentialité | Riad Ayadina Marrakech",
  description: "Politique de confidentialité du site officiel du Riad Ayadina & Spa à Marrakech.",
  alternates: {
    canonical: "/politique-confidentialite",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Header locale="fr" />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-accent">Données personnelles</p>
            <h1 className="mb-8 font-serif text-4xl text-foreground md:text-5xl">Politique de confidentialité</h1>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Données collectées</h2>
                <p>
                  Lorsque vous nous contactez ou préparez une réservation, nous pouvons recevoir les informations
                  nécessaires au traitement de votre demande : nom, coordonnées, dates de séjour, préférences et message.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Finalités</h2>
                <p>
                  Ces informations sont utilisées pour répondre à vos demandes, préparer votre séjour, gérer les réservations
                  et améliorer la qualité de notre accueil.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Services tiers</h2>
                <p>
                  Le site peut utiliser des services techniques nécessaires à son fonctionnement, notamment l’hébergement,
                  la mesure d’audience et le moteur de réservation sécurisé.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Contact</h2>
                <p>
                  Pour toute demande concernant vos données personnelles, contactez-nous à booking@riadayadinamarrakech.net
                  ou par téléphone au +212 524 38 38 81.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="fr" />
    </>
  )
}
