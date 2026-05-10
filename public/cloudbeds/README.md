# Cloudbeds Ayadina custom code

POC script for the Cloudbeds Booking Engine (`9mPc6B`):

```html
<script src="https://YOUR_AYADINA_DOMAIN/cloudbeds/ayadina-direct-booking.js" defer></script>
```

Optional override if the script is proxied from another host:

```html
<script>
  window.MARGO_DIRECT_BOOKING_API_ORIGIN = "https://YOUR_AYADINA_DOMAIN"
</script>
<script src="https://YOUR_AYADINA_DOMAIN/cloudbeds/ayadina-direct-booking.js" defer></script>
```

The script is defensive: if the comparator API fails, it does not block Cloudbeds booking.
