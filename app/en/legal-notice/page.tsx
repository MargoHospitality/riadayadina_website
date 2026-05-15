import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Legal notice | Riad Ayadina Marrakech",
  description: "Legal notice for the official Riad Ayadina & Spa website in Marrakech.",
  alternates: {
    canonical: "/en/legal-notice",
    languages: {
      fr: "/mentions-legales",
      en: "/en/legal-notice",
    },
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LegalNoticePage() {
  return (
    <>
      <Header locale="en" />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-accent">Legal information</p>
            <h1 className="mb-8 font-serif text-4xl text-foreground md:text-5xl">Legal notice</h1>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Website publisher</h2>
                <p>Official website of Riad Ayadina & Spa.</p>
                <p>35 Zaouia El Abassia, Bab El Khemis, Medina, Marrakech 40000, Morocco.</p>
                <p>Phone: +212 524 38 38 81</p>
                <p>Email: booking@riadayadinamarrakech.net</p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Publication manager</h2>
                <p>The management of Riad Ayadina & Spa.</p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Hosting</h2>
                <p>The website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States.</p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Reservations</h2>
                <p>
                  Availability, rates and booking conditions displayed by the official booking engine are the only
                  contractual elements at the time of confirmation.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  )
}
