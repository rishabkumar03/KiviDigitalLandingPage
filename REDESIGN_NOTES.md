# KIVI DIGITAL — Redesign Handoff

The site has been refreshed in place without changing its static HTML/CSS/vanilla JavaScript architecture.

## Visual updates

- Replaced the original full-width dark hero with a premium split-screen hero: sage-green editorial copy panel on the left and a cinematic media panel on the right.
- Reused `images/kivi-logo.png` without changing the source asset.
- Added the new hero message: “Turning ideas into digital impact.”
- Added a glass-style “Explore more” CTA and a subtle showreel control overlay.
- Updated the global palette toward sage green, warm cream, off-white, charcoal, and restrained lime accents.
- Restyled navigation, cards, forms, contact, footer, and modal surfaces so the site reads as one cohesive visual system.
- Added responsive stacking for tablet and mobile layouts.

## Functionality preserved

- Existing GSAP intro, hero reveal, scroll reveal, and ScrollTrigger behavior.
- Existing hero media configuration through `js/media.js`.
- Existing media lightbox behavior.
- Existing navigation, mobile menu, service journey interactions, work scroller, and process sections.
- Existing contact form validation and configurable `CONTACT_ENDPOINT` hook.
- Existing Google Apps Script integration files and WhatsApp links.

## Editing locations

- Hero markup: `index.html`
- The complete editable theme and all styles: `css/style.css`
- Hero entrance sequence: `js/main.js` (`playHeroReveal`)
- Media URLs: `js/media.js`

## Simple manual color editing

Open `css/style.css` and search for `EDITABLE COLOR SYSTEM`. The variables immediately below that comment are the main controls for the website palette. The stylesheet is consolidated into one commented source of truth; there are no duplicate color override blocks. Change the hex values there and refresh the page; the sage sections, text, cards, buttons, and navigation use those variables.

The contact section is controlled by `--yellow-contact` and the `.sec-contact` block. The footer is intentionally controlled by `.footer { background: #000000; }`. The hero layout and content are not in this color-editing section and should be left unchanged when making palette edits.

The project remains deployable as a no-build static site.
