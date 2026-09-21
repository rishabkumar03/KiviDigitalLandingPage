/* =========================================================
   KIVI DIGITAL — main.js
   Intro sequence, nav, scroll reveals, WHAT WE DO media,
   the sitewide lightbox, and the real contact form submission logic.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initIntro();
  initNavbar();
  initNavPill();
  initFlipCardsTouch();
  initFlipCards();
  initMobileMenu();
  initHoverAnimText();
  initScrollReveals();
  initWhatWeDo();
  initServiceGraphs();
  initLightbox();
  initContactForm();
  initEyeFollowButtons();
  initCustomCursor();
});

/* =========================================================
   INTRO / LOADER
   ========================================================= */
function initIntro() {
  const intro = document.querySelector("[data-intro]");
  if (!intro) return;

  document.body.classList.add("intro-locked");

  const finish = () => {
    document.body.classList.remove("intro-locked");
    intro.style.pointerEvents = "none";
    intro.remove();
    playHeroReveal();
  };

  if (typeof gsap === "undefined") {
    intro.remove();
    document.body.classList.remove("intro-locked");
    playHeroReveal();
    return;
  }

  const mark = intro.querySelector("[data-intro-mark]");
  const tag = intro.querySelector("[data-intro-tag]");

  const tl = gsap.timeline({ onComplete: finish });
  tl.to(mark, { opacity: 1, scale: 1, duration: .75, ease: "power3.out" })
    .to(tag, { opacity: 1, duration: .4 }, "-=.25")
    .to([mark, tag], { opacity: 0, duration: .4, ease: "power1.in" }, "+=.55")
    .to(intro, { opacity: 0, duration: .5, ease: "power1.inOut" }, "-=.15");
}

function playHeroReveal() {
  const logo = document.querySelector("[data-hero-logo]");
  const copyPanel = document.querySelector(".hero-panel--copy");
  const mediaPanel = document.querySelector(".hero-panel--media");
  if (typeof gsap === "undefined") {
    if (logo) { logo.style.opacity = 1; logo.style.transform = "none"; }
    document.querySelectorAll(".sec-hero .reveal, [data-hero-title] .reveal-mask > span").forEach((el) => {
      el.style.opacity = 1; el.style.transform = "none";
    });
    return;
  }
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (copyPanel) {
    tl.fromTo(copyPanel, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: .85 });
  }
  if (mediaPanel) {
    tl.fromTo(mediaPanel, { opacity: 0, clipPath: "inset(0 0 0 9%)", scale: 1.03 }, { opacity: 1, clipPath: "inset(0 0 0 0%)", scale: 1, duration: 1.15 }, "-=.55");
  }
  if (logo) {
    tl.to(logo, { opacity: 1, y: 0, duration: .7 }, "-=.45");
  }
  tl.to("[data-hero-title] .reveal-mask > span", {
    y: 0, duration: .9, stagger: .09,
  }, "-=.35");
  tl.to(".sec-hero .reveal", {
    opacity: 1, y: 0, duration: .8, stagger: .08,
  }, "-=.48");
}

/* =========================================================
   NAVBAR — scrolled state
   ========================================================= */
