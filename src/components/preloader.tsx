"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { sequenceDuration } from "@/lib/reescrita-timeline";

const HOLD_AFTER_SEQUENCE = 350;
const FLIGHT = 800;

// SPIKE. The name is rewritten on a clean screen, then flies to the header.
// The flag is set in the head, before the first paint, on every page load.
export function Preloader({ children }: { children: ReactNode }) {
  const name = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.dataset.reescrita) return;

    const timer = setTimeout(() => {
      const source = name.current;
      const target = document.querySelector("[data-header-name] svg");
      if (!source || !target) {
        delete root.dataset.reescrita;
        return;
      }

      const from = source.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const easing = "cubic-bezier(0.77, 0, 0.175, 1)";

      veil.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: FLIGHT,
        easing,
        fill: "forwards",
      });
      const flight = source.animate(
        [
          { transform: "none" },
          {
            transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width})`,
          },
        ],
        { duration: FLIGHT, easing, fill: "forwards" },
      );
      flight.onfinish = () => {
        delete root.dataset.reescrita;
      };
    }, sequenceDuration + HOLD_AFTER_SEQUENCE);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="preloader" aria-hidden="true">
      <div ref={veil} className="bg-bg absolute inset-0" />
      <div ref={name} className="preloader-name relative origin-top-left">
        {children}
      </div>
    </div>
  );
}
