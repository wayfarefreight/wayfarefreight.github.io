# WayFare Freight

Single-page static website for WayFare Freight Pte Ltd, adapted from the LeadPage Bootstrap template. It consolidates the About Us, Sea Freight, Air Freight, Container Specification and Contact Us pages from [the original WordPress site](https://wayfarefreight.wordpress.com/). All 15 distinct images used across those pages are stored locally in `assets/img/wayfare/` and collected in the image gallery.

Open `index.html` directly, or serve the directory with `python -m http.server 8765` for local preview. All page sections live in `index.html`; styling is in `assets/css/wayfare.css` and `assets/css/wayfare-redesign.css`, and the mobile menu is in `assets/js/wayfare.js`.

The site has no backend. Contact links open the visitor's email client or phone dialer. The contact section includes an embedded Google map and a directions link.

The sea-shipment phone numbers on the source page are formatted ambiguously (`+65 9777 232265 / +9628 3882`). The site interprets this as shared `+65 9777 2322` plus ocean-team `+65 9628 3882`, based on the clearly printed air-team shared number. Confirm the ocean-team number before publishing.