function initNavbar() {
  const nav = document.querySelector("[data-navbar]");
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
  const btn = document.querySelector("[data-hamburger]");
  const panel = document.querySelector("[data-mobile-nav]");
  if (!btn || !panel) return;
  const close = () => { panel.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); };
  btn.addEventListener("click", () => {
    const open = panel.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
  panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}

function initNavPill() {
  const links = document.querySelectorAll('[data-nav-link]');
  const pill = document.querySelector('[data-nav-pill]');
  const container = document.querySelector('[data-nav-links]');
  if (!links.length || !pill || !container || prefersReducedMotion()) return;

  const stiffness = 350, damping = 26, mass = 1;
  let current = { x: 0, w: 0 }, target = { x: 0, w: 0 }, vel = { x: 0, w: 0 };
  let rafId = null;

  function step(cur, tgt, v, dt) {
    const accel = (-stiffness * (cur - tgt) - damping * v) / mass;
    v += accel * dt;
    cur += v * dt;
    return [cur, v];
  }

  function tick() {
    const dt = 1 / 60;
    [current.x, vel.x] = step(current.x, target.x, vel.x, dt);
    [current.w, vel.w] = step(current.w, target.w, vel.w, dt);
    pill.style.transform = `translateX(${current.x}px)`;
    pill.style.width = `${current.w}px`;
    const settled = Math.abs(target.x - current.x) < 0.4 && Math.abs(target.w - current.w) < 0.4
      && Math.abs(vel.x) < 0.4 && Math.abs(vel.w) < 0.4;
    rafId = settled ? null : requestAnimationFrame(tick);
  }

  function moveTo(el) {
    const linkRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    target.x = linkRect.left - containerRect.left;
    target.w = linkRect.width;
    pill.classList.add('is-active');
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  links.forEach((link) => link.addEventListener('mouseenter', () => moveTo(link)));
  container.addEventListener('mouseleave', () => pill.classList.remove('is-active'));
}

function initFlipCardsTouch() {
  document.querySelectorAll('.sec-services .wwd-item').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (window.matchMedia('(hover: hover)').matches) return;
      e.preventDefault();
      card.classList.toggle('is-flipped');
    });
  });
}

