"use client"

import { track } from "@vercel/analytics"

export type DirectBookingEvent =
  | "rate_compare_search"
  | "rate_compare_direct_cheaper"
  | "rate_compare_ota_cheaper_hidden"
  | "rate_compare_no_availability"
  | "rate_compare_unavailable"
  | "rate_compare_click_cloudbeds"
  | "rate_compare_click_contact"
  | "bke_direct_block_view"
  | "bke_direct_package_view"

export function trackDirectBookingEvent(event: DirectBookingEvent, properties: Record<string, string | number | boolean | undefined> = {}) {
  try {
    track(event, compactProperties(properties))
  } catch {
    // Analytics must never block the booking path.
  }
}

function compactProperties(properties: Record<string, string | number | boolean | undefined>) {
  return Object.fromEntries(Object.entries(properties).filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined))
}
