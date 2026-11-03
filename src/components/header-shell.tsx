"use client";

import { type ReactNode, useEffect, useRef } from "react";

// The header leaves while the visitor reads down and returns on the way up.
// Keyboard focus inside it always brings it back, through CSS.
export function HeaderShell({ children }: { children: ReactNode }) {
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = header.current;
    if (!element) return;

    let last = window.scrollY;
    let queued = 0;

    const update = () => {
      queued = 0;
      const current = window.scrollY;
      if (Math.abs(current - last) < 6) return;
      element.dataset.away = String(current > last && current > 80);
      last = current;
    };
    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(queued);
    };
  }, []);

  return (
    <header
      ref={header}
      className="bg-bg ease-out-quint sticky top-0 z-10 transition-transform duration-500 data-[away=true]:not-focus-within:-translate-y-full motion-reduce:transition-none"
    >
      {children}
    </header>
  );
}
