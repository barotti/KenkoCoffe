"use client";

import { useEffect } from "react";
import { initReveals } from "@/lib/gsap";

export function Reveal() {
  useEffect(() => {
    initReveals();
  }, []);

  return null;
}
