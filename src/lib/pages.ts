// The site's pages, in menu order (PRD, D78). The computer menu, the phone menu
// and the footer all read this list, so a page is added in one place. Each key
// names its texts in the message files, under Pages.<key>.
export const pages = [
  { key: "projects", href: "/projetos" },
  { key: "about", href: "/sobre" },
  { key: "services", href: "/servicos" },
  { key: "contact", href: "/contato" },
] as const;

export type PageKey = (typeof pages)[number]["key"];
export type PageHref = (typeof pages)[number]["href"];
