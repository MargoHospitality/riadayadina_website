import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Mentions légales | Riad Ayadina Marrakech",
  description: "Mentions légales du site officiel du Riad Ayadina & Spa à Marrakech.",
  alternates: {
    canonical: "/mentions-legales",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function MentionsLegalesPage() {
  return (
    <>
      <Header locale="fr" />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-accent">Informations légales</p>
            <h1 className="mb-8 font-serif text-4xl text-foreground md:text-5xl">Mentions légales</h1>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Éditeur du site</h2>
                <p>Site officiel du Riad Ayadina & Spa.</p>
                <p>35 Zaouia El Abassia, Bab El Khemis, Médina, Marrakech 40000, Maroc.</p>
                <p>Téléphone : +212 524 38 38 81</p>
                <p>Email : booking@riadayadinamarrakech.net</p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Responsable de publication</h2>
                <p>La direction du Riad Ayadina & Spa.</p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Hébergement</h2>
                <p>Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Réservations</h2>
                <p>
                  Les disponibilités, tarifs et conditions de réservation affichés par le moteur de réservation officiel
                  sont les seuls éléments contractuels au moment de la confirmation.
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
