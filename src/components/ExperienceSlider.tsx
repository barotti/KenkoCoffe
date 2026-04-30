"use client";

import { useState } from "react";
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

  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActive((i) => (i + 1) % slides.length);

  return (
    <section className="exp-slider">
      <div className="exp-slider__track">
        {slides.map((slide, i) => {
          const inner = (
            <>
              <Image src={slide.image} alt={slide.title} fill sizes="25vw" className="exp-slider__img" />
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
    </section>
  );
}
