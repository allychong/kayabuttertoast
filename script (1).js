document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");

  // Smooth scroll on nav click
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

  // Highlight the nav link for the section currently in view
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.style.background = active ? "var(--gold-500)" : "";
            link.style.color = active ? "var(--navy-900)" : "";
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
  }
});
