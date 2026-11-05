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
  // A case keeps its id in both languages, and the folder name in each one (PRD, D67).
  pathnames: {
    "/": "/",
    "/projetos/[id]": {
      "pt-BR": "/projetos/[id]",
      en: "/projects/[id]",
    },
  },
});
