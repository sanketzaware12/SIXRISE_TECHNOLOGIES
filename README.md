# SIXRISE Digital Agency Website

A responsive multi-page digital agency website built with plain HTML, CSS and vanilla JavaScript. No framework, package manager or build step is required.

## Run locally
1. Extract the `SIXRISE-Digital-Agency.zip` file.
2. Open `index.html` in a modern browser.
3. Internet access is needed for Google Fonts, WhatsApp links and the live portfolio previews. The site itself has no build step.

## Files
- `index.html` — Home
- `about.html` — About
- `services.html` — Services overview and FAQ
- `service-*.html` — Six detailed service pages (opened by clicking any service card)
- `portfolio.html` — Filterable live website portfolio
- `contact.html` — Enquiry form that prepares a WhatsApp message
- `404.html` — Styled not-found page
- `assets/css/style.css` — All styling, responsive layouts and animations
- `assets/js/main.js` — Mobile menu, reveals, filtering, FAQ, forms and scroll progress
- `assets/images/` — SIXRISE logo (PNG, transparent) and favicon assets

## Replace before publishing
1. **Company details:** confirm the SIXRISE name/tagline and update the Organization JSON-LD URL in each page from `https://example.com` to the real domain.
2. **Email:** replace `hello@sixrise.example` with the official company email in the footer and Contact page.
3. **Address and map:** update the placeholder city/address and add the official Google Maps embed when available.
4. **Testimonials:** replace all sample testimonials with real, approved client feedback.
5. **Stats:** the home page sample figures (e.g. 25+ projects, 6+ industries) are placeholders. Use verified numbers.
6. **Team:** replace the sample team names, initials, roles and placeholder profiles on `about.html`.
7. **Social links:** replace generic Instagram and LinkedIn URLs with official company profiles.
8. **Working hours:** confirm the contact page working hours.
9. **WhatsApp/phone:** currently configured to `+91 86696 25676` / `918669625676`. Update both visible links and the JavaScript form target if needed.

## Edit portfolio projects
Open `portfolio.html` and locate the project cards inside `#portfolio-grid`. Add `data-featured` to exactly one card per category (shown in the "All projects" view); other cards need the `is-hidden` class so they only appear inside their category tab. Categories: Real Estate, Interior Design, Construction, Engineering, Spa & Wellness, Hotels & Hospitality, Cafés & Bakery, Restaurants & Catering, Event Management, Retail & Wholesale. New categories also need an option in the category dropdown (`#pf-dd-menu`). Each card has:
- `data-category` on the `<article>` — use one of `Real Estate`, `Construction`, `Interior Design`, `Engineering`, or `Spa & Wellness`.
- A live URL in the `<a href="...">` and its thumbnail source.
- A project title in `.project-body h3`.
- A category label in `.project-meta`.

Each card now embeds a live, scaled iframe preview of the site (scaled automatically by `main.js`), with a WordPress.com mShots screenshot underneath as a fallback:
`https://s.wordpress.com/mshots/v1/URL-ENCODED-SITE-URL?w=900&h=600`
They require internet and may take a little time to generate. A designed placeholder is shown if a thumbnail fails. Use a valid live website URL and set `target="_blank" rel="noopener"` on project links. Do not add private URLs or client work without permission.

## Design and accessibility notes
- Palette: navy `#282B4A`, cream `#EEEBDA`, dark navy `#1B1E36`, lighter navy `#3A3F6B`, accent gold `#D9A441`.
- The mobile navigation is a full-screen overlay with Escape/link/resize closing behaviour and scroll lock.
- Motion respects `prefers-reduced-motion`.
- Contact form validates fields and prepares a WhatsApp message; the user still needs to press Send inside WhatsApp.
- This is a static site. Form submissions are not stored in a database or sent to an email inbox.


## Home page redesign notes
The home page sections (hero, What we do, Selected work, Why SIXRISE, How we work, Who we work with) use the premium layer at the bottom of `style.css`. Any element with `data-tilt` gets the 3D tilt/spotlight hover from `main.js`. Client notes, the quote band and the mini project form were removed from the home page.
