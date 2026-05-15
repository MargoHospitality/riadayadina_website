import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollToTop } from '@/components/scroll-to-top'
import { BookingModalProvider } from '@/components/booking-modal-provider'
import type { Locale } from '@/lib/i18n/routing'
import { HotelJsonLd } from '@/components/hotel-json-ld'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.riadayadinamarrakech.net'),
  title: {
    default: 'Riad Ayadina & Spa | Riad boutique à Marrakech',
    template: '%s | Riad Ayadina & Spa',
  },
  description: 'Une adresse paisible au cœur de la médina de Marrakech : spa de 250 m², piscine chauffée sur le toit, restaurant, bar et réservation directe.',
  keywords: ['riad Marrakech', 'riad spa Marrakech', 'médina Marrakech', 'spa hammam Marrakech', 'restaurant riad Marrakech', 'Riad Ayadina'],
  alternates: {
    canonical: '/',
    languages: {
      fr: '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Riad Ayadina & Spa | Riad boutique à Marrakech',
    description: 'Une adresse paisible au cœur de la médina de Marrakech — spa, piscine chauffée, restaurant et bar.',
    url: '/',
    siteName: 'Riad Ayadina & Spa',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: '/images/ayadina-home/patio-jour-04.jpg',
        width: 1200,
        height: 800,
        alt: 'Patio principal du Riad Ayadina à Marrakech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riad Ayadina & Spa | Riad boutique à Marrakech',
    description: 'Une adresse paisible au cœur de la médina de Marrakech — spa, piscine chauffée, restaurant et bar.',
    images: ['/images/ayadina-home/patio-jour-04.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = ((await headers()).get("x-ayadina-locale") === "en" ? "en" : "fr") as Locale

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <HotelJsonLd />
        <BookingModalProvider locale={locale}>
          {children}
          <ScrollToTop />
        </BookingModalProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
