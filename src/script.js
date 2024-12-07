'use strict';

/**
 * START LOAD
 */
const start_load = document.querySelector("[data-start-load]");
const body = document.body;

window.addEventListener("load", () => {
    setTimeout(() => {
        start_load.classList.add("active");
        body.classList.add("load");
    }, 1000);
});

/**
 * NAVBAR & BTN BACK TOP
 */
const navbar = document.querySelector("[data-navbar]");
const back_top_btn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
    if (scrollY >= 300) {
        navbar.classList.add("active");
        back_top_btn.classList.add("active");
    } else {
        navbar.classList.remove("active");
        back_top_btn.classList.remove("active");
    };
});

/**
 * SECTION AREAS
 */
const counters = document.querySelectorAll("[data-counter]");
const observerOptions = {
  root: null,
  threshold: 0.5,
};

const startCounting = (entry) => {
  const counter = entry.target;
  const target = +counter.getAttribute("data-target");
  const duration = 3000;
  const increment = target / (duration / 16);

  let current = 0;
  const updateCounter = () => {
    current += increment;
    if (current >= target) {
      counter.textContent = target;
    } else {
      counter.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    }
  };

  updateCounter();
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounting(entry);
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
counters.forEach(counter => observer.observe(counter));