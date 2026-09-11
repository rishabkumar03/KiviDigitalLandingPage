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
    videoEditing:    { video: "https://res.cloudinary.com/orpxplwd/video/upload/v1786465909/VE.mp4", image: "", photos: [""] },
    contentCreation: { video: "https://res.cloudinary.com/orpxplwd/video/upload/v1786465911/CC.mp4", image: "", photos: [""] },
    graphicDesign:   { video: "https://res.cloudinary.com/orpxplwd/video/upload/v1786465909/GD.mp4", image: "", photos: [""] },
    webDevelopment:  { video: "https://res.cloudinary.com/orpxplwd/video/upload/v1786465910/web.mp4", image: "", photos: [""] },
    socialMedia:     { video: "https://res.cloudinary.com/orpxplwd/video/upload/v1786465908/SSM.mp4", image: "", photos: [""] },
    seoAds:          { video: "https://res.cloudinary.com/orpxplwd/video/upload/v1786465907/SEO.mp4", image: "", photos: [""] },
  },

  work: {
    itHub:      { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1788855441/ITHubInstitueWebLogo.jpg", logo: "" },
    niwasa:     { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1788855393/niwasaWebLogo.jpg", logo: "" },
    minePortal: { image: "https://res.cloudinary.com/s9nmor1b/image/upload/v1788855408/minePortalWebLogo.jpg", logo: "" },
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

  // Each process step (01–04) can take a short looping video for the
  // circular media window, uploaded the same way as everything else above.
  process: {
    discover:   { video: "https://res.cloudinary.com/orpxplwd/video/upload/v1786465911/CC.mp4", image: "" },
    strategize: { video: "https://res.cloudinary.com/orpxplwd/video/upload/v1786465907/SEO.mp4", image: "" },
    create:     { video: "https://res.cloudinary.com/orpxplwd/video/upload/v1786465909/GD.mp4", image: "" },
    launch:     { video: "https://res.cloudinary.com/s9nmor1b/video/upload/v1788863980/CC_202609081605.mp4", image: "" },
    optimize:   { video: "https://res.cloudinary.com/s9nmor1b/video/upload/v1788863979/CC_202609081608.mp4", image: "" },
    grow:       { video: "https://res.cloudinary.com/orpxplwd/video/upload/v1786465908/SSM.mp4", image: "" },
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
    member1: { image: "https://res.cloudinary.com/orpxplwd/image/upload/v1787511647/ChatGPT_Image_Aug_19_2026_11_23_23_PM.png", name: "Animesh Kumar", role: "Team Leader" },
    member2: { image: "https://res.cloudinary.com/orpxplwd/image/upload/v1787076774/mitali.jpg", name: "Mitali", role: "Content Creator/Manager" },
    member3: { image: "https://res.cloudinary.com/orpxplwd/image/upload/v1787076795/saksham.jpg", name: "Saksham", role: "Video Editor" },
    member4: { image: "https://res.cloudinary.com/orpxplwd/image/upload/v1787076796/Hassan.jpg", name: "Kamil Hassan", role: "Performance Analyst" },
    member5: { image: "https://res.cloudinary.com/orpxplwd/image/upload/v1787076796/gaurav.jpg", name: "Gaurav", role: "Faculty member" },
    member6: { image: "https://res.cloudinary.com/orpxplwd/image/upload/v1787076797/priyanshu.jpg", name: "Priyanshu", role: "Team coordinator" },
    member7: { image: "https://res.cloudinary.com/orpxplwd/image/upload/v1787077340/ChatGPT_Image_Aug_18_2026_11_51_05_PM.png", name: "Jyoti", role: "Web Designer/video Editor" },
  },
};

// Applies any URLs set above to the page. Elements without a matching
// data-media attribute are left as the built-in placeholder design.
// NOTE: the six WHAT WE DO videos, their photo slots, and the Journey/
// Road detail video are wired dynamically by js/main.js (they
// need the more robust load->canplay->play sequence and respond to
// user interaction), so this file only handles the static media below.
function applyMedia() {
  const setTestimonialLogo = (key, url) => {
    if (!url) return;
    const el = document.querySelector(`[data-media='${key}']`);
    if (!el) return;
    el.src = url;
    el.closest('.testimonial-logo').classList.add('has-media');
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

  // Generic helper: a "thumb" container that can hold either a looping
  // <video> or a background image (used by process steps).
  const setThumbMedia = (containerSelector, videoSelector, cfg) => {
    if (!cfg) return;
    const container = document.querySelector(containerSelector);
    if (cfg.video) {
      const source = document.querySelector(`${videoSelector} source`);
      const video = document.querySelector(videoSelector);
      if (source) source.src = cfg.video;
      if (video) {
        const reveal = () => { if (container) container.classList.add("has-media"); };
        video.addEventListener("loadeddata", reveal, { once: true });
        video.addEventListener("error", () => {
          if (container) container.classList.remove("has-media");
        }, { once: true });
        video.load();
        video.play().then(reveal).catch(() => {});
      }
    } else if (cfg.image) {
      if (container) {
        container.style.backgroundImage = `url('${cfg.image}')`;
        container.classList.add("has-media");
      }
    }
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
  setSrc("[data-media='work-kivi']", MEDIA.work.tejas.image, "background");
  setSrc("[data-media='work-ranchi-rise']", MEDIA.work.ranchiRise.image, "background");

  // Testimonial client logos
  setSrc("[data-media='testimonial-it-hub-logo']", MEDIA.testimonialLogos.itHub, "background");
  setSrc("[data-media='testimonial-niwasa-logo']", MEDIA.testimonialLogos.niwasa, "background");
  setSrc("[data-media='testimonial-ranchi-rise-logo']", MEDIA.testimonialLogos.ranchiRise, "background");

  // Process
  setThumbMedia("[data-media='process-discover']", "[data-media='process-discover-video']", MEDIA.process.discover);
  setThumbMedia("[data-media='process-strategize']", "[data-media='process-strategize-video']", MEDIA.process.strategize);
  setThumbMedia("[data-media='process-create']", "[data-media='process-create-video']", MEDIA.process.create);
  setThumbMedia("[data-media='process-launch']", "[data-media='process-launch-video']", MEDIA.process.launch);
  setThumbMedia("[data-media='process-optimize']", "[data-media='process-optimize-video']", MEDIA.process.optimize);
  setThumbMedia("[data-media='process-grow']", "[data-media='process-grow-video']", MEDIA.process.grow);

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
