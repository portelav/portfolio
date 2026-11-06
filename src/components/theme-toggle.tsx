"use client";

import { useEffect } from "react";

import { themeColors } from "@/lib/theme";

type ThemeToggleProps = {
  toLight: string;
  toLightLabel: string;
  toDark: string;
  toDarkLabel: string;
};

function applyTheme(theme: keyof typeof themeColors) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColors[theme]);
}

function toggleTheme() {
  const next =
    document.documentElement.dataset.theme === "light" ? "dark" : "light";

  applyTheme(next);

  try {
    localStorage.setItem("theme", next);
  } catch {
    // Without storage, the choice still applies until the page reloads.
  }
}

// On phones, a sun or a moon stands for the mode it switches to; on computers,
// the word. Drawn here, with the same stroke as the contact envelope.
function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className="md:hidden"
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="md:hidden"
    >
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
    </svg>
  );
}

// Both labels are in the HTML and CSS shows the right one, so the server and
// the client always render the same thing, whatever theme is saved.
export function ThemeToggle({
  toLight,
  toLightLabel,
  toDark,
  toDarkLabel,
}: ThemeToggleProps) {
  // The 404 is rendered in the browser, so the pre-paint script never runs there.
  useEffect(() => {
    document.documentElement.dataset.js = "1";

    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") applyTheme(saved);
    } catch {
      // Without storage, the default theme stays.
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="no-js:hidden inline-flex items-center justify-center px-2 font-mono text-sm"
    >
      <span className="light:hidden">
        <span className="sr-only">{toLightLabel}</span>
        <SunIcon />
        <span aria-hidden="true" className="hidden md:inline">
          {toLight}
        </span>
      </span>
      <span className="hidden light:inline">
        <span className="sr-only">{toDarkLabel}</span>
        <MoonIcon />
        <span aria-hidden="true" className="hidden md:inline">
          {toDark}
        </span>
      </span>
    </button>
  );
}
