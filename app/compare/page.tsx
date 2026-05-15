import type { Metadata } from "next"
import { Suspense } from "react"
import { CompareClient } from "@/app/comparer/comparer-client"
import { ComparePageFallback } from "@/app/comparer/page"
import { createPageMetadata } from "@/lib/i18n/metadata"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...createPageMetadata("comparer", "en"),
  alternates: {
    canonical: "/en/compare",
    languages: {
      fr: "/comparer",
      en: "/en/compare",
      "x-default": "/comparer",
    },
  },
  robots: { index: false, follow: true },
}

export default function CompareAliasPage() {
  return (
    <Suspense fallback={<ComparePageFallback locale="en" />}>
      <CompareClient />
    </Suspense>
  )
}
