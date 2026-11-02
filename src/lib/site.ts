import type { Metadata, Viewport } from "next";

export const siteUrl = "https://portelav.vercel.app";

// Same files and values as web/head-snippet.html in the brand kit.
export const brandMetadata: Pick<Metadata, "icons" | "manifest"> = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const brandViewport: Viewport = {
  themeColor: "#0b0b0c",
};
