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
    // After a link to a section, the scroll comes from the link, not from
    // reading, so the header stays to show where the visitor landed.
    let pinnedUntil = 0;
    const onClick = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest('a[href*="#"]')
      ) {
        pinnedUntil = performance.now() + 1500;
        element.dataset.away = "false";
      }
    };

    const update = () => {
      queued = 0;
      const current = window.scrollY;
      const moved = current - last;
      if (Math.abs(moved) < 6) return;
      const pinned = performance.now() < pinnedUntil;
      element.dataset.away = String(moved > 0 && !pinned && current > 80);
      last = current;
    };
    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(queued);
    };
  }, []);

  return (
    <header
      ref={header}
      className="bg-bg ease-out-quint sticky top-0 z-10 [view-transition-name:site-header] transition-transform duration-500 data-[away=true]:not-has-[:focus-visible]:-translate-y-full motion-reduce:transition-none"
    >
      {children}
    </header>
  );
}
