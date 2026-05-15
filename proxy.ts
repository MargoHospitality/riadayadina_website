import { NextRequest, NextResponse } from "next/server"

const LOCALE_COOKIE = "ayadina_locale_redirected"
const PUBLIC_FILE = /\.(.*)$/

function isBot(userAgent: string) {
  return /bot|crawler|spider|crawling|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex/i.test(userAgent)
}

function prefersFrench(acceptLanguage: string) {
  const first = acceptLanguage.split(",")[0]?.toLowerCase() || ""
  return first.startsWith("fr")
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAsset = pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname === "/robots.txt" || pathname === "/sitemap.xml" || PUBLIC_FILE.test(pathname)

  if (isAsset) return NextResponse.next()

  const locale = pathname === "/en" || pathname.startsWith("/en/") || pathname === "/compare" || (pathname === "/comparer" && request.nextUrl.searchParams.get("language") === "en") ? "en" : "fr"

  if (pathname === "/" && !request.cookies.get(LOCALE_COOKIE) && !isBot(request.headers.get("user-agent") || "") && !prefersFrench(request.headers.get("accept-language") || "")) {
    const url = request.nextUrl.clone()
    url.pathname = "/en"
    const response = NextResponse.redirect(url, 307)
    response.cookies.set(LOCALE_COOKIE, "1", { maxAge: 60 * 60 * 24 * 180, path: "/" })
    return response
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-ayadina-locale", locale)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
