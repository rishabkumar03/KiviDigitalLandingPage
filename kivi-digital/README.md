# KIVI DIGITAL — Website

A production-ready site for KIVI DIGITAL, built with a deliberately **simple,
no-build-step stack** — plain HTML, CSS and JavaScript, plus GSAP for
animation. There's nothing to install and nothing to compile: open
`index.html` in a browser and it works, or upload the whole folder to any
static host (Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Tech stack

- **HTML5 / CSS3 / vanilla JavaScript** — no framework, no bundler, no `npm install`
- **GSAP + ScrollTrigger** (loaded from a CDN) — hero entrance, scroll reveals, stagger, parallax, all respecting `prefers-reduced-motion`
- **Google Apps Script** (optional, free) — contact form → email + Google Sheet, with no server to run and no secrets in the browser

This keeps the whole project to a handful of files you can read top-to-bottom
in a few minutes, while still delivering everything in the brief: responsive
layout, accessible markup, a working contact form, WhatsApp integration, and
an easy way to swap in real media.

## The scroll animation system

`js/main.js` is organized into one function per effect (the same
shape `lib/animations/*.ts` files would take in a bundled project, just
without the build step):

| Function | What it does |
|---|---|
| `initHeroScroll()` | Hero video scales up and the logo/tagline drift upward as you scroll past it, tied to scroll position (not a one-off fade) |
| `initTextReveal()` | Headings sit in an overflow-hidden "mask" and slide up into view line by line |
| `initGhostBackgroundText()` | The giant "WHAT WE DO" / "OUR PROCESS" background type fades in, then drifts slowly as you scroll — part of the page composition |
| `initServiceCards()` | Cards stagger in; each thumbnail reveals via `clip-path` + scale, then parallaxes slightly as the card passes through view |
| `initWorkHorizontalScroll()` | **Desktop:** the Selected Work section pins and translates horizontally as you scroll vertically, with each card scaling/settling into place. **Mobile:** falls back to native swipe-scroll with a simple entrance stagger |
| `initProcessSequence()` | **Desktop:** the section pins and each step (Discover → Strategize → Create → Grow) activates in turn as you scroll, dimming the previous one. **Mobile:** a lighter sequential stagger, no pin |
| `initCTA()` | "Have an idea?" → each heading line → the button reveal in sequence; laptop/phone/decoration settle in at different speeds and add a subtle mouse-follow parallax on desktop |
| `initReducedMotion()` | If `prefers-reduced-motion` is set, all of the above is swapped for simple opacity fades — no parallax, no pinning, fully usable |

Desktop-only effects (pinning, horizontal scroll, mouse parallax) are scoped
with `gsap.matchMedia()`, so resizing across the 1024px breakpoint cleanly
tears down and rebuilds the right version — mobile never runs the heavier
desktop code.

## Project structure

```
kivi-digital/
├── index.html                  Home page
├── contact.html                Redirects to index.html#contact
├── css/
│   └── style.css                All styles
├── js/
│   ├── media.js                 Media URLs and team data
│   └── main.js                  Animations, lightbox, form logic
├── images/
│   ├── kivi-logo.png            Site logo
│   └── BG.PNG                   Local image asset
├── google-apps-script/
│   └── Code.gs                  Optional email + Sheet backend
├── ASSETS.md                    Asset specs
└── README.md                    This file
```

## 1. Preview it right now

Just open `index.html` in a browser — no server required. (Some browsers
block `fetch`/video autoplay quirks on `file://`; if anything looks off,
run any static server, e.g. `npx serve .` or Python's
`python3 -m http.server`, and open `http://localhost`.)

## 2. Add your real images & video

Everything image/video-related is centralized in **`js/media.js`**.
Generate the assets described in `ASSETS.md`, upload them anywhere (Cloudinary
works great and is free for this volume), and paste each URL into that one
file. You never need to touch the HTML.

## 3. Turn on the contact form (email + Google Sheet)

The contact form works out of the box — validation, honeypot spam trap, and
a success/error message all function with zero setup. To actually deliver
submissions to your inbox and a spreadsheet:

1. Open `google-apps-script/Code.gs` — it has full step-by-step setup
   instructions in the comments (create a Sheet, paste the script, deploy as
   a Web App, copy the URL).
2. Open `contact.html`, find this line near the bottom:
   ```html
   <script>window.CONTACT_ENDPOINT = "";</script>
   ```
   and paste your deployed Apps Script URL in between the quotes.
3. Save. Every submission now appends a row to your Google Sheet
   (Timestamp, Name, Email, Phone, Company, Service, Message, Source, Page)
   and emails a formatted notification to **jyoti30505@gmail.com**.

No API keys, credentials, or secrets ever appear in the browser — the whole
integration runs on Google's servers under your account.

> Prefer a different backend later (e.g. a Node/serverless API)? The
> frontend already POSTs a clean JSON payload to a single configurable
> `CONTACT_ENDPOINT`, so you can point it at anything that accepts the same
> shape without touching the form markup or validation.

## 4. Deploy

Any static host works. For Vercel: `vercel deploy` from this folder (no
build command needed — it's static). For Netlify: drag-and-drop the folder
in the dashboard.

## Notes on scope

This build intentionally uses a lighter stack than a Next.js/React/R3F/GSAP
setup with a custom Node API — that's a much larger project with a build
pipeline, hosting for the API, and third-party credentials to manage. This
version keeps the exact same visual identity, section order, animations, and
functionality (contact form, email + Sheet delivery, WhatsApp, centralized
media config) but in a form that's simple to read, edit, and host anywhere
for free. If you outgrow it later — e.g. you want the R3F 3D touches or a
CMS — the HTML/CSS here translates directly into React components.
