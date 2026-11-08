"use client";

import { useEffect } from "react";

import { useRouter } from "@/i18n/navigation";

// Sections that left the home page for a page of their own (PRD, D81).
const moved = {
  projetos: { pathname: "/projetos" },
  sobre: { pathname: "/sobre" },
  site: { pathname: "/servicos" },
  contato: { pathname: "/contato" },
  privacidade: { pathname: "/contato", hash: "privacidade" },
} as const;

// An old link to a home section, such as /#contato, goes on to its page. It
// replaces the history entry, so going back skips the home page. The preloader
// never runs with an anchor, so the visitor sees no animation on the way.
export function OldAnchors() {
  const router = useRouter();

  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (anchor in moved) {
      router.replace(moved[anchor as keyof typeof moved]);
    }
  }, [router]);

  return null;
}
