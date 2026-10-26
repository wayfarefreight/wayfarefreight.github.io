# WayFare Freight

Single-page static website for WayFare Freight Pte Ltd, adapted from the LeadPage Bootstrap template. It consolidates the About Us, Sea Freight, Air Freight, Container Specification and Contact Us pages from [the original WordPress site](https://wayfarefreight.wordpress.com/). All 14 distinct images used across those pages are stored locally in `assets/img/wayfare/` and used on the page.

Open `index.html` directly, or serve the directory with `python -m http.server 8765` for local preview. All page sections live in `index.html`; styling is in `assets/css/wayfare.css` and the mobile menu is in `assets/js/wayfare.js`.

The site has no backend. Contact links open the visitor's email client or phone dialer.

The sea-shipment phone numbers on the source page are formatted ambiguously (`+65 9777 232265 / +9628 3882`). The page preserves that text with a verification note, while using the published ocean-team email as the direct contact link.
