"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useParams } from "next/navigation";

import { Link } from "@/i18n/navigation";

const sections = ["projetos", "sobre", "contato"] as const;
type Section = (typeof sections)[number];

type SiteNavProps = {
  label: string;
  items: Record<Section, string>;
};

// The section whose top has passed this share of the screen is the current one.
const readingLine = 0.4;

// Finds the section the visitor is reading: the last one whose top has passed
// the reading line. Above the projects, on the opening, none is current.
function sectionOnScreen(): Section | null {
  const line = window.innerHeight * readingLine;
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;
  if (atBottom && document.getElementById("contato")) return "contato";

  let found: Section | null = null;
  for (const id of sections) {
    const element = document.getElementById(id);
    if (element && element.getBoundingClientRect().top <= line) found = id;
  }
  return found;
}

// The computer menu. It marks where the visitor is: the section on screen on
// the home page, and the projects on a case. A line slides to the new item.
export function SiteNav({ label, items }: SiteNavProps) {
  const params = useParams<{ id?: string }>();
  const onCase = Boolean(params.id);
  const [onScreen, setOnScreen] = useState<Section | null>(null);
  const current = onCase ? "projetos" : onScreen;

  const box = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const links = useRef<Partial<Record<Section, HTMLAnchorElement | null>>>({});
  const shown = useRef(false);

  useEffect(() => {
    if (onCase) return;

    let queued = 0;
    const update = () => {
      queued = 0;
      setOnScreen(sectionOnScreen());
    };
    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(queued);
    };
  }, [onCase]);

  useLayoutEffect(() => {
    const line = bar.current;
    const frame = box.current;
    if (!line || !frame) return;

    const place = (animate: boolean) => {
      const link = current ? links.current[current] : null;
      if (!link) {
        line.style.opacity = "0";
        shown.current = false;
        return;
      }
      // The first time the line shows, it appears in place instead of sliding.
      // With reduced motion, it never moves nor fades.
      const still = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      line.style.transitionProperty = still
        ? "none"
        : animate && shown.current
          ? "transform, opacity"
          : "opacity";
      line.style.transform = `translateX(${link.offsetLeft}px) scaleX(${link.offsetWidth})`;
      line.style.opacity = "1";
      shown.current = true;
    };

    place(true);
    const observer = new ResizeObserver(() => place(false));
    observer.observe(frame);
    return () => observer.disconnect();
  }, [current]);

  return (
    <nav aria-label={label} className="mr-4 hidden md:block">
      <div ref={box} className="relative">
        <ul className="flex items-center gap-6">
          {sections.map((id) => (
            <li key={id}>
              <Link
                ref={(element) => {
                  links.current[id] = element;
                }}
                href={{ pathname: "/", hash: id }}
                transitionTypes={onCase ? ["nav-back"] : undefined}
                aria-current={current === id ? "location" : undefined}
                className={`inline-flex min-h-11 items-center font-mono text-sm transition-opacity duration-150 ${
                  current === id
                    ? "text-accent light:text-fg"
                    : "hover:opacity-70"
                }`}
              >
                {items[id]}
              </Link>
            </li>
          ))}
        </ul>
        <span
          ref={bar}
          aria-hidden="true"
          className="bg-accent ease-out-quint pointer-events-none absolute bottom-2 left-0 h-0.5 w-px origin-left opacity-0 duration-350 motion-reduce:transition-none"
        />
      </div>
    </nav>
  );
}
