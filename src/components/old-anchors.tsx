"use client";

import { useEffect } from "react";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import { getPathname } from "@/i18n/navigation";

// Sections that left the home page for a page of their own (PRD, D81).
const moved = {
  projetos: { href: "/projetos", hash: "" },
  sobre: { href: "/sobre", hash: "" },
  site: { href: "/servicos", hash: "" },
  contato: { href: "/contato", hash: "" },
  privacidade: { href: "/contato", hash: "#privacidade" },
} as const;

// An old link to a home section, such as /#contato, goes on to its page. It
// replaces the history entry, so going back skips the home page. The preloader
// never runs with an anchor, so the visitor sees no animation on the way. The
// address is built here, with its hash, because the localized router drops it.
export function OldAnchors() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (!(anchor in moved)) return;
    const { href, hash } = moved[anchor as keyof typeof moved];
    router.replace(getPathname({ locale, href }) + hash);
  }, [router, locale]);

  return null;
}
