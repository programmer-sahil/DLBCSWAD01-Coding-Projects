"use strict";

const body = document.body;
const layoutButtons = document.querySelectorAll("[data-layout-choice]");
const layoutDescription = document.querySelector("#layout-description");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const year = document.querySelector("#year");

const descriptions = {
  fixed: "Fixed mode uses a 1,100-pixel canvas and intentionally causes horizontal overflow on narrow screens.",
  fluid: "Fluid mode uses 90% of the viewport, so components continuously expand and contract.",
  adaptive: "Adaptive mode switches among predefined 360, 680 and 1,000-pixel canvases at set breakpoints.",
  responsive: "Responsive mode combines flexible sizing, Grid, Flexbox and content-driven breakpoints."
};

function setLayout(layout) {
  if (!Object.hasOwn(descriptions, layout)) return;

  body.dataset.layout = layout;
  layoutDescription.textContent = descriptions[layout];

  layoutButtons.forEach((button) => {
    const isActive = button.dataset.layoutChoice === layout;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

layoutButtons.forEach((button) => {
  button.addEventListener("click", () => setLayout(button.dataset.layoutChoice));
});

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navigation.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

year.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => observer.observe(element));
}
