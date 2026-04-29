"use client";

export async function initReveals() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;

  if (reduceMotion) return;
  if (document.documentElement.dataset.revealsReady === "true") return;
  document.documentElement.dataset.revealsReady = "true";

  const gsapModule = await import("gsap");
  const scrollTriggerModule = await import("gsap/ScrollTrigger");
  const gsap = gsapModule.gsap;
  const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);

  gsap
    .timeline({ delay: 0.15 })
    .fromTo(
      "[data-hero-reveal]",
      {
        autoAlpha: 0,
        y: 34,
        scale: 0.98,
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
      },
    );

  gsap.from("[data-reveal]", {
    opacity: 0,
    y: 24,
    duration: 0.8,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "main",
      start: "top 85%",
    },
  });

  if (!isSmallScreen) {
    gsap.to("[data-parallax]", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-parallax]",
        scrub: true,
      },
    });
  }
}