function initFlipCards() {
  const cards = document.querySelectorAll('[data-wwd-flip]');
  const reduced = prefersReducedMotion();
  const canHover = window.matchMedia('(hover: hover)').matches;

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });

    if (!canHover || reduced) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const maxTilt = 10;
      card.style.setProperty('--tiltY', `${px * maxTilt}deg`);
      card.style.setProperty('--tiltX', `${-py * maxTilt}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tiltY', '0deg');
      card.style.setProperty('--tiltX', '0deg');
    });
  });
}

/* =========================================================
   Hover-anim text swap fallback (pure CSS handles most of it)
   ========================================================= */
function initHoverAnimText() { /* handled in CSS */ }

/* =========================================================
   SCROLL REVEALS
   ========================================================= */
function initScrollReveals() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    document.querySelectorAll(".reveal, .reveal-mask span").forEach((el) => {
      el.style.opacity = 1; el.style.transform = "none";
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".section-title .reveal-mask span, .cta-title .reveal-mask span").forEach((el) => {
    gsap.to(el, {
      y: 0, duration: .8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  document.querySelectorAll(".section .reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: .7, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
    gsap.to(card, {
      opacity: 1, y: 0, duration: .6, ease: "power2.out", delay: i * .08,
      scrollTrigger: { trigger: card, start: "top 92%" },
    });
  });
}

/* =========================================================
   WHAT WE DO — six disciplines with one photo and one video per service
   ========================================================= */
function getServiceConfigByKey(key) {
  if (typeof MEDIA === "undefined") return null;
  const map = {
    "service-video-editing": MEDIA.services && MEDIA.services.videoEditing,
    "service-content-creation": MEDIA.services && MEDIA.services.contentCreation,
    "service-graphic-design": MEDIA.services && MEDIA.services.graphicDesign,
    "service-web-development": MEDIA.services && MEDIA.services.webDevelopment,
    "service-social-media": MEDIA.services && MEDIA.services.socialMedia,
    "service-seo-ads": MEDIA.services && MEDIA.services.seoAds,
  };
  return map[key] || null;
}

/* Reliable "load → become visible" wiring, per Rule 22:
   pause, set source, load(), wait for canplay/loadeddata, play(),
   then reveal. Visibility (has-media) is applied on loadeddata
   regardless of whether autoplay is allowed by the browser. */
function wireVideo(videoEl, container, url) {
  if (!videoEl || !url) return;
  const source = videoEl.querySelector("source");
  videoEl.pause();
  if (source) source.src = url;
  const reveal = () => { if (container) container.classList.add("has-media"); };
  videoEl.addEventListener("loadeddata", reveal, { once: true });
  videoEl.addEventListener("canplay", reveal, { once: true });
  videoEl.load();
  const playPromise = videoEl.play();
  if (playPromise && playPromise.catch) {
    playPromise.then(reveal).catch(() => { /* autoplay blocked — still becomes visible via loadeddata */ });
  }
}

function initWhatWeDo() {
  const items = document.querySelectorAll("[data-wwd-item]");
  if (!items.length) return;

  items.forEach((item) => {
    const media = item.querySelector(".wwd-media");
    if (!media) return;
    const key = media.dataset.media;
    const cfg = getServiceConfigByKey(key);
    const video = media.querySelector("video");
    if (cfg && cfg.video) {
      wireVideo(video, media, cfg.video);
    } else if (cfg && cfg.image) {
      media.style.backgroundImage = `url('${cfg.image}')`;
      media.classList.add("has-media");
    }

    // One photo slot per discipline
    item.querySelectorAll(".wwd-photo").forEach((photoEl, i) => {
      const photoKey = photoEl.dataset.media;
      const url = cfg && cfg.photos && cfg.photos[i];
      if (url) {
        photoEl.style.backgroundImage = `url('${url}')`;
        photoEl.classList.add("has-media");
      } else {
        const label = photoEl.querySelector(".wwd-photo-label");
        if (label) label.textContent = `Photo ${i + 1}`;
      }
    });
  });
}

/* =========================================================
   ROAD / JOURNEY — structured vertical route (Rule 10–14)
   ========================================================= */
/* =========================================================
   LIGHTBOX — every clickable video/image site-wide opens here
   (Rule 8). Supports:
   - type "video": plays the element's own <video> large, with controls
   - type "image": shows the element's background-image large
   - type "info": road-stop click — heading + text + optional video
   ========================================================= */
let lightboxState = { lastFocused: null };

function getLightboxEls() {
  return {
    root: document.querySelector("[data-lightbox]"),
    media: document.querySelector("[data-lightbox-media]"),
    info: document.querySelector("[data-lightbox-info]"),
  };
}

function closeLightbox() {
  const { root, media } = getLightboxEls();
  if (!root) return;
  root.classList.remove("is-open");
  root.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-locked");
  if (media) {
    const vid = media.querySelector("video");
    if (vid) vid.pause();
    media.innerHTML = "";
  }
  if (lightboxState.lastFocused && lightboxState.lastFocused.focus) {
    lightboxState.lastFocused.focus();
  }
}

function openLightbox({ type, mediaType, mediaSrc, poster, title, text }) {
  const { root, media, info } = getLightboxEls();
  if (!root || !media || !info) return;

  media.innerHTML = "";
  media.classList.remove("lightbox-svg");
  info.innerHTML = "";

  if (mediaType === "video" && mediaSrc) {
    const v = document.createElement("video");
    v.src = mediaSrc;
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    if (poster) v.poster = poster;
    media.appendChild(v);
  } else if (mediaType === "image" && mediaSrc) {
    const img = document.createElement("img");
    img.src = mediaSrc;
    img.alt = title || "";
    media.appendChild(img);
  } else if (mediaType === "svg" && mediaSrc) {
    media.classList.add("lightbox-svg");
    media.innerHTML = mediaSrc;
  } else {
    media.style.display = "none";
  }
  if (mediaType) media.style.display = "flex";

  if (title || text) {
    const eyebrow = document.createElement("span");
    eyebrow.className = "lightbox-info-eyebrow";
    eyebrow.textContent = "KIVI DIGITAL";
    info.appendChild(eyebrow);
    if (title) {
      const h3 = document.createElement("h3");
      h3.textContent = title;
      info.appendChild(h3);
    }
    if (text) {
      const p = document.createElement("p");
      p.textContent = text;
      info.appendChild(p);
    }
  }

  root.classList.add("is-open");
  root.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-locked");
}

function initLightbox() {
  const { root } = getLightboxEls();
  if (!root) return;

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox-trigger]");
    if (!trigger) return;
    e.preventDefault();
    lightboxState.lastFocused = trigger;

    const type = trigger.dataset.lightboxType;
    const title = trigger.dataset.lightboxTitle || "";

    if (type === "video") {
      const videoEl = trigger.querySelector("video");
      const src = videoEl && videoEl.querySelector("source") ? videoEl.querySelector("source").src : "";
      if (!src) return; // no media configured yet for this slot
      openLightbox({ type: "video", mediaType: "video", mediaSrc: src, title });
    } else if (type === "image") {
      // Support both background-image cards and real <img> elements.
      const imgEl = trigger.querySelector("img");
      let src = imgEl ? (imgEl.currentSrc || imgEl.src) : "";
      if (!src) {
        const bg = getComputedStyle(trigger).backgroundImage;
        const match = /url\(["']?(.*?)["']?\)/.exec(bg);
        src = match && match[1];
      }
      if (!src || src === "none") return; // no image configured yet for this slot
      openLightbox({ type: "image", mediaType: "image", mediaSrc: src, title });
    } else if (type === "svg") {
      const graph = trigger.querySelector("svg");
      if (!graph) return;
      openLightbox({ type: "svg", mediaType: "svg", mediaSrc: graph.outerHTML, title });
    }
  });

  root.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("is-open")) closeLightbox();
  });
}

/* =========================================================
   PICK A STOP — six services with always-visible animated graphs
   built with plain SVG — no charting library.
   ========================================================= */
const SERVICE_GRAPH_DATA = {
  "service-video-editing": { kind: "line", points: [100, 88, 74, 66, 60, 55, 52] },
  "service-content-creation": { kind: "bar", points: [30, 42, 55, 68, 80, 95] },
  "service-graphic-design": { kind: "line", points: [20, 28, 38, 52, 70, 90] },
  "service-web-development": { kind: "bar", points: [100, 42, 16] },
  "service-social-media": { kind: "line", points: [24, 30, 26, 44, 40, 58, 70] },
  "service-seo-ads": { kind: "line", points: [15, 22, 30, 42, 58, 76] },
};

function prefersReducedMotion() {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let serviceGraphId = 0;

function svgLineChart(points, accent) {
  const w = 280, h = 110, pad = 8;
  const gradientId = `serviceGraphFill${++serviceGraphId}`;
  const max = Math.max(...points), min = Math.min(...points);
  const range = (max - min) || 1;
  const stepX = (w - pad * 2) / (points.length - 1);
  const coords = points.map((v, i) => [
    pad + i * stepX,
    pad + (h - pad * 2) * (1 - (v - min) / range),
  ]);
  const d = coords.map((c, i) => (i === 0 ? `M${c[0].toFixed(1)},${c[1].toFixed(1)}` : `L${c[0].toFixed(1)},${c[1].toFixed(1)}`)).join(" ");
  const area = `${d} L${coords[coords.length - 1][0].toFixed(1)},${h - pad} L${coords[0][0].toFixed(1)},${h - pad} Z`;
  const dots = coords.map((c) => `<circle class="orb-graph-dot" cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="4"></circle>`).join("");
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity=".8"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient></defs>
    <path class="orb-graph-area" d="${area}"></path>
    <path class="orb-graph-line" data-orb-path d="${d}"></path>
    ${dots}
  </svg>`;
}

