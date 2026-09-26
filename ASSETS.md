# KIVI DIGITAL — Asset Guide

This file lists every image/video the site can use, with the exact filename,
recommended size, format, and where it appears. Generate or export each
asset, upload it to Cloudinary (or any host), then paste the URL into
**`js/media.js`** — nothing else needs to change.

Until you add a URL, that spot uses a clean built-in placeholder, so the
site works and looks intentional right away.

---

## 1. Hero

**File:** `hero-video.mp4` (optional: `.webm` too)
**Size:** 1920×1080, 10–15 seconds, looping, no audio needed (muted autoplay)
**Format:** MP4 (H.264), compressed to a few MB
**Where:** Full-width rounded video panel under the "Kivi Digital" logo
**Composition:** Calm, wide establishing shot — landscape, cityscape, or brand
b-roll. Should loop seamlessly.

**File:** `hero-poster.jpg`
**Size:** 1920×1080
**Format:** JPG/WebP
**Where:** Shown while the video loads (`MEDIA.hero.poster`)

---

## 2. Services (6 images)

**Size:** 1200×1200 (square)
**Format:** WebP
**Transparent background:** Not required — cards have their own background
**Where:** Icon/thumbnail inside each service card, `WHAT WE DO` grid

| Filename | Service |
|---|---|
| `service-video-editing.webp` | Video Editing |
| `service-content-creation.webp` | Content Creation |
| `service-graphic-design.webp` | Graphic Design |
| `service-web-development.webp` | Web Development |
| `service-social-media.webp` | Social Media Marketing |
| `service-seo-ads.webp` | SEO / Meta Ads |

**Composition:** A simple, on-brand still or icon-style graphic representing
each service — a timeline for video editing, a camera/mic setup for content,
a mockup or palette for design, a screen/code for dev, a phone grid for
social.

---

## 3. Selected Work (5 projects, image + logo each)

**Image size:** 1000×1300 (portrait, 3:4)
**Logo size:** 400×160 (transparent PNG/WebP)
**Format:** WebP (images), PNG/WebP with transparency (logos)
**Where:** "Selected Work" horizontal cards

| Project | Image filename | Logo filename |
|---|---|---|
| IT Hub Institute | `work-it-hub.webp` | `work-it-hub-logo.webp` |
| Niwasa Interiors | `work-niwasa.webp` | `work-niwasa-logo.webp` |
| Mine Portal | `work-mine-portal.webp` | `work-mine-portal-logo.webp` |
| Kivi Digital | `work-kivi.webp` | `work-kivi-logo.webp` |
| Ranchi Rise Realty | `work-ranchi-rise.webp` | `work-ranchi-rise-logo.webp` |

**Composition:** A representative screenshot or styled mockup of the project,
dark-toned or color-graded so white logo/text overlays stay readable at the
bottom of the card.

---

## 4. Process (4 icons)

**Size:** 800×800
**Format:** WebP, transparent background recommended
**Where:** Small circular icon above each process step label

| Filename | Step |
|---|---|
| `process-discover.webp` | 01 Discover |
| `process-strategize.webp` | 02 Strategize |
| `process-create.webp` | 03 Create |
| `process-grow.webp` | 04 Grow |

---

## 5. CTA

**Files:** `cta-laptop.webp`, `cta-phone.webp`, `cta-decoration.webp`
**Size:** Laptop/phone mockups ~1200×1200, transparent background
**Format:** WebP with transparency
**Where:** Decorative devices/shapes inside the green "Let's Make Something
Amazing" panel
**Composition:** A laptop mockup showing the site or brand, a phone mockup
alongside it, plus 1–2 small abstract shapes for the floating decoration
dots (these can also stay as the built-in plain circles).

---

## 6. WHAT WE DO — one photo per discipline

**Files:** one photo per discipline (6 total), landscape ~16:10
**Format:** JPG/WebP
**Where:** the single photo slot under each of the six discipline write-ups
**Where to paste:** `js/media.js` → `services.<name>.photos` —
an array with one URL, e.g. `photos: ["url1"]`. Leave the entry as
`""` to keep the clean dashed placeholder for that slot.

---

## How to wire an asset in

1. Generate/export the file using the spec above.
2. Upload it to Cloudinary.
3. Copy the delivered URL.
4. Open `js/media.js` and paste the URL into the matching field,
   e.g.:

   ```js
   hero: {
     video: "https://res.cloudinary.com/your-cloud/video/upload/hero-video.mp4",
     poster: "https://res.cloudinary.com/your-cloud/image/upload/hero-poster.jpg",
   },
   ```
5. Save and refresh — no other file needs to change.
