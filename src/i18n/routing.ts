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
  // Each page has its address in each language; the folders use the Portuguese
  // one. A case keeps its id in both languages (PRD, D67 and D78).
  pathnames: {
    "/": "/",
    "/projetos": {
      "pt-BR": "/projetos",
      en: "/projects",
    },
    "/projetos/[id]": {
      "pt-BR": "/projetos/[id]",
      en: "/projects/[id]",
    },
    "/sobre": {
      "pt-BR": "/sobre",
      en: "/about",
    },
    "/servicos": {
      "pt-BR": "/servicos",
      en: "/services",
    },
    "/contato": {
      "pt-BR": "/contato",
      en: "/contact",
    },
  },
});
