import { Red_Hat_Display, Red_Hat_Mono, Red_Hat_Text } from "next/font/google";

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

export const fontVariables = [
  redHatText.variable,
  redHatDisplay.variable,
  redHatMono.variable,
].join(" ");
