/**
 * KIVI DIGITAL — Centralized Media Configuration
 * ------------------------------------------------
 * This is the ONLY file you should need to edit to change images/videos.
 *
 * Workflow:
 *  1. Generate/export or upload your image/video
 *  2. Upload it to Cloudinary (or any host) — or drop a local file in
 *     images/ and use a relative path like "images/hero.mp4"
 *  3. Paste the URL/path into the matching field below
 *  4. Refresh the site — done.
 *
 * Leave a field empty ("") to fall back to the built-in placeholder look.
 * See ASSETS.md for exact recommended filenames, dimensions and formats.
 */

const MEDIA = {
  hero: {
    video: "https://res.cloudinary.com/s9nmor1b/video/upload/v1788955092/secondKiviWeb.mp4",
    poster: "",
  },

  // Each discipline in "WHAT WE DO" takes one looping video and one
  // photo slot. Add one image URL to the `photos` array when needed.
  services: {
    videoEditing:    { video: "https://res.cloudinary.com/s9nmor1b/video/upload/v1789386775/videoEditingKiviWeb.mp4", image: "", photos: [""] },
    contentCreation: { video: "https://res.cloudinary.com/s9nmor1b/video/upload/v1789386848/contentCreationKiviWeb.mp4", image: "", photos: [""] },
    graphicDesign:   { video: "https://res.cloudinary.com/s9nmor1b/video/upload/v1789386861/graphicDeisgnKiviWeb.mp4", image: "", photos: [""] },
    webDevelopment:  { video: "https://res.cloudinary.com/orpxplwd/video/upload/v1786465910/web.mp4", image: "", photos: [""] },
    socialMedia:     { video: "https://res.cloudinary.com/s9nmor1b/video/upload/v1789386860/socialMediaKiviWeb.mp4", image: "", photos: [""] },
    seoAds:          { video: "https://res.cloudinary.com/s9nmor1b/video/upload/v1789386851/SE_ADSKiviWeb.mp4", image: "", photos: [""] },
  },

  work: {
    itHub:      { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1788855441/ITHubInstitueWebLogo.jpg", logo: "" },
    niwasa:     { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1788855393/niwasaWebLogo.jpg", logo: "" },
    minePortal: { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1788855408/minePortalWebLogo.jpg", logo: "" },
    dhruviEvents: { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1790252820/dhruviLogo.jpg", logo: "" },
    tejas:      { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1788855355/TejasWebLogo.jpg", logo: "" },
    ranchiRise: { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1788855374/ranchiRiseWebLogo.jpg", logo: "" },
  },

  // Client logos shown above each testimonial. Paste a Cloudinary (or
  // any) image URL and it replaces the dashed placeholder automatically.
  testimonialLogos: {
    itHub: "https://res.cloudinary.com/s9nmor1b/image/upload/v1788855441/ITHubInstitueWebLogo.jpg",
    niwasa: "https://res.cloudinary.com/s9nmor1b/image/upload/v1788855393/niwasaWebLogo.jpg",
    ranchiRise: "https://res.cloudinary.com/s9nmor1b/image/upload/v1788855374/ranchiRiseWebLogo.jpg",
  },

  cta: {
    laptop: "",
    phone: "",
    decoration: "",
  },

  // Team photos — leave empty until you have real headshots. Paste a
  // Cloudinary (or any) image URL for each member and it swaps in
  // automatically, replacing the "Add photo" placeholder card.
  team: {
    member1: { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1789372262/WhatsApp_Image_2026-09-14_at_12.50.44_PM.jpg", name: "Animesh Kumar", role: "Founder & CEO" },
    member2: { image: "https://res.cloudinary.com/orpxplwd/image/upload/v1787076774/mitali.jpg", name: "Mittaly", role: "Content Creator & Manager" },
    member3: { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1789368734/rishabLinkedInPhoto.jpg", name: "Rishab", role: "Full-Stack Developer" },
    member4: { image: "https://res.cloudinary.com/orpxplwd/image/upload/v1787077340/ChatGPT_Image_Aug_18_2026_11_51_05_PM.png", name: "Jyoti", role: "Web Designer & Video Editor" },
    member5: { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1789369916/WhatsApp_Image_2026-09-14_at_12.35.39_PM.jpg", name: "Sagar", role: "Video Editor" },
    member6: { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1789370034/WhatsApp_Image_2026-09-14_at_12.39.12_PM.jpg", name: "Nikhil", role: "Video Editor" },
    member7: { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1789372002/gaurav.jpg", name: "Gaurav", role: "Faculty member" },
    member8: { image: "https://res.cloudinary.com/orpxplwd/image/upload/v1787076797/priyanshu.jpg", name: "Priyanshu", role: "Team coordinator" },
  },
};

// Applies any URLs set above to the page. Elements without a matching
// data-media attribute are left as the built-in placeholder design.
// NOTE: the six WHAT WE DO videos, their photo slots, and the Journey/
// Road detail video are wired dynamically by js/main.js (they
// need the more robust load->canplay->play sequence and respond to
// user interaction), so this file only handles the static media below.
// Process step icons are static Lottie animations set directly in
// index.html and are not part of this media-swap system.
function applyMedia() {
  const setTestimonialLogo = (key, url) => {
    if (!url) return;
    const el = document.querySelector(`[data-media='${key}']`);
    if (!el) return;
    el.src = url;
    el.closest('.testimonial-avatar').classList.add('has-media');
  };
  setTestimonialLogo('testimonial-it-hub-logo', MEDIA.testimonialLogos.itHub);
  setTestimonialLogo('testimonial-niwasa-logo', MEDIA.testimonialLogos.niwasa);
  setTestimonialLogo('testimonial-ranchi-rise-logo', MEDIA.testimonialLogos.ranchiRise);

  const setSrc = (selector, url, attr = "src") => {
    if (!url) return;
    document.querySelectorAll(selector).forEach((el) => {
      if (attr === "background") {
        el.style.backgroundImage = `url('${url}')`;
        el.classList.add("has-media");
      } else {
        el.setAttribute(attr, url);
        el.classList.add("has-media");
      }
    });
  };

  // Hero
  if (MEDIA.hero.video) {
    document.querySelectorAll("[data-media='hero-video'] source").forEach((s) => (s.src = MEDIA.hero.video));
    const v = document.querySelector("[data-media='hero-video'] video");
    if (v) {
      const heroMedia = document.querySelector(".hero-media");
      const reveal = () => { if (heroMedia) heroMedia.classList.add("has-media"); };
      v.addEventListener("loadeddata", reveal, { once: true });
      v.addEventListener("error", () => {
        if (heroMedia) heroMedia.classList.remove("has-media");
        console.error("Hero video failed to load:", MEDIA.hero.video, v.error);
      }, { once: true });
      v.load();
      v.play().then(reveal).catch(() => {});
    }
  }
  setSrc("[data-media='hero-poster']", MEDIA.hero.poster, "poster");

  // Work
  setSrc("[data-media='work-it-hub']", MEDIA.work.itHub.image, "background");
  setSrc("[data-media='work-niwasa']", MEDIA.work.niwasa.image, "background");
  setSrc("[data-media='work-mine-portal']", MEDIA.work.minePortal.image, "background");
  setSrc("[data-media='work-dhruvi-events']", MEDIA.work.dhruviEvents.image, "background");
  setSrc("[data-media='work-kivi']", MEDIA.work.tejas.image, "background");
  setSrc("[data-media='work-ranchi-rise']", MEDIA.work.ranchiRise.image, "background");

  // Testimonial client logos are handled above via setTestimonialLogo().

  // Process — icons are now static Lottie animations wired directly in
  // index.html, so no runtime media wiring is needed here.

  // CTA
  setSrc("[data-media='cta-laptop']", MEDIA.cta.laptop, "background");
  setSrc("[data-media='cta-phone']", MEDIA.cta.phone, "background");
  setSrc("[data-media='cta-decoration']", MEDIA.cta.decoration, "background");

  // Team — swaps the placeholder card for a real photo once set above.
  const setTeamPhoto = (key, cfg) => {
    if (!cfg || !cfg.image) return;
    const el = document.querySelector(`[data-media='${key}']`);
    if (!el) return;
    el.style.backgroundImage = `url('${cfg.image}')`;
    el.classList.add("has-media");
    const placeholder = el.querySelector(".team-placeholder");
    if (placeholder) placeholder.style.display = "none";
  };
  setTeamPhoto("team-01", MEDIA.team.member1);
  setTeamPhoto("team-02", MEDIA.team.member2);
  setTeamPhoto("team-03", MEDIA.team.member3);
  setTeamPhoto("team-04", MEDIA.team.member4);
  setTeamPhoto("team-05", MEDIA.team.member5);
  setTeamPhoto("team-06", MEDIA.team.member6);
  setTeamPhoto("team-07", MEDIA.team.member7);
  setTeamPhoto("team-08", MEDIA.team.member8);

  document.querySelectorAll("[data-team-card]").forEach((card, index) => {
    const cfg = MEDIA.team[`member${index + 1}`];
    if (!cfg) return;
    const name = card.querySelector(".team-meta strong");
    const role = card.querySelector(".team-meta span");
    if (name && cfg.name) name.textContent = cfg.name;
    if (role && cfg.role) role.textContent = cfg.role;
  });
}

document.addEventListener("DOMContentLoaded", applyMedia);