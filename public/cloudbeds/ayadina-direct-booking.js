(() => {
  const scriptOrigin = (() => {
    try {
      return new URL(document.currentScript?.src || window.location.href).origin
    } catch {
      return ""
    }
  })()
  const apiOrigin = window.MARGO_DIRECT_BOOKING_API_ORIGIN || scriptOrigin
  const apiPath = window.MARGO_DIRECT_BOOKING_API_PATH || "/api/rate-compare"
  const contactUrl = window.MARGO_DIRECT_BOOKING_CONTACT_URL || `${apiOrigin}/contact`
  const state = { renderedTop: false, renderedPackages: new WeakSet(), result: null }
  const debug = Boolean(window.MARGO_DIRECT_BOOKING_DEBUG)

  const benefits = [
    "Transfert aéroport offert selon la durée du séjour",
    "-10% sur les soins Spa",
    "Cocktail de bienvenue",
    "Surclassement & early check-in selon disponibilité",
  ]

  function parseBookingSearch() {
    const search = new URLSearchParams(window.location.search)
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""))
    const get = (key, fallback) => hash.get(key) || search.get(key) || fallback
    const checkIn = get("checkin", get("checkIn", ""))
    const checkOut = get("checkout", get("checkOut", ""))
    const adults = get("adults", get("guests", "2"))
    if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn) || !/^\d{4}-\d{2}-\d{2}$/.test(checkOut)) return null
    return { checkIn, checkOut, adults }
  }

  async function loadComparison() {
    const search = parseBookingSearch()
    if (!search || !apiOrigin) return null
    const params = new URLSearchParams(search)
    const response = await fetch(`${apiOrigin}${apiPath}?${params.toString()}`, { credentials: "omit" })
    if (!response.ok) return null
    return response.json()
  }

  function injectStyles() {
    if (document.getElementById("margo-direct-booking-style")) return
    const style = document.createElement("style")
    style.id = "margo-direct-booking-style"
    style.textContent = `
      .margo-direct-card{box-sizing:border-box;margin:0 16px 24px;padding:18px 18px 16px;background:#fff;border:1px solid #dde0e4;box-shadow:rgba(0,0,0,.2) 0 1px 8px 0;color:#1e2330;font-family:inherit}
      .margo-direct-kicker{margin:0 0 8px;color:#0d479f;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
      .margo-direct-title{margin:0 0 8px;color:#1e2330;font-size:20px;line-height:1.2;font-weight:650}
      .margo-direct-text{margin:0;color:#545b66;font-size:14px;line-height:1.45}
      .margo-direct-grid{display:grid;grid-template-columns:1fr;gap:10px;margin-top:14px}
      .margo-direct-price{display:flex;justify-content:space-between;gap:12px;padding:11px 12px;background:#f7f8fa;border:1px solid #dde0e4;font-size:13px}
      .margo-direct-price strong{color:#0d479f;font-size:16px;white-space:nowrap}
      .margo-direct-saving{display:inline-flex;margin-top:12px;padding:7px 10px;background:#dbc584;color:#1e2330;font-size:12px;font-weight:700}
      .margo-direct-benefits{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
      .margo-direct-chip{padding:7px 10px;background:#f7f8fa;border:1px solid #dde0e4;color:#1e2330;font-size:12px;line-height:1.2}
      .margo-direct-package{margin:10px 0 0;padding:12px;background:#f7f8fa;border-left:3px solid #dbc584;color:#1e2330}
      .margo-direct-package-title{margin:0 0 8px;color:#0d479f;font-size:13px;font-weight:700}
      @media(min-width:640px){.margo-direct-grid{grid-template-columns:1fr 1fr}.margo-direct-card{padding:20px 22px}}
    `
    document.head.appendChild(style)
  }

  function formatMoney(value, currency) {
    try {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency, maximumFractionDigits: 0 }).format(value)
    } catch {
      return `${Math.round(value)} ${currency || "MAD"}`
    }
  }

  function getReferenceOffer(result) {
    const offers = Array.isArray(result?.offers) ? result.offers : []
    return offers.slice().sort((a, b) => Number(a.price || 0) - Number(b.price || 0))[0]
  }

  function renderTopCard() {
    if (state.renderedTop || !state.result) return

    const anchor = getTopCardAnchor()
    if (!anchor.parent) {
      log("No injection anchor found yet")
      return
    }

    const direct = state.result.directOffer
    const reference = getReferenceOffer(state.result)
    const sameCurrency = direct && reference && direct.currency === reference.currency
    const directCheaper = sameCurrency && Number(direct.price) < Number(reference.price)
    const card = document.createElement("section")
    card.className = "margo-direct-card"

    if (state.result.status === "no_availability") {
      card.innerHTML = `
        <p class="margo-direct-kicker">Disponibilité officielle Ayadina</p>
        <h2 class="margo-direct-title">Aucune chambre disponible en ligne pour ces dates.</h2>
        <p class="margo-direct-text">Cloudbeds ne remonte pas de disponibilité pour ce séjour. Vous pouvez contacter directement le riad : il peut rester une option manuelle, une libération récente ou une alternative de dates.</p>
      `
    } else if (directCheaper) {
      const saving = Number(reference.price) - Number(direct.price)
      card.innerHTML = `
        <p class="margo-direct-kicker">Réservation directe Ayadina</p>
        <h2 class="margo-direct-title">Votre tarif officiel est mieux placé pour ces dates.</h2>
        <p class="margo-direct-text">Comparaison indicative effectuée au moment de votre recherche. Si vous changez devise, dates ou occupation, vérifiez le total final Cloudbeds.</p>
        <div class="margo-direct-grid">
          <div class="margo-direct-price"><span>Site officiel</span><strong>${formatMoney(direct.price, direct.currency)} / nuit</strong></div>
          <div class="margo-direct-price"><span>Meilleure OTA observée</span><strong>${formatMoney(reference.price, reference.currency)} / nuit</strong></div>
        </div>
        <span class="margo-direct-saving">Économie observée : ${formatMoney(saving, direct.currency)} / nuit</span>
      `
    } else {
      card.innerHTML = `
        <p class="margo-direct-kicker">Réservation directe Ayadina</p>
        <h2 class="margo-direct-title">Les avantages directs restent visibles ici.</h2>
        <p class="margo-direct-text">Quand le comparatif prix n'est pas favorable ou pas parfaitement comparable, nous affichons uniquement les bénéfices inclus en direct.</p>
        <div class="margo-direct-benefits">${benefits.map((benefit) => `<span class="margo-direct-chip">${benefit}</span>`).join("")}</div>
      `
    }

    anchor.parent.insertBefore(card, anchor.before)
    state.renderedTop = true
    track("bke_direct_block_view", {
      outcome: state.result.status === "no_availability" ? "no_availability" : directCheaper ? "direct_cheaper" : "benefits_only",
    })
    log("Top card rendered", state.result.status)
  }

  function getTopCardAnchor() {
    const firstCard = document.querySelector(".cb-accommodation-card")
    if (firstCard?.parentElement) return { parent: firstCard.parentElement, before: firstCard }

    const candidates = [
      ".cb-results-container",
      ".cb-accommodations-list",
      ".cb-search-results",
      ".cb-main-content",
      ".cb-booking-engine",
      "main",
      "#root",
      "#app",
    ]

    for (const selector of candidates) {
      const element = document.querySelector(selector)
      if (element) return { parent: element, before: element.firstChild }
    }

    return { parent: document.body, before: document.body.firstChild }
  }

  function renderPackageBlocks() {
    document.querySelectorAll(".cb-rate-plan").forEach((plan) => {
      if (state.renderedPackages.has(plan)) return
      const title = plan.querySelector(".cb-rate-plan-title-text")?.textContent || ""
      if (!/offre spéciale directe|package escapade/i.test(title)) return
      const block = document.createElement("div")
      block.className = "margo-direct-package"
      block.innerHTML = `
        <p class="margo-direct-package-title">Inclus avec cette offre directe</p>
        <div class="margo-direct-benefits">${benefits.map((benefit) => `<span class="margo-direct-chip">${benefit}</span>`).join("")}</div>
      `
      plan.appendChild(block)
      state.renderedPackages.add(plan)
      track("bke_direct_package_view", { ratePlan: title.trim().slice(0, 80) })
    })
  }

  function track(event, properties) {
    try {
      if (window.va) window.va("event", { name: event, data: properties || {} })
    } catch {}
  }

  function log() {
    if (!debug) return
    try {
      console.log("[Margo BKE]", ...arguments)
    } catch {}
  }

  async function boot() {
    injectStyles()
    try {
      state.result = await loadComparison()
    } catch {
      state.result = null
    }
    renderTopCard()
    renderPackageBlocks()
    const observer = new MutationObserver(() => {
      renderTopCard()
      renderPackageBlocks()
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true })
  } else {
    boot()
  }
})()
