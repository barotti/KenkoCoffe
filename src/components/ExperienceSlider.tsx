"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    title: "Caffè",
    image: "/images/home/pexels-cihanyuce-30349793.jpg",
    href: "/caffe",
  },
  {
    title: "Colazione",
    image: "/images/home/DSC00998.png",
    href: null,
  },
  {
    title: "Aperitivi",
    image: "/images/home/DSC00818.PNG",
    href: null,
  },
  {
    title: "Eventi",
    image: "/images/home/_DSC4951.JPG",
    href: null,
  },
];

export function ExperienceSlider() {
  const [active, setActive] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const isProgrammatic = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActive((i) => (i + 1) % slides.length);

  // Mobile: scroll to active card when state changes
  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.innerWidth > 700) return;
    isProgrammatic.current = true;
    track.scrollTo({ left: active * track.clientWidth, behavior: "smooth" });
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => { isProgrammatic.current = false; }, 700);
  }, [active]);

  // Mobile: update active when user swipes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammatic.current || window.innerWidth > 700) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(track.children).indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root: track, threshold: 0.6 },
    );
    Array.from(track.children).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="exp-slider">
      <div className="exp-slider__track" ref={trackRef}>
        {slides.map((slide, i) => {
          const inner = (
            <>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 700px) 100vw, 25vw"
                className="exp-slider__img"
              />
              <div className="exp-slider__overlay" />
              <span className="exp-slider__title">{slide.title}</span>
              <span className="exp-slider__label" aria-hidden="true">Kenko Kohi</span>
              {i === 0 && (
                <button className="exp-slider__nav exp-slider__nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }}>
                  ← Prev
                </button>
              )}
              {i === slides.length - 1 && (
                <button className="exp-slider__nav exp-slider__nav--next" onClick={(e) => { e.stopPropagation(); next(); }}>
                  Next →
                </button>
              )}
            </>
          );

          return slide.href ? (
            <Link
              key={slide.title}
              href={slide.href}
              className={`exp-slider__panel${i === active ? " exp-slider__panel--active" : ""}`}
            >
              {inner}
            </Link>
          ) : (
            <div
              key={slide.title}
              className={`exp-slider__panel${i === active ? " exp-slider__panel--active" : ""}`}
              onClick={() => setActive(i)}
            >
              {inner}
            </div>
          );
        })}
      </div>

      <div className="exp-slider__dots" aria-hidden="true">
        {slides.map((s, i) => (
          <button
            key={s.title}
            className={`exp-slider__dot${i === active ? " exp-slider__dot--active" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}
