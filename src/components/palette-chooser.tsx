"use client";

import { useEffect, useState } from "react";

import {
  applyPalette,
  paletteStorageKey,
  paletteTests,
} from "@/lib/palette-test";

// Throwaway: a floating chooser for Lucas to compare the four palettes on the
// real site, each with today's amber logo or the logo in the new color. Its
// texts stay here, outside the message files, because it leaves with the
// choice (PRD, D96).

type Logo = "amber" | "accent";

function save(id: string, logo: Logo) {
  try {
    localStorage.setItem(paletteStorageKey, `${id}|${logo}`);
  } catch {
    // Without storage, the choice lasts until the page reloads.
  }
}

export function PaletteChooser() {
  const [palette, setPalette] = useState<string | null>(null);
  const [logo, setLogo] = useState<Logo>("accent");
  const [open, setOpen] = useState(true);

  // The pre-paint script already applied the saved palette; read it back.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(paletteStorageKey);
    } catch {
      // No storage: start from today's palette.
    }
    if (!saved) return;
    const [id, savedLogo] = saved.split("|");
    const nextLogo: Logo = savedLogo === "amber" ? "amber" : "accent";
    // On the 404 the pre-paint script never runs, so apply it here as well.
    applyPalette(document.documentElement, paletteTests, id, nextLogo);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads storage once after hydration
    setPalette(id);
    setLogo(nextLogo);
  }, []);

  function choose(id: string, nextLogo: Logo) {
    save(id, nextLogo);
    applyPalette(document.documentElement, paletteTests, id, nextLogo);
    setPalette(id);
    setLogo(nextLogo);
  }

  function reset() {
    try {
      localStorage.removeItem(paletteStorageKey);
    } catch {
      // Nothing saved to remove.
    }
    const url = new URL(location.href);
    url.searchParams.delete("paleta");
    url.searchParams.delete("logo");
    location.replace(url);
  }

  const current = paletteTests.find((item) => item.id === palette);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir seletor de paleta"
        className="fixed right-3 bottom-3 z-[60] flex items-center justify-center border border-line bg-bg"
      >
        <span
          aria-hidden="true"
          className="size-4"
          style={{ background: "var(--accent)" }}
        />
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Paletas em teste"
      className="fixed right-3 bottom-3 z-[60] border border-line bg-bg p-2 font-mono text-sm text-fg shadow-[0_8px_30px_rgb(0_0_0/0.35)]"
    >
      <div className="flex items-center justify-between gap-3 pl-1">
        <span>{current ? current.name : "Hoje"}</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar seletor de paleta"
          className="flex items-center justify-center"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="flex">
        <button
          type="button"
          onClick={reset}
          aria-label="Paleta de hoje"
          aria-pressed={!current}
          className="flex items-center justify-center"
        >
          <Swatch bg="#0b0b0c" accent="#e3a33b" active={!current} />
        </button>
        {paletteTests.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => choose(item.id, logo)}
            aria-label={`Paleta ${item.name}`}
            aria-pressed={item.id === palette}
            className="flex items-center justify-center"
          >
            <Swatch
              bg={item.bg}
              accent={item.accent}
              active={item.id === palette}
            />
          </button>
        ))}
      </div>

      {current && (
        <div className="mt-1 flex gap-1">
          {(
            [
              ["accent", "Logo na cor", current.accent],
              ["amber", "Logo âmbar", current.amber],
            ] as const
          ).map(([value, label, color]) => (
            <button
              key={value}
              type="button"
              onClick={() => choose(current.id, value)}
              aria-pressed={logo === value}
              className={`flex flex-1 items-center gap-2 px-2 whitespace-nowrap ${
                logo === value ? "outline outline-1 outline-fg" : "opacity-60"
              }`}
            >
              <span
                aria-hidden="true"
                className="size-3 shrink-0"
                style={{ background: color }}
              />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Swatch({
  bg,
  accent,
  active,
}: {
  bg: string;
  accent: string;
  active: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative block size-8 border ${
        active ? "border-fg border-2" : "border-line"
      }`}
      style={{ background: bg }}
    >
      <span
        className="absolute right-1 bottom-1 size-3"
        style={{ background: accent }}
      />
    </span>
  );
}
