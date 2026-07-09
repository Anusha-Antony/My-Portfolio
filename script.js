document.addEventListener("DOMContentLoaded", () => {
  // Render lucide icons
  if (window.lucide) lucide.createIcons();

  // Wire up resume download links from the embedded base64 PDF
  const resumeUrl = `data:application/pdf;base64,${RESUME_BASE64}`;
  document
    .querySelectorAll(
      "#resume-link-desktop, #resume-link-mobile, #resume-link-hero, #resume-link-contact"
    )
    .forEach((el) => el.setAttribute("href", resumeUrl));

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Smooth scroll for all [data-scroll] buttons
  const menu = document.getElementById("mobile-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");

  function closeMobileMenu() {
    menu.classList.remove("open");
    menuIconOpen.style.display = "";
    menuIconClose.style.display = "none";
  }

  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-scroll");
      const target = document.getElementById(id);
      closeMobileMenu();
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuIconOpen.style.display = isOpen ? "none" : "";
    menuIconClose.style.display = isOpen ? "" : "none";
  });

  // Active nav link highlighting via IntersectionObserver
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(
    document.querySelectorAll("section[id]")
  ).filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-scroll") === id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));
});
