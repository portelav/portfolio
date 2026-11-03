"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// SPIKE. Eases the wheel on the computer, so the scroll-driven moments glide
// instead of stepping. Touch keeps its own easing, and reduced motion turns it off.
export function SmoothScroll() {
  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = document.documentElement;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -56 } });
    let frame = 0;

    const raf = (time: number) => {
      // The page holds still while the preloader runs.
      if (root.dataset.reescrita) lenis.stop();
      else lenis.start();
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
