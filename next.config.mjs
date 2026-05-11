/** @type {import('next').NextConfig} */
const nextConfig = {
  // Touch this when a public Cloudbeds asset needs a forced Vercel production rebuild.
  env: {
    NEXT_PUBLIC_CLOUDBEDS_SCRIPT_BUILD: "20260511-1653",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
