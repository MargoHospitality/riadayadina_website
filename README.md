# Riad Ayadina Website

Website project generated with v0 and deployed on Vercel.

## Direct booking comparison POC

The booking modal redirects guests to `/comparer` before the Ayadina Cloudbeds booking engine. The comparison page queries DataForSEO Google Hotels server-side and never exposes API credentials to the browser.

Optional environment variables:

```bash
DATAFORSEO_LOGIN=
DATAFORSEO_PASSWORD=
DATAFORSEO_BASIC_AUTH=
DATAFORSEO_HOTEL_IDENTIFIER=ChoI7fvu063n9-KqARoNL2cvMTFkeG01cDQzNxAB
DATAFORSEO_LOCATION_CODE=1009979
DATAFORSEO_LANGUAGE_CODE=fr
DATAFORSEO_CURRENCY=MAD
NEXT_PUBLIC_BOOKING_ENGINE_URL=https://hotels.cloudbeds.com/reservation/9mPc6B
```

Use `DATAFORSEO_BASIC_AUTH` instead of `DATAFORSEO_LOGIN`/`DATAFORSEO_PASSWORD` if DataForSEO provides a pre-encoded Basic Auth token.

The Cloudbeds booking URL receives the selected dates via hash parameters, e.g. `#checkin=2026-06-15&checkout=2026-06-17&adults=2`.

If DataForSEO is not configured or answers too slowly, the page falls back to the direct booking CTA.
