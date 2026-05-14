import type { MetadataRoute } from "next"

const siteUrl = "https://www.riadayadinamarrakech.net"

const routes = [
  "",
  "/le-riad",
  "/chambres-suites",
  "/offres",
  "/spa",
  "/restaurant",
  "/galerie",
  "/contact",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }))
}
