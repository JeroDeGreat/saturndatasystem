const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const year = document.querySelector("#year");
const revealElements = document.querySelectorAll(".reveal");
const hero = document.querySelector(".hero");
const heroScene = document.querySelector(".hero-scene");
const heroSteps = document.querySelectorAll(".hero-step");
const heroCards = document.querySelectorAll(".scene-card");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const faqItems = document.querySelectorAll(".faq-item");
const trackedSections = Array.from(document.querySelectorAll("section[id]"));
const navLinks = document.querySelectorAll(".site-nav a, .mobile-nav a");
const interestForm = document.querySelector("#interest-form");
const formNote = document.querySelector("#form-note");
const coverageChips = document.querySelectorAll(".coverage-chip");
const coverageStatusLabel = document.querySelector("#coverage-status-label");
const coverageTitle = document.querySelector("#coverage-title");
const coverageDescription = document.querySelector("#coverage-description");
const coveragePoints = document.querySelector("#coverage-points");
const coverageLink = document.querySelector("#coverage-link");

const coverageData = {
  monrovia: {
    status: "Active now",
    title: "Monrovia launch zone",
    description:
      "Saturn is actively positioning Monrovia as the first service zone, with neighborhood confirmation before activation.",
    points: [
      "Home internet requests are reviewed by neighborhood",
      "Best starting point for new household sign-ups",
      "Support and rollout are centered here first",
    ],
    link: "https://www.openstreetmap.org/search?query=Monrovia%20Liberia",
  },
  ul: {
    status: "Active access zone",
    title: "University of Liberia area",
    description:
      "Your current brief places short-session access around UL inside Saturn's active-use story, especially for students and quick one-device sessions.",
    points: [
      "Good fit for Quick Pass use",
      "Best for short study sessions and urgent online tasks",
      "Use the request form to confirm exact access points",
    ],
    link: "https://www.openstreetmap.org/search?query=University%20of%20Liberia%20Monrovia%20Liberia",
  },
  paynesville: {
    status: "Expansion queue",
    title: "Paynesville",
    description:
      "The Saturn launch materials identify Paynesville as part of the next expansion wave after the first Monrovia launch zone.",
    points: [
      "Not presented as live yet",
      "Part of the Greater Monrovia growth plan",
      "Register interest early so demand is visible",
    ],
    link: "https://www.openstreetmap.org/search?query=Paynesville%20Liberia",
  },
  "congo-town": {
    status: "Expansion queue",
    title: "Congo Town",
    description:
      "Congo Town sits inside the Greater Monrovia rollout path rather than the currently confirmed live zone.",
    points: [
      "Expansion target, not current live service",
      "Useful neighborhood to add to the request list",
      "Saturn can confirm timing by demand and rollout progress",
    ],
    link: "https://www.openstreetmap.org/search?query=Congo%20Town%20Liberia",
  },
  brewerville: {
    status: "Interest list",
    title: "Brewerville",
    description:
      "Brewerville is not live in the current Saturn coverage story yet, so requests there should be logged as interest rather than ready activation.",
    points: [
      "Not live yet",
      "Use the form to join the expansion interest list",
      "Good candidate for future growth once demand is clear",
    ],
    link: "https://www.openstreetmap.org/search?query=Brewerville%20Liberia",
  },
};

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

const setHeroPhase = (phase) => {
  if (!hero) {
    return;
  }

  const phaseValue = String(phase);
  hero.dataset.heroPhase = phaseValue;

  heroSteps.forEach((step) => {
    step.classList.toggle("is-active", step.dataset.phaseTarget === phaseValue);
  });

  heroCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.phaseCard === phaseValue);
  });
};

const updateHeroScrollState = () => {
  if (!hero) {
    return;
  }

  const rect = hero.getBoundingClientRect();
  const scrollableDistance = Math.max(hero.offsetHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);

  document.documentElement.style.setProperty("--hero-progress", progress.toFixed(3));

  let nextPhase = 0;
  if (progress >= 0.66) {
    nextPhase = 2;
  } else if (progress >= 0.33) {
    nextPhase = 1;
  }

  setHeroPhase(nextPhase);
};

const updateCoverageCard = (zoneKey) => {
  const zone = coverageData[zoneKey];
  if (!zone || !coverageStatusLabel || !coverageTitle || !coverageDescription || !coveragePoints || !coverageLink) {
    return;
  }

  coverageStatusLabel.textContent = zone.status;
  coverageTitle.textContent = zone.title;
  coverageDescription.textContent = zone.description;
  coveragePoints.innerHTML = zone.points.map((point) => `<li>${point}</li>`).join("");
  coverageLink.href = zone.link;
};

updateHeaderState();
updateHeroScrollState();
window.addEventListener(
  "scroll",
  () => {
    updateHeaderState();
    updateHeroScrollState();
  },
  { passive: true }
);
window.addEventListener("resize", updateHeroScrollState);

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
      rootMargin: "-20% 0px -55% 0px",
    }
  );

  trackedSections.forEach((section) => sectionObserver.observe(section));
  setActiveLink("home");
}

if (heroScene && !prefersReducedMotion) {
  const resetTilt = () => {
    heroScene.style.setProperty("--tilt-x", "0deg");
    heroScene.style.setProperty("--tilt-y", "0deg");
  };

  heroScene.addEventListener("pointermove", (event) => {
    const rect = heroScene.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const tiltX = (px - 0.5) * 7;
    const tiltY = (py - 0.5) * -7;

    heroScene.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    heroScene.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
  });

  heroScene.addEventListener("pointerleave", resetTilt);
}

coverageChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    coverageChips.forEach((button) => button.classList.remove("is-active"));
    chip.classList.add("is-active");
    updateCoverageCard(chip.dataset.zone || "monrovia");
  });
});

updateCoverageCard("monrovia");

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

    if (!name || !channel || !neighborhood || !reason) {
      formNote.textContent =
        "Add your name, phone or email, neighborhood, and request type first so Saturn can reply properly.";
      return;
    }

    const subject = encodeURIComponent(`Saturn request | ${reason} | ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Phone or email: ${channel}`,
        `Neighborhood: ${neighborhood}`,
        `Request type: ${reason}`,
        "",
        "Details:",
        message || "No extra details provided.",
      ].join("\n")
    );

    formNote.textContent = "Opening your email app with the request details.";
    window.location.href = `mailto:info@saturndatasystems.lr?subject=${subject}&body=${body}`;
  });
}
