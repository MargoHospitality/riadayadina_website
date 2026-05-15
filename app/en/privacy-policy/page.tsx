import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy policy | Riad Ayadina Marrakech",
  description: "Privacy policy for the official Riad Ayadina & Spa website in Marrakech.",
  alternates: {
    canonical: "/en/privacy-policy",
    languages: {
      fr: "/politique-confidentialite",
      en: "/en/privacy-policy",
    },
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header locale="en" />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-accent">Personal data</p>
            <h1 className="mb-8 font-serif text-4xl text-foreground md:text-5xl">Privacy policy</h1>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Data collected</h2>
                <p>
                  When you contact us or prepare a reservation, we may receive the information needed to process your
                  request: name, contact details, stay dates, preferences and message.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Purpose</h2>
                <p>
                  This information is used to respond to your requests, prepare your stay, manage reservations and
                  improve the quality of our hospitality.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Third-party services</h2>
                <p>
                  The website may use technical services required for its operation, including hosting, audience
                  measurement and the secure booking engine.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-serif text-2xl text-foreground">Contact</h2>
                <p>
                  For any request about your personal data, contact us at booking@riadayadinamarrakech.net or by phone at
                  +212 524 38 38 81.
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
