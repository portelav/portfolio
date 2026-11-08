"use client";

import { useLayoutEffect, useRef } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { type PageHref, type PageKey, pages } from "@/lib/pages";

type SiteNavProps = {
  label: string;
  items: Record<PageKey, string>;
};

// The page the visitor is on: the page itself, or the page above it, as the
// Projects page for a case. On the home page, none.
export function currentPage(pathname: string): PageHref | null {
  const page = pages.find(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
  );
  return page ? page.href : null;
}

// The computer menu. It links the pages and marks the one the visitor is on,
// with a line that slides to the new item (PRD, D70 and D78).
export function SiteNav({ label, items }: SiteNavProps) {
  const pathname = usePathname();
  const current = currentPage(pathname);
  const onCase = pathname.startsWith("/projetos/");

  const box = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const links = useRef<Partial<Record<PageHref, HTMLAnchorElement | null>>>(
    {},
  );
  const shown = useRef(false);

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
          {pages.map(({ key, href }) => (
            <li key={key}>
              <Link
                ref={(element) => {
                  links.current[href] = element;
                }}
                href={href}
                transitionTypes={
                  onCase && href === "/projetos" ? ["nav-back"] : undefined
                }
                aria-current={current === href ? "page" : undefined}
                className={`inline-flex min-h-11 items-center font-mono text-sm transition-opacity duration-150 ${
                  current === href
                    ? "text-accent light:text-fg"
                    : "hover:opacity-70"
                }`}
              >
                {items[key]}
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