function svgBarChart(points) {
  const w = 280, h = 110, pad = 8, gap = 10;
  const max = Math.max(...points);
  const n = points.length;
  const barW = (w - pad * 2 - gap * (n - 1)) / n;
  const bars = points.map((v, i) => {
    const barH = (h - pad * 2) * (v / max);
    const x = pad + i * (barW + gap);
    const y = h - pad - barH;
    return `<rect class="orb-bar" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="4" style="transition-delay:${i * 70}ms;"></rect>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${bars}</svg>`;
}

function animateServiceGraphLine(container) {
  const path = container.querySelector("[data-orb-path]");
  if (!path) return;
  if (prefersReducedMotion()) return;
  const len = path.getTotalLength();
  path.style.strokeDasharray = String(len);
  path.style.strokeDashoffset = String(len);
  if (typeof gsap !== "undefined") {
    gsap.to(path, { strokeDashoffset: 0, duration: 1.05, ease: "power2.out", delay: .1 });
  } else {
    path.style.transition = "stroke-dashoffset 900ms ease .1s";
    requestAnimationFrame(() => requestAnimationFrame(() => { path.style.strokeDashoffset = "0"; }));
  }
}

function initServiceGraphs() {
  document.querySelectorAll("[data-service-graph]").forEach((container) => {
    const content = SERVICE_GRAPH_DATA[container.dataset.serviceGraph];
    if (!content) return;

    container.innerHTML = content.kind === "bar"
      ? svgBarChart(content.points)
      : svgLineChart(content.points, "currentColor");
    container.setAttribute("data-lightbox-trigger", "");
    container.setAttribute("data-lightbox-type", "svg");
    const titleEl = container.closest(".road-service")?.querySelector(".road-service-title");
    container.setAttribute("data-lightbox-title", titleEl ? titleEl.textContent.trim() : "Service Graph");

    if (content.kind === "line") {
      requestAnimationFrame(() => animateServiceGraphLine(container));
    }
  });
}

/* =========================================================
   Contact form — client-side validation + POST to
   window.CONTACT_ENDPOINT (Google Apps Script). Unchanged
   production backend contract.
   ========================================================= */
function initContactForm() {
  const forms = document.querySelectorAll("[data-contact-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    const statusEl = form.querySelector("[data-form-status]");
    const submitBtn = form.querySelector("[data-submit-btn]");

    const showStatus = (type, message) => {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.className = "form-status " + type;
    };

    const clearFieldError = (field) => {
      field.classList.remove("has-error");
      const err = field.querySelector(".field-error");
      if (err) err.textContent = "";
    };

    const setFieldError = (field, message) => {
      field.classList.add("has-error");
      const err = field.querySelector(".field-error");
      if (err) err.textContent = message;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Honeypot — if filled, silently pretend success (likely a bot)
      const honeypot = form.querySelector('input[name="company_website"]');
      if (honeypot && honeypot.value) {
        showStatus("success", "Thanks! We'll be in touch shortly.");
        form.reset();
        return;
      }

      let valid = true;
      form.querySelectorAll(".field").forEach((field) => {
        const input = field.querySelector("input, select, textarea");
        if (!input) return;
        clearFieldError(field);
        if (input.hasAttribute("required") && !input.value.trim()) {
          setFieldError(field, "This field is required.");
          valid = false;
        } else if (input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          setFieldError(field, "Please enter a valid email.");
          valid = false;
        }
      });

      if (!valid) {
        showStatus("error", "Please fix the highlighted fields and try again.");
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      delete data.company_website;
      data.source = "Website";
      data.page = window.location.pathname || "index.html";

      if (!window.CONTACT_ENDPOINT) {
        showStatus("error", "The form is not connected yet. Please use WhatsApp or email instead.");
        return;
      }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.classList.add("is-loading"); }
      showStatus("", "Sending your message…");

      try {
        await fetch(window.CONTACT_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(data),
        });
        showStatus("success", "Thanks! Your message has been submitted. We'll reply within one business day.");
        form.reset();
      } catch (err) {
        showStatus("error", "Something went wrong sending your message. Please try WhatsApp or email instead.");
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.classList.remove("is-loading"); }
      }
    });
  });
}

