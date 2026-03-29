const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const year = document.querySelector("#year");
const revealElements = document.querySelectorAll(".reveal");
const orbitalStage = document.querySelector(".orbital-stage");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const faqItems = document.querySelectorAll(".faq-item");
const trackedSections = Array.from(document.querySelectorAll("section[id]"));
const navLinks = document.querySelectorAll(".site-nav a, .mobile-nav a");
const interestForm = document.querySelector("#interest-form");
const formNote = document.querySelector("#form-note");

if (year) {
  year.textContent = new Date().getFullYear().toString();
}

const setActiveLink = (sectionId) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("is-active", isActive);
  });
};

const updateHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMobileNav = () => {
  if (!menuToggle || !mobileNav) {
    return;
  }

  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("is-open");
};

const toggleMobileNav = () => {
  if (!menuToggle || !mobileNav) {
    return;
  }

  const isOpen = menuToggle.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  mobileNav.classList.toggle("is-open", isOpen);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMobileNav);
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

document.addEventListener("click", (event) => {
  if (!menuToggle || !mobileNav || !mobileNav.classList.contains("is-open")) {
    return;
  }

  if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMobileNav();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileNav();
  }
});

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (trackedSections.length && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleEntries.length) {
        return;
      }

      setActiveLink(visibleEntries[0].target.id);
    },
    {
      threshold: [0.2, 0.45, 0.7],
      rootMargin: "-22% 0px -55% 0px",
    }
  );

  trackedSections.forEach((section) => sectionObserver.observe(section));
  setActiveLink("offer");
}

if (orbitalStage && !prefersReducedMotion) {
  const resetTilt = () => {
    orbitalStage.style.setProperty("--tilt-x", "0deg");
    orbitalStage.style.setProperty("--tilt-y", "0deg");
  };

  orbitalStage.addEventListener("pointermove", (event) => {
    const rect = orbitalStage.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const tiltX = (px - 0.5) * 7;
    const tiltY = (py - 0.5) * -7;

    orbitalStage.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    orbitalStage.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
  });

  orbitalStage.addEventListener("pointerleave", resetTilt);
}

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const wasOpen = item.classList.contains("is-open");

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("is-open");
      const faqButton = faqItem.querySelector(".faq-question");
      if (faqButton) {
        faqButton.setAttribute("aria-expanded", "false");
      }
    });

    if (!wasOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

if (interestForm && formNote) {
  interestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#contact-name")?.value.trim() || "";
    const neighborhood = document.querySelector("#contact-neighborhood")?.value.trim() || "";
    const reason = document.querySelector("#contact-reason")?.value.trim() || "";
    const channel = document.querySelector("#contact-channel")?.value.trim() || "";
    const message = document.querySelector("#contact-message")?.value.trim() || "";

    if (!name || !neighborhood || !reason) {
      formNote.textContent = "Add your name, neighborhood, and reason first so the request is complete.";
      return;
    }

    const subject = encodeURIComponent(`Saturn coverage request | ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Neighborhood: ${neighborhood}`,
        `Reason: ${reason}`,
        `Best reply channel: ${channel || "Not provided"}`,
        "",
        "Message:",
        message || "No extra message provided.",
      ].join("\n")
    );

    formNote.textContent = "Opening your email app with the request details.";
    window.location.href = `mailto:info@saturndatasystems.lr?subject=${subject}&body=${body}`;
  });
}
