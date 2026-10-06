// Mark the page as JS-enabled right away so reveal styles apply (no flash)
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");

  // ---- Smooth scroll on nav click ----
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;

      const section = document.querySelector(targetId);
      if (!section) return;

      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---- Reveal / expand content as it scrolls into view ----
  const revealTargets = document.querySelectorAll(
    ".section h2, .entry, .stat, .skill-card, .cert-list li, .contact-links, .section > p"
  );

  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    // small stagger for items that appear together in a grid/list
    if (el.matches(".stat, .skill-card, .cert-list li")) {
      el.style.setProperty("--delay", `${(i % 4) * 0.08}s`);
    }
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("in-view"));
  }

  // ---- Timeline line grows with scroll ----
  const timelines = document.querySelectorAll(".timeline");
  const updateTimelines = () => {
    const trigger = window.innerHeight * 0.6;
    timelines.forEach((tl) => {
      const rect = tl.getBoundingClientRect();
      const progress = Math.min(Math.max((trigger - rect.top) / rect.height, 0), 1);
      tl.style.setProperty("--line-progress", `${progress * 100}%`);
    });
  };

  // ---- Highlight active nav link ----
  const sections = document.querySelectorAll("main section[id]");
  const updateActiveNav = () => {
    const marker = window.innerHeight * 0.35;
    let currentId = "";
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) currentId = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateTimelines();
      updateActiveNav();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
});
