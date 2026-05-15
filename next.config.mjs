/** @type {import('next').NextConfig} */
const nextConfig = {
  // Touch this when a public Cloudbeds asset needs a forced Vercel production rebuild.
  env: {
    NEXT_PUBLIC_CLOUDBEDS_SCRIPT_BUILD: "20260511-2311",
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/le-riad", permanent: true },
      { source: "/about-us/", destination: "/le-riad", permanent: true },
      { source: "/rooms", destination: "/chambres-suites", permanent: true },
      { source: "/rooms/", destination: "/chambres-suites", permanent: true },
      { source: "/rooms/junior-suites", destination: "/chambres-suites", permanent: true },
      { source: "/rooms/junior-suites/", destination: "/chambres-suites", permanent: true },
      { source: "/rooms/superior-double-rooms", destination: "/chambres-suites", permanent: true },
      { source: "/rooms/superior-double-rooms/", destination: "/chambres-suites", permanent: true },
      { source: "/services", destination: "/le-riad", permanent: true },
      { source: "/services/", destination: "/le-riad", permanent: true },
      { source: "/events", destination: "/le-riad", permanent: true },
      { source: "/events/", destination: "/le-riad", permanent: true },
      { source: "/terms-and-conditions", destination: "/mentions-legales", permanent: true },
      { source: "/terms-and-conditions/", destination: "/mentions-legales", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/docs/:path*.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/cloudbeds/:path*.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ]
  },
}

export default nextConfig
