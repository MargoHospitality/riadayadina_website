// Rate comparison utilities for Riad Ayadina
// In production, this would fetch live data from Google Hotels API

import type { BookingSearch } from "./booking-engine"

export interface RateOffer {
  title: string
  domain?: string
  price: number
  currency: string
  conditions?: string
}

export interface RateComparison {
  directOffer: RateOffer | null
  offers: RateOffer[]
  message?: string
}

// Mock data for development - in production this would call Google Hotels API
export async function getRateComparison(search: BookingSearch): Promise<RateComparison> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Mock prices based on dates (in production, fetch from Google Hotels)
  const basePrice = 120 // Base price per night in EUR

  return {
    directOffer: {
      title: "Riad Ayadina",
      price: basePrice,
      currency: "EUR",
      conditions: "Flexible, sans prépaiement",
    },
    offers: [
      {
        title: "Booking.com",
        domain: "booking.com",
        price: basePrice + 15,
        currency: "EUR",
        conditions: "Non remboursable",
      },
      {
        title: "Expedia",
        domain: "expedia.com",
        price: basePrice + 22,
        currency: "EUR",
        conditions: "Non remboursable",
      },
      {
        title: "Hotels.com",
        domain: "hotels.com",
        price: basePrice + 18,
        currency: "EUR",
        conditions: "Non remboursable",
      },
    ],
    message: undefined,
  }
}
