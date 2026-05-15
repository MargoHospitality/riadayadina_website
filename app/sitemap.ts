import type { MetadataRoute } from "next"
import { localizedPaths, type RouteKey } from "@/lib/i18n/routing"

const siteUrl = "https://www.riadayadinamarrakech.net"

const routes: RouteKey[] = ["home", "riad", "rooms", "offers", "spa", "restaurant", "gallery", "contact"]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.flatMap((route) => {
    const frPath = localizedPaths[route].fr
    const enPath = localizedPaths[route].en
    const alternates = {
      languages: {
        fr: `${siteUrl}${frPath}`,
        en: `${siteUrl}${enPath}`,
        "x-default": `${siteUrl}/`,
      },
    }

    return [
      {
        url: `${siteUrl}${frPath}`,
        lastModified,
        changeFrequency: route === "home" ? "weekly" : "monthly",
        priority: route === "home" ? 1 : 0.8,
        alternates,
      },
      {
        url: `${siteUrl}${enPath}`,
        lastModified,
        changeFrequency: route === "home" ? "weekly" : "monthly",
        priority: route === "home" ? 0.9 : 0.7,
        alternates,
      },
    ]
  })
}
