
# Classic Business Centre Goa — Redesign Architecture & UI/UX Guide

## Sitemap
- `index.html` — conversion-first homepage: legacy, 30-year positioning, trust stats, featured services, branch preview, print-request CTA.
- `services.html` — searchable and filterable service catalog with expandable service cards, GSM/media notes and customer-friendly price factors.
- `branches.html` — all 5 branches, explicitly showing 2 Panaji locations and branch-routing guidance.
- `print-request.html` — animated 4-step print-job request interface with live progress, live summary and WhatsApp message builder. File attachment is intentionally handled inside WhatsApp after the message opens.

## Layout Strategy
The website is mobile-first. Every section collapses into a single-column flow on phones, with sticky navigation, thumb-friendly CTAs, large tap targets and short scannable cards. Desktop adds premium whitespace, split hero panels, glass cards and interactive catalog grids.

## Color Palette
- Forest Green `#006837` — core CBC identity, CTAs, active states.
- Deep Ink `#14221b` — serious corporate text tone.
- Soft Cream `#fbf6e9` / Paper White `#fffdf6` — print-paper warmth.
- Production Blue `#137eb8` — technical/CAD accent.
- Registration Gold `#f4b827` — subtle print-finishing accent.

## Typography
- `Manrope` for large, modern corporate headings.
- `Inter` for body, forms and interface clarity.

## Animation Logic
- Floating transparent PNGs represent print objects: paper stack, printer, ink drop, plot roll, crop mark and business card.
- Motion is slow, low-opacity and offset per object so it feels like premium background atmosphere, not childish decoration.
- Cards use small translate/hover motion. Form steps animate in and progress updates smoothly.
- IntersectionObserver reveals sections on scroll without heavy libraries.

## Production Notes
- No backend required. The request flow uses WhatsApp API with a structured message.
- File upload cannot attach files to WhatsApp automatically from a browser-only static site; the UI collects file names and tells the customer to send the file in the WhatsApp chat.
- Verify exact branch addresses/phone numbers before final deployment if CBC wants every branch published with full address precision.


## Latest Revision
- Added dark/light mode toggle in the header across all pages.
- Replaced catalogue/service images with internet-hosted print example visuals and added small printout sample overlays.
- Removed website file-upload controls from the print request flow; customers now send details first and attach files directly in WhatsApp.
- Removed internal/developer explanation copy from the customer-facing print request page.


## v4 updates
- Service catalogue visuals now use the provided print-production images in `assets/images/services/`.
- Homepage includes an editable store photo placeholder section. Replace the placeholder cards by adding real store photos under `assets/images/store/` and updating the section markup when ready.