/* =========================================================
   EYE FOLLOW BUTTON COMPONENT
   Playful, highly interactive UI component with animated eyes
   whose pupils smoothly follow the user's cursor in real time.
   Supports full customization: link, colors, padding, radius,
   eye count, eye & pupil size, gap, speed, range, and blinking.
   ========================================================= */
function initEyeFollowButtons() {
  const buttons = document.querySelectorAll("[data-eye-btn]");
  if (!buttons.length) return;

  const instances = [];

  buttons.forEach((btn) => {
    // Read customizable properties with intelligent defaults
    const link = btn.dataset.link || btn.getAttribute("href") || "";
    const btnColor = btn.dataset.btnColor || "";
    const text = btn.dataset.text || "";
    const textColor = btn.dataset.textColor || "";
    const padding = btn.dataset.padding || "";
    const radius = btn.dataset.radius || "";
    const eyeColor = btn.dataset.eyeColor || "#ffffff";
    const pupilColor = btn.dataset.pupilColor || "#060c02";
    const eyeCount = parseInt(btn.dataset.eyeCount || "2", 10);
    const eyeSize = btn.dataset.eyeSize ? parseFloat(btn.dataset.eyeSize) : null;
    const pupilSize = btn.dataset.pupilSize ? parseFloat(btn.dataset.pupilSize) : null;
    const eyeGap = btn.dataset.eyeGap ? parseFloat(btn.dataset.eyeGap) : null;
    const speed = parseFloat(btn.dataset.speed || "0.18");
    const range = parseFloat(btn.dataset.range || "7");
    const blinking = btn.dataset.blinking !== "false";
    const blinkIntensity = parseFloat(btn.dataset.blinkIntensity || "1");

    // Apply inline style properties if configured
    if (btnColor) btn.style.setProperty("--btn-color", btnColor);
    if (textColor) btn.style.setProperty("--text-color", textColor);
    if (padding) btn.style.setProperty("--btn-padding", padding);
    if (radius) btn.style.setProperty("--btn-radius", radius);
    if (eyeColor) btn.style.setProperty("--eye-color", eyeColor);
    if (pupilColor) btn.style.setProperty("--pupil-color", pupilColor);
    if (eyeSize) btn.style.setProperty("--eye-size", `${eyeSize}px`);
    if (pupilSize) btn.style.setProperty("--pupil-size", `${pupilSize}px`);
    if (eyeGap) btn.style.setProperty("--eye-gap", `${eyeGap}px`);

    // Ensure link action
    if (link && !btn.getAttribute("href")) {
      btn.setAttribute("href", link);
    }
    // Smooth scroll for internal links
    btn.addEventListener("click", (e) => {
      const targetHref = btn.getAttribute("href") || link;
      if (targetHref && targetHref.startsWith("#")) {
        const targetEl = document.querySelector(targetHref);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    });

    // Ensure eye container exists
    let eyesContainer = btn.querySelector(".eye-btn-eyes");
    if (!eyesContainer) {
      eyesContainer = document.createElement("span");
      eyesContainer.className = "eye-btn-eyes";
      eyesContainer.setAttribute("aria-hidden", "true");
      btn.appendChild(eyesContainer);
    }

    // Build eyes if needed
    if (eyesContainer.children.length === 0) {
      for (let i = 0; i < eyeCount; i++) {
        const eyeEl = document.createElement("span");
        eyeEl.className = "eye-btn-eye";
        const pupilEl = document.createElement("span");
        pupilEl.className = "eye-btn-pupil";
        eyeEl.appendChild(pupilEl);
        eyesContainer.appendChild(eyeEl);
      }
    }

    const eyeObjects = Array.from(eyesContainer.querySelectorAll(".eye-btn-eye")).map((eyeEl) => ({
      el: eyeEl,
      pupil: eyeEl.querySelector(".eye-btn-pupil"),
      curX: 0,
      curY: 0,
      targetX: 0,
      targetY: 0,
    }));

    // Natural randomized blinking schedule
    if (blinking) {
      const scheduleBlink = () => {
        const delay = (3 + Math.random() * 3.5) * 1000;
        setTimeout(() => {
          eyeObjects.forEach((eye) => {
            eye.el.classList.add("is-blinking");
            eye.el.style.animationDuration = `${160 * blinkIntensity}ms`;
          });
          setTimeout(() => {
            eyeObjects.forEach((eye) => eye.el.classList.remove("is-blinking"));
            scheduleBlink();
          }, 180 * blinkIntensity);
        }, delay);
      };
      scheduleBlink();
    }

    instances.push({ btn, eyes: eyeObjects, speed, range });
  });

  // Track cursor position globally
  let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };

  window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  // Silky 60/120fps tick loop using smooth interpolation (lerp)
  function render() {
    instances.forEach(({ eyes, speed, range }) => {
      eyes.forEach((eye) => {
        if (pointer.active) {
          const rect = eye.el.getBoundingClientRect();
          const eyeCenterX = rect.left + rect.width / 2;
          const eyeCenterY = rect.top + rect.height / 2;

          const dx = pointer.x - eyeCenterX;
          const dy = pointer.y - eyeCenterY;
          const dist = Math.hypot(dx, dy);

          if (dist > 0) {
            const angle = Math.atan2(dy, dx);
            // Non-linear soft clamp: closer cursor moves pupil progressively up to max range
            const clampedDist = Math.min(dist * 0.12, range);
            eye.targetX = Math.cos(angle) * clampedDist;
            eye.targetY = Math.sin(angle) * clampedDist;
          }
        } else {
          eye.targetX = 0;
          eye.targetY = 0;
        }

        // Lerp pupil position
        eye.curX += (eye.targetX - eye.curX) * speed;
        eye.curY += (eye.targetY - eye.curY) * speed;

        if (eye.pupil) {
          eye.pupil.style.transform = `translate3d(${eye.curX.toFixed(2)}px, ${eye.curY.toFixed(2)}px, 0)`;
        }
      });
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* =========================================================
   CUSTOM CURSOR
   Replaces the native arrow with a lime ring that trails the
   pointer, grows over text, and swaps the hovered text lime.
   Skipped on touch/coarse-pointer devices (matches the
   `(hover: hover)` gate used elsewhere in this file).
   ========================================================= */
function initCustomCursor() {
  if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const cursor = document.createElement("div");
  cursor.className = "kv-cursor";
  cursor.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursor);
  document.documentElement.classList.add("kv-custom-cursor");

  const reduceMotion = prefersReducedMotion();
  const LERP = reduceMotion ? 1 : 0.18;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let curX = targetX;
  let curY = targetY;
  let hasMoved = false;

  function onMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!hasMoved) {
      curX = targetX;
      curY = targetY;
      hasMoved = true;
      cursor.classList.add("is-visible");
    }
  }

  function render() {
    curX += (targetX - curX) * LERP;
    curY += (targetY - curY) * LERP;
    cursor.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  document.addEventListener("mousemove", onMove, { passive: true });
  document.addEventListener("mouseleave", () => cursor.classList.remove("is-visible"));
  document.addEventListener("mouseenter", () => { if (hasMoved) cursor.classList.add("is-visible"); });

  // Elements the "hover text" (bigger ring) state applies to — the
  // hero h1 plus the 8 major section headings, each explicitly
  // marked with .kv-cursor-lg in the markup. Every other piece of
  // text (paragraphs, nav links, buttons, card copy, etc.) keeps the
  // default smaller ring on hover.
  const TEXT_SELECTOR = ".kv-cursor-lg";

  let hoveredTextEl = null;

  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest(TEXT_SELECTOR);
    if (!el) return;
    if (hoveredTextEl === el) return;
    if (hoveredTextEl) hoveredTextEl.classList.remove("kv-text-hovered");
    hoveredTextEl = el;
    hoveredTextEl.classList.add("kv-text-hovered");
    cursor.classList.add("is-hover-text");
  }, true);

  document.addEventListener("mouseout", (e) => {
    if (!hoveredTextEl) return;
    const related = e.relatedTarget;
    if (related && hoveredTextEl.contains(related)) return;
    hoveredTextEl.classList.remove("kv-text-hovered");
    hoveredTextEl = null;
    cursor.classList.remove("is-hover-text");
  }, true);
}