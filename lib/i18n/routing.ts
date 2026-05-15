export type Locale = "fr" | "en"

export const defaultLocale: Locale = "fr"
export const locales: Locale[] = ["fr", "en"]

export const localizedPaths = {
  home: { fr: "/", en: "/en" },
  riad: { fr: "/le-riad", en: "/en/the-riad" },
  rooms: { fr: "/chambres-suites", en: "/en/rooms-suites" },
  offers: { fr: "/offres", en: "/en/offers" },
  spa: { fr: "/spa", en: "/en/spa" },
  restaurant: { fr: "/restaurant", en: "/en/restaurant" },
  gallery: { fr: "/galerie", en: "/en/gallery" },
  contact: { fr: "/contact", en: "/en/contact" },
  comparer: { fr: "/comparer", en: "/comparer" },
  legal: { fr: "/mentions-legales", en: "/en/legal-notice" },
  privacy: { fr: "/politique-confidentialite", en: "/en/privacy-policy" },
} as const

export type RouteKey = keyof typeof localizedPaths

const pathToRoute = new Map<string, { key: RouteKey; locale: Locale }>()
for (const key of Object.keys(localizedPaths) as RouteKey[]) {
  for (const locale of locales) {
    pathToRoute.set(localizedPaths[key][locale], { key, locale })
  }
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr"
}

export function getRouteKeyFromPath(pathname: string): RouteKey | undefined {
  return pathToRoute.get(pathname)?.key
}

export function getLocalizedPath(key: RouteKey, locale: Locale) {
  return localizedPaths[key][locale]
}

export function switchLocalePath(pathname: string, targetLocale: Locale) {
  const route = pathToRoute.get(pathname)
  if (route) return localizedPaths[route.key][targetLocale]
  if (pathname === "/comparer") return "/comparer"
  return targetLocale === "en" ? "/en" : "/"
}

export function getBookingLanguage(locale: Locale) {
  return locale === "en" ? "en" : "fr"
}

export function getIntlLocale(locale: Locale) {
  return locale === "en" ? "en-GB" : "fr-FR"
}
