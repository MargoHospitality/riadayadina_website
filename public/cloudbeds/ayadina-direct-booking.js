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
  const mountId = "margo-direct-booking-mount"
  const state = { renderedTop: false, renderedPackages: new WeakSet(), result: null }
  const debug = Boolean(window.MARGO_DIRECT_BOOKING_DEBUG)

  const copy = {
    fr: {
      comparisonKicker: "Comparaison agences en ligne",
      comparisonTitle: "Notre tarif direct est plus avantageux pour ces dates.",
      officialSite: "Site officiel",
      otherSites: "Autres sites de réservation",
      perNight: " / nuit",
      saving: "Économie",
      noAvailabilityKicker: "Disponibilité officielle Ayadina",
      noAvailabilityTitle: "Nous n’avons plus de disponibilité en ligne pour ces dates.",
      noAvailabilityText: "Vous pouvez écrire au service réservation : booking@riadayadinamarrakech.net.",
      packages: {
        immersion: ["Transfert aéroport A/R", "-10% sur les soins Spa", "Cocktail de bienvenue", "Surclassement & early check-in selon disponibilité"],
        escapade: ["Transfert aéroport aller", "-10% sur les soins Spa", "Cocktail de bienvenue", "Surclassement & early check-in selon disponibilité"],
        direct: ["-10% sur les soins Spa", "Surclassement & early check-in selon disponibilité"],
      },
    },
    en: {
      comparisonKicker: "Online travel agency comparison",
      comparisonTitle: "Our direct rate is better for these dates.",
      officialSite: "Official website",
      otherSites: "Other booking sites",
      perNight: " / night",
      saving: "Saving",
      noAvailabilityKicker: "Official Ayadina availability",
      noAvailabilityTitle: "We no longer have online availability for these dates.",
      noAvailabilityText: "You can contact reservations directly: booking@riadayadinamarrakech.net.",
      packages: {
        immersion: ["Round-trip airport transfer", "10% off Spa treatments", "Welcome cocktail", "Upgrade & early check-in subject to availability"],
        escapade: ["One-way airport transfer", "10% off Spa treatments", "Welcome cocktail", "Upgrade & early check-in subject to availability"],
        direct: ["10% off Spa treatments", "Upgrade & early check-in subject to availability"],
      },
    },
  }

  function parseBookingSearch() {
    const search = new URLSearchParams(window.location.search)
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""))
    const get = (key, fallback) => hash.get(key) || search.get(key) || fallback
    const checkIn = get("checkin", get("checkIn", ""))
    const checkOut = get("checkout", get("checkOut", ""))
    const adults = get("adults", get("guests", "2"))
    const currency = (get("currency", "MAD") || "MAD").toUpperCase()
    const language = get("language", getLanguageFromPath()) || "fr"
    if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn) || !/^\d{4}-\d{2}-\d{2}$/.test(checkOut)) return null
    return { checkIn, checkOut, adults, currency, language }
  }

  function getLanguageFromPath() {
    const match = window.location.pathname.match(/^\/([a-z]{2})(?:\/|$)/i)
    return match?.[1]?.toLowerCase()
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
      .margo-direct-booking-mount{box-sizing:border-box;width:100%;max-width:1120px;margin:16px auto 0;padding:0 16px}
      .margo-direct-card{box-sizing:border-box;width:100%;margin:0 0 18px;padding:18px 20px;background:#fff;border:1px solid #dde0e4;border-radius:10px;box-shadow:rgba(18,31,53,.08) 0 2px 10px;color:#1e2330;font-family:inherit;overflow:hidden}
      .margo-direct-kicker{margin:0 0 8px;color:#0d479f;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
      .margo-direct-title{margin:0 0 8px;color:#1e2330;font-size:20px;line-height:1.22;font-weight:650}
      .margo-direct-text{margin:0;color:#545b66;font-size:14px;line-height:1.45}
      .margo-direct-grid{display:grid;grid-template-columns:1fr;gap:10px;margin-top:15px}
      .margo-direct-price{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;background:#f7f8fa;border:1px solid #dde0e4;border-radius:8px;font-size:13px;line-height:1.25}
      .margo-direct-price span{color:#545b66}
      .margo-direct-price strong{color:#0d479f;font-size:16px;white-space:nowrap;font-weight:700}
      .margo-direct-saving{display:inline-flex;margin-top:12px;padding:7px 11px;background:#f3ead0;border:1px solid #e4d4a8;border-radius:999px;color:#1e2330;font-size:12px;font-weight:700}
      @media(min-width:640px){.margo-direct-grid{grid-template-columns:1fr 1fr}.margo-direct-card{padding:20px 22px}}
      .margo-direct-benefits{display:flex;flex-wrap:wrap;gap:6px;margin-top:0}
      .margo-direct-chip{padding:5px 8px;background:transparent;border:1px solid #dbc584;color:#1e2330;font-size:11px;line-height:1.2;border-radius:999px}
      .margo-direct-package{margin:7px 0 0;padding:0;background:transparent;border:0;color:#1e2330}
      .margo-direct-package-title{display:none}
    `
    document.head.appendChild(style)
  }

  function getCopy() {
    return copy[getLanguageFromPath() === "en" ? "en" : "fr"]
  }

  function formatMoney(value, currency) {
    try {
      const locale = getLanguageFromPath() === "en" ? "en-US" : "fr-FR"
      return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(value)
    } catch {
      return `${Math.round(value)} ${currency || "MAD"}`
    }
  }

  function getReferenceOffer(result) {
    const offers = Array.isArray(result?.offers) ? result.offers : []
    return offers.slice().sort((a, b) => Number(a.price || 0) - Number(b.price || 0))[0]
  }

  function renderComparisonCard() {
    if (!state.result) return
    state.renderedTop = false

    const anchor = getTopCardAnchor()
    if (!anchor) {
      removePrematureCards()
      log("No Cloudbeds anchor found yet")
      return
    }

    const existingCard = document.querySelector(".margo-direct-card")
    if (existingCard && existingCard.parentElement === anchor.parent) return
    existingCard?.remove()

    const direct = state.result.directOffer
    const reference = getReferenceOffer(state.result)
    const sameCurrency = direct && reference && direct.currency === reference.currency
    const directCheaper = sameCurrency && Number(direct.price) < Number(reference.price)
    if (state.result.status !== "no_availability" && !directCheaper) return

    const card = document.createElement("section")
    card.className = "margo-direct-card"

    const labels = getCopy()

    if (state.result.status === "no_availability") {
      card.innerHTML = `
        <p class="margo-direct-kicker">${labels.noAvailabilityKicker}</p>
        <h2 class="margo-direct-title">${labels.noAvailabilityTitle}</h2>
        <p class="margo-direct-text">${labels.noAvailabilityText}</p>
      `
    } else {
      const saving = Number(reference.price) - Number(direct.price)
      card.innerHTML = `
        <p class="margo-direct-kicker">${labels.comparisonKicker}</p>
        <h2 class="margo-direct-title">${labels.comparisonTitle}</h2>
        <div class="margo-direct-grid">
          <div class="margo-direct-price"><span>${labels.officialSite}</span><strong>${formatMoney(direct.price, direct.currency)}${labels.perNight}</strong></div>
          <div class="margo-direct-price"><span>${labels.otherSites}</span><strong>${formatMoney(reference.price, reference.currency)}${labels.perNight}</strong></div>
        </div>
        <span class="margo-direct-saving">${labels.saving}: ${formatMoney(saving, direct.currency)}${labels.perNight}</span>
      `
    }

    card.dataset.margoDirectPlacement = anchor.placement || "cloudbeds"
    anchor.parent.insertBefore(card, anchor.before)
    state.renderedTop = true
    track("bke_direct_block_view", {
      outcome: state.result.status === "no_availability" ? "no_availability" : "direct_cheaper",
    })
    log("Comparison card rendered", state.result.status)
  }

  function getTopCardAnchor() {
    const firstRoomCard = document.querySelector(".cb-accommodation-card")
    if (firstRoomCard?.parentElement) {
      return { parent: firstRoomCard.parentElement, before: firstRoomCard, placement: "room-card" }
    }

    const firstRatePlan = document.querySelector(".cb-rate-plan")
    const roomCard = firstRatePlan?.closest(".cb-accommodation-card")
    if (roomCard?.parentElement) {
      return { parent: roomCard.parentElement, before: roomCard, placement: "room-card" }
    }

    if (!isCloudbedsReady()) return null

    const mount = getExternalMount()
    return mount ? { parent: mount, before: mount.firstChild, placement: "external-mount" } : null
  }

  function isCloudbedsReady() {
    const layout = document.querySelector("#cb-bookingengine-main-layout")
    if (!layout) return false
    if (layout.querySelector('[data-testid="root-loader"]')) return false

    const hasRenderedCards = Boolean(layout.querySelector(".cb-card,.cb-title-text,[data-be-text],button,a"))
    const hasMeaningfulText = (layout.textContent || "").replace(/\s+/g, " ").trim().length > 80
    return hasRenderedCards || hasMeaningfulText
  }

  function getExternalMount() {
    const root = document.getElementById("root")
    if (!root?.parentElement) return null

    let mount = document.getElementById(mountId)
    if (!mount) {
      mount = document.createElement("div")
      mount.id = mountId
      mount.className = "margo-direct-booking-mount"
      root.parentElement.insertBefore(mount, root)
    }
    return mount
  }

  function removePrematureCards() {
    document.querySelectorAll(".margo-direct-card").forEach((card) => {
      if (!card.closest(`#${mountId}`) && !card.closest(".cb-accommodation-card")) card.remove()
    })
  }

  function hideNativeRateCheckButton() {
    document.querySelectorAll("button,a,div,span").forEach((element) => {
      if (element.closest(".margo-direct-card,.margo-direct-package")) return
      if ((element.textContent || "").trim().toLowerCase() !== "rate check") return
      const target = element.closest("button,a") || element
      target.style.display = "none"
    })
  }

  function renderPackageBlocks() {
    document.querySelectorAll(".cb-rate-plan").forEach((plan) => {
      if (state.renderedPackages.has(plan)) return
      const title = plan.querySelector(".cb-rate-plan-title-text")?.textContent || ""
      const benefits = getBenefitsForRatePlan(title)
      if (!benefits) return

      const titleElement = plan.querySelector(".cb-rate-plan-title-text")
      if (titleElement) {
        titleElement.insertAdjacentElement("afterend", createPackageBlock(benefits))
      } else {
        plan.insertBefore(createPackageBlock(benefits), plan.firstChild?.nextSibling || null)
      }
      state.renderedPackages.add(plan)
      track("bke_direct_package_view", { ratePlan: title.trim().slice(0, 80) })
    })
  }

  function getBenefitsForRatePlan(title) {
    const packages = getCopy().packages
    if (/immersion/i.test(title)) return packages.immersion
    if (/escapade/i.test(title)) return packages.escapade
    if (/offre spéciale directe|special direct offer/i.test(title)) return packages.direct
    return null
  }

  function createPackageBlock(benefits) {
    const block = document.createElement("div")
    block.className = "margo-direct-package"
    block.innerHTML = `<div class="margo-direct-benefits">${benefits.map((benefit) => `<span class="margo-direct-chip">${benefit}</span>`).join("")}</div>`
    return block
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
    renderComparisonCard()
    renderPackageBlocks()
    hideNativeRateCheckButton()
    const observer = new MutationObserver(throttleRender(() => {
      renderComparisonCard()
      renderPackageBlocks()
      hideNativeRateCheckButton()
    }))
    observer.observe(document.body, { childList: true, subtree: true })
  }

  function throttleRender(callback) {
    let scheduled = false
    return () => {
      if (scheduled) return
      scheduled = true
      window.requestAnimationFrame(() => {
        scheduled = false
        callback()
      })
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true })
  } else {
    boot()
  }
})()
