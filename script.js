const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const year = document.querySelector("#year");
const revealElements = document.querySelectorAll(".reveal");
const heroStage = document.querySelector(".hero-stage");

if (year) {
  year.textContent = new Date().getFullYear().toString();
}

const updateHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (heroStage && !prefersReducedMotion) {
  const resetTilt = () => {
    heroStage.style.setProperty("--tilt-x", "0deg");
    heroStage.style.setProperty("--tilt-y", "0deg");
    heroStage.style.setProperty("--spot-x", "50%");
    heroStage.style.setProperty("--spot-y", "50%");
  };

  heroStage.addEventListener("pointermove", (event) => {
    const rect = heroStage.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const tiltX = (px - 0.5) * 8;
    const tiltY = (py - 0.5) * -8;

    heroStage.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    heroStage.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
    heroStage.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
    heroStage.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
  });

  heroStage.addEventListener("pointerleave", resetTilt);
}
