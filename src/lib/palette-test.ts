// Throwaway: the four palettes Lucas compares on the real site (PRD, D96).
// Once one is chosen, it moves into the tokens in globals.css and this file,
// the chooser and the pre-paint lines that read it are removed.

export type PaletteTest = {
  id: string;
  name: string;
  mode: "dark" | "light";
  bg: string;
  fg: string;
  accent: string;
  line: string;
  // Today's amber, in the version that reads on this background.
  amber: string;
};

export const paletteTests: PaletteTest[] = [
  {
    id: "lima",
    name: "Lima",
    mode: "dark",
    bg: "#0d0e0c",
    fg: "#efeee8",
    accent: "#c6f432",
    line: "#4a4c45",
    amber: "#e3a33b",
  },
  {
    id: "floresta",
    name: "Floresta",
    mode: "dark",
    bg: "#0f1d17",
    fg: "#eef0e6",
    accent: "#ff8f66",
    line: "#3d5649",
    amber: "#e3a33b",
  },
  {
    id: "papel",
    name: "Papel",
    mode: "light",
    bg: "#f3ede2",
    fg: "#1b1712",
    accent: "#c2361b",
    line: "#bfb4a0",
    amber: "#a8650a",
  },
  {
    id: "cobalto",
    name: "Cobalto",
    mode: "light",
    bg: "#f4f4f1",
    fg: "#101218",
    accent: "#2a44e0",
    line: "#b5b7bf",
    amber: "#a8650a",
  },
];

export const paletteStorageKey = "palette-test";

// Shared by the pre-paint script, as source text, and by the chooser, so both
// apply a palette the same way: tokens inline on <html>, the mode through
// data-theme. It must not use anything from outside its own body.
export function applyPalette(
  d: HTMLElement,
  list: PaletteTest[],
  id: string,
  logo: string,
) {
  const p = list.find((item) => item.id === id);
  if (!p) return;
  d.dataset.palette = p.id;
  d.dataset.theme = p.mode;
  d.style.setProperty("--bg", p.bg);
  d.style.setProperty("--fg", p.fg);
  d.style.setProperty("--accent", p.accent);
  d.style.setProperty("--line", p.line);
  d.style.setProperty("--brand", logo === "amber" ? p.amber : p.accent);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", p.bg);
}
