"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { type PageKey, pages } from "@/lib/pages";

import { currentPage } from "./site-nav";

type MobileMenuProps = {
  label: string;
  open: string;
  items: Record<PageKey, string>;
};

const computerQuery = "(min-width: 768px)";

// The phone menu (PRD, D80 and D87). A button with three bars, at the start of
// the header, opens a panel over the page, below the header, with the pages one
// per line. While it is open, focus stays between the button and the links, the
// page behind does not scroll and the header stays on screen. Esc, the button,
// a page or a wider screen close it, and focus goes back to the button.
export function MobileMenu({ label, open, items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const pathname = usePathname();
  const current = currentPage(pathname);
  const panelId = useId();
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // A new page closes the menu, even when the visitor got there another way.
  const shown = isOpen && openedAt === pathname;

  const hide = () => {
    setIsOpen(false);
    button.current?.focus();
  };

  useEffect(() => {
    if (!shown) return;

    const root = document.documentElement;
    const header = button.current?.closest("header");
    root.style.overflow = "hidden";
    if (header) header.dataset.away = "false";

    const wide = matchMedia(computerQuery);
    const onWide = () => {
      if (wide.matches) setIsOpen(false);
    };
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      button.current?.focus();
    };
    wide.addEventListener("change", onWide);
    document.addEventListener("keydown", onEscape);
    return () => {
      root.style.overflow = "";
      wide.removeEventListener("change", onWide);
      document.removeEventListener("keydown", onEscape);
    };
  }, [shown]);

  // Keeps Tab inside the menu: from the last link back to the button, and
  // from the button back to the last link.
  const onKeyDown = (event: KeyboardEvent) => {
    if (!shown || event.key !== "Tab") return;
    const links = [...(panel.current?.querySelectorAll("a") ?? [])];
    const stops = [button.current, ...links].filter(
      (element): element is HTMLButtonElement | HTMLAnchorElement =>
        element !== null,
    );
    const first = stops[0];
    const last = stops[stops.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div onKeyDown={onKeyDown} className="no-js:hidden md:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={shown}
        aria-controls={panelId}
        onClick={() => {
          if (shown) {
            hide();
          } else {
            setOpenedAt(pathname);
            setIsOpen(true);
          }
        }}
        aria-label={open}
        className="-ml-3 grid min-h-11 min-w-11 place-items-center"
      >
        {/* Three bars that turn into an X while the menu is open. */}
        <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
          {[
            shown ? "translate-y-2 rotate-45" : "",
            shown ? "opacity-0" : "",
            shown ? "-translate-y-2 -rotate-45" : "",
          ].map((state, index) => (
            <span
              key={index}
              className={`ease-out-quint h-0.5 rounded-full bg-current transition-[opacity,transform] duration-250 motion-reduce:transition-none ${state}`}
            />
          ))}
        </span>
      </button>
      <div
        ref={panel}
        id={panelId}
        data-open={shown}
        className="bg-bg ease-out-quint invisible absolute inset-x-0 top-full h-[calc(100dvh-3.5rem)] overflow-y-auto opacity-0 transition-[opacity,visibility] duration-250 data-[open=true]:visible data-[open=true]:opacity-100 motion-reduce:transition-none"
      >
        <nav aria-label={label} className="page-frame pt-4 pb-10">
          <ul className="border-line flex flex-col border-b">
            {pages.map(({ key, href }, index) => (
              <li
                key={key}
                style={{ "--delay": `${index * 40}ms` } as CSSProperties}
                className={`border-line ease-out-quint border-t transition-[opacity,transform] delay-(--delay) duration-250 motion-reduce:transition-none ${
                  shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                <Link
                  href={href}
                  onClick={hide}
                  aria-current={current === href ? "page" : undefined}
                  className={`font-display flex min-h-14 w-full items-center text-xl ${
                    current === href
                      ? "text-accent light:text-fg decoration-accent underline decoration-2 underline-offset-6"
                      : ""
                  }`}
                >
                  {items[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
