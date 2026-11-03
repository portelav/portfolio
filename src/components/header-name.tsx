"use client";

import { type ReactNode, useEffect, useRef } from "react";

type HeaderNameProps = {
  children: ReactNode;
};

// Shows the name in the header only while the opening is off screen. A page
// without an opening, like the 404, always shows it.
export function HeaderName({ children }: HeaderNameProps) {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;

    const opening = document.querySelector("[data-abertura]");
    if (!opening) {
      element.dataset.visible = "true";
      return;
    }

    // The opening counts as gone once only the part behind the header is left.
    const observer = new IntersectionObserver(
      ([entry]) => {
        element.dataset.visible = String(!entry.isIntersecting);
      },
      { rootMargin: "-64px 0px 0px 0px" },
    );
    observer.observe(opening);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      className="invisible -translate-y-1 opacity-0 transition-[opacity,transform,visibility] duration-150 ease-out data-[visible=true]:visible data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
    >
      {children}
    </div>
  );
}
