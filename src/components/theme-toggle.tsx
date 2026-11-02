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
        <span aria-hidden="true">{toLight}</span>
      </span>
      <span className="hidden light:inline">
        <span className="sr-only">{toDarkLabel}</span>
        <span aria-hidden="true">{toDark}</span>
      </span>
    </button>
  );
}
