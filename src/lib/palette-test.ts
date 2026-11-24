// Throwaway: the visual directions Lucas compares on the real site (PRD, D96
// and D114). Each one brings a background color, a title font and a shape,
// set in globals.css under html[data-palette]. Once one is chosen, it moves
// into the tokens, and this file, the chooser and the pre-paint lines that
// read it are removed.

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
  // CSS variable of the title font, from src/lib/fonts.ts.
  display: string;
};

export const paletteTests: PaletteTest[] = [
  {
    id: "caslon",
    name: "Caslon",
    mode: "dark",
    bg: "#b82e1a",
    fg: "#fbf1e1",
    accent: "#ffd66b",
    line: "#e07a66",
    amber: "#f0b04a",
    display: "--font-test-caslon",
  },
  {
    id: "plex",
    name: "Plex",
    mode: "light",
    bg: "#f2e14c",
    fg: "#121212",
    accent: "#1a2be0",
    line: "#121212",
    amber: "#a8650a",
    display: "--font-test-plex",
  },
  {
    id: "mar",
    name: "Mar",
    mode: "dark",
    bg: "#0e5c4a",
    fg: "#f6efe2",
    accent: "#ffbc80",
    line: "#3f8a76",
    amber: "#e3a33b",
    display: "--font-test-bricolage",
  },
  {
    id: "violeta",
    name: "Violeta",
    mode: "dark",
    bg: "#4a23d6",
    fg: "#fff7ea",
    accent: "#c8ff3d",
    line: "#7d5ee6",
    amber: "#f0b04a",
    display: "--font-test-young",
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
  d.style.setProperty("--bg", p.bg);
  d.style.setProperty("--fg", p.fg);
  d.style.setProperty("--accent", p.accent);
  d.style.setProperty("--line", p.line);
  d.style.setProperty("--brand", logo === "amber" ? p.amber : p.accent);
  d.style.setProperty("--font-red-hat-display", `var(${p.display})`);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", p.bg);
}
