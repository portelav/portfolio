// Throwaway: the visual directions Lucas compares on the real site (PRD, D96
// and D114). Each one brings a background color, a title font and a shape;
// title weight and shape live in globals.css under html[data-display] and
// html[data-shape]. Once one is chosen, it moves into the tokens, and this
// file, the chooser and the pre-paint lines that read it are removed.

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
  // Title font from src/lib/fonts.ts; empty keeps today's Red Hat Display.
  display: "" | "plex";
  // Shape of buttons and media frames; empty keeps today's.
  shape: "" | "block";
};

// Variations on the yellow and blue direction, each changing one thing, so
// Lucas can tell whether the color or the letters made the difference.
export const paletteTests: PaletteTest[] = [
  {
    id: "plex",
    name: "Plex",
    mode: "light",
    bg: "#f2e14c",
    fg: "#121212",
    accent: "#1a2be0",
    line: "#121212",
    amber: "#a8650a",
    display: "plex",
    shape: "block",
  },
  {
    id: "so-cor",
    name: "Só a cor",
    mode: "light",
    bg: "#f2e14c",
    fg: "#121212",
    accent: "#1a2be0",
    line: "#121212",
    amber: "#a8650a",
    display: "",
    shape: "",
  },
  {
    id: "so-letra",
    name: "Só a letra",
    mode: "dark",
    bg: "#0b0b0c",
    fg: "#f2f2f0",
    accent: "#e3a33b",
    line: "#444448",
    amber: "#e3a33b",
    display: "plex",
    shape: "",
  },
  {
    id: "azul",
    name: "Azul",
    mode: "dark",
    bg: "#1a2be0",
    fg: "#fff8d6",
    accent: "#f2e14c",
    line: "#f2e14c",
    amber: "#f0b04a",
    display: "plex",
    shape: "block",
  },
];

export const paletteStorageKey = "palette-test";

// Shared by the pre-paint script, as source text, and by the chooser, so both
// apply a direction the same way: tokens inline on <html>, the mode through
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
  d.dataset.display = p.display;
  d.dataset.shape = p.shape;
  d.style.setProperty("--bg", p.bg);
  d.style.setProperty("--fg", p.fg);
  d.style.setProperty("--accent", p.accent);
  d.style.setProperty("--line", p.line);
  d.style.setProperty("--brand", logo === "amber" ? p.amber : p.accent);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", p.bg);
}
