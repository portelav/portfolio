import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt-BR", "en"],
  defaultLocale: "pt-BR",
  localePrefix: "as-needed",
  // The language comes only from the URL, and no cookie is ever set (ADR 0002).
  localeDetection: false,
  localeCookie: false,
  // hreflang lives in the page metadata, not in a response header.
  alternateLinks: false,
});
