import {
  IBM_Plex_Mono,
  Red_Hat_Display,
  Red_Hat_Mono,
  Red_Hat_Text,
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

// Throwaway: title font of the visual directions under test (PRD, D114).
// Not preloaded, so it only downloads when a direction uses it.
const testPlex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-test-plex",
  preload: false,
});

export const fontVariables = [
  redHatText.variable,
  redHatDisplay.variable,
  redHatMono.variable,
  testPlex.variable,
].join(" ");
