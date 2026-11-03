"use client";

import { type ReactNode, useRef } from "react";

type ProjectTrackProps = {
  children: ReactNode;
  previousLabel: string;
  nextLabel: string;
};

// SPIKE. The native scroll-snap does the work. This only adds the arrows.
export function ProjectTrack({
  children,
  previousLabel,
  nextLabel,
}: ProjectTrackProps) {
  const track = useRef<HTMLUListElement>(null);

  function move(direction: 1 | -1) {
    const element = track.current;
    const slide = element?.querySelector("li");
    if (!element || !slide) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollBy({
      left: direction * (slide.offsetWidth + 32),
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <div>
      <ul ref={track} className="project-track">
        {children}
      </ul>
      <div className="page-frame mt-8 flex gap-2">
        <button
          type="button"
          aria-label={previousLabel}
          onClick={() => move(-1)}
          className="border-line inline-flex items-center justify-center border font-mono transition-opacity duration-150 hover:opacity-70"
        >
          &lt;
        </button>
        <button
          type="button"
          aria-label={nextLabel}
          onClick={() => move(1)}
          className="border-line inline-flex items-center justify-center border font-mono transition-opacity duration-150 hover:opacity-70"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
