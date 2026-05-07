import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'Riad Ayadina & Spa | Boutique Hotel Marrakech',
  description: 'Découvrez le Riad Ayadina & Spa, un havre de paix de 1200m² au cœur de la médina de Marrakech. Spa, piscine chauffée, restaurant avec licence alcool. Réservez en direct.',
  keywords: ['riad', 'marrakech', 'boutique hotel', 'médina', 'maroc', 'spa', 'hammam', 'piscine', 'restaurant', 'bar'],
  openGraph: {
    title: 'Riad Ayadina & Spa | Boutique Hotel Marrakech',
    description: 'Votre havre de paix au cœur de la médina de Marrakech - Spa, Restaurant & Bar',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
