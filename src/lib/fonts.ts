import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  Libre_Caslon_Display,
  Red_Hat_Display,
  Red_Hat_Mono,
  Red_Hat_Text,
  Young_Serif,
} from "next/font/google";

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-red-hat-text",
});

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-red-hat-display",
  preload: false,
});

const redHatMono = Red_Hat_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-red-hat-mono",
});

// Throwaway: title fonts of the visual directions under test (PRD, D114).
// None is preloaded, so only the direction on screen downloads its font.
const testCaslon = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-test-caslon",
  preload: false,
});

const testPlex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-test-plex",
  preload: false,
});

const testBricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test-bricolage",
  preload: false,
});

const testYoung = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-test-young",
  preload: false,
});

export const fontVariables = [
  redHatText.variable,
  redHatDisplay.variable,
  redHatMono.variable,
  testCaslon.variable,
  testPlex.variable,
  testBricolage.variable,
  testYoung.variable,
].join(" ");
